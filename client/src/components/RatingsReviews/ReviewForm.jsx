/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Rating, Modal, Button, Box, ButtonGroup,
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
  outline: 0,
};

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openImg: false,
      rating: 0,
      url: '',
      preview: '',
      ratingText: '',
      Size: '',
      Width: '',
      Comfort: '',
      Quality: '',
      Length: '',
      Fit: '',
      body: '',
      summary: '',
      email: '',
      name: '',
      photos: [],
      recommend: true,
    };
  }

  handleRating(newRating) {
    const text = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great',
    };
    this.setState({
      rating: newRating,
      ratingText: text[newRating],
    });
  }

  handleChange(e) {
    const { value, name } = e.target;
    // console.log(name, this.state[name]);
    if (name !== 'recommend') {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: value === 'Yes',
      });
    }
  }

  handleImg() {
    const { photos, url } = this.state;
    if (photos.length <= 5) {
      photos.push(url);
      this.setState({
        photos,
        preview: url,
      });
    } else {
      alert('You can only upload 5 photos!');
    }
  }

  renderChara() {
    const names = ['Size', 'Width', 'Comfort', 'Quality', 'Length', 'Fit'];
    const labels = {
      Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
      Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
      Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    };

    return (
      <div>
        {
          names.map((name) => (
            <div key={name}>
              <h5>{name}</h5>
              {
                labels[name].map((label) => (

                  <label htmlFor={label} key={label}>
                    <input
                      type="radio"
                      id={label}
                      name={name}
                      value={label}
                      required
                      onChange={(e) => this.handleChange(e)}
                    />
                    {` ${label} `}
                  </label>

                ))
              }
            </div>
          ))
        }
        <hr />
      </div>

    );
  }

  renderPhoto() {
    return (
      <div>
        <Button onClick={() => this.setState({ openImg: true })}>Upload your Photo</Button>
        <Modal
          hideBackdrop
          open={this.state.openImg}
          onClose={() => this.setState({ openImg: false })}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500, height: 'auto' }}>
            <h2 id="child-modal-title">Upload your photo</h2>

            <label htmlFor="img">Url: </label>
            <input
              style={{ width: 250 }}
              onChange={(e) => this.handleChange(e)}
              type="text"
              id="img"
              name="url"
              value={this.state.url}
              required
              placeholder="Please enter url for your photo!"
            />
            {' '}
            <input
              type="button"
              value="Upload it"
              onClick={() => this.handleImg()}
            />
            <br />
            <br />
            <h3 id="child-modal-description">
              Your photo preview below:
            </h3>
            <img src={this.state.url} alt="not valid url" />
            <Button onClick={() => this.setState({ openImg: false })}>Back</Button>
          </Box>
        </Modal>
      </div>
    );
  }

  render() {
    const {
      open, rating, ratingText, recommend, photos,
    } = this.state;
    const { product: { pId, pName } } = this.props;
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>Write a new Review</Button>
        <Modal
          open={open}
          onClose={() => this.setState({ open: false })}
          aria-labelledby="main-modal"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              <div name="header">
                <h2>
                  Write your review
                </h2>
              </div>
              <div name="sub-header">
                <h3>
                  {`About ${pName}`}
                </h3>
              </div>
              <div name="overall-rating">
                <h4>
                  Overall Rating
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h4>

                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(e, newRating) => this.handleRating(newRating)}
                />
                <span>{ratingText}</span>
              </div>
              <div name="recommend">
                <h4>
                  Do you recommend this product?
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h4>
                <input onChange={(e) => this.handleChange(e)} type="radio" id="Yes" name="recommend" value="Yes" required />
                <label htmlFor="Yes">Yes</label>
                <input onChange={(e) => this.handleChange(e)} type="radio" id="No" name="recommend" value="No" />
                <label htmlFor="No">No</label>
              </div>
              <div name="Characterstics">
                <h4>
                  Characterstics
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h4>
                {this.renderChara()}
              </div>
              <div className="review-summary">
                <h4>Review Summary</h4>
                <input onChange={(e) => this.handleChange(e)} maxLength="60" type="text" name="summary" placeholder="what's most important to know?" />
              </div>
              <div className="review-body">
                <h4>
                  Review Body
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h4>
                <input onChange={(e) => this.handleChange(e)} maxLength="1000" type="text" name="body" placeholder="What did you like or dislike?" />
              </div>
              <div className="review-name">
                <h4>
                  What is your nickname?
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h4>
                <input onChange={(e) => this.handleChange(e)} maxLength="60" type="text" name="name" id="name" required placeholder="Example: jackson11!" />
              </div>
              <div className="review-email">
                <h4>
                  Your email
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h4>
                <input onChange={(e) => this.handleChange(e)} maxLength="60" type="email" name="emails" placeholder="“Example: jackson11@email.com”" />
              </div>
              <div className="review-photo">
                <h4>upload photo here!</h4>
                {this.renderPhoto()}
                {photos.length === 0 ? null
                  : (
                    <div>
                      {
                        photos.map((url) => (
                          <img className="thumbnailcontainer" key={url} src={url} alt="img crashed" />
                        ))
                      }
                    </div>
                  )}
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => this.setState({ open: false })}>close</button>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}
