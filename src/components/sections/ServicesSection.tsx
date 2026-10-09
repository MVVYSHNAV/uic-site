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
            Find your starting point ↗
          </a>
        </div>
        <div className="service-list">
          <details open={true}>
            <summary>
              <span>01</span> Brand & identity <b>+</b>
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
              <span>02</span> Websites & experiences <b>+</b>
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
              <span>03</span> ERP & business systems <b>+</b>
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
              <span>04</span> NFC & connected products <b>+</b>
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
