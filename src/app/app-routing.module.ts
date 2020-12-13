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
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'hotel/:hotelId/add',
    component: AddMenuItemComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'hotel/:hotelId/:menuId/edit',
    component: EditMenuItemComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'cart', component: ViewCartComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    component: AuthCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, AdminGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
