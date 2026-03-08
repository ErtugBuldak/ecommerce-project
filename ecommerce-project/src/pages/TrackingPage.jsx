import { Link, useParams } from 'react-router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Header from '../components/Header'
import './TrackingPage.css'

function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    const fetchOrderData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    fetchOrderData();
  }, [orderId])


  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  })
  
  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  let isPreparing = false;
  let isShipped = false;
  let isDelivered = false;
  if (deliveryPercent > 100){
    deliveryPercent = 100;
    isDelivered = true;
  }else if (deliveryPercent < 33){
    isPreparing = true;
  }else{
    isShipped = true;
  }

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" data-testid="back-to-orders-link" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date" data-testid="delivery-date">
            {deliveryPercent < 100 ? "Arriving" : "Delivered"} on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info" data-testid="product-name">
            {orderProduct.product.name}
          </div>

          <div className="product-info" data-testid="product-quantity">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" data-testid="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container" data-testid="progress-labels-container">
            <div className={`progress-label ${isPreparing && "current-status"}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && "current-status"}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackingPage