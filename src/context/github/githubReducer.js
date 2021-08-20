import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
} from "../types";

const GithubState = (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case ADD_FAVOURITE:
      return {
        ...state,
        favourite: [...state.favourite, action.payload],
      };
    case DELETE_FAVOURITE:
      return {
        ...state,
        favourite: state.favourite.filter(
          (fav) => fav.login !== action.payload
        ),
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default GithubState;
