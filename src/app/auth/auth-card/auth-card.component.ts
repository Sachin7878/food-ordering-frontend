import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/store/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css'],
})
export class AuthCardComponent implements OnInit {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(AppState.isAuthenticated) isAuth$: Observable<boolean>;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isAuth$.subscribe((res) => {
      if (res) {
        this.router.navigate(['/']);
      }
    });
  }
}
