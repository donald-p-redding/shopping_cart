import { React, useContext, useState } from 'react'
import EditProductForm from './EditProductForm';
import { handleDeleteProduct, ProductsContext } from '../context/productContext';
import { CartContext, handleAddToCart } from '../context/cartContext';

const Product = ({ info}) => {
  const {dispatch} = useContext(ProductsContext)
  const { cartDispatch} = useContext(CartContext)
  const { title, quantity, price, _id } = info;

  const [ visible, setVisible ] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleClick = (e) => {
    e.preventDefault();
    handleAddToCart(cartDispatch, _id, dispatch)
  }

  return (
    <div className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button onClick={handleClick} className="button add-to-cart">Add to Cart</button>
          <button onClick={toggleVisibility} className="button edit">Edit</button>
        </div>
        <button className="delete-button" onClick={() => handleDeleteProduct(dispatch, _id)}><span>X</span></button>
      </div>

      <EditProductForm info={info} visible={visible} toggle={toggleVisibility} />
    </div>
  )
}

export default Product;