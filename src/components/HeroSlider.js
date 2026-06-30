import React from 'react';
import '../styles/slider.css';

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=500&fit=crop",
      title: "Delicious Burgers",
      description: "Enjoy our mouth-watering collection of burgers"
    },
    {
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=500&fit=crop",
      title: "Amazing Pizzas",
      description: "Fresh pizzas made with premium ingredients"
    },
    {
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&h=500&fit=crop",
      title: "Tasty Pasta",
      description: "Authentic Italian pasta dishes"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slider">
      <div 
        className="slider-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
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
    </div>
  );
};

export default HeroSlider;
