'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { LayoutContainer } from '@/components/ui/layout-container'
import { ProjectCTA } from '@/components/ui/project-cta'
import { BrandOverviewCatalonia } from './BrandOverviewCatalonia'

interface CataloniaLayoutProps {
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

export function CataloniaLayout({
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
}: CataloniaLayoutProps) {
  const location = useMemo(
    () => [country, year].filter(Boolean).join(' · '),
    [country, year]
  )

  return (
    <div
      className={`min-h-screen w-full bg-white text-black overflow-y-auto overflow-x-hidden project-detail ${animationClasses}`}
    >
      {/* HERO + BLOQUE COLOR */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* SKY */}
        <div className="relative h-[72vh] overflow-hidden">
          {frame7BackgroundImage && (
            <Image
            src="/catalonia_ruido.png"
            alt="Catalonia hero"
            fill
            priority
            className="object-cover"
          />          
          )}

          {/* CASE + CTA */}
          <div className="absolute bottom-6 left-0 right-0">
            <LayoutContainer>
              <div className="flex items-center justify-between">
                {/* CASE */}
                <div className="flex items-center gap-2 opacity-80">
                  <span className="text-[12px] uppercase tracking-[0.18em]">
                    CASO DE ESTUDIO
                  </span>
                  <span className="h-px w-8 bg-black/40" />
                  <span className="text-xs">{title}</span>
                </div>

                {/* CTA SITIO WEB */}
                {website && (
                  <div className="flex items-center">
                    <ProjectCTA label="Sitio web" href={website} />
                  </div>
                )}
              </div>
            </LayoutContainer>
          </div>
        </div>

        {/* BLOQUE COLOR */}
        <div className="w-full" style={{ backgroundColor: '#F6D57A' }}>
          <LayoutContainer className="pt-12 pb-[160px]">
            {/* METADATA */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-[80px]">
              <div>
                <p className="uppercase tracking-[0.18em] text-[10px] text-black opacity-80 mb-2">
                  Info proyecto
                </p>
                {country && (
                  <p className="text-[16px] text-black leading-[1.5]">{country}</p>
                )}
                {!country && location && (
                  <p className="text-[16px] text-black leading-[1.5]">{location}</p>
                )}
              </div>

              {role && (
                <div>
                  <p className="uppercase tracking-[0.18em] text-[10px] text-black opacity-80 mb-2">
                    Rol
                  </p>
                  <p className="text-[16px] text-black leading-[1.5]">{role}</p>
                </div>
              )}

              {tools && tools.length > 0 && (
                <div>
                  <p className="uppercase tracking-[0.18em] text-[10px] text-black opacity-80 mb-2">
                    Herramientas
                  </p>
                  <p className="text-[16px] text-black leading-[1.5]">{tools.join(', ')}</p>
                </div>
              )}

              {year && (
                <div>
                  <p className="uppercase tracking-[0.18em] text-[10px] text-black opacity-80 mb-2">
                    Año
                  </p>
                  <p className="text-[16px] text-black leading-[1.5]">{year}</p>
                </div>
              )}
            </div>

            {/* SCROLL INDICATOR */}
            <div className="flex justify-center mb-[120px]">
              <div className="text-center">
                <p className="text-black/70 text-[10px] uppercase tracking-[0.18em]">
                  Scroll
                </p>
                <span className="block text-black/70 mt-1 text-lg">⌄</span>
              </div>
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-black text-[64px] md:text-[80px] lg:text-[96px] leading-[0.95] font-normal mb-[48px] max-w-[1100px]">
              {title}
            </h1>

            {/* SUBTÍTULO */}
            <p className="text-black/80 text-[18px] md:text-[20px] leading-[1.5] max-w-[640px] mb-[80px]">
              {description}
            </p>

            {/* MOCKUP PRINCIPAL */}
            <div className="flex justify-center mb-[80px] md:mb-[120px]">
              <div className="w-full max-w-4xl">
                <Image
                  src="/catalonia_mockup.png"
                  alt="Catalonia mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* IMAGEN 2 */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <Image
                  src="/catalonia_mockup_02.png"
                  alt="Second Catalonia view"
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
      <section className="w-full bg-inherit border-t border-[#1A1A1A] pt-24 md:pt-32 pb-16 md:pb-20">
        <LayoutContainer>
          {/* Título editorial */}
          <h2 className="text-black font-semibold leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-[48px]">
            Diseñando experiencias digitales que elevan la marca.
          </h2>

          {/* Subtítulo editorial */}
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-6 md:mb-8">
            Desde el sistema de diseño hasta la implementación visual,
            construimos una experiencia web que refleja la excelencia y el compromiso
            de Catalonia Hotels & Resorts con la hospitalidad de calidad.
          </p>
        </LayoutContainer>
      </section>

      {/* Brand Overview */}
      <section className="bg-inherit pb-24 md:pb-32">
        <div className="px-0 md:px-4 lg:px-6">
          <BrandOverviewCatalonia />
        </div>

        <LayoutContainer className="pt-16 md:pt-24">
          {/* GRID 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[80px]">
            <Image
              src="/catalonia_banner_04.png"
              alt="Catalonia editorial 1"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/catalonia_banner_02.png"
              alt="Catalonia editorial 2"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* GRID 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-24 md:pb-32">
            <Image
              src="/catalonia_banner_01.png"
              alt="Catalonia editorial 3"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/catalonia_banner_03.png"
              alt="Catalonia editorial 4"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
          </div>
        </LayoutContainer>
      </section>

      {/* BLOQUE CONTACTO */}
      <section className="w-full bg-black text-white py-[160px]">
        <LayoutContainer>
          <div className="flex flex-col items-start">
            {/* Título */}
            <h2 className="text-white font-semibold leading-[0.9] text-[54px] md:text-[110px] tracking-tight mb-[48px]">
              ¿Quieres que<br />trabajemos<br />juntos?
            </h2>

            {/* Subtítulo */}
            <p className="text-white/70 text-[18px] md:text-[20px] leading-[1.5] max-w-2xl mb-[48px]">
            Estrategia, funcionalidad y experiencia para equipos que buscan impacto.
            </p>

            {/* CTA Email */}
            <a
              href="mailto:rodrigo@oi0.co"
              className="text-[16px] md:text-[18px] uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors"
            >
              rodrigo@oio.com
            </a>
          </div>
        </LayoutContainer>
      </section>
    </div>
  )
}

