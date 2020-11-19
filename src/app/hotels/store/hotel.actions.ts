import { Action } from '@ngrx/store';
import { Hotel } from '../hotel.model';
import { MenuItem } from '../menu-item.model';

export const LOAD_HOTELS = '[HOTEL] Load Hotels';
export const LOAD_HOTELS_SUCCESS = '[HOTEL] Load Hotels Success';
export const LOAD_HOTELS_FAILURE = '[HOTEL] Load Hotels Failure';

export const LOAD_SELECTED_HOTEL = '[HOTEL] Load Selected Hotel';
export const LOAD_SELECTED_HOTEL_SUCCESS =
  '[HOTEL] Load Selected Hotel Success';
export const LOAD_SELECTED_HOTEL_FAILURE =
  '[HOTEL] Load Selected Hotel Failure';

export const LOAD_SELECTED_HOTEL_MENU = '[HOTEL] Load Selected Hotel Menu';
export const LOAD_SELECTED_HOTEL_MENU_SUCCESS =
  '[HOTEL] Load Selected Hotel Menu Success';
export const LOAD_SELECTED_HOTEL_MENU_FAILURE =
  '[HOTEL] Load Selected Hotel Menu Failure';

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

export class LoadSelectedHotel implements Action {
  readonly type = LOAD_SELECTED_HOTEL;
}

export class LoadSelectedHotelSucess implements Action {
  readonly type = LOAD_SELECTED_HOTEL_SUCCESS;
  constructor(public payload: Hotel) {}
}

export class LoadSelectedHotelFailure implements Action {
  readonly type = LOAD_SELECTED_HOTEL_FAILURE;
  constructor(public payload: Error) {}
}

export class LoadSelectedHotelMenu implements Action {
  readonly type = LOAD_SELECTED_HOTEL_MENU;
}

export class LoadSelectedHotelMenuSucess implements Action {
  readonly type = LOAD_SELECTED_HOTEL_MENU_SUCCESS;
  constructor(public payload: MenuItem[]) {}
}

export class LoadSelectedHotelMenuFailure implements Action {
  readonly type = LOAD_SELECTED_HOTEL_MENU_FAILURE;
  constructor(public payload: Error) {}
}

export type HotelActions =
  | LoadHotels
  | LoadHotelsSucess
  | LoadHotelsFailure
  | LoadSelectedHotel
  | LoadSelectedHotelSucess
  | LoadSelectedHotelFailure
  | LoadSelectedHotelMenu
  | LoadSelectedHotelMenuSucess
  | LoadSelectedHotelMenuFailure;
