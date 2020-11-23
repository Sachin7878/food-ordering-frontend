import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store
      .select((state) => state.app.isAuthenticated)
      .pipe(take(1));
  }
}
