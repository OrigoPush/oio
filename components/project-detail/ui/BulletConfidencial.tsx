'use client'

interface BulletConfidencialProps {
  backgroundColor: string
}

/**
 * Bullet component for confidential projects
 * Uses same color inversion technique as navbar: mix-blend-mode: difference
 */
export function BulletConfidencial({ backgroundColor }: BulletConfidencialProps) {
  return (
    <span
      className="inline-flex items-center w-fit px-3 py-1 rounded-full text-sm font-medium"
      style={{
        mixBlendMode: 'difference',
        color: backgroundColor, // Text color = background color of section
        backgroundColor: '#FAFAFA', // Base white color, will be inverted by mix-blend-mode
      }}
    >
      Confidencial
    </span>
  )
}

