import { MenuItem } from 'src/app/hotels/menu-item.model';

export class LoadCartItems {
  public static readonly type = '[CART] Load Cart Items';
  constructor() {}
}

export class AddItemToCart {
  public static readonly type = '[CART] Add Items to Cart';
  constructor(public payload: { item: MenuItem; quantity: number }) {}
}

export class IncreaseCartItemQuantity {
  public static readonly type = '[CART] Increase Cart Item Quantity';
  constructor(public payload: number) {}
}

export class DecreaseCartItemQuantity {
  public static readonly type = '[CART] Decrease Cart Item Quantity';
  constructor(public payload: number) {}
}
