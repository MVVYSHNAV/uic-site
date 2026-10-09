const story = document.querySelector('.story');
const stage = document.querySelector('.story-stage');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
let scheduled = false;
function paintStory() {
  scheduled = false;
  const p = reduced.matches
    ? 0
    : clamp(-story.getBoundingClientRect().top / (story.offsetHeight - innerHeight));
  const rise = clamp((p - 0.08) / 0.22),
    world = clamp((p - 0.28) / 0.28),
    chapter = clamp((p - 0.43) / 0.18),
    walk = clamp((p - 0.3) / 0.4);
  const values = {
    '--p': p,
    '--hero-opacity': 1 - clamp((p - 0.2) / 0.18),
    '--hero-y': `${-p * 65}px`,
    '--rise': `${-rise * 65}px`,
    '--chair-opacity': 1 - rise,
    '--human-x': `${walk * (innerWidth < 700 ? 65 : 150)}px`,
    '--human-scale': 1 - walk * 0.18,
    '--human-opacity': 1 - clamp((p - 0.55) / 0.2),
    '--leg-left': `${rise * -22 + Math.sin(walk * 14) * walk * 12}deg`,
    '--leg-right': `${rise * 24 - Math.sin(walk * 14) * walk * 12}deg`,
    '--world-opacity': world,
    '--portal-scale': 0.8 + world * 0.2,
    '--card-y': `${(1 - world) * 80}px`,
    '--spot-opacity': 1 - world * 0.7,
    '--chapter-opacity': chapter,
    '--chapter-y': `${(1 - chapter) * 30}px`,
    '--chapter-events': chapter > 0.8 ? 'auto' : 'none',
  };
  for (const [key, value] of Object.entries(values)) stage.style.setProperty(key, value);
  document.querySelector('.chapter-number').textContent =
    p > 0.45 ? '02 — THE TRANSFORMATION' : '01 — THE POSSIBILITY';
  document.querySelector('.chapter-copy').inert = chapter < 0.8;
  document.querySelector('.hero-copy').setAttribute('aria-hidden', String(p > 0.4));
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
document
  .querySelector('.skip-story')
  .addEventListener('click', () =>
    document
      .querySelector('#intro')
      .scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' }),
  );
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
