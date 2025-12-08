'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { LayoutContainer } from '@/components/ui/layout-container'
import { ProjectCTA } from '@/components/ui/project-cta'
import { BrandOverviewPush } from './BrandOverviewPush'

interface PushLayoutProps {
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

export function PushLayout({
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
}: PushLayoutProps) {
  const location = useMemo(
    () => [country, year].filter(Boolean).join(' · '),
    [country, year]
  )

  return (
    <div
      className={`min-h-screen w-full bg-white text-black overflow-y-auto overflow-x-hidden project-detail ${animationClasses}`}
    >
      {/* HERO + BLOQUE MORADO */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* SKY */}
        <div className="relative h-[72vh] overflow-hidden">
          {frame7BackgroundImage && (
            <Image
              src="/bluesky_ruido.png"
              alt="Push hero"
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
                    Caso de estudio
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

        {/* BLOQUE MORADO */}
        <div className="w-full" style={{ backgroundColor }}>
          <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
            {/* METADATA */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-10 md:mb-20">
                <div>
                  <p className="uppercase tracking-[0.18em] text-[10px] text-white opacity-80 mb-2">
                    Localización
                  </p>
                  {country && (
                    <p className="text-[16px] text-white leading-[1.5]">{country}</p>
                  )}
                  {!country && location && (
                    <p className="text-[16px] text-white leading-[1.5]">{location}</p>
                  )}
                </div>

                {role && (
                  <div>
                    <p className="uppercase tracking-[0.18em] text-[10px] text-white opacity-80 mb-2">
                      Rol
                    </p>
                    <p className="text-[16px] text-white leading-[1.5]">{role}</p>
                  </div>
                )}

                {tools && tools.length > 0 && (
                  <div>
                    <p className="uppercase tracking-[0.18em] text-[10px] text-white opacity-80 mb-2">
                      Herramientas
                    </p>
                    <p className="text-[16px] text-white leading-[1.5]">{tools.join(', ')}</p>
                  </div>
                )}

                {year && (
                  <div>
                    <p className="uppercase tracking-[0.18em] text-[10px] text-white opacity-80 mb-2">
                      Año
                    </p>
                    <p className="text-[16px] text-white leading-[1.5]">{year}</p>
                  </div>
                )}
              </div>


            {/* SCROLL INDICATOR */}
            <div className="flex justify-center mb-10 md:mb-24">
              <div className="text-center">
                <p className="text-white/70 text-[10px] uppercase tracking-[0.18em]">
                  Scroll
                </p>
                <span className="block text-white/70 mt-1 text-lg">⌄</span>
              </div>
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-white text-[64px] md:text-[80px] lg:text-[96px] leading-[0.95] font-normal mb-8 md:mb-12 max-w-[1100px]">
              {title}
            </h1>

            {/* SUBTÍTULO */}
            <p className="text-white/80 text-[18px] md:text-[20px] leading-[1.5] max-w-[640px] mb-10 md:mb-16">
              {description}
            </p>

            {/* MOCKUP PRINCIPAL */}
            <div className="flex justify-center mb-10 md:mb-24">
              <div className="w-full max-w-4xl">
                <Image
                  src="/mockup_push.png"
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
                  src="/app_push_landing.png"
                  alt="Second Push view"
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
      <section className="w-full bg-inherit border-t border-[#1A1A1A] pt-10 md:pt-24 pb-10 md:pb-16">
        <LayoutContainer>
          {/* Título editorial */}
          <h2 className="text-black font-semibold leading-[1.05] text-[40px] md:text-[56px] max-w-3xl mb-8 md:mb-12">
            Diseñando experiencias XR que transforman el miedo en confianza.
          </h2>

          {/* Subtítulo editorial */}
          <p className="text-black/70 text-[18px] leading-[1.5] max-w-2xl mb-6 md:mb-8">
            Desde la definición de los escenarios hasta la narrativa inmersiva,
            construimos un flujo que acompaña al usuario en cada fase del viaje:
            anticipación, exposición y consolidación.
          </p>
        </LayoutContainer>
      </section>

      {/* Brand Overview */}
      <section className="bg-inherit pb-14 md:pb-24">
        <div className="px-0 md:px-4 lg:px-6">
          <BrandOverviewPush />
        </div>

        <LayoutContainer className="pt-10 md:pt-16">
          {/* GRID 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-10 md:mb-16">
            <Image
              src="/app_push_splash.png"
              alt="Push editorial 1"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/app_push_capitulos.png"
              alt="Push editorial 2"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* GRID 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 pb-14 md:pb-24">
            <Image
              src="/app_push_tratamiento.png"
              alt="Push editorial 3"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/app_push_mapa_01.png"
              alt="Push editorial 4"
              width={1000}
              height={750}
              className="w-full h-auto object-cover"
            />
          </div>
        </LayoutContainer>
      </section>

      {/* BLOQUE CONTACTO */}
      <section className="w-full bg-black text-white py-14 md:py-24">
        <LayoutContainer>
          <div className="flex flex-col items-start">
            {/* Título */}
            <h2 className="text-white font-semibold leading-[0.9] text-[54px] md:text-[110px] tracking-tight mb-8 md:mb-12">
              Construyamos algo<br />que realmente<br />funcione
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
