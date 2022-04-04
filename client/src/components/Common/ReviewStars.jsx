import React from 'react';

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
    return (reviewTotal / numberOfReviews).toFixed(1);
  };

  return (
    <div>
      Rating:
      {' '}
      {reviewAvg(reviews)}
      {' stars. '}
      <a href="#RatingsReviews">
        Read all
        {' '}
        {reviews.length}
        {' '}
        reviews
      </a>
    </div>
  );
}

ReviewStars.propTypes = {
  reviews: PropTypes.instanceOf(Object).isRequired,
};
export default ReviewStars;
