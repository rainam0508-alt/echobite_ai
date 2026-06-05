// =====================
// FOOD ITEMS (32)
// =====================

const foods = [
  // BURGERS
  {
    name: "Zinger Burger",
    category: "Burger",
    price: 450,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
  },
  {
    name: "Chicken Burger",
    category: "Burger",
    price: 420,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500"
  },
  {
    name: "Cheese Burger",
    category: "Burger",
    price: 500,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500"
  },
  {
    name: "Beef Burger",
    category: "Burger",
    price: 550,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
  },
  {
    name: "Double Patty Burger",
    category: "Burger",
    price: 650,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500"
  },
  {
    name: "BBQ Burger",
    category: "Burger",
    price: 480,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500"
  },

  // PIZZA
  {
    name: "Chicken Pizza",
    category: "Pizza",
    price: 900,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
  },
  {
    name: "Cheese Pizza",
    category: "Pizza",
    price: 850,
    image: "https://images.unsplash.com/photo-1548365328-9f547fb0953f?w=500"
  },
  {
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 950,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500"
  },
  {
    name: "Veg Pizza",
    category: "Pizza",
    price: 780,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500"
  },
  {
    name: "Chicken Fajita Pizza",
    category: "Pizza",
    price: 980,
    image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=500"
  },
  {
    name: "Tikka Pizza",
    category: "Pizza",
    price: 920,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500"
  },

  // PASTA
  {
    name: "White Sauce Pasta",
    category: "Pasta",
    price: 600,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500"
  },
  {
    name: "Red Sauce Pasta",
    category: "Pasta",
    price: 580,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500"
  },
  {
    name: "Chicken Alfredo Pasta",
    category: "Pasta",
    price: 650,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500"
  },
  {
    name: "Creamy Pasta",
    category: "Pasta",
    price: 620,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500"
  },
  {
    name: "Macaroni Pasta",
    category: "Pasta",
    price: 550,
    image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=500"
  },

  // DRINKS
  {
    name: "Cold Drink",
    category: "Drink",
    price: 150,
    image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=500"
  },
  {
    name: "Mint Margarita",
    category: "Drink",
    price: 220,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?w=500"
  },
  {
    name: "Cold Coffee",
    category: "Drink",
    price: 280,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
  },
  {
    name: "Chocolate Shake",
    category: "Drink",
    price: 320,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500"
  },
  {
    name: "Orange Juice",
    category: "Drink",
    price: 250,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500"
  },

  // DESSERTS
  {
    name: "Chocolate Cake",
    category: "Dessert",
    price: 350,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
  },
  {
    name: "Brownie",
    category: "Dessert",
    price: 300,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500"
  },
  {
    name: "Ice Cream",
    category: "Dessert",
    price: 200,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
  },
  {
    name: "Donut",
    category: "Dessert",
    price: 180,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500"
  },
  {
    name: "Cheesecake",
    category: "Dessert",
    price: 420,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500"
  }
];

// =====================
// MENU RENDER
// =====================

const foodGrid = document.getElementById("foodGrid");
const searchInput = document.getElementById("searchInput");
const sortPrice = document.getElementById("sortPrice");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

let cart = [];

// =====================
// DISPLAY FOODS
// =====================

function displayFoods(items){
  foodGrid.innerHTML = "";

  items.forEach(food => {
    foodGrid.innerHTML += `
      <div class="food-card">
        <img src="${food.image}" alt="${food.name}">
        <h3>${food.name}</h3>
        <p class="category">${food.category}</p>
        <p class="price">Rs ${food.price}</p>
        <button class="add-btn" onclick="addToCart('${food.name}', ${food.price})">
          Add To Cart
        </button>
      </div>
    `;
  });
}

displayFoods(foods);

// =====================
// SEARCH (UPDATED + FIX)
// =====================

// SEARCH BAR FUNCTION (FIXED)

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

let searchValue =
searchInput.value.toLowerCase();

const productCards =
document.querySelectorAll(".product-card");

productCards.forEach(card => {

let productName =
card.querySelector("h3")
.innerText.toLowerCase();

if(productName.includes(searchValue)){

card.style.display = "block";

}
else{

card.style.display = "none";

}

});

});
// =====================
// CATEGORY FILTER
// =====================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
  btn.addEventListener("click", function(){

    filterButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    const category = this.dataset.category;

    if(category === "All"){
      displayFoods(foods);
    } else {
      const filtered = foods.filter(food => food.category === category);
      displayFoods(filtered);
    }

  });
});

// =====================
// SORT PRICE
// =====================

