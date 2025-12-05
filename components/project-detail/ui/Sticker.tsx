'use client'

interface StickerProps {
  src: string
  alt?: string
}

/**
 * Sticker component para proyectos confidenciales
 * Posicionado absolutamente en el lado derecho, centrado verticalmente
 */
export function Sticker({ src, alt = 'Confidential sticker' }: StickerProps) {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none max-[360px]:relative max-[360px]:right-auto max-[360px]:top-auto max-[360px]:translate-y-0 max-[360px]:mx-auto max-[360px]:mt-6">
      <img
        src={src}
        alt={alt}
        className="w-[35%] max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] h-auto"
      />
    </div>
  )
}

