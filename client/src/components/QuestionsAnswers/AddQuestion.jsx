/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

function AddQuestion(props) {
  const showHideClassName = props.showAddQuestion ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p>{props.product.name}</p>
        <button type="button" onClick={props.handleClose}>
          Close
        </button>
      </section>
    </div>
  );
}

AddQuestion.propTypes = {
  product: PropTypes.instanceOf(Object),
  handleClose: PropTypes.instanceOf(Function),
  showAddQuestion: PropTypes.bool,
};

export default AddQuestion;
