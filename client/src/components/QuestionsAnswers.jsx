import React from 'react';
import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom/client';

class QuestionAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1> Questions and Answers </h1>
        <div>
          {this.props.currentProduct.id}
        </div>
      </div>
    );
  }
}

QuestionAnswers.propTypes = {
  currentProduct: PropTypes.instanceOf(Object).isRequired
};

export default QuestionsAnswers;
