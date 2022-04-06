/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { product: { pId, pName } } = this.props;
    // console.log(typeof id,typeof name);
    console.log(pId, pName);
    return (
      <Popup
        trigger={<button type="button" className="button">Add a new review</button>}
        position="top left"
        modal
      >
        {(close) => (
          <div className="modal">
            <button type="button" className="close" onClick={close}>
              &times;
            </button>
            <h1 className="header">Write Your Review</h1>
            <div className="subheader">
              {`About ${pName}`}
            </div>
            <form>
              <div className="frame">
                <div className="card-header">
                  <h3>
                    <label forhtml="Rating">
                      Overall Rating
                    </label>
                  </h3>
                </div>
                <div className="block-section">
                  <input type="text" id="Rating" className="a-input-text" />
                </div>
              </div>
              <hr />
              <div className="frame">
                <div className="card-header">
                  <h3>
                    Do you recommend this product?
                  </h3>
                </div>
                <div className="block-section">
                  <label forhtml="recommend" />
                  Yes
                  <input name="recommend" id="recommend" type="checkbox" />
                  <label forhtml="recommend" />
                  No
                  <input name="recommend" id="recommend" type="checkbox" />
                </div>
              </div>
              <hr />
              <div className="frame">
                <div className="card-header">
                  <h3>
                    Characterstics
                  </h3>
                </div>
                <div className="block-section">
                  <h4>Size</h4>
                  <label forhtml="Size" />
                  Too small&nbsp;
                  <input name="Size" id="Size" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Size" />
                  small&nbsp;
                  <input name="Size" id="Size" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Size" />
                  Perfect&nbsp;
                  <input name="Size" id="Size" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Size" />
                  big&nbsp;
                  <input name="Size" id="Size" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Size" />
                  Too big&nbsp;
                  <input name="Size" id="Size" type="checkbox" />
                  &nbsp;&nbsp;
                </div>
                <div className="block-section">
                  <h4>Width</h4>
                  <label forhtml="Width" />
                  Too narrow&nbsp;
                  <input name="Width" id="Width" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Width" />
                  Slightly narrow&nbsp;
                  <input name="Width" id="Width" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Width" />
                  Perfect&nbsp;
                  <input name="Width" id="Width" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Width" />
                  Slightly wide&nbsp;
                  <input name="Width" id="Width" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Width" />
                  Too wide&nbsp;
                  <input name="Width" id="Width" type="checkbox" />
                  &nbsp;&nbsp;
                </div>
                <div className="block-section">
                  <h4>Quality</h4>
                  <label forhtml="Quality" />
                  Poor&nbsp;
                  <input name="Quality" id="Quality" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Quality" />
                  Below average&nbsp;
                  <input name="Quality" id="Quality" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Quality" />
                  What I expected&nbsp;
                  <input name="Quality" id="Quality" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Quality" />
                  Pretty great&nbsp;
                  <input name="Quality" id="Quality" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Quality" />
                  Perfect&nbsp;
                  <input name="Quality" id="Quality" type="checkbox" />
                  &nbsp;&nbsp;
                </div>
                <div className="block-section">
                  <h4>Length</h4>
                  <label forhtml="Length" />
                  Runs Short&nbsp;
                  <input name="Length" id="Length" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Length" />
                  Runs slightly shorts&nbsp;
                  <input name="Length" id="Length" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Length" />
                  Perfect&nbsp;
                  <input name="Length" id="Length" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Length" />
                  Runs slightly long&nbsp;
                  <input name="Length" id="Length" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Length" />
                  Runs long&nbsp;
                  <input name="Length" id="Length" type="checkbox" />
                  &nbsp;&nbsp;
                </div>
                <div className="block-section">
                  <h4>Fit</h4>
                  <label forhtml="Fit" />
                  Runs Short&nbsp;
                  <input name="Fit" id="Fit" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Fit" />
                  Runs slightly shorts&nbsp;
                  <input name="Fit" id="Fit" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Fit" />
                  Perfect&nbsp;
                  <input name="Fit" id="Fit" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Fit" />
                  Runs slightly long&nbsp;
                  <input name="Fit" id="Fit" type="checkbox" />
                  &nbsp;&nbsp;
                  <label forhtml="Fit" />
                  Runs long&nbsp;
                  <input name="Fit" id="Fit" type="checkbox" />
                  &nbsp;&nbsp;
                </div>
              </div>
              <hr />
              <div className="frame">
                <div className="card-header">
                  <h3>
                    <label forhtml="Body">
                      Review Body
                    </label>
                  </h3>
                </div>
                <div className="block-section">
                  <input type="text" id="Body" className="a-input-text" />
                </div>
              </div>
              <hr />
              <div className="frame">
                <div className="card-header">
                  <h3>
                    <label forhtml="Summary">
                      Summary
                    </label>
                  </h3>
                </div>
                <div className="block-section">
                  <textarea />
                </div>
              </div>
              <hr />
              <input type="submit" />
            </form>
          </div>
        )}
      </Popup>

    );
  }
}
// <form>
//   <label htmlFor="date">date:</label>
//   <input type="date" id="date" name="date" />
// </form>

ReviewForm.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};
