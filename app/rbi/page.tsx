'use client'

import { RbiLayout } from '@/components/project-detail/layouts/RbiLayout'
import {
  getProjectBackgroundColor,
  getFrame7BackgroundImage,
  getConfidentialSticker,
  shouldShowSticker,
} from '@/lib/projects'

export default function RbiPage() {
  const projectId = 'rbi'
  const title = 'RBI'
  const description = 'Rediseño funcional y visual de la app interna de empleados orientado a mejorar accesos, flujos y usabilidad general.'
  const role = 'UX/UI Design'
  const year = '2024'
  const country = 'Garaje de Ideas, Madrid'
  const tools = ['Figma', 'Photoshop']
  const website = 'https://tim-hortons.es/'
  const backgroundColor = '#AE2825'
  const isConfidential = true

  const showSticker = shouldShowSticker(projectId, isConfidential)
  const sticker = showSticker ? getConfidentialSticker(projectId) : null

  return (
    <RbiLayout
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

