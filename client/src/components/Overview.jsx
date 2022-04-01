import React from 'react';
import ReviewStars from './Common/ReviewStars.jsx';

const reviews = [{
  review_id: 1155753, rating: 5, summary: 'This product was great!', recommend: true, response: '', body: 'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.', date: '2019-01-01T00:00:00.000Z', reviewer_name: 'funtime', helpfulness: 8, photos: [],
}, {
  review_id: 1155754, rating: 4, summary: 'This product was ok!', recommend: false, response: '', body: 'I really did not like this product solely because I am tiny and do not fit into it.', date: '2019-01-11T00:00:00.000Z', reviewer_name: 'mymainstreammother', helpfulness: 2, photos: [],
},
];

function Overview({ currentProduct }) {
  return (
    <div>
      Overview
      <ReviewStars reviews={reviews} />
    </div>
  );
}

export default Overview;
