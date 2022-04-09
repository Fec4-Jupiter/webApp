/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-children-prop */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import MainImage from 'react-gallery-carousel';
import Thumbnails from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './MainImage.css';
import InnerImageZoom from 'react-inner-image-zoom';
import notAvailable from '../Common/imageNotAvailable.png';
import './InnerImageStyles.css';

const PropTypes = require('prop-types');

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    const { currentStyle, currentImage } = props;
    // If not expanded view, display these images
    let images = currentStyle.photos.map((photoObj) => {
      const src = photoObj.url || notAvailable;
      return { src };
    });
    images = images.concat(images);
    // If we are expanded, display these inner image zoom elements
    const imageZooms = currentStyle.photos.map((photo) => <InnerImageZoom hideHint className="image-zoom" zoomScale={2.5} src={photo.url || notAvailable} />);
    this.state = {
      zoomed: false,
      images,
      imageZooms,
      currentStyle,
      currentImage: (currentImage >= images.length) ? images.length : currentImage,
    };
    this.thumbClick = this.thumbClick.bind(this);
    this.mainChange = this.mainChange.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc, false);
  }

  handleZoom() {
    const {
      images, currentStyle, imageZooms, currentImage, zoomed,
    } = this.state;
    if (!zoomed) {
      this.setState({
        zoomed: true,
        images,
        imageZooms,
        currentStyle,
        currentImage,
      });
    }
  }

  handleEsc(e) {
    if (e.key === 'Escape') {
      const {
        images, currentStyle, imageZooms, currentImage, zoomed,
      } = this.state;
      if (zoomed) {
        this.setState({
          zoomed: false,
          images,
          imageZooms,
          currentStyle,
          currentImage,
        });
      }
    }
  }

  thumbClick(e) {
    e.preventDefault();
    const {
      images, currentStyle, imageZooms, zoomed,
    } = this.state;
    const { updateImage } = this.props;
    const currentImage = parseInt(e.target.alt, 10);
    updateImage(currentImage);
    this.setState({
      zoomed,
      images,
      imageZooms,
      currentStyle,
      currentImage,
    });
  }

  mainChange({ curIndex }) {
    const {
      images, currentStyle, imageZooms, zoomed,
    } = this.state;
    const { updateImage } = this.props;
    const currentImage = curIndex;
    updateImage(currentImage);
    this.setState({
      zoomed,
      images,
      imageZooms,
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
    };
    const {
      images, currentImage, imageZooms, zoomed,
    } = this.state;
    const thumbs = images.map((image, index) => (
      <img
        key={image.src}
        onClick={this.thumbClick}
        src={image.src}
        alt={index}
        className={(index === currentImage) ? 'selected-image thumbnail-image' : 'thumbnail-image'}
      />
    ));
    return (
      <div className="image-gallery" key={zoomed}>
        {zoomed
          ? <MainImage className="main-image zoomed" isMaximized index={currentImage} objectFit="contain" children={imageZooms} onIndexChange={this.mainChange} isLoop={false} hasMediaButton={false} hasIndexBoard={false} hasDotButtonsAtMax="bottom" hasThumbnails={false} hasSizeButton={false} />
          : <MainImage className="main-image unzoomed" index={currentImage} onTap={this.handleZoom} objectFit="contain" images={images} onIndexChange={this.mainChange} isLoop={false} hasMediaButton={false} hasIndexBoard={false} hasDotButtonsAtMax="bottom" hasThumbnails={false} hasSizeButton={false} />}
        <div className="thumbnails">
          <Thumbnails items={thumbs} controlsStrategy="responsive" activeIndex={currentImage} disableDotsControls innerWidth={0} responsive={{ 0: { items: 7 } }} />
        </div>
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
