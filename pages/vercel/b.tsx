import { GetServerSideProps } from "next";

import { cacheResponse, extractFromCookie } from "../../utils";
import PageComponent from "../../components/page_component";

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  cacheResponse(res);
  return {
    props: extractFromCookie(res, req),
  };
};

export default function View({ optimizely, datetime }) {
  return (
    <PageComponent
      optimizely={optimizely}
      datetime={datetime}
      title="Optimizely feature flags demo. B"
    />
  );
}
