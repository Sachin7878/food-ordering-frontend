import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/app.state';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css'],
})
export class AuthCardComponent implements OnInit {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
