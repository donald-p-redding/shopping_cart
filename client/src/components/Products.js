import React from 'react'
import Product from './Product'

const Products = ({ products }) => {
  return (
    <div class="product-listing">
        <h2>Products</h2>
        { products.map(prod => <Product key={prod.id} info={prod} />)}
    </div>
  )
}

export default Products;