// Script for handling the home page

// Function to display items
function displayItems() {
    const cafeItemsContainer = document.getElementById('cafe-items');
    const hotelItemsContainer = document.getElementById('hotel-items-container');
    const drinksItemsContainer = document.getElementById('drinks-items');

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');

        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
        `;

        if (item.category === 'cafe') {
            cafeItemsContainer.appendChild(itemCard);
        } else if (item.category === 'hotel') {
            hotelItemsContainer.appendChild(itemCard);
        } else if (item.category === 'drinks') {
            drinksItemsContainer.appendChild(itemCard);
        }
    });
}

// Cart array
let cart = [];

// Function to add items to cart
function addToCart(id) {
    const item = items.find(item => item.id === id);
    const itemInCart = cart.find(cartItem => cartItem.id === id);

    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartCount();
    saveCart();
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from localStorage
function loadCart() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        cart = JSON.parse(cartData);
        updateCartCount();
    }
}

// Initialize
window.onload = function() {
    loadCart();
    displayItems();
}
