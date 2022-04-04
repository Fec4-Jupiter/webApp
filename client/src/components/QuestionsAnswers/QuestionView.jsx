/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import AddQuestion from './AddQuestion.jsx';

function QuestionView(props) {
  return (
    <div>
      <p>QuestionView component: </p>
      <div> prod id>>
        {props.product.id}
      </div>
      <div> question id>>
        {props.questions[0].question_id}
      </div>
      <div> answers data>>
        {props.answers.data}
      </div>
      <div>
        <AddQuestion
          product={props.product}
        />
      </div>
    </div>
  );
}

QuestionView.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
  answers: PropTypes.instanceOf(Object),
};

export default QuestionView;
