import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/admin.css'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const dashboardStats = [
    { label: 'Total Orders', value: '1,234', icon: '📦' },
    { label: 'Revenue', value: 'Rs 45,890', icon: '💰' },
    { label: 'Users', value: '892', icon: '👥' },
    { label: 'Products', value: '27', icon: '🍽️' },
  ]

  const recentOrders = [
    { id: 1, customer: 'Ahmed Ali', total: 'Rs 1,200', status: 'Delivered' },
    { id: 2, customer: 'Fatima Khan', total: 'Rs 890', status: 'Processing' },
    { id: 3, customer: 'Hassan Raza', total: 'Rs 1,450', status: 'Pending' },
  ]

  return (
    <main className="admin-page">
      <div className="admin-header">
        <h1>🛠️ Admin Dashboard</h1>
        <Link to="/" className="back-btn">
          Back to Home
        </Link>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      <div className="admin-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            {dashboardStats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.label}</h3>
                <p className="stat-value">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="table-container">
            <h2>Recent Orders</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.total}</td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="table-container">
            <h2>Products Management</h2>
            <p>Products management interface would go here.</p>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="table-container">
            <h2>Users Management</h2>
            <p>Users management interface would go here.</p>
          </div>
        )}
      </div>
    </main>
  )
}
