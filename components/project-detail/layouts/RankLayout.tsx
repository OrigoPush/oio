'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { LayoutContainer } from '@/components/ui/layout-container'
import { ProjectCTA } from '@/components/ui/project-cta'
import { cn } from '@/lib/utils'

interface RankLayoutProps {
  projectId: string
  title: string
  description: string
  role?: string
  year?: string
  country?: string
  tools?: string[]
  website?: string
  backgroundColor: string
  frame7BackgroundImage?: string
  sticker?: React.ReactNode | null
  animationClasses?: string
}

export function RankLayout({
  projectId,
  title,
  description,
  role,
  year,
  country,
  tools,
  website,
  backgroundColor,
  frame7BackgroundImage,
  sticker,
  animationClasses = '',
}: RankLayoutProps) {
  const location = useMemo(
    () => [country, year].filter(Boolean).join(' · '),
    [country, year]
  )

  // Get brand color from hover color
  const brandColor = '#F1965B'
  
  // Check if this is the rank project
  const isRank = projectId === 'rank'

  return (
    <div
      className={`min-h-screen w-full bg-white text-black overflow-y-auto overflow-x-hidden project-detail ${animationClasses}`}
    >
      {/* HERO + BLOQUE COLOR */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* HERO - Fondo sólido + Astronauta */}
        <div className="relative h-[72vh] overflow-hidden" style={{ backgroundColor: brandColor }}>
          {/* Astronauta */}
          <Image
            src="/astronauta.png"
            alt="Astronauta Rank Me Higher"
            width={600}
            height={600}
            className="absolute inset-0 mx-auto top-[18%] md:top-[20%] w-full max-w-[480px] object-contain pointer-events-none"
            priority
          />

          {/* CASE + CTA */}
          <div className="absolute bottom-6 left-0 right-0 z-10">
            <LayoutContainer>
              <div className="flex items-center justify-between">
                {/* CASE */}
                <div className="flex items-center gap-2 opacity-80">
                  <span className={cn("text-[12px] uppercase tracking-[0.18em]", isRank ? "text-[#1A1A1A]" : "text-white")}>
                    CASE
                  </span>
                  <span className={cn("h-px w-8", isRank ? "bg-[#1A1A1A]/40" : "bg-white/40")} />
                  <span className={cn("text-xs", isRank ? "text-[#1A1A1A]" : "text-white")}>{title}</span>
                </div>

                {/* CTA SITIO WEB */}
                {website && (
                  <div className="flex items-center">
                    <ProjectCTA 
                      label="Sitio web" 
                      href={website} 
                      className={cn(isRank ? "text-[#1A1A1A] hover:text-[#1A1A1A]/70" : "text-white hover:text-white/70")} 
                    />
                  </div>
                )}
              </div>
            </LayoutContainer>
          </div>
        </div>

        {/* BLOQUE COLOR */}
        <div className="w-full" style={{ backgroundColor: brandColor }}>
          <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
            {/* METADATA */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-10 md:mb-20">
              <div>
                <p className="uppercase tracking-[0.18em] text-[10px] text-[#1A1A1A]/70 mb-2">
                  Project Info
                </p>
                {country && (
                  <p className="text-[16px] text-[#1A1A1A] leading-[1.5]">{country}</p>
                )}
                {!country && location && (
                  <p className="text-[16px] text-[#1A1A1A] leading-[1.5]">{location}</p>
                )}
              </div>

              {role && (
                <div>
                  <p className="uppercase tracking-[0.18em] text-[10px] text-[#1A1A1A]/70 mb-2">
                    Role
                  </p>
                  <p className="text-[16px] text-[#1A1A1A] leading-[1.5]">{role}</p>
                </div>
              )}

              {tools && tools.length > 0 && (
                <div>
                  <p className="uppercase tracking-[0.18em] text-[10px] text-[#1A1A1A]/70 mb-2">
                    Tools
                  </p>
                  <p className="text-[16px] text-[#1A1A1A] leading-[1.5]">{tools.join(', ')}</p>
                </div>
              )}

              {year && (
                <div>
                  <p className="uppercase tracking-[0.18em] text-[10px] text-[#1A1A1A]/70 mb-2">
                    Year
                  </p>
                  <p className="text-[16px] text-[#1A1A1A] leading-[1.5]">{year}</p>
                </div>
              )}
            </div>

            {/* SCROLL INDICATOR */}
            <div className="flex justify-center mb-10 md:mb-24">
              <div className="text-center">
                <p className="text-[#1A1A1A]/70 text-[10px] uppercase tracking-[0.18em]">
                  Scroll
                </p>
                <span className="block text-[#1A1A1A]/70 mt-1 text-lg">⌄</span>
              </div>
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-[#1A1A1A] text-[64px] md:text-[80px] lg:text-[96px] leading-[0.95] font-normal mb-8 md:mb-12 max-w-[1100px]">
              {title}
            </h1>

            {/* SUBTÍTULO */}
            <p className="text-[#1A1A1A]/80 text-[18px] md:text-[20px] leading-[1.5] max-w-[640px] mb-10 md:mb-16">
              {description}
            </p>

            <div className="flex justify-center mb-10 md:mb-24">
              <div className="w-full max-w-4xl">
                <Image
                  src="/rmh_01.png"
                  alt="Push mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* IMAGEN 2 */}
            <div className="flex justify-center mb-10 md:mb-24">
              <div className="w-full max-w-4xl">
                <Image
                  src="/rmh_03.png"
                  alt="Push mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </LayoutContainer>
        </div>
      </section>

      {/* BLOQUE EDITORIAL */}
      <section className="w-full bg-[#F5F5F5] py-14 md:py-24">
        <LayoutContainer>
          {/* Título editorial */}
          <h2 className="text-black font-semibold leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-8 md:mb-12">
            Diseñando experiencias digitales que elevan la marca.
          </h2>

          {/* Subtítulo editorial */}
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-10 md:mb-16">
            Desde la arquitectura de información hasta la implementación visual,
            construimos una experiencia web que refleja la identidad y los valores
            de Rank Me Higher con claridad y resultados medibles.
          </p>

          {/* GRID 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-10 md:mb-16">
            <div className="flex justify-center mb-10 md:mb-0">
              <div className="w-full max-w-4xl">
                <Image
                  src="/rmh_02.png"
                  alt="Push mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            <div className="flex justify-center mb-10 md:mb-0">
              <div className="w-full max-w-4xl">
                <Image
                  src="/rmh_04.png"
                  alt="Push mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </LayoutContainer>
      </section>

      {/* BLOQUE CONTACTO */}
      <section className="w-full bg-black text-white py-14 md:py-24">
        <LayoutContainer>
          <div className="flex flex-col items-start">
            {/* Título */}
            <h2 className="text-white font-semibold leading-[0.9] text-[54px] md:text-[110px] tracking-tight mb-8 md:mb-12">
              ¿Quieres que<br />trabajemos<br />juntos?
            </h2>

            {/* Subtítulo */}
            <p className="text-white/70 text-[18px] md:text-[20px] leading-[1.5] max-w-2xl mb-8 md:mb-12">
            Estrategia, funcionalidad y experiencia para equipos que buscan impacto.
            </p>

            {/* CTA Email */}
            <a
              href="mailto:rodrigo@oi0.co"
              className="text-[16px] md:text-[18px] uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors"
            >
              rosanchez92@gmail.com
            </a>
          </div>
          </LayoutContainer>
      </section>
    </div>
  )
}
