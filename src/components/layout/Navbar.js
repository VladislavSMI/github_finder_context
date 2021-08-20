import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// We don't use a tags for links, we use LINK from "react-router-dom", with a tags the state is cleared between switching; With a tag there will be complete refresh of the page

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favourite">Favourite</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

// In functional components, we have to transfer default props out of functional components => naming will be component name followed by defaultProps
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
