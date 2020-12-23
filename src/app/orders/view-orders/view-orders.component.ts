import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app.state';
import { Order } from '../order.model';
import { FetchOrders, FetchOrdersByHotelId } from '../store/order.action';
import { OrderState } from '../store/order.state';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
})
export class ViewOrdersComponent implements OnInit {
  @Select(OrderState.getOrders) orders$: Observable<Order[]>;
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;
  @Select(AppState.isVendor) isVendor$: Observable<boolean>;

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
      } else {
        this.store.dispatch(new FetchOrders());
      }
    });
  }

  updateStatus() {}
}
