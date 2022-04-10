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
      total: 0,
      metadata: {},
      sort: 'relevance',
      count: 2,
      filters: [],
    };
    this.clickHelpful = this.clickHelpful.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.clickFilters = this.clickFilters.bind(this);
  }

  componentDidMount() {
    this.fetchReviews();
  }

  // * Fetch all reviews and metadata.
  // * Init state
  fetchReviews() {
    const {
      product: { pId }, sort,
    } = this.state;
    axios.get(`/reviews?product_id=${pId}&sort=${sort}`)
      .then(({ data }) => {
        // console.log(data);
        // let reviews = data.results.slice(0, count);
        const reviews = this.filterSelected(data.results);
        // console.log(reviews);
        this.setState({
          reviews,
          total: reviews.length,
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

  filterSelected(arr) {
    const { filters } = this.state;
    return arr.filter((review) => filters.includes(review.rating) || filters.length === 0);
  }

  clickFilters(rating) {
    const { filters } = this.state;
    if (!rating) {
      this.setState({ filters: [] }, () => this.fetchReviews());
    } else {
      // console.log(`rating is ${rating}`);
      const index = filters.indexOf(rating);
      if (index !== -1) {
        filters.splice(index, 1);
        this.setState({ filters }, () => this.fetchReviews());
      } else {
        filters.push(rating);
        this.setState({ filters }, () => this.fetchReviews());
      }
    }
  }

  // *------------------------- For Review List ----------------------
  clickHelpful(id) {
    axios.put(`/reviews/${id}/helpful`)
      .then(() => {
        console.log('click update');
        this.fetchReviews();
      });
  }

  changeSort(e) {
    console.log(e.target.value);
    this.setState({ sort: e.target.value }, () => {
      this.fetchReviews();
    });
  }
  // !------------------------- For Review List end ----------------------

  render() {
    const {
      product, reviews, metadata, total, filters,
    } = this.state;
    return (
      <div className="review-container">
        <div className="t"><h1>Ratings & Reviews</h1></div>
        <ReviewList
          product={product}
          reviews={reviews}
          total={total}
          sort={this.changeSort}
          helpful={this.clickHelpful}
        />
        {Object.keys(metadata).length !== 0
          ? (
            <RatingSideBar
              filters={filters}
              metadata={metadata}
              clickFilters={this.clickFilters}
            />
          ) : null}
        {Object.keys(metadata).length !== 0
          ? (<ProductSideBar metadata={metadata} />)
          : null }
      </div>
    );
  }
}

RatingsReviews.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

export default RatingsReviews;
