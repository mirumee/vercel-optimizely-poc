import { default as ImageBase, ImageLoader, ImageProps } from "next/image";
import { SALEOR_URL } from "../common";

type NextImageProps = Omit<ImageProps, "loader">;

// const akamaiLoader: ImageLoader = ({ src, width, quality, ...rest }) => {
//   const path = src.replace(SALEOR_URL, "/api/akamai-mock");
//   const params = new URLSearchParams({
//     w: width.toString(),
//     q: (quality ?? 75).toString(),
//   }).toString();
//
//   return `${path}?${params}`;
// };

const akamaiLoader: ImageLoader = ({ src, width, quality, ...rest }) => {
  const path = src.replace(SALEOR_URL, "/api/akamai-mock");
  const params = new URLSearchParams({
    w: width.toString(),
    q: (quality ?? 75).toString(),
    url: path,
  }).toString();

  return `/_next/image/?${params}`;
};

export const NextImage = (props: NextImageProps) => {
  // Static imports are passed as StaticImport objects
  const shouldApplyLoader =
    typeof props.src === "string" && props.src.startsWith(SALEOR_URL);

  return (
    <ImageBase
      loader={shouldApplyLoader ? akamaiLoader : undefined}
      {...props}
    />
  );
};
