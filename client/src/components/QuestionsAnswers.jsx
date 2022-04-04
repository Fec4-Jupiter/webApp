import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

const axios = require('axios');

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };

    this.fetchAnswers = this.fetchAnswers.bind(this);
  }

  componentDidMount() {
    this.fetchAnswers(this.props.questions);
  }

  fetchAnswers(questions) {
    // for each question_id, generate a get call
    // GET /qa/questions/:question_id/answers
    const newState = {};
    const answersList = questions.map((question) => axios.get(`/qa/questions/${question.question_id}/answers`));
    Promise.all(answersList)
      .then((values) => {
        newState.answers = values;
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
            {' '}
            Product ID:
            {' '}
            {this.props.product.id}
          </h4>
          <h4> ==== Questions</h4>
          {this.props.questions.map((question) => (
            <div key={question.question_id}>
              <p>
                {' '}
                Question ID:
                {question.question_id}
              </p>
              <p>
                {' '}
                Question:
                {question.question_body}
              </p>
            </div>
          ))}
          <div>
            <h4> ==== Answers:</h4>
            {this.state.answers.map((question) => {
              if (question.data.results.length !== 0) {
                return (
                  question.data.results.map((answer) => (
                    <div key={answer.answer_id}>
                      <p>
                        Answerer:
                        {answer.answerer_name}
                      </p>
                      <p>
                        Answer:
                        {answer.body}
                      </p>
                      <p>
                        Date:
                        {answer.date}
                      </p>
                      <p>
                        Helpfulness:
                        {answer.helpfulness}
                      </p>
                    </div>
                  ))
                );
              }
            })}
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
