import type { CartItem, CatalogFilter, Product } from '../types'

export const CATEGORY_LABELS: Record<CatalogFilter, string> = {
  todos: 'Todos',
  audio: 'Audio',
  accesorios: 'Accesorios',
  computacion: 'Computación',
  tablets: 'Tablets',
  gaming: 'Gaming',
  ofertas: 'Ofertas',
}

export function formatSoles(amount: number): string {
  return `S/ ${amount.toFixed(2)}`
}

export function hasDiscount(product: Product): boolean {
  return product.price < product.originalPrice
}

export function discountPercent(product: Product): number {
  if (!hasDiscount(product)) return 0
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
}

export function filterProducts(
  items: Product[],
  query: string,
  category: CatalogFilter,
): Product[] {
  const normalized = query.trim().toLowerCase()

  return items.filter((product) => {
    const matchesQuery = normalized === '' || product.name.toLowerCase().includes(normalized)
    if (!matchesQuery) return false

    if (category === 'todos') return true
    if (category === 'ofertas') return hasDiscount(product)
    return product.category === category
  })
}

export function cartSubtotal(items: CartItem[], catalog: Product[]): number {
  return items.reduce((total, item) => {
    const product = catalog.find((entry) => entry.id === item.productId)
    if (!product) return total
    return total + product.price * item.quantity
  }, 0)
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}
