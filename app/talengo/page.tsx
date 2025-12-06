'use client'

import { TalengoLayout } from '@/components/project-detail/layouts/TalengoLayout'
import {
  getProjectBackgroundColor,
  getFrame7BackgroundImage,
  getConfidentialSticker,
  shouldShowSticker,
} from '@/lib/projects'

export default function TalengoPage() {
  const projectId = 'talengo'
  const title = 'Talengo'
  const description = 'Plataforma de RRHH impulsada por IA diseñada para mejorar la gestión del talento y la experiencia del usuario interno.'
  const role = 'Product design, Design Systems'
  const year = '2024'
  const country = 'Madrid'
  const tools = ['Figma', 'Lovable', 'Cursor', 'Power BI']
  const website = 'https://www.talengo.com/'
  const backgroundColor = '#84BDC9'
  const isConfidential = true

  const showSticker = shouldShowSticker(projectId, isConfidential)
  const sticker = showSticker ? getConfidentialSticker(projectId) : null

  return (
    <TalengoLayout
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

