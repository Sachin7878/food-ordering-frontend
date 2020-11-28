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
