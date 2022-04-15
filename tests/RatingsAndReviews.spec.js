/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RatingsReviews from '../client/src/components/RatingsReviews.jsx';
import testData from './testdata.js';
import 'regenerator-runtime/runtime';

describe('Ratings and Reviews test suite', () => {
  beforeEach(() => {
    const { product } = testData;
    render(<RatingsReviews product={product} />);
  });
  it('Should show title correctly', async () => {
    await waitFor(() => expect(screen.getByText('Ratings & Reviews')).not.toBeNull());
  });
});
