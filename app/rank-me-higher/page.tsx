'use client'

import { RankLayout } from '@/components/project-detail/layouts/RankLayout'
import {
  getProjectBackgroundColor,
  getFrame7BackgroundImage,
  getConfidentialSticker,
  shouldShowSticker,
} from '@/lib/projects'

export default function RankMeHigherPage() {
  const projectId = 'rank'
  const title = 'Rank Me Higher'
  const description = 'Nueva identidad enfocada en el diseño y arquitectura web para una agencia de SEO orientada a claridad, estructura y resultados medibles.'
  const role = 'UX/UI Design, SEO, GEO'
  const year = '2022 - Actualidad'
  const country = 'Londres'
  const tools = ['Figma', 'Wordpress', 'Shopify', 'SEMRush']
  const website = 'https://rankmehigher.co/'
  const backgroundColor = '#6E4BE0'
  const isConfidential = false

  const showSticker = shouldShowSticker(projectId, isConfidential)
  const sticker = showSticker ? getConfidentialSticker(projectId) : null

  return (
    <RankLayout
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

