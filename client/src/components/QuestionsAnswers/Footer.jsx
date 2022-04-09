/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
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
      helpfulness: this.props.answer[1].helpfulness,
    };
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
  }

  componentDidMount() {
    // console.log(this.props)
  }

  addDefaultSrc(ev) {
    ev.target.src = './imgDefault.png';
  }

  render() {
    return ( // 2 rows
      <div>
        <div className="footerrow-1">
          {this.props.answer[1].photos.map((photoURL) => (
            <img
              src={photoURL}
              // onError={this.addDefaultSrc}
              key={`photoURL ${this.props.answer[1].id} ${this.props.answer[1].date} ${Math.random() * 1000}`}
              alt="uploaded by user"
              className="QAthumb"
            />
          ))}
        </div>
        <div className="footerrow-2">
          {/* if answerer name === 'Seller', show in bold */}
          <span>{`by ${this.props.answer[1].answerer_name}`}</span>
          <span>{moment(this.props.answer[1].date).format('MMMM Do, YYYY')}</span>
          <span className="footerseparator">|</span>
          <span className="answerhelpfulness">
            Helpful?
          </span>
          <span className="answerhelp_yes" onClick={this.voteHelpfulness}>
            Yes
          </span>
          <span className="answerhelpfulnesscount">{` (${this.props.answer[1].helpfulness}) `}</span>
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

Footer.displayName = 'Footer';
export default Footer;
