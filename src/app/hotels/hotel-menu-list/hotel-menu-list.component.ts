import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-menu-list',
  templateUrl: './hotel-menu-list.component.html',
  styleUrls: ['./hotel-menu-list.component.css'],
})
export class HotelMenuListComponent implements OnInit {
  selectedHotel: Hotel;
  hotelIdString: String;
  isLoading: boolean = false;
  constructor(
    public route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelIdString = paramMap.get('hotelId');
        this.isLoading = true;
        this.hotelService.getHotelById(this.hotelIdString);
        console.log('in ng on init');
        this.selectedHotel = this.hotelService.getSelectedHotel();
        // if (this.selectedHotel) {
        //   this.isLoading = false;
        //   console.log('hotel fetched successfully');
        // }
      } else {
        console.log('else in hotel menu list ngOnInit');
      }
    });
  }
}
