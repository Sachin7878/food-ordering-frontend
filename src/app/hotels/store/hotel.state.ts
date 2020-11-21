import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Hotel } from '../hotel.model';
import { MenuItem } from '../menu-item.model';
import {
  LoadHotelsSuccess,
  LoadSelectedHotelMenuSuccess,
  LoadSelectedHotelSuccess,
} from './hotel.actions';

export interface HotelStateModel {
  hotelsList: Hotel[];
  selectedHotel: Hotel;
  selectedHotelMenuItems: MenuItem[];
}

@State<HotelStateModel>({
  name: 'hotel',
  defaults: {
    hotelsList: [],
    selectedHotel: null,
    selectedHotelMenuItems: [],
  },
})
@Injectable()
export class HotelState {
  @Selector()
  public static getState(state: HotelStateModel) {
    return state;
  }

  @Selector()
  public static getHotels(state: HotelStateModel) {
    return state.hotelsList;
  }

  @Selector()
  public static getSelectedHotel(state: HotelStateModel) {
    return state.selectedHotel;
  }

  @Selector()
  public static getSelectedHotelMenu(state: HotelStateModel) {
    return state.selectedHotelMenuItems;
  }

  @Action(LoadHotelsSuccess)
  public hotelListLoaded(
    { patchState }: StateContext<HotelStateModel>,
    action: LoadHotelsSuccess
  ) {
    patchState({ hotelsList: [...action.payload] });
  }

  @Action(LoadSelectedHotelSuccess)
  public selectedHotelLoaded(
    { patchState }: StateContext<HotelStateModel>,
    action: LoadSelectedHotelSuccess
  ) {
    patchState({ selectedHotel: action.payload });
  }

  @Action(LoadSelectedHotelMenuSuccess)
  public loadSelectedHotelMenu(
    { patchState }: StateContext<HotelStateModel>,
    action: LoadSelectedHotelMenuSuccess
  ) {
    patchState({ selectedHotelMenuItems: action.payload });
  }
}
