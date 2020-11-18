import {
  AuthActions,
  SET_ADMIN_FALSE,
  SET_ADMIN_TRUE,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const initialState: State = {
  isAuthenticated: false,
  isAdmin: false,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_ADMIN_TRUE:
      return {
        ...state,
        isAdmin: true,
      };
    case SET_ADMIN_FALSE:
      return {
        ...state,
        isAdmin: false,
      };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getIsAdmin = (state: State) => state.isAdmin;
