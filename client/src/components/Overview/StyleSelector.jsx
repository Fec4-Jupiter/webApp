/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const PropTypes = require('prop-types');

function StyleSelector({ currentStyle, styles, changeStyle }) {
  const generateTable = (list) => {
    const items = [];
    for (let i = 0; i < list.length; i += 1) {
      const style = list[i];
      const thumb = style.photos[0].thumbnail_url;
      if (style.style_id === currentStyle.style_id) {
        items.push(
          <td key={style.style_id} onClick={() => changeStyle(style)}>
            <div className="selectedImageContainer">
              <img className="stylethumbnail selected" src={thumb} alt="" />
              <span className="checkmark">&#10003;</span>
            </div>
          </td>,
        );
      } else {
        items.push(
          <td key={style.style_id} onClick={() => changeStyle(style)}>
            <img className="stylethumbnail" src={thumb} alt="" />
          </td>,
        );
      }
    }
    const table = [];
    for (let i = 0; i < items.length; i += 4) {
      const row = items.slice(i, i + 4);
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };

  return (
    <div>
      <span className="currentstyle">{currentStyle.name}</span>
      <table>
        <tbody>
          {generateTable(styles)}
        </tbody>
      </table>
    </div>
  );
}

StyleSelector.propTypes = {
  currentStyle: PropTypes.instanceOf(Object).isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,
  changeStyle: PropTypes.instanceOf(Function).isRequired,
};

export default StyleSelector;
