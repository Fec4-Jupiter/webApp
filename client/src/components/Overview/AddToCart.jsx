/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';

const PropTypes = require('prop-types');

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    const { currentStyle } = props;
    const availableSizes = [];
    Object.keys(currentStyle.skus).forEach((sku) => {
      if (currentStyle.skus[sku].quantity > 0) {
        const { size } = currentStyle.skus[sku];
        const { quantity } = currentStyle.skus[sku];
        availableSizes.push({ sku, size, quantity });
      }
    });

    this.state = {
      availableSizes,
      currentSize: null,
      currentQuantity: null,
    };

    this.sizeList = this.sizeList.bind(this);
    this.quantityList = this.quantityList.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    const { availableSizes, currentSize, currentQuantity } = this.state;
    const selectedSKU = availableSizes.filter((sku) => sku.size === currentSize)[0].sku;
    axios.post('/cart', {
      sku_id: selectedSKU,
      count: currentQuantity,
    });
  }

  changeSize(e) {
    const { availableSizes } = this.state;
    let { currentQuantity } = this.state;
    currentQuantity = currentQuantity || '1';
    const currentSize = e.target.value;
    this.setState({
      availableSizes,
      currentQuantity,
      currentSize,
    });
  }

  changeQuantity(e) {
    const { availableSizes, currentSize } = this.state;
    const currentQuantity = e.target.value;
    this.setState({
      availableSizes,
      currentQuantity,
      currentSize,
    });
  }

  sizeList() {
    const { availableSizes } = this.state;
    let list;
    if (availableSizes.length) {
      list = (
        <div>
          <label htmlFor="size">Select Size:</label>
          <select
            id="size"
            name="size"
            defaultValue=""
            onChange={this.changeSize}
            required
            onInvalid={(e) => {
              e.target.setCustomValidity('Please select size');
            }}
          >
            <option value="" disabled hidden>Select a Size</option>
            {availableSizes.map(
              (sku) => <option key={sku.sku} value={sku.size}>{sku.size}</option>,
            )}
          </select>
        </div>
      );
    } else {
      list = (
        <div>
          <label htmlFor="size">Select Size:</label>
          <select disabled name="size">
            <option name="OUT OF STOCK">OUT OF STOCK</option>
          </select>
        </div>
      );
    }

    return list;
  }

  quantityList() {
    const { availableSizes, currentSize } = this.state;

    let list;
    if (currentSize) {
      const availableQ = availableSizes.filter((sku) => sku.size === currentSize)[0].quantity;
      const quantities = [];
      for (let i = 1; i <= availableQ && i <= 15; i += 1) {
        quantities.push(<option key={i} value={i}>{i}</option>);
      }
      list = (
        <div>
          <label htmlFor="quantity">Select Quantity:</label>
          <select id="quantity" name="quantity" defaultValue="1" onChange={this.changeQuantity}>
            {quantities}
          </select>
        </div>
      );
    } else {
      list = (
        <div>
          <label htmlFor="quantity">Select Quantity:</label>
          <select disabled name="quantity">
            <option>-</option>
          </select>
        </div>
      );
    }

    return list;
  }

  render() {
    const { availableSizes } = this.state;
    return (
      <div className="addtocart">
        <form onSubmit={this.handleAdd}>
          {this.sizeList()}
          {this.quantityList()}
          {availableSizes.length ? <input type="submit" value="Add to Cart" /> : ''}
        </form>
      </div>
    );
  }
}

AddToCart.propTypes = {
  currentStyle: PropTypes.instanceOf(Object).isRequired,
};

export default AddToCart;
