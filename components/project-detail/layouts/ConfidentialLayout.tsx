'use client'

import { LayoutContainer } from '@/components/ui/layout-container'
import { getProjectLogo, getLogoHeight, getProjectBackgroundColor, getTextColor, getBorderColor } from '@/lib/projects'
import { BulletConfidencial } from '../ui/BulletConfidencial'
import { Sticker } from '../ui/Sticker'

interface ConfidentialLayoutProps {
  projectId: string
  title: string
  description?: string
  year?: string
  country?: string
  tools?: string[]
  website?: string
  backgroundColor: string
  isConfidential: boolean
  sticker?: string | null
  onLogoClick?: () => void
  animationClasses: string
}

export function ConfidentialLayout({
  projectId,
  title,
  description,
  year,
  country,
  tools,
  website,
  backgroundColor,
  isConfidential,
  sticker,
  onLogoClick,
  animationClasses,
}: ConfidentialLayoutProps) {
  const finalBackgroundColor = getProjectBackgroundColor(projectId, backgroundColor)
  const textColor = getTextColor(projectId)
  const borderColor = getBorderColor(textColor)
  const locationString = [country, year].filter(Boolean).join(' · ')

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick()
    }
  }

  const bulletStyle = `inline-flex px-4 h-8 items-center rounded-full border ${borderColor} text-sm font-medium`

  return (
    <div
      className={`fixed inset-0 z-[80] overflow-hidden ${animationClasses}`}
      style={{ backgroundColor: finalBackgroundColor }}
    >
      {/* Content block - bottom left */}
      <div className="w-full h-screen flex items-end relative">
        <LayoutContainer className="pb-12 sm:pb-16 md:pb-20 relative">
          {/* Sticker positioned absolutely - right side, vertically centered */}
          {sticker && <Sticker src={sticker} />}

          <div className="w-full flex flex-col items-start space-y-6 sm:space-y-8 md:space-y-10">
            {/* LOGO */}
            {projectId === 'bk' ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={getProjectLogo(projectId)}
                  alt={`${title} logo`}
                  className={`${getLogoHeight(projectId)} w-auto opacity-90 cursor-pointer hover:opacity-100 transition`}
                  onClick={handleLogoClick}
                />
                <img
                  src="/logo_popeyes.png"
                  alt="Popeyes logo"
                  className={`${getLogoHeight(projectId)} w-auto opacity-90 cursor-pointer hover:opacity-100 transition`}
                  onClick={handleLogoClick}
                />
              </div>
            ) : (
              <img
                src={getProjectLogo(projectId)}
                alt={`${title} logo`}
                className={`${getLogoHeight(projectId)} w-auto opacity-90 cursor-pointer hover:opacity-100 transition`}
                onClick={handleLogoClick}
              />
            )}

            {/* BULLET CONFIDENCIAL */}
            {isConfidential && (
              <BulletConfidencial backgroundColor={finalBackgroundColor} />
            )}

            {/* BLOQUE DE INFO */}
            <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-10 text-left w-full" style={{ color: textColor }}>
              {/* BLOQUE LOCALIZACIÓN */}
              {locationString && (
                <div className="flex flex-col space-y-2">
                  <p className="uppercase tracking-[0.15em] text-xs sm:text-sm font-semibold opacity-80">
                    Localización
                  </p>
                  <p className="text-sm sm:text-base md:text-lg">
                    {locationString}
                  </p>
                </div>
              )}

              {/* BLOQUE TOOLS */}
              {tools && tools.length > 0 && (
                <div className="flex flex-col space-y-2">
                  <p className="uppercase tracking-[0.15em] text-xs sm:text-sm font-semibold opacity-80">
                    Tools
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className={bulletStyle}
                        style={{ color: textColor }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* BLOQUE WEB */}
              {website && (
                <div className="flex flex-col space-y-2">
                  <p className="uppercase tracking-[0.15em] text-xs sm:text-sm font-semibold opacity-80">
                    Web
                  </p>
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sm sm:text-base opacity-90 hover:opacity-100 transition"
                    style={{ color: textColor }}
                  >
                    Visitar sitio
                  </a>
                </div>
              )}

              {/* BLOQUE DESCRIPCIÓN */}
              {description && (
                <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-3xl">
                  {description}
                </p>
              )}
            </div>
          </div>
        </LayoutContainer>
      </div>
    </div>
  )
}

