import React, { useEffect } from 'react'
import Product from './Product'
import { useContext, useReducer } from 'react'
import { ProductsContext } from '../context/productContext'
import { retrieveProducts } from '../context/productContext'

const Products = () => {
  const {products, dispatch} = useContext(ProductsContext)
  useEffect(() => {
    retrieveProducts(dispatch)
  }, [dispatch])
  
  return (
    <div class="product-listing">
        <h2>Products</h2>
        { products.map(prod => <Product key={prod._id} info={prod} />)}
    </div>
  )
}

export default Products;