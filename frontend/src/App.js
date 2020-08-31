import React, { Component } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import Navigation from "./component/Navigation";
import Home from "./component/Home";
import AddCat from "./component/cats/AddCat";

const URL = process.env.REACT_APP_URL;

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" exact render={() => <Home />} />
          <Route path="/cat/add" exact render={() => <AddCat />} />
        </Switch>
      </Router>
    );
  }
}
