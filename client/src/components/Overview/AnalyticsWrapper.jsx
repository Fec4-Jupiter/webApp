/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-children-prop */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line max-classes-per-file
import React from 'react';

function analyticsWrapper(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const widget = Component.displayName;
      const element = e.target.className || e.target.innerHTML || e.target.name;
      console.log({ time, widget, element });
    }

    render() {
      return (
        <div onClick={this.handleClick}>
          <Component {...this.props} />
          ;
        </div>
      );
    }
  };
}

export default analyticsWrapper;
