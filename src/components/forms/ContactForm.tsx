'use client';

import { useEffect, useState, useRef, type FormEvent } from 'react';
import { downloadProjectBrief } from '@/lib/project-brief';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { ServiceSelector } from './ServiceSelector';
import styles from './ContactForm.module.css';

const SERVICES = [
  'Brand & identity',
  'Websites & experiences',
  'ERP & business systems',
  'NFC & connected products',
  'A little of everything',
];

interface SubmittedBrief {
  name: string;
  email: string;
  service: string;
  time: string;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submittedBrief, setSubmittedBrief] = useState<SubmittedBrief | null>(null);
  const [service, setService] = useState('Brand & identity');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const readInterest = () => setService('NFC & connected products');
    window.addEventListener('uic:interest', readInterest);
    return () => window.removeEventListener('uic:interest', readInterest);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const selectedService = String(formData.get('service') ?? service);

    downloadProjectBrief(formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedBrief({
        name,
        email,
        service: selectedService,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 200);
  }

  function handleDownloadAgain() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      downloadProjectBrief(formData);
    }
  }

  return (
    <form
      ref={formRef}
      id="contact-form"
      className={styles.formCard}
      onSubmit={submit}
      aria-label="Prepare project brief"
    >
      <div className={styles.cardHeader} aria-hidden="true">
        <div className={styles.brandMark}>
          uic<span>®</span>
        </div>
        <span className={styles.cardType}>PROJECT BRIEF · INTAKE</span>
        <span className={styles.signal}>)))</span>
      </div>

      <div className={styles.row}>
        <FormInput
          name="name"
          label="Your name"
          placeholder="How should we call you?"
          autoComplete="name"
          required
          maxLength={120}
        />
        <FormInput
          name="email"
          label="Email address"
          type="email"
          placeholder="Where can we reach you?"
          autoComplete="email"
          required
          maxLength={254}
        />
      </div>

      <ServiceSelector
        name="service"
        label="What do you have in mind?"
        options={SERVICES}
        selected={service}
        onSelect={setService}
      />

      <FormTextarea
        name="message"
        label="A little about your project"
        placeholder="Your idea, ambition, timeline, or challenge…"
        rows={3}
        required
        maxLength={5000}
      />

      <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
        <span>{isSubmitting ? 'Preparing brief…' : 'Prepare project brief'}</span>
        <span className={styles.buttonArrow} aria-hidden="true">
          ↗
        </span>
      </button>

      {submittedBrief ? (
        <div className={styles.successBanner} role="status">
          <div className={styles.successHeader}>
            <span className={styles.successIcon}>✓</span>
            <span>Project brief generated & downloaded!</span>
          </div>
          <div className={styles.successDetails}>
            Ready to review for <strong>{submittedBrief.name}</strong> ({submittedBrief.email}) with focus on{' '}
            <em>{submittedBrief.service}</em>.
          </div>
          <button
            type="button"
            className={styles.downloadAgain}
            onClick={handleDownloadAgain}
          >
            Download again ↗
          </button>
        </div>
      ) : null}

      <p className={styles.note}>
        Generates an offline project brief text file. No tracking or external servers. Share it with UIC whenever you’re ready to start.
      </p>
    </form>
  );
}
