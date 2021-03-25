import React from 'react'
import Carou from '../../shared/LandCarousel'
import LandingMain from '../../shared/landingMain/LandingMain'
import './Landing.css'


function Landing() {


  return (
    <div className="landing">
      <Carou />
      <LandingMain />
    </div>
  );
}

export default Landing;
