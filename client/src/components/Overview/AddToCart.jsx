/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import Select from 'react-select';

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
    const currentSize = e.value;
    this.setState({
      availableSizes,
      currentQuantity,
      currentSize,
    });
  }

  changeQuantity(e) {
    const { availableSizes, currentSize } = this.state;
    const currentQuantity = e.value;
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
      const options = availableSizes.map((sku) => ({ value: sku.size, label: sku.size }));
      list = <Select options={options} isSearchable={false} placeholder="Select Size:" onChange={this.changeSize} aria-label="size" />;
    } else {
      list = <Select isDisabled placeholder="OUT OF STOCK" aria-label="size" />;
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
        quantities.push({ value: i, label: i });
      }
      list = <Select options={quantities} isSearchable={false} defaultValue={{ value: 1, label: 1 }} onChange={this.changeQuantity} aria-label="quantity" />;
    } else {
      list = <Select isDisabled placeholder="-" aria-label="quantity" />;
    }

    return list;
  }

  render() {
    const { availableSizes } = this.state;
    return (
      <div className="add-to-cart right-column">
        <form className="add-to-cart-form" onSubmit={this.handleAdd}>
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
