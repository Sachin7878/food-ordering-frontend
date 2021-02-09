import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AppConfig } from '../app-config';

// const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private location: Location,
    private appConfig: AppConfig
  ) {}
  private BACKEND_URL: string = this.appConfig.baseUrl;
  fetchOrders() {
    return this.http.get<Order[]>(this.BACKEND_URL + '/order');
  }

  placeOrder() {
    return this.http.post<Order>(this.BACKEND_URL + '/order/place', {});
  }

  updateStatusById(orderId: number, status: string) {
    this.http
      .post(this.BACKEND_URL + '/order/' + orderId, status)
      .subscribe((res) => {
        this.location.back();
      });
  }

  fetchOrdersByHotelId(hotelId) {
    return this.http.get<Order[]>(this.BACKEND_URL + '/order/' + hotelId);
  }
}
