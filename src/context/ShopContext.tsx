import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { products } from '../data/products'
import { cartCount, cartSubtotal, filterProducts } from '../lib/catalog'
import type { CartItem, CatalogFilter, Overlay, Product } from '../types'

interface ShopContextValue {
  catalog: Product[]
  visibleProducts: Product[]
  query: string
  setQuery: (value: string) => void
  category: CatalogFilter
  setCategory: (value: CatalogFilter) => void
  overlay: Overlay
  selectedProduct: Product | null
  cart: CartItem[]
  cartTotal: number
  itemCount: number
  toast: string | null
  openProduct: (product: Product) => void
  openCart: () => void
  openAssistant: () => void
  openCheckout: () => void
  closeOverlay: () => void
  addToCart: (productId: string, quantity: number) => void
  changeQuantity: (productId: string, nextQuantity: number) => void
  removeFromCart: (productId: string) => void
}

const ShopContext = createContext<ShopContextValue | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CatalogFilter>('todos')
  const [overlay, setOverlay] = useState<Overlay>('none')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const visibleProducts = useMemo(
    () => filterProducts(products, query, category),
    [query, category],
  )

  const cartTotal = useMemo(() => cartSubtotal(cart, products), [cart])
  const itemCount = useMemo(() => cartCount(cart), [cart])

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(null), 1800)
  }

  function openProduct(product: Product) {
    setSelectedProduct(product)
    setOverlay('product')
  }

  function openCart() {
    setSelectedProduct(null)
    setOverlay('cart')
  }

  function openAssistant() {
    setSelectedProduct(null)
    setOverlay('assistant')
  }

  function openCheckout() {
    setSelectedProduct(null)
    setOverlay('checkout')
  }

  function closeOverlay() {
    setOverlay('none')
    setSelectedProduct(null)
  }

  function addToCart(productId: string, quantity: number) {
    const product = products.find((item) => item.id === productId)
    if (!product || product.stock === 0 || quantity < 1) return

    setCart((current) => {
      const existing = current.find((item) => item.productId === productId)
      const nextQuantity = Math.min(product.stock, (existing?.quantity ?? 0) + quantity)

      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: nextQuantity } : item,
        )
      }

      return [...current, { productId, quantity: nextQuantity }]
    })

    showToast(`${product.name} se agregó al carrito`)
    setOverlay('none')
    setSelectedProduct(null)
  }

  function changeQuantity(productId: string, nextQuantity: number) {
    const product = products.find((item) => item.id === productId)
    if (!product) return

    if (nextQuantity < 1) {
      removeFromCart(productId)
      return
    }

    setCart((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(product.stock, nextQuantity) }
          : item,
      ),
    )
  }

  function removeFromCart(productId: string) {
    setCart((current) => current.filter((item) => item.productId !== productId))
  }

  const value: ShopContextValue = {
    catalog: products,
    visibleProducts,
    query,
    setQuery,
    category,
    setCategory,
    overlay,
    selectedProduct,
    cart,
    cartTotal,
    itemCount,
    toast,
    openProduct,
    openCart,
    openAssistant,
    openCheckout,
    closeOverlay,
    addToCart,
    changeQuantity,
    removeFromCart,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop debe usarse dentro de ShopProvider')
  }
  return context
}
