'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  projectPanelOpen: boolean
  setProjectPanelOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [projectPanelOpen, setProjectPanelOpen] = useState(false)

  return (
    <AppContext.Provider value={{ projectPanelOpen, setProjectPanelOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

