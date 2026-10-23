import { ArrowUpRight } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { TestimonialMarquee } from '@/components/testimonials/TestimonialMarquee';

export function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <div className="section-kicker" style={{ marginBottom: '24px' }}>
        <span>PROVEN IN PRODUCTION · CLIENT FEEDBACK</span>
      </div>
      <div className="contact-testimonials-viewport">
        <TestimonialMarquee />
      </div>

      <div className="section-kicker" style={{ marginTop: 'clamp(36px, 5vh, 60px)' }}>
        <span>START WITH A CONVERSATION.</span>
      </div>
      <div className="contact-grid">
        <div>
          <h2>
            Let’s make
            <br />
            <em>
              something
              <br />
              unmistakable.
            </em>
            <span className="big-arrow" aria-hidden="true">
              <ArrowUpRight strokeWidth={1.8} />
            </span>
          </h2>
          <p>
            Tell us what you’re imagining.
            <br />
            We’ll help you find the way forward.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
