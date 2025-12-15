'use client'

import { useRef } from 'react'
import { Hero } from '@/components/home/Hero'
import { WorkTitle } from '@/components/work-title'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { Footer } from '@/components/layout/Footer'
import { GlobalDraggableLogo } from '@/components/home/GlobalDraggableLogo'

export function HomeScene() {
  const pageRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={pageRef} className="relative">
      <Hero />
      <GlobalDraggableLogo containerRef={pageRef} />
      <WorkTitle />
      <FeaturedProjects />
      <Footer />
    </div>
  )
}
