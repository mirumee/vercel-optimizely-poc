import { Page, Text, Link } from "@vercel/examples-ui";
import { useEffect, useState } from "react";
import { WATCH_IMG } from "../common";
import { NextImage } from "./NextImage";
import watchPng from "../public/watch.png";

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
    <NextImage
      src={WATCH_IMG}
      alt=""
      sizes="100vh"
      width="1024"
      height="1024"
      priority
      loading="eager"
      style={{ margin: "0 auto" }}
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
              <br />
              Cache maxage: <b>{process.env.NEXT_PUBLIC_CACHE_MAX_AGE}</b>
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
        <hr />
        <br />
        <br />
        <h2>Loader applied - saleor image</h2>
        <NextImage src={WATCH_IMG} alt="" height={100} width={200} />
        <br />
        <h2> Loader not applied - external image</h2>
        <NextImage
          src="https://www.breitling.com/media/image/2/cfg_site_hd/asset-version-67dca8c5fa/ab0138241c1p1-navitimer-b01-chronograph-43-soldier.webp"
          alt=""
          height={100}
          width={200}
        />
        <br />
        <h2>Loader not applied - local image</h2>
        <NextImage src={watchPng} alt="" height={100} width={200} />
      </section>
    </Page>
  );
}
