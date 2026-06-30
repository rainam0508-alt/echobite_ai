import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/auth.css'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { login, showToast } = useCart()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      showToast('Please fill in all fields')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match')
      return
    }
    login(formData.email, formData.password)
    showToast('✓ Account created successfully!')
    navigate('/')
  }

  return (
    <main className="auth-page">
      <div className="auth-box">
        <div className="cartoon-illustration">
          <i className="fas fa-user-plus"></i>
        </div>

        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
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
