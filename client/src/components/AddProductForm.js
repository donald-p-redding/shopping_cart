import { React, useState } from 'react'

const AddProductForm = () => {
  const [ visible, setVisible ] = useState(false)

  const classType = visible ? "add-form visible" : "add-form";

  const toggleVisibility = () => {
    console.log("click")
    setVisible(!visible)
  }



  return (
    <div className={classType}>
      <p><a onClick={toggleVisibility} class="button add-product-button">Add A Product</a></p>
      <h3>Add Product</h3>
      <form>
        <div class="input-group">
          <label for="product-name">Product Name</label>
          <input type="text" id="product-name" value="" />
        </div>

        <div class="input-group">
          <label for="product-price">Price</label>
          <input type="text" id="product-price" value="" />
        </div>

        <div class="input-group">
          <label for="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value="" />
        </div>

        <div class="actions form-actions">
          <a className="button">Add</a>
          <a onClick={toggleVisibility}s className="button">Cancel</a>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm;