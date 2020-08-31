import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    console.log(this.props.cats);
    return (
      <div>
        <h1>Home</h1>
        <Container>
          <Row>
            {this.props.cats.map((cat) => (
              <Col key={cat._id} md="4">
                <Card>
                  <Card.Body>
                    {cat.title}
                    <div>
                      <Link to={`/cat/${cat._id}`}>See Cat</Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}
