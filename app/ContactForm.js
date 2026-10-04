'use client';

const CONTACT_EMAIL = 'vicdeography1@gmail.com';

// There's no email-sending backend yet, so submitting opens the visitor's email app with the
// message filled in and addressed to CONTACT_EMAIL.
export default function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name').trim();
    const email = form.get('email').trim();
    const inquiry = form.get('inquiry').trim();
    const message = form.get('message').trim();

    const subject = inquiry || `Website inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
      <button type="submit">Send</button>
    </form>
  );
}
