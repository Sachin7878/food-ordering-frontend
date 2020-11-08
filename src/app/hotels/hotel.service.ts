import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from './hotel.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private selectedHotel: Hotel;
  private hotels: Hotel[];
  private hotelsUpdated = new Subject<{ hotels: Hotel[] }>();

  constructor(private http: HttpClient, private router: Router) {}

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
    this.http.post(BACKEND_URL + '/createhotel', hotelRegData).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchAllHotels() {
    this.http
      .get<Hotel[]>(BACKEND_URL + '/gethotels')
      .pipe(
        map((hotelData) => {
          return {
            hotels: hotelData.map((hotel) => {
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
    this.http.get(BACKEND_URL + '/gethotelId/' + id).subscribe(
      (resHotel: Hotel) => {
        this.selectedHotel = resHotel;
        console.log(this.selectedHotel);
        //this.router.navigate(['/hotel/' + id]);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  getHotelArray() {
    return this.hotels;
  }

  getHotelUpdateListener() {
    return this.hotelsUpdated.asObservable();
  }

  getSelectedHotel() {
    return this.selectedHotel;
  }
}
