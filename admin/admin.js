// ==========================================
// CONFIGURATION & INITIAL LOAD
// ==========================================
const API_BASE = "https://echobite-ai-backend.onrender.com/api/foods";

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
async function addFood() {
    let name = document.getElementById("foodName").value;
    let price = document.getElementById("foodPrice").value;
    let category = document.getElementById("foodCategory").value;

    if (!name || !price || !category) {
        alert("Fill all fields");
        return;
    }

    try {
        await fetch(`${API_BASE}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                category,
                description: "Yummy food item",
                // Ab hum price ko backend ke demand ke mutabiq sizes array mein bhej rahe hain
                sizes: [{ size: "Regular", price: Number(price) }] 
            })
        });
        
        document.getElementById("foodName").value = "";
        document.getElementById("foodPrice").value = "";
        document.getElementById("foodCategory").value = "";

        loadFoods(); 
    } catch (error) {
        console.log("Error adding food:", error);
    }
}

// ==========================================
// DELETE FOOD (DELETE API)
// ==========================================
async function deleteFood(id) {
    if (confirm("Kya aap waqai is food item ko delete karna chahte hain?")) {
        try {
            const res = await fetch(`${API_BASE}/${id}`, {
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
function renderTable(foods) {
    let table = document.getElementById("foodTable");
    table.innerHTML = "";

    foods.forEach(food => {
        table.innerHTML += `
            <tr>
                <td>${food._id}</td>
                <td>${food.name}</td>
                <td>${(food.sizes && food.sizes[0]) ? food.sizes[0].price : '450'}</td>
                <td>${food.category}</td>
                <td>
                    <button class="btn-delete" onclick="deleteFood('${food._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}