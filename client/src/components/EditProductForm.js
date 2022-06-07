import {React, useState} from 'react'

const EditProductForm = ({ info, visible, toggle }) => {
  const { title, quantity, price, _id } = info

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
        <div class="input-group">
          <label for="product-name">Product Name</label>
          <input type="text" id="product-name" value={productInfo.title} onChange={titleChange}/>
        </div>

        <div class="input-group">
          <label for="product-price">Price</label>
          <input type="text" id="product-price" value={productInfo.price} onChange={priceChange}/>
        </div>

        <div class="input-group">
          <label for="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value={productInfo.quantity} onChange={quantityChange}/>
        </div>

        <div class="actions form-actions">
          <button 
          className="button"
          onClick={(e) => {
            e.preventDefault()
            console.log('updating info')
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