/**
 * Utilidades para proyectos
 * Funciones helper para obtener logos, stickers, colores y configuraciones de proyectos
 */

export type ProjectId = 
  | 'push'
  | 'catalonia'
  | 'rank'
  | 'talengo'
  | 'bk'
  | 'rbi'
  | 'santalucia'
  | 'popeyes'

/**
 * Obtiene la ruta del logo de un proyecto
 */
export function getProjectLogo(projectId: string): string {
  const logos: Record<string, string> = {
    push: '/logo_push.png',
    catalonia: '/logo_catalonia.png',
    popeyes: '/logo_popeyes.png',
    rbi: '/logo_rbi.png',
    rmh: '/logo_rmh.png',
    rank: '/logo_rmh.png',
    santalucia: '/logo_santalucia.png',
    talengo: '/logo_talengo.png',
    bk: '/logo_bk.png',
  }
  return logos[projectId] || '/placeholder-logo.svg'
}

/**
 * Obtiene el sticker para proyectos confidenciales
 */
export function getConfidentialSticker(projectId: string): string | null {
  const stickerMap: Record<string, string> = {
    talengo: '/ms_sticker_1.png',
    rbi: '/ms_sticker_2.png',
    bk: '/ms_sticker_3.png',
  }
  return stickerMap[projectId] || null
}

/**
 * Obtiene la imagen de fondo para el Frame 7 (hero visual)
 */
export function getFrame7BackgroundImage(projectId: string): string {
  switch (projectId) {
    case 'push':
      return '/bluesky.png'
    case 'catalonia':
      return '/caribe_catalonia.jpg'
    case 'santalucia':
      return '/card_santalucia.png'
    default:
      return `/card_${projectId}.png`
  }
}

/**
 * Obtiene el color de fondo específico del proyecto (puede sobrescribir el backgroundColor pasado)
 */
export function getProjectBackgroundColor(projectId: string, defaultColor: string): string {
  switch (projectId) {
    case 'catalonia':
      return '#F6D57A'
    case 'rank':
      return '#F1965B'
    case 'talengo':
      return '#84BDC9'
    case 'rbi':
      return '#AE2825'
    default:
      return defaultColor
  }
}

/**
 * Obtiene el color de texto según el proyecto
 */
export function getTextColor(projectId: string): string {
  switch (projectId) {
    case 'catalonia':
      return '#1D1D1B'
    case 'rank':
      return '#1D1D1B'
    case 'bk':
      return '#000000'
    default:
      return '#FAFAFA'
  }
}

/**
 * Obtiene el color del borde según el color del texto
 */
export function getBorderColor(textColor: string): string {
  // Black text → black border
  if (textColor === '#1D1D1B' || textColor === '#000000') {
    return 'border-black/20'
  }
  // White text → white border
  if (textColor === '#FAFAFA') {
    return 'border-white/30'
  }
  // Gray text → gray border (fallback)
  return 'border-gray-500/30'
}

/**
 * Obtiene la altura del logo según el proyecto
 */
export function getLogoHeight(projectId: string): string {
  if (projectId === 'push' || projectId === 'rank' || projectId === 'talengo') {
    return 'h-8 sm:h-10 md:h-12'
  }
  return 'h-10 sm:h-12 md:h-14 lg:h-16'
}

/**
 * Proyectos que deben mostrar sticker confidencial
 */
export const ALLOWED_STICKER_PROJECTS = ['talengo', 'rbi', 'bk'] as const

/**
 * Proyectos confidenciales
 */
export const CONFIDENTIAL_PROJECTS = ['talengo', 'bk', 'rbi'] as const

/**
 * Proyectos que usan carousel con background especial
 */
export const CAROUSEL_WITH_BACKGROUND_PROJECTS = ['catalonia', 'santalucia'] as const

/**
 * Verifica si un proyecto debe mostrar sticker
 */
export function shouldShowSticker(projectId: string, isConfidential: boolean): boolean {
  return isConfidential && ALLOWED_STICKER_PROJECTS.includes(projectId as any)
}

/**
 * Verifica si un proyecto es confidencial
 */
export function isConfidentialProject(projectId: string): boolean {
  return CONFIDENTIAL_PROJECTS.includes(projectId as any)
}

