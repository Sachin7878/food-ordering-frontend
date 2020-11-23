import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { MenuItem } from 'src/app/hotels/menu-item.model';
import {
  AddItemToCart,
  DecreaseCartItemQuantity,
  IncreaseCartItemQuantity,
} from './cart.actions';

export interface CartStateModel {
  cartItems: { item: MenuItem; quantity: number }[];
  totalAmount: number;
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    cartItems: [],
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

  // @Action(IncreaseCartItemQuantity)
  // public increaseCartItemQuantity(
  //   { getState, patchState }: StateContext<CartStateModel>,
  //   action: IncreaseCartItemQuantity
  // ) {
  //   const current = getState();
  //   const item = current.cartItems.find((item) => {
  //     item.item.id === action.payload;
  //   });
  //   item.quantity++;
  //   patchState({ cartItems: [...current.cartItems, item] });
  // }

  @Action(IncreaseCartItemQuantity)
  increaseQuantity(
    ctx: StateContext<CartStateModel>,
    action: IncreaseCartItemQuantity
  ) {
    const state = ctx.getState();

    // find cart item by item name
    const { quantity = 0 } =
      state.cartItems.find((x) => x.item.id === action.payload) || {};
    const item = state.cartItems.find((item) => item.item.id == action.payload);
    const current = {
      cartItems: [
        ...state.cartItems.filter((x) => x.item.id !== action.payload),
        {
          item: item.item,
          quantity: quantity + 1,
        },
      ],
    };

    ctx.setState({
      ...state,
      ...current,
    });
  }

  @Action(DecreaseCartItemQuantity)
  decreaseQuantity(
    ctx: StateContext<CartStateModel>,
    action: DecreaseCartItemQuantity
  ) {
    const state = ctx.getState();

    const { quantity = 0 } =
      state.cartItems.find((x) => x.item.id === action.payload) || {};
    const item = state.cartItems.find((item) => item.item.id == action.payload);
    const current = {
      cartItems: [
        ...state.cartItems.filter((x) => x.item.id !== action.payload),
        {
          item: item.item,
          quantity: quantity - 1,
        },
      ],
    };

    ctx.setState({
      ...state,
      ...current,
    });
  }
}
