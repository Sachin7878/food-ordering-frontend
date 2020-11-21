import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
// import { Hotel } from '../hotels/hotel.model';
// import { MenuItem } from '../hotels/menu-item.model';
import {
  StartLoading,
  StopLoading,
  SetAuthenticated,
  SetUnauthenticated,
  SetAdminTrue,
  SetAdminFalse,
  // LoadHotelsSuccess,
  // LoadSelectedHotelSuccess,
  // LoadSelectedHotelMenuSuccess,
} from './app.actions';

export interface AppStateModel {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  // hotelsList: Hotel[];
  // selectedHotel: Hotel;
  // selectedHotelMenuItems: MenuItem[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isLoading: false,
    isAuthenticated: false,
    isAdmin: false,
    // hotelsList: [],
    // selectedHotel: null,
    // selectedHotelMenuItems: [],
  },
})
@Injectable()
export class AppState {
  @Selector()
  public static getState(state: AppStateModel) {
    return state;
  }

  @Selector()
  public static isLoading(state: AppStateModel) {
    return state.isLoading;
  }

  @Selector()
  public static isAdmin(state: AppStateModel) {
    return state.isAdmin;
  }

  @Selector()
  public static isAuthenticated(state: AppStateModel) {
    return state.isAuthenticated;
  }

  // @Selector()
  // public static getHotels(state: AppStateModel) {
  //   return state.hotelsList;
  // }

  // @Selector()
  // public static getSelectedHotel(state: AppStateModel) {
  //   return state.selectedHotel;
  // }

  // @Selector()
  // public static getSelectedHotelMenu(state: AppStateModel) {
  //   return state.selectedHotelMenuItems;
  // }

  @Action(StartLoading)
  public startLoading({ patchState }: StateContext<AppStateModel>) {
    patchState({ isLoading: true });
  }

  @Action(StopLoading)
  public stopLoading({ patchState }: StateContext<AppStateModel>) {
    patchState({ isLoading: false });
  }

  @Action(SetAuthenticated)
  public setAuthenticated({ patchState }: StateContext<AppStateModel>) {
    patchState({ isAuthenticated: true });
  }

  @Action(SetUnauthenticated)
  public setUnauthenticated({ patchState }: StateContext<AppStateModel>) {
    patchState({ isAuthenticated: false });
  }

  @Action(SetAdminTrue)
  public setAdminTrue({ patchState }: StateContext<AppStateModel>) {
    patchState({ isAdmin: true });
  }

  @Action(SetAdminFalse)
  public setAdminFalse({ patchState }: StateContext<AppStateModel>) {
    patchState({ isAdmin: false });
  }

  // @Action(LoadHotelsSuccess)
  // public hotelListLoaded(
  //   { patchState }: StateContext<AppStateModel>,
  //   action: LoadHotelsSuccess
  // ) {
  //   patchState({ hotelsList: [...action.payload] });
  // }

  // @Action(LoadSelectedHotelSuccess)
  // public selectedHotelLoaded(
  //   { patchState }: StateContext<AppStateModel>,
  //   action: LoadSelectedHotelSuccess
  // ) {
  //   patchState({ selectedHotel: action.payload });
  // }

  // @Action(LoadSelectedHotelMenuSuccess)
  // public loadSelectedHotelMenu(
  //   { patchState }: StateContext<AppStateModel>,
  //   action: LoadSelectedHotelMenuSuccess
  // ) {
  //   patchState({ selectedHotelMenuItems: action.payload });
  // }
}
