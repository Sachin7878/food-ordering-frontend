import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import {
  StartLoading,
  StopLoading,
  SetAuthenticated,
  SetUnauthenticated,
  SetAdminTrue,
  SetAdminFalse,
} from './app.actions';

export interface AppStateModel {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isLoading: false,
    isAuthenticated: false,
    isAdmin: false,
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
}
