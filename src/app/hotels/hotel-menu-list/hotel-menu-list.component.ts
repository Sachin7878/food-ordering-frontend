import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { MenuItem } from '../menu-item.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';

@Component({
  selector: 'app-hotel-menu-list',
  templateUrl: './hotel-menu-list.component.html',
  styleUrls: ['./hotel-menu-list.component.css'],
})
export class HotelMenuListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  private selectHotelSub: Subscription;
  selectedHotel: Hotel;
  menuItemsForSelectedHotel: MenuItem[];
  hotelIdString: String;
  hotelNameString: String;
  addressString: String;
  constructor(
    public route: ActivatedRoute,
    private hotelService: HotelService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelIdString = paramMap.get('hotelId');
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
        this.hotelService.getHotelById(this.hotelIdString);
        this.selectHotelSub = this.hotelService
          .getSelectedHotelUpdateListener()
          .subscribe((selectedHotelData) => {
            this.selectedHotel = selectedHotelData.hotel;
            this.hotelNameString = this.selectedHotel.hotelName;
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
