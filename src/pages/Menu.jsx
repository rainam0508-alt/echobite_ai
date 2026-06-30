import { useState, useMemo } from 'react'
import FoodCard from '../components/FoodCard'
import { foodsData, categories } from '../data/foods'
import '../styles/menu.css'

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const filteredAndSorted = useMemo(() => {
    let items = foodsData

    // Filter by category
    if (selectedCategory !== 'All') {
      items = items.filter((food) => food.category === selectedCategory)
    }

    // Filter by search
    if (searchTerm) {
      items = items.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort
    if (sortBy === 'low-high') {
      items = [...items].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'high-low') {
      items = [...items].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    }

    return items
  }, [selectedCategory, searchTerm, sortBy])

  return (
    <main className="menu-page">
      <div className="menu-header">
        <h1>EchoBite AI Menu</h1>
        <p className="subtitle">Smart AI Food Ordering Experience</p>
      </div>

      {/* Search Bar */}
      <div className="menu-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="low-high">Price (Low to High)</option>
          <option value="high-low">Price (High to Low)</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className="food-grid">
          {filteredAndSorted.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No items found. Try different filters or search term.</p>
        </div>
      )}
    </main>
  )
}
