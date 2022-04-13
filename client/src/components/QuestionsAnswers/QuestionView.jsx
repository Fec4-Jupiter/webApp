/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import Footer from './Footer.jsx';
import SideBox from './SideBox.jsx';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMore: false,
      question: this.props.question,
      answersList: [],
      toggleState: false,
    };
    this.toggleLoadMoreAnswers = this.toggleLoadMoreAnswers.bind(this);
    this.createAnswersList = this.createAnswersList.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.createAnswersList('short');
  }

  refresh() {
    const prevState = this.state.toggleState;
    this.setState({ toggleState: !prevState }, () => {
    });
    // this.toggleLoadMoreAnswers();
  }

  toggleLoadMoreAnswers() {
    const { loadMore } = this.state;
    this.setState({ loadMore: !loadMore }, () => {
      if (this.state.loadMore === true) {
        this.createAnswersList('long');
      } else {
        this.createAnswersList('short');
      }
    });
  }

  createAnswersList(len) {
    const answersArray = Object.entries(this.props.question.answers);
    const numOfAnswers = answersArray.length;

    // creates sublist with only sellers
    const sellersList = answersArray.filter((answer) => {
      const answerer = answer[1].answerer_name.toLowerCase();
      return answerer === 'seller';
    });
    // creates sorted list with remaining answers
    const nonSellersList = answersArray.filter((answer) => {
      const answerer = answer[1].answerer_name.toLowerCase();
      return answerer !== 'seller';
    });
    // sort non sellers by helpfulness
    const sortedAnswersList = nonSellersList.sort((a, b) => b[1].helpfulness - a[1].helpfulness);
    // full list = sellerslist + sorted of other users
    const fullList = sellersList.concat(sortedAnswersList);

    // check flag: short or long
    if (len === 'short') {
      // if short,render only 2 answers; else render all
      const shortList = fullList.slice(0, 2);
      this.setState({ answersList: shortList }, () => {
        // console.log('setState qView short');
      });
      return;
    }
    this.setState({ answersList: fullList }, () => {
      // console.log('setState qView long');
    });
  }

  render() {
    return (
      <div className="questionviewgrid">
        <div className="questionrow" key={`q in view ${this.state.question.question_id}`}>

          <div className="questioncol-1">
            <div className="question-Q">
              Q:
            </div>
          </div>

          <div className="questioncol-2">
            <span>{this.state.question.question_body}</span>
          </div>

          <div
            className="questioncol-3"
            key={`sidebox${this.state.question.question_id}`}
          >
            <SideBox
              question={this.props.question}
              product={this.props.product}
              updateQuestions={this.props.updateQuestions}
              refresh={this.refresh}
            />
          </div>
        </div>
        <div className="answerrow">
          <div className="answer-A">
            A:
            {' '}
          </div>
          <div className="answerlist">
            {this.state.answersList.map((answer) => (
              <div key={`oneanswer ${answer[0]}`}>
                <div className="answer" key={`answer ${answer[0]}`}>
                  <span>{answer[1].body}</span>
                </div>
                <div className="footer" key={`Footer ${answer[0]}`}>
                  <Footer
                    question={this.props.question}
                    answer={answer}
                    product={this.props.product}
                    updateQuestions={this.props.updateQuestions}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="loadmorerow">
          <div className="loadmorecol-1" />
          <div className="loadmorecol-2">
            {Object.entries(this.props.question.answers).length > 2
              && (
                <button className="loadmoreanswers" type="button" onClick={this.toggleLoadMoreAnswers}>
                  {this.state.loadMore ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWERS'}
                </button>
              )}
          </div>
          <div className="loadmorecol-3" />
        </div>
      </div>
    );
  }
}

QuestionView.propTypes = {
  product: PropTypes.instanceOf(Object),
  question: PropTypes.instanceOf(Object),
  updateQuestions: PropTypes.instanceOf(Function),
};

QuestionView.displayName = 'QuestionView';
export default QuestionView;
