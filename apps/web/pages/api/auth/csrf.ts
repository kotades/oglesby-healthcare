import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ csrfToken: "dummy-csrf-token-for-firebase-migration" });
}
