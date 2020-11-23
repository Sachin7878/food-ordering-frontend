import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/app.state';
import { HotelState } from '../store/hotel.state';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(HotelState.getHotels) hotelsList$: Observable<Hotel[]>;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.fetchAllHotels();
  }

  openHotel(hotelId) {
    this.hotelService.openHotelMenu(hotelId);
  }
}
