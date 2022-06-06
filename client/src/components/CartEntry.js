import React from 'react'

const CartEntry = ({ info }) => {
  const { title, quantity, price } = info
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </tr>
  )
}

export default CartEntry;