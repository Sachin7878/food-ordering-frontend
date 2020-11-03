import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BANKEND_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient) {}

  createHotelWithoutAddress(hotelName: string, mobileNo: string) {
    const hotelRegData = {
      hotelName: hotelName,
      mobileNo: mobileNo,
    };
    this.http.post(BANKEND_URL + '/createhotel', hotelRegData).subscribe(
      (successUser) => {
        console.log(successUser);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
