import axios from "axios";

import { GuestData } from "@/types";

export async function getInvitations(
  guest_type: "Aqiela" | "Syed" | "All",
): Promise<GuestData[]> {
  try {
    const response = await axios.get<GuestData[]>(
      `https://aqielasyed.azushi.com/api/getInvitation/${guest_type !== "All" ? `?guest_type=${guest_type}` : ""}`,
    );
    return response.data;
  } catch (error) {
    // console.error("Error fetching invitation data:", error);
    return [];
  }
}
