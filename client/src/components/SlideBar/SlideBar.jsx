import React from 'react';
import Flickity from 'react-flickity-component';
import style from './SlideBar.module.sass';
import carouselConstants from '../../carouselConstants';
import './flickity.css';

const SliderBar = ({ carouselType, images }) => {
  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  };

  const getStyleName = () => {
    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER:
        return style.mainCarousel;
      case carouselConstants.EXAMPLE_SLIDER:
        return style.exampleCarousel;
      case carouselConstants.FEEDBACK_SLIDER:
        return style.feedbackCarousel;
      default:
        return '';
    }
  };

  const renderSlides = () => {
    return Object.keys(images).map((key, index) => {
      switch (carouselType) {
        case carouselConstants.MAIN_SLIDER:
          return (
            <img
              src={images[key]}
              alt="slide"
              key={index}
              className={style['carousel-cell']}
            />
          );
        case carouselConstants.EXAMPLE_SLIDER:
          return (
            <div className={style['example-cell']} key={index}>
              <img src={images[key]} alt="slide" />
              <p>{carouselConstants.EXAMPLE_SLIDER_TEXT[index]}</p>
            </div>
          );
        case carouselConstants.FEEDBACK_SLIDER:
          return (
            <div className={style['feedback-cell']} key={index}>
              <img src={images[key]} alt="slide" />
              <p>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].feedback}</p>
              <span>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].name}</span>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <Flickity className={getStyleName()} elementType="div" options={options}>
      {renderSlides()}
    </Flickity>
  );
};

export default SliderBar;