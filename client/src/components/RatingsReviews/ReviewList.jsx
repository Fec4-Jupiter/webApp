/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    const count = 2;
    this.state = {
      count,
      reviews: props.reviews.slice(0, count),
    };
  }

  moreReviews() {
    const { reviews } = this.props;
    let { count } = this.state;
    count += 2;
    this.setState({
      count,
      reviews: reviews.slice(0, count),
    });
  }

  render() {
    const { update } = this.props;
    const { reviews } = this.state;
    return (
      <div>
        <h2>This is review List</h2>
        <Review reviews={reviews} update={update} />
        <button type="button" onClick={() => this.moreReviews()}>More Reviews</button>
      </div>
    );
  }
}
ReviewList.propTypes = {
  reviews: PropTypes.instanceOf(Object).isRequired,
  update: PropTypes.instanceOf(Function).isRequired,
};
export default ReviewList;
