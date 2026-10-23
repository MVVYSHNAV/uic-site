const story = document.querySelector('.hero-portal, .story');
const stage = document.querySelector('.portal-stage, .story-stage');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
let scheduled = false;

function paintStory() {
  scheduled = false;
  if (!story || !stage) return;
  const rect = story.getBoundingClientRect();
  const distance = Math.max(1, story.offsetHeight - innerHeight);
  const isReduced = reduced.matches;
  const p = isReduced ? 1 : clamp(-rect.top / distance);

  const vw = innerWidth;
  const vh = innerHeight;
  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1200;

  const openProgress = isReduced ? 1 : clamp(p / 0.85);
  const panelSlide = openProgress * 102;
  const photoScale = isReduced ? 1.0 : 1.14 - 0.14 * clamp(p / 0.9);
  const washOpacity = isReduced ? 0.75 : clamp(p / 0.75) * 0.75;
  const wmScale = isReduced ? 1.06 : 1.0 + 0.09 * openProgress;
  const wmSpacing = isReduced ? -0.03 : 0.02 - 0.06 * openProgress;

  const splitMax = isMobile ? 36 : isTablet ? 85 : 140;
  const splitX = isReduced ? (isMobile ? 18 : 60) : openProgress * splitMax;

  const spreadX = vw * (isMobile ? 0.36 : 0.42);
  const spreadY = vh * (isMobile ? 0.32 : 0.38);
  const dotAmberX = isReduced ? -spreadX : -openProgress * spreadX;
  const dotAmberY = isReduced ? -spreadY : -openProgress * spreadY;
  const dotTealX = isReduced ? spreadX : openProgress * spreadX;
  const dotTealY = isReduced ? spreadY : openProgress * spreadY;

  const contentOpacity = isReduced ? 1 : clamp(0.2 + openProgress * 0.8);
  const contentY = isReduced ? 0 : (1 - openProgress) * 16;
  const hintOpacity = isReduced ? 0 : Math.max(0, 1 - p * 3.0);

  stage.style.setProperty('--p', p);
  stage.style.setProperty('--open-p', openProgress);
  stage.style.setProperty('--panel-left', `${panelSlide}%`);
  stage.style.setProperty('--panel-right', `${panelSlide}%`);
  stage.style.setProperty('--photo-scale', photoScale);
  stage.style.setProperty('--wash-opacity', washOpacity);
  stage.style.setProperty('--wm-scale', wmScale);
  stage.style.setProperty('--wm-spacing', `${wmSpacing.toFixed(4)}em`);
  stage.style.setProperty('--split-x', `${splitX.toFixed(1)}px`);
  stage.style.setProperty('--dot-amber-x', `${dotAmberX.toFixed(1)}px`);
  stage.style.setProperty('--dot-amber-y', `${dotAmberY.toFixed(1)}px`);
  stage.style.setProperty('--dot-teal-x', `${dotTealX.toFixed(1)}px`);
  stage.style.setProperty('--dot-teal-y', `${dotTealY.toFixed(1)}px`);
  stage.style.setProperty('--content-opacity', contentOpacity);
  stage.style.setProperty('--content-y', `${contentY.toFixed(1)}px`);
  stage.style.setProperty('--hint-opacity', hintOpacity);
}

addEventListener(
  'scroll',
  () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(paintStory);
    }
  },
  { passive: true },
);
addEventListener('resize', paintStory);
reduced.addEventListener('change', paintStory);
paintStory();

document.querySelector('.portal-bottom-link, .skip-story')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#intro')?.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
});
const toggle = document.querySelector('.menu-toggle'),
  nav = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }),
);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }
});
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.08 },
);
document
  .querySelectorAll(
    '.intro-grid,.section-heading,.project,.services-grid,.nfc-grid,.process-grid article',
  )
  .forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
const projects = [
  {
    title: 'Forma — a quieter kind of bold',
    description:
      'An exploratory identity and website direction for an architecture studio. Warm materials, sculptural typography and generous space build a calm, confident digital presence. This is an original concept study, not a commissioned client project.',
    tags: 'Brand strategy / Art direction / Website experience',
  },
  {
    title: 'Connect — beyond the business card',
    description:
      'A concept for a connected identity product: a tactile NFC card paired with a focused digital profile. The direction explores how a single tap can make introductions easier, with a QR fallback and details that can evolve over time.',
    tags: 'Product concept / NFC / Digital profile',
  },
  {
    title: 'Flow — clarity in the everyday',
    description:
      'An interface exploration for a connected business workspace. Clear hierarchy and a restrained visual language bring operations and workflows into one view. The dashboard illustrates a design direction; it is not a live ERP product.',
    tags: 'ERP concept / Dashboard / Product design',
  },
];
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach((button) =>
  button.addEventListener('click', () => {
    const project = projects[Number(button.dataset.project)];
    document.querySelector('#project-title').textContent = project.title;
    document.querySelector('#project-description').textContent = project.description;
    document.querySelector('#project-tags').textContent = project.tags;
    dialog.showModal();
  }),
);
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
      dialog.close();
  }
});
dialog.querySelector('a').addEventListener('click', () => dialog.close());
document
  .querySelector('[data-interest]')
  .addEventListener(
    'click',
    (e) =>
      (document.querySelector('select[name="service"]').value = e.currentTarget.dataset.interest),
  );
document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const text = `UIC — Project enquiry\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nInterested in: ${data.get('service')}\n\nProject overview:\n${data.get('message')}\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'UIC-project-brief.txt';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#form-status').textContent =
    'Your brief has been downloaded. Nothing has been sent or stored by this site.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
