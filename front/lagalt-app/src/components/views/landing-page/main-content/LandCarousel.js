import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProfileProjectsGridItemX from '../../profile-view/my-projects/my-projects-list/list-item/ProfileProjectsGridItemX';
import useProjects from '../../../../hooks/useProjects';
import Projects from '../Projects';


function Carousel() {
  const [projects] = useProjects();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };

  const max6Projects = [...projects];
  while (max6Projects.length > 5) {
    max6Projects.pop();
  }

  return (
    <div className="landing-carousel">
      <Slider {...settings}>
        {max6Projects.map((project) => (
          <div key={project.id}>
            <Projects project={project} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;