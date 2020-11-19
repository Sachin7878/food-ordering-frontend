import { Hotel } from '../hotel.model';
import { MenuItem } from '../menu-item.model';
import {
  HotelActions,
  LOAD_HOTELS,
  LOAD_HOTELS_SUCCESS,
  LOAD_HOTELS_FAILURE,
  LOAD_SELECTED_HOTEL,
  LOAD_SELECTED_HOTEL_SUCCESS,
  LOAD_SELECTED_HOTEL_FAILURE,
  LOAD_SELECTED_HOTEL_MENU,
  LOAD_SELECTED_HOTEL_MENU_SUCCESS,
  LOAD_SELECTED_HOTEL_MENU_FAILURE,
} from './hotel.actions';

export interface State {
  hotels: Hotel[];
  selectedHotel: Hotel;
  selectedHotelMenu: MenuItem[];
  error: Error;
}

const initialState: State = {
  hotels: [{ id: 123, hotelName: 'DummyHotel', mobileNo: 8446651582 }],
  selectedHotel: null,
  selectedHotelMenu: null,
  error: undefined,
};

export function hotelReducer(state = initialState, action: HotelActions) {
  switch (action.type) {
    case LOAD_HOTELS:
      return {
        ...state,
      };
    case LOAD_HOTELS_SUCCESS:
      return {
        ...state,
        hotels: action.payload,
      };
    case LOAD_HOTELS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOAD_SELECTED_HOTEL:
      return {
        ...state,
      };
    case LOAD_SELECTED_HOTEL_SUCCESS:
      return {
        ...state,
        selectedHotel: action.payload,
      };
    case LOAD_SELECTED_HOTEL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOAD_SELECTED_HOTEL_MENU:
      return {
        ...state,
      };
    case LOAD_SELECTED_HOTEL_MENU_SUCCESS:
      return {
        ...state,
        selectedHotelMenu: action.payload,
      };
    case LOAD_SELECTED_HOTEL_MENU_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
}

export const getHotels = (state: State) => state.hotels;
export const getSelectedHotel = (state: State) => state.selectedHotel;
export const getSelectedHotelMenu = (state: State) => state.selectedHotelMenu;
// export const getIsAdmin = (state: State) => state.isAdmin;
