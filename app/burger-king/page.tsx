'use client'

import { BurgerKingLayout } from '@/components/project-detail/layouts/BurgerKingLayout'
import {
  getProjectBackgroundColor,
  getFrame7BackgroundImage,
  getConfidentialSticker,
  shouldShowSticker,
} from '@/lib/projects'

export default function BurgerKingPage() {
  const projectId = 'bk'
  const title = 'Burger King / Popeyes'
  const description = 'Rediseño completo del proceso de compra de la app y de los kioskos para optimizar velocidad, consistencia visual y experiencia del usuario.'
  const role = 'UX/UI Design'
  const year = '2024'
  const country = 'Garaje de Ideas, Madrid'
  const tools = ['Figma', 'Photoshop', 'VS Code']
  const website = 'https://burgerking.es'
  const backgroundColor = '#E7863F'
  const isConfidential = true

  const showSticker = shouldShowSticker(projectId, isConfidential)
  const sticker = showSticker ? getConfidentialSticker(projectId) : null

  return (
    <BurgerKingLayout
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

