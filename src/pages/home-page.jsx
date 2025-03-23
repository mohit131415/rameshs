import HeroSlider from "../components/home/hero-slider"
import BestSellers from "../components/home/best-sellers"
import CategorySection from "../components/home/category-section"
// import ShowcaseSection from "../components/home/showcase-sectionc"
import ShowcaseSection from "../components/home/showcase-section"
import QuickPicks from "../components/home/quick-picks"
import CTASection from "../components/home/cta-section"
import TestimonialsSection from "../components/home/testimonials-section"
import InstagramSection from "../components/home/instagram-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      <BestSellers /> {/* Changed from FreshlyMade */}
      <ShowcaseSection />
      <CategorySection />
      <QuickPicks />
      <TestimonialsSection />
      <InstagramSection />
      <CTASection />
    </div>
  )
}

