const EchoCart = (() => {
  const BACKEND_URL = 'https://echobite-ai-backend.onrender.com';
  const CART_API = `${BACKEND_URL}/api/cart`;
  const FOODS_API = `${BACKEND_URL}/api/foods`;
  const STORAGE_KEY = 'echo_cart';

  let foodsCache = null;

  function getLoggedInUser() {
    try {
      const user = JSON.parse(localStorage.getItem('echoUser') || 'null');
      return user && user.id ? user : null;
    } catch {
      return null;
    }
  }

  function mapApiCartToLocal(cart) {
    if (!cart || !Array.isArray(cart.items)) return [];

    return cart.items.map((item) => ({
      id: item.productId,
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image || 'https://via.placeholder.com/70?text=Food',
      quantity: item.quantity,
      size: item.selectedSize || 'Regular'
    }));
  }

  function getLocalCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveLocalCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function syncLocalCartFromApi(cart) {
    const localCart = mapApiCartToLocal(cart);
    saveLocalCart(localCart);
    return localCart;
  }

  async function loadFoods() {
    if (foodsCache) return foodsCache;

    const response = await fetch(FOODS_API);
    const data = await response.json();
    foodsCache = data.foods || [];
    return foodsCache;
  }

  async function resolveFoodByName(name) {
    const foods = await loadFoods();
    return foods.find((food) => food.name === name);
  }

  function buildImageUrl(image) {
    if (!image) return 'https://via.placeholder.com/70?text=Food';
    if (image.startsWith('http')) return image;
    return `${BACKEND_URL}/images/${image}`;
  }

  async function fetchCart() {
    const user = getLoggedInUser();
    if (!user) return getLocalCart();

    try {
      const response = await fetch(`${CART_API}/${user.id}`);
      const data = await response.json();

      if (response.ok && data.success) {
        return syncLocalCartFromApi(data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }

    return getLocalCart();
  }

  async function addToCart(item) {
    const user = getLoggedInUser();

    if (!user) {
      if (confirm('Please login to add items to your cart. Go to login page?')) {
        window.location.href = 'login.html';
      }
      return { success: false };
    }

    if (!item.productId) {
      alert('This item cannot be added to cart right now.');
      return { success: false };
    }

    try {
      const response = await fetch(`${CART_API}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name || user.email,
          productId: item.productId,
          name: item.name,
          selectedSize: item.selectedSize || item.size || 'Regular',
          price: Number(item.price),
          quantity: item.quantity || 1,
          image: item.image || ''
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const cart = syncLocalCartFromApi(data.cart);
        const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        return { success: true, cart, totalItems };
      }

      alert(data.message || 'Failed to add item to cart');
      return { success: false };
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Could not connect to cart service. Please try again.');
      return { success: false };
    }
  }

  async function updateItemQuantity(productId, selectedSize, quantity) {
    const user = getLoggedInUser();
    const size = selectedSize || 'Regular';

    if (!user) {
      const cart = getLocalCart();
      const index = cart.findIndex(
        (item) => String(item.id) === String(productId) && (item.size || 'Regular') === size
      );

      if (index === -1) return getLocalCart();

      if (quantity <= 0) cart.splice(index, 1);
      else cart[index].quantity = quantity;

      saveLocalCart(cart);
      return cart;
    }

    try {
      const response = await fetch(`${CART_API}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          productId,
          selectedSize: size,
          quantity
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return syncLocalCartFromApi(data.cart);
      }

      alert(data.message || 'Failed to update cart');
      return getLocalCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      return getLocalCart();
    }
  }

  async function clearCart() {
    const user = getLoggedInUser();
    saveLocalCart([]);

    if (!user) return { success: true };

    try {
      const response = await fetch(`${CART_API}/${user.id}`);
      const data = await response.json();

      if (response.ok && data.success && data.cart?.items?.length) {
        await Promise.all(
          data.cart.items.map((item) =>
            fetch(`${CART_API}/update`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.id,
                productId: item.productId,
                selectedSize: item.selectedSize || 'Regular',
                quantity: 0
              })
            })
          )
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false };
    }
  }

  async function placeOrder() {
    const user = getLoggedInUser();
    const cart = getLocalCart();

    if (!user) {
      if (confirm('Please login to place an order. Go to login page?')) {
        window.location.href = 'login.html';
      }
      return { success: false };
    }

    if (!cart.length) {
      alert('Cart is empty. Add items first.');
      return { success: false };
    }

    const items = cart.map((item) => ({
      foodId: item.productId || item.id,
      foodName: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    if (items.some((item) => !item.foodId)) {
      alert('Some cart items are invalid. Please re-add them from the menu.');
      return { success: false };
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/orders/place`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name || user.email,
          items
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await clearCart();
        return { success: true, order: data.order };
      }

      alert(data.message || 'Failed to place order');
      return { success: false };
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Could not connect to order service. Please try again.');
      return { success: false };
    }
  }

  return {
    BACKEND_URL,
    getLoggedInUser,
    fetchCart,
    addToCart,
    updateItemQuantity,
    clearCart,
    placeOrder,
    resolveFoodByName,
    buildImageUrl,
    getLocalCart,
    saveLocalCart
  };
})();
