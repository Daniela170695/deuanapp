export interface Order {
  id?: string;
  uid: string;
  courier: string;
  type: string;
  price: number;
  city_delivered: string;
  address_delivered: string;
  cellphone_delivered: number;
  name_received: string;
  city_received: string;
  address_received: string;
  cellphone_received: number;
  content: string;
  cancelled: boolean;
  accepted: boolean;
  received: boolean;
  delivered: boolean;
  created_datetime: Date;
  cancelled_datetime: Date;
  accepted_datetime: Date;
  received_datetime: Date;
  delivered_datetime: Date;
}
