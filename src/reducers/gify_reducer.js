import {
  SET_FAVORITE_GIF,
  REMOVE_FAVORITE_GIF,
  START_OVER
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log("state", state);
  switch (type) {
    case SET_FAVORITE_GIF:
      return [...state, payload];
    case REMOVE_FAVORITE_GIF:
      return state.filter((data, index) => {
        return index !== payload;
      });
    case START_OVER:
      return (state = initialState);
    default:
      return state;
  }
}
