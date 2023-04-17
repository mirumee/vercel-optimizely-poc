import { GetServerSideProps } from "next";
import { cacheRequest, extractFromCookie } from "../../../utils";
import PageComponent from "../../../components/page_component";

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  cacheRequest(req);
  return {
    props: extractFromCookie(res, req),
  };
};

export default function View({ optimizely, datetime }) {
  return (
    <PageComponent
      optimizely={{ ...optimizely, new_page_layout: "false" }}
      datetime={datetime}
      title="Optimizely feature flags demo. A"
    />
  );
}
