import { ChevronDown } from 'lucide-react';

export function ServicesSection() {
  return (
    <section className="services section" id="services">
      <div className="section-kicker">
        <span>THE WHOLE PICTURE. EVERY DETAIL.</span>
      </div>
      <div className="services-grid">
        <div>
          <h2>
            One studio.
            <br />
            <em>Many possibilities.</em>
          </h2>
          <p>
            From the first impression to the systems
            <br />
            behind it, we connect the dots.
          </p>
          <a className="pill" href="#contact">
            Find your starting point{' '}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </a>
        </div>
        <div className="service-list">
          <details open={true}>
            <summary>
              <span>01</span> Brand &amp; identity
              <ChevronDown
                className="service-expand-icon"
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </summary>
            <div>
              <p>
                A clear story. A distinctive visual language. An identity that feels unmistakably
                yours.
              </p>
              <small>STRATEGY · NAMING · VISUAL IDENTITY · BRAND GUIDELINES</small>
            </div>
          </details>
          <details>
            <summary>
              <span>02</span> Websites &amp; experiences
              <ChevronDown
                className="service-expand-icon"
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </summary>
            <div>
              <p>
                Fast, intuitive digital spaces that make your brand tangible and turn interest into
                action.
              </p>
              <small>UX/UI · DEVELOPMENT · E-COMMERCE · WEB APPLICATIONS</small>
            </div>
          </details>
          <details>
            <summary>
              <span>03</span> ERP &amp; business systems
              <ChevronDown
                className="service-expand-icon"
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </summary>
            <div>
              <p>
                Bring your operations together with useful tools, connected data and workflows built
                for your team.
              </p>
              <small>CUSTOM ERP · DASHBOARDS · INTEGRATIONS · AUTOMATION</small>
            </div>
          </details>
          <details>
            <summary>
              <span>04</span> NFC &amp; connected products
              <ChevronDown
                className="service-expand-icon"
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </summary>
            <div>
              <p>
                Bridge the physical and digital with a simple tap — from smart business cards to
                product experiences.
              </p>
              <small>NFC CARDS · DIGITAL PROFILES · SMART TOUCHPOINTS</small>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
