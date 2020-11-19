import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css'],
})
export class AuthCardComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
}
