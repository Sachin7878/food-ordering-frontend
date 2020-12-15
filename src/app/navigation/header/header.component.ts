import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  HostBinding,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetThemeStatus } from 'src/app/shared/app.actions';
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

  toggleControl = new FormControl(false);

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit() {
    this.toggleControl.valueChanges.subscribe((val) => {
      this.store.dispatch(new SetThemeStatus(val));
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