sortPrice.addEventListener("change", function(){

  let sortedFoods = [...foods];

  if(this.value === "low-high"){
    sortedFoods.sort((a,b) => a.price - b.price);
  }

  if(this.value === "high-low"){
    sortedFoods.sort((a,b) => b.price - a.price);
  }

  displayFoods(sortedFoods);
});

// =====================
// CART SYSTEM
// =====================

function addToCart(name, price){
  cart.push({ name, price });
  updateCart();
}

function updateCart(){
  cartItems.innerHTML = "";

  cart.forEach(item => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.name}</p>
        <p>Rs ${item.price}</p>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
}

// =====================
// CART OPEN/CLOSE
// =====================

cartBtn.addEventListener("click", function(){
  cartSidebar.classList.add("show-cart");
});

closeCart.addEventListener("click", function(){
  cartSidebar.classList.remove("show-cart");
});
// ========== FOOD DATA (32 items) ==========
const foods = [
    { id: 1, name: "Zinger Burger", category: "Burger", price: 450, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop", rating: 5 },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 350, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=250&fit=crop", rating: 5 },
    { id: 3, name: "Cheese Burger", category: "Burger", price: 400, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=250&fit=crop", rating: 4 },
    { id: 4, name: "Double Cheeseburger", category: "Burger", price: 550, image: "https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?w=400&h=250&fit=crop", rating: 5 },
    { id: 5, name: "Beef Burger", category: "Burger", price: 500, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=250&fit=crop", rating: 4 },
    { id: 6, name: "Veg Pizza", category: "Pizza", price: 550, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop", rating: 5 },
    { id: 7, name: "Pepperoni Pizza", category: "Pizza", price: 650, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=250&fit=crop", rating: 5 },
    { id: 8, name: "Chicken Tikka Pizza", category: "Pizza", price: 750, image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=250&fit=crop", rating: 5 },
    { id: 9, name: "Cheese Pizza", category: "Pizza", price: 500, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=250&fit=crop", rating: 4 },
    { id: 10, name: "White Sauce Pasta", category: "Pasta", price: 480, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=250&fit=crop", rating: 4 },
    { id: 11, name: "Red Sauce Pasta", category: "Pasta", price: 450, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=250&fit=crop", rating: 4 },
    { id: 12, name: "Chicken Alfredo", category: "Pasta", price: 580, image: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?w=400&h=250&fit=crop", rating: 5 },
    { id: 13, name: "Cold Coffee", category: "Drink", price: 250, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop", rating: 5 },
    { id: 14, name: "Mint Mojito", category: "Drink", price: 220, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=250&fit=crop", rating: 4 },
    { id: 15, name: "Strawberry Shake", category: "Drink", price: 320, image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=250&fit=crop", rating: 4 },
    { id: 16, name: "Chocolate Milkshake", category: "Drink", price: 350, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=250&fit=crop", rating: 5 },
    { id: 17, name: "Fresh Orange Juice", category: "Drink", price: 180, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=250&fit=crop", rating: 5 },
    { id: 18, name: "Chocolate Brownie", category: "Dessert", price: 300, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=250&fit=crop", rating: 5 },
    { id: 19, name: "Cheesecake", category: "Dessert", price: 380, image: "https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=400&h=250&fit=crop", rating: 5 },
    { id: 20, name: "Ice Cream Sundae", category: "Dessert", price: 250, image: "https://images.unsplash.com/photo-1614707267537-1e8c2b0b3fcb?w=400&h=250&fit=crop", rating: 4 },
    { id: 21, name: "Gulab Jamun", category: "Dessert", price: 180, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=250&fit=crop", rating: 5 },
    { id: 22, name: "Crispy Fries", category: "Snack", price: 150, image: "https://images.unsplash.com/photo-1585109649139-3667c35a7e1e?w=400&h=250&fit=crop", rating: 4 },
    { id: 23, name: "Chicken Wings", category: "Snack", price: 320, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=250&fit=crop", rating: 5 }
];

// ========== CART ==========
let cart = JSON.parse(localStorage.getItem('echoCart')) || [];

function saveCart() {
    localStorage.setItem('echoCart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(id, name, price, image) {
    let existing = cart.find(item => item.id === id);
    if (existing) existing.qty++;
    else cart.push({ id, name, price, image, qty: 1 });
    saveCart();
    showToast(name + " added to cart! 🛒");
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].qty += change;
        if (cart[index].qty <= 0) cart.splice(index, 1);
        saveCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    showToast("Item removed");
}

function updateCartUI() {
    let totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    let countSpans = document.querySelectorAll('.cart-count');
    countSpans.forEach(span => span.innerText = totalQty);

    let cartDiv = document.getElementById('cartItemsList');
    if (!cartDiv) return;
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p style="text-align:center; padding:30px;">Cart is empty 🛒</p>';
        let totalSpan = document.getElementById('cartTotal');
        if (totalSpan) totalSpan.innerHTML = 'Total: Rs. 0';
        return;
    }
    let html = '', total = 0;
    cart.forEach((item, idx) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-title">${item.name}</div>
                <div>Rs. ${item.price} x ${item.qty} = Rs. ${itemTotal}</div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${idx}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQuantity(${idx}, 1)">+</button>
                    <button class="remove-btn" onclick="removeItem(${idx})">Remove</button>
                </div>
            </div>
        `;
    });
    cartDiv.innerHTML = html;
    let totalSpan = document.getElementById('cartTotal');
    if (totalSpan) totalSpan.innerHTML = `Total: Rs. ${total}`;
}

function toggleCart() {
    let sidebar = document.getElementById('cartSidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

function showToast(msg) {
    let toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}

function checkout() {
    if (cart.length === 0) { showToast("Cart is empty!"); return; }
    let total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    showToast("✅ Order placed! Total: Rs." + total);
    cart = [];
    saveCart();
    if (document.getElementById('cartSidebar')) toggleCart();
}

// ========== SLIDER FUNCTIONS ==========
let currentIndex = 0;
let slides = [];
let totalSlides = 0;
let autoInterval;

function initSlider() {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    if (totalSlides === 0) return;
    createDots();
    updateSlider();
    startAutoSlide();
    let prevBtn = document.querySelector('.prev');
    let nextBtn = document.querySelector('.next');
    if (prevBtn) prevBtn.onclick = () => { resetAutoSlide(); prevSlide(); };
    if (nextBtn) nextBtn.onclick = () => { resetAutoSlide(); nextSlide(); };
}

function updateSlider() {
    let container = document.getElementById('sliderContainer');
    if (container) container.style.transform = `translateX(-${currentIndex * 100}%)`;
    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

function nextSlide() { currentIndex = (currentIndex + 1) % totalSlides; updateSlider(); }
function prevSlide() { currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; updateSlider(); }
function createDots() {
    let dotsContainer = document.getElementById('sliderDots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => { resetAutoSlide(); currentIndex = i; updateSlider(); };
        dotsContainer.appendChild(dot);
    }
}
function startAutoSlide() { autoInterval = setInterval(nextSlide, 4000); }
function resetAutoSlide() { clearInterval(autoInterval); startAutoSlide(); }

// ========== VOICE ==========
function initVoice() {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        let vr = document.getElementById('voiceResult');
        if (vr) vr.innerText = "❌ Voice not supported";
        return;
    }
    let recognition = new SpeechRecognition();
    recognition.lang = "en-PK";
    let voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.onclick = () => {
            recognition.start();
            let vr = document.getElementById('voiceResult');
            if (vr) vr.innerText = "🎙️ Listening...";
        };
    }
    recognition.onresult = (e) => {
        let text = e.results[0][0].transcript.toLowerCase();
        let vr = document.getElementById('voiceResult');
        if (vr) vr.innerHTML = "🗣️ You said: " + text;
        let found = foods.find(f => text.includes(f.name.toLowerCase()));
        if (found) {
            addToCart(found.id, found.name, found.price, found.image);
            if (vr) vr.innerHTML += "<br>✅ " + found.name + " added to cart!";
        } else if (text.includes("menu")) {
            window.location.href = "menu.html";
        } else if (text.includes("cart")) {
            toggleCart();
        } else if (text.includes("home")) {
            window.location.href = "index.html";
        } else {
            if (vr) vr.innerHTML += "<br>❌ Say: pizza, burger, menu, home, or cart";
        }
    };
}

// ========== DARK MODE, MOBILE MENU ==========
function initGlobalEvents() {
    let darkToggle = document.getElementById('darkMode');
    if (darkToggle) darkToggle.onclick = () => document.body.classList.toggle('dark');

    let menuToggle = document.getElementById('menuToggle');
    let navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) menuToggle.onclick = () =>
  

}


// 1. Top menu wale mic button ko automatic hide karne ke liye
const topMicLink = document.querySelector(".voice-btn");
if (topMicLink) {
    topMicLink.style.display = "none";
}

// 2. Naye bade hero button ko functional banane ke liye
const heroVoiceBtn = document.getElementById("heroVoiceBtn");
if (heroVoiceBtn) {
    heroVoiceBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "voice.html";
    });
}
}




