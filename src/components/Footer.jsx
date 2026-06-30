import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h3>About EchoBite AI</h3>
          <p>Smart food ordering with voice recognition technology for a seamless dining experience.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/voice-order">Voice Order</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📧 info@echobite.com</p>
          <p>📱 +92 300 1234567</p>
          <p>📍 Islamabad, Pakistan</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 EchoBite AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
