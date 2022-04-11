/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 11,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === 'light' ? '#32CD32' : '#308fe8',
  },
}));

export default class RatingSideBar extends React.Component {
  constructor(props) {
    super(props);
    const { avg, total, recRate } = this.calculateAverate();
    this.state = {
      avg,
      total,
      recRate: recRate * 100,
    };
  }

  calculateAverate() {
    const { metadata: { ratings, recommended } } = this.props;
    let sum = 0;
    let total = 0;
    for (const key in ratings) {
      if ({}.hasOwnProperty.call(ratings, key)) {
        const count = Number(ratings[key]);
        const stars = Number(key);
        total += count;
        sum += count * stars;
      }
    }
    const rec = Number(recommended.true);
    return {
      avg: sum / total,
      total,
      recRate: rec / total,
    };
  }

  renderLinearBar() {
    const { metadata: { ratings }, clickFilters, filters } = this.props;
    const { total } = this.state;
    const normalise = (value) => ((value * 100) / total);
    const arr = [];
    for (let i = 5; i >= 1; i -= 1) {
      if (!ratings[i]) {
        arr.push([i, 0]);
      } else {
        arr.push([i, Number(ratings[i])]);
      }
    }
    return (
      <div>
        {
          arr.map((rating) => (
            <div key={rating[0]}>
              <u>{`${rating[0]} Stars`}</u>
              <BorderLinearProgress
                variant="determinate"
                style={filters.includes(rating[0]) ? { border: '3px solid orange' } : null}
                value={normalise(rating[1])}
                onClick={() => clickFilters(rating[0])}
              />
            </div>
          ))
        }
        {filters.length === 0 ? null
          : (<button style={{ marginTop: 15 }} onClick={() => clickFilters()} type="button">Remove all filters</button>)}
      </div>
    );
  }

  render() {
    const { avg, recRate } = this.state;
    return (
      <div className="r">
        <span style={{ display: 'flex', flexDirection: 'row' }}>
          <h2>{avg.toFixed(1)}</h2>
          {avg % 1 === 0 ? <Rating defaultValue={avg} readOnly />
            : <Rating name="half-rating" defaultValue={avg} precision={0.25} readOnly />}
        </span>
        <br />
        <p>{`${recRate.toFixed(1)}% of reviews recommend this product`}</p>
        {this.renderLinearBar()}
      </div>
    );
  }
}

RatingSideBar.propTypes = {
  metadata: PropTypes.instanceOf(Object).isRequired,
  clickFilters: PropTypes.instanceOf(Function).isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
};
