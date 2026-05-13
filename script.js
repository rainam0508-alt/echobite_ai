
const foods = [
    { id: 1, name: "Zinger Burger", category: "Burger", price: 450, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format" },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 350, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300&auto=format" },
    { id: 3, name: "Cheese Burger", category: "Burger", price: 400, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&auto=format" },
    { id: 4, name: "Veg Pizza", category: "Pizza", price: 550, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format" },
    { id: 5, name: "Pepperoni Pizza", category: "Pizza", price: 650, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=300&auto=format" },
    { id: 6, name: "White Sauce Pasta", category: "Pasta", price: 480, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&auto=format" },
    { id: 7, name: "Cold Coffee", category: "Drink", price: 250, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format" },
    { id: 8, name: "Chocolate Brownie", category: "Dessert", price: 300, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&auto=format" }
];

// Cart Array
let cart = [];

// Load cart from storage
if (localStorage.getItem('myCart')) {
    cart = JSON.parse(localStorage.getItem('myCart'));
}

// Save cart
function saveCart() {
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartDisplay();
}

// Add to cart
function addToCart(id, name, price, image) {
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ id: id, name: name, price: price, image: image, quantity: 1 });
    }
    saveCart();
    alert(name + " added to cart!");
}

// Remove from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// Update quantity
function changeQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
}

// Update cart display everywhere
function updateCartDisplay() {
    // Update cart count in navbar
    let totalQty = 0;
    for (let i = 0; i < cart.length; i++) {
        totalQty += cart[i].quantity;
    }
    let countSpans = document.querySelectorAll('.cart-count');
    for (let i = 0; i < countSpans.length; i++) {
        countSpans[i].innerText = totalQty;
    }
    
    // Update sidebar cart
    let sidebarDiv = document.getElementById('cartItemsSidebar');
    if (sidebarDiv) {
        if (cart.length === 0) {
            sidebarDiv.innerHTML = '<p style="padding:20px; text-align:center;">Cart is empty</p>';
        } else {
            let html = '';
            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                let item = cart[i];
                let itemTotal = item.price * item.quantity;
                total += itemTotal;
                html += '<div style="border-bottom:1px solid #ddd; padding:10px; margin:5px 0;">';
                html += '<div><strong>' + item.name + '</strong><br>Rs.' + item.price + ' x ' + item.quantity + '</div>';
                html += '<div style="margin-top:5px;">';
                html += '<button onclick="changeQty(' + i + ', -1)" style="background:#ff7a00; border:none; padding:5px 10px; margin:2px;">-</button>';
                html += '<span style="margin:0 8px;">' + item.quantity + '</span>';
                html += '<button onclick="changeQty(' + i + ', 1)" style="background:#ff7a00; border:none; padding:5px 10px; margin:2px;">+</button>';
                html += '<button onclick="removeItem(' + i + ')" style="background:#ef4444; border:none; padding:5px 10px; margin:2px;">Delete</button>';
                html += '</div>';
                html += '<div>Rs.' + itemTotal + '</div>';
                html += '</div>';
            }
            html += '<div style="margin-top:15px; font-weight:bold;">Total: Rs.' + total + '</div>';
            sidebarDiv.innerHTML = html;
        }
    }
    
    // Update cart page
    let cartPageDiv = document.getElementById('cartItemsList');
    if (cartPageDiv) {
        if (cart.length === 0) {
            cartPageDiv.innerHTML = '<div style="text-align:center; padding:50px;">Cart is empty! <br><br><a href="menu.html" class="btn">Browse Menu</a></div>';
            document.getElementById('subtotal').innerText = '0';
            document.getElementById('totalAmount').innerText = '50';
        } else {
            let html = '';
            let subtotal = 0;
            for (let i = 0; i < cart.length; i++) {
                let item = cart[i];
                let itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                html += '<div style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid #ddd;">';
                html += '<img src="' + item.image + '" width="60" height="60" style="border-radius:10px;">';
                html += '<div><strong>' + item.name + '</strong><br>Rs.' + item.price + '</div>';
                html += '<div>';
                html += '<button onclick="changeQty(' + i + ', -1)" style="background:#ff7a00; border:none; padding:5px 12px;">-</button>';
                html += '<span style="margin:0 10px;">' + item.quantity + '</span>';
                html += '<button onclick="changeQty(' + i + ', 1)" style="background:#ff7a00; border:none; padding:5px 12px;">+</button>';
                html += '<button onclick="removeItem(' + i + ')" style="background:#ef4444; border:none; padding:5px 12px; margin-left:10px;">Remove</button>';
                html += '</div>';
                html += '<div>Rs.' + itemTotal + '</div>';
                html += '</div>';
            }
            cartPageDiv.innerHTML = html;
            document.getElementById('subtotal').innerText = subtotal;
            document.getElementById('totalAmount').innerText = subtotal + 50;
        }
    }
}

// Display food items
function showFoods() {
    let grid = document.getElementById('foodGrid');
    if (!grid) return;
    
    let html = '';
    for (let i = 0; i < foods.length; i++) {
        let f = foods[i];
        html += '<div class="food-card" style="background:white; border-radius:15px; padding:15px; text-align:center;">';
        html += '<img src="' + f.image + '" style="width:100%; height:160px; object-fit:cover; border-radius:10px;">';
        html += '<h3 style="margin:10px 0;">' + f.name + '</h3>';
        html += '<p class="price" style="color:#ff7a00; font-size:20px; font-weight:bold;">Rs. ' + f.price + '</p>';
        html += '<button onclick="addToCart(' + f.id + ', \'' + f.name + '\', ' + f.price + ', \'' + f.image + '\')" style="background:linear-gradient(to right,#ff7a00,#ff9500); color:white; border:none; padding:10px 20px; border-radius:25px; cursor:pointer;">Add to Cart 🛒</button>';
        html += '</div>';
    }
    grid.innerHTML = html;
}

// Show featured items
function showFeatured() {
    let grid = document.getElementById('featuredGrid');
    if (!grid) return;
    
    let html = '';
    for (let i = 0; i < 4; i++) {
        let f = foods[i];
        html += '<div class="food-card" style="background:white; border-radius:15px; padding:15px; text-align:center;">';
        html += '<img src="' + f.image + '" style="width:100%; height:160px; object-fit:cover; border-radius:10px;">';
        html += '<h3 style="margin:10px 0;">' + f.name + '</h3>';
        html += '<p class="price" style="color:#ff7a00; font-size:20px; font-weight:bold;">Rs. ' + f.price + '</p>';
        html += '<button onclick="addToCart(' + f.id + ', \'' + f.name + '\', ' + f.price + ', \'' + f.image + '\')" style="background:linear-gradient(to right,#ff7a00,#ff9500); color:white; border:none; padding:10px 20px; border-radius:25px; cursor:pointer;">Add to Cart 🛒</button>';
        html += '</div>';
    }
    grid.innerHTML = html;
}

// Search function
function searchFood() {
    let input = document.getElementById('searchInput');
    if (!input) return;
    
    let value = input.value.toLowerCase();
    let grid = document.getElementById('foodGrid');
    if (!grid) return;
    
    let filtered = [];
    for (let i = 0; i < foods.length; i++) {
        if (foods[i].name.toLowerCase().includes(value)) {
            filtered.push(foods[i]);
        }
    }
    
    let html = '';
    for (let i = 0; i < filtered.length; i++) {
        let f = filtered[i];
        html += '<div class="food-card" style="background:white; border-radius:15px; padding:15px; text-align:center;">';
        html += '<img src="' + f.image + '" style="width:100%; height:160px; object-fit:cover; border-radius:10px;">';
        html += '<h3 style="margin:10px 0;">' + f.name + '</h3>';
        html += '<p class="price" style="color:#ff7a00; font-size:20px; font-weight:bold;">Rs. ' + f.price + '</p>';
        html += '<button onclick="addToCart(' + f.id + ', \'' + f.name + '\', ' + f.price + ', \'' + f.image + '\')" style="background:linear-gradient(to right,#ff7a00,#ff9500); color:white; border:none; padding:10px 20px; border-radius:25px; cursor:pointer;">Add to Cart 🛒</button>';
        html += '</div>';
    }
    grid.innerHTML = html;
}

// Filter by category
function filterFood(category) {
    let grid = document.getElementById('foodGrid');
    if (!grid) return;
    
    let filtered = [];
    if (category === 'all') {
        filtered = foods;
    } else {
        for (let i = 0; i < foods.length; i++) {
            if (foods[i].category === category) {
                filtered.push(foods[i]);
            }
        }
    }
    
    let html = '';
    for (let i = 0; i < filtered.length; i++) {
        let f = filtered[i];
        html += '<div class="food-card" style="background:white; border-radius:15px; padding:15px; text-align:center;">';
        html += '<img src="' + f.image + '" style="width:100%; height:160px; object-fit:cover; border-radius:10px;">';
        html += '<h3 style="margin:10px 0;">' + f.name + '</h3>';
        html += '<p class="price" style="color:#ff7a00; font-size:20px; font-weight:bold;">Rs. ' + f.price + '</p>';
        html += '<button onclick="addToCart(' + f.id + ', \'' + f.name + '\', ' + f.price + ', \'' + f.image + '\')" style="background:linear-gradient(to right,#ff7a00,#ff9500); color:white; border:none; padding:10px 20px; border-radius:25px; cursor:pointer;">Add to Cart 🛒</button>';
        html += '</div>';
    }
    grid.innerHTML = html;
    
    // Update active button
    let btns = document.querySelectorAll('.filter-btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
        if (btns[i].getAttribute('data-filter') === category) {
            btns[i].classList.add('active');
        }
    }
}

// Voice recognition
function startVoice() {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        let recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();
        
        recognition.onresult = function(event) {
            let text = event.results[0][0].transcript.toLowerCase();
            document.getElementById('speechText').innerText = 'You said: ' + text;
            
            let found = null;
            for (let i = 0; i < foods.length; i++) {
                if (text.includes(foods[i].name.toLowerCase())) {
                    found = foods[i];
                    break;
                }
            }
            
            if (found) {
                document.getElementById('aiResult').innerHTML = '<h3>' + found.name + '</h3><p>Rs.' + found.price + '</p><button onclick="addToCart(' + found.id + ', \'' + found.name + '\', ' + found.price + ', \'' + found.image + '\')">Add to Cart</button>';
            } else if (text.includes('menu')) {
                window.location.href = 'menu.html';
            } else if (text.includes('cart')) {
                window.location.href = 'cart.html';
            } else {
                document.getElementById('aiResult').innerHTML = '<p>Say: Pizza, Burger, Menu, or Cart</p>';
            }
        };
    } else {
        alert('Voice not supported in your browser');
    }
}

