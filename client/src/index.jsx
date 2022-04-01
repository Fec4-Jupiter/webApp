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
      currentProduct: {},
    };
  }

  componentDidMount() {
    axios.get('/products')
      .then((results) => this.setState({ currentProduct: results.data[0] }))
      .catch((err) => { throw err; });
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
