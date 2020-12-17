import { Address } from '../address.model';
import { CartItem } from './cart-item.model';

export interface Cart {
  hotelName: string;
  hotelId: number;
  hotelMobileNo: number;
  hotelAddress: Address;
  cartItems: CartItem[];
}
