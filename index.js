const cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        loadProducts(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
}

function loadProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product', 'col-md-4', 'text-center');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="img-fluid mb-2">
            <h5>${product.title}</h5>
            <p>${product.description.substring(0, 50)}...</p>
            <p><strong>Price: $${product.price}</strong></p>
            <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(id, title, price, image) {
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartCount();
});