import React, { useReducer, useEffect } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID_PRODUCTION;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET_PRODUCTION;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    favourite: JSON.parse(localStorage.getItem("favouriteUsers"))
      ? JSON.parse(localStorage.getItem("favouriteUsers"))
      : [],
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  useEffect(() => {
    localStorage.setItem("favouriteUsers", JSON.stringify(state.favourite));
  }, [state.favourite]);

  // Search Github users
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });

    // We do not have to setLoading to false here, we will do it in our reducer
  };

  // Get User

  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Add favourite
  const addFavourite = (favouriteUser) => {
    const uniqueFavouriteUser = state.favourite.filter(
      (fav) => fav.login === favouriteUser.login
    );

    if (!uniqueFavouriteUser.length) {
      dispatch({ type: ADD_FAVOURITE, payload: favouriteUser });
    }
  };


// Delete Favourite
  const deleteFavourite = (login) => {
    dispatch({type: DELETE_FAVOURITE, payload: login})
  }

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        favourite: state.favourite,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        addFavourite,
        deleteFavourite,
      }}
    >
      {/* why do I need props.children? */}
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
