import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <div>Hello World!</div>
)

// ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.createRoot(document.getElementById('app')).render(<App />);