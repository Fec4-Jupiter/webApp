/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import RatingsReviews from '../client/src/components/RatingsReviews.jsx';
import testData from './testdata.js';

describe('Ratings and Reviews test suite', () => {
  beforeEach(() => {
    const { product } = testData;
    render(<RatingsReviews product={product} />);
  });
  it('Should show title correctly', () => {
    expect(screen.getByText('Ratings & Reviews')).not.toBeNull();
  });
});
