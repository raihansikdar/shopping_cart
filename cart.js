let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item', 'd-flex', 'align-items-center', 'justify-content-between');
        itemElement.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.title}" class="me-3">
                <div>
                    <p><strong>${item.title}</strong></p>
                    <p>Price: $${item.price} x <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${item.id}, -1)">-</button> ${item.quantity} <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${item.id}, 1)">+</button></p>
                </div>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert('Checkout successful! Total: $' + cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    clearCart();
}

document.addEventListener('DOMContentLoaded', loadCart);
