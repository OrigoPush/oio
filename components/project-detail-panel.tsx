'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { heroTools } from '@/components/tools-section'
import { useApp } from '@/contexts/app-context'

interface Project {
  id: number
  title: string
  image: string
  description?: string
  year?: string
  country?: string
  type?: string
  tools?: string[]
}

interface ProjectDetailPanelProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

function getToolByName(toolName: string) {
  return heroTools.find(tool => tool.name === toolName)
}

// Helper to determine project status
function getProjectStatus(project: Project) {
  const title = project.title.toLowerCase()
  
  // Work in Progress
  if (title.includes('rank') || title.includes('catalonia') || title.includes('santalucía') || title.includes('santalucia')) {
    return 'work-in-progress'
  }
  
  // Confidential
  if (title.includes('burger king') || title.includes('popeyes') || title.includes('bk') || 
      title.includes('talengo') || title.includes('rbi')) {
    return 'confidential'
  }
  
  // Push special case
  if (title.includes('push')) {
    return 'push'
  }
  
  return 'normal'
}

export function ProjectDetailPanel({ project, isOpen, onClose }: ProjectDetailPanelProps) {
  const { setProjectPanelOpen } = useApp()

  const handleClose = useCallback(() => {
    setProjectPanelOpen(false)
    onClose()
  }, [setProjectPanelOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleClose])

  const status = project ? getProjectStatus(project) : null
  const isConfidential = status === 'confidential'

  if (!project || !isOpen) return null

  // Get message based on status
  const getMessage = () => {
    switch (status) {
      case 'work-in-progress':
        return 'Este proyecto todavía está en construcción. Muy pronto estará disponible la información completa.'
      case 'confidential':
        return 'Este proyecto es confidencial y no puede mostrarse públicamente.\n\nSi estás interesado en conocer detalles, contáctame y te lo enseñaré en privado.'
      case 'push':
        return 'La información completa de Push está en preparación. Pronto estará disponible una página detallada.'
      default:
        return project.description || ''
    }
  }

  // Extract project name/slug for logo (assuming logo naming convention)
  const getProjectLogo = () => {
    const title = project.title.toLowerCase()
    if (title.includes('push')) return '/logo_push.png'
    if (title.includes('catalonia')) return '/logo_catalonia.png'
    if (title.includes('rank')) return '/logo_rmh.png'
    if (title.includes('talengo')) return '/logo_talengo.png'
    if (title.includes('burger') || title.includes('bk') || title.includes('popeyes')) {
      // BK and Popeyes share the same project, use popeyes logo
      if (title.includes('popeyes')) return '/logo_popeyes.png'
      return '/logo_bk.png'
    }
    if (title.includes('rbi')) return '/logo_rbi.png'
    if (title.includes('santalucía') || title.includes('santalucia')) return '/logo_santalucia.png'
    return '/placeholder-logo.svg'
  }

  return (
    <div
      className={`fixed inset-0 z-[80] bg-[#FAFAFA] transform transition-all duration-500 ease-out pointer-events-auto ${
        isOpen && project ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Centered content container - no scroll */}
      <div className="h-full w-full flex flex-col justify-center items-center gap-8 px-16 py-24 overflow-hidden">
        
        {/* Project Logo (más pequeño) */}
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
          <Image
            src={getProjectLogo()}
            alt={`${project.title} logo`}
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#262626] text-center max-w-4xl">
          {project.title}
        </h1>

        {/* Message */}
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-[#262626] text-center max-w-2xl whitespace-pre-line">
          {getMessage()}
        </p>

        {/* Tools - Only show if not confidential */}
        {!isConfidential && project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {project.tools.map((toolName) => {
              const tool = getToolByName(toolName)
              if (tool?.icon) {
                const IconComponent = tool.icon
                return (
                  <div
                    key={toolName}
                    className="flex flex-col items-center gap-2 p-3 bg-[#FAFAFA] rounded-lg border border-[#262626]/10"
                  >
                    <IconComponent className="h-6 w-6 text-[#262626]" />
                    <span className="text-xs font-medium text-[#262626]">{toolName}</span>
                  </div>
                )
              } else {
                return (
                  <div
                    key={toolName}
                    className="px-3 py-2 bg-[#FAFAFA] rounded-lg border border-[#262626]/10"
                  >
                    <span className="text-xs font-medium text-[#262626]">{toolName}</span>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    </div>
  )
}
