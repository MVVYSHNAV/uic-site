import { NfcContactLink } from '@/components/forms/NfcContactLink';

export function NfcSection() {
  return (
    <section className="nfc section" id="nfc">
      <div className="section-kicker">
        <span>SMALL GESTURE. BIG CONNECTION.</span>
      </div>
      <div className="nfc-grid">
        <div className="tap-visual" aria-hidden="true">
          <div className="tap-rings"></div>
          <div className="physical-card">
            <span>uic®</span>
            <strong>
              Nice to
              <br />
              meet you.
            </strong>
            <b>)))</b>
          </div>
          <div className="phone">
            <div className="phone-notch"></div>
            <span className="avatar">J</span>
            <strong>John Honai</strong>
            <small>Designer. Maker. Connector.</small>
            <span className="phone-button">Save contact ↗</span>
            <span className="phone-link">Explore my work ↗</span>
            <span className="phone-link">Let’s connect ↗</span>
            <small className="phone-footer">POWERED BY UIC</small>
          </div>
          <span className="tap-label">
            A REAL-WORLD HELLO.
            <br />A DIGITAL FIRST IMPRESSION.
          </span>
        </div>
        <div>
          <span className="eyebrow">UIC CONNECT</span>
          <h2>
            Your next connection
            <br />
            is <em>one tap away.</em>
          </h2>
          <p>
            A beautifully crafted NFC card. A personal digital profile. A seamless way to share your
            world — without an app.
          </p>
          <ul>
            <li>Your identity, on your terms</li>
            <li>Update your details without reprinting</li>
            <li>NFC with a QR fallback for easy access</li>
          </ul>
          <NfcContactLink />
        </div>
      </div>
    </section>
  );
}
