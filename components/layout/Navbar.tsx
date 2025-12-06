'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isProjectPage = pathname !== '/'

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
    scrollTo(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className="
          fixed top-[40px] left-0 w-full z-[999]
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
          {isProjectPage ? (
            <Link
              href="/"
              className="cursor-pointer"
            >
              <img
                src="/logo_i0_mask.svg"
                alt="logo"
                width={160}
                className="object-contain w-24 sm:w-32 md:w-40"
              />
            </Link>
          ) : (
          <a
            href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
          >
            <img
                src="/logo_i0_mask.svg"
                alt="logo"
                width={160}
                className="object-contain w-24 sm:w-32 md:w-40"
            />
          </a>
          )}

          {/* MENU */}
          <div className="flex flex-col items-end">
            {isProjectPage ? (
              <Link
                href="/"
                className="text-white text-base sm:text-lg md:text-xl font-bold leading-none"
              >
                cerrar
              </Link>
            ) : isHeroVisible ? (
              <div className="flex flex-col items-end gap-1 sm:gap-1.5">
                <a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); scrollTo('work') }}
                  className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none"
                >
                  portfolio
                </a>

                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
                  className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none"
              >
                  contacto
                </a>
              </div>
            ) : (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white text-base sm:text-lg md:text-xl font-bold leading-none"
              >
                menú
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
          'w-[65vw] sm:w-[50vw] md:w-[25vw] lg:w-[20vw] min-w-[260px]',
          'flex flex-col items-end justify-start px-6 sm:px-8 md:px-10 pt-16 sm:pt-20',
          'transform transition-transform duration-500 ease-out',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        >
        <nav className="flex flex-col items-end gap-4 sm:gap-6">
          <button
            onClick={() => handleMenuClick('work')}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-none tracking-tight opacity-80 hover:opacity-100 transition-opacity duration-300 text-right"
              >
            portfolio
          </button>
          <button
            onClick={() => handleMenuClick('contact')}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-none tracking-tight opacity-80 hover:opacity-100 transition-opacity duration-300 text-right"
              >
                contacto
          </button>
            </nav>
      </aside>
    </>
  )
}
