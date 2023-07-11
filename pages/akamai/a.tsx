import { GetServerSideProps } from "next";
import { cacheResponse, extractFromCookie } from "../../utils";
import PageComponent from "../../components/page_component";

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  cacheResponse(res);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 10000);
  });

  return {
    props: extractFromCookie(res, req),
  };
};

export default function View({ optimizely, datetime }) {
  console.log({ optimizely });
  return (
    <PageComponent
      optimizely={{ ...optimizely, new_page_layout: "false" }}
      datetime={datetime}
      title="Optimizely feature flags demo. A"
    />
  );
}
