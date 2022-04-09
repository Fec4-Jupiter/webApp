/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as React from 'react';
import 'regenerator-runtime/runtime.js';
import { render, screen } from '@testing-library/react';
import QuestionsAnswers from '../client/src/components/QuestionsAnswers.jsx';
import QuestionsList from '../client/src/components/QuestionsAnswers/QuestionsList.jsx';
import testData from './testdata.js';

describe('QuestionsAnswers test suite', () => {
  beforeEach(() => {
    const { product } = testData;
    const questions = testData.questions.data.results;
    render(<QuestionsAnswers product={product} questions={questions} />);
  });

  it('Should display product id', () => {
    expect(screen.getByText(testData.product.id)).not.toBeNull();
  });
});
