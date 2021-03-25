import React from 'react'
import LandingCarousel from './LandingCarousel'
import './Landing.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfileProjectsGridItem from '../profile-projects/profile-projects-grid/ProfileProjectsGridItem';

function Landing() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear"
  }


  return (
    <div className="landing-carousel">
      <Slider {...settings}>
        <div>
          <ProfileProjectsGridItem />
        </div>
        <div>
        <ProfileProjectsGridItem />
        </div>
        <div>
        <ProfileProjectsGridItem />
        </div>
        <div>
        <ProfileProjectsGridItem />
        </div>
        <div>
        <ProfileProjectsGridItem />
        </div>
        <div>
        <ProfileProjectsGridItem />
        </div>
    </Slider>
    </div>
  );
}

export default Landing;
