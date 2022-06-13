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
  return (
    <div id="app">
      <Header />
      <main>
        <Products/>
        <AddProductForm />
      </main>
    </div>
  );
};

export default App;
