'use client'

import { RefObject, useEffect, useState } from 'react'
import { motion, useAnimationControls, useMotionValue } from 'framer-motion'

interface GlobalDraggableLogoProps {
  containerRef: RefObject<HTMLElement>
}

export function GlobalDraggableLogo({ containerRef }: GlobalDraggableLogoProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [initialized, setInitialized] = useState(false)
  const [isPositioned, setIsPositioned] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hintDone, setHintDone] = useState(false)
  const hintControls = useAnimationControls()

  useEffect(() => {
    const anchor = document.getElementById('draggable-logo-anchor')
    const container = containerRef.current
    if (!anchor || !container) return

    const rect = anchor.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    x.set(rect.left - containerRect.left)
    y.set(rect.top - containerRect.top)
    setInitialized(true)
    setIsPositioned(true)
  }, [containerRef, x, y])

  useEffect(() => {
    if (!isPositioned || hintDone) return

    let cancelled = false
    let frameOne: number | null = null
    let frameTwo: number | null = null

    const startHint = () => {
      hintControls
        .start({
          y: [0, -18, 0, -10, 0, -4, 0],
          transition: {
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          },
        })
        .then(() => {
          if (!cancelled) {
            setHintDone(true)
          }
        })
    }

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        if (!cancelled) {
          startHint()
        }
      })
    })

    return () => {
      cancelled = true
      if (frameOne) cancelAnimationFrame(frameOne)
      if (frameTwo) cancelAnimationFrame(frameTwo)
      hintControls.stop()
    }
  }, [hintControls, hintDone, isPositioned])

  const resetHintMotion = () => {
    hintControls.stop()
    hintControls.start({
      y: 0,
      transition: { duration: 0.12, ease: 'easeOut' },
    })
  }

  const cancelHintIfActive = () => {
    if (hintDone) return
    resetHintMotion()
    setHintDone(true)
  }

  if (!initialized) {
    return null
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileTap={{ scale: 0.98 }}
      onDragStart={() => {
        setIsDragging(true)
        cancelHintIfActive()
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`absolute z-[2000] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        top: 0,
        left: 0,
        width: 'clamp(200px, 30vw, 360px)',
        touchAction: 'none',
        mixBlendMode: 'difference',
        x,
        y,
      }}
    >
      <motion.div animate={hintControls} initial={{ y: 0 }}>
        <img
          src="/logo_oi0_mask_navidad.svg"
          alt="Logo MASK"
          draggable={false}
          className="w-full h-auto"
        />
      </motion.div>
    </motion.div>
  )
}
