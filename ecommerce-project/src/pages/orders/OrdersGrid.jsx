import OrderHeader from './OrderHeader';
import OrderDetailsGrid from './OrderDetailsGrid';

function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div className="order-container">
            <OrderHeader key={order.id + "h"} order={order} />

            <OrderDetailsGrid key={order.id + "g"} order={order} />
          </div>
        );
      })}
    </div>
  );
}

export default OrdersGrid