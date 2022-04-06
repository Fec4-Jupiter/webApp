/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Carousel from 'react-gallery-carousel';
import Thumbs from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-gallery-carousel/dist/index.css';
import notAvailable from '../Common/imageNotAvailable.png';

const PropTypes = require('prop-types');

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    const { currentStyle, currentImage } = props;
    const images = currentStyle.photos.map((photoObj) => {
      const src = photoObj.url || notAvailable;
      return { src };
    });
    this.state = {
      images,
      currentStyle,
      currentImage: (currentImage >= images.length) ? images.length : currentImage,
    };
    this.thumbClick = this.thumbClick.bind(this);
    this.mainChange = this.mainChange.bind(this);
  }

  thumbClick(e) {
    e.preventDefault();
    const { images, currentStyle } = this.state;
    const { updateImage } = this.props;
    const currentImage = parseInt(e.target.alt, 10);
    updateImage(currentImage);
    this.setState({
      images,
      currentStyle,
      currentImage,
    });
  }

  mainChange({ curIndex }) {
    const { images, currentStyle } = this.state;
    const { updateImage } = this.props;
    const currentImage = curIndex;
    updateImage(currentImage);
    this.setState({
      images,
      currentStyle,
      currentImage,
    });
  }

  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 7,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 7,
      },
    };
    const { images, currentImage } = this.state;
    return (
      <div className="image-gallery">
        <Carousel className="mainimage" index={currentImage} images={images} onIndexChange={this.mainChange} isLoop={false} hasMediaButton={false} hasIndexBoard={false} hasDotButtonsAtMax="bottom" hasThumbnails={false} shouldMaximizeOnClick shouldMinimizeOnClick hasSizeButton={false} />
        <Thumbs className="thumbnails" infinite={false} showDots={false} responsive={responsive} itemClass="thumbnail-item">
          {images.map((image, index) => (
            <img
              key={image.src}
              onClick={this.thumbClick}
              src={image.src}
              alt={index}
              className={(index === currentImage) ? 'selectedThumbnail' : 'thumbnail-item'}
            />
          ))}
        </Thumbs>
      </div>
    );
  }
}

Gallery.propTypes = {
  currentStyle: PropTypes.instanceOf(Object).isRequired,
  currentImage: PropTypes.number.isRequired,
  updateImage: PropTypes.instanceOf(Function).isRequired,
};

export default Gallery;
