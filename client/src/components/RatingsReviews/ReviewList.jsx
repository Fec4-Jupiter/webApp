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
        <div className="o">
          {' '}
          <h2>This is review List</h2>
        </div>
        <div className="rl"><Review reviews={reviews} helpful={helpful} /></div>
        <div className="btn">
          <button type="button" onClick={(e) => moreReviews(e)}>More Reviews</button>
          {' '}
          {this.renderReviewForm()}
        </div>

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
