import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import axios from 'axios'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import ErrorPage from './pages/ErrorPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get("http://localhost:3000/api/cart-items?expand=product");
      setCart(response.data);
    };
    fetchAppData();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={ cart } />} />
      <Route path="checkout" element={<CheckoutPage cart={ cart } />} />
      <Route path="orders" element={<OrdersPage cart={ cart } />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={ cart } />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
