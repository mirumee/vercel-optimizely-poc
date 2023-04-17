import { getCurrentDateTime } from "./helpers";

export const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {}) ?? {};

export const extractFromCookie = (res, req) => {
  let cookies = res.getHeader("set-cookie") ?? req.headers["set-cookie"] ?? [];
  cookies = cookies.map(parseCookie);
  cookies = cookies.reduce((acc, obj) => ({ ...acc, ...obj }), {});
  const datetime = getCurrentDateTime();
  return { optimizely: cookies, datetime };
};

export const cacheRequest = (res) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=10"
  );
};
