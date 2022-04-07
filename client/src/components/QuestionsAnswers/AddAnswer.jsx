/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/no-unused-state */
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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    console.log('add Answer submitted', this.props);
    event.preventDefault();
    const postBody = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      photos: this.state.photos,
    };
    const question_id = this.props.question.question_id;
    console.log('question_id', question_id, 'type', typeof question_id);
    axios.post(`/qa/questions/:${question_id}/answers`, postBody)
      .then((res) => {
        console.log('res from post', res);
        this.props.updateQuestions(this.state.product_id);
      })
      .catch((err) => {
        throw err;
      });
    this.resetForm();
    this.props.handleClose();
  }

  resetForm = () => {
    document.getElementById('addAnswerForm').reset();
  };

  render() {
    return (
      <div className={this.props.showAddAnswer ? 'modal display-block' : 'modal display-none'}>
        <div className="modal-main">
          <h2> Submit Your Answer</h2>
          <h3>
            About the
            <span className="productname_addanswer">
              {this.props.product.name}
            </span>
            :
            <span className="questionbody_addanswer">
              {this.props.question.question_body}
            </span>
          </h3>
          <form
            id="addAnswerForm"
            className="addanswerform"
            onSubmit={this.handleSubmit}
          >

            <label className="formlabel">
              <span className="mandatory">* </span>
              Your answer:

            </label>
            <textarea type="text" className="textareaQA" name="body" onChange={this.handleInputChange} placeholder="Enter your question here" />

            <label className="formlabel">
              <span className="mandatory">* </span>
              {' '}
              What is your nickname:
              {' '}
            </label>
            <input className="inputQA" type="text" name="name" placeholder="Example: jack543!" onChange={this.handleInputChange} />

            <label className="formlabel">
              <span className="mandatory">* </span>
              Your email:
            </label>
            <input className="inputQA" type="text" name="email" onChange={this.handleInputChange} placeholder="Example: jack@email.com" />

            <p className="addqaauth">For authentication reasons, you will not be emailed</p>

            {/* <button
              className="formbuttonaddanswer"
              type="button"
            >
              Upload your photos
            </button> */}

            <button className="formbuttonaddanswer" type="button" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
          {/* <div className="inputerror">add err msg</div> */}
        </div>
      </div>
    );
  }
}

AddAnswer.propTypes = {
  showAddAnswer: PropTypes.bool,
  handleClose: PropTypes.instanceOf(Function),
  question: PropTypes.instanceOf(Object),
  product: PropTypes.instanceOf(Object),
  updateQuestions: PropTypes.instanceOf(Function),
};

export default AddAnswer;
