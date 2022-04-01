import React from 'react';
import ReactDOM from 'react-dom/client';
import Overview from './components/Overview.jsx';
import QuestionsAnswers from './components/QuestionsAnswers.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import RelatedItems from './components/RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
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
