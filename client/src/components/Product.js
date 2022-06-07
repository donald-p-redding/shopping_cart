import { React, useState } from 'react'
import EditProductForm from './EditProductForm';

const Product = ({ info }) => {
  const { title, quantity, price } = info;

  const [ visible, setVisible ] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <a className="button add-to-cart">Add to Cart</a>
          <a onClick={toggleVisibility} className="button edit">Edit</a>
        </div>
        <a className="delete-button"><span>X</span></a>
      </div>

      <EditProductForm info={info} visible={visible} toggle={toggleVisibility}/>
    </div>
  )
}

export default Product;