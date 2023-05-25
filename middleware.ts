//@ts-ignore
import { createInstance } from "@optimizely/optimizely-sdk";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { serialize } from "cookie";
import { OPTIMIZELY_VISITOR_KEY } from "./common";

// Create Optimizely instance using datafile downloaded at build time.
// See `withOptimizely` in next config.
// import optimizelyDatafile from './lib/optimizely/datafile.json'

const VERCEL_EDGE_CLIENT_ENGINE = "javascript-sdk/vercel-edge";

export const config = {
  matcher: ["/vercel"],
  runtime: "experimental-edge",
};

export const EXPERIMENT_KEY = "new_page_layout";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Fetch user Id from the cookie if available so a returning user from same browser session always sees the same variation.
  const userId =
    req.cookies.get(OPTIMIZELY_VISITOR_KEY)?.value || crypto.randomUUID();

  // Create Optimizely instance using edge config. Initial config must exist.
  // https://vercel.com/docs/concepts/edge-network/edge-config/edge-config-api
  const optimizelyDatafile = await get("optimizelyDatafile");
  const instance = createInstance({
    datafile: optimizelyDatafile,
    eventFlushInterval: 1000,
    clientEngine: VERCEL_EDGE_CLIENT_ENGINE,
    logLevel: process.env.OPTIMIZELY_LOG_LEVEL,
    eventBatchSize: 10,
    eventDispatcher: {
      dispatchEvent: ({ url, params }: { url: string; params: any }) => {
        // Tell edge function to wait for this promise to fullfill.
        ev.waitUntil(
          fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
          })
        );
      },
    },
  });
  const cfg = instance?.getOptimizelyConfig()?.getDatafile();

  if (cfg) {
    const enabledExperiments = JSON.parse(cfg)
      .featureFlags.filter(({ experimentIds }) => !!experimentIds.length)
      .map(({ key }) => key);
    console.log(`[OPTIMIZELY] Running experiments: ${enabledExperiments}`);
  }
  // Create Optimizely User Context
  const userContext = instance!.createUserContext(userId.toString());

  // Decide variation for the flag.
  const decision = userContext!.decide(EXPERIMENT_KEY);

  // Fetch datafile revision for debugging.
  const revision = instance!.getOptimizelyConfig()!.revision;
  console.log(`[OPTIMIZELY] Revision: ${revision}`);

  let response = NextResponse.next();

  if (!req.cookies.has(OPTIMIZELY_VISITOR_KEY)) {
    // Saving userId in the cookie so that the decision sticks for subsequent visits.
    // req.cookies.set(VISITOR_KEY, userId);
  }
  if (!req.cookies.has(EXPERIMENT_KEY)) {
    req.cookies.set(EXPERIMENT_KEY, decision.enabled.toString());
  }
  console.log(serialize(EXPERIMENT_KEY, decision.enabled.toString()));
  // Using `response.cookies.set` multiple times on Vercel, produces a header like:
  // 1: 'key=value'
  // 2: 'key=value'

  console.log("-------------------------------------");
  console.log(decision.enabled);
  console.log("-------------------------------------");

  // Rewrite approach
  response = NextResponse.rewrite(
    new URL(decision.enabled ? "/vercel/b/" : "/vercel/a/", req.nextUrl)
  );

  // Set cookie approach
  response.headers.set(
    "set-cookie",
    [
      serialize(OPTIMIZELY_VISITOR_KEY, userId),
      serialize(EXPERIMENT_KEY, decision.enabled.toString()),
    ].join(";")
  );
  // response.cookies.set(EXPERIMENT_KEY, decision.enabled.toString());
  // response.cookies.set(OPTIMIZELY_VISITOR_KEY, userId);

  return response;
}
