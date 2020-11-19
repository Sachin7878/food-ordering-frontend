import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginData } from './auth-login-data.model';
import { AuthRegistrationData } from './auth-registration-data.model';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { Store } from '@ngrx/store';

const BANKEND_URL = 'http://localhost:8080/api';

export const ROLE_ADMIN = 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //private isAuthenticated = false;
  private token: string;
  //private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  // private isAdmin = false;
  // private isLoading = false;
  // private isLoadingListener = new Subject<boolean>();
  // private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  // getAuthStatusListener() {
  //   return this.authStatusListener;
  // }

  // getIsLoadingListener() {
  //   return this.isLoadingListener;
  // }

  getToken() {
    return this.token;
  }

  // getIsLoading() {
  //   return this.isLoading;
  // }

  // getIsAuth() {
  //   return this.isAuthenticated;
  // }

  // getIsAdmin() {
  //   return this.isAdmin;
  // }

  // getUserId() {
  //   return this.userId;
  // }

  createUser(
    firstName: string,
    lastName: string,
    email: string,
    mobileNo: string,
    password: string
  ) {
    const authData: AuthRegistrationData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNo: mobileNo,
      password: password,
    };
    this.store.dispatch(new UI.StartLoading());
    this.http.post(BANKEND_URL + '/register', authData).subscribe(
      () => {
        this.store.dispatch(new UI.StopLoading());
        this.login(authData.email, authData.password);
        this.router.navigate(['/']);
      },
      () => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Auth.SetUnauthenticated());
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthLoginData = {
      email: email,
      password: password,
    };
    this.store.dispatch(new UI.StartLoading());
    this.http
      .post<{ token: string; expiresIn: number; role: string }>(
        BANKEND_URL + '/login',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (this.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);

            const roleCheck = response.role;
            if (roleCheck === ROLE_ADMIN) {
              // this.isAdmin = true;
              this.store.dispatch(new Auth.SetAdminTrue());
            }
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Auth.SetAuthenticated());
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, roleCheck);
            this.router.navigate(['/']);
          }
        },
        () => {
          this.store.dispatch(new UI.StopLoading());
          console.log('Invalid Credentials');
          this.store.dispatch(new Auth.SetUnauthenticated());
        }
      );
  }

  autoAuthUser() {
    this.store.dispatch(new UI.StartLoading());
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      //    this.userId = authInfo.userId;
      let roleCheck = authInfo.role;
      if (roleCheck == ROLE_ADMIN) {
        this.store.dispatch(new Auth.SetAdminTrue());
      }
      this.store.dispatch(new Auth.SetAuthenticated());
      this.setAuthTimer(expiresIn / 1000);
    }
    this.store.dispatch(new UI.StopLoading());
  }

  logout() {
    this.token = null;
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.router.navigate(['/']);
    this.clearAuthData();
    this.store.dispatch(new Auth.SetAdminFalse());
    // this.isAdmin = false;
    //this.userId = null;
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expDate', expirationDate.toISOString());
    localStorage.setItem('role', role);
    //  localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    localStorage.removeItem('role');
    // localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expDate');
    const role = localStorage.getItem('role');
    //  const userId = localStorage.getItem('userId');
    if (!token || !expirationDate || !role) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      role: role,
      //  userId: userId,
    };
  }
}
