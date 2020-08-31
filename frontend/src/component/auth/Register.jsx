import React, { Component } from "react";
import { Row, Form, Button, Container } from "react-bootstrap";

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    username: "",
    mobileNumber: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerHandler = () => {
    //login here
    this.props.register(this.state);
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <div>
          <Container>
            <Row>
              <Form.Control
                name="name"
                type="text"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              <Form.Control
                name="email"
                type="email"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              <Form.Control
                name="mobileNumber"
                type="number"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              <Form.Control
                name="username"
                type="text"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              <Form.Control
                name="password"
                type="password"
                onChange={this.changeHandler}
              />
            </Row>
            <Button variant="primary" block onClick={this.registerHandler}>
              {" "}
              Login
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}
