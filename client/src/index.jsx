import React from 'react';
import ReactDOM from 'react-dom/client';
import Overview from './components/Overview.jsx';
import QuestionsAnswers from './components/QuestionsAnswers.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import RelatedItems from './components/RelatedItems.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product: null,
      reviews: [],
      styles: [],
      related: [],
      questions: [],
    };

    this.updateProduct = this.updateProduct.bind(this);
  }

  updateProduct(id) {
    let newState = {};
    axios.get(`/products/${id}`)
      .then((results) => {
        newState.product=results.data;
        const reviews = axios.get(`/reviews?product_id=${id}&count=500`);
        const styles = axios.get(`/products/${id}/styles`);
        const related = axios.get(`/products/${id}/related`);
        const questions = axios.get(`/qa/questions?product_id=${id}&count=500`);
        Promise.all([reviews, styles, related, questions])
          .then((values) => {
            newState.reviews = values[0].data.results;
            newState.styles = values[1].data.results;
            newState.related = values[2].data;
            newState.questions = values[3].data.results;
            this.setState(newState);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => { throw err;})

  }

  componentDidMount() {
    this.updateProduct(66642);
  }

  render() {
    const { product, reviews, styles, related, questions } = this.state;
    if (!product) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <Overview product={product} styles={styles} reviews={reviews} />
          <RelatedItems product={product} related={related} />
          <QuestionsAnswers product={product} questions={questions} />
          <RatingsReviews id="RatingsReviews" product={product} reviews={reviews} />
        </div>
      );
    }
  }
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
