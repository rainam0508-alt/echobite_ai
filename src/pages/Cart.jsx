import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/cart.css'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items from our menu!</p>
            <Link to="/menu" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-price">Rs {item.price}</p>
                  </div>

                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, (item.qty || 1) - 1)}>
                      −
                    </button>
                    <span>{item.qty || 1}</span>
                    <button onClick={() => updateQuantity(item.id, (item.qty || 1) + 1)}>
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    Rs {item.price * (item.qty || 1)}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>Rs {getTotalPrice()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>Rs {getTotalPrice()}</span>
              </div>

              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
              <Link to="/menu" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
