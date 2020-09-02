import React, { Component } from "react";
import Axios from "axios";

import { Container, Button } from "react-bootstrap";
import EditCat from "./EditCat";
import { Redirect } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

export default class Cat extends Component {
  state = {
    cat: null,
    edit: false,
    deleteCat: false,
  };

  showEdit = () => {
    this.setState((prevState) => ({ edit: !prevState.edit }));
  };
  editCats = (obj, id) => {
    Axios.put(`${URL}/cats/${id}`, obj)
      .then((res) => {
        // console.log("done");
        //call method to call a re render
        this.getCat();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeCat = () => {
    Axios.delete(`${URL}/cats/${this.props.match.params.id}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ deleteCat: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCat = () => {
    Axios.get(`${URL}/cats/${this.props.match.params.id}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ cat: res.data.cat });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getCat();
  }
  render() {
    let { cat, edit, deleteCat } = this.state;
    if (deleteCat) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <h1>Single Cat</h1>
        {cat ? (
          <div>
            {cat.name}
            <div>{cat.description} </div>
            <div>
              <img src={cat.picture} width="400" />{" "}
            </div>
            <div>Last seen: {cat.location}</div>
            <Button onClick={this.showEdit}>Update Cat</Button>
            {edit && <EditCat cat={cat} editCat={this.editCats} />}
          </div>
        ) : (
          "ho liao buey!"
        )}

        <button onClick={this.removeCat}>Remove cat</button>
      </Container>
    );
  }
}
