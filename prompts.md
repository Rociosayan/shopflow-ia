# Biblioteca de prompts — ShopFlow IA

Prompts técnicos usados para planificar, construir y verificar la tienda. Cada uno delimita rol, contexto, tarea, formato y restricciones para no delegar todas las decisiones al modelo.

## 1. Planificación de la tienda

**Propósito:** obtener un mapa de archivos, componentes, datos y riesgos antes de tocar código.

**Cuándo reutilizarlo:** al iniciar un laboratorio o al convertir un prototipo estático en una app con estado.

```
Actúa como desarrollador frontend senior especializado en React, TypeScript y diseño de interfaces.

Analiza el proyecto actual. No modifiques ningún archivo.

Quiero convertirlo en ShopFlow IA, una tienda virtual de gadgets y accesorios para estudiantes.

La interfaz final debe incluir encabezado comercial, tarjetas, búsqueda, filtros, modal, carrito y Asistente IA.

Devuelve: archivos a modificar, componentes a crear, estructura de datos, riesgos y orden de implementación.
Espera mi aprobación antes de modificar código.
```

## 2. Componente visual (ProductCard)

**Propósito:** crear el bloque reutilizable del catálogo con jerarquía comercial y hover discreto.

**Cuándo reutilizarlo:** cuando se necesita un componente de tarjeta con imagen, precio y microinteracción, sin instalar librerías.

```
Crea un componente reutilizable ProductCard.

Debe incluir imagen, categoría, nombre, precio, precio tachado si hay descuento, stock y botón Ver producto.
Al pasar el cursor, la tarjeta se eleva y la imagen hace un zoom suave.
No instales librerías. No uses any. Conserva accesibilidad básica.
Antes de modificar, indica qué archivos tocarás.
```

## 3. Búsqueda y filtros

**Propósito:** hacer que el catálogo reaccione al texto y a la categoría sin recargar la página.

**Cuándo reutilizarlo:** al agregar filtrado local en listados (productos, tareas, artículos).

```
Agrega búsqueda y filtros al catálogo: Todos, Audio, Accesorios, Computación, Gaming, Ofertas.

La búsqueda filtra por nombre mientras se escribe.
Ofertas muestra productos con price < originalPrice.
Si no hay coincidencias, muestra un mensaje claro.
No instales dependencias. No cambies el modelo salvo que sea necesario.
```

## 4. Modal y carrito

**Propósito:** permitir revisar un producto y preparar una compra simulada.

**Cuándo reutilizarlo:** para overlays con Escape, una sola capa visible y cálculos de cantidad/total.

```
Implementa Ver producto y Agregar al carrito.

El modal muestra imagen, precio, descripción, stock y selector de cantidad.
El carrito permite cambiar cantidades sin superar el stock, eliminar, calcular total en soles y finalizar con un resumen interno.
Ciérralos con X o Escape. No abras varias capas a la vez.
No conectes pagos ni pidas datos bancarios. No instales dependencias.
```

## 5. Asistente IA (simulación local)

**Propósito:** añadir recomendaciones demostrativas sin fingir una API real.

**Cuándo reutilizarlo:** cuando se pide un “asistente” educativo basado en datos del propio proyecto.

```
Agrega un botón flotante Asistente IA que abre un panel con tres preguntas rápidas.
Las recomendaciones deben calcularse solo con los productos locales.
Cada sugerencia permite ver el producto. Ciérralo con X o Escape.
No conectes APIs, no pidas claves y no instales dependencias.
Explica que es una simulación educativa, no un modelo conectado.
```

## 6. Revisión QA

**Propósito:** generar casos de prueba antes de publicar, sin modificar archivos.

**Cuándo reutilizarlo:** al cerrar un laboratorio o antes de un commit/push.

```
Actúa como ingeniero de QA. No modifiques ningún archivo.

Identifica casos para búsqueda, filtros, modal, producto sin imagen, sin stock, carrito vacío, cantidades, total, Asistente IA, catálogo vacío y vista móvil.
Clasifica cada escenario como favorable, límite o error y describe el comportamiento esperado.
```

## 7. Revisión UI/UX (complemento)

**Propósito:** pedir mejoras visuales priorizadas sin ampliar el alcance.

**Cuándo reutilizarlo:** después de tener la interfaz funcional y antes de pulir microinteracciones.

```
Actúa como diseñador UI/UX. No modifiques ningún archivo.
Evalúa jerarquía, consistencia de tarjetas, precios, contraste, CTAs, carrito, responsividad y movimiento.
Devuelve cinco mejoras priorizadas: alta, media o baja.
```

## 8. Prompt ambiguo (contraste)

**Qué ocurrió:** “Haz que mi página se vea más moderna y bonita” deja que el modelo elija paleta, tipografía, layout, animaciones e incluso librerías.

**Lección:** un prompt visual sin rol, restricciones ni criterios de aceptación transfiere demasiadas decisiones de diseño al modelo.
