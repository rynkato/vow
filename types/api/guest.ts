export interface GuestData {
  id: number;
  guest_uuid: string;
  guest_name: string;
  guest_phone_number: string;
  guest_quantity: number;
  guest_quantity_confirmed: number;
  guest_response: "Attending" | "Not Attending" | "No Response";
  guest_message_status: "Sent" | "Not Sent";
  guest_type: "Aqiela" | "Syed";
}

export interface GuestDataFormatted {
  id: number;
  uuid: string;
  name: string;
  phone_number: string;
  quantity: number;
  quantity_confirmed: number;
  response: "Attending" | "Not Attending" | "No Response";
  message_status: "Sent" | "Not Sent";
  type: "Aqiela" | "Syed";
}

export interface InvitationResponseAggregation {
  attending: number;
  not_attending: number;
  no_response: number;
}

export interface MessageStatusResponseAggregation {
  sent: number;
  not_sent: number;
}
