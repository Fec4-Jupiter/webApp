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

function QuestionsAnswers(props) {
  return (
    <div className="qacontainer">
      <div className="questionsandanswers-row1">
        <span className="qatitle">
          Questions & Answers
          <span className="forTest">
            {props.product.id}
            {' '}
          </span>
        </span>
      </div>
      <div className="questionsandanswers-row2">
        <Search
          product={props.product}
          questions={props.questions}
        />

      </div>
      <div className="questionsandanswers-row3">
        <QuestionsList
          product={props.product}
          questions={props.questions}
        />
      </div>
    </div>
  );
}

QuestionsAnswers.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
};

QuestionsAnswers.displayName = 'QuestionsAnswers';
export default QuestionsAnswers;
