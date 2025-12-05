import { Hero } from '@/components/home/Hero'
import { WorkTitle } from '@/components/work-title'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="bg-[#F5F5F5]">
      <Hero />
      <WorkTitle />
      <FeaturedProjects />
      <Footer />
    </main>
  )
}
