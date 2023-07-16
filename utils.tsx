import { getCurrentDateTime } from "./helpers";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {}) ?? {};

export const extractFromCookie = (
  res: ServerResponse,
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
) => {
  let cookies;

  // Akamai
  if (Object.keys(req.cookies).length) {
    cookies = req.cookies;
    // Vercel
  } else {
    cookies = res.getHeader("set-cookie") ?? req.headers["set-cookie"] ?? [];
    cookies = cookies.map(parseCookie);
    cookies = cookies.reduce((acc, obj) => ({ ...acc, ...obj }), {});
  }

  const datetime = getCurrentDateTime();
  return { optimizely: cookies, datetime };
};

// !no-store - Akamai by default has a rule to no store everything with no extensions like pages paths. So to enable the caching behaviour we have to negate it and then pass the proper cache headers.

export const cacheResponse = (res) => {
  // res.setHeader("Cache-Control", "max-age=60");
  res.setHeader(
    "Edge-Control",
    `!no-store, maxage=${process.env.CACHE_MAX_AGE}`
  ); // Remember about time period suffixes
  res.setHeader(
    "Pragma",
    "akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key, akamai-x-get-extracted-values"
  );
  // res.setHeader("Vercel-CDN-Cache-Control", "no-store");
  // res.setHeader("CDN-Cache-Control", "no-store");
  // res.setHeader("Cache-Control", "no-store");
};

// Vercel
// Set-Cookie: optimizely_visitor_id=bb439045-f848-4bed-be3d-ee3afe016885;new_page_layout=true

// Akamai
// Cookie: optimizely_visitor_id=2bc2-befe-319f-466d; new_page_layout=false
