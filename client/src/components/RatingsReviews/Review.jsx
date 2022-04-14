/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating/';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  // bgcolor: 'background.paper',
  // border: '0px solid #000',
  // boxShadow: 24,
  // p: 4,
};

class Review extends React.Component {
  constructor(props) {
    super(props);
    const { reviews } = props;
    const openImg = {};
    reviews.forEach((review) => {
      review.photos.forEach(({ id }) => { openImg[id] = false; });
    });
    console.log(openImg);
    this.state = {
      flags: {},
      openImg,
    };
  }

  toggleShowMore(index) {
    const { flags } = this.state;
    const flag = flags[index];
    flags[index] = !flag;
    this.setState({ flags });
    // console.log(flags);
  }

  renderReview() {
    const { reviews, helpful, report } = this.props;
    return reviews.map((review, index) => (
      <div key={review.review_id}>
        <br />
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Rating defaultValue={review.rating} readOnly />
          {`${review.reviewer_name}, ${moment(review.date).format('MMM DD, YYYY')}`}
        </span>
        <h4><strong>{review.summary}</strong></h4>
        {this.renderBody(review.body, index)}
        {this.renderImg(review.photos)}
        {review.recommend ? <p>&#10004; I recommend this product</p> : null}
        {review.response !== '' && review.response !== null
          ? (
            <div className="Response">
              <h5>Response</h5>
              <p>{review.response}</p>
            </div>
          ) : null}
        <div>
          Helpful?
          {' '}
          <Button size="small" variant="text" onClick={() => helpful(review.review_id)}><u>{`Yes (${review.helpfulness})`}</u></Button>
          {' | '}
          <Button size="small" variant="text" onClick={() => report(review.review_id)}><u>Report</u></Button>

        </div>

        <br />
        <hr />

      </div>
    ));
  }

  renderBody(body, index) {
    const { flags } = this.state;
    const flag = flags[index];
    if (body.length > 250) {
      const len = flag ? body.length : 250;
      return (
        <div>
          <p>{body.slice(0, len)}</p>
          <Button
            size="small"
            variant="outlined"
            onClick={() => this.toggleShowMore(index)}
          >
            {flag ? 'show less' : 'show more'}
          </Button>
        </div>
      );
    }
    return (<p>{body}</p>);
  }

  renderImg(photos) {
    const { openImg } = this.state;
    return (
      <ImageList sx={{ width: 500, height: 'auto' }} cols={5} rowHeight="auto">
        {
          photos.map((photo) => {
            const { id, url } = photo;
            return (
              <div key={id}>
                <ImageListItem key={url}>
                  <img src={url} onClick={() => this.setState({ openImg: { [id]: true } })} alt="picutre is not showing" />
                </ImageListItem>
                <Modal
                  open={openImg[id]}
                  onClose={() => this.setState({ openImg: { [id]: false } })}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 300,
                  }}
                >
                  <Fade in={openImg[id]}>
                    <Box id="modal-modal-description" sx={style} onClick={() => this.setState({ openImg: { [id]: false } })}>
                      <img
                        src={`${url}`}
                        srcSet={`${url}`}
                        loading="lazy"
                        alt="broken"
                      />
                    </Box>
                  </Fade>

                </Modal>
              </div>

            );
          })
        }
      </ImageList>
    );
  }

  render() {
    return (
      <div>
        {this.renderReview()}
      </div>
    );
  }
}

Review.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  helpful: PropTypes.instanceOf(Function).isRequired,
  report: PropTypes.instanceOf(Function).isRequired,
};
export default Review;
