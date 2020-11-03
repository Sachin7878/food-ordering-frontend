import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css'],
})
export class HotelCreateComponent implements OnInit {
  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.hotelService.createHotelWithoutAddress(
      form.value.hotelName,
      form.value.mobileNo
    );
  }
}
