"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: data.get("username"), password: data.get("password") }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  return <form className="admin-login-form" onSubmit={submit}>
    <label>Username<input name="username" autoComplete="username" required /></label>
    <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
    <button className="submit-button admin-login-button" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in ↗"}</button>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
