import { CATEGORY_LABELS } from '../lib/catalog'
import type { CatalogFilter } from '../types'
import { useShop } from '../context/ShopContext'

const FILTERS: CatalogFilter[] = ['todos', 'audio', 'accesorios', 'computacion', 'gaming', 'ofertas']

export function CatalogFilters() {
  const { query, setQuery, category, setCategory, visibleProducts } = useShop()

  return (
    <section className="filters" aria-label="Búsqueda y filtros del catálogo">
      <label className="search-field">
        <span className="sr-only">Buscar productos por nombre</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busca por nombre: audífonos, mouse, webcam..."
          autoComplete="off"
        />
      </label>

      <div className="filter-row" role="group" aria-label="Filtrar por categoría">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={category === filter}
            className={`chip ${category === filter ? 'is-active' : ''}`}
            onClick={() => setCategory(filter)}
          >
            {CATEGORY_LABELS[filter]}
          </button>
        ))}
      </div>

      <p className="results-count" role="status">
        {visibleProducts.length === 1 ? '1 producto' : `${visibleProducts.length} productos`}
      </p>
    </section>
  )
}
