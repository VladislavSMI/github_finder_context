import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

const FavouriteUsers = () => {
  const githubContext = useContext(GithubContext);

  // destructuring from githubContext.loading and githubContext.users
  const { loading, favourite } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {favourite.map((user, index) => (
          <UserItem key={index} user={user} />
        ))}
      </div>
    );
  }
};

// Using style as a variable
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default FavouriteUsers;
