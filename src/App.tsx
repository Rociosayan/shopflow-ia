import { useEffect } from 'react'
import { AiAssistant } from './components/AiAssistant'
import { CartDrawer } from './components/CartDrawer'
import { CatalogFilters } from './components/CatalogFilters'
import { CheckoutSummary } from './components/CheckoutSummary'
import { ProductCard } from './components/ProductCard'
import { ProductModal } from './components/ProductModal'
import { StoreHeader } from './components/StoreHeader'
import { ShopProvider, useShop } from './context/ShopContext'
import './App.css'

function ShopShell() {
  const { visibleProducts, overlay, closeOverlay, openProduct, toast } = useShop()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && overlay !== 'none') {
        closeOverlay()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [overlay, closeOverlay])

  useEffect(() => {
    document.body.style.overflow = overlay === 'none' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [overlay])

  return (
    <div className="store">
      <div className="page-fx" aria-hidden="true" />
      <StoreHeader />

      <main id="catalogo" className="catalog">
        <CatalogFilters />

        {visibleProducts.length === 0 ? (
          <p className="empty-copy catalog-empty" role="status">
            No hay coincidencias para esta búsqueda o filtro. Prueba con otro nombre o elige
            <strong> Todos</strong> para ver el catálogo completo.
          </p>
        ) : (
          <div className="grid">
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} onView={openProduct} />
            ))}
          </div>
        )}
      </main>

      <ProductModal />
      <CartDrawer />
      <CheckoutSummary />
      <AiAssistant />

      {toast && (
        <p className="toast" role="status">
          {toast}
        </p>
      )}
    </div>
  )
}

function App() {
  return (
    <ShopProvider>
      <ShopShell />
    </ShopProvider>
  )
}

export default App
