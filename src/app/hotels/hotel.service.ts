import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from './hotel.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from './menu-item.model';
import * as fromRoot from '../store/app.reducer';
import * as UI from '../shared/ui.actions';
import { Store } from '@ngrx/store';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private selectedHotel: Hotel;
  private hotels: Hotel[];
  private hotelsUpdated = new Subject<{ hotels: Hotel[] }>();
  private selectedHotelUpdated = new Subject<{ hotel: Hotel }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  createHotel(
    hotelName: string,
    mobileNo: string,
    addressLine1: string,
    addressLine2: string | undefined,
    city: string,
    state: string,
    country: string,
    pincode: string
  ) {
    const hotelRegData = {
      hotelName: hotelName,
      mobileNo: mobileNo,
      address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
      },
    };
    this.store.dispatch(new UI.StartLoading());
    this.http.post(BACKEND_URL + '/hotels', hotelRegData).subscribe(
      (result) => {
        this.store.dispatch(new UI.StopLoading());
        console.log(result + ' hotel with the details added successfully');
        this.router.navigate(['/']);
      },
      (error) => {
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
      }
    );
  }

  fetchAllHotels() {
    this.store.dispatch(new UI.StartLoading());
    this.http
      .get<{ content: Hotel[] }>(BACKEND_URL + '/hotels')
      .pipe(
        map((hotelData) => {
          console.log(hotelData);
          return {
            hotels: hotelData.content.map((hotel) => {
              return {
                id: hotel.id,
                hotelName: hotel.hotelName,
                mobileNo: hotel.mobileNo,
                address: hotel.address,
              };
            }),
          };
        })
      )
      .subscribe((transformedHotelData) => {
        this.store.dispatch(new UI.StopLoading());
        this.hotels = transformedHotelData.hotels;
        this.hotelsUpdated.next({
          hotels: [...this.hotels],
        });
      });
  }

  openHotelMenu(id) {
    this.router.navigate(['/hotel/' + id]);
  }

  getHotelById(id) {
    this.store.dispatch(new UI.StartLoading());
    this.http
      .get<{ content: MenuItem[] }>(BACKEND_URL + '/hotels/' + id + '/menu')
      .subscribe(
        (hotelData) => {
          this.store.dispatch(new UI.StopLoading());
          this.selectedHotel = this.hotels.find((hotel) => hotel.id == id);
          this.selectedHotel.menuItems = hotelData.content;
          this.selectedHotelUpdated.next({
            hotel: this.selectedHotel,
          });
        },
        (error) => {
          this.store.dispatch(new UI.StopLoading());
          console.log(error);
        }
      );
  }

  getHotelArray() {
    return this.hotels;
  }

  getHotelUpdateListener() {
    return this.hotelsUpdated.asObservable();
  }

  getSelectedHotelUpdateListener() {
    return this.selectedHotelUpdated.asObservable();
  }

  getSelectedHotel() {
    return this.selectedHotel;
  }
}
