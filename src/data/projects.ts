export type ProjectKind = 'client' | 'concept';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  kind: ProjectKind;
  client: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string;
  description: string;
  coverImage?: string;
  challenge?: string;
  solution?: string;
  deliverables?: string[];
  metrics?: ProjectMetric[];
  externalUrl?: string;
  externalLabel?: string;
  badge: string;
  year: string;
  accent: string;
  mockupType: 'pixpil' | 'dafy' | 'luvcutlet' | 'forma' | 'connect' | 'flow';
}

export const projects: Project[] = [
  {
    id: 'pixpil',
    kind: 'client',
    client: 'Pixpil Design (PXPL)',
    title: 'Pixpil — Global Brand Experience (BX)™ Platform',
    subtitle: 'Primary Agency Website & Digital Showcase',
    category: 'DIGITAL / WEB ARCHITECTURE',
    tags: 'Brand Experience (BX)™ / Web Architecture / Interactive Showcase / Motion',
    coverImage: '/images/projects/pixpil-cover.jpg',
    description:
      'Primary website designed and engineered for Pixpil (PXPL), a premier global Brand Experience design company operating across Kochi and Shanghai. Built to showcase the proprietary PXPL BX® method, feature multidisciplinary portfolio case studies, and deliver an immersive, high-speed digital experience.',
    challenge:
      'Pixpil required a flagship web presence reflecting its international stature: ultra-responsive, visually uncompromising, fast-loading with cinematic video reels, and crafted to convert founders looking for transformative brand repositioning.',
    solution:
      'Engineered an ultra-refined editorial web architecture with high-contrast brutalist aesthetics, smooth page transitions, high-impact video showcases, and structured case-study indexing tailored for global brand leaders.',
    deliverables: [
      'Primary Flagship Agency Website',
      'Interactive Video Hero & Reel Integration',
      'Case Study Portfolio Showcase',
      'Responsive Editorial Grid System',
      'Global Brand Experience Storytelling',
    ],
    metrics: [
      { value: '100%', label: 'Bespoke Architecture' },
      { value: '<1.2s', label: 'Global Load Speed' },
      { value: 'Global', label: 'Audience (IN / CN / US)' },
    ],
    externalUrl: 'https://www.pixpildesign.com/',
    externalLabel: 'Visit Live Website',
    badge: 'LIVE CLIENT WEBSITE',
    year: '2025',
    accent: '#00dc4c',
    mockupType: 'pixpil',
  },
  {
    id: 'dafy',
    kind: 'client',
    client: 'Dafy Online Pvt. Ltd',
    title: 'Dafy — On-Demand Mobility & Chauffeur Platform',
    subtitle: 'Customer Booking App, Partner Suite & Mobility System',
    category: 'APP / PRODUCT DESIGN / PLATFORM',
    tags: 'Mobile App / On-Demand Booking / Chauffeur Platform / Repositioning',
    coverImage: '/images/projects/dafy-cover.jpg',
    description:
      'A full-scale product design and mobile app booking experience engineered for Dafy, an on-demand chauffeur platform that lets car owners hire verified professional drivers for round trips, outstation travel, and daily commutes. Strategically repositioned the service to drive massive organic growth.',
    challenge:
      'Customers needed an intuitive, high-trust experience to hand over the keys of their personal vehicles, while the business required a fast booking flow that eliminated customer churn during peak hours.',
    solution:
      'Crafted a streamlined, 3-tap booking flow, real-time chauffeur ETA tracking, transparent tier pricing (round trips, one-way drops, late-night pickups), and an executive companion app that empowered driver partners.',
    deliverables: [
      'Customer Mobile App UI / UX (iOS & Android)',
      'Real-Time Chauffeur Dispatch UI',
      'Driver Partner Companion App',
      'Interactive Web Booking Portal',
      'Scalable Design System & Components',
    ],
    metrics: [
      { value: '10X', label: 'Growth in 6 Months' },
      { value: '3-Tap', label: 'Instant Booking Flow' },
      { value: '4.9★', label: 'Customer Trust Rating' },
    ],
    externalUrl: 'https://dafy.in/',
    externalLabel: 'Explore Live App',
    badge: 'LIVE CLIENT APP & PLATFORM',
    year: '2024',
    accent: '#fdb813',
    mockupType: 'dafy',
  },
  {
    id: 'luvcutlet',
    kind: 'client',
    client: 'Luv Cutlet (PXPL Portfolio)',
    title: 'Luv Cutlet — India’s 1st Cutlet-Only QSR Brand',
    subtitle: 'Digital Brand Experience, Menu Architecture & Franchise Funnel',
    category: 'QSR / DIGITAL EXPERIENCE',
    tags: 'Violet & Yellow BX Theme / Interactive Menu / Food Experience / Franchise Scale',
    coverImage: '/images/projects/luvcutlet-cover.jpg',
    description:
      'Distinctive digital presence and interactive website crafted for Luv Cutlet, pioneering India’s first fast-casual QSR concept dedicated entirely to cutlets and evening street food culture. Designed in its signature Royal Violet and Marigold Yellow brand system.',
    challenge:
      'Transitioning a beloved street homecooking venture originating from a 3-wheeled autorickshaw into a scalable, high-energy modern culinary chain backed by international investment.',
    solution:
      'Designed an appetizing, playful web experience featuring interactive menu exploration, the iconic 3-wheeler heritage narrative, street-to-store storytelling, and an investor-ready franchise onboarding funnel.',
    deliverables: [
      'Interactive Brand Web Experience',
      'Digital Menu & Item Showcase',
      'Franchise Investor Portal Funnel',
      'Mobile-First Responsive Architecture',
      'Street-to-Store Visual Identity',
    ],
    metrics: [
      { value: '1st', label: 'Cutlet-Only QSR in India' },
      { value: 'Multi-City', label: 'Kochi • TVM • Palakkad' },
      { value: 'Funded', label: 'International Investment' },
    ],
    externalUrl: 'https://www.pixpildesign.com/portfolio/luvcutlet/',
    externalLabel: 'View Live Case Study',
    badge: 'PRODUCTION WEB EXPERIENCE',
    year: '2024',
    accent: '#5b2b82',
    mockupType: 'luvcutlet',
  },
  {
    id: 'forma',
    kind: 'concept',
    client: 'UIC Design Lab',
    title: 'Forma — A quieter kind of bold',
    subtitle: 'Architectural Digital Presence & Material Identity',
    category: 'BRAND STRATEGY / DIGITAL',
    tags: 'Brand strategy / Art direction / Website experience',
    description:
      'An exploratory identity and website direction for an architecture studio. Warm materials, sculptural typography, and generous negative space build a calm, confident digital presence. This is an original concept study, not a commissioned client project.',
    deliverables: ['Concept Identity System', 'Spatial Layout System', 'Editorial Typography'],
    metrics: [
      { value: '01', label: 'Exploration Study' },
      { value: 'Spatial', label: 'Design Language' },
    ],
    badge: 'CONCEPT EXPLORATION',
    year: 'Concept',
    accent: '#cfccc2',
    mockupType: 'forma',
  },
  {
    id: 'connect',
    kind: 'concept',
    client: 'UIC Connected Lab',
    title: 'Connect — Beyond the business card',
    subtitle: 'Tactile NFC Hardware & Digital Profile Ecosystem',
    category: 'NFC / CONNECTED EXPERIENCES',
    tags: 'Product concept / NFC / Digital profile',
    description:
      'A concept for a connected identity product: a tactile NFC card paired with a focused digital profile. The direction explores how a single tap can make introductions seamless, with dynamic QR fallback and evolvable metadata.',
    deliverables: ['NFC Hardware Mockup', 'Dynamic Mobile Profile UI', 'Contactless Handshake Protocol'],
    metrics: [
      { value: '02', label: 'Connected Study' },
      { value: 'NFC+QR', label: 'Dual Transmission' },
    ],
    badge: 'CONCEPT EXPLORATION',
    year: 'Concept',
    accent: '#8c9b9e',
    mockupType: 'connect',
  },
  {
    id: 'flow',
    kind: 'concept',
    client: 'UIC Systems Lab',
    title: 'Flow — Clarity in the everyday',
    subtitle: 'Connected Enterprise Workspace & Operational Intelligence',
    category: 'ERP / PRODUCT DESIGN',
    tags: 'ERP concept / Dashboard / Product design',
    description:
      'An interface exploration for a connected business workspace. Clear hierarchy and a restrained visual language bring operations, financials, and workflows into one view. The dashboard illustrates a design direction; it is not a live ERP product.',
    deliverables: ['Executive Dashboard UI', 'Operations Metrics Engine', 'Financial Flow Data Visualization'],
    metrics: [
      { value: '03', label: 'Systems Study' },
      { value: 'Real-time', label: 'Telemetry Vision' },
    ],
    badge: 'CONCEPT EXPLORATION',
    year: 'Concept',
    accent: '#b4c6c6',
    mockupType: 'flow',
  },
];
