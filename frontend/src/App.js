import React, { Component } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Axios from "axios";
import Navigation from "./component/Navigation";
import Home from "./component/Home";
import AddCat from "./component/cats/AddCat";

const URL = process.env.REACT_APP_URL;

export default class App extends Component {
  state = {
    cats: [],
  };
  fetchCats = () => {
    Axios.get(`${URL}/cats`)
      .then((res) => {
        this.setState({ todos: res.data.cats });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchCats();
  }

  render() {
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" cats={this.state.cats} />
          <Route path="/cat/add" exact render={() => <AddCat />} />
        </Switch>
      </Router>
    );
  }
}
