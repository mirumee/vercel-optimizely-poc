import PageComponent from "../components/page_component";
import { GetServerSideProps } from "next";
import { getCurrentDateTime } from "../helpers";

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {}) ?? {};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  // https://github.com/vercel/next.js/discussions/38650#discussioncomment-3148772
  // res.getHeader('set-cookie') - Works on local development.
  // req.headers['set-cookie'] - Works on Vercel and is passed from the middleware.
  let cookies = res.getHeader("set-cookie") ?? req.headers["set-cookie"] ?? [];
  cookies = cookies.map(parseCookie);
  cookies = cookies.reduce((acc, obj) => ({ ...acc, ...obj }), {});
  const datetime = getCurrentDateTime();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=500, stale-while-revalidate=60"
  );

  return {
    props: { optimizely: cookies, datetime }, // will be passed to the page component as props
  };
};

const Home = ({ optimizely, datetime }) => {
  return (
    <PageComponent
      datetime={datetime}
      optimizely={optimizely}
      title="Optimizely A/B demo"
    />
  );
};

export default Home;
