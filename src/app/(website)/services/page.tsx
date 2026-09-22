import type { Metadata } from "next";
import Link from "next/link";

import { PublicPage } from "@/frontend/components/layout/public-page";
import { ServicesHero } from "@/frontend/components/sections/services-hero";
import { CapabilityGrid } from "@/frontend/components/sections/capability-grid";
import { ServicePillars } from "@/frontend/components/sections/service-pillars";
import { CapabilitiesHeading } from "@/frontend/components/sections/capabilities-heading";
import { ServicesProofHeading } from "@/frontend/components/sections/services-proof-heading";
import { caseStudies } from "@/frontend/data/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Advisory and execution support spanning growth strategy, operating model, commercial acceleration, and transformation delivery.",
};

export default function ServicesPage() {
  return (
    <PublicPage>

<ServicesHero />


      {/* Advisory / Execution */}
      <section className="service-pillars page-shell">

        <div className="service-pillars-heading">

          <p className="eyebrow">
            How we work
          </p>

          <p>
            Two complementary modes of support,
            connected by one objective: turning
            strategic intent into operating
            performance.
          </p>

        </div>


        <ServicePillars />

      </section>


      {/* Detailed capabilities */}
      <section className="page-shell subpage-section">

        <CapabilitiesHeading />


        <CapabilityGrid />

      </section>

      <section className="services-proof page-shell" aria-labelledby="services-proof-title">
        <ServicesProofHeading />
        <div className="services-proof-list">
          {caseStudies.map((study) => (
            <Link className="services-proof-row" href="/case-studies" key={study.slug}>
              <span className="services-proof-sector">{study.sector}</span>
              <span className="services-proof-title">{study.title}</span>
              <strong>{study.result}</strong>
              <span className="services-proof-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <div className="services-proof-action">
          <p>Have a growth challenge worth working through?</p>
          <Link href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

    </PublicPage>
  );
}
