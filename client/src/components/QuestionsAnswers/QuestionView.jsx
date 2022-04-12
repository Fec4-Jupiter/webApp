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

function QuestionView(props) {
  const question = props.question.question_body;
  const questionId = props.question.question_id;
  const answersArray = Object.entries(props.question.answers);
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
  // concatenates sellerslist with sorted of other users
  const formattedList = sellersList.concat(sortedAnswersList);

  formattedList.forEach((a) => {
    console.log('answer user, help ', a[1].answerer_name, a[1].helpfulness);
  });

  // create flag: short or long
  const flag = 'short';
  let answersToRender = [];
  if (flag === 'short') {
    // if short,listAnswers should have only 2 answers; else list gets all
    answersToRender = sortedAnswersList.slice(0, 2);
  } else {
    answersToRender = sortedAnswersList;
  }

  const listAnswers = answersToRender.map((answer) => (
    <div key={`oneanswer ${answer[0]}`}>
      <div className="answer" key={`answer ${answer[0]}`}>
        <span>{answer[1].body}</span>
      </div>
      <div className="footer" key={`Footer ${answer[0]}`}>
        <Footer
          answer={answer}
          product={props.product}
          updateQuestions={props.updateQuestions}
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
          {/* <span>{` questionID : ${questionId}`}</span> */}
          {/* <span>{` number of answers: ${numOfAnswers}`}</span> */}
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
          {numOfAnswers > 2
            && <span className="loadmoreanswers">LOAD MORE ANSWERS</span>}
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

QuestionView.displayName = 'QuestionView';
export default QuestionView;
