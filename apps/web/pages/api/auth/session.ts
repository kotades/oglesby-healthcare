import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Stub NextAuth session to prevent CLIENT_FETCH_ERROR 
  // since we migrated to Firebase.
  res.status(200).json({});
}
