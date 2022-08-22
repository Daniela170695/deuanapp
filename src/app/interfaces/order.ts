export interface Order {
  id?: string;
  establishment: string;
  type: string;
  courier: string;
  city: number;
  neighborhood: string;
  address: string;
  kg: number;
  accepted: boolean;
  cancelled: boolean;
  received: boolean;
  delivered: boolean;
  created_datetime: Date;
  accepted_datetime: Date;
  cancelled_datetime: Date;
  received_datetime: Date;
  delivered_datetime: Date;
}
