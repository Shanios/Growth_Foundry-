import { PublicPage } from "@/frontend/components/layout/public-page";
import { ResultsSection } from "@/frontend/components/sections/results-section";
import { BeliefSection } from "@/frontend/components/sections/belief-section";
import { CaseStudiesOverview } from "@/frontend/components/sections/case-studies-overview";
import { HomeHero } from "@/frontend/components/sections/home-hero";
import { InsightsOverview } from "@/frontend/components/sections/insights-overview";
import { ServicesOverview } from "@/frontend/components/sections/services-overview";
import { NewsletterForm } from "@/frontend/components/forms/newsletter-form";

export default function HomePage() {
  return (
    <PublicPage>
      <HomeHero />
      <BeliefSection />
      <ServicesOverview />
       <ResultsSection />
      <CaseStudiesOverview />
      <InsightsOverview />

      <section className="page-shell section-space newsletter-section">
        <div className="section-heading light-bg">
          <div>
            <p className="eyebrow">
              Stay in the loop
            </p>

            <h2>
              Useful thinking,
              <br />
              <em>without the noise.</em>
            </h2>
          </div>

          <p>
            Occasional Growth Foundry perspectives on strategy,
            commercial systems, operating models and transformation.
          </p>
        </div>

        <NewsletterForm />
      </section>
    </PublicPage>
  );
}