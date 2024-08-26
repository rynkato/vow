import axios from "axios";

import { GuestData } from "@/types";

export async function getInvitations(): Promise<GuestData[]> {
  try {
    const response = await axios.get<GuestData[]>(
      "https://aqielasyed.azushi.com/api/getInvitation/",
    );
    return response.data;
  } catch (error) {
    // console.error("Error fetching invitation data:", error);
    return [];
  }
}
