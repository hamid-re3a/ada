
import {
  SET_USER, DELETE_USER,
} from '../action';


const initialState = {
  accessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.user,
      };
    case DELETE_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
