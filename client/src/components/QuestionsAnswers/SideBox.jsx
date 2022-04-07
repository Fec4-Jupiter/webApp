/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import AddAnswer from './AddAnswer.jsx';

class SideBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionHelpfulness: props.question.helpfulness,
      showAddAnswer: false,
    };
    this.showAddAnswerForm = this.showAddAnswerForm.bind(this);
    this.hideAddAnswerForm = this.hideAddAnswerForm.bind(this);
  }

  showAddAnswerForm = () => {
    this.setState({ showAddAnswer: true });
  };

  hideAddAnswerForm = () => {
    this.setState({ showAddAnswer: false });
  };

  render() {
    return (
      <div className="sidebox">
        <span className="questionhelpfulness">
          Helpful?
        </span>
        <span className="questionhelp_yes">
          Yes
        </span>
        <span className="questionhelpfulnesscount">{` (${this.state.questionHelpfulness}) `}</span>
        <span className="sideboxseparator">|</span>
        <span className="addanswer" onClick={this.showAddAnswerForm}>
          Add Answer
        </span>
        <div>
          <AddAnswer
            showAddAnswer={this.state.showAddAnswer}
            handleAddAnswerClose={this.hideAddAnswerForm}
            question={this.props.question}
            product={this.props.product}
            updateQuestions={this.props.updateQuestions}
          />

        </div>

      </div>
    );
  }
}

SideBox.propTypes = {
  question: PropTypes.instanceOf(Object),
  product: PropTypes.instanceOf(Object),
  updateQuestions: PropTypes.instanceOf(Function),
};

export default SideBox;
