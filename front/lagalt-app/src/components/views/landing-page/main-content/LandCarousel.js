import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfileProjectsGridItemX from '../../profile-view/my-projects/my-projects-list/list-item/ProfileProjectsGridItemX';


function Carousel() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        
      };

      return (
        <div className="landing-carousel">
          <Slider {...settings}>
            <div>
              <ProfileProjectsGridItemX />
            </div>
            <div>
              <ProfileProjectsGridItemX />
            </div>
            <div>
              <ProfileProjectsGridItemX />
            </div>
            <div>
              <ProfileProjectsGridItemX />
            </div>
            <div>
              <ProfileProjectsGridItemX />
            </div>
            <div>
              <ProfileProjectsGridItemX />
            </div>
        </Slider>
        </div>
      );
}

export default Carousel;