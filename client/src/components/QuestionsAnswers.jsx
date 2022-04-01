import React from 'react';
import PropTypes from 'prop-types';

// import ReactDOM from 'react-dom/client';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3> Questions and Answers </h3>
        <div>
          <p>
            {this.props.currentProduct.name}
          </p>
          <p>
            {this.props.currentProduct.id}
          </p>
        </div>
      </div>
    );
  }
}

QuestionsAnswers.propTypes = {
  currentProduct: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.instanceOf(Object).isRequired,
};

export default QuestionsAnswers;
