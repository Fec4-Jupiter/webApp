import React from 'react';
import ReviewStars from './Common/ReviewStars.jsx';


class Overview extends React.Component {
  constructor(props) {
    super(props);
    let {styles, reviews, product} = props;
    let currentStyle = styles.filter(style => style['default?']);
    this.state = {
      currentStyle,
      styles,
      reviews,
      product,
    };
  }

  render() {
    const {styles, reviews, product, currentStyle} = this.state;
    return (
      <div>
        Image Gallery Component
        {reviews.length ? <ReviewStars reviews={reviews} /> : '' }
        {product.category}
        <br></br>
        {product.name}
        <br></br>
        {currentStyle ? currentStyle.price : ''}
        <br></br>
        Style selector component here
        <br></br>
        Add to Cart component here
        <br></br>
        <button type="button">Facebook</button>
        <button type="button">Twitter</button>
        <button type="button">Pinterest</button>
        <br></br>
        <b>{product.slogan}</b><br></br>
        {product.description}<br></br>
      </div>
        );
  }
}

export default Overview;
