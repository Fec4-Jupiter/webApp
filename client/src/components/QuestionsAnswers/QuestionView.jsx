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
      <div>
        <p>prod id </p>
        {props.product.id}
      </div>
      <div>
        <p> question id</p>
        {props.question}
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
  product: PropTypes.instanceOf(Number),
  question: PropTypes.instanceOf(Object),
  answers: PropTypes.instanceOf(Object),
};

export default QuestionView;