// Place order
function placeOrder() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantity;
    }
    let total = subtotal + 50;
    
    alert('Order placed successfully! Total: Rs.' + total);
    cart = [];
    saveCart();
    window.location.href = 'index.html';
}

// Dark mode
function toggleDark() {
    document.body.classList.toggle('dark');
}

// Mobile menu
function toggleMenu() {
    let nav = document.getElementById('navLinks');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Toggle cart sidebar
function toggleCart() {
    let sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function closeCart() {
    let sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
    showFoods();
    showFeatured();
    updateCartDisplay();
    
    // Setup search
    let searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', searchFood);
    }
    
    // Setup dark mode
    let darkBtn = document.getElementById('darkMode');
    if (darkBtn) {
        darkBtn.onclick = toggleDark;
    }
    
    // Setup mobile menu
    let menuBtn = document.getElementById('menuToggle');
    if (menuBtn) {
        menuBtn.onclick = toggleMenu;
    }
    
    // Setup cart button
    let cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.onclick = toggleCart;
    }
    
    // Setup close cart
    let closeBtn = document.getElementById('closeCart');
    if (closeBtn) {
        closeBtn.onclick = closeCart;
    }
    
    // Setup voice buttons
    let voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.onclick = startVoice;
    }
    
    let heroMic = document.getElementById('heroMic');
    if (heroMic) {
        heroMic.onclick = startVoice;
    }
    
    // Setup place order
    let orderBtn = document.getElementById('placeOrderBtn');
    if (orderBtn) {
        orderBtn.onclick = placeOrder;
    }
    
    // Setup start button
    let startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.onclick = function() {
            window.location.href = 'menu.html';
        };
    }
    
    // Remove loader
    let loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.style.display = 'none';
        }, 1000);
    }
});
