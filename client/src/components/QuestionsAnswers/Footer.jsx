/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import axios from 'axios';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSeller: false,
      showPhotos: false,
      answerHelpfulness: 0,
    };
    // addHelpfulnessCount
  }

  componentDidMount() {
    // console.log(this.props.answer); // ['idnum', {... }]
  }

  render() {
    return ( // 2 rows
      <div>
        <div className="footerrow-1">
          <span>Photo1</span>
          <span>Photo2</span>
          <span>Photo3</span>
          <span>Photo4</span>
          <span>Photo5</span>
        </div>
        <div className="footerrow-2">
          {/* if answerer name === 'Seller', show in bold */}
          <span>{`by ${this.props.answer[1].answerer_name}`}</span>
          <span>{moment(this.props.answer[1].date).format('MMMM Do, YYYY')}</span>
          <span className="footerseparator">|</span>
          <span className="answerhelpfulness">
            Helpful?
          </span>
          <span className="answerhelp_yes">
            Yes
          </span>
          <span className="answerhelpfulnesscount">{` (${this.state.answerHelpfulness}) `}</span>
          <span className="footerseparator">|</span>
          <span>Report</span>

        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  answer: PropTypes.instanceOf(Object),
};

export default Footer;
