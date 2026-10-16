'use client';

import { useState } from 'react';

const CONTACT_EMAIL = 'vicdeography1@gmail.com';
// FormSubmit (formsubmit.co) delivers form submissions to CONTACT_EMAIL with no account needed.
// The first submission sends a one-time activation email to that address; after the link in it
// is clicked, every submission arrives directly in the inbox.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = form.get('name').trim();
    const inquiry = form.get('inquiry').trim();

    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email: form.get('email').trim(),
          inquiry,
          message: form.get('message').trim(),
          _subject: inquiry ? `Website inquiry: ${inquiry}` : `Website inquiry from ${name}`,
          _template: 'table',
          _honey: form.get('_honey'),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) !== 'true') throw new Error(result.message || 'Send failed');
      formElement.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input type="text" name="name" autoComplete="name" required />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label>
        <span>Inquiry</span>
        <input type="text" name="inquiry" placeholder="Brand video, event, sports, short film..." />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>
      {/* Hidden from people; spam bots that fill it in are ignored by FormSubmit. */}
      <input type="text" name="_honey" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send'}
      </button>
      {status === 'sent' && (
        <p className="form-status" role="status">Thanks, your message has been sent. I&rsquo;ll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className="form-status error" role="alert">
          Sorry, your message couldn&rsquo;t be sent. Please email me at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}
    </form>
  );
}
