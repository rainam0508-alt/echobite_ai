import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import '../styles/toast.css'

export default function Toast() {
  const { toast } = useCart()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (toast.visible) {
      setShow(true)
      const timer = setTimeout(() => setShow(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [toast.visible])

  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      {toast.message}
    </div>
  )
}
