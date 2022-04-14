/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React, { lazy } from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

const QuestionsList = lazy(() => import('./QuestionsAnswers/QuestionsList.jsx'));
const Search = lazy(() => import('./QuestionsAnswers/Search.jsx'));

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllQuestions: false,
      searchStr: '',
    };
    this.search = this.search.bind(this);
  }

  search(item) {
    this.setState({ searchStr: item }, () => {
      console.log('search item in Q&A top comp:', item);
    });
  }

  render() {
    return (
      <div className="qacontainer">
        <div className="questionsandanswers-row1">
          <span className="qatitle">
            Questions & Answers
            <span className="forTest">
              {this.props.product.id}
              {' '}
            </span>
          </span>
        </div>
        <div className="questionsandanswers-row2">
          <Search
            product={this.props.product}
            questions={this.props.questions}
            search={this.search}
          />

        </div>
        <div className={`questionsandanswers-row3 ${this.state.showAllQuestions ? '' : 'short'}`}>
          <QuestionsList
            product={this.props.product}
            questions={this.props.questions}
            showAllQuestions={this.state.showAllQuestions}
            searchStr={this.state.searchStr}
          />
        </div>
      </div>
    );
  }
}

QuestionsAnswers.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
};

QuestionsAnswers.displayName = 'QuestionsAnswers';
export default QuestionsAnswers;
