/* eslint-disable react/button-has-type */
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
  const questionId = props.question.question_id;
  const answersArray = Object.entries(props.question.answers);
  // if numasnwers === 0, don't show question
  const numOfAnswers = answersArray.length;
  //  sorting “by [username], Month DD, YYYY”
  //   If answerer ==='Seller, top of list
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
          <div className="question-Q">
            Q:
          </div>
        </div>

        <div className="questioncol-2">
          <span>{question}</span>
          <span>{` questionID : ${questionId}`}</span>
          <span>{` number of answers: ${numOfAnswers}`}</span>
        </div>

        <div
          className="questioncol-3"
          key={`sidebox${question.question_id}`}
        >
          <SideBox
            question={props.question}
            product={props.product}
            updateQuestions={props.updateQuestions}
          />
        </div>
      </div>
      <div className="answerrow">
        <div className="answer-A">
          A:
          {' '}
        </div>
        <div className="answerlist">{listAnswers}</div>

      </div>
      <div className="loadmorerow">
        <div className="loadmorecol-1" />
        <div className="loadmorecol-2">
          <span className="loadmoreanswers">LOAD MORE ANSWERS</span>
        </div>
        <div className="loadmorecol-3" />
      </div>
    </div>
  );
}

QuestionView.propTypes = {
  product: PropTypes.instanceOf(Object),
  question: PropTypes.instanceOf(Object),
  updateQuestions: PropTypes.instanceOf(Function),
};

export default QuestionView;
