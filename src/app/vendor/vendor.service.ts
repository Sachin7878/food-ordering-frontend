import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Hotel } from '../hotels/hotel.model';
import { LoadSelectedHotelSuccess } from '../hotels/store/hotel.actions';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  getVendorHotel() {
    this.http.get<Hotel>(BACKEND_URL + '/vendor').subscribe((hotel) => {
      this.store.dispatch(new LoadSelectedHotelSuccess(hotel));
    });
  }
}
