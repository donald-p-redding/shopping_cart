import Header from "./Header"
import Products from "./Products"
import AddProductForm from "./AddProductForm";

const App = () => {
  return (
    <div id="app">
      <Header />
      <main>
        <Products />
        <AddProductForm/>
      </main>
    </div>
  );
};

export default App;
