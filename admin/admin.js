// ==========================================
// CONFIGURATION & INITIAL LOAD
// ==========================================
const BACKEND_URL = "https://echobite-ai-backend.onrender.com";
const API_BASE = `${BACKEND_URL}/api/foods`;
const IMAGE_UPLOAD_URL = `${BACKEND_URL}/api/images/upload`;

window.onload = function() {
    loadFoods();
};

async function loadFoods() {
    try {
        const res = await fetch(API_BASE);
        const data = await res.json();
        renderTable(data.foods || data);
    } catch (error) {
        console.log("Error loading foods:", error);
    }
}

// ==========================================
// ADD FOOD (POST API)
// ==========================================
function normalizeCategory(category) {
    const value = (category || '').trim();
    const lower = value.toLowerCase();

    const aliases = {
        pizza: 'Pizza',
        burger: 'Burger',
        drinks: 'Drinks',
        drink: 'Drinks',
        dessert: 'Dessert',
        deals: 'Fast Food',
        pasta: 'Fast Food',
        snack: 'Fast Food',
        'fast food': 'Fast Food'
    };

    return aliases[lower] || value;
}

async function addFood() {
    let name = document.getElementById("foodName").value.trim();
    let size = document.getElementById("foodSize").value;
    let price = document.getElementById("foodPrice").value;
    let category = normalizeCategory(document.getElementById("foodCategory").value);
    let imageFile = document.getElementById("foodImage").files[0];

    if (!name || !size || !price || !category) {
        alert("Fill all fields including size");
        return;
    }

    try {
        let imageName = "";

        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);

            const uploadRes = await fetch(IMAGE_UPLOAD_URL, {
                method: "POST",
                body: formData
            });
            const uploadData = await uploadRes.json();

            if (!uploadRes.ok || !uploadData.success) {
                alert(uploadData.message || "Image upload failed");
                return;
            }

            // Cloudinary returns a permanent URL in imageUrl
            imageName = uploadData.imageUrl || uploadData.filename;
        }

        const foodPayload = {
            name,
            category,
            description: "Yummy food item",
            sizes: [{ size, price: Number(price) }]
        };

        if (imageName) {
            foodPayload.image = imageName;
        }

        const res = await fetch(`${API_BASE}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foodPayload)
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            alert(err.message || "Failed to add food");
            return;
        }

        document.getElementById("foodName").value = "";
        document.getElementById("foodSize").value = "";
        document.getElementById("foodPrice").value = "";
        document.getElementById("foodCategory").value = "";
        document.getElementById("foodImage").value = "";

        loadFoods();
    } catch (error) {
        console.log("Error adding food:", error);
        alert("Error adding food. Please try again.");
    }
}

// ==========================================
// DELETE FOOD (DELETE API)
// ==========================================
async function deleteFood(id) {
    if (confirm("Kya aap waqai is food item ko delete karna chahte hain?")) {
        try {
            const res = await fetch(`${API_BASE}/delete/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                alert("Food item delete ho gaya!");
                loadFoods(); 
            } else {
                alert("Delete karne mein koi masala hua.");
            }
        } catch (error) {
            console.log("Error deleting food:", error);
        }
    }
}

// ==========================================
// RENDER TABLE (DISPLAY DATA)
// ==========================================
function formatSizes(sizes) {
    if (!sizes || !sizes.length) return "Regular";
    return sizes.map((item) => item.size).join(", ");
}

function formatPrices(sizes) {
    if (!sizes || !sizes.length) return "0";
    return sizes.map((item) => `${item.size}: ${item.price}`).join(" | ");
}

function buildFoodImageUrl(image) {
    if (!image) return "https://via.placeholder.com/48?text=No+Img";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    return `${BACKEND_URL}/images/${image}`;
}

function renderTable(foods) {
    let table = document.getElementById("foodTable");
    table.innerHTML = "";

    foods.forEach(food => {
        const imageSrc = buildFoodImageUrl(food.image);

        table.innerHTML += `
            <tr>
                <td>${food._id}</td>
                <td><img class="food-thumb" src="${imageSrc}" alt="${food.name}" onerror="this.src='https://via.placeholder.com/48?text=No+Img'"></td>
                <td>${food.name}</td>
                <td>${formatSizes(food.sizes)}</td>
                <td>${formatPrices(food.sizes)}</td>
                <td>${normalizeCategory(food.category)}</td>
                <td>
                    <button class="btn-delete" onclick="deleteFood('${food._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}