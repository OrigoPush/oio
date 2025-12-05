'use client'

import { LayoutContainer } from '@/components/ui/layout-container'
import { getProjectLogo } from '@/lib/projects'
import { logoHeights } from '@/lib/design-tokens'

interface HeroFrameProps {
  projectId: string
  title: string
  status?: string
  heroImage: string
}

export function HeroFrame({
  projectId,
  title,
  status,
  heroImage,
}: HeroFrameProps) {
  return (
    <div className="min-w-full w-screen h-screen flex-shrink-0 snap-start relative flex items-center justify-center">
      {/* Fullscreen background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImage}
          alt="Project hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content overlay */}
      <LayoutContainer className="relative z-10 w-full flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        {/* Logo centered - larger size for hero frame */}
        <img
          src={getProjectLogo(projectId)}
          alt={`${title} logo`}
          className={`${logoHeights.hero} w-auto opacity-90`}
        />

        {/* Work in progress text */}
        <p className="text-sm sm:text-base md:text-lg font-medium opacity-80 text-white">
          {status || 'Work in progress'}
        </p>
      </LayoutContainer>
    </div>
  )
}

