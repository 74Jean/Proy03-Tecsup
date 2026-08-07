# Phone Market

Proyecto académico de una tienda de celulares (e-commerce) hecho con React + TypeScript + Vite.

Permite ver un catálogo de celulares, filtrarlos, registrarse e iniciar sesión, agregar productos a un carrito de compras y confirmar una "compra" (se genera una boleta simulada). También incluye un chat con IA que recomienda productos del catálogo.

## Tecnologías usadas

- React 19 + TypeScript
- Vite
- React Router DOM
- Zustand
- Google Gemini API

## Cómo correr el proyecto

1. Clonar el repositorio

```bash
git clone https://github.com/74Jean/Proy03-Tecsup.git
cd phone-market
```

2. Instalar dependencias

```bash
pnpm install
```

3. Levantar el proyecto

```bash
pnpm dev
```

Se abre en `http://localhost:5173`

## Funcionalidades

- Catálogo de celulares con búsqueda y filtros (marca, precio, rating, stock, descuento)
- Registro e inicio de sesión (guardado en localStorage)
- Carrito de compras (independiente por usuario)
- Rutas privadas: hay que estar logueado para entrar al carrito y a la boleta
- Vista de detalle de cada celular
- Boleta al confirmar la compra
- Chat con IA que recomienda celulares del catálogo
- Página de preguntas frecuentes y términos y condiciones

## Estructura básica

```
src/
├── pages/
├── router/
├── services/
├── shared/store/
└── module/
```

## Notas

- El proyecto no tiene backend propio: el catálogo se consume desde una API externa y los usuarios se guardan en localStorage, así que los datos no persisten entre navegadores.
