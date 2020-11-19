import { Action } from '@ngrx/store';
import { MenuItem } from 'src/app/hotels/menu-item.model';

export const ADD_CART_ITEMS = '[CART] Add Cart Items';
export const ADD_CART_ITEMS_SUCCESS = '[CART] Add Cart Items Success';
export const ADD_CART_ITEMS_FAILURE = '[CART] Add Cart Items Success';

export class AddCartItems implements Action {
  readonly type = ADD_CART_ITEMS;
}

export class AddCartItemsSuccess implements Action {
  readonly type = ADD_CART_ITEMS_SUCCESS;
  constructor(public payload: { item: MenuItem; quantity: number }) {}
}

export class AddCartItemsFailure implements Action {
  readonly type = ADD_CART_ITEMS_FAILURE;
}
export type CartActions =
  | AddCartItems
  | AddCartItemsSuccess
  | AddCartItemsSuccess;
