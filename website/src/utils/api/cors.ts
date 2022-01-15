import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const middleware = Cors({
  methods: ["GET", "HEAD"],
});

export function cors(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
