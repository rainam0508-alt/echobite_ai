import { useState, useEffect } from 'react'
import '../styles/heroslider.css'

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    {
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      title: 'Order Food With AI Voice',
      subtitle: 'Fast, smart and seamless food ordering experience',
    },
    {
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
      title: 'Amazing Pizzas',
      subtitle: 'Crispy pizzas with premium toppings',
    },
    {
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
      title: 'Tasty Snacks',
      subtitle: 'Crunchy and delicious snacks',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero-slider">
      <div
        className="slider-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-btn prev" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider-btn next" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </section>
  )
}
