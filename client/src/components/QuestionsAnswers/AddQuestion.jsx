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

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
      nickname: '',
      email: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      questionText: target.questionText,
      nickname: target.nickname,
      email: target.email,
    });
  }

  handleSubmit = (event) => {
    alert(`A question was submitted: ${this.state.questionText}`);
    event.preventDefault();
  };

  render() {
    return (
      <div className={this.props.showAddQuestion ? 'modal display-block' : 'modal display-none'}>
        <div>
          <h2> Ask your question</h2>
          <h3>
            {' '}
            About the
            {' '}
            {this.props.product.name}
            {' '}
          </h3>
          <form className="modal-main" onSubmit={this.handleSubmit}>
            <label>
              * Your question:
              <textarea name="questionText" onChange={this.handleChange} />
            </label>
            <label>
              * What is your nickname:
              <input type="text" name="nickname" placeholder="Example: jackson11!" onChange={this.handleInputChange} />
            </label>
            <label>
              * Your email:
              <input type="text" name="email" onChange={this.handleInputChange} />
            </label>
            <button type="button" onClick={this.props.handleClose}>
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
