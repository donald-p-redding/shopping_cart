import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import CartList from './CartList'

describe("<CartList />", () => {
  it("total should be 0 when cart is empty", () => {
    render (<CartList cartItems={[]}/>)
    const totalData  = screen.getByRole("cell", {name: /Total/})
    expect(totalData.innerHTML).toBe("Total: 0");
  })

  it("total = price * qty when cart has an item", () => {
    const item = {
      id: 1,
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 10
    }
    render (<CartList cartItems={[item]}/>)
    const totalData  = screen.getByRole("cell", {name: /Total/})
    expect(totalData.innerHTML).toBe("Total: 50");
  })
})