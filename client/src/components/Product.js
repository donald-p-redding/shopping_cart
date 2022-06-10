import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EditProductForm from './EditProductForm';
import { cartActions } from '../lib/reducers/cartReducer';
import { productActions } from '../lib/reducers/productsReducer';
import { handleDeleteProduct } from '../features/productsSlice'
import { handleAddToCart } from '../features/cartSlice';

const Product = ({ info, onDelete, onUpdate }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state);
  const { title, quantity, price, _id } = info;

  const [ visible, setVisible ] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const itemInCart = (itemId) => {
    return !!cart.find(item => item._id === itemId)
  }


  return (
    <div className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button onClick={() => dispatch(handleAddToCart(_id))} className="button add-to-cart">Add to Cart</button>
          <button onClick={toggleVisibility} className="button edit">Edit</button>
        </div>
        <button className="delete-button" onClick={() => dispatch(handleDeleteProduct(_id))}><span>X</span></button>
      </div>

      <EditProductForm info={info} visible={visible} toggle={toggleVisibility} onUpdate={onUpdate}/>
    </div>
  )
}

export default Product;