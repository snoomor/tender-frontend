import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { TendersSection } from "@/components/tenders-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const isAuthenticated = false

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {!isAuthenticated && <HeroBanner />}
      <TendersSection />
      <Footer />
    </div>
  )
}
