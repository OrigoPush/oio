'use client'

import { useEffect, useRef, useState, forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { getProjectRoute } from '@/lib/projects'

interface ProjectCardProps {
  id: number
  title: string
  image: string
  projectId?: string
  description?: string
  year?: string
  country?: string
  type?: string
  tools?: string[]
  behanceUrl: string | null
}

export function ProjectCard({
  title,
  image,
  projectId,
  description,
  year,
  country,
  type,
  tools,
}: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const locationInfo = [country, year].filter(Boolean).join(', ')

  const getLandingLogo = (id: string): string => {
    const logoMap: Record<string, string> = {
      push: '/logo_push_landing.png',
      catalonia: '/logo_catalonia_landing.png',
      popeyes: '/logo_popeyes_landing.png',
      rbi: '/logo_rbi_landing.png',
      rmh: '/logo_rmh_landing.png',
      rank: '/logo_rmh_landing.png',
      santalucia: '/logo_santalucia_landing.png',
      talengo: '/logo_talengo_landing.png',
      bk: '/logo_bk_landing.png',
    }
    return logoMap[id] || image
  }

  // Logo en hover (Push, RBI)
  const hoverLogos: Record<string, string> = {
    push: '/logo_push.png',
    rbi: '/logo_rbi.png',
  }

  // Proyectos que necesitan filtro invert en el logo (no tienen versión blanca)
  const needsInvertFilter = ['santalucia'].includes(projectId || '')

  // Para Burger King/Popeyes: dos logos
  const isBK = projectId === 'bk'
  const bkLogos = {
    landing: ['/logo_bk_landing.png', '/logo_popeyes_landing.png'],
    hover: ['/logo_bk_landing.png', '/logo_popeyes_landing.png'], // Usar los mismos por ahora
  }

  const logoPath =
    projectId && isHovered && hoverLogos[projectId]
      ? hoverLogos[projectId]
      : projectId
      ? getLandingLogo(projectId)
      : image

  // Forzar textos blancos en hover solo para estos proyectos
  const forceWhiteHover = ['push', 'rbi', 'santalucia'].includes(projectId || '')
  
  // Forzar textos oscuros en hover solo para estos proyectos
  const forceDarkHover = ['catalonia', 'bk', 'rank', 'rmh', 'talengo'].includes(projectId || '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current)
    }
  }, [])

  const projectRoute = projectId ? getProjectRoute(projectId) : '#'

  return (
    <Link
      href={projectRoute}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative group w-full overflow-hidden block',
        'flex flex-col',
        // Padding vertical que coincide con los márgenes laterales de LayoutContainer
        'py-4 lg:py-6',
        // Altura mínima: mobile auto, desktop 380px (equilibrado)
        'lg:min-h-[380px]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]',
        'transition-all duration-[700ms]',
        forceWhiteHover && 'card-hover-white',
        'cursor-pointer'
      )}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label={`Ver proyecto ${title}`}
    >
      <div ref={cardRef} className="absolute inset-0 pointer-events-none" />
      {/* Fondo de color en hover - cubre TODA la superficie de línea a línea */}
      <div className="absolute inset-0 z-0 bg-[var(--hover-color)] opacity-0 group-hover:opacity-100 transition-all duration-300" />

      {/* CONTENIDO: estructura balanceada */}
      <div 
        className={cn(
          "relative z-10 flex flex-1 flex-col justify-between px-4 lg:px-6",
          forceWhiteHover && "[&_*]:group-hover:!text-white [&_*]:group-hover:![stroke:white]",
          forceDarkHover && "[&_*]:group-hover:!text-[#111111] [&_*]:group-hover:![stroke:#111111]"
        )}
      >
        {/* BLOQUE A – TOP: Título + Descripción (compacto) */}
        <div className="flex flex-col">
          <h3
            className={cn(
              'font-manrope font-bold tracking-[-0.02em] transition-colors duration-300',
              'text-2xl lg:text-5xl leading-tight',
              'card-base-title',
              forceWhiteHover ? 'group-hover:!text-white' : forceDarkHover ? 'group-hover:!text-[#111111]' : 'group-hover:text-white'
            )}
          >
            {title}
          </h3>

          {description && (
            <p
              className={cn(
                'text-neutral-700 text-sm leading-relaxed line-clamp-2 md:line-clamp-none',
                'mt-1 font-manrope transition-colors duration-300',
                'card-base-desc',
                forceWhiteHover ? 'group-hover:!text-white group-hover:!opacity-100' : forceDarkHover ? 'group-hover:!text-[#111111] group-hover:!opacity-100' : 'group-hover:text-white group-hover:opacity-90'
              )}
            >
              {description}
            </p>
          )}

          {/* CTA siempre visible */}
          <div
            className={cn(
              'flex items-center gap-2 uppercase text-[10px] lg:text-xs tracking-wider font-medium font-manrope mt-3',
              'transition-all duration-300',
              'card-base-content',
              'text-neutral-600',
              forceWhiteHover ? 'group-hover:!text-white' : forceDarkHover ? 'group-hover:!text-[#111111]' : 'group-hover:text-white'
            )}
          >
            <span>Caso de uso</span>
            <ArrowUpRight className={cn(
              'w-3 h-3 lg:w-4 lg:h-4 transition-all duration-300',
              forceWhiteHover ? 'group-hover:!text-white group-hover:!stroke-white' : forceDarkHover ? 'group-hover:!text-[#111111] group-hover:!stroke-[#111111]' : 'group-hover:text-white'
            )} />
          </div>
        </div>

        {/* Separación entre bloque A y B: 32px */}
        <div className="h-8" />

        {/* LÍNEA DIVISORIA */}
        <div
          className={cn(
            'w-full h-px transition-colors duration-300',
            forceWhiteHover
              ? 'bg-black/10 group-hover:bg-white/40'
              : 'bg-black/10 group-hover:bg-black/10'
          )}
        />

        {/* BLOQUE B – BOTTOM: baseline alignment */}
        <div
          className={cn(
            'pt-3 relative', // pt-3 (12px), padding bottom viene del contenedor principal
            'flex flex-col lg:flex-row gap-4 lg:gap-6'
          )}
        >
          {/* Grid con Project Info y Roles/Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 flex-1">
            <div className="flex flex-col gap-1">
              <span
                className={cn(
                  'text-[9px] lg:text-[10px] uppercase tracking-[0.12em] font-bold font-manrope transition-colors duration-300',
                  'card-base-label',
                  forceWhiteHover ? 'group-hover:!text-white group-hover:!opacity-100' : forceDarkHover ? 'group-hover:!text-[#111111] group-hover:!opacity-100' : 'group-hover:text-white group-hover:opacity-60'
                )}
              >
                Info proyecto
              </span>
              <div
                className={cn(
                  'text-xs lg:text-sm leading-[1.4] font-manrope transition-colors duration-300',
                  'card-base-content',
                  forceWhiteHover ? 'group-hover:!text-white' : forceDarkHover ? 'group-hover:!text-[#111111]' : 'group-hover:text-white'
                )}
              >
                {type && <span className={cn('block', forceWhiteHover && 'group-hover:!text-white', forceDarkHover && 'group-hover:!text-[#111111]')}>{type}</span>}
                {locationInfo && (
                  <span className={cn(
                    'block transition-colors duration-300 card-base-content',
                    forceWhiteHover ? 'group-hover:!text-white' : forceDarkHover ? 'group-hover:!text-[#111111]' : 'group-hover:text-white'
                  )}>
                    {locationInfo}
                  </span>
                )}
              </div>
            </div>

            {tools && tools.length > 0 && (
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    'text-[9px] lg:text-[10px] uppercase tracking-[0.12em] font-bold font-manrope transition-colors duration-300',
                    'card-base-label',
                    forceWhiteHover ? 'group-hover:!text-white group-hover:!opacity-100' : forceDarkHover ? 'group-hover:!text-[#111111] group-hover:!opacity-100' : 'group-hover:text-white group-hover:opacity-60'
                  )}
                >
                  Herramientas
                </span>
                <div
                  className={cn(
                    'text-xs lg:text-sm leading-[1.4] font-manrope transition-colors duration-300',
                    'card-base-content',
                    forceWhiteHover ? 'group-hover:!text-white' : forceDarkHover ? 'group-hover:!text-[#111111]' : 'group-hover:text-white'
                  )}
                >
                  {tools.join(', ')}
                </div>
              </div>
            )}
          </div>

          {/* LOGO: contenedor con altura fija (24-32px), alineado al baseline */}
          {isBK ? (
            <div className="flex items-baseline h-6 lg:h-8 flex-shrink-0 lg:ml-auto gap-2">
              <img
                src={bkLogos.landing[0]}
                alt="Burger King"
                className={cn(
                  'object-contain w-auto h-full opacity-80 transition-all duration-300',
                  'group-hover:opacity-90'
                )}
              />
              <img
                src={bkLogos.landing[1]}
                alt="Popeyes"
                className={cn(
                  'object-contain w-auto h-full opacity-80 transition-all duration-300',
                  'group-hover:opacity-90'
                )}
              />
            </div>
          ) : logoPath ? (
            <div className="flex items-baseline h-6 lg:h-8 flex-shrink-0 lg:ml-auto">
              <img
                src={logoPath}
                alt={title}
                className={cn(
                  'object-contain w-auto h-full opacity-80 transition-all duration-300',
                  forceWhiteHover ? 'group-hover:opacity-100' : 'group-hover:opacity-90',
                  needsInvertFilter && 'group-hover:invert'
                )}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
