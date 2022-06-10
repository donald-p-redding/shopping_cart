import React from 'react'
import Product from './Product'
import { useSelector , useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { productActions } from '../lib/reducers/productsReducer'
import { retrieveProducts } from '../features/productsSlice'

const Products = () => {
  const dispatch = useDispatch()
  const  products = useSelector((state) => state.products)
  
  const handleDeleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      dispatch(productActions.createProductDeleted(id))
    }
  }



  useEffect(() => dispatch(retrieveProducts()), [dispatch])

  return (
    <div class="product-listing">
        <h2>Products</h2>
        { products.map(prod => <Product key={prod._id} info={prod} onDelete={handleDeleteProduct} />)}
    </div>
  )
}

export default Products;