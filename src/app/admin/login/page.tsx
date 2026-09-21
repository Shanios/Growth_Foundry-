import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/admin/admin-login-form";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return <main className="admin-login-shell">
    <section className="admin-login-card">
      <div className="brand"><span className="brand-mark" aria-hidden="true">GF</span><span className="brand-name">Growth Foundry</span></div>
      <div className="admin-login-copy"><p className="eyebrow">Content studio</p><h1>Admin access.</h1><p>Sign in to manage case studies and insights.</p></div>
      <AdminLoginForm />
      <a className="admin-back-link" href="/">← Back to website</a>
    </section>
  </main>;
}
