import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from './hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {}

  getHotels() {
    //this.hotelService.fetchAllHotels();
    this.router.navigate['/hotelList'];
  }
}
