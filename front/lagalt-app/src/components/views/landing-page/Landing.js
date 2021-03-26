import React from 'react'
import Carou from '../../shared/LandCarousel'
import LandingMain from '../../shared/landingMain/LandingMain'
import './Landing.css'


function Landing() {


  return (
    <div  className="landing">
      <div>
      <Container>
        <Row>
          <Col></Col>
            <Col>
              <Carou />
            </Col>
          <Col></Col>
        </Row>
    </Container>
    </div>
    <br />
    <div>
      {/* <LowerNav /> */}
    </div>
      <div>
        <LandingMain />
      </div>
    </div>
  );
}

export default Landing;
