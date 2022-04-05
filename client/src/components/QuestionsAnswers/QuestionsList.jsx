/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import QuestionView from './QuestionView.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // showAll: false,
    };
  }

  render() {
    return (
      <div className="questionslist">
        {/* <div> QuestionsList component</div> */}
        <div>
          {this.props.questions.map((question) => (
            <QuestionView
              product={this.props.product.id}
              question={question}
              answers={this.props.answers}
            />
          ))}
        </div>
      </div>
    );
  }
}

QuestionsList.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
  answers: PropTypes.instanceOf(Object),
};

export default QuestionsList;
