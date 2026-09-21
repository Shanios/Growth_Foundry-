import type { Metadata } from "next";

import { PublicPage } from "@/frontend/components/layout/public-page";
import { ServicesHero } from "@/frontend/components/sections/services-hero";
import {
  servicePillars,
  services,
} from "@/frontend/data/site-content";

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


        <div className="service-pillar-list">

          {servicePillars.map((pillar) => (
            <article
              className="service-pillar"
              key={pillar.number}
            >

              <span className="service-pillar-number">
                {pillar.number}
              </span>


              <div className="service-pillar-name">

                <span className="service-pillar-label">
                  {pillar.label}
                </span>

                <h2>
                  {pillar.title}
                </h2>

              </div>


              <div className="service-pillar-content">

                <p>
                  {pillar.description}
                </p>

                <div className="service-pillar-capabilities">

                  {pillar.capabilities.map(
                    (capability) => (
                      <span key={capability}>
                        {capability}
                      </span>
                    )
                  )}

                </div>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* Detailed capabilities */}
      <section className="page-shell subpage-section">

        <div className="capabilities-heading">

          <p className="eyebrow">
            Capabilities
          </p>

          <h2>
            Four levers.
            <br />
            <em>One growth system.</em>
          </h2>

        </div>


        <div className="capability-grid">

          {services.map((service) => (
            <article
              className="capability-card"
              key={service.number}
            >

              <span className="number">
                {service.number}
              </span>

              <h2>
                {service.title}
              </h2>

              <p>
                {service.description}
              </p>

              <ul>
                {service.capabilities.map(
                  (capability) => (
                    <li key={capability}>
                      {capability}
                    </li>
                  )
                )}
              </ul>

            </article>
          ))}

        </div>

      </section>

    </PublicPage>
  );
}