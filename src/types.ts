export type Category = 'audio' | 'accesorios' | 'computacion' | 'gaming'

export type CatalogFilter = 'todos' | Category | 'ofertas'

export interface Product {
  id: string
  name: string
  description: string
  category: Category
  price: number
  originalPrice: number
  stock: number
  image: string
  featured: boolean
}

export interface CartItem {
  productId: string
  quantity: number
}

export type Overlay = 'none' | 'product' | 'cart' | 'assistant' | 'checkout'
