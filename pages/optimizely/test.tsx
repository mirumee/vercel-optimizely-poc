import PageComponent from "../../components/page_component";
import Cookies from "js-cookie";
import { EXPERIMENT_KEY, VISITOR_KEY } from "../../middleware";
import { getCurrentDateTime } from "../../helpers";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { cacheResponse, extractFromCookie } from "../../utils";

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  cacheResponse(res);
  return {
    props: {},
  };
};
export default function View() {
  const [datetime] = useState(getCurrentDateTime());
  const optimizely = {
    new_page_layout: Cookies.get(EXPERIMENT_KEY) || "false",
    optimizely_visitor_id: Cookies.get(VISITOR_KEY),
  };

  return (
    <PageComponent
      optimizely={optimizely as any}
      datetime={datetime}
      title="Optimizely feature flags demo"
    />
  );
}
