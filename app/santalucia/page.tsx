'use client'

import { DefaultCarouselLayout } from '@/components/project-detail/layouts/DefaultCarouselLayout'
import {
  getProjectBackgroundColor,
  getFrame7BackgroundImage,
  CAROUSEL_WITH_BACKGROUND_PROJECTS,
} from '@/lib/projects'

export default function SantaluciaPage() {
  const projectId = 'santalucia'
  const title = 'Santalucía Impulsa'
  const description = 'App accesible para personas mayores, diseñada para simplificar tareas diarias y mejorar la autonomía del usuario.'
  const year = '2023'
  const country = 'Madrid'
  const tools = ['Figma']
  const website = 'https://www.santaluciaimpulsa.es/'
  const backgroundColor = '#F29E39'
  const status = 'Work in progress'

  const frames = [
    {
      id: 'info',
      type: 'info' as const,
    },
    {
      id: 'hero',
      type: 'hero' as const,
    },
  ]

  return (
    <DefaultCarouselLayout
      projectId={projectId}
      title={title}
      description={description}
      year={year}
      country={country}
      tools={tools}
      website={website}
      backgroundColor={backgroundColor}
      status={status}
      frames={frames}
      animationClasses=""
      backgroundImage={CAROUSEL_WITH_BACKGROUND_PROJECTS.includes(projectId as any) ? getFrame7BackgroundImage(projectId) : undefined}
    />
  )
}

