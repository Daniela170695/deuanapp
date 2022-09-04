export interface Order {
  id?: string;
  establishment: string;
  type: string;
  courier: string;
  city_delivered: string;
  address_delivered: string;
  price:number;
  city_received:string;
  address_received:string;
  kg: number;
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
