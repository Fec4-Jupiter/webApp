import React from 'react';
import ReactDOM from 'react-dom/client';
import Overview from './components/Overview.jsx';
import QuestionsAnswers from './components/QuestionsAnswers.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import RelatedItems from './components/RelatedItems.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentProduct: {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
      }
    }
  }

  render() {
    return (
      <div>
        <Overview currentProduct={this.state.currentProduct} />
        <RelatedItems currentProduct={this.state.currentProduct} />
        <QuestionsAnswers currentProduct={this.state.currentProduct} />
        <RatingsReviews currentProduct={this.state.currentProduct} />
      </div>
    )
  }
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);