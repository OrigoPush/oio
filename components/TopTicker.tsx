'use client'

export function TopTicker() {
  return (
    <div className="fixed top-0 left-0 w-full h-[40px] bg-[#ff3b1f] z-[200] overflow-hidden flex items-center">
      
      {/* Contenedor doble para evitar huecos */}
      <div className="animate-topticker whitespace-nowrap flex text-[12px] font-medium tracking-wide uppercase text-black">

        {/* Bloque 1 */}
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>

        {/* Bloque 2 — duplicado para continuidad perfecta */}
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
        <span className="inline-block px-8">WEBSITE WORK IN PROGRESS</span>
      </div>

    </div>
  )
}
