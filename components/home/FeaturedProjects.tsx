'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProjectCard } from './ProjectCard'
import { ConfidentialModal } from '../confidential-modal'
import { ProjectDetail } from '../project-detail'
import { useProject } from '@/contexts/project-context'

const featuredProjects = [
  {
    id: 1,
    projectId: 'push',
    title: 'Push',
    image: '/card_push.png',
    description:
      'Push es una plataforma XR diseñada para ayudar a las personas a trabajar sus fobias mediante experiencias inmersivas de exposición gradual.',
    year: '2024 - Actualidad',
    country: 'Málaga',
    type: 'Cofundador. Diseño y desarrollo de software',
    role: 'Product Design',
    tools: ['Figma', 'v0', 'Cursor', 'Lovable', 'Unity', 'SEMRush'],
    behanceUrl: null,
    isConfidential: false,
    backgroundColor: '#865DE5',
    hoverColor: '#865DE5',
    textColorOnHover: '#FFFFFF',
    website: 'https://virtualpush.es',
    status: 'En construcción',
  },
  {
    id: 2,
    projectId: 'catalonia',
    title: 'Catalonia Hotels & Resorts',
    image: '/card_catalonia.png',
    description: 'Rediseño integral de la web de Catalonia Hotels & Resorts para mejorar navegación, diseño, claridad y conversión.',
    year: '2023',
    country: 'Garaje de Ideas, Madrid',
    type: 'UX/UI Design, Design Systems',
    role: 'UX/UI Design, Design Systems',
    tools: ['Figma', 'SEMRush'],
    behanceUrl: null,
    isConfidential: false,
    backgroundColor: '#93CC5A',
    hoverColor: '#F6D57A',
    textColorOnHover: '#000000',
    website: 'https://www.cataloniahotels.com/',
    status: 'Work in progress',
  },
  {
    id: 5,
    projectId: 'bk',
    title: 'Burger King / Popeyes',
    image: '/card_burger.png',
    description: 'Rediseño completo del proceso de compra de la app y de los kioskos para optimizar velocidad, consistencia visual y experiencia del usuario.',
    year: '2024',
    country: 'Garaje de Ideas, Madrid',
    type: 'UX/UI Design',
    role: 'UX/UI Design',
    tools: ['Figma', 'Photoshop', 'VS Code'],
    behanceUrl: null,
    isConfidential: true,
    backgroundColor: '#E7863F',
    hoverColor: '#E7863F',
    textColorOnHover: '#000000',
    website: 'https://burgerking.es',
    status: 'Confidencial',
  },
  {
    id: 3,
    projectId: 'rank',
    title: 'Rank Me Higher',
    image: '/card_rmh.png',
    description: 'Nueva identidad enfocada en el diseño y arquitectura web para una agencia de SEO orientada a claridad, estructura y resultados medibles.',
    year: '2022 - Actualidad',
    country: 'Londres',
    type: 'UX/UI Design, SEO, GEO',
    role: 'UX/UI Design, SEO, GEO',
    tools: ['Figma', 'Wordpress', 'Shopify', 'SEMRush'],
    behanceUrl: null,
    isConfidential: false,
    backgroundColor: '#6E4BE0',
    hoverColor: '#F1965B',
    textColorOnHover: '#000000',
    website: 'https://rankmehigher.co/',
    status: 'Work in progress',
  },
  {
    id: 4,
    projectId: 'talengo',
    title: 'Talengo',
    image: '/card_talengo.png',
    description: 'Plataforma de RRHH impulsada por IA diseñada para mejorar la gestión del talento y la experiencia del usuario interno.',
    year: '2024',
    country: 'Madrid',
    type: 'Product design, Design Systems',
    role: 'Product design, Design Systems',
    tools: ['Figma', 'Lovable', 'Cursor', 'Power BI'],
    behanceUrl: null,
    isConfidential: true,
    backgroundColor: '#84BDC9',
    hoverColor: '#84BDC9',
    textColorOnHover: '#000000',
    website: 'https://www.talengo.com/',
    status: 'Confidencial',
  },
  {
    id: 6,
    projectId: 'rbi',
    title: 'RBI',
    image: '/card_rbi.png',
    description: 'Rediseño funcional y visual de la app interna de empleados orientado a mejorar accesos, flujos y usabilidad general.',
    year: '2024',
    country: 'Garaje de Ideas,Madrid',
    type: 'UX/UI Design',
    role: 'UX/UI Design',
    tools: ['Figma', 'Photoshop'],
    behanceUrl: null,
    isConfidential: true,
    backgroundColor: '#AE2825',
    hoverColor: '#AE2825',
    textColorOnHover: '#FFFFFF',
    website: 'https://tim-hortons.es/',
    status: 'Confidencial',
  },
  {
    id: 7,
    projectId: 'santalucia',
    title: 'Santalucía Impulsa',
    image: '/card_santalucia.png',
    description: 'App accesible para personas mayores, diseñada para simplificar tareas diarias y mejorar la autonomía del usuario.',
    year: '2023',
    country: 'Madrid',
    type: 'UX/UI Design',
    role: 'UX/UI Design',
    tools: ['Figma'],
    behanceUrl: null,
    isConfidential: false,
    backgroundColor: '#F29E39',
    hoverColor: '#F29E39',
    textColorOnHover: '#FFFFFF',
    website: 'https://www.santaluciaimpulsa.es/',
    status: 'Work in progress',
  },
]

