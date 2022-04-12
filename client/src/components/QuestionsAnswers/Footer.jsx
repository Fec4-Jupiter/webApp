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
import axios from 'axios';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhotos: false,
      voted: false,
    };
    this.voteHelpfulness = this.voteHelpfulness.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  componentDidMount() {
    // this.props.updateQuestions(this.props.product.id, 'short');
  }

  voteHelpfulness() {
    if (this.state.voted) {
      return;
    }
    const id = parseInt(this.props.answer[0], 10);
    // console.log('vote help answer id', typeof parseInt(this.props.answer[0], 10));
    // PUT /qa/answers/:answer_id/helpful
    axios.put(`/qa/answers/${id}/helpful`)
      .then(() => {
        this.state.voted = true;
        // refresh
        this.props.updateQuestions(this.props.product.id, 'long');
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
        // refresh
        this.props.updateQuestions(this.props.product.id, 'long');
        this.forceUpdate();
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div>
        {this.props.answer[1].photos.length !== 0
          && (
            <div className="footerrow-1">
              {this.props.answer[1].photos.map((photoURL) => (
                <img
                  src={photoURL || 'https://acttochange.org/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg'}
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
};

Footer.displayName = 'Footer';
export default Footer;
