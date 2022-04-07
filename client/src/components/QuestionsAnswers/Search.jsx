/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStr: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleInputChange(event) {
    this.handleSearchInputChange(event.value);
    this.setState({
      searchStr: event.target.value,
    });
  }

  render() {
    return (
      <div className="searchbar">
        <input className="searchinput" type="text" value={this.state.searchStr} onChange={this.handleInputChange} />
        <button type="submit" className="searchbutton">
          <span className="searchIcon" />
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
};

export default Search;
