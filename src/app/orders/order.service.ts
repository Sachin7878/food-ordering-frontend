import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  fetchOrders() {
    return this.http.get<Order[]>(BACKEND_URL + '/order');
  }

  placeOrder() {
    return this.http.post<Order>(BACKEND_URL + '/order/place', {});
  }
}
