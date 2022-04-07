/* eslint-disable react/no-unused-class-component-methods */
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
      body: '',
      name: '',
      email: '',
      product_id: this.props.product.id,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    // console.log(target.value);
    this.setState({
      [target.name]: target.value,
    });
  }

  resetForm = () => {
    document.getElementById('addQuestionForm').reset();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const postBody = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      product_id: this.props.product.id,

    };
    // console.log(JSON.stringify(this.state));
    axios.post('/qa/questions', postBody)
      .then((res) => {
        console.log(res);
        this.props.updateQuestions(this.state.product_id);
      })
      .catch((err) => {
        throw err;
      });

    this.resetForm();
    this.props.handleClose();
  };

  render() {
    return (
      <div className={this.props.showAddQuestion ? 'modal display-block' : 'modal display-none'}>
        <div className="modal-main">
          <h2> Ask your question</h2>
          <h3>
            About the
            <span className="productname_addquestion">
              {this.props.product.name}
            </span>
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

            <p className="addqaauth">For authentication reasons, you will not be emailed</p>

            <button className="formbutton" type="button" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
          {/* <div className="inputerror">add err msg</div> */}
        </div>
      </div>
    );
  }
}

AddQuestion.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
  handleClose: PropTypes.instanceOf(Function),
  showAddQuestion: PropTypes.bool,
  updateQuestions: PropTypes.instanceOf(Function),
};

export default AddQuestion;
