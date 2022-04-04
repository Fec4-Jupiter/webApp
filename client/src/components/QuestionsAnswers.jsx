/* eslint-disable no-plusplus */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import QuestionsList from './QuestionsAnswers/QuestionsList.jsx';

const axios = require('axios');

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.fetchAnswers = this.fetchAnswers.bind(this);
  }

  componentDidMount() {
    this.fetchAnswers(this.props.questions);
  }

  fetchAnswers(questions) {
    // for each question_id, generate a get call
    // GET /qa/questions/:question_id/answers
    const answersInResponse = questions.map((question) => (
      axios.get(`/qa/questions/${question.question_id}/answers`)));
    Promise.all(answersInResponse)
      .then((values) => {
        const newState = {};
        for (let i = 0; i < values.length; i++) {
          const questionId = values[i].data.question;
          const listOfAnswerObjs = values[i].data.results;
          newState[questionId] = listOfAnswerObjs;
        }
        this.setState(newState);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div className="questionsandanswers">
        <h3> Questions and Answers Component</h3>
        <div>
          <h4>
            Product ID:
            {this.props.product.id}
          </h4>
          <div>
            <QuestionsList
              product={this.props.product}
              questions={this.props.questions}
              answers={this.state}
            />
          </div>
        </div>
      </div>
    );
  }
}

QuestionsAnswers.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
};

export default QuestionsAnswers;
