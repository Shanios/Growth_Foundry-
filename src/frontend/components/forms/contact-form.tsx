"use client";

import { FormEvent, useState } from "react";

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
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Unable to send");
      form.reset();
      setStatus("Thank you. We’ll reply within two working days.");
    } catch {
      setStatus("We couldn’t send this just now. Please email hello@growthfoundry.co.");
    } finally { setSending(false); }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" /></div>
    <div className="field"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
    <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" /></div>
    <div className="field"><label htmlFor="topic">What would help?</label><select id="topic" name="topic" defaultValue=""><option value="" disabled>Select one</option><option>Growth strategy</option><option>Operating model</option><option>Commercial acceleration</option><option>Transformation delivery</option><option>Something else</option></select></div>
    <div className="field full"><label htmlFor="message">Context</label><textarea id="message" name="message" required placeholder="What are you trying to change, and why now?" /></div>
    <button className="submit-button" type="submit" disabled={sending}>{sending ? "Sending…" : "Send enquiry ↗"}</button>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
