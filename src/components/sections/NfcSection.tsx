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
            <svg
              className="card-nfc-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8.5 5A12 12 0 0 1 8.5 19" />
              <path d="M12.5 8A7.5 7.5 0 0 1 12.5 16" />
              <path d="M16.5 10.5A3.5 3.5 0 0 1 16.5 13.5" />
            </svg>
          </div>
          <div className="phone">
            <div className="phone-notch"></div>
            <span className="avatar">J</span>
            <strong>John Honai</strong>
            <small>Designer. Maker. Connector.</small>
            <span className="phone-button">
              Save contact{' '}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="6" y1="18" x2="18" y2="6"/><polyline points="9 6 18 6 18 15"/></svg>
            </span>
            <span className="phone-link">
              Explore my work{' '}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="6" y1="18" x2="18" y2="6"/><polyline points="9 6 18 6 18 15"/></svg>
            </span>
            <span className="phone-link">
              Let’s connect{' '}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="6" y1="18" x2="18" y2="6"/><polyline points="9 6 18 6 18 15"/></svg>
            </span>
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
