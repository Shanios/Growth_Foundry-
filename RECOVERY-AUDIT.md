# Growth Foundry — Recovered Source Audit

## What was recovered

The ZIP contains the actual Growth Foundry application source rather than a static HTML export. The public site is implemented in Next.js/React/TypeScript and contains the homepage, services, case studies, blog, contact page, admin console, shared header/footer, site CSS, sample content, and the hero image asset.

The recovered homepage directly matches the screen recording, including:

- “Growth, made executable.” hero
- architectural `growth-path.png` visual
- “Strategy matters when it changes what an organisation does next.” statement
- “Four levers. One growth system.” section
- selected outcomes/case studies
- “Ideas for leaders in motion.” insights section
- Growth Foundry footer/contact treatment

## Recovered backend architecture

The recovered source was originally tailored to a ChatGPT Sites / Cloudflare deployment:

- Cloudflare D1 (SQLite)
- Drizzle ORM
- Cloudflare R2 media storage
- ChatGPT-hosted sign-in for `/admin`
- Vinext/Vite/Cloudflare Worker build tooling

That architecture does not match the supplied SRS.

## Migration performed in this working copy

The public visual implementation was retained while the backend/platform layer was migrated to:

- Standard Next.js scripts (`next dev`, `next build`, `next start`)
- MySQL
- Prisma ORM
- `AdminUser`, `CaseStudy`, `BlogPost`, and `ContactInquiry` Prisma models
- bcrypt password hashing
- signed JWT admin sessions
- HTTP-only session cookie
- middleware protection for `/admin/*` and `/api/cms/*`
- custom `/admin/login`
- Prisma-backed case-study and blog CMS CRUD
- MySQL-backed contact enquiries
- initial MySQL Prisma migration
- admin creation script

## Animation audit

The recovered website does not contain GSAP, Framer Motion, ScrollTrigger, IntersectionObserver animation logic, or scroll-linked section transitions.

Current motion consists mainly of:

- CSS smooth scrolling
- initial hero rise/fade animation
- hover color/background transitions

Premium scroll animation can therefore be added without needing to preserve an existing animation framework.

## Still intentionally temporary

- Logo/wordmark remains temporary, as requested.
- Font stack remains the recovered temporary Helvetica/Baskerville-style pairing.
- Media upload currently saves to `public/uploads` for local/persistent-server use. It should be switched to S3/Vercel Blob/R2 when the production hosting provider is selected.
- Case-study/blog bodies are stored as long text; a rich-text editor can be added to the CMS later.

## Verification note

Static inspection and a TypeScript syntax pass were completed. Package installation could not be completed inside the current execution environment because the npm install process repeatedly timed out before dependencies were downloaded. Run `npm install` locally, then `npm run build`, after configuring `.env`.
