import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
// import { Store } from '@ngrx/store';
// import * as fromRoot from '../../store/app.reducer';
import { Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/app.state';
import { HotelState } from '../store/hotel.state';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotelsList: Hotel[] = [];
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(HotelState.getHotels) hotelsList$: Observable<Hotel[]>;

  private hotelSub: Subscription;

  constructor(private hotelService: HotelService) {}

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
