import { NextApiRequest, NextApiResponse } from "next";
import { SALEOR_URL } from "../../../common";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Simple optimizely update config webhook example. It should also validate incoming webhooks:
  // https://docs.developers.optimizely.com/full-stack/docs/configure-webhooks#3-secure-your-webhook

  const parts = req.query?.path;

  if (!parts?.length) {
    return res.status(404);
  }

  const path = "/" + parts.join("/");

  const resposne = await fetch(SALEOR_URL + path);

  if (!resposne.ok) {
    return res.status(404);
  }

  const blob = await resposne.blob();
  const buffer = await blob.arrayBuffer();

  res.setHeader("Content-type", "image/avif").end(Buffer.from(buffer));
};

export const config = {
  api: {
    responseLimit: "15mb",
    externalResolver: true,
    bodyParser: false,
  },
};
