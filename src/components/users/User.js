import React, { Fragment, useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";

import { Link } from "react-router-dom";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const {
    getUser,
    loading,
    user,
    repos,
    getUserRepos,
    addFavourite,
    deleteFavourite,
    favourite,
  } = githubContext;

  // In request to the server we have to add empty [] so we are not constatly requesting data, we only request data if something changes
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // we are currently receiving error message that is invalid, if we add getUser and getUserRepos to dependencies, we will just recreate infinite loop again
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    company,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  let existInFavourite = favourite.filter((fav) => fav.login === login);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <div className="text-center">
        <Link to="/" className="btn btn-light">
          Back To Search
        </Link>
        {existInFavourite.length === 0 ? (
          <button
            className="btn btn-light"
            onClick={() => addFavourite({ login, avatar_url })}
          >
            Add To Favourite
          </button>
        ) : (
          <button
            className="btn btn-light"
            onClick={() => deleteFavourite(login)}
          >
            Delete From Favourite
          </button>
        )}
      </div>

      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit GitHub Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-pirmary">
          Hireable: {""}
          {hireable ? (
            <i className="fas fa-check text-success" />
          ) : (
            <i className="fas fa-times-circle text-danger" />
          )}
        </div>
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gist: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
