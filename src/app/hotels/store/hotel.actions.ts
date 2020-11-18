import { Action } from '@ngrx/store';
import { Hotel } from '../hotel.model';

export const LOAD_HOTELS = '[HOTEL] Load Hotels';
export const LOAD_HOTELS_SUCCESS = '[HOTEL] Load Hotels Success';
export const LOAD_HOTELS_FAILURE = '[HOTEL] Load Hotels Failure';

export class LoadHotels implements Action {
  readonly type = LOAD_HOTELS;
}

export class LoadHotelsSucess implements Action {
  readonly type = LOAD_HOTELS_SUCCESS;
  constructor(public payload: Hotel[]) {}
}

export class LoadHotelsFailure implements Action {
  readonly type = LOAD_HOTELS_FAILURE;
  constructor(public payload: Error) {}
}

export type HotelActions = LoadHotels | LoadHotelsSucess | LoadHotelsFailure;
