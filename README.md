# ShopFlow IA

Tienda virtual de gadgets y accesorios para estudiantes. Evoluciona el proyecto base **TaskFlow IA** (React + TypeScript + Vite) hacia una experiencia de compra visual: catálogo con tarjetas, búsqueda, filtros, detalle, carrito y un Asistente IA que recomienda productos **solo con datos locales**.

Esta versión es un laboratorio educativo. No conecta pagos reales ni servicios de inteligencia artificial externos.

## Funciones principales

- Encabezado comercial con llamada a la acción
- Catálogo de 10 productos con imagen, categoría, precio en soles, descuento y stock
- Búsqueda por nombre mientras se escribe
- Filtros: Todos, Audio, Accesorios, Computación, Gaming y Ofertas
- Modal de detalle con cantidad y botón Agregar al carrito
- Carrito con cantidades, eliminación, subtotal y total
- Resumen simulado al finalizar el pedido
- Microinteracciones discretas (hover, entrada de tarjetas, overlay y confirmación)
- Asistente IA flotante con tres preguntas rápidas basadas en el inventario local

## Tecnologías utilizadas

- React 18
- TypeScript
- Vite
- CSS propio (sin librerías de UI ni de animación)

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

Abra la dirección que muestre la terminal (normalmente `http://localhost:5173`).

Otros comandos:

```bash
npm run build
npm run preview
```

## Capturas de pantalla

1. Encabezado y catálogo de tarjetas
2. Búsqueda y filtro activo (por ejemplo Ofertas)
3. Modal de detalle de un producto
4. Carrito con cantidades y total
5. Panel del Asistente IA con una recomendación local

> Si publica el repositorio, agregue aquí las capturas reales en una carpeta `docs/` o en la raíz.

## Imágenes

Las fotos de producto se cargan desde [Unsplash](https://unsplash.com/license) (licencia Unsplash: uso libre con atribución recomendada). Un producto del catálogo se deja sin imagen a propósito para demostrar el estado vacío en QA.

| Producto | Procedencia |
| --- | --- |
| Audífonos Bluetooth Campus | Unsplash, foto de C D-X |
| Mini parlante Estudio | Unsplash |
| Mouse inalámbrico silencioso | Unsplash |
| Hub USB-C 6 en 1 | Unsplash |
| Teclado compacto | Unsplash |
| Soporte para laptop | Unsplash |
| Webcam Full HD | Unsplash |
| Mousepad gaming XL | Unsplash |
| Control DualPlay | Unsplash |
| Auriculares StudyPlay | Sin imagen (caso de prueba) |

## Estructura

```
ShopFlow_IA/
├─ index.html
├─ package.json
├─ prompts.md
├─ src/
│  ├─ App.tsx
│  ├─ types.ts
│  ├─ data/products.ts
│  ├─ lib/catalog.ts
│  ├─ context/ShopContext.tsx
│  └─ components/
│     ├─ ProductCard.tsx
│     ├─ CatalogFilters.tsx
│     ├─ ProductModal.tsx
│     ├─ CartDrawer.tsx
│     ├─ CheckoutSummary.tsx
│     └─ AiAssistant.tsx
```

## Nota sobre el Asistente IA

El botón **Asistente IA** es una simulación educativa. Las respuestas se calculan filtrando el arreglo local de productos. No hay API keys, no se envían datos a un modelo y no se almacenan credenciales.
