import { useState, useEffect } from "react";
import axios from "axios";
import OrdersGrid from "./OrdersGrid";
import Header from '../../components/Header'
import './OrdersPage.css'

function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      const response = await axios.get('http://localhost:3000/api/orders?expand=products');
      setOrders(response.data);
    }

    getOrderData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}

export default OrdersPage