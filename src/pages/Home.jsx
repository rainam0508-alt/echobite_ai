import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import FoodCard from '../components/FoodCard'
import { foodsData, categories } from '../data/foods'
import '../styles/home.css'

export default function Home() {
  const bestSellers = foodsData.slice(0, 6)

  return (
    <main className="home-page">
      <HeroSlider />

      {/* Categories Section */}
      <section className="section">
        <h2 className="section-title">Categories</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            cat !== 'All' && (
              <Link key={cat} to="/menu" className="category-card">
                <div className="category-icon">🍽️</div>
                <h3>{cat}</h3>
              </Link>
            )
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="section">
        <h2 className="section-title">Best Sellers</h2>
        <div className="food-grid">
          {bestSellers.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <h2 className="section-title">About Us</h2>
        <div className="about-box">
          <h3>🍽️ Who We Are</h3>
          <p>
            EchoBite AI is a smart food ordering platform that uses artificial
            intelligence to make your food experience faster, easier and more
            delicious. Order with voice, browse our menu, and get your favorite
            food delivered!
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎙️</div>
            <h3>Voice Ordering</h3>
            <p>Order food with just your voice using AI technology</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery right to your door</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🥗</div>
            <h3>Fresh Food</h3>
            <p>Prepared with high-quality and fresh ingredients</p>
          </div>

          <div className="service-card">
            <div className="service-icon">⏰</div>
            <h3>24/7 Support</h3>
            <p>We are always here to help you anytime</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-box">
          <h3>Get In Touch</h3>
          <p>📞 +92 300 1234567</p>
          <p>📧 support@echobite.ai</p>
          <p>📍 Islamabad, Pakistan</p>
        </div>
      </section>
    </main>
  )
}
