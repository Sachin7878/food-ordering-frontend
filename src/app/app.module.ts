import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelCreateComponent } from './hotels/hotel-create/hotel-create.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HotelsComponent,
    HotelCreateComponent,
    HotelListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
