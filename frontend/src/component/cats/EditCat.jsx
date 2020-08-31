import React, { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";

export default class EditCat extends Component {
  state = {
    name: this.props.cat.name,
    picture: this.props.cat.picture,
    description: this.props.cat.description,
  };

  changeHandler = (e) => {
    console.log("I am editing the: ", e.target.name);
    //allow a re render in item.jsx
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    this.props.editItem(this.state, this.props.cat._id);
  };

  render() {
    let { name, picture, description } = this.state;
    return (
      <div>
        <h1>Edit Cat</h1>
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
              name="picture"
              value={picture}
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
          <Button onClick={this.submitHandler}>Submit</Button>
        </div>
      </div>
    );
  }
}
