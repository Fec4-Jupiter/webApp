/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AddAnswer from './AddAnswer.jsx';

class SideBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddAnswer: false,
      voted: false,
    };
    this.showAddAnswerForm = this.showAddAnswerForm.bind(this);
    this.hideAddAnswerForm = this.hideAddAnswerForm.bind(this);
    this.voteHelpfulness = this.voteHelpfulness.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
  }

  showAddAnswerForm = () => {
    this.setState({ showAddAnswer: true });
  };

  hideAddAnswerForm = () => {
    this.setState({ showAddAnswer: false });
  };

  voteHelpfulness() {
    if (this.state.voted) {
      return;
    }
    const { id } = this.props.question;
    console.log('question id', id);
    // PUT /qa/questions/:question_id/helpful
    axios.put(`/qa/questions/${id}/helpful`)
      .then(() => {
        this.state.voted = true;
        // refresh
        this.props.updateQuestions(this.props.product.id);
      })
      .catch((err) => {
        throw err;
      });
  }

  reportQuestion() {
    const id = this.props.question.question_id;
    console.log('id', id);
    // PUT /qa/questions/:question_id/report
    axios.put(`/qa/questions/${id}/report`)
      .then(() => {
      // refresh
        this.props.updateQuestions(this.props.product.id);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div className="sidebox">
        <span className="questionhelpfulness">
          Helpful?
        </span>
        <span className="questionhelp_yes" onClick={this.voteHelpfulness}>
          Yes
        </span>
        <span className="questionhelpfulnesscount">{` (${this.props.question.question_helpfulness}) `}</span>
        <span className="sideboxseparator">|</span>
        <span className="addanswer" onClick={this.showAddAnswerForm}>
          Add Answer
        </span>
        <span className="sideboxseparator">|</span>
        <span className="reportQuestion" onClick={this.reportQuestion}>Report</span>
        <div>
          <AddAnswer
            showAddAnswer={this.state.showAddAnswer}
            handleClose={this.hideAddAnswerForm}
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

SideBox.displayName = 'SideBox';
export default SideBox;
