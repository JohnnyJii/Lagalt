import React from 'react'
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
