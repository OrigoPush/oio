'use client'

import { LayoutContainer } from '@/components/ui/layout-container'

export function Hero() {

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full bg-[#111111] overflow-hidden"
    >
      <LayoutContainer className="flex flex-1 flex-col pt-10 pb-14 md:pb-8">
        <div className="relative flex w-full flex-1 flex-col justify-end">
          <div className="relative max-w-3xl">
            <div className="pointer-events-none absolute left-0 bottom-full mb-6 sm:mb-8 z-20" aria-hidden>
              <div
                id="draggable-logo-anchor"
                style={{ width: 'clamp(200px, 30vw, 360px)' }}
              >
                <img
                  src="/logo_oi0_mask.svg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto opacity-0"
                />
              </div>
            </div>

            <div className="relative z-10 text-left space-y-6">
              {/* NOMBRE */}
              <h1
                className="
              text-white/80 font-manrope font-bold
              text-[11vw] sm:text-[60px] md:text-[80px] lg:text-[80px]
              leading-[0.92] tracking-[-0.04em]
            "
              >
                Rodrigo Sánchez
              </h1>

              {/* DESCRIPCIÓN */}
              <p
                className="
              text-white/80 font-medium font-manrope
              text-[15px] sm:text-[17px] md:text-[19px]
              max-w-2xl leading-relaxed
            "
              >
                Product Designer especializado en diseño y desarrollo web/software, branding y SEO/GEO. Diseños funcionales y con impacto visual.
              </p>

              {/* SKILLS / STACK */}
              <p
                className="
              text-white/60 font-manrope text-[12px] sm:text-[13px] md:text-[14px]
              tracking-[0.32em] uppercase
              flex flex-wrap gap-x-4 gap-y-1
            "
              >
                Figma • Cursor • Lovable • v0 • Github • Unity • Design Systems • Framer • Shopify • WordPress
              </p>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  )
}
