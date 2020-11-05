import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BANKEND_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient) {}

  createHotelWithoutAddress(
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
    this.http.post(BANKEND_URL + '/createhotel', hotelRegData).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
