import type { NextApiRequest, NextApiResponse } from "next";
import { forwardToBugsnag } from "src/utils/api/bugsnag";
import { cors } from "src/utils/api/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await cors(req, res);

  const { id, ...query } = req.query;
  const { response, json } = await forwardToBugsnag(
    `/errors/${id}/latest_event`,
    query
  );

  res.status(response.status).json(json);
}
