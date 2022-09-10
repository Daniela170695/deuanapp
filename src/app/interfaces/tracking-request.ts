export interface TrackingRequest {
  id?: string;
  request: string;
  cancelled: boolean;
  accepted: boolean;
  received: boolean;
  bought: boolean;
  delivered: boolean;
  cancelled_datetime: Date;
  accepted_datetime: Date;
  received_datetime: Date;
  bought_datetime: Date;
  delivered_datetime: Date;
}
