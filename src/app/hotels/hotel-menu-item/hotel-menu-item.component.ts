import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-menu-item',
  templateUrl: './hotel-menu-item.component.html',
  styleUrls: ['./hotel-menu-item.component.css'],
})
export class HotelMenuItemComponent implements OnInit {
  quantity = 1;

  constructor() {}

  ngOnInit(): void {}

  decreaseQuantity() {
    this.quantity -= 1;
  }
  increaseQuantity() {
    this.quantity += 1;
  }
}
