/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
      photos: [],
    };

    this.baseState = this.state;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    // console.log(target.value);
    this.setState({
      [target.name]: target.value,
    });
  }

  resetForm = () => {
    this.setState(this.baseState);
    document.getElementById('addQuestionForm').reset();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(this.state));
    // question_id is an integer
    const question_id = this.props.question.question_id;
    axios.post(`/qa/questions/:${question_id}/answers`, this.state)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
    this.resetForm();
    this.props.handleClose();
  };

  render() {
    return (
      <div className={this.props.showAddAnswer ? 'modal display-block' : 'modal display-none'}>
        <div className="modal-main">
          <h2> Ask your answer</h2>
          <h3>
            {' '}
            About the
            {' '}
            {/* {this.props.product.name} */}
            {' '}
            id
            {' '}
            {/* {this.props.product.id} */}
            {' '}
          </h3>
          <form
            id="addQuestionForm"
            className="addquestionform"
            onSubmit={this.handleSubmit}
          >

            <label className="formlabel">
              <span className="mandatory">* </span>
              Your question:

            </label>
            <textarea type="text" className="textareaQA" name="body" onChange={this.handleInputChange} placeholder="Enter your question here" />

            <label className="formlabel">
              <span className="mandatory">* </span>
              {' '}
              What is your nickname:
              {' '}
            </label>
            <input className="inputQA" type="text" name="name" placeholder="Example: jackson11!" onChange={this.handleInputChange} />

            <label className="formlabel">
              <span className="mandatory">* </span>
              Your email:
            </label>
            <input className="inputQA" type="text" name="email" onChange={this.handleInputChange} placeholder="Example: jackson11@gmail.com" />

            <button className="formbutton" type="button" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddAnswer.propTypes = {
  product: PropTypes.instanceOf(Object),
  question: PropTypes.instanceOf(Object),
  handleClose: PropTypes.instanceOf(Function),
  showAddAnswer: PropTypes.bool,
};

export default AddAnswer;
