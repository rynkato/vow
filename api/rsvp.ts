import axios from "axios";

interface RSVPResponse {
  success: boolean;
  message?: string;
}

export const rsvp = async (
  uuid: number,
  messageStatus: string,
  quantity: number,
): Promise<RSVPResponse> => {
  try {
    const response = await axios.post(
      "https://aqielasyed.azushi.com/api/rsvp/",
      {
        uuid: uuid,
        guest_response: messageStatus,
        guest_quantity_confirmed: quantity,
      },
    );
    return response.data;
  } catch (error) {
    // console.error("Error updating message status:", error);
    throw error;
  }
};
