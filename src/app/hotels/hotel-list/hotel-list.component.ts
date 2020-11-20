import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
// import { Store } from '@ngrx/store';
// import * as fromRoot from '../../store/app.reducer';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/app.state';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotelsList: Hotel[] = [];
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  private hotelSub: Subscription;

  constructor(private hotelService: HotelService, private store: Store) {}

  ngOnInit() {
    this.hotelService.fetchAllHotels();
    this.hotelSub = this.hotelService
      .getHotelUpdateListener()
      .subscribe((hotelData) => {
        this.hotelsList = hotelData.hotels;
      });
  }

  openHotel(hotelId) {
    this.hotelService.openHotelMenu(hotelId);
  }

  ngOnDestroy() {
    this.hotelSub.unsubscribe();
  }
}
