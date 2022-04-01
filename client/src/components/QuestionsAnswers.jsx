import React from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

const axios = require('axios');

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.fetchAnswers = this.fetchAnswers.bind(this);
  }


  fetchAnswers(questions) {
    // for each question_id, generate a get call
    // GET /qa/questions/:question_id/answers
    let newState = {};
    const answersList = questions.map((question) => {
      return  axios.get(`/qa/questions/${question.question_id}/answers`)
    });
    Promise.all(answersList)
    .then((values) => {
      // setState has raw responses for now
      this.setState(values);
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
      <div>
        <h3> Questions and Answers Component</h3>
        <div>
          <p> Product ID: {this.props.product.id}</p>
          <h4>Questions:</h4>
          <div>
            {this.props.questions.map((question) => {
              return (
                <div key={question.question_id}> Question: {question.question_body}</div>
              )
            })
            }</div>

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
