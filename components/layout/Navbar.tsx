'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Navbar() {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isProjectPage = pathname !== '/'
  const isMobile = useIsMobile()

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMenuClick = (id: string) => {
    if (isProjectPage) {
      // En páginas de proyecto, navegar a la landing y luego hacer scroll
      window.location.href = `/#${id}`
    } else {
      // En landing, hacer scroll normalmente
      scrollTo(id)
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className="
          fixed top-[40px] left-0 w-full z-[9999]
          bg-transparent 
          mix-blend-difference
          pointer-events-none
        "
      >
        {/* 
          Alineación perfecta con LayoutContainer:
          - Posición: top-[40px] (justo debajo del TopTicker de 40px de altura)
          - Paddings laterales: px-4 lg:px-6 (igual que LayoutContainer)
          - Padding-top proporcional: pt-6 md:pt-6 (1.5x el padding lateral para alineación visual)
        */}
        <div className="w-full px-4 lg:px-6 pt-6 md:pt-6 flex justify-between items-start pointer-events-auto">

          {/* LOGO — sin filtro, solo blanco */}
          <div
            className={cn(
              'transition-opacity duration-300',
              !isProjectPage && isHeroVisible
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100 pointer-events-auto'
            )}
          >
            {isProjectPage ? (
              <Link href="/" className="cursor-pointer">
                <img
                  src="/logo_oi0_mask.svg"
                  alt="logo"
                  className="object-contain w-10 sm:w-12 md:w-14"
                />
              </Link>
            ) : (
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('hero')
                }}
              >
                <img
                  src="/logo_oi0_mask.svg"
                  alt="logo"
                  className="object-contain w-12 sm:w-14 md:w-16"
                />
              </a>
            )}
          </div>

          {/* MENU */}
          <div className="flex flex-col items-end">
            {isProjectPage ? (
              // En páginas de proyecto: siempre mostrar "menú", nunca "cerrar"
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white text-xl sm:text-lg md:text-xl font-bold leading-none"
              >
                menú
              </button>
            ) : isMobile ? (
              // En mobile (landing): siempre mostrar "menú", nunca "portfolio/contacto"
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white text-xl sm:text-lg md:text-xl font-bold leading-none"
              >
                menú
              </button>

            ) : isHeroVisible ? (
              // En desktop (landing), cuando el hero es visible: mostrar "portfolio / contacto"
              <div className="flex flex-col items-end gap-1 sm:gap-1.5">
                <a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); scrollTo('work') }}
                  className="
                    text-white
                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                    font-bold
                    leading-none
                  "
                >
                  portfolio
                </a>

                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
                  className="
                    text-white
                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                    font-bold
                    leading-none
                  "
                >
                  contacto
                </a>
              </div>
            ) : (
              // En desktop (landing), cuando se hace scroll: mostrar "menú" o "cerrar" según menuOpen
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white text-base sm:text-lg md:text-xl font-bold leading-none"
              >
                {menuOpen ? 'cerrar' : 'menú'}
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
          style={{ overflow: 'hidden' }}
        />
      )}

      {/* Panel lateral */}
      <aside
        className={cn(
          'fixed top-[40px] right-0 h-[calc(100vh-40px)] z-50 bg-[#111111] text-white',
          'w-[100vw] sm:w-[80vw] md:w-[40vw] lg:w-[40vw] min-w-[300px]',
          'flex flex-col items-end justify-start px-6 sm:px-8 md:px-10 pt-16 sm:pt-20',
          'transform transition-transform duration-500 ease-out',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="
  flex flex-col
  items-start           /* izquierda */
  justify-end           /* empuja al fondo */
  gap-4 sm:gap-6
  absolute bottom-8 left-8   /* esquina inferior izquierda */
">
          <button
            onClick={() => handleMenuClick('work')}
            className="
    text-white
    text-7xl sm:text-5xl md:text-6xl lg:text-7xl
    font-bold
    leading-none
    tracking-tight
    opacity-80 hover:opacity-100
    transition-opacity duration-300
    text-left
  "
          >
            portfolio
          </button>

          <button
            onClick={() => handleMenuClick('contact')}
            className="
    text-white
    text-7xl sm:text-5xl md:text-6xl lg:text-7xl
    font-bold
    leading-none
    tracking-tight
    opacity-80 hover:opacity-100
    transition-opacity duration-300
    text-left
  "
          >
            contacto
          </button>



        </nav>

      </aside>
    </>
  )
}
