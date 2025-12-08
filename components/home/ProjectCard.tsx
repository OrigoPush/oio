'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
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
  projectId,
  description,
  year,
  country,
  type,
  tools,
}: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const locationInfo = [country, year].filter(Boolean).join(', ')

  // (logos eliminados)

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
    <div
      className={cn(
        'relative group w-full overflow-hidden',
        'flex flex-col',
        // Padding vertical que coincide con los márgenes laterales de LayoutContainer
        'py-3 lg:py-6',
        // Altura mínima: mobile auto, desktop 380px (equilibrado)
        'lg:min-h-[380px]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]',
        'transition-all duration-[700ms]',
        forceWhiteHover && 'card-hover-white'
      )}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div ref={cardRef} className="absolute inset-0 pointer-events-none" />
      {/* Fondo de color en hover - cubre TODA la superficie de línea a línea */}
      <div className="absolute inset-0 z-0 bg-[var(--hover-color)] opacity-0 group-hover:opacity-100 transition-all duration-300" />

      {/* CONTENIDO: estructura balanceada */}
      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col px-4 lg:px-6 space-y-3 lg:space-y-0 lg:justify-between",
          forceWhiteHover && "[&_*]:group-hover:!text-white [&_*]:group-hover:![stroke:white]",
          forceDarkHover && "[&_*]:group-hover:!text-[#111111] [&_*]:group-hover:![stroke:#111111]"
        )}
      >
        {/* BLOQUE A – TOP: Título + Descripción (compacto) */}
        <div className="flex flex-col space-y-2">
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
                'font-manrope transition-colors duration-300',
                'card-base-desc',
                forceWhiteHover ? 'group-hover:!text-white group-hover:!opacity-100' : forceDarkHover ? 'group-hover:!text-[#111111] group-hover:!opacity-100' : 'group-hover:text-white group-hover:opacity-90'
              )}
            >
              {description}
            </p>
          )}

        </div>

        <div className="space-y-3">
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
          <div className="pt-3 relative">
            <div className="flex flex-col space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:items-center">
              {/* Info proyecto */}
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

              {/* Herramientas */}
              <div className="flex flex-col gap-1 text-left md:items-start md:justify-center md:place-self-center">
                {tools && tools.length > 0 && (
                  <>
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
                  </>
                )}
              </div>

              {/* CTA */}
              <div className="w-full flex justify-end md:justify-end">
                <Link
                  href={projectRoute}
                  className={cn(
                    'uppercase tracking-wide font-bold text-sm md:text-base cursor-pointer hover:opacity-80 transition',
                    'font-manrope flex items-center gap-2 text-right self-end text-neutral-800',
                    'card-base-content',
                    forceWhiteHover
                      ? 'group-hover:!text-white'
                      : forceDarkHover
                        ? 'group-hover:!text-[#111111]'
                        : 'group-hover:text-white'
                  )}
                  aria-label={`Ver proyecto ${title}`}
                >
                  <span className="font-bold whitespace-nowrap">Ver</span>
                  <span className="text-base">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* logos removidos */}
        </div>
      </div>
    </div>
  )
}
