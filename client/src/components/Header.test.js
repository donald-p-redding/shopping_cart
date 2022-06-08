import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from "./Header"

describe("<Header />", () => {
  it("header renders", () => {
    render(<Header cart={[]}/>)
    const topHeading = screen.getByRole("heading", {level:1})
    expect(topHeading).toBeInTheDocument()
  })

  it("checkout button triggers a callback", () => {
    let fnc = jest.fn();
    render(<Header cart={[]} onCheckout={fnc}/>);
    const checkoutBtn = screen.getByRole("button", {name: "Checkout"});
    userEvent.click(checkoutBtn);
    expect(fnc.mock.calls.length).toBe(1);
  })
})