import type { NextApiRequest, NextApiResponse } from "next";

import { query } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { uuid } = req.query;

  let sql = "SELECT * FROM invitation_engagement";
  let params: any[] = [];

  if (uuid) {
    sql += " WHERE guest_uuid = ?";
    params.push(uuid);
  }

  try {
    const result = await query(sql, params);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong: " + error });
  }
}
