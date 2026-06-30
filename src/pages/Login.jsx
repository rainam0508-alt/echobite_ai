import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/auth.css'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { login, showToast } = useCart()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      showToast('Please fill in all fields')
      return
    }
    login(formData.email, formData.password)
    navigate('/')
  }

  return (
    <main className="auth-page">
      <div className="auth-box">
        <div className="cartoon-illustration">
          <i className="fas fa-face-smile"></i>
        </div>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        <div className="back-home-link">
          <Link to="/" className="back-home-btn">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
