/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import QuestionsList from './QuestionsAnswers/QuestionsList.jsx';
import Search from './QuestionsAnswers/Search.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllQuestions: false,
    };
  }

  render() {
    return (
      <div className="qacontainer">
        <div className="questionsandanswers-row1">
          <span className="qatitle">
            Questions & Answers
            <span className="forTest">
              {this.props.product.id}
              {' '}
            </span>
          </span>
        </div>
        <div className="questionsandanswers-row2">
          <Search
            product={this.props.product}
            questions={this.props.questions}
          />

        </div>
        <div className={`questionsandanswers-row3 ${this.state.showAllQuestions ? '' : 'short'}`}>
          <QuestionsList
            product={this.props.product}
            questions={this.props.questions}
            showAllQuestions={this.state.showAllQuestions}
          />
        </div>
      </div>
    );
  }
}

QuestionsAnswers.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
};

QuestionsAnswers.displayName = 'QuestionsAnswers';
export default QuestionsAnswers;
