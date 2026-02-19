import { cart, saveCart, updateCartUI } from './cart.js';

const cartItemsContainer = document.getElementById('cartItems');
const cartTotalDisplay = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCart');

function renderCart() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Votre panier est vide.</p>';
        cartTotalDisplay.textContent = '0$';
        return;
    }

    cart.forEach((item, index) => {
        const itemPrice = typeof item.prix === 'number' ? item.prix : parseInt(item.prix);
        const subtotal = itemPrice * item.quantity;
        total += subtotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
        <div class="cart-item-details">
            <img src="${item.image}" alt="${item.id}">
            <div class="cart-item-info">
                <h4>${item.id}</h4>
            </div>
        </div>
        <div class = "unite">
            <div class="cart-item-price">
                <div class="cart-item-qty">
                    <button class="qty-btn minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn plus" data-index="${index}">+</button>
                </div>
                <div class="cart-item-subtotal">
                    ${subtotal}$
                </div>
            </div>
            <button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
        </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalDisplay.textContent = total + '$';
}

if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
        const index = e.target.closest('button')?.dataset.index;
        if (index === undefined) return;

        if (e.target.closest('.minus')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        } else if (e.target.closest('.plus')) {
            cart[index].quantity++;
        } else if (e.target.closest('.remove-btn')) {
            cart.splice(index, 1);
        }

        saveCart();
        renderCart();
        updateCartUI();
    });
}

if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment vider votre panier ?')) {
            cart.length = 0;
            saveCart();
            renderCart();
            updateCartUI();
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartUI();
});
