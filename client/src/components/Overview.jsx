import React from 'react';
import ReviewStars from './Common/ReviewStars.jsx';
import StyleSelector from './Overview/StyleSelector.jsx';

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
    };

    this.updateStyle = this.updateStyle.bind(this);
  }

  updateStyle(currentStyle) {
    const { styles, reviews, product } = this.state;
    this.setState({
      currentStyle,
      styles,
      reviews,
      product,
    });
  }

  render() {
    const {
      styles, reviews, product, currentStyle,
    } = this.state;
    return (
      <div>
        Image Gallery Component
        {reviews.length ? <ReviewStars reviews={reviews} /> : '' }
        <span className="category">{product.category}</span>
        <br />
        <span className="name">{product.name}</span>
        <br />
        <span className="price">{currentStyle.original_price}</span>
        <br />
        <StyleSelector currentStyle={currentStyle} styles={styles} changeStyle={this.updateStyle} />
        <br />
        Add to Cart component here
        <br />
        <button type="button">Facebook</button>
        <button type="button">Twitter</button>
        <button type="button">Pinterest</button>
        <br />
        <span className="slogan">
          <b>{product.slogan}</b>
        </span>
        <br />
        <span className="description">{product.description}</span>
        <br />
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
