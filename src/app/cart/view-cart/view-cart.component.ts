import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/hotels/menu-item.model';
import { Cart } from '../cart-item.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit, OnDestroy {
  cart: Cart;
  cartSub: Subscription;
  message = 'Cart is Empty!';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSub = this.cartService
      .getCartUpdateListener()
      .subscribe((receivedCart) => {
        console.log(receivedCart);
        this.cart = receivedCart;
      });
  }

  increaseQuantity(cartItem: { item: MenuItem; quantity: number }) {
    cartItem.quantity += 1;
  }
  decreaseQuantity(cartItem: { item: MenuItem; quantity: number }) {
    cartItem.quantity -= 1;
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}
