import { Component, HostBinding, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService, ROLE_USER } from './auth/auth.service';
import { LoadCartItems } from './cart/store/cart.actions';
import { AppState } from './shared/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = '';

  @Select(AppState.isDark) isDark$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store) {}
  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.isDark$.subscribe((status) =>
      status ? (this.className = 'darkMode') : (this.className = '')
    );
    if (ROLE_USER) {
      this.store.dispatch(new LoadCartItems());
    }
  }
}
