import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Carousel from '../../shared/LandCarousel'
import LandingMain from '../../shared/landingMain/LandingMain'
import LowerNav from '../../shared/navbar/LowerNav'
import './Landing.css'
 

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
