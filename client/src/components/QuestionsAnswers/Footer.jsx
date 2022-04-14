/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showPhotos: false,
      voted: false,
      question: this.props.question,
    };
    this.voteHelpfulness = this.voteHelpfulness.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount() {
    this.formatDate();
  }

  voteHelpfulness() {
    if (this.state.voted) {
      return;
    }
    const id = parseInt(this.props.answer[0], 10);
    // PUT /qa/answers/:answer_id/helpful
    axios.put(`/qa/answers/${id}/helpful`)
      .then(() => {
        this.setState({ voted: true }, () => {
          this.props.updateQuestions(this.props.product.id, 'long');
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  reportAnswer() {
    const id = parseInt(this.props.answer[0], 10);
    // PUT /qa/answers/:answer_id/report
    axios.put(`/qa/answers/${id}/report`)
      .then(() => {
        this.props.updateQuestions(this.props.product.id, 'long');
      })
      .catch((err) => {
        throw err;
      });
  }

  formatDate() {
    // "date": "2018-08-18T00:00:00.000Z",
    const timeStr = this.props.answer[1].date;
    const timeArr = timeStr.split('T');
    const dateStr = timeArr[0];
    const dateArr = dateStr.split('-');
    const months = ['January', 'February', 'March', 'Apr',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    if (dateArr[1].startsWith('0')) {
      dateArr[1] = dateArr[1][1];
    }
    const monthIndex = parseInt(dateArr[1], 10);
    dateArr[1] = months[monthIndex - 1];
    const formattedDate = `${dateArr[1]} ${dateArr[2]}, ${dateArr[0]}`;
    return formattedDate;
  }

  render() {
    return (
      <div>
        {this.props.answer[1].photos.length !== 0
          && (
            <div className="footerrow-1">
              {this.props.answer[1].photos.map((photoURL) => (
                <img
                  src={photoURL}
                  key={`photoURL ${this.props.answer[1].id} ${this.props.answer[1].date} ${Math.random() * 1000}`}
                  alt="uploaded by user"
                  className="QAthumb"
                />
              ))}
            </div>
          )}
        <div className="footerrow-2">
          {/* if answerer name === 'Seller', show in bold */}
          by
          <span className={this.props.answer[1].answerer_name.toLowerCase() === 'seller' ? 'seller' : ''}>{` ${this.props.answer[1].answerer_name}`}</span>
          <span>{this.formatDate()}</span>
          <span className="footerseparator">|</span>
          <span className="answerhelpfulness">
            Helpful?
          </span>
          <span className="answerhelp_yes" onClick={this.voteHelpfulness}>
            Yes
          </span>
          <span className="answerhelpfulnesscount">{` (${this.props.answer[1].helpfulness}) `}</span>
          <span className="footerseparator">|</span>
          <span className="reportAnswer" onClick={this.reportAnswer}>Report</span>

        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  answer: PropTypes.instanceOf(Object),
  product: PropTypes.instanceOf(Object),
  updateQuestions: PropTypes.instanceOf(Function),
  question: PropTypes.instanceOf(Object),
};

Footer.displayName = 'Footer';
export default Footer;
