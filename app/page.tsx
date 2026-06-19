import { HomeNavbar } from '@/components/home-navbar'
import { HomeHero } from '@/components/home-hero'

export default function Page() {
  return (
    <main className="bg-background min-h-screen">
      <HomeNavbar />
      <HomeHero />
    </main>
  )
}
