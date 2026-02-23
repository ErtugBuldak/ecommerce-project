import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";
import "./HomePage.css";

function HomePage({ cart }) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
    }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-fav  icon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}

export default HomePage;
