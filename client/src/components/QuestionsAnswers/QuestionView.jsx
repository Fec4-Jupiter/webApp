/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import Footer from './Footer.jsx';
import SideBox from './SideBox.jsx';

function QuestionView(props) {
  const question = props.question.question_body;
  const answersArray = Object.entries(props.question.answers);
  const numOfAnswers = answersArray.length;

  const listAnswers = answersArray.map((answer) => (
    <div key={`oneanswer ${answer[0]}`}>
      <div className="answer" key={`answer ${answer[0]}`}>
        <span>{answer[1].body}</span>
      </div>
      <div className="footer" key={`Footer ${answer[0]}`}>
        <Footer
          answer={answer}
        />
      </div>

    </div>
  ));

  return (
    <div className="questionviewgrid">
      <div className="questionrow" key={`q in view ${question.question_id}`}>
        <div className="questioncol-1">
          <span className="question-Q">
            Q:
            {' '}
          </span>
          <span>{question}</span>
          <span>{`number of answers:${numOfAnswers}`}</span>
        </div>
        <div
          className="questioncol-2"
          key={`sidebox${question.question_id}`}
        >
          <SideBox
            question={props.question}
          />
        </div>
      </div>
      <div className="answerslist">
        <div className="answercol-1">
          <span className="answer-A">
            A:
            {' '}
          </span>
          <div className="answerlist">{listAnswers}</div>
        </div>
      </div>
    </div>
  );
}

QuestionView.propTypes = {
  product: PropTypes.instanceOf(Object),
  question: PropTypes.instanceOf(Object),
};

export default QuestionView;
