import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Address } from '../address.model';
import { StartLoading, StopLoading } from '../shared/app.actions';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private store: Store) {}

  fetchUserAddress() {
    this.store.dispatch(new StartLoading());

    this.http.get<Address>(BACKEND_URL).subscribe(
      (hotel) => {
        this.store.dispatch(new StopLoading());
      },
      () => {
        this.store.dispatch(new StopLoading());
      }
    );
  }
}
