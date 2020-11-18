import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_ADMIN_TRUE = '[Auth] Set Admin True';
export const SET_ADMIN_FALSE = '[Auth] Set Admin False';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetAdminTrue implements Action {
  readonly type = SET_ADMIN_TRUE;
}

export class SetAdminFalse implements Action {
  readonly type = SET_ADMIN_FALSE;
}

export type AuthActions =
  | SetAuthenticated
  | SetUnauthenticated
  | SetAdminTrue
  | SetAdminFalse;
