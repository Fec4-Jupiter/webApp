/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
import React, { lazy } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ReviewList = lazy(() => import('./RatingsReviews/ReviewList.jsx'));
const RatingSideBar = lazy(() => import('./RatingsReviews/RatingSideBar.jsx'));
const ProductSideBar = lazy(() => import('./RatingsReviews/ProductSideBar.jsx'));

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
    this.submitReview = this.submitReview.bind(this);
    this.clickReport = this.clickReport.bind(this);
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
    axios.get(`/reviews?product_id=${pId}&sort=${sort}&count=${1000}`)
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
        // console.log('click update');
        this.fetchReviews();
      });
  }

  clickReport(id) {
    axios.put(`/reviews/${id}/report`)
      .then(() => {
        this.fetchReviews();
      });
  }

  changeSort(e) {
    // console.log(e.target.value);
    this.setState({ sort: e.target.value }, () => {
      this.fetchReviews();
    });
  }

  submitReview(review) {
    axios.post('/reviews', review)
      .then((res) => {
        // console.log(res);
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
        <div className="t"><h3>Ratings & Reviews</h3></div>
        <ReviewList
          product={product}
          metadata={metadata}
          reviews={reviews}
          total={total}
          sort={this.changeSort}
          report={this.clickReport}
          helpful={this.clickHelpful}
          submitReview={this.submitReview}
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
          : null}
      </div>
    );
  }
}

RatingsReviews.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

RatingsReviews.displayName = 'RatingsReviews';

export default RatingsReviews;
