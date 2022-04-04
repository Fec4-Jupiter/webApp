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


});