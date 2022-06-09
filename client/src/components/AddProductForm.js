import { React, useState } from 'react'
import { useDispatch } from 'react-redux';
import { productActions } from '../lib/reducers/productsReducer';

const AddProductForm = ({onAddProduct}) => {
  const dispatch = useDispatch()
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

  const handleAddProduct = async (newProduct) => {
    const newProdJSON = await fetch("/api/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    const contents = await newProdJSON.json()
    dispatch(productActions.createProductAdded(contents))
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
          <button className="button"
          onClick={(e) => {
            e.preventDefault() //make a handleClick func
            let newProd = {
              title: productName,
              price: Number(Number.parseFloat(productPrice).toFixed(2)),
              quantity: Number.parseInt(productQuantity, 10),
            }
            handleAddProduct(newProd)
            reset()
          }}>
            Add
          </button>
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