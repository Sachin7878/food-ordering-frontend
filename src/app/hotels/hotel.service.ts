import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from './hotel.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from './menu-item.model';
import { Store } from '@ngxs/store';
import { StartLoading, StopLoading } from '../shared/app.actions';
// import * as fromRoot from '../store/app.reducer';
// import * as UI from '../shared/actions';
// import * as HotelAction from './store/hotel.actions';
// import { Store } from '@ngrx/store';

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
    private store: Store
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
    this.http.post(BACKEND_URL + '/hotels', hotelRegData).subscribe(
      (result) => {
        this.store.dispatch(new StopLoading());
        console.log(result + ' hotel with the details added successfully');
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
        this.hotels = transformedHotelData.hotels;
        this.hotelsUpdated.next({
          hotels: [...this.hotels],
        });
      });
  }

  openHotelMenu(id) {
    this.router.navigate(['/hotel/' + id]);
  }

  // getOnlyHotelById(id) {
  //   this.store.dispatch(new StartLoading());
  //   this.store.dispatch(new HotelAction.LoadSelectedHotel());
  //   this.http.get<Hotel>(BACKEND_URL + '/hotels/' + id).subscribe(
  //     (hotel) => {
  //       this.store.dispatch(new StopLoading());
  //       this.store.dispatch(new HotelAction.LoadSelectedHotelSucess(hotel));
  //     },
  //     (error) => {
  //       this.store.dispatch(new StopLoading());
  //       this.store.dispatch(new HotelAction.LoadSelectedHotelFailure(error));
  //     }
  //   );
  // }

  // getOnlySelectedHotelMenu(id) {
  //   this.store.dispatch(new StartLoading());
  //   this.store.dispatch(new HotelAction.LoadSelectedHotelMenu());
  //   this.http
  //     .get<{ content: MenuItem[] }>(BACKEND_URL + '/hotels/' + id + '/menu')
  //     .subscribe(
  //       (hotelMenu) => {
  //         this.store.dispatch(new StopLoading());
  //         this.store.dispatch(
  //           new HotelAction.LoadSelectedHotelMenuSucess(hotelMenu.content)
  //         );
  //       },
  //       (error) => {
  //         this.store.dispatch(new StopLoading());
  //         this.store.dispatch(
  //           new HotelAction.LoadSelectedHotelMenuFailure(error)
  //         );
  //       }
  //     );
  // }

  // getSelectedHotelAndMenuById(id) {
  //   this.getOnlyHotelById(id);
  //   this.getOnlySelectedHotelMenu(id);
  // }

  getHotelById(id) {
    this.store.dispatch(new StartLoading());
    //this.store.dispatch(new HotelAction.LoadSelectedHotelMenu());
    this.http
      .get<{ content: MenuItem[] }>(BACKEND_URL + '/hotels/' + id + '/menu')
      .subscribe(
        (hotelData) => {
          this.store.dispatch(new StopLoading());
          this.selectedHotel = this.hotels.find((hotel) => hotel.id == id);

          this.selectedHotel.menuItems = hotelData.content.filter(
            (menuItem) => {
              return menuItem.available == true;
            }
          );
          // this.store.dispatch(
          //   new HotelAction.LoadSelectedHotelMenuSucess([
          //     ...hotelData.content.filter((menuItem) => {
          //       return menuItem.available == true;
          //     }),
          //   ])
          // );
          this.selectedHotelUpdated.next({
            hotel: this.selectedHotel,
          });
        },
        (error) => {
          this.store.dispatch(new StopLoading());
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
