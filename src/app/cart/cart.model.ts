import { Address } from '../address.model';
import { MenuItem } from '../hotels/menu-item.model';

export interface Cart {
  hotelName: string;
  hotelId: number;
  hotelMobileNo: number;
  hotelAddress: Address;
  cartItems: { item: MenuItem; quantity: number }[];
}