const PROJECT_ORDER = [
  'push',
  'catalonia',
  'bk',
  'rank',
  'talengo',
  'rbi',
  'santalucia',
]

export function FeaturedProjects() {
  const [openProject, setOpenProject] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const { setProjectOpen, openProject: openProjectContext, setCloseProjectCallback } = useProject()

  const handleProjectClick = (project) => {
    setLastScrollPosition(window.scrollY || window.pageYOffset)
    setOpenProject(project)
    setIsClosing(false)
    setProjectOpen(true)
    openProjectContext(project.projectId)
  }

  const handleCloseProject = useCallback(() => {
    setIsClosing(true)
    setProjectOpen(false)

    setTimeout(() => {
      setOpenProject(null)
      setIsClosing(false)
      window.scrollTo({ top: lastScrollPosition, behavior: 'instant' })
      document.body.style.overflow = 'auto'
    }, 600)
  }, [lastScrollPosition, setProjectOpen])

  const handleLogoClick = useCallback(() => {
    setIsClosing(true)
    setProjectOpen(false)

    setTimeout(() => {
      setOpenProject(null)
      setIsClosing(false)
      document.body.style.overflow = 'auto'
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }, [setProjectOpen])

  const handleCloseProjectContext = useCallback(() => {
    handleCloseProject()
  }, [handleCloseProject])

  useEffect(() => {
    if (openProject) setCloseProjectCallback(() => handleCloseProject)
    else setCloseProjectCallback(null)
    return () => setCloseProjectCallback(null)
  }, [openProject, setCloseProjectCallback, handleCloseProject])

  const orderedProjects = PROJECT_ORDER.map((id) =>
    featuredProjects.find((p) => p.projectId === id)
  ).filter(Boolean)

  return (
    <>
      <section className="relative z-[1] bg-transparent">
        <div className="w-full">

          {/* Línea superior */}
          <div className="w-full h-px bg-[#CCCCCC]"></div>

          {orderedProjects.map((project) => (
            <div
              key={project.id}
              style={{
                '--hover-color': project.hoverColor,
                '--hover-text': project.textColorOnHover,
              }}
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                image={project.image}
                projectId={project.projectId}
                description={project.description}
                      year={project.year}
                      country={project.country}
                      type={project.type}
                      tools={project.tools}
                behanceUrl={project.behanceUrl}
                      onProjectClick={() => handleProjectClick(project)}
                    />

              {/* Línea inferior */}
              <div className="w-full h-px bg-[#CCCCCC]"></div>
                  </div>
          ))}

              </div>
      </section>

      <ConfidentialModal isOpen={false} onClose={() => {}} />

      {openProject && (
        <ProjectDetail
          projectId={openProject.projectId}
          title={openProject.title}
          description={openProject.description}
          role={openProject.role}
          year={openProject.year}
          country={openProject.country}
          tools={openProject.tools}
          backgroundColor={openProject.backgroundColor}
          status={openProject.status}
          website={openProject.website}
          isConfidential={openProject.isConfidential}
          onClose={handleCloseProject}
          onLogoClick={handleLogoClick}
          isClosing={isClosing}
        />
      )}
    </>
  )
}
