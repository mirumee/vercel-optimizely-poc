/**
 *    Copyright 2022, Optimizely and contributors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { logger } from "log";
import { Cookies, SetCookie } from "cookies";
import {
  createInstance,
  enums as OptimizelyEnums,
} from "@optimizely/optimizely-sdk/dist/optimizely.lite.es";

import { getDatafile, dispatchEvent } from "./optimizely_helper";
import {
  EXPERIMENT_EXPERIMENT_KEY,
  OPTIMIZELY_SDK_KEY,
  OPTIMIZELY_VISITOR_KEY,
} from "../../common";

const AKAMAI_CLIENT_ENGINE = "javascript-sdk/akamai-edgeworker";

// https://techdocs.akamai.com/edgeworkers/docs/request-object#setvariable
const VARIABLE_NAME_USER_ID = `PMUSER_${OPTIMIZELY_VISITOR_KEY}`;
const VARIABLE_NAME_EXPERIMENT_KEY = `PMUSER_${EXPERIMENT_EXPERIMENT_KEY}`;
const VARIABLE_NAME_DECISION_EVENT = "PMUSER_OPTIMIZELY_DECISION_EVENT";

const SHOULD_DISPATCH_EVENT = false;

let logStash = [];

/**
 * Generates a unique 16 digit user id for demo purpose. For production use, please use user Ids from your system
 * or autogenerate a uuid using a standard library such as https://www.npmjs.com/package/uuid.
 *
 * Attribution:
 * This unique id generation function was taken from a Stack Overflow question and modified to fit our use case.
 * https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 * This is the answer that was used
 * https://stackoverflow.com/a/21963136
 * Question by Jason Cohen:
 * https://stackoverflow.com/users/4926/jason-cohen
 * Answer by Jeff Ward:
 * https://stackoverflow.com/users/1026023/jeff-ward
 */
var lut = [];
for (var i = 0; i < 256; i++) {
  lut[i] = (i < 16 ? "0" : "") + i.toString(16);
}
export function generateRandomUserId() {
  var d0 = (Math.random() * 0xffffffff) | 0;
  var d1 = (Math.random() * 0xffffffff) | 0;
  return (
    lut[d0 & 0xff] +
    lut[(d0 >> 8) & 0xff] +
    "-" +
    lut[(d0 >> 16) & 0xff] +
    lut[(d0 >> 24) & 0xff] +
    "-" +
    lut[d1 & 0xff] +
    lut[(d1 >> 8) & 0xff] +
    "-" +
    lut[((d1 >> 16) & 0x0f) | 0x40] +
    lut[(d1 >> 24) & 0xff]
  );
}

// Helper function to log to the debug logger and print to the response body.
function logAndPrint(message) {
  logStash.push(message);
  logger.log(message);
}

/**
 * 1. Fetch the optimizely datafile based on the given sdk key.
 * 2. Read the user id from the cookie if available to enable sticky bucketing or generate a new one to be saved to the cookie.
 * 3. Create an optimizely instance.
 * 4. Access optimizelyConfig object and print datafile revision number.
 * 5. Get a decision for a specific flag and dispatch logx event.
 * 6. Get decisions for all the available flags.
 */
