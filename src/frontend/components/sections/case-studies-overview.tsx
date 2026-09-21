import Link from "next/link";
import { caseStudies } from "@/frontend/data/site-content";

export function CaseStudiesOverview() {
  return (
    <section className="page-shell section-space">
      <div className="section-heading light-bg">
        <div><p className="eyebrow">Selected outcomes</p><h2>Work that moved<br />the number.</h2></div>
        <p>Representative engagements. Client details are withheld where confidentiality matters.</p>
      </div>
      <div className="case-grid">
        {caseStudies.map((item) => (
          <article className="case-card" key={item.slug}>
            <div className="case-meta"><span>{item.index}</span><span>{item.sector}</span></div>
            <h3>{item.title}</h3><p>{item.summary}</p>
            <div className="case-result"><strong>{item.result}</strong><span>Engagement outcome</span></div>
          </article>
        ))}
      </div>
      <Link className="text-link spacious" href="/case-studies">View case studies <span>↗</span></Link>
    </section>
  );
}
