/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { render, screen, act } from '@testing-library/react';
import QuestionsAnswers from '../client/src/components/QuestionsAnswers.jsx';

// eslint-disable-next-line no-undef
describe('QuestionsAnswers', () => {
  const {
    Simulate,
    renderIntoDocument,
    findRendereDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass,
  // eslint-disable-next-line no-undef
  } = ReactTestUtils;

  let qa;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    qa = renderIntoDocument(
      <QuestionsAnswers />,
    );
  });

  // eslint-disable-next-line no-undef
  it('should be a stateful class component', () => {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-prototype-builtins
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-prototype-builtins
    // eslint-disable-next-line no-undef
    expect(React.Component.isPrototypeOf(QuestionsAnswers)).toEqual(true);
  });
});
