import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthLoginData } from './auth-login-data.model';
import { AuthRegistrationData } from './auth-registration-data.model';

const BANKEND_URL = 'http://localhost:8080/api';

export const ROLE_ADMIN = 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private isAdmin = false;
  private isLoading = false;
  private isLoadingListener = new Subject<boolean>();
  // private userId: string;

  constructor(private http: HttpClient, private router: Router) {}

  getAuthStatusListener() {
    return this.authStatusListener;
  }

  getIsLoadingListener() {
    return this.isLoadingListener;
  }

  getToken() {
    return this.token;
  }

  getIsLoading() {
    return this.isLoading;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

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
    this.http.post(BANKEND_URL + '/register', authData).subscribe(
      (successUser) => {
        console.log(successUser);
        this.authStatusListener.next(true);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthLoginData = {
      email: email,
      password: password,
    };
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
            this.isAuthenticated = true;
            const roleCheck = response.role;
            if (roleCheck === ROLE_ADMIN) {
              this.isAdmin = true;
            }
            //this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log('Invalid Credentials');
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      //    this.userId = authInfo.userId;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.clearAuthData();
    this.isAdmin = false;
    //this.userId = null;
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expDate', expirationDate.toISOString());
    //  localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    // localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expDate');
    //  const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      //  userId: userId,
    };
  }

  private getRoleFromResp() {}
}
