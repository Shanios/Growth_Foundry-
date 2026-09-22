"use client";

import { type FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send");
      form.reset();
      setStatus(result.message || "Thank you. We’ll reply within two working days.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We couldn’t send this just now.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form-new" onSubmit={submit}>
      <div className="contact-fields-two">
        <label><span>Name <b>*</b></span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
        <label><span>Company / Brand</span><input name="company" autoComplete="organization" placeholder="Company name" /></label>
        <label><span>Work email <b>*</b></span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
        <label><span>What would help?</span><select name="topic" defaultValue=""><option value="" disabled>Choose an option</option><option>Growth strategy</option><option>Operating model</option><option>Commercial acceleration</option><option>Transformation delivery</option><option>Something else</option></select></label>
      </div>
      <label className="contact-message-field"><span>Message <b>*</b></span><textarea name="message" required minLength={10} placeholder="What are you trying to change, and why now?" /></label>
      <div className="contact-form-footer">
        <p className="form-status" role="status" aria-live="polite">{status}</p>
        <button type="submit" disabled={sending}>{sending ? "Sending…" : "Send message ↗"}</button>
      </div>
    </form>
  );
}
