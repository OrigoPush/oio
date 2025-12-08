'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { LayoutContainer } from '@/components/ui/layout-container'
import { ProjectCTA } from '@/components/ui/project-cta'

interface BurgerKingLayoutProps {
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

export function BurgerKingLayout({
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
}: BurgerKingLayoutProps) {
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
                    <Image
                        src="/bk_ruido.png"
                        alt="Burger King hero"
                        fill
                        priority
                        className="object-cover"
                    />

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

                                {/* PILL CONFIDENCIAL */}
                                <div className="flex items-center">
                                    <span
                                        className="inline-flex items-center w-fit px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                            backgroundColor: backgroundColor, // mismo color que el bloque naranja
                                            color: '#1A1A1A',                 // texto en color oscuro
                                        }}
                                    >
                                        Confidencial
                                    </span>
                                </div>

                            </div>
                        </LayoutContainer>
                    </div>
                </div>

                {/* BLOQUE COLOR */}
                <div className="w-full" style={{ backgroundColor }}>
                    <LayoutContainer className="pt-10 pb-14 md:pt-16 md:pb-24">
                        {/* METADATA */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-10 md:mb-20">
                            <div>
                                <p className="uppercase tracking-[0.18em] text-[10px] text-black opacity-80 mb-2">
                                    INFO PROYECTO
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
                                        HERRAMIENTAS
                                    </p>
                                    <p className="text-[16px] text-black leading-[1.5]">{tools.join(', ')}</p>
                                </div>
                            )}

                            {year && (
                                <div>
                                    <p className="uppercase tracking-[0.18em] text-[10px] text-black opacity-80 mb-2">
                                        AÑO
                                    </p>
                                    <p className="text-[16px] text-black leading-[1.5]">{year}</p>
                                </div>
                            )}
                        </div>

                        {/* SCROLL INDICATOR */}
                        <div className="flex justify-center mb-10 md:mb-24">
                            <div className="text-center">
                                <p className="text-black/70 text-[10px] uppercase tracking-[0.18em]">
                                    Scroll
                                </p>
                                <span className="block text-black/70 mt-1 text-lg">⌄</span>
                            </div>
                        </div>

                        {/* TÍTULO PRINCIPAL */}
                        <h1 className="text-black text-[64px] md:text-[80px] lg:text-[96px] leading-[0.95] font-normal mb-8 md:mb-12 max-w-[1100px]">
                            {title}
                        </h1>

                        {/* SUBTÍTULO */}
                        <p className="text-black/80 text-[18px] md:text-[20px] leading-[1.5] max-w-[640px] mb-10 md:mb-16">
                            {description}
                        </p>

                        {/* MOCKUP PRINCIPAL */}
                        <div className="flex justify-center mb-10 md:mb-24">
                            <div className="w-full max-w-4xl relative">
                                <Image
                                    src="/bk_01.png"
                                    alt="Burger King mockup"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain"
                                />

                                {/* DEGRADADO DESDE LA MITAD */}
                                <div
                                    className="absolute left-0 w-full pointer-events-none"
                                    style={{
                                        top: '50%',
                                        height: '50%',
                                        background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${backgroundColor} 90%)`,
                                    }}
                                />
                            </div>
                        </div>
                    </LayoutContainer>
                </div>
            </section>

            {/* BLOQUE CONFIDENCIALIDAD — GARAGE MODE */}
            <section
                className="w-full"
                style={{ backgroundColor }}
            >
                <LayoutContainer className="py-14 md:py-24">
                    <div className="max-w-3xl mx-auto text-center">

                        {/* LABEL */}
                        <div className="flex justify-center mb-8">
                            <span
                                className="inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-semibold tracking-tight"
                                style={{
                                    mixBlendMode: 'difference',
                                    color: backgroundColor,
                                    backgroundColor: '#FAFAFA',
                                }}
                            >
                                Proyecto confidencial
                            </span>
                        </div>

                        {/* STICKER — NUEVO */}
                        <div className="flex justify-center mb-10">
                            <Image
                                src="/ms_sticker_1.png"
                                alt="Sticker"
                                width={120}
                                height={120}
                                className="w-[90px] md:w-[200px] h-auto object-contain"
                            />
                        </div>

                        {/* HEADLINE */}
                        <h3 className="text-black text-[34px] md:text-[46px] font-bold leading-[1.05] tracking-tight mb-6">
                            Parte de este proyecto no puede mostrarse.
                        </h3>

                        {/* SUBCOPY */}
                        <p className="text-black/75 text-[15px] md:text-[17px] leading-[1.55] mb-10">
                            Algunas piezas, procesos internos y pantallas están bajo NDA.
                            Si quieres ver el trabajo completo, contáctame directamente.
                        </p>

                        {/* CTA */}
                        <a
                            href="mailto:rodrigo@oi0.co"
                            className="inline-block text-[15px] md:text-[17px] font-medium underline decoration-[2px] decoration-black/40 underline-offset-4 hover:opacity-70 transition-opacity"
                        >
                            rodrigo@oio.com
                        </a>

                    </div>
                </LayoutContainer>
            </section>






        </div >
    )
}
