/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
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
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.props.search(this.state.searchStr);
    });
  }

  render() {
    return (
      <div>
        <div className="searchbar">
          <input
            id="searchbar"
            className="searchinput"
            type="text"
            name="searchStr"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  product: PropTypes.instanceOf(Object),
  questions: PropTypes.instanceOf(Object),
  search: PropTypes.instanceOf(Function),
};

Search.displayName = 'Search';
export default Search;
