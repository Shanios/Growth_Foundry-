# Growth Foundry project structure

This project uses the Next.js App Router. Route files stay in `src/app`; reusable frontend modules live outside the routing tree.

```text
src/
├── app/                      # Routes only: pages, layouts and API endpoints
│   ├── api/                  # Backend route handlers
│   ├── admin/                # Admin routes
│   ├── blog/
│   ├── case-studies/
│   ├── contact/
│   ├── services/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Homepage composition
├── components/
│   ├── admin/                # CMS/admin components
│   ├── forms/                # Public/client forms
│   ├── layout/               # Header, footer, public page shell
│   ├── sections/             # Homepage sections
│   └── ui/                   # Reusable primitive UI components
├── data/                     # Static/fallback content and navigation
├── hooks/                    # Shared React hooks
├── lib/                      # Auth, Prisma, helpers
├── types/                    # Shared TypeScript types
└── middleware.ts             # Admin/CMS route protection

prisma/                       # MySQL schema and migrations
public/                       # Static assets and local uploads
scripts/                      # Maintenance/setup scripts
vendor/                       # Retained third-party stylesheet/license
```

## Why this structure

- `src/app` stays focused on routing and server endpoints.
- Homepage sections are independently editable modules.
- Layout components are shared by every public route.
- Admin code is isolated from public forms/components.
- Data, database, auth and utility concerns have clear homes.
- MySQL/Prisma remains independent of the visual frontend.
