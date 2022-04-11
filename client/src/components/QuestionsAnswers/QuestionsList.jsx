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
      showAll: this.props.showAllQuestions,
      questions: this.props.questions,
      sortedQuestions: [],
    };
    this.showAddQuestionForm = this.showAddQuestionForm.bind(this);
    this.hideAddQuestionForm = this.hideAddQuestionForm.bind(this);
    this.createQuestionsList = this.createQuestionsList.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.toggleMoreQuestions = this.toggleMoreQuestions.bind(this);
  }

  componentDidMount() {
    this.updateQuestions(this.props.product.id);
    // console.log('calling create short');
    this.createQuestionsList('short');
  }

  showAddQuestionForm = () => {
    this.setState({ showAddQuestion: true });
  };

  hideAddQuestionForm = () => {
    this.setState({ showAddQuestion: false });
  };

  toggleMoreQuestions() {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll }, () => {
      if (this.state.showAll === true) {
        // console.log('if > show All is true.. show all:', this.state.showAll);
        this.createQuestionsList('long');
      } else {
        // console.log('if > show all is false');
        this.createQuestionsList('short');
      }
    });
  }

  createQuestionsList(len) {
    // console.log('len', len);
    const { questions } = this.state;
    const answered = [];
    questions.map((question) => {
      if (Object.keys(question.answers).length !== 0) {
        answered.push(question);
      }
    });
    answered.sort((a, b) => a.helpfulness - b.helpfulness);

    if (len === 'short') {
      const shortAnswered = answered.slice(0, 2);
      // console.log('SHORT ARRAY', shortAnswered);
      return this.setState({ sortedQuestions: shortAnswered }, () => {
        this.render();
      });
    }
    // console.log('LONG ARRAY', answered);
    return this.setState({ sortedQuestions: answered }, () => {
      this.render();
    });
  }

  updateQuestions(id) {
    // console.log('get from questionslist, prod id', id);
    let newQuestions = {};
    const url = `/qa/questions?product_id=${id}&count=500`;
    // console.log('url', url);
    axios.get(url)
      .then((values) => {
        newQuestions = {
          showAddQuestion: false,
          showAll: false,
          questions: values.data.results,
          sortedQuestions: [],
        };
        // console.log(newQuestions);
        this.setState(newQuestions);
        this.createQuestionsList('short');
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div className="questionslistgrid">
        <div className="questionviewcontainer">
          {/* default: show 2 questions */}
          {/* show all questions */}
          {this.state.sortedQuestions.map((question) => (
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

          <button
            className="qabutton"
            type="button"
            onClick={this.toggleMoreQuestions}
          >
            {' '}
            {this.state.showAll ? 'SHOW FEWER QUESTIONS' : 'SHOW MORE QUESTIONS'}
            {' '}

          </button>
          <button className="qabutton" type="button" onClick={this.showAddQuestionForm}>ADD A QUESTION </button>
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
  showAllQuestions: PropTypes.bool,
};

QuestionsList.displayName = 'QuestionsList';
export default QuestionsList;
