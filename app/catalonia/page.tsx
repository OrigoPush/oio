'use client'

import { CataloniaLayout } from '@/components/project-detail/layouts/CataloniaLayout'
import {
  getProjectBackgroundColor,
  getFrame7BackgroundImage,
  getConfidentialSticker,
  shouldShowSticker,
} from '@/lib/projects'

export default function CataloniaPage() {
  const projectId = 'catalonia'
  const title = 'Catalonia Hotels & Resorts'
  const description = 'Rediseño integral de la web de Catalonia Hotels & Resorts para mejorar navegación, diseño, claridad y conversión.'
  const role = 'UX/UI Design, Design Systems'
  const year = '2023'
  const country = 'Garaje de Ideas, Madrid'
  const tools = ['Figma', 'SEMRush']
  const website = 'https://www.cataloniahotels.com/'
  const backgroundColor = '#93CC5A'
  const isConfidential = false

  const showSticker = shouldShowSticker(projectId, isConfidential)
  const sticker = showSticker ? getConfidentialSticker(projectId) : null

  return (
    <CataloniaLayout
      projectId={projectId}
      title={title}
      description={description}
      role={role}
      year={year}
      country={country}
      tools={tools}
      website={website}
      backgroundColor={backgroundColor}
      frame7BackgroundImage={getFrame7BackgroundImage(projectId)}
      sticker={sticker}
      animationClasses=""
    />
  )
}

