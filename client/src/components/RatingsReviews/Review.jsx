/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderReview() {
    const { reviews, helpful } = this.props;
    return reviews.map((review) => (
      <div key={review.review_id}>
        <br />
        <h4><strong>{review.summary}</strong></h4>
        <span>
          {review.reviewer_name}
          {' '}
          -
          {' '}
          {review.date}
        </span>
        <p>{review.body}</p>
        {this.renderImg(review.photos)}
        {review.recommend ? <p>&#10004; I recommend this product</p> : null}
        {review.response !== ''
          ? (
            <div className="Response">
              <h5>Response</h5>
              <p>{review.response}</p>
            </div>
          ) : null}
        <div>
          Helpful?
          {' '}
          <button type="button" onClick={() => helpful(review.review_id)}><u>Yes</u></button>
          {`(${review.helpfulness}) | `}
          <u>Report</u>
        </div>

        <br />

      </div>
    ));
  }

  renderImg(photos) {
    return photos.map((photo) => {
      const { id, url } = photo;
      return (
        <img src={url} key={id} alt="picutre is not showing" className="thumbnailcontainer" />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>This is review </h3>
        {this.renderReview()}
      </div>
    );
  }
}

Review.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  helpful: PropTypes.instanceOf(Function).isRequired,
};
export default Review;
