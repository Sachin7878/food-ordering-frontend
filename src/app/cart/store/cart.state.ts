import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { MenuItem } from 'src/app/hotels/menu-item.model';
import { ClearSelectedHotel } from 'src/app/hotels/store/hotel.actions';
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
  constructor(private store: Store) {}

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
    const item = state.cartItems.find((item) => item.item.id == action.payload);
    let inCartQty = state.cartItems.find((x) => x.item.id === action.payload)
      .quantity;

    if (inCartQty > 0) {
      inCartQty++;
    }

    const current: { item: MenuItem; quantity: number } = {
      item: item.item,
      quantity: inCartQty,
    };

    ctx.patchState({
      cartItems: [
        ...state.cartItems.filter((x) => x.item.id !== action.payload),
        current,
      ],
    });
  }

  @Action(DecreaseCartItemQuantity)
  public decreaseQuantity(
    ctx: StateContext<CartStateModel>,
    action: DecreaseCartItemQuantity
  ) {
    const state = ctx.getState();
    const item = state.cartItems.find((item) => item.item.id == action.payload);
    let inCartQty = state.cartItems.find((x) => x.item.id === action.payload)
      .quantity;

    if (inCartQty > 1) {
      inCartQty--;
    } else if (inCartQty <= 1) {
      this.store.dispatch(new RemoveCartItem(action.payload));
    }

    const current: { item: MenuItem; quantity: number } = {
      item: item.item,
      quantity: inCartQty,
    };

    ctx.patchState({
      cartItems: [
        ...state.cartItems.filter((x) => x.item.id !== action.payload),
        current,
      ],
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
