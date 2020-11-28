import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Address } from '../address.model';
import { MenuItem } from '../hotels/menu-item.model';
import { Cart } from './cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private cart: Cart;
  // private cartUpdated = new Subject<Cart>();
  // constructor() {}
  // addItemsToCart(
  //   hotelName: string,
  //   hotelId: number,
  //   hotelMobileNo: number,
  //   hotelAddress: Address,
  //   cartItem: { item: MenuItem; quantity: number }
  // ) {
  //   this.cart.hotelName = hotelName;
  //   this.cart.hotelId = hotelId;
  //   this.cart.hotelMobileNo = hotelMobileNo;
  //   this.cart.hotelAddress = hotelAddress;
  //   this.cart.cartItems.push(cartItem);
  //   this.cartUpdated.next({ ...this.cart });
  // }
  // getCart() {
  //   return this.cart;
  // }
  // getCartUpdateListener() {
  //   return this.cartUpdated.asObservable();
  // }
}
