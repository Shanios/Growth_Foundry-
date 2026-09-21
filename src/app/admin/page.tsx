import { AdminConsole } from "@/admin/admin-console";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireAdmin();
  return <main className="admin-shell">
    <header className="admin-header"><div><span className="brand-mark" aria-hidden="true">GF</span><div><strong>Growth Foundry</strong><span>Content studio</span></div></div><div><span>{user.username}</span><form action="/api/auth/logout" method="post"><button className="admin-signout" type="submit">Sign out</button></form></div></header>
    <section className="admin-intro"><p className="eyebrow">Secure administration</p><h1>Publish with clarity.</h1><p>Create, edit, and manage case studies and thought leadership.</p></section>
    <AdminConsole />
  </main>;
}
