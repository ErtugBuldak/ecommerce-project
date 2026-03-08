import { Link } from 'react-router'
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png'
import Logo from '../../assets/images/logo.png'
import MobileLogo from '../../assets/images/mobile-logo.png'
import './CheckoutHeader.css';

function CheckoutHeader({ cart }) {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/" data-testid="checkout-header-logo-link">
            <img className="logo" data-testid="checkout-header-logo" src={ Logo } />
            <img className="mobile-logo" data-testid="checkout-header-mobile-logo" src={ MobileLogo } />
          </Link>
        </div>

        <div className="checkout-header-middle-section" data-testid="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link" data-testid="checkout-header-link"
            to="/">{totalQuantity} Item{totalQuantity > 1 && "s"}</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img data-testid="checkout-lock-icon" src={ CheckoutLockIcon } />
        </div>
      </div>
    </div>
  )
}

export default CheckoutHeader