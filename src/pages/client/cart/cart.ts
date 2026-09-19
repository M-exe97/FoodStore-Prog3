import { getCart, updateItemQuantity, removeFromCart, clearCart, getCartTotal, getCartItemsCount } from "../../../utils/cart";
import type { ICartItem } from "../../../types/product";

const emptyCartView = document.getElementById("empty-cart-view") as HTMLDivElement;
const cartContentView = document.getElementById("cart-content-view") as HTMLDivElement;
const cartItemsList = document.getElementById("cart-items-list") as HTMLElement;
const resumenSubtotal = document.getElementById("resumen-subtotal") as HTMLSpanElement;
const resumenTotal = document.getElementById("resumen-total") as HTMLSpanElement;
const cartCounter = document.getElementById("cart-counter") as HTMLSpanElement;
const btnClearCart = document.getElementById("btn-clear-cart") as HTMLButtonElement;

function updateResumenYBadge(): void {
    const count = getCartItemsCount();
    cartCounter.textContent = count.toString();

    const total = getCartTotal();
    resumenSubtotal.textContent = `$ ${total}`;
    resumenTotal.textContent = `$ ${total}`;
}

function renderCart(): void {
    const items: ICartItem[] = getCart();

    if (items.length === 0) {
        emptyCartView.style.display = "block";
        cartContentView.style.display = "none";
        updateResumenYBadge();
        return;
    }

    emptyCartView.style.display = "none";
    cartContentView.style.display = "grid";
    cartItemsList.innerHTML = "";

    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "cart-item-card";

        const subtotal = item.product.precio * item.cantidad;

        card.innerHTML = `
            <img
                src="${item.product.imagen}"
                alt="${item.product.nombre}"
                class="cart-item-img"
            />
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.product.nombre}</h4>
                <p class="cart-item-price">Precio unitario: $ ${item.product.precio}</p>
                <p class="cart-item-subtotal">Subtotal: $ ${subtotal}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="btn-qty btn-menos" data-id="${item.product.id}">-</button>
                    <span class="qty-number"> ${item.cantidad}</span>
                    <button class="btn-qty btn-mas" data-id="${item.product.id}">+</button>
                </div>
                <button class="btn-remove" data-id="${item.product.id}">Eliminar</button>
            </div>
        `;

        const btnMenos = card.querySelector(".btn-menos") as HTMLButtonElement;
        btnMenos.addEventListener("click", () => {
            updateItemQuantity(item.product.id, item.cantidad -1);
            renderCart();
        });

        const btnMas = card.querySelector(".btn-mas") as HTMLButtonElement;
        btnMas.addEventListener("click", () => {
            updateItemQuantity(item.product.id, item.cantidad + 1);
            renderCart();
        });

        const btnRemove = card.querySelector(".btn-remove") as HTMLButtonElement;
        btnRemove.addEventListener("click", () => {
            removeFromCart(item.product.id);
            renderCart();
        });

        cartItemsList.appendChild(card);
    });

    updateResumenYBadge();
}

if (btnClearCart) {
    btnClearCart.addEventListener("click", () => {
        clearCart();
        renderCart();
    });
}

renderCart();