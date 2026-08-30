import { useMemo, useState } from 'react'
import { products } from '../data/products'
import { formatSoles, hasDiscount } from '../lib/catalog'
import { useShop } from '../context/ShopContext'
import type { Product } from '../types'

type PromptId = 'under100' | 'study' | 'offers'

interface Recommendation {
  intro: string
  picks: Product[]
}

const PROMPTS: { id: PromptId; label: string }[] = [
  { id: 'under100', label: '¿Qué tienes por menos de S/ 100?' },
  { id: 'study', label: '¿Qué me recomiendas para estudiar?' },
  { id: 'offers', label: 'Muéstrame las ofertas' },
]

function recommend(prompt: PromptId): Recommendation {
  if (prompt === 'under100') {
    return {
      intro: 'Según el catálogo local, estos gadgets cuestan menos de S/ 100:',
      picks: products.filter((item) => item.price < 100 && item.stock > 0).slice(0, 3),
    }
  }

  if (prompt === 'study') {
    const studyIds = new Set(['audifonos-campus', 'soporte-laptop', 'webcam-clases', 'hub-usbc'])
    return {
      intro: 'Para jornadas de estudio recomiendo piezas cómodas y prácticas del inventario local:',
      picks: products.filter((item) => studyIds.has(item.id) && item.stock > 0).slice(0, 3),
    }
  }

  return {
    intro: 'Estas son las ofertas activas (precio actual menor al original):',
    picks: products.filter((item) => hasDiscount(item) && item.stock > 0).slice(0, 3),
  }
}

export function AiAssistant() {
  const { overlay, openAssistant, closeOverlay, openProduct } = useShop()
  const [prompt, setPrompt] = useState<PromptId | null>(null)

  const recommendation = useMemo(() => (prompt ? recommend(prompt) : null), [prompt])

  return (
    <>
      <button type="button" className="fab" onClick={openAssistant}>
        Asistente IA
      </button>

      {overlay === 'assistant' && (
        <div className="overlay" role="presentation" onClick={closeOverlay}>
          <aside
            className="assistant panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="assistant-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="drawer-head">
              <div>
                <p className="eyebrow">Simulación educativa</p>
                <h2 id="assistant-title">Asistente IA</h2>
              </div>
              <button type="button" className="icon-close" onClick={closeOverlay} aria-label="Cerrar asistente">
                ×
              </button>
            </header>

            <p className="modal-copy">
              Hola. Puedo sugerirte productos del catálogo local de ShopFlow IA. No hay conexión a un modelo externo ni a APIs.
            </p>

            <div className="prompt-list">
              {PROMPTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`chip ${prompt === item.id ? 'is-active' : ''}`}
                  onClick={() => setPrompt(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {recommendation && (
              <div className="recommendation">
                <p>{recommendation.intro}</p>
                <ul>
                  {recommendation.picks.map((product) => (
                    <li key={product.id}>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{formatSoles(product.price)}</span>
                      </div>
                      <button type="button" className="btn btn-ghost" onClick={() => openProduct(product)}>
                        Ver producto
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  )
}
