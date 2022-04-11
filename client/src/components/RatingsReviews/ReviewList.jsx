/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review.jsx';
import ReviewForm from './ReviewForm.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    const { reviews } = this.props;
    this.state = {
      count: 2,
    };
  }

  moreReviews(e) {
    const { count } = this.state;
    this.setState({
      count: count + 2,
    }, () => this.render());
  }

  renderDropDown() {
    const { total, sort } = this.props;
    return (
      <div className="review-header" style={{ display: 'flex', flexDirection: 'row' }}>
        {' '}
        <p>
          There
          {' '}
          {total}
          {' '}
          Reviews, sorted by
        </p>
        {' '}
        <select defaultValue="relevance" onChange={(e) => sort(e)}>
          <option value="relevance">relevance</option>
          <option value="helpful">helpful</option>
          <option value="newest">newest</option>
        </select>
      </div>
    );
  }

  render() {
    const {
      product, helpful, total,
    } = this.props;
    let { reviews } = this.props;
    const { count } = this.state;
    reviews = reviews.slice(0, count);
    return (
      <div>
        {this.renderDropDown()}
        <div className="rl">
          {
            reviews.length === 0 ? <h3>There are no reviews</h3>
              : (
                <div>
                  <Review reviews={reviews} helpful={helpful} />
                  <br />

                  {reviews.length >= 2 && reviews.length < total
                    ? <button type="button" onClick={() => this.moreReviews()}>More Reviews</button>
                    : null}
                  {' '}
                </div>
              )
          }

          <ReviewForm product={product} />
        </div>

      </div>
    );
  }
}
ReviewList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  reviews: PropTypes.instanceOf(Array).isRequired,
  helpful: PropTypes.instanceOf(Function).isRequired,
  sort: PropTypes.instanceOf(Function).isRequired,
};
export default ReviewList;
