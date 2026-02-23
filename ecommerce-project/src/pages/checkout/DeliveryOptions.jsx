import { formatMoney } from '../../utils/money'
import dayjs from 'dayjs';

function DeliveryOptions({ deliveryOptions, cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              checked={cartItem.deliveryOptionId === deliveryOption.id}
              className="delivery-option-input"
              name={`delivery-option-${deliveryOption.id}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price">
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