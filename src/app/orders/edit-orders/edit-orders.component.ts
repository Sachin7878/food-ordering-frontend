import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app.state';
import { Order } from '../order.model';
import { FetchOrdersByHotelId } from '../store/order.action';
import { OrderState } from '../store/order.state';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.css'],
})
export class EditOrdersComponent implements OnInit {
  @Select(OrderState.getOrders) orders$: Observable<Order[]>;
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;

  hotelId: number;
  status: string[] = ['PENDING', 'DISPATCHED', 'DELIVERED'];
  newStatus: string;

  constructor(private store: Store, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelId = +paramMap.get('hotelId');
      }
    });
    this.isAdmin$.subscribe((res) => {
      if (res) {
        this.store.dispatch(new FetchOrdersByHotelId(this.hotelId));
      }
    });
  }

  updateStatus(orderId) {}
}
