import React from 'react';
import ReviewStars from './Common/ReviewStars.jsx';
import facebooklogo from './Common/facebooklogo.png';
import twitterlogo from './Common/twitterlogo.png';
import pinterestlogo from './Common/pinterestlogo.png';
import StyleSelector from './Overview/StyleSelector.jsx';
import AddToCart from './Overview/AddToCart.jsx';
import Gallery from './Overview/Gallery.jsx';

const PropTypes = require('prop-types');

class Overview extends React.Component {
  constructor(props) {
    super(props);
    const { styles, reviews, product } = props;
    const currentStyle = styles.filter((style) => style['default?'])[0];
    this.state = {
      currentStyle,
      styles,
      reviews,
      product,
      currentImage: 0,
    };

    this.updateStyle = this.updateStyle.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  updateStyle(currentStyle) {
    const {
      styles, reviews, product, currentImage,
    } = this.state;
    this.setState({
      currentStyle,
      styles,
      reviews,
      product,
      currentImage,
    });
  }

  updateImage(currentImage) {
    const {
      styles, reviews, product, currentStyle,
    } = this.state;
    this.setState({
      currentStyle,
      styles,
      reviews,
      product,
      currentImage,
    });
  }

  render() {
    const {
      styles, reviews, product, currentStyle, currentImage,
    } = this.state;
    return (
      <div className="overview">
        <Gallery
          currentStyle={currentStyle}
          currentImage={currentImage}
          key={currentStyle.style_id}
          updateImage={this.updateImage}
        />
        <div className="product-information right-column">
          {reviews.length ? <ReviewStars reviews={reviews} /> : '' }
          <span className="category">{product.category.toUpperCase()}</span>
          <br />
          <h1 className="name">{product.name}</h1>
          <br />
          <span className="price">{`$${currentStyle.original_price}`}</span>
          <br />
        </div>
        <StyleSelector currentStyle={currentStyle} styles={styles} changeStyle={this.updateStyle} />
        <AddToCart currentStyle={currentStyle} key={currentStyle.style_id * 99} />
        <br />
        <div className="social-buttons right-column">
          <b>Share on Socials</b>
          <div className="flex-break" />
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.URL}`}><img src={facebooklogo} className="logo-button" alt="facebook" /></a>
          <a href={`https://twitter.com/intent/tweet?url=${process.env.URL}&text=`}><img src={twitterlogo} className="logo-button" alt="twitter" /></a>
          <a href={`https://pinterest.com/pin/create/button/?url=${process.env.URL}&media=&description=`}><img src={pinterestlogo} className="logo-button" alt="pinterest" /></a>
          <br />
        </div>
        <div className="product-description">
          <span className="slogan">
            <b>{product.slogan}</b>
          </span>
          <br />
          <span className="description">{product.description}</span>
          <br />
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  reviews: PropTypes.instanceOf(Object).isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,
  product: PropTypes.instanceOf(Object).isRequired,
};

export default Overview;
