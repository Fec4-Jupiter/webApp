/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import 'regenerator-runtime/runtime.js';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import App from '../client/src/index.jsx';
import testData from './testdata.js';

jest.mock('axios');

describe('Index test suite', () => {
  it('Should show a loading state initially', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: 'Test' }));
    act(() => {
      render(<App />);
    });
    expect(screen.queryByText('Loading...')).not.toBeNull();
    expect(screen.queryByText('Facebook')).toBeNull();
  });

  it('Should make appropriate API calls on load', async () => {
    const urls = [];
    axios.get.mockImplementation((url) => {
      urls.push(url);
      let response;
      switch (url) {
        case '/products/66642/styles':
          response = testData.styles;
          break;
        case '/reviews?product_id=66642&count=500':
          response = testData.reviews;
          break;
        case '/products/66642/related':
          response = testData.related;
          break;
        case '/qa/questions?product_id=66642&count=500':
          response = testData.questions;
          break;
        default:
          response = testData.product;
          break;
      }
      return Promise.resolve(response);
    });

    await act(async () => render(<App />));

    expect(urls[0]).toEqual('/products/66642');
    expect(urls[1]).toEqual('/reviews?product_id=66642&count=500');
    expect(urls[2]).toEqual('/products/66642/styles');
    expect(urls[3]).toEqual('/products/66642/related');
    expect(urls[4]).toEqual('/qa/questions?product_id=66642&count=500');
  });
});
