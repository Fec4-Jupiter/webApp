import React from 'react';
import ReactDOM from 'react-dom/client';
import Overview from './components/Overview.jsx';
import QuestionsAnswers from './components/QuestionsAnswers.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import RelatedItems from './components/RelatedItems.jsx';

const App = () => (
  <div>
    <Overview />
    <RatingsReviews />
    <QuestionsAnswers />
    <RelatedItems />
  </div>
)

ReactDOM.createRoot(document.getElementById('app')).render(<App />);