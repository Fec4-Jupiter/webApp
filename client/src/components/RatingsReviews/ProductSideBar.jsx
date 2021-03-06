import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function ProductSideBar({ metadata }) {
  const { characteristics } = metadata;
  const arr = Object.keys(characteristics);
  const obj = {
    Size: ['small', 'perfect', 'wide'],
    Width: ['narrow', 'perfect', 'wide'],
    Comfort: ['poor', 'Ok', 'perfect'],
    Quality: ['poor', 'Ok', 'perfect'],
    Length: ['short', 'perfect', 'long'],
    Fit: ['tight', 'perfect', 'long'],
  };
  return (
    <div className="p" style={{ marginTop: 10 }}>
      {
        arr.map((name) => {
          const value = Number(characteristics[name].value) * 60 - 5;
          return (
            <div key={name} style={{ marginBottom: 10 }}>
              <h5>{name}</h5>
              <div className="p_breakdown">
                <canvas width="100" height="7" className="bar" />
                <canvas width="90" height="7" style={{ marginLeft: 5 }} className="bar" />
                <canvas width="100" height="7" style={{ marginLeft: 5 }} className="bar" />
                <FontAwesomeIcon
                  icon={faCaretDown}
                  transform={`up-10 left-${value}`}
                />
              </div>
              <div className="text-container">
                {
                  obj[name].map((describe) => (
                    <span key={describe}>{describe}</span>
                  ))
                }
              </div>

            </div>
          );
        })
      }
    </div>
  );
}

// (
//   <div className="p">
//     <h5>This is product sidebar</h5>
//     <div className="p_breakdown">
//       <canvas width="100" height="7" className="bar" />
//       <canvas width="90" height="7" style={{ marginLeft: 5 }} className="bar" />
//       <canvas width="100" height="7" style={{ marginLeft: 5 }} className="bar" />
//       <i className="fa-solid fa-caret-down movebar" />
//     </div>
//   </div>
// );

ProductSideBar.propTypes = {
  metadata: PropTypes.instanceOf(Object).isRequired,
};

export default ProductSideBar;
