import { Order } from '../order.model';

export class FetchOrders {
  public static readonly type = '[ORDER] Fetch Orders';
  constructor() {}
}

export class PlaceOrder {
  public static readonly type = '[ORDER] Place Order';
  constructor() {}
}
