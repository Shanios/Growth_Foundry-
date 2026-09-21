# Growth Foundry

Recovered Growth Foundry frontend migrated to the SRS backend architecture.

## Frontend architecture

The recovered visual design has been reorganized into a maintainable `src/` architecture. Route pages live in `src/app`, reusable layout modules in `src/components/layout`, homepage modules in `src/components/sections`, forms in `src/components/forms`, admin modules in `src/components/admin`, and static content in `src/data`. See `STRUCTURE.md` for the full map.


## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS 4
- MySQL
- Prisma ORM
- JWT admin sessions stored in secure HTTP-only cookies
- Custom CMS for case studies and insights

The public visual design is preserved from the recovered project. The previous Cloudflare D1/Drizzle and ChatGPT-hosted authentication dependencies have been removed.

## 1. Requirements

- Node.js 20.9+
- MySQL 8+

## 2. Environment

Copy `.env.example` to `.env`:

```env
DATABASE_URL="mysql://root:password@127.0.0.1:3306/growth_foundry"
JWT_SECRET="replace-with-a-long-random-secret-at-least-32-characters"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Create the database if it does not already exist:

```sql
CREATE DATABASE growth_foundry CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 3. Install and create tables

```bash
npm install
npm run db:generate
npm run db:migrate -- --name init
```

## 4. Create an admin user

```bash
npm run admin:create -- admin "change-this-password" admin@example.com
```

The email argument is optional.

## 5. Run

```bash
npm run dev
```

Public site: `http://localhost:3000`

Admin login: `http://localhost:3000/admin/login`

## Routes

- `/` Home
- `/services`
- `/case-studies`
- `/blog`
- `/contact`
- `/admin/login`
- `/admin`

## CMS behavior

The admin area supports create, edit, publish/unpublish, delete, and image upload for case studies and insights. Published case studies and blog posts are read from MySQL. If the database is temporarily unavailable, the public case-study and blog listing pages fall back to the recovered static sample content rather than crashing.

## Image upload note

The current upload route writes files to `public/uploads` so the recovered CMS can be used immediately in local or persistent-server deployments. Before deploying to a serverless/immutable filesystem, replace `app/api/cms/upload/route.ts` with S3, Vercel Blob, or another cloud object-storage adapter. This is the remaining storage item from the SRS that is intentionally deployment-provider dependent.

## Security

- Admin credentials are stored as bcrypt password hashes.
- Successful login creates a signed JWT.
- The JWT is stored in an HTTP-only cookie.
- `middleware.ts` protects `/admin/*` and `/api/cms/*`.
- CMS API handlers also verify the session server-side.

## Database models

- `AdminUser`
- `CaseStudy`
- `BlogPost`
- `ContactInquiry`

See `prisma/schema.prisma`.
