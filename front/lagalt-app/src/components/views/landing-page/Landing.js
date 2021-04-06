import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from './main-content/LandCarousel';
import LandingMain from './main-content/LandingMain';
import LowerNav from './main-content/LowerNav';
import './Landing.css';

function Landing() {

  return (
    <div className="container">
      <Container>
        <Row>
          <Col>
            <Carousel />
          </Col>
        </Row>
      </Container>
      <LowerNav />
      <LandingMain />
    </div>
  );
}

export default Landing;
