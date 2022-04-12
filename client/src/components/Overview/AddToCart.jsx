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
      invalidInput: false,
    };

    this.sizeList = this.sizeList.bind(this);
    this.quantityList = this.quantityList.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    const {
      availableSizes, currentSize, currentQuantity,
    } = this.state;
    if (!currentSize && !currentQuantity) {
      this.setState({
        availableSizes,
        currentSize,
        currentQuantity,
        invalidInput: true,
      });
    } else {
      const selectedSKU = availableSizes.filter((sku) => sku.size === currentSize)[0].sku;
      axios.post('/cart', {
        sku_id: selectedSKU,
        count: currentQuantity,
      });
      this.setState({
        availableSizes,
        currentSize,
        currentQuantity,
        invalidInput: false,
      });
    }
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
      invalidInput: false,
    });
  }

  changeQuantity(e) {
    const { availableSizes, currentSize, invalidInput } = this.state;
    const currentQuantity = e.value;
    this.setState({
      availableSizes,
      currentQuantity,
      currentSize,
      invalidInput,
    });
  }

  sizeList() {
    const { availableSizes, invalidInput, currentSize } = this.state;
    let list;
    if (availableSizes.length) {
      const options = availableSizes.map((sku) => ({ value: sku.size, label: sku.size }));
      if (currentSize) {
        const defaultVal = { value: currentSize, label: currentSize };
        list = <Select key={invalidInput} className="size-select" options={options} defaultMenuIsOpen={(invalidInput)} value={defaultVal} defaultValue={defaultVal} isFocused={(invalidInput)} isSearchable={false} onChange={this.changeSize} aria-label="size" />;
      } else {
        list = (
          <div className="size-select">
            {invalidInput ? <b className="invalid-input-err">Please select size</b> : ''}
            <Select key={invalidInput} options={options} defaultMenuIsOpen={(invalidInput)} placeholder="Select Size:" isFocused={(invalidInput)} isSearchable={false} onChange={this.changeSize} aria-label="size" />
          </div>
        );
      }
    } else {
      list = <Select className="size-select" isDisabled placeholder="OUT OF STOCK" aria-label="size" />;
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
      list = <Select key={currentSize || 'no size'} className="quantity-select" options={quantities} isSearchable={false} defaultValue={{ value: 1, label: 1 }} onChange={this.changeQuantity} aria-label="quantity" />;
    } else {
      list = <Select key={currentSize || 'no size'} isDisabled className="quantity-select" placeholder="-" aria-label="quantity" />;
    }

    return list;
  }

  render() {
    const { availableSizes } = this.state;
    return (
      <div className="add-to-cart right-column">
        {this.sizeList()}
        {this.quantityList()}
        {availableSizes.length ? <button type="button" className="cart-button" onClick={this.handleAdd}>Add to Cart</button> : ''}
      </div>
    );
  }
}

AddToCart.propTypes = {
  currentStyle: PropTypes.instanceOf(Object).isRequired,
};

export default AddToCart;
