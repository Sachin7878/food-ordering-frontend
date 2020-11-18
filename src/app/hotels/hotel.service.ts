import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from './hotel.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from './menu-item.model';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private selectedHotel: Hotel;
  private hotels: Hotel[];
  private hotelsUpdated = new Subject<{ hotels: Hotel[] }>();
  private selectedHotelUpdated = new Subject<{ hotel: Hotel }>();

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
    this.http.post(BACKEND_URL + '/hotels', hotelRegData).subscribe(
      (result) => {
        console.log(result + ' hotel with the details added successfully');
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchAllHotels() {
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
    this.http
      .get<{ content: MenuItem[] }>(BACKEND_URL + '/hotels/' + id + '/menu')
      // .pipe(
      //   map((hotelData) => {
      //     return {
      //       hotels: hotelData.map((hotel) => {
      //         return {
      //           id: hotel.id,
      //           hotelName: hotel.hotelName,
      //           mobileNo: hotel.mobileNo,
      //           address: hotel.address,
      //         };
      //       }),
      //     };
      //   })
      // )
      .subscribe((hotelData) => {
        this.selectedHotel = this.hotels.find((hotel) => hotel.id == id);
        this.selectedHotel.menuItems = hotelData.content;
        // this.selectedHotel = hotelData;
        this.selectedHotelUpdated.next({
          hotel: this.selectedHotel,
        });
      });
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
