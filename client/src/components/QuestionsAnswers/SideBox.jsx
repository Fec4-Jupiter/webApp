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
          {' '}
        </span>
        <span className="questionhelp_yesbutton">

          Yes
        </span>
        <span className="questionhelpfulnesscount">{` (${this.state.questionHelpfulness}) `}</span>
        <span className="sideboxseparator">|</span>
        <span className="addAnswer">
          {' '}
          AddAnswer
          <AddAnswer
            showAddAnswer={this.state.showAddAnswer}
            handleClose={this.hideAddAnswerForm}
            question={this.props.question}
          />

        </span>
      </div>
    );
  }
}

SideBox.propTypes = {
  question: PropTypes.instanceOf(Object),
};

export default SideBox;
