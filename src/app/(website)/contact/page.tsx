import type { Metadata } from "next";

import { ContactForm } from "@/frontend/components/forms/contact-form";
import { ContactPanelReveal } from "@/frontend/components/interactive/contact-panel-reveal";
import { PublicPage } from "@/frontend/components/layout/public-page";
import { ContactHero } from "@/frontend/components/sections/contact-hero";
import { ContactVisual } from "@/frontend/components/sections/contact-visual";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Growth Foundry.",
};

export default function ContactPage() {
  return (
    <PublicPage>
      <section className="contact-page page-shell" style={{ paddingTop: 0 }}>
        <ContactHero />

        <ContactPanelReveal>
        <div className="contact-panel">
          <aside className="contact-info-panel">
            <div>
              <p className="eyebrow light">Contact information</p>
              <h2>Bring us the ambition.<br /><em>And the friction.</em></h2>
              <p className="contact-info-copy">Share where you are and what you&apos;re navigating. We&apos;ll review it and respond with the appropriate next step.</p>
            </div>
            <ContactVisual />
            <div className="contact-info-details">
              <div className="contact-info-item">
                <span className="contact-info-icon" aria-hidden="true">↗</span>
                <div><small>Email</small><a href="mailto:hello@growthfoundry.co">hello@growthfoundry.co</a></div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon" aria-hidden="true">◎</span>
                <div><small>Working across</small><p>India &amp; international markets</p></div>
              </div>
            </div>
            <div className="contact-decoration" aria-hidden="true"><span /><span /></div>
          </aside>
          <div className="contact-form-panel"><ContactForm /></div>
        </div>
        </ContactPanelReveal>
      </section>
    </PublicPage>
  );
}
