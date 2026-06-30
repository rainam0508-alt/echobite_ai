import { useCart } from '../context/CartContext'
import '../styles/foodcard.css'

export default function FoodCard({ food }) {
  const { addToCart } = useCart()

  return (
    <div className="food-card">
      <div className="food-image">
        <img src={food.image} alt={food.name} />
        <span className="category-badge">{food.category}</span>
      </div>
      <div className="food-info">
        <h3>{food.name}</h3>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fas fa-star ${i < food.rating ? 'filled' : ''}`}
            ></i>
          ))}
        </div>
        <div className="food-footer">
          <span className="price">Rs {food.price}</span>
          <button
            className="add-btn"
            onClick={() => addToCart(food)}
          >
            <i className="fas fa-shopping-cart"></i> Add
          </button>
        </div>
      </div>
    </div>
  )
}
