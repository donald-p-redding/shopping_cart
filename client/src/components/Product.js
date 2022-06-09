import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EditProductForm from './EditProductForm';
import { cartActions } from '../lib/reducers/cartReducer';
import { productActions } from '../lib/reducers/productsReducer';

const Product = ({ info, onDelete, onUpdate }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state);
  const { title, quantity, price, _id } = info;

  const [ visible, setVisible ] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const itemInCart = (itemId) => {
    return !!cart.find(item => item._id === itemId)
  }

  const addToCart = async (e) => {
    e.preventDefault();
    const resp = await fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productId: _id})
    });

    const { product:updatedProduct, item:newCartItem } = await resp.json();

    dispatch(productActions.createProductUpdated(updatedProduct))

    const inCart = itemInCart(newCartItem._id)

    dispatch(cartActions.createItemAddedCart({ data: newCartItem, inCart }))
  }

  return (
    <div className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button onClick={addToCart} className="button add-to-cart">Add to Cart</button>
          <button onClick={toggleVisibility} className="button edit">Edit</button>
        </div>
        <button className="delete-button" onClick={() => onDelete(_id)}><span>X</span></button>
      </div>

      <EditProductForm info={info} visible={visible} toggle={toggleVisibility} onUpdate={onUpdate}/>
    </div>
  )
}

export default Product;