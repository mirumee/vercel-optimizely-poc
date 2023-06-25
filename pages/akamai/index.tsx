import PageComponent from "../../components/page_component";
import { GetServerSideProps } from "next";
import { cacheResponse, extractFromCookie } from "../../utils";

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  cacheResponse(res);
  return {
    props: extractFromCookie(res, req),
  };
};

export default function Home() {
  return <PageComponent title="Akamai test path" />;
}
