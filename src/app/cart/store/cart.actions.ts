import { MenuItem } from 'src/app/hotels/menu-item.model';

export class LoadCartItems {
  public static readonly type = '[CART] Load Cart Items';
  constructor() {}
}

export class AddItemToCart {
  public static readonly type = '[CART] Add Items to Cart';
  constructor(public payload: { item: MenuItem; quantity: number }) {}
}
