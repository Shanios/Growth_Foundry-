import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <main>
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}
