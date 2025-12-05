'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface ProjectContextType {
  projectOpen: boolean
  isProjectOpen: boolean
  setProjectOpen: (open: boolean) => void
  openProject: (projectId: string) => void
  closeProject: () => void
  onCloseProject: () => void
  closeProjectCallback: (() => void) | null
  setCloseProjectCallback: (callback: (() => void) | null) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectOpen, setProjectOpen] = useState(false)
  const [isProjectOpen, setIsProjectOpen] = useState(false)
  const [closeProjectCallback, setCloseProjectCallback] = useState<(() => void) | null>(null)

  const openProject = useCallback((projectId: string) => {
    setIsProjectOpen(true)
    setProjectOpen(true)
  }, [])

  const closeProject = useCallback(() => {
    setIsProjectOpen(false)
    setProjectOpen(false)
    if (closeProjectCallback) {
      closeProjectCallback()
    }
  }, [closeProjectCallback])

  const onCloseProject = useCallback(() => {
    setIsProjectOpen(false)
    setProjectOpen(false)
    if (closeProjectCallback) {
      closeProjectCallback()
    }
  }, [closeProjectCallback])

  return (
    <ProjectContext.Provider value={{ projectOpen, isProjectOpen, setProjectOpen, openProject, closeProject, onCloseProject, closeProjectCallback, setCloseProjectCallback }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

