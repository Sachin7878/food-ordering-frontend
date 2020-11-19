import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotelsList: Hotel[] = [];
  isLoading$: Observable<boolean>;
  // isLoading = false;
  private hotelSub: Subscription;

  constructor(
    private hotelService: HotelService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    // this.isLoading = true;
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.hotelService.fetchAllHotels();
    this.hotelSub = this.hotelService
      .getHotelUpdateListener()
      .subscribe((hotelData) => {
        // this.isLoading = false;
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
