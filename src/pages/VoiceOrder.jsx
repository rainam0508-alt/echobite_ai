import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { foodsData } from '../data/foods'
import '../styles/voiceorder.css'

export default function VoiceOrder() {
  const { addToCart, showToast } = useCart()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [matchedItems, setMatchedItems] = useState([])
  const [language, setLanguage] = useState('en-US')
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true

      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcript)
            searchForItems(transcript)
          } else {
            interimTranscript += transcript
          }
        }
      }
    }
  }, [])

  const searchForItems = (query) => {
    const queryLower = query.toLowerCase()
    const matched = foodsData.filter((item) =>
      item.name.toLowerCase().includes(queryLower) ||
      item.category.toLowerCase().includes(queryLower)
    )
    setMatchedItems(matched.slice(0, 5))
  }

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      showToast('Voice recognition not supported in your browser')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      setTranscript('')
      setMatchedItems([])
      recognitionRef.current.lang = language
      recognitionRef.current.start()
    }
  }

  const handleAddItem = (item) => {
    addToCart(item)
    setTranscript('')
    setMatchedItems([])
  }

  const handleClearTranscript = () => {
    setTranscript('')
    setMatchedItems([])
  }

  return (
    <main className="voice-page">
      <Link to="/menu" className="back-link">
        <i className="fas fa-arrow-left"></i> Back to Menu
      </Link>

      <div className="voice-card">
        <div className="voice-header">
          <h1>
            <i className="fas fa-microphone-lines"></i> EchoBite Voice Order
          </h1>
          <p>Voice Order • Multi-Language Support</p>
        </div>

        {/* Microphone Button */}
        <div className="mic-container">
          <button
            className={`mic-button ${isListening ? 'listening' : ''}`}
            onClick={handleMicClick}
            title={isListening ? 'Click to stop recording' : 'Click to start recording'}
          >
            <i className={`fas fa-microphone${isListening ? '-slash' : ''}`}></i>
          </button>
        </div>

        {/* Status */}
        {isListening && (
          <div className="listening-status">
            <div className="pulse"></div>
            <p>Listening...</p>
          </div>
        )}

        {/* Language Selector */}
        <div className="language-selector">
          <button
            className={`lang-btn ${language === 'en-US' ? 'active' : ''}`}
            onClick={() => setLanguage('en-US')}
          >
            English
          </button>
          <button
            className={`lang-btn ${language === 'ur-PK' ? 'active' : ''}`}
            onClick={() => setLanguage('ur-PK')}
          >
            اردو
          </button>
        </div>

        {/* Transcript Box */}
        {transcript && (
          <div className="transcript-box">
            <label>You said:</label>
            <p className="transcript-text">{transcript}</p>
            <button className="clear-btn" onClick={handleClearTranscript}>
              Clear
            </button>
          </div>
        )}

        {/* Matched Items */}
        {matchedItems.length > 0 && (
          <div className="matched-items">
            <h3>Found Items:</h3>
            {matchedItems.map((item) => (
              <div key={item.id} className="matched-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="category">{item.category}</p>
                  <p className="price">Rs {item.price}</p>
                </div>
                <button
                  className="add-btn"
                  onClick={() => handleAddItem(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="voice-info">
          <h3>How to use Voice Order:</h3>
          <ol>
            <li>Click the microphone button to start recording</li>
            <li>Say the name of the food item you want (e.g., "Zinger Burger")</li>
            <li>Click the item from the results to add to cart</li>
            <li>Continue ordering or proceed to checkout</li>
          </ol>
        </div>

        <Link to="/menu" className="back-btn">
          <i className="fas fa-arrow-left"></i> Back to Menu
        </Link>
      </div>
    </main>
  )
}
