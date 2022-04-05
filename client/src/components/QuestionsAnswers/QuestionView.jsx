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
  const arrayOfAnswers = (props.answers[questionID]);
  // i think this is async as well - sometimes it does not log
  // data that is there > use a promise here?
  // const answersItems = arrayOfAnswers.map((answer) => <p>{answer.body}</p>);

  return (
    <div>
      <div>
        {/* {answersItems} */}
      </div>
      <div>
        <AddQuestion product={props.product} />
      </div>
    </div>

  );
}

QuestionView.propTypes = {
  product: PropTypes.instanceOf(Number),
  question: PropTypes.instanceOf(Object),
  answers: PropTypes.instanceOf(Object),
};

export default QuestionView;
