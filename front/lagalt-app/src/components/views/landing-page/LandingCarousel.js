import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ProfileProjectsGridItem from '../profile-projects/profile-projects-grid/ProfileProjectsGridItem'


function LandingCarousel() {
  return (
    <div className="landing-carousel">
        <Carousel>
          <Carousel.Item style={{'height': "300px"}}>
            <ProfileProjectsGridItem  />
            <Carousel.Caption>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{'height': "300px"}}>
            <ProfileProjectsGridItem />
            <Carousel.Caption>

            </Carousel.Caption>
          </Carousel.Item>
         <Carousel.Item style={{'height': "300px"}}>
            <ProfileProjectsGridItem />
            <Carousel.Caption>   
                
            </Carousel.Caption>
          </Carousel.Item> 
      </Carousel>
    </div>
  );
}

export default LandingCarousel;
