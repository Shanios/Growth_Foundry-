import Link from "next/link";
import { articles } from "@/frontend/data/site-content";

export function InsightsOverview() {
  return (
    <section className="insights-section section-space">
      <div className="page-shell section-heading light-bg">
        <div><p className="eyebrow">Latest thinking</p><h2>Ideas for leaders<br />in motion.</h2></div>
        <Link className="text-link" href="/blog">All insights <span>↗</span></Link>
      </div>
      <div className="page-shell article-list">
        {articles.map((article, index) => (
          <article key={article.title} className="article-row">
            <span>0{index + 1}</span>
            <div><p className="article-category">{article.category}</p><h3>{article.title}</h3><p>{article.excerpt}</p></div>
            <div className="article-date">{article.date}<br />{article.read}</div><span className="row-arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
