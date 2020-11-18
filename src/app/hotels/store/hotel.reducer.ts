import { Hotel } from '../hotel.model';
import {
  HotelActions,
  LOAD_HOTELS,
  LOAD_HOTELS_SUCCESS,
  LOAD_HOTELS_FAILURE,
} from './hotel.actions';

export interface State {
  hotels: Hotel[];
  selectedHotel: Hotel;
  error: Error;
}

const initialState: State = {
  hotels: [{ id: 123, hotelName: 'DummyHotel', mobileNo: 8446651582 }],
  selectedHotel: null,
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
    default: {
      return state;
    }
  }
}

export const getHotels = (state: State) => state.hotels;
// export const getIsAdmin = (state: State) => state.isAdmin;
