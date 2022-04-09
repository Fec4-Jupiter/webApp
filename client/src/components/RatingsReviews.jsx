/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReviewList from './RatingsReviews/ReviewList.jsx';
import RatingSideBar from './RatingsReviews/RatingSideBar.jsx';
import ProductSideBar from './RatingsReviews/ProductSideBar.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    const { product: { id, name } } = this.props;
    this.state = {
      product: { pId: id, pName: name },
      reviews: [],
      metadata: {},
      sort: 'relevance',
      count: 2,
    };
    this.clickHelpful = this.clickHelpful.bind(this);
    this.moreReviews = this.moreReviews.bind(this);
  }

  componentDidMount() {
    this.fetchReviews();
  }

  // * Fetch all reviews and metadata.
  // * Init state
  fetchReviews() {
    const { product: { pId }, sort, count } = this.state;
    axios.get(`/reviews?product_id=${pId}&sort=${'helpful'}&count=${count}`)
      .then(({ data }) => {
        // console.log(data.results);
        this.setState({
          reviews: data.results,
          reviewsToShow: data.results,
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

  // *------------------------- For Review List ----------------------
  clickHelpful(id) {
    axios.put(`/reviews/${id}/helpful`)
      .then(() => {
        // console.log('click update');
        this.fetchReviews();
      });
  }

  moreReviews(e) {
    e.preventDefault();
    const { count } = this.state;
    this.setState({ count: count + 2 }, () => {
      this.fetchReviews();
    });
  }
  // !------------------------- For Review List end ----------------------

  render() {
    const { product, reviews, metadata } = this.state;
    return (
      <div className="review-container">
        <div className="t"><h1>Ratings & Reviews</h1></div>
        {reviews.length === 0 ? <p>Loading Reviews....</p>
          : (
            <ReviewList
              product={product}
              reviews={reviews}
              helpful={this.clickHelpful}
              moreReviews={this.moreReviews}
            />
          )}
        <div className="r"><RatingSideBar /></div>
        <div className="p"><ProductSideBar /></div>
      </div>

    );
  }
}

RatingsReviews.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

export default RatingsReviews;
