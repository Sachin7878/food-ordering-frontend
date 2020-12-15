import { Address } from '../address.model';
import { User } from '../user/user-model';

export class StartLoading {
  public static readonly type = '[UI] Start Loading';
  constructor() {}
}

export class StopLoading {
  public static readonly type = '[UI] Stop Loading';
  constructor() {}
}

export class SetAuthenticated {
  public static readonly type = '[Auth] Set Authenticated';
  constructor() {}
}

export class SetUnauthenticated {
  public static readonly type = '[Auth] Set Unauthenticated';
  constructor() {}
}

export class SetAdminTrue {
  public static readonly type = '[Auth] Set Admin True';
  constructor() {}
}

export class SetAdminFalse {
  public static readonly type = '[Auth] Set Admin False';
  constructor() {}
}

export class GetUserDetails {
  public static readonly type = '[User] Get User Details';
  constructor(public payload: User) {}
}

export class SetThemeStatus {
  public static readonly type = '[Theme] Update Theme';
  constructor(public payload: boolean) {}
}

// export class GetUserAddress {
//   public static readonly type = '[User] Get User Address';
//   constructor(public payload: Address) {}
// }
