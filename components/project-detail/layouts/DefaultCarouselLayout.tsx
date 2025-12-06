'use client'

import { CarouselArrows } from '../ui/CarouselArrows'
import { InfoFrame } from '../frames/InfoFrame'
import { HeroFrame } from '../frames/HeroFrame'
import { getProjectBackgroundColor, getTextColor, getBorderColor, getFrame7BackgroundImage } from '@/lib/projects'
import { useCarouselNavigation } from '@/hooks/useCarouselNavigation'

interface Frame {
  id: string
  type: 'info' | 'hero'
}

interface DefaultCarouselLayoutProps {
  projectId: string
  title: string
  description?: string
  year?: string
  country?: string
  tools?: string[]
  website?: string
  backgroundColor: string
  status?: string
  frames: Frame[]
  animationClasses: string
  backgroundImage?: string
}

export function DefaultCarouselLayout({
  projectId,
  title,
  description,
  year,
  country,
  tools,
  website,
  backgroundColor,
  status,
  frames,
  animationClasses,
  backgroundImage,
}: DefaultCarouselLayoutProps) {
  const finalBackgroundColor = getProjectBackgroundColor(projectId, backgroundColor)
  const textColor = getTextColor(projectId)
  const borderColor = getBorderColor(textColor)
  const locationString = [country, year].filter(Boolean).join(' · ')
  const heroImage = projectId === 'push' ? '/bluesky.png' : `/card_${projectId}.png`

  const { carouselRef, currentFrame, totalFrames, handleNext, handlePrevious, canGoNext, canGoPrevious } = useCarouselNavigation({ totalFrames: frames.length })

  return (
    <div
      className={`min-h-screen w-full overflow-hidden ${animationClasses}`}
      style={{ backgroundColor: finalBackgroundColor }}
    >
      {/* Carousel Container - Horizontal scroll with snap */}
      <div
        ref={carouselRef}
        className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {/* Render frames */}
        {frames.map((frame) => {
          if (frame.type === 'info') {
            return (
              <div key={frame.id} className="relative">
                <InfoFrame
                  projectId={projectId}
                  title={title}
                  locationString={locationString}
                  tools={tools}
                  website={website}
                  description={description}
                  backgroundColor={finalBackgroundColor}
                  textColor={textColor}
                  borderColor={borderColor}
                />
              </div>
            )
          }
          if (frame.type === 'hero') {
            return (
              <div key={frame.id} className="relative">
                <HeroFrame
                  projectId={projectId}
                  title={title}
                  status={status}
                  heroImage={heroImage}
                />
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Carousel Navigation Arrows */}
      <CarouselArrows
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        currentFrame={currentFrame}
        totalFrames={totalFrames}
      />

      {/* Hide scrollbar for webkit browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

