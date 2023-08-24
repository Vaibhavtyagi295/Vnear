import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaBoxOpen, FaStore, FaUtensils, FaHandsHelping } from 'react-icons/fa';
import './join.css';

const App = () => {
  return (
    <div className="App">
      <Container>
        <header className="my-5">
          <h1 className="text-center">Join Us</h1>
        </header>
        <Row className="mb-5">
          <Col md={6}>
            <div className="category-box">
              <FaBoxOpen className="category-icon" />
              <h3>Old Item Selling Shop</h3>
              <p>
                Join our platform to sell your old items and discover unique treasures from
                other sellers.
              </p>
              <Button variant="primary">Join Now</Button>
            </div>
          </Col>
          <Col md={6}>
            <div className="category-box">
              <FaStore className="category-icon" />
              <h3>New Product Selling Shop</h3>
              <p>
                Start your online business and showcase your new products to a wide audience
                of potential customers.
              </p>
              <Button variant="primary">Join Now</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="category-box">
              <FaUtensils className="category-icon" />
              <h3>Food Restaurant Openings</h3>
              <p>
                If you're a restaurateur looking to expand your reach, join us to connect with
                food enthusiasts.
              </p>
              <Button variant="primary">Join Now</Button>
            </div>
          </Col>
          <Col md={6}>
            <div className="category-box">
              <FaHandsHelping className="category-icon" />
              <h3>Open Your Shop (Free)</h3>
              <p>
                Whether you're a creator, artist, or entrepreneur, you can open your shop on
                our platform for free.
              </p>
              <Button variant="primary">Join Now</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
