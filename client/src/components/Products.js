import React from 'react'
import Product from './Product'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { retrieveProducts } from '../features/productsSlice'

const Products = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)



  useEffect(() => dispatch(retrieveProducts()), [dispatch])

  return (
    <div className="product-listing">
      <h2>Products</h2>
      {products.map(prod => <Product key={prod._id} info={prod} />)}
    </div>
  )
}

export default Products;