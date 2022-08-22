export interface Order {
  id?: string;
  establishment: string;
  type: string;
  courier: string;
  city: number;
  neighborhood: string;
  address: string;
  kg: number;
  received: boolean;
  delivered: boolean;
  cancelled: boolean;
}
