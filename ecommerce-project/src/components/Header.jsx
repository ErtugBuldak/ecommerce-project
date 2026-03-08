import { NavLink, useNavigate, useSearchParams } from 'react-router'
import { useState } from 'react'
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import './Header.css'

function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search')
  const [searchText, setSearchText] = useState(search || '');

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section" onClick={() => {setSearchText('')}}>
        <NavLink to="/" className="header-link">
          <img className="logo"
            data-testid="header-logo"
            src={ LogoWhite } />
          <img className="mobile-logo"
            data-testid="header-mobile-logo"
            src={ MobileLogoWhite } />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" data-testid="search-bar" type="text" placeholder="Search" value={searchText} onChange={(event) => {setSearchText(event.target.value)}} />

        <button className="search-button" data-testid="search-button" onClick={() => {navigate(`/?search=${searchText}`)}}>
          <img className="search-icon" src={ SearchIcon } />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" data-testid="orders-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" data-testid="cart-link" to="/checkout">
          <img className="cart-icon" src={ CartIcon } />
          <div className="cart-quantity">{ totalQuantity }</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header