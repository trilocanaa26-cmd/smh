"use client";

import { useRef, useState, type FormEvent } from "react";
import { hospitalContact, hospitalName, phoneHref } from "@/lib/site";

type FormState = { status: "idle" | "sending" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const isSubmitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setState({ status: "sending", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { message?: string } = await response.json();

      if (!response.ok) {
        setState({
          status: "error",
          message: result.message ?? "We couldn't send your enquiry. Please try again.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: "Thank you. Your enquiry has been sent to the hospital team.",
      });
    } catch {
      setState({
        status: "error",
        message: "We couldn't connect. Please check your connection and try again.",
      });
    } finally {
      isSubmitting.current = false;
    }
  }

  return (
    <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span className="eyebrow">Write to us</span>
        <h2>How can we help?</h2>
        <p>Send an appointment request to {hospitalName}. Our team will confirm availability by contacting you.</p>
        <p><a href={phoneHref(hospitalContact.phone)}>{hospitalContact.phone}</a> · <a href={phoneHref(hospitalContact.landline)}>{hospitalContact.landline}</a></p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full name <span aria-hidden="true">*</span></label>
          <input autoComplete="name" id="fullName" name="fullName" required maxLength={100} />
        </div>
        <div className="field">
          <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
          <input autoComplete="email" id="email" name="email" type="email" required maxLength={254} />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number <span aria-hidden="true">*</span></label>
          <input autoComplete="tel" id="phone" name="phone" type="tel" required maxLength={20} />
        </div>
        <div className="field">
          <label htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
          <input id="subject" name="subject" list="specialty-subjects" required maxLength={120} />
          <datalist id="specialty-subjects">
            <option value="Paediatrics appointment - Dr. Neha Naik" />
            <option value="General Surgery appointment - Dr. Suresh Naik" />
            <option value="Endoscopic Surgery enquiry" />
            <option value="Laparoscopic Surgery enquiry" />
          </datalist>
        </div>
        <div className="field field-full">
          <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
          <textarea id="message" name="message" required rows={5} maxLength={3000} />
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending…" : "Send enquiry"}
          {state.status !== "sending" && <span aria-hidden="true">↗</span>}
        </button>
        <p id="form-status" className={`form-status ${state.status}`} role="status" aria-live="polite">
          {state.message}
        </p>
      </div>
      <p className="form-privacy">Please do not include sensitive medical information. This form is not for emergencies.</p>
    </form>
  );
}
