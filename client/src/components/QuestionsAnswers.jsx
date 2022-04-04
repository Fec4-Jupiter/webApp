import React from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

const axios = require('axios');

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };

    this.fetchAnswers = this.fetchAnswers.bind(this);
  }


  fetchAnswers(questions) {
    // for each question_id, generate a get call
    // GET /qa/questions/:question_id/answers
    let newState = {};
    const answersList = questions.map((question) => {
      return axios.get(`/qa/questions/${question.question_id}/answers`)
    });
    Promise.all(answersList)
      .then((values) => {
        newState.answers = values;
        this.setState(newState);

      })
      .catch((err) => {
        throw err;
      })
  }

  componentDidMount() {
    this.fetchAnswers(this.props.questions);
  }

  render() {
    return (
      <div className="questionsandanswers">
        <h3> Questions and Answers Component</h3>
        <div>
          <p> Product ID: {this.props.product.id}</p>
          {this.props.questions.map((question) => {
            return (
              <div key={question.question_id}>
                <p>Question: {question.question_body} </p>
              </div>
            )
          }
          )}
          <div> Answers:
            {this.state.answers.map((question) => {
              if (question.data.results.length !== 0) {
                return (
                  question.data.results.map((answer) => {
                    return (
                      <div key={answer.answer_id}>
                        <p>Answerer: {answer.answerer_name} </p>
                        <p>Answer: {answer.body} </p>
                        <p>Date: {answer.date} </p>
                        <p>Helpfulness: {answer.helpfulness} </p>
                      </div>
                    )
                  }
                  )
                )
              }
            })
            }
          </div>
        </div>
      </div>
    )
  }




}

QuestionsAnswers.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object)
}

export default QuestionsAnswers;
