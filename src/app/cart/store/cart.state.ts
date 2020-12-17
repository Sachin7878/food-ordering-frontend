import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { CartItem } from '../cart-item.model';
import { CartService } from '../cart.service';
import {
  AddItemToCart,
  ClearCart,
  DecreaseCartItemQuantity,
  IncreaseCartItemQuantity,
  LoadCartItems,
  RemoveCartItem,
} from './cart.actions';

export interface CartStateModel {
  cartItems: CartItem[];
}

export const getCartInitialState = (): CartStateModel => ({
  cartItems: [],
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

  @Action(LoadCartItems)
  public loadCartFromDb(
    { patchState }: StateContext<CartStateModel>,
    action: LoadCartItems
  ) {
    return this.cartService.fetchCart().pipe(
      tap((result) => {
        patchState({
          cartItems: [...result],
        });
      })
    );
  }

  @Action(AddItemToCart)
  public selectedHotelLoaded(
    { patchState }: StateContext<CartStateModel>,
    action: AddItemToCart
  ) {
    return this.cartService.addCartItem(action.payload).pipe(
      tap((result) => {
        patchState({
          cartItems: [...result],
        });
      })
    );
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

    // ctx.patchState({
    //   cartItems: [
    //     ...state.cartItems.filter((x) => x.item.id !== action.payload),
    //     current,
    //   ],
    // });

    return this.cartService.updateCartItemQty(current).subscribe((resp) => {
      ctx.patchState({
        cartItems: [
          ...state.cartItems.filter((x) => x.item.id !== action.payload),
          current,
        ],
      });
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

    // ctx.patchState({
    //   cartItems: [
    //     ...state.cartItems.filter((x) => x.item.id !== action.payload),
    //     current,
    //   ],
    // });

    return this.cartService.updateCartItemQty(current).subscribe((resp) => {
      ctx.patchState({
        cartItems: [
          ...state.cartItems.filter((x) => x.item.id !== action.payload),
          current,
        ],
      });
    });
  }

  @Action(RemoveCartItem)
  public removeSingleCartItem(
    { patchState }: StateContext<CartStateModel>,
    action: RemoveCartItem
  ) {
    // const state = getState();

    // const current = {
    //   cartItems: [
    //     ...state.cartItems.filter((x) => x.item.id !== action.payload),
    //   ],
    // };

    // setState({
    //   ...state,
    //   ...current,
    // });

    return this.cartService.removeCartItem(action.payload).pipe(
      tap((result) => {
        patchState({
          cartItems: [...result],
        });
      })
    );
  }
}
