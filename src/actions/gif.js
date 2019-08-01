import { SET_FAVORITE_GIF, REMOVE_FAVORITE_GIF, START_OVER } from "./types";

export const setFavortieGif = gifArray => dispatch => {
  console.log("gifArray", gifArray);
  dispatch({
    type: SET_FAVORITE_GIF,
    payload: gifArray
  });
};

export const removeFavortieGif = indexArray => dispatch => {
  console.log("indexArray", indexArray);
  dispatch({
    type: REMOVE_FAVORITE_GIF,
    payload: indexArray
  });
};

export const startOver = () => dispatch => {
  dispatch({
    type: START_OVER
  });
};
