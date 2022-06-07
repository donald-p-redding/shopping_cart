import { React, useState, useEffect } from "react";
import Header from "./Header"
import Products from "./Products"
import AddProductForm from "./AddProductForm";
import data from '../lib/data'

/*
  06/07/2022
  Too much logic in the component. We need to extract DB/API interactions
  to a services directory and import.
*/

const App = () => {
  const [ products, setProducts ] = useState([])
  const [ cart, setCart ] = useState([])

  const notInCart = (id) => {
    return !cart.find(cartItem => cartItem._id === id)
  }

  const handleAddProduct = async (newProduct, callback) => {
    console.log(newProduct)
    const newProdJSON = await fetch("/api/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    const contents = await newProdJSON.json()
    setProducts(products.concat(contents))
    console.log(callback)
    if (callback) {
      callback()
    }
  }

  const retrieveProducts = async() => {
    const data = await fetch("/api/products")
    const parsedData = await data.json()
    setProducts(parsedData)
  }

  const populateCart = async() => {
    const res = await fetch("/api/cart");
    const cartData = await res.json()
    setCart(cartData)
  }

  const handleDeleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id))
    }
  }

  const handleUpdateProduct = async (id, productInfo) => {
    const updatedProduct = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productInfo)
    })
    const newData = await updatedProduct.json()
    setProducts(products.map((p) => {
      if (p._id === id) {
        return newData
      }
      return p
    }))
  }

  const handleCartAdd = async (productId) => {
    const resp = await fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productId})
    });

    const { product:updatedProduct, item:newCartItem } = await resp.json();

    setProducts(products.map(prod => {
      if(prod._id === updatedProduct._id) {
        return updatedProduct
      }
      return prod
    }));

    if(notInCart(newCartItem._id)) {
      setCart([...cart, newCartItem]);
    } else {
      setCart(cart.map(item => {
        if(item._id === newCartItem._id) {
          return newCartItem
        }
        return item;
      }));
    }
  }

  useEffect(() => {
    retrieveProducts()
    populateCart()
  }, [])

  return (
    <div id="app">
      <Header cart={cart}/>
      <main>
        <Products products={products} onDelete={handleDeleteProduct} onUpdate={handleUpdateProduct} onCartAdd={handleCartAdd}/>
        <AddProductForm onAddProduct={handleAddProduct}/>
      </main>
    </div>
  );
};

export default App;
