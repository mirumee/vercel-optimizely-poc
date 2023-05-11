import PageComponent from "../components/page_component";
import {
  createInstance,
  OptimizelyProvider,
  useDecision,
} from "@optimizely/react-sdk";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

import {
  EXPERIMENT_EXPERIMENT_KEY,
  OPTIMIZELY_SDK_KEY,
  OPTIMIZELY_VISITOR_KEY,
} from "../common";
import { ReactNode, useEffect, useRef, useState } from "react";
import { OptimizelyConfig } from "@optimizely/optimizely-sdk";
import { getCurrentDateTime } from "../helpers";

const optimizelyClient = createInstance({
  sdkKey: OPTIMIZELY_SDK_KEY,
});

export default function Home() {
  const dateTimeRef = useRef(getCurrentDateTime());
  const [config, setConfig] = useState<OptimizelyConfig | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const userIdRef = useRef(
    (() => {
      let userId = Cookies.get(OPTIMIZELY_VISITOR_KEY);
      if (!userId) {
        userId = uuidv4();
        Cookies.set(OPTIMIZELY_VISITOR_KEY, userId);
      }
      return userId;
    })()
  );

  const isClientReady = !!config;

  useEffect(() => {
    optimizelyClient.onReady().then((x) => {
      const optimizelyConfig = optimizelyClient.getOptimizelyConfig();
      if (optimizelyConfig) {
        setConfig(optimizelyConfig);
      }
    });

    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <OptimizelyProvider
      optimizely={optimizelyClient}
      timeout={500}
      user={{ id: userIdRef.current }}
    >
      <Decision userId={userIdRef.current}>
        {(enabled) => (
          <PageComponent
            loading={!isClientReady}
            datetime={dateTimeRef.current}
            optimizely={{
              optimizely_visitor_id: userIdRef.current,
              new_page_layout: enabled.toString(),
            }}
            title="Optimizely A/B demo using only client `@optimizely/react-sdk`"
          />
        )}
      </Decision>
    </OptimizelyProvider>
  ) : null;
}

const Decision = ({
  children,
  userId,
}: {
  userId: string;
  children: (enabled: boolean) => ReactNode;
}) => {
  const [decision, clientReady] = useDecision(
    EXPERIMENT_EXPERIMENT_KEY,
    {},
    { overrideUserId: userId }
  );

  return <>{children(clientReady ? decision.enabled : false)}</>;
};
