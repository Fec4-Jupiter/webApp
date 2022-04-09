/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function analyticsWrapper(Component) {
  return function WrappedComponent(props) {
    const handleClick = (e) => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      const time = `${h}:${m}:${s}`;
      const widget = Component.displayName;
      const element = e.target.className || e.target.innerHTML || e.target.name;

      console.log({ time, widget, element });
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onClick={handleClick}>
        <Component {...props} />
        ;
      </div>
    );
  };
}

export default analyticsWrapper;
