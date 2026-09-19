import { PRODUCTS, getCategories } from "../../../data/data";
import type { IProduct } from "../../../types/product";
import type { ICategoria } from "../../../types/categoria";
import { addToCart, getCartItemsCount } from "../../../utils/cart";


let currentCategoryId: number | "all" = "all";
let currentSearchQuery: string = "";


const categoriesContainer = document.getElementById("categories-container") as HTMLUListElement;
const productsContainer = document.getElementById("products-container") as HTMLDivElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const categoryTitle = document.getElementById("category-title") as HTMLSpanElement;
const productsCount = document.getElementById("products-count") as HTMLSpanElement;
const cartCounter = document.getElementById("cart-counter") as HTMLSpanElement;
const mensajeAviso = document.getElementById("mensaje-aviso") as HTMLDivElement;

function updateCartBadge(): void {
  const count = getCartItemsCount();
  cartCounter.textContent = count.toString();
}

function mostrarAviso(texto: string): void {
  mensajeAviso.textContent = texto;
  mensajeAviso.classList.add("activo");

  setTimeout(() => {
    mensajeAviso.classList.remove("activo");
  }, 2000);
}

function updateActiveCategoryButton(): void {
  const buttons = categoriesContainer.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    const el = btn as HTMLButtonElement;
    const catId = el.dataset.categoryId;
    if (catId === currentCategoryId.toString()) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function applyFilters(): void {
  const filtered = PRODUCTS.filter((prod) => {
    const matchesCategory =
      currentCategoryId === "all" ||
      prod.categorias.some((cat) => cat.id === currentCategoryId);

    const matchesSearch = prod.nombre
      .toLowerCase()
      .includes(currentSearchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (currentCategoryId === "all") {
    if (currentSearchQuery !== "") {
      categoryTitle.textContent = `Busqueda: "${currentSearchQuery}"`;
    } else {
      categoryTitle.textContent = "Todas las categorias";
    }
  } else {
    const cat = getCategories().find((c) => c.id === currentCategoryId);
    if (cat) {
      categoryTitle.textContent = `Categoria: ${cat.nombre}`;
    } else {
      categoryTitle.textContent = "Categoria";
    }
  }

  productsCount.textContent = `${filtered.length} producto(s)`;
  renderProducts(filtered);
}

function renderCategories(): void {
  const categories: ICategoria[] = getCategories();

  categoriesContainer.innerHTML = `
    <li>
      <button class="category-btn ${currentCategoryId === "all" ? "active" : ""}" data-category-id="all">
        Todas las categorias
      </button>
    </li>
  `;

  categories.forEach((cat) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = `category-btn ${currentCategoryId === cat.id ? "active" : ""}`;
    button.textContent = cat.nombre;
    button.dataset.categoryId = cat.id.toString();

    button.addEventListener("click", () => {
      currentCategoryId = cat.id;
      updateActiveCategoryButton();
      applyFilters();
    });

    li.appendChild(button);
    categoriesContainer.appendChild(li);
  });

  const allBtn = categoriesContainer.querySelector('[data-category-id="all"]');
  if (allBtn) {
    allBtn.addEventListener("click", () => {
      currentCategoryId = "all";
      updateActiveCategoryButton();
      applyFilters();
    });
  }
}

function renderProducts(products: IProduct[]): void {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1;">
        No se encontraron productos que coincidan con la busqueda
      </div>
    `;
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    let nombreCategoria = "General";
    if (product.categorias.length > 0) {
      nombreCategoria = product.categorias[0].nombre;
    }

    let textoBoton = "+ Agregar";
    let botonDeshabilitado = "";

    if (!product.disponible) {
      textoBoton = "Agotado";
      botonDeshabilitado = "disabled";
    }

    card.innerHTML = `
      <div>
        <img src="${product.imagen}" alt="${product.nombre}" />
        <div class="product-category-tag">${nombreCategoria}</div>
        <h3 class="product-title">${product.nombre}</h3>
        <p class="product-desc">${product.descripcion}</p>
      </div>
      <div class="product-card-footer">
        <span class="product-price">$ ${product.precio}</span>
        <button class="btn-add-cart" ${botonDeshabilitado}>
          ${textoBoton}
        </button>
      </div>
    `;

    const addBtn = card.querySelector(".btn-add-cart") as HTMLButtonElement;
    if (product.disponible) {
      addBtn.addEventListener("click", () => {
        addToCart(product, 1);
        updateCartBadge();
        mostrarAviso("Producto agregado al carrito");
      });
    }

    productsContainer.appendChild(card);
  });
}


if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    currentSearchQuery = target.value.trim();
    applyFilters();
  });
}


renderCategories();
applyFilters();
updateCartBadge();