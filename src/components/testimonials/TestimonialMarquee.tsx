'use client';

import styles from './TestimonialMarquee.module.css';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  tag: string;
  initials: string;
}

const rowOneTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Elena Rostova',
    role: 'Design Director',
    company: 'Pixpil Design (Shanghai)',
    quote:
      'UIC engineered an ultra-refined editorial architecture that elevated how brand leaders discover our BX framework.',
    tag: 'Web Architecture',
    initials: 'ER',
  },
  {
    id: 't2',
    name: 'Arjun Menon',
    role: 'Founder & CEO',
    company: 'Dafy Mobility',
    quote:
      'The 3-tap booking flow eliminated customer churn during peak hours. Our driver dispatch scaled 10x in 6 months.',
    tag: 'Mobility Platform',
    initials: 'AM',
  },
  {
    id: 't3',
    name: 'Kavya Pillai',
    role: 'Brand Partner',
    company: 'Luv Cutlet QSR',
    quote:
      'From 3-wheeler street food heritage to institutional international funding. The digital presence captured our identity.',
    tag: 'QSR Brand Experience',
    initials: 'KP',
  },
  {
    id: 't4',
    name: 'Marcus Vance',
    role: 'Principal Architect',
    company: 'Forma Space Studio',
    quote:
      'Rare to find a studio that treats digital negative space with the same sculptural reverence as physical limestone.',
    tag: 'Architectural Identity',
    initials: 'MV',
  },
  {
    id: 't5',
    name: 'Sarah Chen',
    role: 'Head of Product',
    company: 'Connect Ecosystem',
    quote:
      'The contactless handshake protocol and instant mobile profile fallback made physical introductions effortless.',
    tag: 'NFC Connected Lab',
    initials: 'SC',
  },
  {
    id: 't6',
    name: 'Vikramaditya Nair',
    role: 'VP Operations',
    company: 'Flow Intelligence',
    quote:
      'Unified our telemetry and multi-warehouse operations into a calm, focused executive workspace.',
    tag: 'Systems Intelligence',
    initials: 'VN',
  },
];

const rowTwoTestimonials: Testimonial[] = [
  {
    id: 't7',
    name: 'Sophie Martin',
    role: 'Creative Technologist',
    company: 'Studio Aether (Paris)',
    quote:
      'The motion pacing is dialed to perfection. Every micro-interaction feels deliberate, weighted, and remarkably fluid.',
    tag: 'Motion & Pacing',
    initials: 'SM',
  },
  {
    id: 't8',
    name: 'Devon Archer',
    role: 'Brand Strategy Lead',
    company: 'Koco Treat',
    quote:
      'The visual storytelling bridged our street-to-store retail expansion effortlessly. Customers instantly trusted the brand.',
    tag: 'Retail Expansion',
    initials: 'DA',
  },
  {
    id: 't9',
    name: 'Tanya Deshmukh',
    role: 'Design Operations',
    company: 'Archetype Studio',
    quote:
      'UIC understands that bold editorial craft and commercial conversion aren’t enemies. They made both sing.',
    tag: 'Digital Strategy',
    initials: 'TD',
  },
  {
    id: 't10',
    name: 'Kenji Takahashi',
    role: 'Managing Director',
    company: 'Vertex Tokyo',
    quote:
      'Our European and Asian enterprise partners remarked that the identity felt distinctly ahead of the curve.',
    tag: 'Global Presence',
    initials: 'KT',
  },
  {
    id: 't11',
    name: 'Rohan Varma',
    role: 'Hardware Engineer',
    company: 'Touchpoint Labs',
    quote:
      'The tactile card and instant web handshake completely replaced conventional business cards for our executive team.',
    tag: 'Contactless Hardware',
    initials: 'RV',
  },
  {
    id: 't12',
    name: 'Maya Lindqvist',
    role: 'VP Brand Experience',
    company: 'Nordic Modern',
    quote:
      'Subtle, confident, and utterly free of generic agency fluff. Working with UIC felt like a masterclass in modern digital craft.',
    tag: 'Brand Experience',
    initials: 'ML',
  },
];

function VerifiedIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Card({ item }: { item: Testimonial }) {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.header}>
          <div className={styles.avatar}>{item.initials}</div>
          <div className={styles.authorMeta}>
            <div className={styles.nameRow}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.verifiedBadge} title="Verified Client Project">
                <VerifiedIcon />
              </span>
            </div>
            <span className={styles.role}>
              {item.role} · {item.company}
            </span>
          </div>
        </div>
        <p className={styles.quote}>“{item.quote}”</p>
      </div>
      <div className={styles.footer}>
        <span className={styles.tag}>{item.tag}</span>
        <span className={styles.accentDot} aria-hidden="true" />
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.maskViewport}>
        {/* Row 1: Scrolling Left */}
        <div className={styles.row}>
          <div className={`${styles.track} ${styles.scrollLeft}`}>
            {/* Primary set */}
            <div className={styles.cardSet}>
              {rowOneTestimonials.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
            {/* Duplicate set for seamless -50% translateX loop */}
            <div className={styles.cardSet} aria-hidden="true">
              {rowOneTestimonials.map((item) => (
                <Card key={`${item.id}-clone`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className={styles.row}>
          <div className={`${styles.track} ${styles.scrollRight}`}>
            {/* Primary set */}
            <div className={styles.cardSet}>
              {rowTwoTestimonials.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
            {/* Duplicate set for seamless -50% translateX loop */}
            <div className={styles.cardSet} aria-hidden="true">
              {rowTwoTestimonials.map((item) => (
                <Card key={`${item.id}-clone`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
