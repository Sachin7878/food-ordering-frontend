import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/app.state';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Select(AppState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
