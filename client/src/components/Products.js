import React from 'react'
import Product from './Product'

const Products = ({ products, onDelete, onUpdate, onCartAdd }) => {
  return (
    <div class="product-listing">
        <h2>Products</h2>
        { products.map(prod => <Product key={prod._id} info={prod} onDelete={onDelete} onUpdate={onUpdate} onCartAdd={onCartAdd}/>)}
    </div>
  )
}

export default Products;