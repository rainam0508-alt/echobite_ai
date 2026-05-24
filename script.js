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

const foodGrid =
document.getElementById("foodGrid");

const searchInput =
document.getElementById("searchInput");

const sortPrice =
document.getElementById("sortPrice");

const cartBtn =
document.getElementById("cartBtn");

const cartSidebar =
document.getElementById("cartSidebar");

const closeCart =
document.getElementById("closeCart");

const cartItems =
document.getElementById("cartItems");

const cartCount =
document.getElementById("cartCount");

let cart = [];


// =====================
// DISPLAY FOODS
// =====================

function displayFoods(items){

foodGrid.innerHTML = "";

items.forEach(food => {

foodGrid.innerHTML += `

<div class="food-card">

<img src="${food.image}"
alt="${food.name}">

<h3>${food.name}</h3>

<p class="category">
${food.category}
</p>

<p class="price">
Rs ${food.price}
</p>

<button
class="add-btn"
onclick="addToCart(
'${food.name}',
${food.price}
)">
Add To Cart
</button>

</div>

`;

});

}

displayFoods(foods);


// =====================
// SEARCH
// =====================

searchInput.addEventListener(
"input",
function(){

const value =
this.value.toLowerCase();

const filtered =
foods.filter(food =>
food.name
.toLowerCase()
.includes(value)
);

displayFoods(filtered);

}
);


// =====================
// CATEGORY FILTER
// =====================

const filterButtons =
document.querySelectorAll(
".filter-btn"
);

filterButtons.forEach(btn => {

btn.addEventListener(
"click",
function(){

filterButtons.forEach(b =>
b.classList.remove(
"active"
)
);

this.classList.add(
"active"
);

const category =
this.dataset.category;

if(category === "All"){

displayFoods(foods);

}
else{

const filtered =
foods.filter(food =>
food.category ===
category
);

displayFoods(filtered);

}

}
);

});


// =====================
// SORT PRICE
// =====================

sortPrice.addEventListener(
"change",
function(){

let sortedFoods =
[...foods];

if(this.value ===
"low-high"){

sortedFoods.sort(
(a,b)=>
a.price - b.price
);

}

if(this.value ===
"high-low"){

sortedFoods.sort(
(a,b)=>
b.price - a.price
);

}

displayFoods(
sortedFoods
);

}
);


// =====================
// ADD TO CART
// =====================

function addToCart(
name,
price
){

cart.push({
name,
price
});

updateCart();

}


// =====================
// UPDATE CART
// =====================

function updateCart(){

cartItems.innerHTML = "";

cart.forEach(item => {

cartItems.innerHTML += `

<div class="cart-item">

<p>
${item.name}
</p>

<p>
Rs ${item.price}
</p>

</div>

`;

});

cartCount.innerText =
cart.length;

}


// =====================
// OPEN SIDEBAR
// =====================

cartBtn.addEventListener(
"click",
function(){

cartSidebar.classList.add(
"show-cart"
);

}
);


// =====================
// CLOSE SIDEBAR
// =====================

closeCart.addEventListener(
"click",
function(){

cartSidebar.classList.remove(
"show-cart"
);

}
);