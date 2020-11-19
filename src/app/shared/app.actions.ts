export class AppAction {
  public static readonly type = '[App] Add item';
  constructor(public payload: string) {}
}

export class StartLoading {
  public static readonly type = '[UI] Start Loading';
  constructor() {}
}

export class StopLoading {
  public static readonly type = '[UI] Stop Loading';
  constructor() {}
}
