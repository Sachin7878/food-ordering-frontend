import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { MenuItem } from '../menu-item.model';

@Component({
  selector: 'app-hotel-menu-list',
  templateUrl: './hotel-menu-list.component.html',
  styleUrls: ['./hotel-menu-list.component.css'],
})
export class HotelMenuListComponent implements OnInit, OnDestroy {
  isLoading = false;
  private selectHotelSub: Subscription;
  selectedHotel: Hotel;
  menuItemsForSelectedHotel: MenuItem[];
  hotelIdString: String;
  addressString: String;
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
        this.selectHotelSub = this.hotelService
          .getSelectedHotelUpdateListener()
          .subscribe((selectedHotelData) => {
            this.isLoading = false;
            this.selectedHotel = selectedHotelData.hotel;
            this.menuItemsForSelectedHotel = this.selectedHotel.menuItems;
            this.addressString =
              this.selectedHotel.address.addressLine1 +
              (this.selectedHotel.address.addressLine2
                ? ', ' + this.selectedHotel.address.addressLine2
                : '') +
              ', ' +
              this.selectedHotel.address.city +
              ' - ' +
              this.selectedHotel.address.pincode;
          });
      } else {
        console.log('else in hotel menu list ngOnInit');
      }
    });
  }

  addToCart() {}

  ngOnDestroy() {
    this.selectHotelSub.unsubscribe();
  }
}
