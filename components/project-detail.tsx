'use client'

import { useEffect, useCallback, useState } from 'react'
import { ConfidentialLayout } from './project-detail/layouts/ConfidentialLayout'
import { PushLayout } from './project-detail/layouts/PushLayout'
import { CataloniaLayout } from './project-detail/layouts/CataloniaLayout'
import { RankLayout } from './project-detail/layouts/RankLayout'
import { BurgerKingLayout } from './project-detail/layouts/BurgerKingLayout'
import { TalengoLayout } from './project-detail/layouts/TalengoLayout'
import { RbiLayout } from './project-detail/layouts/RbiLayout'
import { DefaultCarouselLayout } from './project-detail/layouts/DefaultCarouselLayout'
import {
  getProjectBackgroundColor,
  getTextColor,
  getBorderColor,
  getFrame7BackgroundImage,
  getConfidentialSticker,
  shouldShowSticker,
  isConfidentialProject,
  CONFIDENTIAL_PROJECTS,
  CAROUSEL_WITH_BACKGROUND_PROJECTS,
} from '@/lib/projects'

interface ProjectDetailProps {
  projectId: string
  title: string
  description: string
  role?: string
  year?: string
  country?: string
  tools?: string[]
  backgroundColor: string
  status?: string
  website?: string
  isConfidential?: boolean
  onClose: () => void
  onLogoClick?: () => void
  isClosing?: boolean
}

export function ProjectDetail({
  projectId,
  title,
  description,
  role,
  year,
  country,
  tools,
  backgroundColor,
  status,
  website,
  isConfidential = false,
  onClose,
  onLogoClick,
  isClosing = false,
}: ProjectDetailProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger enter animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  const handleLogoClick = useCallback(() => {
    if (onLogoClick) {
      onLogoClick()
    }
  }, [onLogoClick])

  useEffect(() => {
    // Allow vertical scroll for Push, lock for others
    const isPush = projectId === 'push'
    if (isPush) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }

    // Handle ESC key - close via navbar handler
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [onClose, projectId])

  // Animation classes helper
  const getAnimationClasses = (): string => {
    if (isClosing) {
      return 'project-detail-exit project-detail-exit-active'
    }
    return `project-detail-enter ${isAnimating ? 'project-detail-enter-active' : ''}`
  }

  const animationClasses = getAnimationClasses()

  // Get project-specific values
  const finalBackgroundColor = getProjectBackgroundColor(projectId, backgroundColor)
  const textColor = getTextColor(projectId)
  const borderColor = getBorderColor(textColor)
  const locationString = [country, year].filter(Boolean).join(' · ')

  // Get sticker for confidential projects
  const showSticker = shouldShowSticker(projectId, isConfidential || false)
  const sticker = showSticker ? getConfidentialSticker(projectId) : null

  // Define frames array for carousel layouts
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

  // Burger King uses its own layout
  if (projectId === 'bk' || projectId === 'burgerking') {
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
        onLogoClick={handleLogoClick}
        animationClasses={animationClasses}
      />
    )
  }

  // Talengo uses its own layout
  if (projectId === 'talengo') {
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
        onLogoClick={handleLogoClick}
        animationClasses={animationClasses}
      />
    )
  }

  // RBI uses its own layout
  if (projectId === 'rbi') {
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
        onLogoClick={handleLogoClick}
        animationClasses={animationClasses}
      />
    )
  }

  // Confidential projects: render simple layout without carousel
  if (isConfidentialProject(projectId)) {
    return (
      <ConfidentialLayout
        projectId={projectId}
        title={title}
        description={description}
        year={year}
        country={country}
        tools={tools}
        website={website}
        backgroundColor={backgroundColor}
        isConfidential={isConfidential}
        sticker={sticker}
        onLogoClick={handleLogoClick}
        animationClasses={animationClasses}
      />
    )
  }

  // Rank has its own special layout with astronaut inter-frame
  if (projectId === 'rank') {
    return (
      <RankLayout
        projectId={projectId}
        title={title}
        description={description}
        year={year}
        country={country}
        tools={tools}
        website={website}
        onLogoClick={handleLogoClick}
        animationClasses={animationClasses}
      />
    )
  }

  // Push uses vertical layout (no carousel)
  if (projectId === 'push') {
    return (
      <PushLayout
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
        onLogoClick={handleLogoClick}
        animationClasses={animationClasses}
      />
    )
  }

  // Catalonia uses vertical layout (no carousel)
  if (projectId === 'catalonia') {
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
        onLogoClick={handleLogoClick}
        animationClasses={animationClasses}
      />
    )
  }

  // Default carousel layout for other projects (santalucia, etc.)
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
      onLogoClick={handleLogoClick}
      animationClasses={animationClasses}
      backgroundImage={CAROUSEL_WITH_BACKGROUND_PROJECTS.includes(projectId as any) ? getFrame7BackgroundImage(projectId) : undefined}
    />
  )
}
