import axios from 'axios';
import { formatMoney } from '../../utils/money'
import dayjs from 'dayjs';

function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title" data-testid="delivery-options-title" >Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {

        const updateDeliveryOption = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`,{
            deliveryOptionId: deliveryOption.id
          });
          await loadCart();
        };

        return (
          <div key={deliveryOption.id} className="delivery-option" data-testid="delivery-option" onClick={updateDeliveryOption}>
            <input
              type="radio"
              checked={cartItem.deliveryOptionId === deliveryOption.id}
              onChange={() => {}}
              className="delivery-option-input"
              data-testid="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date" data-testid="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price" data-testid="delivery-option-price">
                {deliveryOption.priceCents
                  ? `${formatMoney(deliveryOption.priceCents)} -`
                  : "FREE"}{" "}
                Shipping
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeliveryOptions;