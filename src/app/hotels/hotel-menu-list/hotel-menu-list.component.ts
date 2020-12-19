import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { MenuItem } from '../menu-item.model';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/app.state';
import { HotelState } from '../store/hotel.state';
import { AddItemToCart } from 'src/app/cart/store/cart.actions';
import { Address } from 'src/app/address.model';

@Component({
  selector: 'app-hotel-menu-list',
  templateUrl: './hotel-menu-list.component.html',
  styleUrls: ['./hotel-menu-list.component.css'],
})
export class HotelMenuListComponent implements OnInit {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;
  @Select(HotelState.getSelectedHotelMenu) selectedHotelMenu$: Observable<
    MenuItem[]
  >;
  @Select(HotelState.getSelectedHotelAddress)
  selectedHotelAddress$: Observable<Address>;

  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;
  @Select(AppState.isVendor) isVendor$: Observable<boolean>;

  hotelIdString: string;
  addressString: string;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private hotelService: HotelService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelIdString = paramMap.get('hotelId');

        this.hotelService.getSelectedHotelAndMenuById(this.hotelIdString);

        this.selectedHotelAddress$.subscribe((address) => {
          if (address) {
            this.addressString =
              address.addressLine1 +
              (address.addressLine2 ? ', ' + address.addressLine2 : '') +
              ', ' +
              address.city +
              ' - ' +
              address.pincode;
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
    this.store.dispatch(
      new AddItemToCart({ id: null, item: menuItem, quantity: 1 })
    );
  }

  editHotel() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
    });
  }

  deleteItem(menuId) {
    this.hotelService.deleteMenuItem(this.hotelIdString, menuId);
  }

  editItem(menuId) {
    this.router.navigate([menuId, 'edit'], { relativeTo: this.route });
  }
}
