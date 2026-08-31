import { formatSoles } from '../lib/catalog'
import { useShop } from '../context/ShopContext'
import { ProductImage } from './ProductImage'

export function CartDrawer() {
  const {
    overlay,
    cart,
    catalog,
    cartTotal,
    closeOverlay,
    changeQuantity,
    removeFromCart,
    openCheckout,
  } = useShop()

  if (overlay !== 'cart') return null

  return (
    <div className="overlay" role="presentation" onClick={closeOverlay}>
      <aside
        className="drawer panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="drawer-head">
          <h2 id="cart-title">Tu carrito</h2>
          <button type="button" className="icon-close" onClick={closeOverlay} aria-label="Cerrar carrito">
            ×
          </button>
        </header>

        {cart.length === 0 ? (
          <p className="empty-copy">Aún no hay productos. Explora el catálogo y agrega lo que necesites para el semestre.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => {
              const product = catalog.find((entry) => entry.id === item.productId)
              if (!product) return null

              return (
                <li key={item.productId} className="cart-item">
                  <ProductImage src={product.image} alt="" className="cart-thumb" />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{formatSoles(product.price)}</p>
                    <div className="qty-control compact">
                      <button
                        type="button"
                        onClick={() => changeQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Disminuir ${product.name}`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => changeQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= product.stock}
                        aria-label={`Aumentar ${product.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-side">
                    <strong>{formatSoles(product.price * item.quantity)}</strong>
                    <button type="button" className="link-danger" onClick={() => removeFromCart(item.productId)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        <footer className="drawer-foot">
          <div className="totals">
            <span>Subtotal</span>
            <strong>{formatSoles(cartTotal)}</strong>
            <span>Total</span>
            <strong>{formatSoles(cartTotal)}</strong>
          </div>
          <button type="button" className="btn btn-primary" disabled={cart.length === 0} onClick={openCheckout}>
            Finalizar pedido
          </button>
          <p className="fine-print">Simulación educativa. No se solicitan datos de pago.</p>
        </footer>
      </aside>
    </div>
  )
}
