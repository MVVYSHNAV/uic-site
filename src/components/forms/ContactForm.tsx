'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { downloadProjectBrief } from '@/lib/project-brief';

export function ContactForm() {
  const [status, setStatus] = useState('');
  const [service, setService] = useState('Brand & identity');
  useEffect(() => {
    const readInterest = () => setService('NFC & connected products');
    window.addEventListener('uic:interest', readInterest);
    return () => window.removeEventListener('uic:interest', readInterest);
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    downloadProjectBrief(new FormData(event.currentTarget));
    setStatus('Your brief has been downloaded. Nothing has been sent or stored by this site.');
  }
  return (
    <form id="contact-form" onSubmit={submit}>
      <label>
        Your name
        <input
          name="name"
          autoComplete="name"
          required
          placeholder="How should we call you?"
          maxLength={120}
        />
      </label>
      <label>
        Email address
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Where can we reach you?"
          maxLength={254}
        />
      </label>
      <label>
        What do you have in mind?
        <select name="service" value={service} onChange={(event) => setService(event.target.value)}>
          <option>Brand & identity</option>
          <option>Websites & experiences</option>
          <option>ERP & business systems</option>
          <option>NFC & connected products</option>
          <option>A little of everything</option>
        </select>
      </label>
      <label>
        A little about your project
        <textarea
          name="message"
          rows={3}
          required
          placeholder="Your idea, ambition, or challenge…"
          maxLength={5000}
        ></textarea>
      </label>
      <button className="pill" type="submit">
        Prepare project brief <span>↗</span>
      </button>
      <p className="form-note">
        Download your brief to share with UIC. Direct enquiries will be enabled when the studio’s
        contact details are added.
      </p>
      <p id="form-status" role="status">
        {status}
      </p>
    </form>
  );
}
