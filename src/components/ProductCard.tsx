import { CATEGORY_LABELS, discountPercent, formatSoles, hasDiscount } from '../lib/catalog'
import type { Product } from '../types'
import { ProductImage } from './ProductImage'

interface ProductCardProps {
  product: Product
  index: number
  onView: (product: Product) => void
}

export function ProductCard({ product, index, onView }: ProductCardProps) {
  const discounted = hasDiscount(product)
  const outOfStock = product.stock === 0

  return (
    <article className="product-card" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="card-media">
        <ProductImage src={product.image} alt={product.name} />
        {discounted && <span className="badge badge-sale">−{discountPercent(product)}%</span>}
        {outOfStock && <span className="badge badge-stock">Agotado</span>}
      </div>

      <div className="card-body">
        <p className="card-category">{CATEGORY_LABELS[product.category]}</p>
        <h3>{product.name}</h3>
        <div className="card-price">
          <strong>{formatSoles(product.price)}</strong>
          {discounted && <s>{formatSoles(product.originalPrice)}</s>}
        </div>
        <p className={`stock-line ${outOfStock ? 'is-out' : ''}`}>
          {outOfStock ? 'Sin stock' : `${product.stock} disponibles`}
        </p>
        <button type="button" className="btn btn-primary" onClick={() => onView(product)}>
          Ver producto
        </button>
      </div>
    </article>
  )
}
