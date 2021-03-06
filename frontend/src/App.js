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
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import { decode } from "jsonwebtoken";
import PrivateRoute from "./component/PrivateRoute";
import { Alert } from "react-bootstrap";
import Cat from "./component/cats/Cat";
import Chat from "./component/chats/Chat";
import "./index.css";

const URL = process.env.REACT_APP_URL;

export default class App extends Component {
  state = {
    cats: [],
    errorMessage: null,
    isAuth: false,
    user: null,
  };

  logoutHandler = (e) => {
    e.preventDefault();
    console.log("i logged out");
    this.setState({
      items: [],
      errorMessage: null,
      isAuth: false,
      user: null,
    });
    localStorage.removeItem("token");
  };

  getUserProfile = (token) => {
    Axios.get(`${URL}/auth/user`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        console.log(res.data);

        this.setState({
          isAuth: true,
          user: res.data.user,
        });
      })
      .catch((err) => {
        // console.log(err);
        // this.setState({
        //   isAuth: false,
        // });
      });
  };
  loginHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/login`, credentials)
      .then((res) => {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        this.getUserProfile(res.data.token); //get uptodate user information

        this.setState({
          isAuth: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          errorMessage: err.response.data.message,
        });
      });
  };

  registerHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/register`, credentials)
      .then((res) => {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        this.setState({
          isAuth: true,
        });
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          isAuth: false,
        });
      });
  };

  componentDidMount() {
    let token = localStorage.getItem("token");

    if (!(token == null)) {
      let decodedToken = decode(token);

      if (!decodedToken) {
        localStorage.removeItem("token");
      } else {
        this.getUserProfile(token);
        // this.setState({
        //   isAuth: true,
        // });
      }
    }
  }

  render() {
    console.log(URL);
    let { isAuth, user, errorMessage } = this.state;
    return (
      <Router>
        <Navigation user={user} logout={this.logoutHandler} />
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <Switch>
          <PrivateRoute exact path="/" isAuth={isAuth} component={Home} />
          {/* <PrivateRoute
            exact
            path="/item/add"
            isAuth={isAuth}
            component={AddItem}
          /> */}

          {/* <Route path="/" exact render={() => <Home />} /> */}
          <Route path="/cat/add" exact render={() => <AddCat />} />

          <PrivateRoute exact path="/cat/:id" isAuth={isAuth} component={Cat} />
          {/* <Route path="/item/:id" component={Item} /> */}
          <Route
            path="/register"
            exact
            render={() =>
              !isAuth ? (
                <Register register={this.registerHandler} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/login"
            exact
            render={() =>
              isAuth ? <Redirect to="/" /> : <Login login={this.loginHandler} />
            }
          />
          <Route
            path="/chat"
            exact
            render={() => <Chat user={this.state.user} />}
          />
        </Switch>
      </Router>
    );
  }
}
