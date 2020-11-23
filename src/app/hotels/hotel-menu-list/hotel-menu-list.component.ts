import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { MenuItem } from '../menu-item.model';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/app.state';
import { HotelState } from '../store/hotel.state';
import { AddItemToCart } from 'src/app/cart/store/cart.actions';

@Component({
  selector: 'app-hotel-menu-list',
  templateUrl: './hotel-menu-list.component.html',
  styleUrls: ['./hotel-menu-list.component.css'],
})
export class HotelMenuListComponent implements OnInit, OnDestroy {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;
  @Select(HotelState.getSelectedHotelMenu) selectedHotelMenu$: Observable<
    MenuItem[]
  >;
  hotelIdString: string;
  addressString: string;
  constructor(
    public route: ActivatedRoute,
    private hotelService: HotelService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelIdString = paramMap.get('hotelId');

        this.hotelService.getSelectedHotelAndMenuById(this.hotelIdString);
        this.selectedHotel$.subscribe((hotel) => {
          if (hotel.address) {
            this.addressString =
              hotel.address.addressLine1 +
              (hotel.address.addressLine2
                ? ', ' + hotel.address.addressLine2
                : '') +
              ', ' +
              hotel.address.city +
              ' - ' +
              hotel.address.pincode;
          } else {
            this.addressString = null;
          }
        });
      } else {
        console.log('else in hotel menu list ngOnInit');
      }
    });
  }

  addToCart(menuItem: MenuItem) {
    this.store.dispatch(new AddItemToCart({ item: menuItem, quantity: 1 }));
  }

  ngOnDestroy() {}
}
