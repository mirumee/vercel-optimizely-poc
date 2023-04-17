import { GetServerSideProps } from "next";
import { cacheResponse, extractFromCookie } from "../../../utils";
import PageComponent from "../../../components/page_component";
import { VISITOR_KEY } from "../../../middleware";
import Cookies from "js-cookie";

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  cacheResponse(res);
  return {
    props: extractFromCookie(res, req),
  };
};

export default function View({ optimizely, datetime }) {
  return (
    <PageComponent
      //Passing cookies via redirect seems not to work
      // optimizely={{ ...optimizely, new_page_layout: "true" }}
      optimizely={{
        optimizely_visitor_id: Cookies.get(VISITOR_KEY),
        new_page_layout: "false",
      }}
      datetime={datetime}
      title="Optimizely feature flags demo. B"
    />
  );
}
