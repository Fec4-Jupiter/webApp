/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Overview from './components/Overview.jsx';
import QuestionsAnswers from './components/QuestionsAnswers.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import analyticsWrapper from './components/Common/AnalyticsWrapper.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      reviews: [],
      styles: [],
      questions: [],
    };

    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    this.updateProduct(66642);
  }

  updateProduct(id) {
    const newState = {};
    axios.get(`/products/${id}`)
      .then((results) => {
        newState.product = results.data;
        const reviews = axios.get(`/reviews?product_id=${id}&count=500`);
        const styles = axios.get(`/products/${id}/styles`);
        const questions = axios.get(`/qa/questions?product_id=${id}&count=500`);
        Promise.all([reviews, styles, questions])
          .then((values) => {
            newState.reviews = values[0].data.results;
            newState.styles = values[1].data.results;
            newState.questions = values[2].data.results;
            this.setState(newState);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => { throw err; });
  }

  render() {
    const {
      product, reviews, styles, questions,
    } = this.state;
    if (!product) {
      return <div>Loading...</div>;
    }
    const WrappedOverview = analyticsWrapper(Overview);
    const WrappedQA = analyticsWrapper(QuestionsAnswers);
    const WrappedRatings = analyticsWrapper(RatingsReviews);
    return (
      <div className="app">
        <div className="title-banner">
          <h2>Jupiter Clothing</h2>
        </div>
        <div className="content">
          <WrappedOverview product={product} styles={styles} reviews={reviews} />
          <WrappedQA product={product} questions={questions} />
          <WrappedRatings product={product} />
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.createRoot(document.getElementById('app') || document.createElement('div')).render(<App />);
