import { MenuItem } from 'src/app/hotels/menu-item.model';
import {
  ADD_CART_ITEMS,
  ADD_CART_ITEMS_FAILURE,
  ADD_CART_ITEMS_SUCCESS,
  CartActions,
} from './cart.actions';

export interface State {
  finalAmount: number;
  cartItems: Array<{ item: MenuItem; quantity: number }>;
}
const initialState: State = {
  cartItems: [
    {
      item: {
        id: 69,
        itemName: 'DummyName',
        itemPrice: 30,
        available: true,
      },
      quantity: 3,
    },
  ],
  finalAmount: 90,
};

export function cartReducer(state = initialState, action: CartActions) {
  switch (action.type) {
    case ADD_CART_ITEMS:
      return {
        ...state,
      };
    case ADD_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ADD_CART_ITEMS_FAILURE:
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
}

export const getCartItems = (state: State) => state.cartItems;
