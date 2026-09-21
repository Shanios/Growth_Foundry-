export type Service = {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
};

export type CaseStudyPreview = {
  slug: string;
  sector: string;
  title: string;
  summary: string;
  result: string;
  index: string;
  image?: string | null;
};

export type ArticlePreview = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
};
