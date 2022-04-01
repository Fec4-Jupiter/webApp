import * as React from 'react';
import 'regenerator-runtime/runtime';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import App from '../client/src/index.jsx';
import axios from 'axios';

jest.mock('axios');

describe('Index test suite', () => {
  it('Should show a loading state initially', () => {
    axios.get.mockImplementation((url) => Promise.resolve({data:'Test'}));
    render(<App />);
    expect(screen.queryByText('Loading...')).not.toBeNull();
    expect(screen.queryByText('Facebook')).toBeNull();
  });

  // it('Should display additional components once the API request has returned', async () => {
  //   axios.get.mockImplementation((url) => Promise.resolve({data:'Test'}));
  //   render(<App />);
  //   await screen.findByRole('Button');
  //   expect(screen.queryByText('Loading...')).toBeNull();
  // });

  it('Should load products from the API after fetch', () => {
    axios.get.mockImplementation((url) => Promise.resolve({data:'Test'}));

    render(<App />);

  });
});