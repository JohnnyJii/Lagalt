import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import LandingCarousel from './LandingCarousel'
import './Landing.css'

function Landing() {
  return (
    <div className="landing-carousel">
      <LandingCarousel />
      <LandingCarousel />
    </div>
  );
}

export default Landing;
