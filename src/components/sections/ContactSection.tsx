import { ContactForm } from '@/components/forms/ContactForm';

export function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <div className="section-kicker">
        <span>06 / YOUR NEXT CHAPTER</span>
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
            <span className="big-arrow">↗</span>
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
