'use client'

import { LayoutContainer } from '@/components/ui/layout-container'

export function Footer() {
  return (
    <footer id="contact" className="relative z-[1] bg-[#111111] border-t border-white/10">
      <LayoutContainer className="py-12 sm:py-16 md:py-24 lg:py-32">

        {/* TÍTULO */}
        <h3 className="font-manrope font-bold tracking-[-0.02em] text-white text-xl sm:text-2xl md:text-[32px] lg:text-[42px] xl:text-[56px] mb-6 sm:mb-8">
          Let's build<br />something meaningful.
        </h3>

        {/* CONTACTO */}
        <div className="flex flex-col gap-6 sm:gap-8 text-white">
          <a
            href="mailto:hello@rodrigosanchez.design"
            className="text-sm sm:text-base lg:text-lg text-[rgba(255,255,255,0.65)] hover:text-white transition-colors duration-300 break-all"
          >
            rodrigo@oio.com
          </a>

          <a
            href="https://www.linkedin.com/in/rodrigosanchezromero/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base lg:text-lg text-[rgba(255,255,255,0.65)] hover:text-white transition-colors duration-300"
          >
            LinkedIn
          </a>
        </div>

        {/* COPYRIGHT */}
        <p className="text-[10px] sm:text-xs text-[rgba(255,255,255,0.65)] pt-8 sm:pt-10 md:pt-12">
          © 2025 Rodrigo Sánchez
        </p>

      </LayoutContainer>
    </footer>
  )
}
