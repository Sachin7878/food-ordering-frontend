import { Injectable } from '@angular/core';
import { Action, StateContext, State, Selector, Store } from '@ngxs/store';
import { StartLoading, StopLoading } from 'src/app/shared/store/app.actions';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { FetchOrders } from './order.action';

export interface OrderStateModel {
  orders: Order[];
}

export const getOrderInitialState = (): OrderStateModel => ({
  orders: [],
});

@State<OrderStateModel>({
  name: 'orders',
  defaults: getOrderInitialState(),
})
@Injectable()
export class OrderState {
  constructor(private orderService: OrderService, private store: Store) {}

  @Selector()
  public static getState(state: OrderStateModel) {
    return state;
  }

  @Selector()
  public static getOrders(state: OrderStateModel) {
    return state.orders;
  }

  @Action(FetchOrders)
  public loadCartFromDb(
    { patchState }: StateContext<OrderStateModel>,
    action: FetchOrders
  ) {
    this.store.dispatch(new StartLoading());
    return this.orderService.fetchOrders().subscribe((result) => {
      patchState({
        orders: result,
      });
      this.store.dispatch(new StopLoading());
    });
  }
}
