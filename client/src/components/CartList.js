import React from 'react'
import CartEntry from './CartEntry';

const CartList = ({ cartItems }) => {

  const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <table className="cart-items">
      <tbody>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {cartItems.map(item => <CartEntry key={item._id} info={item} />)}
        <tr>
          <td colSpan="3" className="total">Total: {total}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CartList;