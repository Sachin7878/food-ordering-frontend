import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppConfig } from '../app-config';
import { GetUserDetails } from '../shared/store/app.actions';
import { User } from './user-model';

// const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private appConfig: AppConfig
  ) {}

  private BACKEND_URL: string = this.appConfig.baseUrl;

  fetchUser() {
    this.http.get<User>(this.BACKEND_URL + '/api/account').subscribe(
      (user) => {
        this.store.dispatch(new GetUserDetails(user));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUserAddress(
    addressId: number,
    addressLine1: string,
    addressLine2: string | undefined,
    city: string,
    state: string,
    country: string,
    pincode: string
  ) {
    const userUpdateAddData = {
      id: addressId,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };

    this.http
      .put(this.BACKEND_URL + '/api/account/address', userUpdateAddData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  updateUser(id, firstName, lastName, mobileNo, email) {
    const userUpdateData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      mobileNo: mobileNo,
      email: email,
    };

    this.http
      .put(this.BACKEND_URL + '/api/account', userUpdateData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  addUserAddress(
    addressLine1: string,
    addressLine2: string | undefined,
    city: string,
    state: string,
    country: string,
    pincode: string
  ) {
    const userAddressAdd = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };

    this.http
      .post(this.BACKEND_URL + '/api/account/address', userAddressAdd)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
