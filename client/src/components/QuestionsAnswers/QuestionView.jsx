/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import AddQuestion from './AddQuestion.jsx';

function QuestionView(props) {
  const questionID = props.question.question_id;
  const answersArray = Object.entries(props.question.answers);
  console.log('aarray', answersArray[0]); // ['idnum', {}]
  const listAnswers = answersArray?.map((answer) => (

    <div className="answer" key={answer[0]}>
      {answer[1].body}
    </div>
  ));

  return (
    <div>
      <div>
        {' '}
        {questionID}
      </div>
      <div>{listAnswers}</div>
      <div>
        <AddQuestion product={props.product} />
      </div>
    </div>
  );
}

QuestionView.propTypes = {
  product: PropTypes.instanceOf(Object),
  question: PropTypes.instanceOf(Object),
};

export default QuestionView;
