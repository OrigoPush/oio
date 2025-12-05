/**
 * Design Tokens - Sistema de diseño centralizado
 * Contiene todos los valores de diseño reutilizables sin cambiar la UI actual
 */

// Colores principales
export const colors = {
  brand: {
    background: '#FAFAFA',
    backgroundDark: '#050505',
    textPrimary: '#FAFAFA',
    textDark: '#1D1D1B',
    textBlack: '#000000',
  },
  projects: {
    push: '#865DE5',
    catalonia: '#F6D57A',
    rank: '#F1965B',
    talengo: '#3A7D8C',
    bk: '#E7863F',
    rbi: '#AE2825',
    santalucia: '#F29E39',
  },
} as const

// Espaciados base (para paddings y margins)
export const spacing = {
  section: {
    sm: 'pb-12 sm:pb-16 md:pb-20',
    lg: 'py-12 sm:py-16 md:py-20 lg:py-24',
  },
  content: {
    xs: 'space-y-2',
    sm: 'space-y-6 sm:space-y-8 md:space-y-10',
  },
  logo: {
    mb: 'mb-4 sm:mb-6 md:mb-10',
  },
} as const

// Tamaños de logos
export const logoHeights = {
  small: 'h-8 sm:h-10 md:h-12',
  default: 'h-10 sm:h-12 md:h-14 lg:h-16',
  hero: 'h-12 sm:h-16 md:h-24 lg:h-32',
} as const

// Tamaños de texto
export const textSizes = {
  label: 'text-xs sm:text-sm',
  body: 'text-sm sm:text-base',
  bodyLarge: 'text-sm sm:text-base md:text-lg',
  heading: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
} as const

// Opacidades
export const opacity = {
  subtle: 'opacity-80',
  medium: 'opacity-90',
  full: 'opacity-100',
} as const

// Breakpoints (ya están en Tailwind, pero los documentamos aquí)
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

// Alturas estándar
export const heights = {
  screen: 'h-screen',
  minScreen: 'min-h-screen',
  full: 'h-full',
} as const

// Z-index layers
export const zIndex = {
  navbar: 90,
  projectDetail: 80,
  carouselArrows: 85,
  overlay: 60,
  drawer: 70,
} as const

// Border colors según text color
export const borderColors = {
  dark: 'border-black/20',
  light: 'border-white/30',
  gray: 'border-gray-500/30',
} as const

