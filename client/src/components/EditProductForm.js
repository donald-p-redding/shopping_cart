import {React, useState} from 'react'
import { useDispatch } from 'react-redux'
import  { handleUpdateProduct } from "../features/productsSlice"; 

const EditProductForm = ({ info, visible, toggle }) => {
  const { title, quantity, price, _id } = info

  const dispatch = useDispatch();

  const [productInfo, setProductInfo] = useState({title, quantity, price})
  
  const titleChange = (e) => {
    setProductInfo(
      {...productInfo,
      title: e.target.value}
    )
  }

  const quantityChange = (e) => {
    setProductInfo(
      {...productInfo,
      quantity: e.target.value}
    )
  }

  const priceChange = (e) => {
    setProductInfo(
      {...productInfo,
      price: e.target.value}
    )
  }

  
  const classType = visible ? 'edit-form visible' : 'edit-form';

  return (
    <div className={classType}>
    <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input type="text" id="product-name" value={productInfo.title} onChange={titleChange}/>
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input type="text" id="product-price" value={productInfo.price} onChange={priceChange}/>
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value={productInfo.quantity} onChange={quantityChange}/>
        </div>

        <div className="actions form-actions">
          <button 
          className="button"
          onClick={(e) => {
            e.preventDefault() //extract to a helper
            let updatedProd = {
              title: productInfo.title,
              price: Number(Number.parseFloat(productInfo.price).toFixed(2)),
              quantity: Number.parseInt(productInfo.quantity, 10),
            }
            dispatch(handleUpdateProduct({ id: _id, productInfo: updatedProd }))
            toggle()
          }}>
            Update
            </button>
          <button onClick={(e)=> {
            e.preventDefault()
            toggle()
          }} className="button">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm;