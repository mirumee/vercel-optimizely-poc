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

export const cacheResponse = (res) => {
  res.setHeader(
    "Cache-Control",
    "public, maxage=0, s-maxage=60, stale-while-revalidate=15"
  );
};

// Vercel
// Set-Cookie: optimizely_visitor_id=bb439045-f848-4bed-be3d-ee3afe016885;new_page_layout=true

// Akamai
// Cookie: optimizely_visitor_id=2bc2-befe-319f-466d; new_page_layout=false
