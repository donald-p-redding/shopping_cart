import React from 'react'

const EditProductForm = ({ info, visible, toggle }) => {
  const { title, quantity, price } = info

  const classType = visible ? 'edit-form visible' : 'edit-form';

  return (
    <div className={classType}>
    <h3>Edit Product</h3>
      <form>
        <div class="input-group">
          <label for="product-name">Product Name</label>
          <input type="text" id="product-name" value={title} />
        </div>

        <div class="input-group">
          <label for="product-price">Price</label>
          <input type="text" id="product-price" value={price} />
        </div>

        <div class="input-group">
          <label for="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value={quantity} />
        </div>

        <div class="actions form-actions">
          <a className="button">Update</a>
          <a onClick={toggle} className="button">Cancel</a>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm;