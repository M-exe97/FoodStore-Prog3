import type { IProduct, ICartItem } from "../types/product";

const CART_KEY = "cart";

export function getCart(): ICartItem[] {
    const data = localStorage.getItem(CART_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data) as ICartItem[];
    } catch {
        return [];
    }
}

function saveCart(cart: ICartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: IProduct, cantidad: number = 1): void {
    const cart = getCart();
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
        existingItem.cantidad += cantidad;
    } else {
        cart.push({ product, cantidad});
    }

    saveCart(cart);
}

export function updateItemQuantity(productId: number, cantidad: number): void {
    let cart = getCart();

    if (cantidad <= 0) {
        cart = cart.filter((item) => item.product.id !== productId);
    } else {
        const item = cart.find((i) => i.product.id === productId);
        if (item) {
            item.cantidad = cantidad;
        }
    }
    saveCart(cart);
}

export function removeFromCart(productId: number): void {
    const cart = getCart().filter((item) => item.product.id !== productId);
    saveCart(cart);
}

export function clearCart(): void {
    localStorage.removeItem(CART_KEY);
}

export function getCartTotal(): number {
    const cart = getCart();
    return cart.reduce(
        (total, item) => total + item.product.precio * item.cantidad, 0
    );
}

export function getCartItemsCount(): number {
    const cart = getCart();
    return cart.reduce((acc, item) => acc + item.cantidad, 0);
}