// src/components/Contact.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

export default function Contact() {
  const { content } = useContent() || {};
  const contact = content?.contact ?? null;
  if (!contact) return null;

  // Basic content (prefer JSON)
  const heading = contact.heading ?? "";
  const lead = contact.lead ?? contact.subtitle ?? "";

  // Layout control: "image-left" | "image-right"
  const layout = String(contact.layout ?? "image-right").toLowerCase();
  const isImageLeft = layout === "image-left";

  // Visuals/data
  const imageSrc = contact.image ?? null;
  const addressObj = contact.address ?? {};
  const phone = contact.phone ?? "";
  const email = contact.email ?? "";
  const social = Array.isArray(contact.social) ? contact.social : Array.isArray(contact.socials) ? contact.socials : [];

  // Labels & placeholders from JSON (these keys optional in JSON)
  const labels = {
    name: contact.labels?.name ?? contact.placeholderName ?? "Your name",
    email: contact.labels?.email ?? contact.placeholderEmail ?? "Your email",
    subject: contact.labels?.subject ?? contact.placeholderSubject ?? "Subject",
    message: contact.labels?.message ?? contact.placeholderMessage ?? "Message",
    submit: contact.buttonLabel ?? (contact.button && contact.button.label) ?? "Send Message",
    addressTitle: contact.labels?.address ?? "Address",
    phoneTitle: contact.labels?.phone ?? "Phone",
    emailTitle: contact.labels?.emailTitle ?? "Email",
    followTitle: contact.labels?.follow ?? "Follow Us",
  };

  // Validation & feedback messages from JSON
  const messages = {
    nameRequired: contact.messages?.nameRequired ?? "Please enter your name.",
    emailInvalid: contact.messages?.emailInvalid ?? "Please enter a valid email address.",
    messageRequired: contact.messages?.messageRequired ?? "Please enter your message.",
    sending: contact.messages?.sending ?? "Sending...",
    success: contact.messages?.success ?? "Message sent. Thank you!",
    error: contact.messages?.error ?? "Something went wrong. Please try again later.",
  };

  // Form state
  const [form, setForm] = useState({
    name: contact.defaults?.name ?? "",
    email: contact.defaults?.email ?? "",
    subject: contact.defaults?.subject ?? "",
    message: contact.defaults?.message ?? "",
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setStatus(null);
    setErrorMsg("");

    const { name, email, message } = form;
    if (!name || !name.trim()) {
      setStatus("error");
      setErrorMsg(messages.nameRequired);
      return;
    }
    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMsg(messages.emailInvalid);
      return;
    }
    if (!message || !message.trim()) {
      setStatus("error");
      setErrorMsg(messages.messageRequired);
      return;
    }

    setStatus("sending");
    try {
      // Demo behaviour — JSON can provide an endpoint
      // If contact.submitEndpoint provided, post to it
      if (contact.submitEndpoint) {
        await fetch(contact.submitEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // demo delay
        await new Promise((r) => setTimeout(r, 700));
      }

      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "" });

      if (contact.successRedirect) {
        window.location.href = contact.successRedirect;
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(contact.messages?.error ?? messages.error);
    }
  }

  // address lines helper
  const addressLines = [];
  if (addressObj.line1) addressLines.push(addressObj.line1);
  if (addressObj.line2) addressLines.push(addressObj.line2);
  const cityLine = [addressObj.city, addressObj.state, addressObj.postal].filter(Boolean).join(", ");
  if (cityLine) addressLines.push(cityLine);

  return (
    <section id="contact" className={contact.sectionClass ?? "py-20 px-6 bg-white dark:bg-gray-800"}>
      <div className="max-w-6xl mx-auto">
        {(heading || lead) && (
          <div className="text-center mb-12">
            {heading && <h2 className={contact.headingClass ?? "text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"}>{heading}</h2>}
            {lead && <p className={contact.leadClass ?? "text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"}>{lead}</p>}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Info / left column (order controlled via JSON layout) */}
          <div className={isImageLeft ? "md:order-2" : "md:order-1"}>
            <div className="space-y-6">
              {addressLines.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{labels.addressTitle}</h4>
                  <div className="text-gray-600 dark:text-gray-300">
                    {addressLines.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                </div>
              )}

              {phone && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{labels.phoneTitle ?? labels.phoneTitle}</h4>
                  <div className="text-gray-600 dark:text-gray-300">
                    <a href={`tel:${phone}`} className="hover:text-indigo-600">{phone}</a>
                  </div>
                </div>
              )}

              {email && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{labels.emailTitle ?? "Email"}</h4>
                  <div className="text-gray-600 dark:text-gray-300">
                    <a href={`mailto:${email}`} className="hover:text-indigo-600">{email}</a>
                  </div>
                </div>
              )}

              {Array.isArray(social) && social.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">{labels.followTitle}</h4>
                  <div className="flex gap-3">
                    {social.map((s, i) => {
                      const href = s.href || s.url || "#";
                      const label = s.label || s.type || "social";
                      const isExternal = typeof href === "string" && href.startsWith("http");
                      return (
                        <a
                          key={i}
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                          aria-label={label}
                          title={label}
                        >
                          {s.iconPath ? (
                            <svg viewBox={s.iconViewBox || "0 0 24 24"} className="w-4 h-4" aria-hidden>
                              <path d={s.iconPath} />
                            </svg>
                          ) : (
                            <span className="text-sm font-medium">{label[0]?.toUpperCase()}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image column */}
          <div className={isImageLeft ? "md:order-1" : "md:order-2"}>
            {imageSrc ? (
              <div className={contact.imageWrapperClass ?? "relative rounded-2xl p-6 shadow-xl transform-gpu transition-transform duration-300 -skew-y-4 hover:skew-y-0 bg-linear-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600"}>
                <div className="overflow-hidden rounded-xl">
                  <Image src={imageSrc} alt={heading || "Contact"} width={900} height={560} className="w-full h-auto object-cover rounded-xl" />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-6 shadow-xl bg-linear-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                <div className="h-56 md:h-80 w-full rounded-xl bg-gray-200 dark:bg-gray-600" />
              </div>
            )}
          </div>
        </div>

        {/* Form row below */}
        <div className="mt-12">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.name}</label>
              <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange}
                placeholder={labels.name} className={contact.inputClass ?? "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"} required />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.email}</label>
              <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
                placeholder={labels.email} className={contact.inputClass ?? "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"} required />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.subject}</label>
              <input id="contact-subject" name="subject" type="text" value={form.subject} onChange={handleChange}
                placeholder={labels.subject} className={contact.inputClass ?? "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"} />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{labels.message}</label>
              <textarea id="contact-message" name="message" rows={6} value={form.message} onChange={handleChange}
                placeholder={labels.message} className={contact.inputClass ?? "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"} required />
            </div>

            <div className="md:col-span-2 flex items-center gap-4">
              <button type="submit" disabled={status === "sending"}
                className={contact.buttonClass ?? "px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium"}>
                {status === "sending" ? (contact.messages?.sending ?? messages.sending) : submitLabelFromContact(contact, labels)}
              </button>

              <div>
                {status === "error" && <p className="text-sm text-yellow-500">{errorMsg || (contact.messages?.error ?? messages.error)}</p>}
                {status === "ok" && <p className="text-sm text-green-500">{contact.messages?.success ?? messages.success}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/**
 * Helper used to compute submit label strictly from JSON
 * (keeps display reading from JSON if provided, otherwise label fallback)
 */
function submitLabelFromContact(contact, labels) {
  return (
    contact.buttonLabel ??
    (contact.button && contact.button.label) ??
    labels.submit ??
    "Send Message"
  );
}
