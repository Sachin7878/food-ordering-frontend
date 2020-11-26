import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/app.state';
import { HotelState } from '../store/hotel.state';
import { ClearSelectedHotel } from '../store/hotel.actions';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(HotelState.getHotels) hotelsList$: Observable<Hotel[]>;
  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;

  constructor(private hotelService: HotelService, private store: Store) {}

  ngOnInit() {
    this.hotelService.fetchAllHotels();
    this.store.dispatch(new ClearSelectedHotel());
  }

  openHotel(hotelId) {
    this.hotelService.openHotelMenu(hotelId);
  }
}
