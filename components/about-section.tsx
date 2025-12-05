import { LayoutContainer } from '@/components/ui/layout-container'

// components/about-section.tsx  (o components/ui/about-section.tsx)

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 bg-[#262626] text-[#FAFAFA] pt-24 pb-24"
    >
      <LayoutContainer>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          About
        </h2>

        <p className="text-sm md:text-base leading-relaxed text-[#FAFAFA]/70">
          I'm a product designer focused on building clear, functional digital
          experiences. I work across UX, UI and front-end details to make
          products that feel simple, fast and honest.
        </p>

        <p className="text-sm md:text-base leading-relaxed text-neutral-300 mt-4">
          Over the last years I've helped startups and established companies
          design products that balance aesthetics with usability — from web
          apps to design systems and dashboards.
        </p>
      </LayoutContainer>
    </section>
  )
}
