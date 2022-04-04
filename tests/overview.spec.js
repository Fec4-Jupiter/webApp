/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import 'regenerator-runtime/runtime.js';
import { render, screen, act } from '@testing-library/react';
import Overview from '../client/src/components/Overview.jsx';
import testData from './testdata.js';

describe('Overview test suite', () => {
  beforeEach(() => {
    const { product, styles, reviews } = testData;
    render(<Overview product={product} styles={styles.data.results} reviews={reviews.data.results} />);
  });
  it('Should display product title, category, price, and overview information', () => {
    expect(screen.getByText(testData.product.category)).not.toBeNull();
    expect(screen.getByText(testData.product.name)).not.toBeNull();
    expect(screen.getByText(testData.product.default_price)).not.toBeNull();
    expect(screen.getByText(testData.product.slogan)).not.toBeNull();
    expect(screen.getByText(testData.product.description)).not.toBeNull();
  });

  it('Should display average rating of a product, and a link to view all ratings', () => {
    const totalReviews = testData.reviews.data.results.length;
    let reviewSum = 0;
    testData.reviews.data.results.forEach((review) => {
      reviewSum += review.rating;
    });
    const averageReview = (reviewSum / totalReviews).toFixed(1);
    expect(screen.getByText(`Read all ${totalReviews} reviews`, { exact: false })).not.toBeNull();
    expect(screen.getByText(`Rating: ${averageReview} stars.`, { exact: false })).not.toBeNull();
  });
});
