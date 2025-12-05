'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { LayoutContainer } from '@/components/ui/layout-container'
import { ProjectCTA } from '@/components/ui/project-cta'

interface RbiLayoutProps {
    projectId: string
    title: string
    description: string
    role?: string
    year?: string
    country?: string
    tools?: string[]
    website?: string
    backgroundColor?: string
    frame7BackgroundImage?: string
    sticker?: React.ReactNode | null
    onLogoClick?: () => void
    animationClasses?: string
}

export function RbiLayout({
    projectId,
    title,
    description,
    role,
    year,
    country,
    tools,
    website,
    backgroundColor = '#AE2825',
    frame7BackgroundImage,
    sticker,
    onLogoClick,
    animationClasses = '',
}: RbiLayoutProps) {
    const location = useMemo(
        () => [country, year].filter(Boolean).join(' · '),
        [country, year]
    )

    return (
        <div
            className={`fixed inset-0 z-[70] bg-white text-black overflow-y-auto overflow-x-hidden project-detail ${animationClasses}`}
        >
            {/* HERO + BLOQUE COLOR */}
            <section className="relative w-full min-h-screen overflow-hidden">
                {/* SKY */}
                <div className="relative h-[72vh] overflow-hidden">
                    <Image
                        src="/rbi_ruido.png"
                        alt="rbi hero"
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
                                    <span className="text-[12px] uppercase tracking-[0.18em] text-white">
                                        CASo de estudio
                                    </span>
                                    <span className="h-px w-8 bg-white/40" />
                                    <span className="text-xs text-white">{title}</span>
                                </div>

                                {/* PILL CONFIDENCIAL */}
                                <div className="flex items-center">
                                    <span
                                        className="inline-flex items-center w-fit px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            color: backgroundColor,
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
                    <LayoutContainer className="pt-12 pb-[160px]">
                        {/* METADATA */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-[80px]">
                            <div>
                                <p className="uppercase tracking-[0.18em] text-[10px] text-white/80 mb-2">
                                    Info proyecto
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
                                    <p className="uppercase tracking-[0.18em] text-[10px] text-white/80 mb-2">
                                        Rol
                                    </p>
                                    <p className="text-[16px] text-white leading-[1.5]">{role}</p>
                                </div>
                            )}

                            {tools && tools.length > 0 && (
                                <div>
                                    <p className="uppercase tracking-[0.18em] text-[10px] text-white/80 mb-2">
                                        Herramientas
                                    </p>
                                    <p className="text-[16px] text-white leading-[1.5]">{tools.join(', ')}</p>
                                </div>
                            )}

                            {year && (
                                <div>
                                    <p className="uppercase tracking-[0.18em] text-[10px] text-white/80 mb-2">
                                        Año
                                    </p>
                                    <p className="text-[16px] text-white leading-[1.5]">{year}</p>
                                </div>
                            )}
                        </div>

                        {/* SCROLL INDICATOR */}
                        <div className="flex justify-center mb-[120px]">
                            <div className="text-center">
                                <p className="text-white/70 text-[10px] uppercase tracking-[0.18em]">
                                    Scroll
                                </p>
                                <span className="block text-white/70 mt-1 text-lg">⌄</span>
                            </div>
                        </div>

                        {/* TÍTULO PRINCIPAL */}
                        <h1 className="text-white text-[64px] md:text-[80px] lg:text-[96px] leading-[0.95] font-normal mb-[48px] max-w-[1100px]">
                            {title}
                        </h1>

                        {/* SUBTÍTULO */}
                        <p className="text-white/80 text-[18px] md:text-[20px] leading-[1.5] max-w-[640px] mb-[80px]">
                            {description}
                        </p>

                        {/* MOCKUP PRINCIPAL */}
                        <div className="flex justify-center mb-[80px] md:mb-[120px]">
                            <div className="w-full max-w-4xl relative">
                                <Image
                                    src="/rbi_01.png"
                                    alt="RBI mockup"
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
                <LayoutContainer className="py-24 md:py-40">
                    <div className="max-w-3xl mx-auto text-center">

                        {/* LABEL */}
                        <div className="flex justify-center mb-8">
                            <span
                                className="inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-semibold tracking-tight"
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    color: backgroundColor,
                                }}
                            >
                                Proyecto confidencial
                            </span>
                        </div>

                        {/* STICKER — NUEVO */}
                        <div className="flex justify-center mb-8">
                            <Image
                                src="/ms_sticker_2.png"
                                alt="Sticker"
                                width={120}
                                height={120}
                                className="w-[90px] md:w-[200px] h-auto object-contain"
                            />
                        </div>
                        {/* HEADLINE */}
                        <h3 className="text-white text-[34px] md:text-[46px] font-bold leading-[1.05] tracking-tight mb-6">
                            Parte de este proyecto no puede mostrarse.
                        </h3>

                        {/* SUBCOPY */}
                        <p className="text-white/75 text-[15px] md:text-[17px] leading-[1.55] mb-10">
                            Algunas piezas, procesos internos y pantallas están bajo NDA.
                            Si quieres ver el trabajo completo, contáctame directamente.
                        </p>

                        {/* CTA */}
                        <a
                            href="mailto:rodrigo@oi0.co"
                            className="inline-block text-[15px] md:text-[17px] font-medium underline decoration-[2px] decoration-white/40 underline-offset-4 hover:opacity-70 transition-opacity text-white"
                        >
                            rodrigo@oio.com
                        </a>

                    </div>
                </LayoutContainer>
            </section>

        </div >
    )
}

