import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromUi from '../shared/ui.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromHotel from '../hotels/store/hotel.reducer';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
  hotel: fromHotel.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  hotel: fromHotel.hotelReducer,
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getIsAdmin = createSelector(getAuthState, fromAuth.getIsAdmin);

export const getHotelsState = createFeatureSelector<fromHotel.State>('hotel');
export const getHotels = createSelector(getHotelsState, fromHotel.getHotels);
