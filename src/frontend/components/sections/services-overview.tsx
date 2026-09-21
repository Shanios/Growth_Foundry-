import Link from "next/link";
import { services } from "@/frontend/data/site-content";

export function ServicesOverview() {
  return (
    <section className="services-section section-space">
      <div className="page-shell section-heading">
        <div><p className="eyebrow light">Our work</p><h2>Four levers.<br />One growth system.</h2></div>
        <p>Focused advisory and hands-on delivery for leadership teams navigating a critical stage of growth.</p>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <article key={service.number} className="service-row page-shell">
            <span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><span className="row-arrow">↗</span>
          </article>
        ))}
      </div>
      <div className="page-shell section-action"><Link className="button-light" href="/services">See all capabilities</Link></div>
    </section>
  );
}
