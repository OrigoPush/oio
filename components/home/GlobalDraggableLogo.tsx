'use client'

import { RefObject, useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

interface GlobalDraggableLogoProps {
  containerRef: RefObject<HTMLElement>
}

export function GlobalDraggableLogo({ containerRef }: GlobalDraggableLogoProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [initialized, setInitialized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const anchor = document.getElementById('draggable-logo-anchor')
    const container = containerRef.current
    if (!anchor || !container) return

    const rect = anchor.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    x.set(rect.left - containerRect.left)
    y.set(rect.top - containerRect.top)
    setInitialized(true)
  }, [containerRef, x, y])

  if (!initialized) {
    return null
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileTap={{ scale: 0.98 }}
      onDragStart={() => setIsDragging(true)}
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
      <img
        src="/logo_oi0_mask_navidad.svg"
        alt="Logo MASK"
        draggable={false}
        className="w-full h-auto"
      />
    </motion.div>
  )
}
