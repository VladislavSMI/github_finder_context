import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import { Favourite } from "./components/pages/Favourite";

import "./App.css";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/favourite" component={Favourite} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                {/* Not found component has to be at the end => why? */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
