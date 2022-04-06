/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import Footer from './Footer.jsx';
// import SideBox from './SideBox.jsx';

function QuestionView(props) {
  const question = props.question.question_body;
  const answersArray = Object.entries(props.question.answers);
  const listAnswers = answersArray?.map((answer) => (
    <div className="answercol-1" key={`answercol1 ${answer[0]}`}>
      <div className="answer" key={`answer ${answer[0]}`}>
        <span className="answer-A">A:</span>
        <span>{answer[1].body}</span>
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
        <div className="questioncol-1">
          <span className="question-Q">Q:</span>
          <span>{question}</span>
        </div>
        <div className="q</div>questioncol-2"> SideBox </div>
      </div>
      <div className="answerrow">
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
