import { Page, Text, List, Link } from "@vercel/examples-ui";
import Image from "next/image";
import cookie from "cookie";
import { useEffect, useState } from "react";

export default function PageComponent({
  title,
  optimizely,
}: {
  optimizely: Record<string, string>;
  title: string;
}) {
  // Pass the cookie from the SSR.
  const [cookies, setCookies] = useState<any>(optimizely);

  // Or read the cookie on the client.
  // const [cookies, setCookies] = useState<any>({})
  // useEffect(() => {
  //   setCookies(cookie.parse(document.cookie))
  // }, [])

  const new_layout = cookies.new_page_layout === "true";
  const image = (
    <Image
      src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?q=75&w=1500&h=500"
      // src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
      alt=""
      width="1500"
      height="500"
      priority
      // Image optimization seems to break when proxying through cloudfront.
      unoptimized
    />
  );
  return (
    <Page>
      <Text variant="h2">{title}</Text>
      {!new_layout && image}
      <section style={{ marginTop: 30 }}>
        <Text style={{ fontSize: "small" }}>
          Visitor id: <b>{cookies.optimizely_visitor_id}</b>
          <br />
          New layout enabled: <b>{cookies.new_page_layout}</b>
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
