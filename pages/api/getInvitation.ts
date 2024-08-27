import type { NextApiRequest, NextApiResponse } from "next";

import { query } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { uuid, guest_type } = req.query;

  let sql = "SELECT * FROM invitation_engagement";
  let params: any[] = [];
  let conditions: string[] = [];

  if (uuid) {
    conditions.push("id = ?");
    params.push(uuid);
  }

  if (guest_type) {
    conditions.push("guest_type = ?");
    params.push(guest_type);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  try {
    const result = await query(sql, params);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong: " + error });
  }
}
