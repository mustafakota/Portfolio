import Navbar from '../components/layout/Navbar'
import { HeroSection } from '../features/hero'
import { AboutSection } from '../features/about'
import { ProjectsSection } from '../features/projects'
import { JourneySection } from '../features/journey'
import { ContactSection } from '../features/contact'

export default function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 10 }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
    </main>
  )
}
