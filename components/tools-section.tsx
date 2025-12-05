'use client'

import { useEffect, useRef, useState } from 'react'
import {
  SiFigma,
  SiNotion,
  SiFramer,
  SiWordpress,
  SiWebflow,
  SiGithub,
  SiUnity,
} from 'react-icons/si'
import { cn } from '@/lib/utils'
import { LayoutContainer } from '@/components/ui/layout-container'

export const tools = [
  { name: 'Figma', icon: SiFigma },
  { name: 'Cursor', icon: null },
  { name: 'Lovable', icon: null },
  { name: 'Framer', icon: SiFramer },
  { name: 'WordPress', icon: SiWordpress },
  { name: 'Webflow', icon: SiWebflow },
  { name: 'v0', icon: null },
  { name: 'ChatGPT', icon: null },
  { name: 'Perplexity', icon: null },
  { name: 'SEMrush', icon: null },
  { name: 'GitHub', icon: SiGithub },
  { name: 'VS Code', icon: null },
  { name: 'Unity', icon: SiUnity },
  { name: 'Notion', icon: SiNotion },
]

// All 14 tools for Hero display
export const heroTools = [
  { name: 'Figma', icon: SiFigma },
  { name: 'v0', icon: null },
  { name: 'Cursor', icon: null },
  { name: 'VS Code', icon: null },
  { name: 'Claude', icon: null },
  { name: 'ChatGPT', icon: null },
  { name: 'Lovable', icon: null },
  { name: 'Unity', icon: SiUnity },
  { name: 'GitHub', icon: SiGithub },
  { name: 'SEMRush', icon: null },
  { name: 'SEMrush', icon: null },
  { name: 'Power BI', icon: null },
  { name: 'Google Search Console', icon: null },
  { name: 'Webflow', icon: SiWebflow },
  { name: 'WordPress', icon: SiWordpress },
  { name: 'Framer', icon: SiFramer },
]

export function ToolsRow() {
  return (
    <div className="mt-12">
      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-4">
        Tools I use
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {heroTools.map((tool) => {
          if (tool.icon) {
            const IconComponent = tool.icon
            return (
              <div key={tool.name} className="flex items-center">
                <IconComponent className="w-5 h-5 text-neutral-400" />
              </div>
            )
          } else {
            return (
              <span
                key={tool.name}
                className="px-2 py-1 text-xs bg-neutral-100 rounded text-neutral-600 font-medium"
              >
                {tool.name}
              </span>
            )
          }
        })}
      </div>
    </div>
  )
}

export function ToolsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 bg-black text-white">
      <LayoutContainer className="py-24">
        <h2
          className={cn(
            'text-5xl md:text-6xl lg:text-7xl font-bold mb-20 text-left transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          Tools I Use
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className={cn(
                'group flex flex-col items-start justify-start gap-3 p-6 transition-all duration-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{
                transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
              }}
            >
              {tool.icon ? (
                <tool.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white/60">
                    {tool.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-left text-white/80">{tool.name}</span>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  )
}
