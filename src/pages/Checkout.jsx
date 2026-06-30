import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/checkout.css'

export default function Checkout() {
  const { cart, getTotalPrice, clearCart, showToast } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    deliveryType: 'home',
    paymentMethod: 'cash',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.address) {
      showToast('Please fill in all required fields')
      return
    }
    showToast(
      `✅ Order placed! Total: Rs${getTotalPrice()}. Thank you for your order!`
    )
    clearCart()
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-message">
          <h2>Your cart is empty</h2>
          <Link to="/menu">Back to Menu</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map((item, idx) => (
              <div key={idx} className="summary-item">
                <span>{item.name}</span>
                <span>
                  Rs {item.price} x {item.qty || 1}
                </span>
                <span>Rs {item.price * (item.qty || 1)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total: Rs {getTotalPrice()}</strong>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="checkout-form-container">
          <h2>Delivery Details</h2>
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+92 300 1234567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Street, Building, Apartment number..."
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Islamabad"
              />
            </div>

            <div className="form-group">
              <label>Delivery Type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="deliveryType"
                    value="home"
                    checked={formData.deliveryType === 'home'}
                    onChange={handleChange}
                  />
                  Home Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={formData.deliveryType === 'pickup'}
                    onChange={handleChange}
                  />
                  Pickup
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  Credit Card
                </label>
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
