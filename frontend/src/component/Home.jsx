import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

const URL = process.env.REACT_APP_URL;

export default class Home extends Component {
  state = {
    cats: [],
  };
  fetchCats = () => {
    Axios.get(`${URL}/cats`)
      .then((res) => {
        this.setState({ cats: res.data.cats });
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
    console.log(this.state.cats);
    return (
      <div>
        <h1>Home</h1>
        <Container>
          <Row>
            {this.state.cats.map((cat) => (
              <Col key={cat._id} md="4">
                <Card>
                  <Card.Body>
                    <img src={cat.picture} />
                    <div>
                      <Link to={`/cat/${cat._id}`}>{cat.name}</Link>
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
