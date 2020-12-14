import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GetUserDetails,
  StartLoading,
  StopLoading,
} from '../shared/app.actions';
import { User } from './user-model';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private store: Store) {}

  fetchUser() {
    this.store.dispatch(new StartLoading());

    this.http.get<User>(BACKEND_URL + '/api/account').subscribe(
      (user) => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new GetUserDetails(user));
      },
      (error) => {
        this.store.dispatch(new StopLoading());
        console.log(error);
      }
    );
  }
}
