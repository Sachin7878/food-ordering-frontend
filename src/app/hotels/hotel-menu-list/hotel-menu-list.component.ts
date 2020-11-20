import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { MenuItem } from '../menu-item.model';
import { CartService } from 'src/app/cart/cart.service';
import { take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/app.state';

@Component({
  selector: 'app-hotel-menu-list',
  templateUrl: './hotel-menu-list.component.html',
  styleUrls: ['./hotel-menu-list.component.css'],
})
export class HotelMenuListComponent implements OnInit, OnDestroy {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  // selectedHotel$: Observable<Hotel>;
  // selectedHotelMenu$: Observable<MenuItem[]>;
  // addressStringWithNgrx: String;
  // selectedHotelWithNgrx: Hotel;
  //without ngrx store
  private selectHotelSub: Subscription;
  selectedHotel: Hotel;
  menuItemsForSelectedHotel: MenuItem[];
  hotelIdString: string;
  hotelNameString: string;
  addressString: string;
  constructor(
    public route: ActivatedRoute,
    private hotelService: HotelService,
    private cartService: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelIdString = paramMap.get('hotelId');
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
        //store testing
        // this.hotelService.getSelectedHotelAndMenuById(+this.hotelIdString);
        // this.store
        //   .select(fromRoot.getSelectedHotel)
        //   .pipe(take(1))
        //   .subscribe((hotelObj) => {
        //     this.selectedHotelWithNgrx = hotelObj;
        //   });
      } else {
        console.log('else in hotel menu list ngOnInit');
      }
    });
  }

  addToCart(menuItem: MenuItem) {
    this.cartService.addItemsToCart(
      this.hotelNameString,
      this.selectedHotel.id,
      this.selectedHotel.mobileNo,
      this.selectedHotel.address,
      { item: menuItem, quantity: 1 }
    );
  }

  ngOnDestroy() {
    this.selectHotelSub.unsubscribe();
  }
}
