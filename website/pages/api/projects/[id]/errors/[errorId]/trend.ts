import type { NextApiRequest, NextApiResponse } from "next";
import { forwardToBugsnag } from "src/utils/api/bugsnag";
import { cors } from "src/utils/api/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await cors(req, res);

  const { id, errorId, ...query } = req.query;
  const { response, json } = await forwardToBugsnag(
    `/projects/${id}/errors/${errorId}/trend`,
    query
  );

  res.status(response.status).json(json);
}
