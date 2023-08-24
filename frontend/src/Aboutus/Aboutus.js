import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaHeart, FaChartLine } from 'react-icons/fa';
import './About.css';

const App = () => {
  return (
    <div className="App">
      <Container>
        <header className="my-5">
          <h1 className="text-center">About Us</h1>
        </header>
        <Row className="align-items-center">
          <Col md={4}>
            <div className="feature-box">
              <img
                src="https://via.placeholder.com/150"
                alt="Who We Are"
                className="feature-image"
              />
              <h3>Who We Are</h3>
              <p>
                We are a passionate team of professionals committed to providing the best
                solutions for our clients.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-box">
              <img
                src="https://via.placeholder.com/150"
                alt="What We Do"
                className="feature-image"
              />
              <h3>What We Do</h3>
              <p>
                Our mission is to create innovative products and deliver exceptional services
                to our customers.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-box">
              <img
                src="https://via.placeholder.com/150"
                alt="Our Impact"
                className="feature-image"
              />
              <h3>Our Impact</h3>
              <p>
                With a proven track record, we have made a positive impact on our clients'
                businesses.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={6}>
            <div className="article">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Article 1"
                className="article-image"
              />
              <h3>Article Title 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula at
                tellus cursus tincidunt. Sed pretium est a leo iaculis, eu sagittis elit
                lacinia.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="article">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Article 2"
                className="article-image"
              />
              <h3>Article Title 2</h3>
              <p>
                Proin dignissim est nec nisi rhoncus, ac fringilla eros sagittis. Ut
                consectetur felis a urna posuere, nec lacinia sapien feugiat.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
