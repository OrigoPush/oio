'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

interface UseCarouselNavigationProps {
  totalFrames: number
}

export function useCarouselNavigation({ totalFrames }: UseCarouselNavigationProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)

  // Update current frame based on scroll position
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const updateCurrentFrame = () => {
      const scrollLeft = carousel.scrollLeft
      const frameWidth = carousel.clientWidth
      const newFrame = Math.round(scrollLeft / frameWidth)
      setCurrentFrame(newFrame)
    }

    carousel.addEventListener('scroll', updateCurrentFrame)
    updateCurrentFrame() // Initial update

    return () => {
      carousel.removeEventListener('scroll', updateCurrentFrame)
    }
  }, [])

  const handleNext = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const frameWidth = carousel.clientWidth
    const nextFrame = Math.min(currentFrame + 1, totalFrames - 1)
    carousel.scrollTo({
      left: nextFrame * frameWidth,
      behavior: 'smooth',
    })
  }, [currentFrame, totalFrames])

  const handlePrevious = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const frameWidth = carousel.clientWidth
    const prevFrame = Math.max(currentFrame - 1, 0)
    carousel.scrollTo({
      left: prevFrame * frameWidth,
      behavior: 'smooth',
    })
  }, [currentFrame])

  return {
    carouselRef,
    currentFrame,
    totalFrames,
    handleNext,
    handlePrevious,
    canGoNext: currentFrame < totalFrames - 1,
    canGoPrevious: currentFrame > 0,
  }
}

