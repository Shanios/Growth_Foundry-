"use client";

import {
  type FormEvent,
  useState,
} from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [consent, setConsent] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setBusy(true);
    setStatus("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: String(
        data.get("firstName") ?? ""
      ),
      lastName: String(
        data.get("lastName") ?? ""
      ),
      email: String(
        data.get("email") ?? ""
      ),
      consent,
    };

    try {
      const response = await fetch(
        "/api/newsletter",
        {
          method: "POST",
          headers: {
            "content-type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result =
        (await response.json()) as {
          message?: string;
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to subscribe."
        );
      }

      form.reset();
      setConsent(false);

      setStatus(
        result.message ||
          "You’re on the list."
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to subscribe."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="newsletter-form"
      onSubmit={handleSubmit}
    >
      <div className="newsletter-fields">
        <label>
          First name

          <input
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
          />
        </label>

        <label>
          Last name

          <input
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
          />
        </label>

        <label className="newsletter-email">
          Email

          <input
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </label>
      </div>

      <label className="newsletter-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) =>
            setConsent(
              event.target.checked
            )
          }
        />

        <span>
          I agree to receive Growth Foundry
          insights and updates by email.
        </span>
      </label>

      <p className="newsletter-privacy">
        You can unsubscribe at any time.
        Your information will only be used
        to send Growth Foundry updates.
      </p>

      <button
        type="submit"
        className="newsletter-button"
        disabled={busy}
      >
        {busy
          ? "Submitting…"
          : "Get updates ↗"}
      </button>

      <p
        className="newsletter-status"
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
}