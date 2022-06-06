import React from 'react'
import ProductForm from './ProductForm';

const Product = ({ info }) => {
  const { title, quantity, price } = info
  return (
    <div class="product">
      <div class="product-details">
        <h3>{title}</h3>
        <p class="price">{price}</p>
        <p class="quantity">{quantity} left in stock</p>
        <div class="actions product-actions">
          <a class="button add-to-cart">Add to Cart</a>
          <a class="button edit">Edit</a>
        </div>
        <a class="delete-button"><span>X</span></a>
      </div>

      <ProductForm info={info}/>
    </div>
  )
}

export default Product;