export async function onClientRequest(request: EW.IngressClientRequest) {
  logStash = [];
  let cookies = new Cookies(request.getHeader("Cookie"));

  // Fetch user Id from the cookie if available to make sure that a returning user from same browser session always sees the same variation.
  const userId = cookies.get(OPTIMIZELY_VISITOR_KEY) || generateRandomUserId();

  // onClientRequest handler does not allow setting the cookie. Saving the user id in a variable
  // to be retrieved and set when onClientResponse handler is executed later on.
  request.setVariable(VARIABLE_NAME_USER_ID, userId);

  // Add your SDK here.
  const datafile = await getDatafile(OPTIMIZELY_SDK_KEY);

  if (datafile === "") {
    logAndPrint(
      `[optimizely] Failed to fetch the datafile, please check the optimizely sdk key`
    );
    sendGenericReponse(
      request,
      logStash,
      "Failed to fetch the datafile, please check the optimizely sdk key."
    );
    return;
  }

  // Creating an optimizely SDK instance.
  const optimizelyClient = createInstance({
    datafile,

    // keep the LOG_LEVEL to ERROR in production. Setting LOG_LEVEL to INFO or DEBUG can adversely impact performance.
    logLevel: OptimizelyEnums.LOG_LEVEL.ERROR,

    clientEngine: AKAMAI_CLIENT_ENGINE,

    /* Add other Optimizely SDK initialization options here if needed */
  });

  const optimizelyUserContext = optimizelyClient.createUserContext(userId, {
    /* YOUR_OPTIONAL_ATTRIBUTES_HERE */
  });

  if (SHOULD_DISPATCH_EVENT) {
    logAndPrint(
      "[optimizely] Adding a Notification Listener to Capture Event Payload"
    );

    // The default event dispatching mechanism of optimizely SDK does not work with Akamai edgeworker because it does not support
    // sending out more than one http sub request in onClientRequest handler. Optimizely SDK lets you add a notification listener
    // that can notify when an event is logged. This peice of code is capturing the event payload and storing it in to akamai variable
    // which will be later used in onClientResponse handler to dispatch the event to optimizely logx backend.

    console.error("I'm not handled");
    // FIXME: Types apparently do not cover with the example
    // optimizelyClient.notificationCenter.addNotificationListener(
    //   OptimizelyEnums.NOTIFICATION_TYPES.LOG_EVENT,
    //   ({ params }) => {
    //     // Set event payload in Akamai variable.
    //     request.setVariable(
    //       VARIABLE_NAME_DECISION_EVENT,
    //       JSON.stringify(params)
    //     );
    //   }
    // );
  }

  // --- Using Optimizely Config
  const optimizelyConfig = optimizelyClient.getOptimizelyConfig();
  logAndPrint(`[optimizely] Datafile Revision: ${optimizelyConfig.revision}`);

  // --- For a single flag --- //
  const decision = optimizelyUserContext.decide(EXPERIMENT_EXPERIMENT_KEY);
  let path: string;
  if (decision.enabled) {
    path = "/akamai/b/";
    logAndPrint(
      `[optimizely] The Flag ${
        decision.flagKey
      } was Enabled for the user ${decision.userContext.getUserId()}`
    );
  } else {
    path = "/akamai/a/";
    logAndPrint(
      `[optimizely] The Flag ${
        decision.flagKey
      } was Not Enabled for the user ${decision.userContext.getUserId()}`
    );
  }
  request.setVariable(
    VARIABLE_NAME_EXPERIMENT_KEY,
    decision.enabled.toString()
  );

  // Clearing notification listener so that it does not call the hanlder above for all other decisions.
  optimizelyClient.notificationCenter.clearNotificationListeners(
    OptimizelyEnums.NOTIFICATION_TYPES.LOG_EVENT
  );

  // // --- For all flags --- //
  // const allDecisions = optimizelyUserContext.decideAll();
  // Object.entries(allDecisions).forEach(([flagKey, decision]) => {
  //   if (decision.enabled) {
  //     logAndPrint(
  //       `[optimizely] The Flag ${
  //         decision.flagKey
  //       } was Enabled for the user ${decision.userContext.getUserId()}`
  //     );
  //   } else {
  //     logAndPrint(
  //       `[optimizely] The Flag ${
  //         decision.flagKey
  //       } was Not Enabled for the user ${decision.userContext.getUserId()}`
  //     );
  //   }
  // });

  // sendGenericReponse(request, logStash);

  request.route({ path });
}

/**
 * 1. onClientRequest handler does not allow setting the cookie. We are saving the cookie in a variable and then settig it here.
 * 2. onClientRequest handler does not allow more than one http subrequests. We are dispatching the optimizely logx event from here.
 */
export async function onClientResponse(request, response) {
  const userId = request.getVariable(VARIABLE_NAME_USER_ID);
  const decision = request.getVariable(VARIABLE_NAME_EXPERIMENT_KEY);

  if (SHOULD_DISPATCH_EVENT) {
    const eventPayload = request.getVariable(VARIABLE_NAME_DECISION_EVENT);
    if (eventPayload) {
      const eventResponseStatus = await dispatchEvent(eventPayload);
      logger.log(
        `[optimizely] Optimizely Logx Event dispatched. Response status code: ${eventResponseStatus}`
      );
    }
  }

  const cookie = new Cookies();
  cookie.add(OPTIMIZELY_VISITOR_KEY, userId);
  cookie.add(EXPERIMENT_EXPERIMENT_KEY, decision);
  response.setHeader("set-cookie", cookie.toHeader());

  // const visitorCookie = new SetCookie({
  //   name: OPTIMIZELY_VISITOR_KEY,
  //   value: userId,
  // });
  // response.setHeader("Set-Cookie", visitorCookie.toHeader());
  // const decisionCookie = new SetCookie({
  //   name: EXPERIMENT_EXPERIMENT_KEY,
  //   value: decision,
  // });
  // response.setHeader("Set-Cookie", decisionCookie.toHeader());
}

function sendGenericReponse(
  request,
  logStash,
  message = "Edge worker generic response."
) {
  request.respondWith(
    200,
    { "Content-Type": "text/plain" },
    `${message}\n\n` + "Log Messages:\n" + logStash.join("\n")
  );
}
