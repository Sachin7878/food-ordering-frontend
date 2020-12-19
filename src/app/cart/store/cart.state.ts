import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Hotel } from 'src/app/hotels/hotel.model';
import { CartItem } from '../cart-item.model';
import { CartService } from '../cart.service';
import {
  AddItemToCart,
  CalculateTotalAmount,
  ClearCart,
  DecreaseCartItemQuantity,
  IncreaseCartItemQuantity,
  LoadCartItems,
  RemoveCartItem,
} from './cart.actions';

export interface CartStateModel {
  cartItems: CartItem[];
  totalAmount: number;
  currentCartHotel: Hotel;
}

export const getCartInitialState = (): CartStateModel => ({
  cartItems: [],
  totalAmount: null,
  currentCartHotel: null,
});

@State<CartStateModel>({
  name: 'cart',
  defaults: getCartInitialState(),
})
@Injectable()
export class CartState {
  constructor(private store: Store, private cartService: CartService) {}

  @Selector()
  public static getState(state: CartStateModel) {
    return state;
  }

  @Selector()
  public static getCartItems(state: CartStateModel) {
    return state.cartItems;
  }

  @Selector()
  public static getQty(state: CartStateModel) {
    return state.cartItems.length;
  }

  @Selector()
  public static getTotalAmount(state: CartStateModel) {
    return state.totalAmount;
  }

  @Selector()
  public static getCurrentHotel(state: CartStateModel) {
    return state.currentCartHotel;
  }

  @Action(LoadCartItems)
  public loadCartFromDb(
    { patchState }: StateContext<CartStateModel>,
    action: LoadCartItems
  ) {
    return this.cartService.fetchCart().subscribe((result) => {
      patchState({
        cartItems: [...result],
      });
      this.store.dispatch(new CalculateTotalAmount());
    });
  }

  @Action(AddItemToCart)
  public selectedHotelLoaded(
    { patchState }: StateContext<CartStateModel>,
    action: AddItemToCart
  ) {
    return this.cartService.addCartItem(action.payload).subscribe((result) => {
      patchState({
        cartItems: [...result],
      });
      this.store.dispatch(new CalculateTotalAmount());
    });
  }

  @Action(ClearCart)
  public clearCart({ setState }: StateContext<CartStateModel>) {
    return this.cartService.clearCart().pipe(
      tap((result) => {
        setState(getCartInitialState());
      })
    );
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

    const current: CartItem = {
      id: item.id,
      item: item.item,
      quantity: inCartQty,
    };

    return this.cartService.updateCartItemQty(current).subscribe((resp) => {
      ctx.patchState({
        cartItems: [
          ...state.cartItems.filter((x) => x.item.id !== action.payload),
          current,
        ],
      });
      this.store.dispatch(new CalculateTotalAmount());
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

    const current: CartItem = {
      id: item.id,
      item: item.item,
      quantity: inCartQty,
    };

    return this.cartService.updateCartItemQty(current).subscribe((resp) => {
      ctx.patchState({
        cartItems: [
          ...state.cartItems.filter((x) => x.item.id !== action.payload),
          current,
        ],
      });
      this.store.dispatch(new CalculateTotalAmount());
    });
  }

  @Action(RemoveCartItem)
  public removeSingleCartItem(
    { patchState }: StateContext<CartStateModel>,
    action: RemoveCartItem
  ) {
    return this.cartService.removeCartItem(action.payload).pipe(
      tap((result) => {
        patchState({
          cartItems: [...result],
        });
        this.store.dispatch(new CalculateTotalAmount());
      })
    );
  }

  @Action(CalculateTotalAmount)
  public calcTotalAmount({
    patchState,
    getState,
  }: StateContext<CartStateModel>) {
    const state = getState();
    let amount = 0;
    if (state.cartItems.length >= 1) {
      state.cartItems.map((m) => (amount += m.item.itemPrice * m.quantity));
    } else amount = 0;

    patchState({
      totalAmount: amount,
    });
  }
}
