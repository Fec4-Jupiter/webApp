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

function QuestionsAnswers(props) {
  return (
    <div className="questionsandanswers">
      <h3> Questions and Answers Component</h3>
      <h4>
        Product ID:
        {props.product.id}
      </h4>
      <div>
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

export default QuestionsAnswers;
