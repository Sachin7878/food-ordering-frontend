import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelCreateComponent } from './hotels/hotel-create/hotel-create.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelMenuListComponent } from './hotels/hotel-menu-list/hotel-menu-list.component';
import { ViewCartComponent } from './cart/view-cart/view-cart.component';
import { AuthCardComponent } from './auth/auth-card/auth-card.component';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';
import { AddMenuItemComponent } from './hotels/add-menu-item/add-menu-item.component';
import { EditMenuItemComponent } from './hotels/edit-menu-item/edit-menu-item.component';
import { EditAccountComponent } from './user/edit-account/edit-account.component';
import { EditAddressComponent } from './user/edit-address/edit-address.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VendorDashboardComponent } from './vendor/vendor-dashboard/vendor-dashboard.component';
import { VendorGuard } from './auth/vendor.guard';
import { MasterGuard } from './auth/master.guard';
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { EditOrdersComponent } from './orders/edit-orders/edit-orders.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HotelListComponent },
  {
    path: 'hotelCreate',
    component: HotelCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hotel/:hotelId',
    component: HotelMenuListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hotel/:hotelId/edit',
    component: HotelEditComponent,
    canActivate: [MasterGuard],
  },
  {
    path: 'hotel/:hotelId/add',
    component: AddMenuItemComponent,
    canActivate: [MasterGuard],
  },
  {
    path: 'hotel/:hotelId/:menuId/edit',
    component: EditMenuItemComponent,
    canActivate: [MasterGuard],
  },
  { path: 'cart', component: ViewCartComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    component: AuthCardComponent,
  },
  {
    path: 'vendorRegister',
    component: SignupComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-account',
    component: EditAccountComponent,
  },
  {
    path: 'edit-address',
    component: EditAddressComponent,
  },
  {
    path: 'vendor-dashboard',
    component: VendorDashboardComponent,
    canActivate: [VendorGuard],
  },
  {
    path: 'orders',
    component: ViewOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/:hotelId',
    component: EditOrdersComponent,
    canActivate: [MasterGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, AdminGuard, VendorGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
