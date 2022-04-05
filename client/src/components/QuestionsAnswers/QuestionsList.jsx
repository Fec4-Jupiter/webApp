/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import QuestionView from './QuestionView.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // showAll: false,
    };
  }

  render() {
    return (
      <div className="questionslist">
        <div> QuestionsList component</div>
        <p>{this.props.product.id}</p>
        <div>
          {this.props.questions?.map((question) => (
            <div key={`qlist ${question.question_id}`}>

              <QuestionView
                product={this.props.product}
                question={question}
              />
            </div>
          ))}
        </div>
        {/* // eslint-disable-next-line react/button-has-type */}
        <button> See more answers</button>
      </div>
    );
  }
}

QuestionsList.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
};

export default QuestionsList;
