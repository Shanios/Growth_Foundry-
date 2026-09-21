import type { Metadata } from "next";
import { ContactForm } from "@/frontend/components/forms/contact-form";
import { PublicPage } from "@/frontend/components/layout/public-page";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation with Growth Foundry." };

export default function ContactPage() {
  return (
    <PublicPage>
      <section className="inner-hero page-shell"><p className="eyebrow">Contact</p><h1>Bring us the ambition.<br /><em>And the friction.</em></h1><p className="inner-intro">Tell us what you are trying to achieve, where progress is getting stuck, and why it matters now.</p></section>
      <section className="page-shell contact-layout">
        <div className="contact-notes"><div><p className="eyebrow">Good starting points</p><p>A growth question that needs sharper choices. An operating model that has not kept pace. A transformation that needs momentum.</p></div><div><p className="eyebrow">Direct</p><p><a href="mailto:hello@growthfoundry.co">hello@growthfoundry.co</a><br />India · International</p></div></div>
        <ContactForm />
      </section>
    </PublicPage>
  );
}
