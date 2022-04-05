/* eslint-disable no-unused-vars */
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
  // console.log('answer array', answersArray[0]); // ['idnum', {}]
  const listAnswers = answersArray?.map((answer) => (
    <div className="answercol-2">
      <div className="answer" key={`answer ${answer[0]}`}>
        {answer[1].body}
      </div>
      <div className="footer" key={`Footer ${answer[0]}`}>
        <Footer
          answer={answer}
        />
      </div>
      {/* <div className="sidebox" key={`SideBox${answer[0]}`}>
        <SideBox />
      </div> */}
    </div>
  ));

  return (
    <div className="questionviewgrid">
      <div className="questionrow" key={`q in view ${question.question_id}`}>
        <div className="questioncol-1"> Q: </div>
        <div className="questioncol-2">
          {' '}
          {question}
          {' '}
        </div>
        <div className="q</div>questioncol-3"> SideBox </div>

      </div>
      <div className="answerrow">
        <div className="answercol-1"> A:</div>
        <div>{listAnswers}</div>
        <div className="answercol-3" />
      </div>
    </div>
  );
}

QuestionView.propTypes = {
  // product: PropTypes.instanceOf(Object),
  question: PropTypes.instanceOf(Object),
};

export default QuestionView;
