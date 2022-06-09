import React from 'react'
import Product from './Product'
import { useSelector , useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { productActions } from '../lib/reducers/productsReducer'

const Products = ({ onDelete, onUpdate, onCartAdd }) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state)
  
  const retrieveProducts = async() => {
    const data = await fetch("/api/products")
    const parsedData = await data.json()
    dispatch(productActions.createProductsRecieved(parsedData))
  }

  const handleDeleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      dispatch(productActions.createProductDeleted(id))
    }
  }

  useEffect(() => retrieveProducts(), [dispatch])

  return (
    <div class="product-listing">
        <h2>Products</h2>
        { products.map(prod => <Product key={prod._id} info={prod} onDelete={handleDeleteProduct} onUpdate={onUpdate} onCartAdd={onCartAdd}/>)}
    </div>
  )
}

export default Products;