import { useShop } from '../context/ShopContext'

export function StoreHeader() {
  const { itemCount, openCart } = useShop()

  return (
    <header className="hero">
      <div className="hero-fx" aria-hidden="true">
        <span className="orb orb-cyan" />
        <span className="orb orb-violet" />
        <span className="orb orb-mint" />
        <span className="grid-floor" />
      </div>
      <div className="hero-bar">
        <p className="brand">ShopFlow IA</p>
        <button type="button" className="cart-trigger" onClick={openCart}>
          Carrito
          <span className="cart-count" aria-label={`${itemCount} productos en el carrito`}>
            {itemCount}
          </span>
        </button>
      </div>

      <div className="hero-copy">
        <p className="eyebrow">Gadgets para estudiantes</p>
        <h1>Equipa tu semestre sin complicarte.</h1>
        <p>
          Audífonos, accesorios y herramientas de estudio con precios en soles, stock visible y un carrito que calcula el
          total al instante.
        </p>
        <a className="btn btn-primary" href="#catalogo">
          Ver catálogo
        </a>
      </div>
    </header>
  )
}
