/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  height: 750,
  overflow: 'scroll',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 10,
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
      hover: -1,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { product: { pId }, submitReview, metadata } = this.props;
    const { characteristics } = metadata;
    const {
      rating, summary, body, recommend, name, email, photos,
      Size, Width, Comfort, Quality, Length, Fit,
    } = this.state;
    const chara = {};
    for (const key in characteristics) {
      chara[characteristics[key].id] = Number(this.state[key]);
    }
    const obj = {
      product_id: pId,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics: chara,
    };
    // console.log(obj);
    this.setState({ open: false }, () => submitReview(obj));
    // submitReview(obj);
  }

  handleRating(newRating) {
    this.setState({
      rating: newRating,
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
    if (photos.length < 5) {
      photos.push(url);
      this.setState({
        photos,
        preview: url,
      });
    } else {
      alert('You can only upload 5 photos!');
    }
  }

  getLabelText(value) {
    const text = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great',
    };
    return `${value} Star${value !== 1 ? 's' : ''}, ${text[value]}`;
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
      <div style={{ margin: 5 }}>
        {
          names.map((name) => (
            <div key={name}>
              <h4>{name}</h4>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
                marginBottom: 5,
              }}
              >
                {
                  labels[name].map((label, index) => (

                    <div key={label} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                      <input
                        type="radio"
                        id={label}
                        name={name}
                        value={index + 1}
                        required
                        onChange={(e) => this.handleChange(e)}
                      />
                      <label htmlFor={label} style={{ fontSize: 'medium' }}>
                        {` ${label} `}
                      </label>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>

    );
  }

  renderPhoto() {
    const Input = styled('input')({
      display: 'none',
    });
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
      open, rating, ratingText, recommend, photos, hover,
    } = this.state;
    const text = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great',
    };
    const { product: { pId, pName } } = this.props;
    return (
      <div>
        <div className="btn">
          <Button id="writenewreview" className="text_button" variant="outlined" onClick={() => this.setState({ open: true })}>Write a new Review</Button>
          {' '}
        </div>

        <Modal
          open={open}
          onClose={() => this.setState({ open: false })}
          aria-labelledby="main-modal"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div name="header">
                <h3>
                  Write your review
                  {' '}
                  {'about '}
                  {' '}
                  {pName}
                </h3>
              </div>
              <hr />
              <div name="overall-rating" style={{ margin: 10 }}>
                <label htmlFor="reviews-ratingStar">
                  <h3>
                    Overall Rating
                    <span style={{ color: '#ff0000' }}>
                      *
                    </span>
                  </h3>
                </label>
                <Box
                  sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    id="reviews-ratingStar"
                    getLabelText={this.getLabelText}
                    onChange={(e, newRating) => this.handleRating(newRating)}
                    onChangeActive={(event, newHover) => {
                      this.setState({ hover: newHover });
                    }}
                    required
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {rating !== null && (
                    <Box sx={{ ml: 2 }}>{text[hover !== -1 ? hover : rating]}</Box>
                  )}
                </Box>
              </div>
              <div name="recommend" style={{ margin: 10 }}>
                <h3>
                  Do you recommend this product?
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h3>
                <input onChange={(e) => this.handleChange(e)} type="radio" id="Yes" name="recommend" value="Yes" required />
                <label htmlFor="Yes">Yes</label>
                <input onChange={(e) => this.handleChange(e)} type="radio" id="No" name="recommend" value="No" />
                <label htmlFor="No">No</label>
              </div>
              <div name="Characterstics" style={{ margin: 10 }}>
                <h3>
                  Characterstics
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h3>
                {this.renderChara()}
              </div>
              <div className="review-summary" style={{ margin: 10 }}>
                <h3>Review Summary</h3>
                <input onChange={(e) => this.handleChange(e)} size="30" maxLength="60" type="text" name="summary" placeholder="what's most important to know?" />
              </div>
              <div className="review-body" style={{ margin: 10 }}>
                <h3>
                  Review Body
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h3>
                <textarea
                  onChange={(e) => this.handleChange(e)}
                  maxLength="1000"
                  type="text"
                  required
                  name="body"
                  placeholder="What did you like or dislike?"
                  cols="78"
                  rows="5"
                />
              </div>
              <div className="review-name" style={{ margin: 10 }}>
                <h3>
                  What is your nickname?
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h3>
                <input onChange={(e) => this.handleChange(e)} maxLength="60" type="text" name="name" id="name" size="30" required placeholder="Example: jackson11!" />
              </div>
              <div className="review-email" style={{ margin: 10 }}>
                <h3>
                  Your email
                  <span style={{ color: '#ff0000' }}>
                    *
                  </span>
                </h3>
                <input onChange={(e) => this.handleChange(e)} required maxLength="60" type="email" name="email" placeholder="“Example: jackson11@email.com”" />
              </div>
              <div className="review-photo" style={{ margin: 10, marginTop: 20 }}>
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
              <div style={{ margin: 10 }}>
                {' '}
                <button type="submit">Submit</button>
                <button type="button" onClick={() => this.setState({ open: false })}>close</button>

              </div>

            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}
