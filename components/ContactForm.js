"use client";

import { useState } from "react";

const CONTACT_EMAIL = "admin@promptforums.org";

export default function ContactForm() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      setNotice("Veuillez renseigner chaque champ avec du texte valide.");
      return;
    }

    const body = `Nom : ${name}\nE-mail : ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setNotice(
      "Votre application de messagerie devrait s’ouvrir avec le message préparé. Si ce n’est pas le cas, écrivez directement à admin@promptforums.org."
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-4 p-6">
      <label className="flex flex-col gap-2 text-sm text-slate-200">
        Votre nom
        <input
          autoComplete="name"
          className="input-field"
          maxLength={100}
          name="name"
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-slate-200">
        Votre adresse e-mail
        <input
          autoComplete="email"
          className="input-field"
          maxLength={254}
          name="email"
          required
          type="email"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-slate-200">
        Objet
        <input
          className="input-field"
          maxLength={150}
          name="subject"
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-slate-200">
        Message
        <textarea
          className="input-field min-h-36"
          maxLength={5000}
          name="message"
          required
        />
      </label>
      <button className="btn-primary self-start" type="submit">
        Préparer l’e-mail
      </button>
      <p aria-live="polite" className="text-sm text-slate-300">
        {notice}
      </p>
      <p className="text-xs text-slate-500">
        Le formulaire ouvre votre application de messagerie ; les champs ne
        sont pas envoyés ni stockés par PromptForums.
      </p>
    </form>
  );
}
