import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppConfig } from '../app-config';
import { Hotel } from '../hotels/hotel.model';
import { LoadSelectedHotelSuccess } from '../hotels/store/hotel.actions';

// const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private appConfig: AppConfig
  ) {}

  private BACKEND_URL: string = this.appConfig.baseUrl;

  getVendorHotel() {
    this.http.get<Hotel>(this.BACKEND_URL + '/vendor').subscribe((hotel) => {
      this.store.dispatch(new LoadSelectedHotelSuccess(hotel));
    });
  }

  openHotelMenu(id) {
    this.router.navigate(['/hotel/' + id]);
  }

  openHotelOrders(id) {
    this.router.navigate(['/orders/' + id]);
  }
}
