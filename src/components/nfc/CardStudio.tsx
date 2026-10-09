'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './CardStudio.module.css';

const finishes = [
  { name: 'Midnight', background: '#222b28', ink: '#e3ff97' },
  { name: 'Lime', background: '#d9ff65', ink: '#203027' },
  { name: 'Pearl', background: '#ede9df', ink: '#343b35' },
  { name: 'Lavender', background: '#c7bcf1', ink: '#302647' },
];
const layouts = ['Minimal', 'Orbit', 'Statement'] as const;
type Layout = (typeof layouts)[number];

function customFinish(hex: string) {
  const channels = [1, 3, 5].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance = channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  return { name: 'Custom', background: hex, ink: luminance > 0.179 ? '#000000' : '#ffffff' };
}

export function CardStudio() {
  const [finish, setFinish] = useState(finishes[0]);
  const [hexInput, setHexInput] = useState(finishes[0].background);
  const validHex = /^#[0-9a-f]{6}$/i.test(hexInput);
  const [layout, setLayout] = useState<Layout>('Orbit');
  const [name, setName] = useState('John Honai');
  const [role, setRole] = useState('Designer & creative thinker');
  const [brand, setBrand] = useState('John Studio');
  const [flipped, setFlipped] = useState(false);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const frontRef = useRef<HTMLSpanElement>(null);
  const backRef = useRef<HTMLSpanElement>(null);
  const [artwork, setArtwork] = useState<{ name: string; url: string } | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [opacity, setOpacity] = useState(70);
  const [position, setPosition] = useState(50);
  const [fit, setFit] = useState('cover');
  const [ink, setInk] = useState('auto');
  const uploadVersion = useRef(0);
  useEffect(
    () => () => {
      uploadVersion.current += 1;
    },
    [],
  );
  const displayName = name.trim() || 'Your name';
  const displayBrand = brand.trim() || 'Your brand';
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
  const textColor = ink === 'auto' ? finish.ink : ink;
  const colors = {
    '--card-color': finish.background,
    '--card-ink': textColor,
    '--card-artwork': artwork ? `url("${artwork.url}")` : 'none',
    '--artwork-opacity': opacity / 100,
    '--artwork-position': `50% ${position}%`,
    '--artwork-size': fit,
  } as CSSProperties;

  async function uploadArtwork(file?: File) {
    const version = ++uploadVersion.current;
    setUploadError('');
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setUploadError('Choose a PNG, JPG, or WebP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Please choose an image smaller than 5 MB.');
      return;
    }
    try {
      const url = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Unable to read image'));
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(file);
      });
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('Unable to decode image'));
        image.src = url;
      });
      if (version !== uploadVersion.current) return;
      setArtwork({ name: file.name, url });
      setStatus('');
    } catch {
      if (version === uploadVersion.current)
        setUploadError('This image could not be opened. Try another PNG, JPG, or WebP.');
    }
  }

  function updateCustomColor(value: string) {
    setHexInput(value);
    if (/^#[0-9a-f]{6}$/i.test(value)) setFinish(customFinish(value.toLowerCase()));
  }

  async function downloadDesign() {
    const face = flipped ? backRef.current : frontRef.current;
    if (!face || saving) return;
    setSaving(true);
    setStatus('Preparing your card image…');
    try {
      const { toSvg } = await import('html-to-image');
      await document.fonts.ready;
      const svg = await toSvg(face, {
        width: face.offsetWidth,
        height: face.offsetHeight,
        style: {
          transform: 'none',
          position: 'relative',
          inset: 'auto',
          backfaceVisibility: 'visible',
          transition: 'none',
        },
      });
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('Unable to render card'));
        image.src = svg;
      });
      const canvas = document.createElement('canvas');
      canvas.width = face.offsetWidth * 4;
      canvas.height = face.offsetHeight * 4;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Image export is unavailable');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL('image/png');
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `UIC-card-${flipped ? 'back' : 'front'}.png`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setStatus('Your card PNG is ready. Flip the card to save the other side.');
    } catch {
      setStatus('The image could not be saved. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.studio} style={colors}>
      <a className="skip" href="#card-studio">
        Skip to card studio
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="UIC home">
          uic<span>®</span>
        </Link>
        <span className={styles.productName}>CONNECT / A BETTER HELLO</span>
        <Link href="/#nfc" className={styles.back}>
          Back to studio ↗
        </Link>
      </header>
      <main id="card-studio">
        <section className={styles.intro}>
          <p className={styles.eyebrow}>
            <span /> YOUR IDENTITY. IN YOUR HAND.
          </p>
          <h1>
            Small card.
            <br />
            <em>Big first impression.</em>
          </h1>
          <p className={styles.subtitle}>
            Make it yours. Give it a spin. See what a single tap can do.
          </p>
          <span className={styles.guest}>
            Guest studio <span>•</span> No sign-up needed
          </span>
        </section>

        <section className={styles.workbench} aria-label="Customize your NFC card">
          <div className={styles.preview}>
            <div className={styles.previewTop}>
              <span>
                <i /> LIVE PREVIEW
              </span>
              <span>UIC CONNECT / 01</span>
            </div>
            <div className={styles.cardSpace}>
              <div className={styles.halo} />
              <button
                type="button"
                className={`${styles.card} ${flipped ? styles.flipped : ''}`}
                onClick={() => setFlipped(!flipped)}
                aria-label={flipped ? 'Show front of card' : 'Show back of card'}
                aria-pressed={flipped}
              >
                <span
                  ref={frontRef}
                  className={`${styles.face} ${styles[layout.toLowerCase()]} ${styles.front}`}
                  aria-hidden={flipped}
                >
                  <span className={styles.cardBrand}>
                    {displayBrand}
                    <span className={styles.signal}>)))</span>
                  </span>
                  <span className={styles.orbitArt} />
                  <span className={styles.monogram}>{initials}</span>
                  <span className={styles.identity}>
                    <strong>{displayName}</strong>
                    <small>{role || 'Your title or tagline'}</small>
                  </span>
                  <span className={styles.cardFooter}>
                    A CONNECTION WORTH MAKING.<b>uic / connect</b>
                  </span>
                </span>
                <span
                  ref={backRef}
                  className={`${styles.face} ${styles.reverse}`}
                  aria-hidden={!flipped}
                >
                  <span className={styles.cardBrand}>
                    {displayBrand}
                    <span className={styles.signal}>)))</span>
                  </span>
                  <strong>
                    A little tap.
                    <br />A whole new connection.
                  </strong>
                  <span className={styles.reverseMark} aria-hidden="true">
                    ↗
                  </span>
                  <span className={styles.cardFooter}>
                    HOLD NEAR AN NFC-ENABLED PHONE.<b>uic / connect</b>
                  </span>
                </span>
              </button>
            </div>
            <div className={styles.previewBottom}>
              <button className={styles.flipButton} onClick={() => setFlipped(!flipped)}>
                ↻ {flipped ? 'View front' : 'Flip card'}
              </button>
              <span>
                {finish.name} / {layout}
              </span>
            </div>
            <p className={styles.previewNote}>
              Visual concept · Final materials and print colors may vary.
            </p>
          </div>

          <div className={styles.controls}>
            <div className={styles.controlHeading}>
              <span className={styles.eyebrow}>THE DETAILS MAKE IT YOU</span>
              <h2>
                Your card. <em>Your rules.</em>
              </h2>
            </div>
            <fieldset>
              <legend>
                <span>01</span> Choose your color <small>{finish.name}</small>
              </legend>
              <div className={styles.swatches}>
                {finishes.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    aria-label={option.name}
                    aria-pressed={finish.name === option.name}
                    onClick={() => {
                      setFinish(option);
                      setHexInput(option.background);
                    }}
                    style={{ background: option.background, color: option.ink }}
                  >
                    {finish.name === option.name ? '✓' : ''}
                  </button>
                ))}
              </div>
              <div className={styles.customColor}>
                <label>
                  Custom color
                  <input
                    type="color"
                    value={finish.background}
                    onChange={(event) => updateCustomColor(event.target.value)}
                    aria-label="Choose a custom card color"
                  />
                </label>
                <label>
                  Hex code
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(event) => updateCustomColor(event.target.value)}
                    maxLength={7}
                    spellCheck={false}
                    autoComplete="off"
                    aria-invalid={!validHex}
                    aria-describedby="color-help"
                    placeholder="#123ABC"
                  />
                </label>
              </div>
              <p id="color-help" className={styles.note}>
                {validHex
                  ? 'Choose any color. Text contrast adjusts automatically.'
                  : 'Enter # followed by six letters (A–F) or numbers. Preview keeps your last valid color.'}
              </p>
            </fieldset>
            <fieldset>
              <legend>
                <span>02</span> Add an image or texture
              </legend>
              <label className={styles.uploadLabel}>
                {artwork ? 'Replace image' : 'Upload your artwork'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  aria-label="Upload card image or texture"
                  aria-describedby="artwork-help"
                  onChange={(event) => {
                    void uploadArtwork(event.target.files?.[0]);
                    event.target.value = '';
                  }}
                />
              </label>
              <p id="artwork-help" className={styles.note}>
                PNG, JPG or WebP · Up to 5 MB. Applied to both sides. Images stay in your browser.
              </p>
              {uploadError && (
                <p className={styles.uploadError} role="alert">
                  {uploadError}
                </p>
              )}
              {artwork && (
                <div className={styles.artworkControls}>
                  <p className={styles.artworkName}>{artwork.name}</p>
                  <label>
                    Image opacity: {opacity}%
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={opacity}
                      onChange={(event) => setOpacity(Number(event.target.value))}
                    />
                  </label>
                  <label>
                    Vertical position: {position}%
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={position}
                      onChange={(event) => setPosition(Number(event.target.value))}
                    />
                  </label>
                  <label>
                    Image fit
                    <select value={fit} onChange={(event) => setFit(event.target.value)}>
                      <option value="cover">Fill card</option>
                      <option value="contain">Fit whole image</option>
                    </select>
                  </label>
                  <label>
                    Text color
                    <select value={ink} onChange={(event) => setInk(event.target.value)}>
                      <option value="auto">Match card color</option>
                      <option value="#ffffff">White</option>
                      <option value="#000000">Black</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    className={styles.flipButton}
                    onClick={() => {
                      uploadVersion.current += 1;
                      setArtwork(null);
                      setUploadError('');
                      setInk('auto');
                    }}
                  >
                    Remove image
                  </button>
                  <p className={styles.note}>
                    Your uploaded artwork is included in the saved card image.
                  </p>
                </div>
              )}
            </fieldset>
            <fieldset>
              <legend>
                <span>03</span> Find your style
              </legend>
              <div className={styles.layouts}>
                {layouts.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={layout === option}
                    onClick={() => setLayout(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <span>04</span> Add your identity
              </legend>
              <label>
                Your name
                <input
                  value={name}
                  maxLength={32}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </label>
              <label>
                Title or tagline
                <input
                  value={role}
                  maxLength={48}
                  onChange={(event) => setRole(event.target.value)}
                />
              </label>
              <label>
                Brand or company
                <input
                  value={brand}
                  maxLength={28}
                  onChange={(event) => setBrand(event.target.value)}
                  autoComplete="organization"
                />
              </label>
            </fieldset>
            <button className={styles.save} onClick={downloadDesign} disabled={saving}>
              {saving ? 'Saving image…' : 'Save my design'} <span>↓</span>
            </button>
            <p className={styles.note}>
              Downloads the visible side as a PNG at 4× resolution, including your artwork. Flip to
              save the other side. Your design resets when you reload.
            </p>
            <p className={styles.status} role="status">
              {status}
            </p>
          </div>
        </section>

        <section className={styles.experience} aria-labelledby="tap-title">
          <div className={styles.experienceCopy}>
            <p className={styles.eyebrow}>FROM NICE CARD TO NICE TO MEET YOU</p>
            <h2 id="tap-title">
              One tap.
              <br />
              <em>You’re connected.</em>
            </h2>
            <p>
              No searching. No typing. Just bring your card near a compatible phone and open your
              digital profile.
            </p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Make the introduction.</strong>
                  <p>Hold your card near the phone’s NFC reader.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Your world opens up.</strong>
                  <p>They open the notification to see your profile.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Keep the connection.</strong>
                  <p>Share contact details, work, and ways to reach you.</p>
                </div>
              </li>
            </ol>
            <button className={styles.demoButton} onClick={() => setConnected(!connected)}>
              {connected ? 'Reset the demo ↻' : 'Try a virtual tap ↗'}
            </button>
            <p className={styles.demoNote}>
              Interactive simulation. No NFC hardware required here.
            </p>
          </div>
          <div className={`${styles.demoStage} ${connected ? styles.connected : ''}`}>
            <div className={styles.wave} aria-hidden="true" />
            <div className={styles.miniCard} aria-hidden="true">
              <span>{displayBrand}</span>
              <strong>{displayName}</strong>
              <b>)))</b>
            </div>
            <div className={styles.phone}>
              <div className={styles.island} />
              <div className={styles.phoneTime}>
                9:41 <span>••• ▰</span>
              </div>
              {connected ? (
                <div className={styles.profile} key="profile">
                  <span className={styles.connectedBadge}>✓ CONNECTION MADE</span>
                  <div className={styles.avatar}>{initials}</div>
                  <h3>{displayName}</h3>
                  <p>{role}</p>
                  <span className={styles.profileBrand}>{displayBrand}</span>
                  <div className={styles.profileButton}>Save contact ↗</div>
                  <div className={styles.profileLink}>Explore my work ↗</div>
                  <div className={styles.profileLink}>Let’s connect ↗</div>
                  <small>PROFILE PREVIEW · POWERED BY UIC</small>
                </div>
              ) : (
                <div className={styles.phoneIdle}>
                  <span className={styles.tapIcon}>)))</span>
                  <h3>
                    A new connection
                    <br />
                    is one tap away.
                  </h3>
                  <p>
                    Press “Try a virtual tap”
                    <br />
                    to meet your digital self.
                  </p>
                </div>
              )}
            </div>
            <div className={styles.demoStatus} role="status">
              {connected
                ? 'Your personalized profile is ready to explore.'
                : 'YOUR CARD + THEIR PHONE. THAT’S IT.'}
            </div>
          </div>
        </section>
        <section className={styles.closing}>
          <span className={styles.eyebrow}>LOOKS LIKE YOU. CONNECTS LIKE MAGIC.</span>
          <h2>
            Ready to make it <em>real?</em>
          </h2>
          <p>
            Save your card image, then tell us what you have in mind.
            <br />
            We’ll help with artwork, card options, and your digital profile.
          </p>
          <Link href="/#contact" className={styles.demoButton}>
            Let’s create your card ↗
          </Link>
        </section>
      </main>
      <footer className={styles.footer}>
        <Link href="/" className={styles.logo}>
          uic<span>®</span>
        </Link>
        <span>UNIQUE IDENTITY. EVERY CONNECTION.</span>
        <Link href="/">Back to UIC ↗</Link>
      </footer>
    </div>
  );
}
