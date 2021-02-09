import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { CartItem } from './cart-item.model';

// const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private BACKEND_URL: string = this.appConfig.baseUrl;
  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  fetchCart() {
    return this.http.get<CartItem[]>(this.BACKEND_URL + '/cart');
  }

  removeCartItem(id: number) {
    return this.http.delete<CartItem[]>(this.BACKEND_URL + '/cart/' + id);
  }

  addCartItem(cartItemToAdd: CartItem) {
    return this.http.post<CartItem[]>(
      this.BACKEND_URL + '/cart',
      cartItemToAdd
    );
  }

  clearCart() {
    return this.http.delete(this.BACKEND_URL + '/cart');
  }

  updateCartItemQty(cartItemToBeUpdated: CartItem) {
    return this.http.put<CartItem>(
      this.BACKEND_URL + '/cart/updateQty',
      cartItemToBeUpdated
    );
  }
}
