/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

const axios = require('axios');

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="addquestion">
        <div> Add Question Component</div>
        <div> product id in addQ>>
          {this.props.product.id}
        </div>
      </div>
    );
  }
}

AddQuestion.propTypes = {
  product: PropTypes.instanceOf(Object),
};

export default AddQuestion;
