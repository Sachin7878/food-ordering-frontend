import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HotelCreateComponent } from './hotels/hotel-create/hotel-create.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelsComponent } from './hotels/hotels.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotelList', component: HotelListComponent },
  { path: 'hotelCreate', component: HotelCreateComponent },
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
