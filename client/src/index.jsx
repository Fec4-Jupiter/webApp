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
      product: {},
      reviews: [],
      styles: [],
      related: [],
      questions: [],
    };
  }

  componentDidMount() {
    let newState = {};
    axios.get('/products')
      .then((results) => {
        newState.product=results.data[0];
        const id = newState.product.id;
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

  render() {
    const { product, reviews, styles, related, questions } = this.state;
    return (
      <div>
        <Overview product={product} reviews={reviews} styles={styles} />
        <RelatedItems props={this.state} />
        <QuestionsAnswers props={this.state} />
        <RatingsReviews id="RatingsReviews" props={this.state} />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
