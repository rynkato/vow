import axios from "axios";

interface UpdateMessageStatusResponse {
  success: boolean;
  message?: string;
}

export const updateMessageStatus = async (
  uuid: string,
  messageStatus: string,
): Promise<UpdateMessageStatusResponse> => {
  try {
    const response = await axios.post(
      "https://aqielasyed.azushi.com/api/updateMessageStatus",
      {
        uuid: uuid,
        guest_message_status: messageStatus,
      },
    );
    return response.data;
  } catch (error) {
    // console.error("Error updating message status:", error);
    throw error;
  }
};
