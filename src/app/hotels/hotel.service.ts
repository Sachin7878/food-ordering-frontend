import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from './hotel.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MenuItem } from './menu-item.model';
import { Store } from '@ngxs/store';
import { StartLoading, StopLoading } from '../shared/app.actions';

import {
  AddHotelSuccess,
  DeleteMenuItem,
  LoadHotelsSuccess,
  LoadSelectedHotelMenuSuccess,
  LoadSelectedHotelSuccess,
  UpdateHotelSuccess,
} from './store/hotel.actions';
import { Location } from '@angular/common';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private location: Location
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
    this.store.dispatch(new StartLoading());
    this.http.post<Hotel>(BACKEND_URL + '/hotels', hotelRegData).subscribe(
      (result) => {
        this.store.dispatch(new AddHotelSuccess(result));
        this.store.dispatch(new StopLoading());
        this.router.navigate(['/']);
      },
      (error) => {
        this.store.dispatch(new StopLoading());
        console.log(error);
      }
    );
  }

  fetchAllHotels() {
    this.store.dispatch(new StartLoading());
    this.http
      .get<{ content: Hotel[] }>(BACKEND_URL + '/hotels')
      .pipe(
        map((hotelData) => {
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
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new LoadHotelsSuccess(transformedHotelData.hotels));
      });
  }

  openHotelMenu(id) {
    this.router.navigate(['/hotel/' + id]);
  }

  getOnlyHotelById(id) {
    this.store.dispatch(new StartLoading());
    this.http.get<Hotel>(BACKEND_URL + '/hotels/' + id).subscribe(
      (hotel) => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new LoadSelectedHotelSuccess(hotel));
      },
      () => {
        this.store.dispatch(new StopLoading());
      }
    );
  }

  getOnlySelectedHotelMenu(id) {
    this.store.dispatch(new StartLoading());
    this.http
      .get<{ content: MenuItem[] }>(BACKEND_URL + '/hotels/' + id + '/menu')
      .subscribe(
        (hotelMenu) => {
          this.store.dispatch(new StopLoading());
          this.store.dispatch(
            new LoadSelectedHotelMenuSuccess(hotelMenu.content)
          );
        },
        () => {
          this.store.dispatch(new StopLoading());
        }
      );
  }

  getSelectedHotelAndMenuById(id) {
    this.getOnlyHotelById(id);
    this.getOnlySelectedHotelMenu(id);
  }

  updateHotel(
    id: number,
    hotelName: string,
    mobileNo: string,
    addressLine1: string,
    addressLine2: string | undefined,
    city: string,
    state: string,
    country: string,
    pincode: string
  ) {
    const hotelUpdateData = {
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
    this.store.dispatch(new StartLoading());
    this.http
      .put<Hotel>(BACKEND_URL + '/hotels/' + id, hotelUpdateData)
      .pipe(
        map((hotel) => {
          return {
            id: hotel.id,
            hotelName: hotel.hotelName,
            mobileNo: hotel.mobileNo,
            address: hotel.address,
          };
        })
      )
      .subscribe(
        (updatedHotelFromDB) => {
          this.store.dispatch(new UpdateHotelSuccess(updatedHotelFromDB));
          this.store.dispatch(new StopLoading());
          this.router.navigate(['/']);
        },
        (error) => {
          this.store.dispatch(new StopLoading());
          console.log(error);
        }
      );
  }

  deleteMenuItem(hotelId, menuId) {
    // this.store.dispatch(new StartLoading());
    this.http
      .delete(BACKEND_URL + '/hotels/' + hotelId + '/menu/' + menuId)
      .subscribe(
        () => {
          this.store.dispatch(new DeleteMenuItem(menuId));
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addMenuItem(
    hotelId: number,
    itemName: string,
    itemPrice: number,
    available: boolean
  ) {
    const itemToBeAdded: MenuItem = {
      id: null,
      itemName: itemName,
      itemPrice: itemPrice,
      available: available,
    };

    this.store.dispatch(new StartLoading());

    this.http
      .post<MenuItem>(
        BACKEND_URL + '/hotels/' + hotelId + '/menu/',
        itemToBeAdded
      )
      .subscribe(
        () => {
          this.store.dispatch(new StopLoading());
          this.location.back();
        },
        (error) => {
          this.store.dispatch(new StopLoading());
          console.log(error);
        }
      );
  }

  updateMenuItem(
    hotelId,
    menuId: number,
    itemName: string,
    itemPrice: number,
    available: boolean
  ) {
    const updatedMenuItem: MenuItem = {
      id: menuId,
      itemName: itemName,
      itemPrice: itemPrice,
      available: available,
    };

    this.store.dispatch(new StartLoading());

    this.http
      .put<MenuItem>(
        BACKEND_URL + '/hotels/' + hotelId + '/menu/' + menuId,
        updatedMenuItem
      )
      .subscribe(
        () => {
          this.store.dispatch(new StopLoading());
          this.location.back();
        },
        (error) => {
          this.store.dispatch(new StopLoading());
          console.log(error);
        }
      );
  }
}
