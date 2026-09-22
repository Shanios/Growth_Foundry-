import { PublicPage } from "@/frontend/components/layout/public-page";
import { ResultsSection } from "@/frontend/components/sections/results-section";
import { BeliefSection } from "@/frontend/components/sections/belief-section";
import { GrowthSystemVisual } from "@/frontend/components/sections/growth-system-visual";
import { CaseStudiesOverview } from "@/frontend/components/sections/case-studies-overview";
import { HomeHero } from "@/frontend/components/sections/home-hero";
import { InsightsOverview } from "@/frontend/components/sections/insights-overview";
import { ServicesOverview } from "@/frontend/components/sections/services-overview";
import { NewsletterForm } from "@/frontend/components/forms/newsletter-form";
import { NewsletterReveal } from "@/frontend/components/interactive/home-section-reveals";

export default function HomePage() {
  return (
    <PublicPage>
      <HomeHero />
      <BeliefSection />
      <GrowthSystemVisual />
      <ServicesOverview />
      <ResultsSection />
      <CaseStudiesOverview />
      <InsightsOverview />

      <NewsletterReveal>
        <div className="newsletter-premium">
          <p className="eyebrow light">Growth Foundry insights</p>
          <h2>Stay close to<br /><em>what moves growth.</em></h2>
          <p className="newsletter-intro">Practical perspectives on strategy, commercial systems and transformation. Delivered occasionally — never noisily.</p>
          <NewsletterForm />
        </div>
      </NewsletterReveal>
    </PublicPage>
  );
}
