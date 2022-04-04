import QuestionsAnswers from '../src/components/QuestionsAnswers.jsx';

describe('QuestionsAnswers', function() {
  var {
    Simulate,
    renderIntoDocument,
    findRendereDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = ReactTestUtils;

  var questionsanswers;

  beforeEach(function() {
    questionsandanswers = renderIntoDocument(<QuestionsAnswers />);
  });

  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(QuestionsAnswers)).toEqual(true);
  })


});