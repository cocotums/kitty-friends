import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Map from "../map/Map";

const URL = process.env.REACT_APP_URL;

export default class AddCat extends Component {
  state = {
    name: "",
    description: "",
    picture: "",
    status: false,
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = () => {
    console.log(this.state);
    Axios.post(`${URL}/cats`, this.state)
      .then((res) => {
        console.log("done");
        this.setState({ status: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { name, description, picture, status } = this.state;
    if (status) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Container>
          <h1>Add Cat</h1>
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
          <Row>
            <Map
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Row>

          <Button onClick={this.submitHandler}>Submit</Button>
        </Container>
      </div>
    );
  }
}
