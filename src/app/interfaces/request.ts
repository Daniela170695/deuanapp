export interface Request {
  id?: string;
  uid: string;
  courier: string;
  type_request: string;
  price: number;
  city_received?: string;
  address_received?: string;
  cellphone_received?: number;
  city_delivered: string;
  address_delivered: string;
  cellphone_delivered: number;
  content?: string;
  description?: string;
  created_datetime: Date;
}
