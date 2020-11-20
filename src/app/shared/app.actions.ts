import { Hotel } from '../hotels/hotel.model';
import { MenuItem } from '../hotels/menu-item.model';

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

export class LoadHotels {
  public static readonly type = '[HOTEL] Load Hotels';
}

export class LoadHotelsSuccess {
  public static readonly type = '[HOTEL] Load Hotels Success';
  constructor(public payload: Hotel[]) {}
}

export class LoadHotelsFailure {
  public static readonly type = '[HOTEL] Load Hotels Failure';
  constructor() {}
}

export class LoadSelectedHotel {
  public static readonly type = '[HOTEL] Load Selected Hotel';
}

export class LoadSelectedHotelSuccess {
  public static readonly type = '[HOTEL] Load Selected Hotel Success';
  constructor(public payload: Hotel) {}
}

export class LoadSelectedHotelFailure {
  public static readonly type = '[HOTEL] Load Selected Hotel Failure';
  constructor() {}
}

export class LoadSelectedHotelMenu {
  public static readonly type = '[HOTEL] Load Selected Hotel Menu';
}

export class LoadSelectedHotelMenuSuccess {
  public static readonly type = '[HOTEL] Load Selected Hotel Menu Success';
  constructor(public payload: MenuItem[]) {}
}

export class LoadSelectedHotelMenuFailure {
  public static readonly type = '[HOTEL] Load Selected Hotel Menu Failure';
  constructor() {}
}
