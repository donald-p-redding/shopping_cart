import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditProductForm from './EditProductForm'


describe("<EditProductForm />", () => {

    beforeEach(() => {
      const product =   {
        id: 1,
        title: "Amazon Kindle E-reader",
        quantity: 5,
        price: 79.99
      }
      render(<EditProductForm info={product}/>)
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
  }
) 

