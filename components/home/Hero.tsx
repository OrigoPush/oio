'use client'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#111111] flex items-center"
    >
      {/* CONTENEDOR CON MISMO PADDING QUE EL LAYOUT */}
      <div className="w-full px-4 lg:px-6 mx-auto text-center">

        {/* SUBTITLE */}
        <p
          className="
    text-white/80 font-medium font-manrope
    text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
    max-w-xl mx-auto leading-snug mb-6
  "
        >
          Product Designer especializado en diseño y desarrollo web/software, branding y SEO/GEO. Diseños funcionales y con impacto visual.
        </p>

        {/* NOMBRE Y ROL */}
        <h1
          className="
    text-white font-manrope font-bold
    text-[8vw] sm:text-[40px] md:text-[52px] lg:text-[64px]
    leading-[1.05] tracking-[-0.01em] mb-4
  "
        >
          Rodrigo Sánchez
        </h1>


        {/* SKILLS / STACK */}
        <p
          className="
    text-white/60 font-manrope text-[12px] sm:text-[13px] md:text-[14px]
    tracking-wider uppercase
    flex flex-wrap justify-center gap-x-3 gap-y-1
  "
        >
          Figma • Cursor • Lovable • v0  • Github • Unity  • Design Systems • Framer • Shopify • WordPress
        </p>


      </div>
    </section>
  )
}
