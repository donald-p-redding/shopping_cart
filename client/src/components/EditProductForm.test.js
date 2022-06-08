import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditProductForm from './EditProductForm'


describe("<EditProductForm />", () => {
    let fnc;
    beforeEach(() => {
      const product =   {
        id: 1,
        title: "Amazon Kindle E-reader",
        quantity: 5,
        price: 79.99
      }
      fnc = jest.fn()
      render(<EditProductForm info={product} onUpdate={fnc} toggle={() => {}}/>)
    })

    it("should initially render", () => {
      const formHeading = screen.getByRole("heading", {level: 3})
      expect(formHeading).toBeInTheDocument();
    });

    it("title field changes with user input", () => {
      const titleField = screen.getByRole("textbox", {name: "Product Name"})
      userEvent.type(titleField, 'II')
      expect(titleField).toHaveValue("Amazon Kindle E-readerII")
    })

    it("price field changes with user input", () => {
      const priceField = screen.getByRole("textbox", {name: "Price"})
      userEvent.type(priceField, "{backspace}")
      expect(priceField).toHaveValue("79.9")
    })

    it("quantity field changes with user input", () => {
      const quantityField = screen.getByRole("textbox", {name: "Quantity"})
      userEvent.type(quantityField, "4")
      expect(quantityField).toHaveValue("54")
    })

    it("update button triggers a callback on click", () => {
      const updateButton = screen.getByRole("button", {name: "Update"})
      userEvent.click(updateButton);
      expect(fnc.mock.calls.length).toBe(1)      
    })
  }
) 

