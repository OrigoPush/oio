'use client'

import { useState } from 'react'
import { ProjectCard } from './home/ProjectCard'
import { ConfidentialModal } from './confidential-modal'
import { LayoutContainer } from '@/components/ui/layout-container'

const secondaryProjects = [
  {
    id: 4,
    title: 'Mobile Banking App',
    image: '/mobile-banking-app-design.jpg',
    description: 'Modern mobile banking application with secure transactions and intuitive user interface.',
    year: '2023',
    country: 'Spain',
    type: 'Mobile',
    tools: ['Figma', 'Cursor', 'ChatGPT'],
    behanceUrl: 'https://behance.net/gallery/example4',
    isConfidential: false,
  },
  {
    id: 5,
    title: 'Brand Identity System',
    image: '/brand-identity-design-system.png',
    description: 'Comprehensive brand identity system including logo, typography, and visual guidelines.',
    year: '2024',
    country: 'Spain',
    type: 'Branding',
    tools: ['Figma', 'Framer', 'v0'],
    behanceUrl: 'https://behance.net/gallery/example5',
    isConfidential: false,
  },
  {
    id: 6,
    title: 'AI Chat Interface',
    image: '/ai-chat-interface-dark-mode.jpg',
    description: 'AI-powered chat interface with natural language processing and conversational design.',
    year: '2024',
    country: 'Spain',
    type: 'Web',
    tools: ['Figma', 'GitHub', 'Claude'],
    behanceUrl: null,
    isConfidential: true,
  },
]

export function SecondaryProjects() {
  const [showConfidentialModal, setShowConfidentialModal] = useState(false)

  return (
    <>
      <section className="relative z-10 bg-black text-white">
        <LayoutContainer>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                image={project.image}
                description={project.description}
                year={project.year}
                country={project.country}
                type={project.type}
                tools={project.tools}
                behanceUrl={project.behanceUrl}
                isConfidential={project.isConfidential}
                onConfidentialClick={() => setShowConfidentialModal(true)}
                delay={index * 100}
                size="small"
              />
            ))}
          </div>
        </LayoutContainer>
      </section>

      <ConfidentialModal
        isOpen={showConfidentialModal}
        onClose={() => setShowConfidentialModal(false)}
      />
    </>
  )
}
