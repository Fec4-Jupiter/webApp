/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Review from './Review.jsx';
import ReviewForm from './ReviewForm.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      searchText: '',
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
        <Select
          defaultValue="relevance"
          style={{ height: 25, width: 120, marginLeft: 5 }}
          autoWidth
          onChange={(e) => sort(e)}
        >
          <MenuItem value="relevance">relevance</MenuItem>
          <MenuItem value="helpful">helpful</MenuItem>
          <MenuItem value="newest">newest</MenuItem>
        </Select>
        {/* <select defaultValue="relevance" onChange={(e) => sort(e)}>
          <option value="relevance">relevance</option>
          <option value="helpful">helpful</option>
          <option value="newest">newest</option>
        </select> */}
      </div>
    );
  }

  render() {
    const {
      product, helpful, total, submitReview, metadata, report, search,
    } = this.props;
    const { searchText } = this.state;
    let { reviews } = this.props;
    reviews = reviews.filter(
      (review) => review.body.toLowerCase().includes(searchText.toLowerCase()),
    );
    const { count } = this.state;
    reviews = reviews.slice(0, count);
    return (
      <div>
        {this.renderDropDown()}
        <TextField
          label="Search a review"
          value={searchText}
          size="small"
          style={{
            width: 560,
            height: 15,
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 41,
          }}
          onChange={(e) => this.setState({ searchText: e.target.value })}
        />
        <div className="rl">
          {
            reviews.length === 0 ? <h3>There are no reviews</h3>
              : (
                <div>
                  <Review reviews={reviews} helpful={helpful} report={report} />
                  <br />

                  {reviews.length >= 2 && reviews.length < total
                    ? <Button type="button" onClick={() => this.moreReviews()}>More Reviews</Button>
                    : null}
                  {' '}
                </div>
              )
          }
          <ReviewForm metadata={metadata} product={product} submitReview={submitReview} />
        </div>
      </div>
    );
  }
}
ReviewList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  metadata: PropTypes.instanceOf(Object).isRequired,
  reviews: PropTypes.instanceOf(Array).isRequired,
  helpful: PropTypes.instanceOf(Function).isRequired,
  sort: PropTypes.instanceOf(Function).isRequired,
};
export default ReviewList;
