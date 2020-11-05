import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotelsList: Hotel[] = [];
  isLoading = false;
  private hotelSub: Subscription;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    console.log('in ng on init of hotel list before isLoading');
    this.isLoading = true;
    this.hotelService.fetchAllHotels();
    this.hotelSub = this.hotelService
      .getHotelUpdateListener()
      .subscribe((hotelData) => {
        console.log('in ng on init of hotel list');
        this.isLoading = false;
        this.hotelsList = hotelData.hotels;
      });
  }

  ngOnDestroy() {
    this.hotelSub.unsubscribe();
  }
}
