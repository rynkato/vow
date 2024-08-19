import type { NextApiRequest, NextApiResponse } from "next";

import { query } from "@/lib/db";
import { handleRequest } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { uuid, guest_message_status } = req.body;

  const { status, message } = handleRequest({
    uuid,
    guest_message_status,
  });

  if (!status) {
    return res.status(500).json({ status, message });
  }

  let sql =
    "UPDATE invitation_engagement SET guest_message_status = ? WHERE guest_uuid = ?";
  let params: any[] = [guest_message_status, uuid];

  try {
    const result = await query(sql, params);

    // Convert BigInt values to strings
    const convertedResult = JSON.parse(
      JSON.stringify(result, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    res.status(result?.error ? 500 : 200).json(convertedResult);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong: " + error });
  }
}
