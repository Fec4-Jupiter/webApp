/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import 'regenerator-runtime/runtime.js';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Overview from '../client/src/components/Overview.jsx';
import StyleSelector from '../client/src/components/Overview/StyleSelector.jsx';
import AddToCart from '../client/src/components/Overview/AddToCart.jsx';
import Gallery from '../client/src/components/Overview/Gallery.jsx';
import testData from './testdata.js';

jest.mock('axios');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Product information test suite', () => {
  beforeEach(() => {
    const { product } = testData;
    let { styles, reviews } = testData;
    styles = styles.data.results;
    reviews = reviews.data.results;
    render(<Overview product={product} styles={styles} reviews={reviews} />);
  });
  it('Should display product title, category, price and overview information', () => {
    expect(screen.getByText(testData.product.category.toUpperCase())).not.toBeNull();
    expect(screen.getByText(testData.product.name)).not.toBeNull();
    expect(screen.getByText(`$${testData.product.default_price}`)).not.toBeNull();
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

  it('Should display links to share on social media', async () => {
    expect(screen.getByAltText('facebook')).not.toBeNull();
    expect(screen.getByAltText('twitter')).not.toBeNull();
    expect(screen.getByAltText('pinterest')).not.toBeNull();
  });

  // ToDo: add negative testing for ratings (don't show ratings with an empty object)
});

describe('Style Selector test suite', () => {
  it('Should display Style Selector for products with current style name and thumbnails', async () => {
    const styles = testData.styles.data.results;
    const defaultStyle = styles.filter((style) => style['default?'])[0];
    render(<StyleSelector currentStyle={defaultStyle} styles={styles} changeStyle={() => {}} />);
    expect(screen.getByText(defaultStyle.name)).not.toBeNull();
    expect(screen.getAllByRole('img').length).toBe(styles.length);
  });

  it('Clicking a style should send that style to the click handler', () => {
    const styles = testData.styles.data.results;
    const defaultStyle = styles.filter((style) => style['default?'])[0];
    const onClick = jest.fn();
    const instClick = (val) => onClick(val);

    render(<StyleSelector currentStyle={defaultStyle} styles={styles} changeStyle={instClick} />);

    fireEvent.click(screen.getAllByRole('img')[1]);
    expect(onClick).toHaveBeenCalledWith(styles[1]);
  });
});

describe('Add to Cart test suite', () => {
  it('Should display size and quantity selectors with the correct number of elements', () => {
    const styles = testData.styles.data.results;
    const defaultStyle = styles.filter((style) => style['default?'])[0];

    const container = document.createElement('div');
    document.body.appendChild(container);

    render(<AddToCart currentStyle={defaultStyle} />, container);
    // Should render two dropdown boxes
    expect(screen.getAllByRole('combobox').length).toBe(2);
    // Initially dropdownboxes should only have 7 options (6 sizes + hidden "select size")
    expect(screen.getAllByRole('option').length).toBe(7);
    // Select a size option
    fireEvent.change(screen.getByRole('combobox', { name: 'size' }), { target: { value: 'M' } });
    // dropdown boxes should have rendered the quantity dropdown, increasing number of options to 21
    expect(screen.getAllByRole('option').length).toBe(21);
  });

  it('Should make the correct API call when Add to Cart is clicked and valid quantity/size is selected', () => {
    axios.post.mockImplementation(() => Promise.resolve({}));
    const styles = testData.styles.data.results;
    const defaultStyle = styles.filter((style) => style['default?'])[0];

    const container = document.createElement('div');
    document.body.appendChild(container);

    render(<AddToCart currentStyle={defaultStyle} />, container);
    // Select a size option to render quantity
    fireEvent.change(screen.getByRole('combobox', { name: 'size' }), { target: { value: 'M' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'quantity' }), { target: { value: '3' } });
    fireEvent(screen.getByRole('button'), new MouseEvent('click'));

    expect(axios.post).toHaveBeenCalledWith('/cart', { count: '3', sku_id: '2390359' });
  });

  it('Should show OUT OF STOCK and hide Add to Cart button for a style with no stock', () => {
    const blankStyle = { skus: [] };
    render(<AddToCart currentStyle={blankStyle} />);
    expect(screen.getByRole('option', { name: 'OUT OF STOCK' })).not.toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('Image Gallery test suite', () => {
  it('Should display a main image and a list of thumbnail images', async () => {

  });

  it('Should highlight the thumbnail corresponding to the main image', async () => {
  });

  it('Should display an Expanded View when the default view is clicked', () => {
  });

  it('Should populate the Expanded View with zoomable image componenets', () => {
  });
});
