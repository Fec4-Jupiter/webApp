/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // showSeller: false,
      // showPhotos: false,
    };

    // addHelpfulnessCount
  }

  //  “by [username], Month DD, YYYY”
  //   If answerer = seller, “Seller” in bold
  render() {
    return (
      <div>
        <span> Footer</span>
        {/* <span>
          {' '}
          {this.props}
        </span>
        <span>
          {' '}
          {this.props}
          {' '}
        </span>
        <span>
          {this.props}
          {' '}
        </span> */}
      </div>
    );
  }
}

Footer.propTypes = {
  answer: PropTypes.instanceOf(Object),
};

export default Footer;
