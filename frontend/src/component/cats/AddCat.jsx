import React, { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import Axios from "axios";

const URL = process.env.REACT_APP_URL;

export default class AddCat extends Component {
  state = {
    name: "",
    description: "",
    picture: "",
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = () => {
    console.log(this.state);
    Axios.post(`${URL}/cats`, this.state)
      .then((res) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { name, description, picture } = this.state;
    return (
      <div>
        <h1>Add Cat</h1>
        <div>
          <Row>
            <Form.Control
              name="name"
              value={name}
              onChange={this.changeHandler}
            />
          </Row>
          <Row>
            <Form.Control
              name="description"
              value={description}
              onChange={this.changeHandler}
            />
          </Row>
          <Row>
            <Form.Control
              name="picture"
              value={picture}
              onChange={this.changeHandler}
            />
          </Row>

          <Button onClick={this.submitHandler}>Submit</Button>
        </div>
      </div>
    );
  }
}
