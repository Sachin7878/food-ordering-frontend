import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/hotels/menu-item.model';
import {
  AddItemToCart,
  ClearCart,
  DecreaseCartItemQuantity,
  IncreaseCartItemQuantity,
  RemoveCartItem,
} from './cart.actions';

export interface CartStateModel {
  cartItems: { item: MenuItem; quantity: number }[];
  totalAmount: number;
}

export const getCartInitialState = (): CartStateModel => ({
  cartItems: [],
  totalAmount: null,
});

@State<CartStateModel>({
  name: 'cart',
  defaults: getCartInitialState(),
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

  @Action(ClearCart)
  public clearCart(
    { setState }: StateContext<CartStateModel>,
    action: ClearCart
  ) {
    setState(getCartInitialState());
  }

  @Action(IncreaseCartItemQuantity)
  public increaseQuantity(
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
  public decreaseQuantity(
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

  @Action(RemoveCartItem)
  public removeSingleCartItem(
    { getState, setState }: StateContext<CartStateModel>,
    action: RemoveCartItem
  ) {
    const state = getState();

    const current = {
      cartItems: [
        ...state.cartItems.filter((x) => x.item.id !== action.payload),
      ],
    };

    setState({
      ...state,
      ...current,
    });
  }
}
