import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';

export interface CartStateModel {}

@State<CartStateModel>({
  name: 'cart',
  defaults: {},
})
@Injectable()
export class AppState {
  @Selector()
  public static getState(state: CartStateModel) {
    return state;
  }
}
