import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotel.model';

@Component({
  selector: 'app-hotel-menu-list',
  templateUrl: './hotel-menu-list.component.html',
  styleUrls: ['./hotel-menu-list.component.css'],
})
export class HotelMenuListComponent implements OnInit {
  selectedHotel: Hotel;
  constructor() {}

  ngOnInit(): void {}
}
