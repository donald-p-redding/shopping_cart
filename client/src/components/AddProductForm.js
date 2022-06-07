import { React, useState } from 'react'

const AddProductForm = () => {
  const [ visible, setVisible ] = useState(false)

  const classType = visible ? "add-form visible" : "add-form";

  const toggleVisibility = () => {
    console.log("click")
    setVisible(!visible)
  }

  const reset = () => {
    setProductName("");
    setProductPrice("");
    setProductQuantity("")
  }

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");



  return (
    <div className={classType}>
      <p><a onClick={toggleVisibility} class="button add-product-button">Add A Product</a></p>
      <h3>Add Product</h3>
      <form>
        <div class="input-group">
          <label for="product-name">Product Name</label>
          <input type="text" id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)}/>
        </div>

        <div class="input-group">
          <label for="product-price">Price</label>
          <input type="text" id="product-price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
        </div>

        <div class="input-group">
          <label for="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)}/>
        </div>

        <div class="actions form-actions">
          <a className="button">Add</a>
          <button 
          onClick={(e) => {
            e.preventDefault()
            reset()
            toggleVisibility()
          }}
          className="button">
            Cancel
            </button>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm;