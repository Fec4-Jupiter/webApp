/* eslint-disable no-console */
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

const axios = require('axios');

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddQuestion: false,
      showMoreAnsweredQuestions: false,
      questions: this.props.questions,
    };
    this.showAddQuestionForm = this.showAddQuestionForm.bind(this);
    this.hideAddQuestionForm = this.hideAddQuestionForm.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  componentDidMount() {
    console.log('id in mount', this.props);
    this.updateQuestions(this.props.product.id);
  }

  showAddQuestionForm = () => {
    this.setState({ showAddQuestion: true });
  };

  hideAddQuestionForm = () => {
    this.setState({ showAddQuestion: false });
  };

  updateQuestions(id) {
    console.log('get from questionslist, prod id', id);
    let newQuestions = {};
    const url = `/qa/questions?product_id=${id}&count=500`;
    console.log('url', url);
    axios.get(url)
      .then((values) => {
        newQuestions = {
          showAddQuestion: false,
          showMoreAnsweredQuestions: false,
          questions: values.data.results,
        };
        console.log(newQuestions);
        this.setState(newQuestions);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div className="questionslistgrid">
        <div className="questionviewcontainer">
          {this.state.questions.map((question) => (
            <div key={`qlist ${question.question_id}`}>
              <QuestionView
                product={this.props.product}
                question={question}
                updateQuestions={this.updateQuestions}
              />
            </div>
          ))}
        </div>
        <div className="questionslistfooter">
          <button>MORE ANSWERED QUESTIONS </button>
          <button type="button" onClick={this.showAddQuestionForm}>ADD A QUESTION </button>
          <div>
            <AddQuestion
              showAddQuestion={this.state.showAddQuestion}
              handleClose={this.hideAddQuestionForm}
              product={this.props.product}
              questions={this.props.questions}
              updateQuestions={this.updateQuestions}
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
