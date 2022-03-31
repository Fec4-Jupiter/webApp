import React from 'react';
import ReactDOM from 'react-dom/client';
import Overview from './components/Overview';
import QuestionsAnswers from './components/QuestionsAnswers';
import RatingsReviews from './components/RatingsReviews';
import RelatedItems from './components/RelatedItems';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentProduct: {
        id: 1,
        name: 'Camo Onesie',
        slogan: 'Blend in to your crowd',
        description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
        category: 'Jackets',
        default_price: '140',
      },
    };
  }

  render() {
    const { currentProduct } = this.state;
    return (
      <div>
        <Overview currentProduct={currentProduct} />
        <RelatedItems currentProduct={currentProduct} />
        <QuestionsAnswers currentProduct={currentProduct} />
        <RatingsReviews currentProduct={currentProduct} />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
