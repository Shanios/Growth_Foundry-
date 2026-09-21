import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="eyebrow light">Ready when the ambition is.</p>
        <h2>Make the next stage<br />more deliberate.</h2>
        <Link className="circle-link light" href="/contact" aria-label="Contact Growth Foundry">↗</Link>
      </div>
      <div className="footer-grid">
        <div><span className="brand-mark inverse" aria-hidden="true">GF</span><p>Growth Foundry<br />Strategy into momentum.</p></div>
<nav aria-label="Footer navigation">
  <Link href="/services">Services</Link>
  <Link href="/case-studies">Case studies</Link>
  <Link href="/blog">Blog</Link>
  <Link href="/contact">Contact</Link>

  <Link
    href="/admin/login"
    className="footer-admin-link"
  >
    Admin
  </Link>
</nav>
        <div><p>Working across India<br />and international markets.</p><a href="mailto:hello@growthfoundry.co">hello@growthfoundry.co</a></div>
      </div>
      <div className="footer-meta"><span>© 2026 Growth Foundry</span><span>Temporary identity — brand system in development</span></div>
    </footer>
  );
}
