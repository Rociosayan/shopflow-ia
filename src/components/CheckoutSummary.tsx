import { formatSoles } from '../lib/catalog'
import { useShop } from '../context/ShopContext'

export function CheckoutSummary() {
  const { overlay, cart, catalog, cartTotal, closeOverlay } = useShop()

  if (overlay !== 'checkout') return null

  return (
    <div className="overlay" role="presentation" onClick={closeOverlay}>
      <div
        className="modal panel checkout"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="icon-close" onClick={closeOverlay} aria-label="Cerrar resumen">
          ×
        </button>
        <h2 id="checkout-title">Resumen del pedido</h2>
        <p className="modal-copy">Pedido simulado para el laboratorio. No se procesa ningún pago.</p>
        <ul className="summary-list">
          {cart.map((item) => {
            const product = catalog.find((entry) => entry.id === item.productId)
            if (!product) return null
            return (
              <li key={item.productId}>
                <span>
                  {product.name} × {item.quantity}
                </span>
                <strong>{formatSoles(product.price * item.quantity)}</strong>
              </li>
            )
          })}
        </ul>
        <p className="summary-total">
          Total a pagar (simulado): <strong>{formatSoles(cartTotal)}</strong>
        </p>
        <button type="button" className="btn btn-primary" onClick={closeOverlay}>
          Volver al catálogo
        </button>
      </div>
    </div>
  )
}
