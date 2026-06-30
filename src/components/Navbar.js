import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { getTotalItems, user, logout } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Echo<span>Bite</span>
        </Link>

        <button 
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          {user && <span className="user-name">👤 {user.name}</span>}
        </div>

        <div className="nav-right">
          <Link to="/cart" className="cart-btn">
            <i className="fas fa-shopping-cart"></i>
            {getTotalItems() > 0 && <span className="cart-count">{getTotalItems()}</span>}
          </Link>
          {user ? (
            <button className="logout-btn" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn">
              <i className="fas fa-user"></i> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
