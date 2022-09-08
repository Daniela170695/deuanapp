export interface OrderTracking {
  id?: string;
  order: string;
  cancelled: boolean;
  accepted: boolean;
  received: boolean;
  delivered: boolean;
  cancelled_datetime: Date;
  accepted_datetime: Date;
  received_datetime: Date;
  delivered_datetime: Date;
}
