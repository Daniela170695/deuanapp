export interface Order {
  id?: string;
  uid: string;
  courier: string;
  type: string;
  price: number;
  name_received: string;
  city_received: string;
  address_received: string;
  cellphone_received: number;
  city_delivered: string;
  address_delivered: string;
  cellphone_delivered: number;
  content: string;
  created_datetime: Date;
}
