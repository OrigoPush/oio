import type { Metadata } from 'next'
import { Space_Grotesk, Oooh_Baby, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { TopTicker } from '@/components/TopTicker'
import Navbar from '@/components/layout/Navbar'
import { ProjectProvider } from '@/contexts/project-context'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const ooohBaby = Oooh_Baby({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-logo',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Rodrigo Sánchez — Product Designer',
  description: 'Product Designer specializing in UX/UI, Web, Systems, XR & AI',

  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }, // favicon principal
    ],
    apple: '/icon.png', // si quieres un PNG para Apple, sino bórralo
  },

  openGraph: {
    title: 'Rodrigo Sánchez — Product Designer',
    description: 'Portfolio de diseño digital, producto, UX/UI, XR y sistemas',
    images: ['/og-image.png'], // si aún no lo tienes, puedo generarlo
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${ooohBaby.variable} ${manrope.variable} font-sans antialiased`}
      >
        <ProjectProvider>
          <TopTicker />
          <Navbar />
          {children}
        </ProjectProvider>
        <Analytics />
      </body>
    </html>
  )
}
