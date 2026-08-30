import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [failed, setFailed] = useState(src.trim() === '')

  if (failed) {
    return (
      <div className={`image-fallback ${className ?? ''}`} role="img" aria-label={`${alt} (sin imagen)`}>
        <span>Imagen no disponible</span>
      </div>
    )
  }

  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />
}
