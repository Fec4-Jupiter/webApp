import React from 'react';
import Rating from 'react-rating';
import emptyStar from './star-empty.png';
import fullStar from './star-full.png';

const PropTypes = require('prop-types');

// This component requires a reviews object, usually
// obtained via reviews.results on a get request to reviews/product_id

function ReviewStars({ reviews }) {
  const reviewAvg = function reviewAvg(list) {
    let reviewTotal = 0;
    const numberOfReviews = reviews.length;

    list.forEach((review) => {
      reviewTotal += review.rating;
    });
    return (reviewTotal / numberOfReviews).toFixed(3);
  };

  return (
    <div className="product-rating">
      <Rating
        readonly
        className="rating-stars"
        initialRating={reviewAvg(reviews)}
        emptySymbol={<img src={emptyStar} className="icon" alt="empty star" />}
        fullSymbol={<img src={fullStar} className="icon" alt="full star" />}
        fractions={4}
      />
      <div>
        <a className="rating-link" href="#RatingsReviews">
          Read all
          {' '}
          {reviews.length}
          {' '}
          reviews
        </a>
      </div>
    </div>
  );
}

ReviewStars.propTypes = {
  reviews: PropTypes.instanceOf(Object).isRequired,
};
export default ReviewStars;
