import React from 'react';
import ReviewStars from './Common/ReviewStars.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    const { styles, reviews, product } = props;
    const currentStyle = styles.filter((style) => style['default?']);
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
        {product.category}
        <br />
        {product.name}
        <br />
        {currentStyle ? currentStyle.price : ''}
        <br />
        Style selector component here
        <br />
        Add to Cart component here
        <br />
        <button type="button">Facebook</button>
        <button type="button">Twitter</button>
        <button type="button">Pinterest</button>
        <br />
        <b>{product.slogan}</b>
        <br />
        {product.description}
        <br />
      </div>
    );
  }
}

export default Overview;
