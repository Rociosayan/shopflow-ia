import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
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
  isClosing: boolean
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
  const [isClosing, setIsClosing] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current)
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function clearCloseTimer() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function openLayer(next: Overlay, product: Product | null = null) {
    clearCloseTimer()
    setIsClosing(false)
    setSelectedProduct(product)
    setOverlay(next)
  }

  const visibleProducts = useMemo(
    () => filterProducts(products, query, category),
    [query, category],
  )

  const cartTotal = useMemo(() => cartSubtotal(cart, products), [cart])
  const itemCount = useMemo(() => cartCount(cart), [cart])

  function showToast(message: string) {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = window.setTimeout(() => setToast(null), 1600)
  }

  function openProduct(product: Product) {
    openLayer('product', product)
  }

  function openCart() {
    openLayer('cart')
  }

  function openAssistant() {
    openLayer('assistant')
  }

  function openCheckout() {
    openLayer('checkout')
  }

  function finishClose() {
    setOverlay('none')
    setSelectedProduct(null)
    setIsClosing(false)
  }

  function closeOverlay() {
    if (overlay === 'none' || isClosing) return

    if (prefersReducedMotion()) {
      finishClose()
      return
    }

    setIsClosing(true)
    closeTimer.current = window.setTimeout(finishClose, 180)
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
    closeOverlay()
  }

  function changeQuantity(productId: string, nextQuantity: number) {
    const product = products.find((item) => item.id === productId)
    if (!product) return

    if (nextQuantity < 1) {
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
    isClosing,
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
