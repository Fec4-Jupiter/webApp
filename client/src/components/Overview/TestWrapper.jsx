/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-children-prop */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

class TestWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.children);
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}

export default TestWrapper;
