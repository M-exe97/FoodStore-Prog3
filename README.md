# Food Store - Parcial 1 (Programacion 3)

Frontend para una Food Store, desarrollada con HTML5, CSS3, JavaScript y TypeScript empaquetado con Vite

## Descripcion del Proyecto

La aplicacion implementa un catalogo interactivo de productos y un carrito de compras funcional, destacando caracteristicas como:
* **Catalogo Dinamico:** Renderizado de productos y categoria a partir de fuentes centralizadas de datos en memoria (data.ts)
* **Busqueda y Filtrado:** Busqueda en tiempo real por coincidencia de texto sobre los nombre y filtrado por categorias desde el menu lateral, con manejo de los estados vacios
* **Carrito Persistente:** Almacenamiento local mediante `localStorage` bajo la clave `"cart"` que permite añadir productos (agrupando los duplicados e incrementando cantidades), modificar unidades (con + y -), eliminar articulos uno por uno, vaciar la seleccion con un boton y calcular el importe total acumulado
* **Navegacion:** Registro de rutas estaticas (`clientHome` y `clientCart`) en el entorno de compilacion de Vite

## Requisitos Previos

* Node.js (version 18 recomendada o superior)
* Gestor de paquetes `pnpm`

## Instrucciones de Ejecucion

1. **Instalar dependencias:**
    ```bash
    pnpm install
    ```

2. **Iniciar el servidor:**
    ```bash
    pnpm dev
    ```

3. **Acceder a la aplicacion:**

    Ir al navegador a
    http://localhost:5173/

Se va a redirigir directamente a la vista de catalogo (`src/pages/client/home/home.html`)

## Enlace al Video
[Explicacion del Codigo](https://youtu.be/nry0IYmx6e0?si=Z5oUMLFFfBn0o_cr)