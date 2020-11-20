export class StartLoading {
  public static readonly type = '[UI] Start Loading';
  constructor() {}
}
export class LoadSelectedHotelMenuSuccess {
  public static readonly type = '[HOTEL] Load Selected Hotel Menu Success';
  constructor(public payload) {}
}
