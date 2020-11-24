import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Hotel } from 'src/app/hotels/hotel.model';
import { MenuItem } from 'src/app/hotels/menu-item.model';
import { ClearSelectedHotel } from 'src/app/hotels/store/hotel.actions';
import { HotelState } from 'src/app/hotels/store/hotel.state';
import {
  ClearCart,
  DecreaseCartItemQuantity,
  IncreaseCartItemQuantity,
  RemoveCartItem,
} from '../store/cart.actions';
import { CartState } from '../store/cart.state';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  @Select(CartState.getCartItems) cartItems$: Observable<
    { item: MenuItem; quantity: number }[]
  >;
  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;

  message = 'Cart is Empty!';
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  increaseQuantity(id: number) {
    this.store.dispatch(new IncreaseCartItemQuantity(id));
  }
  decreaseQuantity(id: number) {
    this.store.dispatch(new DecreaseCartItemQuantity(id));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
    this.store.dispatch(new ClearSelectedHotel());
    this.router.navigate(['/']);
  }

  removeSingleItem(id: number) {
    this.store.dispatch(new RemoveCartItem(id));
  }
}
