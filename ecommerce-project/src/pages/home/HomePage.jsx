import axios from "axios";
import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";
import "./HomePage.css";

function HomePage({ cart, loadCart }) {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get(`/api/products${search ? `?search=${search}` : ''}`);
      setProducts(response.data);
    };
    getHomeData();
    }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-fav  icon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;
