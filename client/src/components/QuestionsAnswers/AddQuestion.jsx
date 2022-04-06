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

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
      nickname: '',
      email: '',
      product: this.props.product.id,
    };

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

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(this.state));
    axios.post('/qa/questions', JSON.stringify(this.state))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    return (
      <div className={this.props.showAddQuestion ? 'modal display-block' : 'modal display-none'}>
        <div className="modal-main">
          <h2> Ask your question</h2>
          <h3>
            {' '}
            About the
            {' '}
            {this.props.product.name}
            {' '}
            id
            {' '}
            {this.props.product.id}
            {' '}
          </h3>
          <form className="addquestionform" onSubmit={this.handleSubmit}>

            <label className="formlabel">
              <span className="mandatory">* </span>
              Your question:

            </label>
            <textarea type="text" className="textareaQA" name="questionText" onChange={this.handleInputChange} placeholder="Enter your question here" />

            <label className="formlabel">
              <span className="mandatory">* </span>
              {' '}
              What is your nickname:
              {' '}
            </label>
            <input className="inputQA" type="text" name="nickname" placeholder="Example: jackson11!" onChange={this.handleInputChange} />

            <label className="formlabel">
              <span className="mandatory">* </span>
              Your email:
            </label>
            <input className="inputQA" type="text" name="email" onChange={this.handleInputChange} placeholder="Example: jackson11@gmail.com" />

            <button className="formbutton" type="button" onClick={this.props.handleClose}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddQuestion.propTypes = {
  product: PropTypes.instanceOf(Object),
  handleClose: PropTypes.instanceOf(Function),
  showAddQuestion: PropTypes.bool,
};

export default AddQuestion;
