import { GetServerSideProps } from "next";
import { extractFromCookie } from "../../../utils";
import PageComponent from "../../../components/page_component";

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  return {
    props: extractFromCookie(res, req),
  };
};

export default function View({ optimizely, datetime }) {
  return (
    <PageComponent
      optimizely={{ ...optimizely, new_page_layout: "true" }}
      datetime={datetime}
      title="Optimizely feature flags demo. B"
    />
  );
}
