export interface GuestData {
  id: number;
  guest_uuid: string;
  guest_name: string;
  guest_phone_number: string;
  guest_quantity: number;
  guest_quantity_confirmed: number;
  guest_response: "Attending" | "Not Attending" | "No Response";
  guest_message_status: "Sent" | "Not Sent";
  guest_type: "Aqilah" | "Syed";
}

export interface ResponseAggregation {
  attending: number;
  not_attending: number;
  no_response: number;
}
