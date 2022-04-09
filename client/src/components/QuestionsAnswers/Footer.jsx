/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import axios from 'axios';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSeller: false,
      showPhotos: false,
    };

    this.showPhotos = this.showPhotos.bind(this);
  }

  // componentDidMount() {
  //   console.log()
  // }

  // eslint-disable-next-line class-methods-use-this
  showPhotos = (photos) => {
    photos.map((photo) => {
      const { id, url } = photo;
      return (
        <img src={url} key={id} alt="cat" className="QAthumb" />
      );
    });
  };

  render() {
    return ( // 2 rows
      <div>
        <div className="footerrow-1">
          {this.showPhotos(this.props.answer[1].photos)}
        </div>
        <div className="footerrow-2">
          {/* if answerer name === 'Seller', show in bold */}
          <span>{`by ${this.props.answer[1].answerer_name}`}</span>
          <span>{moment(this.props.answer[1].date).format('MMMM Do, YYYY')}</span>
          <span className="footerseparator">|</span>
          <span className="answerhelpfulness">
            Helpful?
          </span>
          <span className="answerhelp_yes">
            Yes
          </span>
          <span className="answerhelpfulnesscount">{` (${this.props.answer[1].helpfulness}) `}</span>
          <span className="footerseparator">|</span>
          <span>Report</span>

        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  answer: PropTypes.instanceOf(Object),
};

Footer.displayName = 'Footer';
export default Footer;
