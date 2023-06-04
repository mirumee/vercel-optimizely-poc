import { Page, Text, Link } from "@vercel/examples-ui";
import Image from "next/image";
import { useEffect, useState } from "react";
import watch from "../public/watch.png";

type ExperimentData = {
  optimizely_visitor_id: string;
  new_page_layout: string;
};

export default function PageComponent({
  title,
  optimizely,
  datetime = "N/A",
  loading = false,
}: {
  optimizely?: ExperimentData;
  title: string;
  datetime?: string;
  loading?: boolean;
}) {
  // Pass the cookie from the SSR.
  console.log({ optimizely });
  const [cookies, setCookies] = useState<ExperimentData | undefined>(
    optimizely
  );

  const new_layout = cookies?.new_page_layout === "true";
  const image = (
    <Image
      src={watch}
      alt=""
      width="1080"
      height="1080"
      priority
      loading="eager"
      // Image optimization seems to break when proxying through cloudfront.
      // unoptimized
    />
  );

  useEffect(() => {
    setCookies(cookies);
  }, [cookies]);

  return (
    <Page>
      <Text style={{ textAlign: "center" }} variant="h2">
        {title}
      </Text>
      <br />

      {loading && (
        <Text style={{ textAlign: "center", marginTop: 50 }} variant="h2">
          Loading...
        </Text>
      )}

      {!loading && !new_layout && image}

      <section style={{ marginTop: 30 }}>
        <Text style={{ fontSize: "small" }}>
          {!loading && (
            <>
              Visitor id: <b>{cookies?.optimizely_visitor_id}</b>
              <br />
              New layout enabled: <b>{cookies?.new_page_layout}</b>
              <br />
              Last sync: <b>{datetime}</b>
            </>
          )}
          <br />
          <br />
          <b>How it works:</b>
          <br />
          This example displays two variants of page layouts to the users. It
          uses Optimizely feature flag in the Vercel Middleware to determine the
          variant that should be shown. A unique visitor id is being generated,
          stored in the cookie and reused so that the decisions stick for the
          same browser session.
          <br />
          <br />
          This example uses Optimizely&nbsp;
          <Link
            href="https://docs.developers.optimizely.com/full-stack/v4.0/docs/javascript-node"
            target="_blank"
          >
            Javascript SDK
          </Link>{" "}
          inside Vercel Middleware to provide a starting point for you to
          implement experimentation and feature flagging for your experiences at
          the edge. For a guide to getting started with our platform more
          generally, this can be combined with the steps outlined in our
          Javascript Quickstart&nbsp;
          <Link
            href="https://docs.developers.optimizely.com/full-stack/v4.0/docs/javascript-node"
            target="_blank"
          >
            here
          </Link>
          .
          <br />
          <br />
          {new_layout && image}
          <br />
          <b>Identity Management</b>
          <br />
          Out of the box, Optimizely&apos;s Full Stack SDKs require a
          user-provided identifier to be passed in at runtime to drive
          experiment and feature flag decisions. This example generates a unique
          id, stores it in a cookie and reuses it to make the decisions sticky.
          Another common approach would be to use an existing unique identifier
          available within your application.
          <br />
          <br />
          <b>Bucketing</b>
          <br />
          For more information on how Optimizely Full Stack SDKs bucket
          visitors, see&nbsp;
          <Link
            href="https://docs.developers.optimizely.com/full-stack/v4.0/docs/how-bucketing-works"
            target="_blank"
          >
            here
          </Link>
          .
        </Text>
      </section>
    </Page>
  );
}
