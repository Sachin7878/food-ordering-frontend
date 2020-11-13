import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HotelCreateComponent } from './hotels/hotel-create/hotel-create.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelMenuListComponent } from './hotels/hotel-menu-list/hotel-menu-list.component';

const routes: Routes = [
  { path: '', component: HotelListComponent },
  { path: 'hotelCreate', component: HotelCreateComponent },
  { path: 'hotel/:hotelId', component: HotelMenuListComponent },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
