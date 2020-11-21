import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { MenuItem } from 'src/app/hotels/menu-item.model';
import { AddItemToCart } from './cart.actions';

export interface CartStateModel {
  cartItems: { item: MenuItem; quantity: number }[];
  totalAmount: number;
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    cartItems: [
      {
        item: null,
        quantity: null,
      },
    ],
    totalAmount: null,
  },
})
@Injectable()
export class CartState {
  @Selector()
  public static getState(state: CartStateModel) {
    return state;
  }

  @Selector()
  public static getCartItems(state: CartStateModel) {
    return state.cartItems;
  }

  @Action(AddItemToCart)
  public selectedHotelLoaded(
    { getState, patchState }: StateContext<CartStateModel>,
    action: AddItemToCart
  ) {
    const current = getState();
    const cartItems = [...current.cartItems, action.payload];
    patchState({ cartItems: cartItems });
  }
}
