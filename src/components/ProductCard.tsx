import { CATEGORY_LABELS, discountPercent, formatSoles, hasDiscount } from '../lib/catalog'
import type { Product } from '../types'
import { ProductImage } from './ProductImage'

interface ProductCardProps {
  product: Product
  index?: number
  onView: (product: Product) => void
}

export function ProductCard({ product, index = 0, onView }: ProductCardProps) {
  const discounted = hasDiscount(product)
  const outOfStock = product.stock === 0
  const percent = discountPercent(product)

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${index * 40}ms` }}
      aria-labelledby={`product-${product.id}-name`}
    >
      <div className="card-media">
        <ProductImage src={product.image} alt="" />
        {discounted && (
          <span className="badge badge-sale" aria-label={`Descuento del ${percent} por ciento`}>
            −{percent}%
          </span>
        )}
      </div>

      <div className="card-body">
        <p className="card-category">{CATEGORY_LABELS[product.category]}</p>
        <h3 id={`product-${product.id}-name`}>{product.name}</h3>
        <div className="card-price">
          <strong>{formatSoles(product.price)}</strong>
          {discounted && <s aria-label={`Precio anterior ${formatSoles(product.originalPrice)}`}>{formatSoles(product.originalPrice)}</s>}
        </div>
        <p className={`stock-line ${outOfStock ? 'is-out' : ''}`}>
          {outOfStock ? 'Sin stock' : `${product.stock} disponibles`}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onView(product)}
          aria-label={`Ver producto: ${product.name}`}
        >
          Ver producto
        </button>
      </div>
    </article>
  )
}
