import { useEffect, useId, useState } from 'react'
import { CATEGORY_LABELS, discountPercent, formatSoles, hasDiscount } from '../lib/catalog'
import { useShop } from '../context/ShopContext'
import { ProductImage } from './ProductImage'

export function ProductModal() {
  const { overlay, selectedProduct, closeOverlay, addToCart } = useShop()
  const titleId = useId()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setQuantity(1)
  }, [selectedProduct?.id])

  if (overlay !== 'product' || !selectedProduct) return null

  const discounted = hasDiscount(selectedProduct)
  const outOfStock = selectedProduct.stock === 0
  const max = Math.max(selectedProduct.stock, 1)

  return (
    <div className="overlay" role="presentation" onClick={closeOverlay}>
      <div
        className="modal panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="icon-close" onClick={closeOverlay} aria-label="Cerrar detalle">
          ×
        </button>

        <ProductImage src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />

        <div className="modal-body">
          <p className="card-category">{CATEGORY_LABELS[selectedProduct.category]}</p>
          <h2 id={titleId}>{selectedProduct.name}</h2>
          <div className="card-price">
            <strong>{formatSoles(selectedProduct.price)}</strong>
            {discounted && (
              <>
                <s>{formatSoles(selectedProduct.originalPrice)}</s>
                <span className="badge badge-sale">−{discountPercent(selectedProduct)}%</span>
              </>
            )}
          </div>
          <p className="modal-copy">{selectedProduct.description}</p>
          <p className={`stock-line ${outOfStock ? 'is-out' : ''}`}>
            {outOfStock ? 'Sin stock por ahora' : `${selectedProduct.stock} unidades disponibles`}
          </p>

          <div className="qty-row">
            <label htmlFor="product-qty">Cantidad</label>
            <div className="qty-control">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={outOfStock || quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <input
                id="product-qty"
                type="number"
                min={1}
                max={max}
                value={quantity}
                disabled={outOfStock}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  if (Number.isNaN(next)) return
                  setQuantity(Math.min(selectedProduct.stock, Math.max(1, next)))
                }}
              />
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.min(selectedProduct.stock, value + 1))}
                disabled={outOfStock || quantity >= selectedProduct.stock}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            disabled={outOfStock}
            onClick={() => addToCart(selectedProduct.id, quantity)}
          >
            {outOfStock ? 'Producto agotado' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}
