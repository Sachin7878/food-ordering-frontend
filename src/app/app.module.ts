import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { HotelCreateComponent } from './hotels/hotel-create/hotel-create.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelMenuListComponent } from './hotels/hotel-menu-list/hotel-menu-list.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error-page/error.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { environment } from '../environments/environment';
import { ViewCartComponent } from './cart/view-cart/view-cart.component';
import { AppState } from './shared/app.state';

import { CommonModule } from '@angular/common';
import { AuthCardComponent } from './auth/auth-card/auth-card.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HotelState } from './hotels/store/hotel.state';
import { CartState } from './cart/store/cart.state';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    HeaderComponent,
    SidenavListComponent,
    ErrorComponent,
    HotelCreateComponent,
    HotelListComponent,
    HotelMenuListComponent,
    ViewCartComponent,
    LoginComponent,
    SignupComponent,
    AuthCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
    CommonModule,

    NgxsModule.forRoot([AppState, HotelState, CartState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
