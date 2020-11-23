import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/hotels/hotel.model';
import { MenuItem } from 'src/app/hotels/menu-item.model';
import { HotelState } from 'src/app/hotels/store/hotel.state';
import {
  DecreaseCartItemQuantity,
  IncreaseCartItemQuantity,
} from '../store/cart.actions';
import { CartState } from '../store/cart.state';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit, OnDestroy {
  @Select(CartState.getCartItems) cartItems$: Observable<
    { item: MenuItem; quantity: number }[]
  >;
  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;

  message = 'Cart is Empty!';
  constructor(private store: Store) {}

  ngOnInit(): void {}

  increaseQuantity(id: number) {
    this.store.dispatch(new IncreaseCartItemQuantity(id));
  }
  decreaseQuantity(id: number) {
    this.store.dispatch(new DecreaseCartItemQuantity(id));
  }

  ngOnDestroy() {}
}
