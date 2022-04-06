/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import QuestionView from './QuestionView.jsx';
import AddQuestion from './AddQuestion.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddQuestion: false,
    };
    this.showAddQuestionForm = this.showAddQuestionForm.bind(this);
    this.hideAddQuestionForm = this.hideAddQuestionForm.bind(this);
  }

  showAddQuestionForm = () => {
    this.setState({ showAddQuestion: true });
  };

  hideAddQuestionForm = () => {
    this.setState({ showAddQuestion: false });
  };

  render() {
    return (
      <div className="questionslistgrid">
        <div className="questionviewcontainer">
          {this.props.questions?.map((question) => (
            <div key={`qlist ${question.question_id}`}>
              <QuestionView
                product={this.props.product}
                question={question}
              />
            </div>
          ))}
        </div>
        <div className="questionslistfooter">
          <div className="questionslistfooter-row1">
            <button> See more answers</button>
          </div>
          <div className="questionslistfooter-row2">
            <button>More Answered Questions </button>
            <button type="button" onClick={this.showAddQuestionForm}>ADD A QUESTION </button>
          </div>
          <div>
            <AddQuestion
              showAddQuestion={this.state.showAddQuestion}
              handleClose={this.hideAddQuestionForm}
              product={this.props.product}
            />

          </div>
        </div>
      </div>
    );
  }
}

QuestionsList.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
};

export default QuestionsList;
