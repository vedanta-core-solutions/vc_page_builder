// src/components/Contact.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

export default function Contact() {
  // Hook: always call
  const { content } = useContent() || {};

  // contactRef may be null (we'll early-return after hooks)
  const contactRef = content?.contact ?? null;

  // Create a safe contact object for deriving labels/messages (doesn't affect hook order)
  const contact = contactRef ?? {};

  // Read JSON-driven values (these read from contact but don't call hooks)
  const heading = contact.heading ?? "";
  const lead = contact.lead ?? "";
  const imageSrc = contact.image ?? null;
  const layout = String(contact.layout ?? "image-right").toLowerCase();
  const isImageLeft = layout === "image-left";

  // Labels & messages (from JSON; minimal fallbacks)
  const labels = {
    name: contact.labels?.name ?? contact.placeholderName ?? "Your name",
    email: contact.labels?.email ?? contact.placeholderEmail ?? "Your email",
    subject: contact.labels?.subject ?? contact.placeholderSubject ?? "Subject",
    message: contact.labels?.message ?? contact.placeholderMessage ?? "Message",
    submit: contact.buttonLabel ?? (contact.button && contact.button.label) ?? "Send Message",
  };

  const msgs = {
    nameRequired: contact.messages?.nameRequired ?? "Please enter your name.",
    emailInvalid: contact.messages?.emailInvalid ?? "Please enter a valid email address.",
    messageRequired: contact.messages?.messageRequired ?? "Please enter your message.",
    sending: contact.messages?.sending ?? "Sending...",
    success: contact.messages?.success ?? "Message sent. Thank you!",
    error: contact.messages?.error ?? "Something went wrong. Please try again later.",
  };

  // contact fields
  const phone = contact.phone ?? "";
  const email = contact.email ?? "";
  const social = Array.isArray(contact.social) ? contact.social : Array.isArray(contact.socials) ? contact.socials : [];

  // ----------------------------
  // HOOKS: must be called unconditionally
  // ----------------------------
  const [form, setForm] = useState({
    name: contact.defaults?.name ?? "",
    email: contact.defaults?.email ?? "",
    subject: contact.defaults?.subject ?? "",
    message: contact.defaults?.message ?? "",
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  // Now safe early return (hooks already declared)
  if (!contactRef) return null;

  // ------------------------------------------------
  // handlers (can use contact, labels, msgs, hooks)
  // ------------------------------------------------
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setStatus(null);
    setErrorMsg("");

    const { name, email: em, message } = form;
    if (!name || !name.trim()) {
      setStatus("error");
      setErrorMsg(msgs.nameRequired);
      return;
    }
    if (!validateEmail(em)) {
      setStatus("error");
      setErrorMsg(msgs.emailInvalid);
      return;
    }
    if (!message || !message.trim()) {
      setStatus("error");
      setErrorMsg(msgs.messageRequired);
      return;
    }

    setStatus("sending");
    try {
      if (contact.submitEndpoint) {
        await fetch(contact.submitEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }

      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "" });

      if (contact.successRedirect) window.location.href = contact.successRedirect;
    } catch (err) {
      setStatus("error");
      setErrorMsg(contact.messages?.error ?? msgs.error);
    }
  }

  // Render (two-column: image + form). Image height matches form via items-stretch in parent.
  return (
    <section id="contact" className={contact.sectionClass ?? "py-20 px-6 bg-white dark:bg-gray-800"}>
      <div className="max-w-6xl mx-auto">
        {(heading || lead) && (
          <div className="text-center mb-10">
            {heading && <h2 className={contact.headingClass ?? "text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3"}>{heading}</h2>}
            {lead && <p className={contact.leadClass ?? "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"}>{lead}</p>}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* IMAGE column */}
          <div className={isImageLeft ? "md:order-1" : "md:order-2"}>
            {imageSrc ? (
              <div className={contact.imageWrapperClass ?? "w-full h-full rounded-2xl overflow-hidden shadow-xl"}>
                <div className="relative w-full h-full min-h-[320px] md:min-h-[420px]">
                  <Image
                    src={imageSrc}
                    alt={heading || "Contact"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: contact.imagePosition ?? "center" }}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-gray-100 dark:bg-gray-700 h-64 md:h-full" />
            )}
          </div>

          {/* FORM column */}
          <div className={isImageLeft ? "md:order-2" : "md:order-1"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.name}</label>
                <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange}
                  placeholder={labels.name}
                  className={contact.inputClass ?? "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"} />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.email}</label>
                <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder={labels.email}
                  className={contact.inputClass ?? "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"} />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.subject}</label>
                <input id="contact-subject" name="subject" type="text" value={form.subject} onChange={handleChange}
                  placeholder={labels.subject}
                  className={contact.inputClass ?? "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"} />
              </div>

              <div className="flex-1">
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.message}</label>
                <textarea id="contact-message" name="message" rows={6} value={form.message} onChange={handleChange}
                  placeholder={labels.message}
                  className={contact.inputClass ?? "w-full h-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"} />
              </div>

              <div className="flex items-center gap-4">
                <button type="submit" disabled={status === "sending"}
                  className={contact.buttonClass ?? "px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium"}>
                  {status === "sending" ? (contact.messages?.sending ?? msgs.sending) : labels.submit}
                </button>

                <div>
                  {status === "error" && <p className="text-sm text-yellow-500">{errorMsg}</p>}
                  {status === "ok" && <p className="text-sm text-green-500">{contact.messages?.success ?? msgs.success}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
