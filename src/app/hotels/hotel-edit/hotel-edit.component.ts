import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { HotelState } from '../store/hotel.state';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css'],
})
export class HotelEditComponent implements OnInit {
  country = 'India';
  hotelId: string;
  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;

  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Puducherry',
  ];

  constructor(
    public route: ActivatedRoute,
    private hotelService: HotelService,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('navigated to hotel edit successfully');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelId = paramMap.get('hotelId');
      }
      this.hotelService.getOnlyHotelById(this.hotelId);
    });
  }
}
