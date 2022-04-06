/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review.jsx';
import ReviewForm from './ReviewForm.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderReviewForm() {
    const { product } = this.props;
    return (
      <ReviewForm product={product} />
    );
  }

  render() {
    const {
      product, reviews, helpful, moreReviews,
    } = this.props;
    return (
      <div>
        <h2>This is review List</h2>
        <Review reviews={reviews} helpful={helpful} />
        <button type="button" onClick={(e) => moreReviews(e)}>More Reviews</button>
        {this.renderReviewForm()}
      </div>
    );
  }
}
ReviewList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  reviews: PropTypes.instanceOf(Array).isRequired,
  helpful: PropTypes.instanceOf(Function).isRequired,
  moreReviews: PropTypes.instanceOf(Function).isRequired,
};
export default ReviewList;
