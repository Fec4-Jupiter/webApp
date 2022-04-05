/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReviewList from './RatingsReviews/ReviewList.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    const { product: { id, name } } = this.props;
    this.state = {
      product: { pId: id, pName: name },
      reviews: [],
      metadata: {},
      sort: 'relevance',
    };
    this.fetchReviews = this.fetchReviews.bind(this);
  }

  componentDidMount() {
    this.fetchReviews();
  }

  // * Fetch all reviews and metadata.
  // * Init state
  fetchReviews() {
    const { product: { pId }, sort } = this.state;
    axios.get(`/reviews?product_id=${pId}&sort=${sort}`)
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          reviews: data.results,
        });
        return axios.get(`/reviews/meta?product_id=${pId}`);
      })
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          metadata: data,
        });
      });
  }

  render() {
    const { product, reviews, metadata } = this.state;
    return (
      <div>
        <h1>Ratings&Reviews</h1>
        {reviews.length === 0 ? <p>Loading Reviews....</p>
          : <ReviewList product={product} reviews={reviews} update={this.fetchReviews} />}
      </div>

    );
  }
}

RatingsReviews.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

export default RatingsReviews;
