// ─── Reusable component functions ───────────────────────────────────────────

// contactHref: pages that render the contact band scroll to it; the project
// pages do not have one, so they hand off to the home page's.
function BottomDock({ name, email, resume }, { page = 'home', contactHref = '#contact' } = {}) {
  const isWork  = page === 'work';
  const isAbout = page === 'about';
  const isPlay  = page === 'play';
  const homeHref = (isWork || isAbout || isPlay) ? 'index.html' : '#top';

  return `
    <div class="dock-wrap" id="dock-wrap">
      <nav class="dock" aria-label="Site navigation">
        <a class="dock__brand" href="${homeHref}">${name}</a>
        <a class="dock__link${!isWork && !isAbout && !isPlay ? ' is-active' : ''}" href="${homeHref}">
          ${!isWork && !isAbout && !isPlay ? '<span class="dock__bullet"></span>' : ''}Home
        </a>
        <a class="dock__link${isWork ? ' is-active' : ''}" href="work.html">
          ${isWork ? '<span class="dock__bullet"></span>' : ''}Work
        </a>
        <a class="dock__link${isAbout ? ' is-active' : ''}" href="about.html">
          ${isAbout ? '<span class="dock__bullet"></span>' : ''}About
        </a>
        <a class="dock__link${isPlay ? ' is-active' : ''}" href="play.html">
          ${isPlay ? '<span class="dock__bullet"></span>' : ''}Play here
        </a>
        <a class="dock__link" href="${contactHref}">Contact</a>
        <a class="dock__resume" href="${(resume && resume.file) || '#'}" target="_blank" rel="noopener"
           data-resume${resume && resume.filename ? ` data-filename="${resume.filename}"` : ''}${resume && resume.updated ? ` data-updated="${resume.updated}"` : ''}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v8M4 7l4 4 4-4M3 13h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Resume
        </a>
        <button class="dock__theme" id="theme-toggle" aria-label="Toggle dark mode">
          <svg id="theme-icon-moon" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M8 1.5a6.5 6.5 0 0 1 0 13V1.5z" fill="currentColor"/>
          </svg>
          <svg id="theme-icon-sun" width="14" height="14" viewBox="0 0 16 16" fill="none" style="display:none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M8 14.5a6.5 6.5 0 0 1 0-13v13z" fill="currentColor"/>
          </svg>
        </button>
      </nav>
    </div>`;
}

function HeroSection({ heroGreeting, heroSubtitle, email, heroCyclePrefix, heroCycleWords, heroStats }) {
  const words = heroCycleWords || [];
  const firstWord = words[0] || '';
  // Reserve the line box with the longest phrase so nothing is clipped mid-cycle
  const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a), firstWord);
  return `
    <section class="hero" id="top">
      <div class="hero__content">
        <div class="hero__avatar-wrap">
          <div class="hero__bubble">Hello!! 👋</div>
          <div class="hero__avatar">
            <img src="assets/avatar.png" alt="Om Kumar" class="hero__avatar-img" />
          </div>
        </div>
        <h1 class="hero__display">
          <span class="hero__display-prefix">UX Designer<br>with a focus on</span>
          <span class="hero__cycle-wrap">
            <span class="hero__cycle-placeholder" aria-hidden="true">${longestWord}</span>
            <em class="hero__cycle-word" id="hero-cycle-word">${firstWord}</em>
          </span>
        </h1>
        <p class="hero__sub">${heroSubtitle}</p>
        ${HeroStats(heroStats)}
      </div>
      <div class="hero__scroll">
        <span class="hero__scroll-label">Scroll</span>
        <span class="hero__scroll-line"></span>
      </div>
    </section>`;
}

function HeroStats(stats) {
  if (!stats || !stats.length) return '';
  return `
    <dl class="hero__stats">
      ${stats.map(({ value, label }) => `
        <div class="hero__stat">
          <dt class="hero__stat-value">${value}</dt>
          <dd class="hero__stat-label">${label}</dd>
        </div>`).join('')}
    </dl>`;
}

function Tag({ label }) {
  return `<span class="tag">${label}</span>`;
}

function WorkScreenshotMockup({ accentColor }) {
  const accent = accentColor || "#8080ff";
  return `
    <div class="wss">
      <div class="wss__chrome">
        <span class="wss__dots"><i></i><i></i><i></i></span>
        <span class="wss__url-bar"></span>
        <span class="wss__btns"><i></i><i></i></span>
      </div>
      <div class="wss__body">
        <div class="wss__sidebar">
          <div class="wss__sb-header"></div>
          <div class="wss__sb-item wss__sb-item--active" style="--accent:${accent}"></div>
          <div class="wss__sb-item"></div>
          <div class="wss__sb-item"></div>
          <div class="wss__sb-item"></div>
          <div class="wss__sb-divider"></div>
          <div class="wss__sb-item"></div>
          <div class="wss__sb-item"></div>
        </div>
        <div class="wss__main">
          <div class="wss__toolbar">
            <span class="wss__breadcrumb"></span>
            <span class="wss__action-btn" style="--accent:${accent}"></span>
          </div>
          <div class="wss__table">
            <div class="wss__thead">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <div class="wss__trow"></div>
            <div class="wss__trow wss__trow--hl" style="--accent:${accent}"></div>
            <div class="wss__trow"></div>
            <div class="wss__trow wss__trow--hl" style="--accent:${accent}"></div>
            <div class="wss__trow"></div>
            <div class="wss__trow"></div>
            <div class="wss__trow"></div>
          </div>
        </div>
      </div>
    </div>`;
}

function WorkProjectRow({ id, title, category, year, tags, color, accentColor, description, status, thumb }) {
  const meta = tags ? tags.join(' • ') : description;
  const isComingSoon = status === 'coming-soon';
  const cardClass = `fw-card${status ? ` fw-card--${status}` : ''}`;
  const interactive = isComingSoon ? '' : `data-project-id="${id}" role="button" tabindex="0"`;

  const overlay = isComingSoon ? `
    <div class="fw-card__cs-overlay" aria-hidden="true"></div>
    <span class="fw-card__cs-badge" aria-hidden="true">Coming Soon</span>` : '';

  const chip = status === 'shipped'
    ? `<div class="fw-chip" aria-hidden="true">Shipped</div>`
    : isComingSoon
      ? `<div class="fw-chip fw-chip--soon" aria-hidden="true">Coming Soon</div>`
      : '';

  return `
    <article class="${cardClass}" ${interactive}>
      ${chip}
      <div class="fw-card__thumb${thumb ? ' fw-card__thumb--img' : ''}" style="--thumb-bg:${color};--thumb-accent:${accentColor || '#888'}">
        ${thumb
          ? `<img class="fw-card__thumb-img" src="${thumb}" alt="" loading="lazy">`
          : WorkScreenshotMockup({ accentColor })}
        ${overlay}
      </div>
      <div class="fw-card__info">
        <span class="fw-card__cat">${category} · ${year}</span>
        <h3 class="fw-card__title">${title}</h3>
        <p class="fw-card__role">${meta}</p>
      </div>
    </article>`;
}

function ProjectsGrid({ projects, workHeading, workHeadingAccent, workDesc }, { limit, viewAllUrl } = {}) {
  const shown = limit ? projects.slice(0, limit) : projects;
  const cards = shown.map(p => WorkProjectRow(p)).join("");

  const viewAll = viewAllUrl ? `
    <a href="${viewAllUrl}" class="fw-viewall">
      View all work
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>` : '';

  return `
    <section class="fw-sec" id="work">
      <div class="fw-header">
        <div class="fw-header__left">
          <span class="fw-header__label">✦ Featured Work</span>
          <h2 class="fw-header__h">${workHeading || 'Selected'} <em class="fw-header__em">${workHeadingAccent || 'work'}</em></h2>
        </div>
        <p class="fw-header__desc">${workDesc || ''}</p>
      </div>
      <div class="fw-grid">${cards}</div>
      ${viewAll}
    </section>`;
}

function SkillList({ skills }) {
  const items = skills.map(s => Tag({ label: s })).join("");
  return `<div class="skill-list">${items}</div>`;
}

function SkillsSection({ capabilities, capDesc, skills }) {
  if (!capabilities?.length) return '';

  const cards = capabilities.map(({ num, title, description }) => `
    <div class="cap-card">
      <span class="cap-card__num">${num}</span>
      <h3 class="cap-card__title">${title}</h3>
      <p class="cap-card__desc">${description}</p>
    </div>`).join('');

  const descParagraphs = (capDesc || []).map(p => `<p class="cap-desc__p">${p}</p>`).join('');

  const chips      = (skills || []).map(s => `<span class="cap-chip">${s}</span>`).join('');
  const chipsMq = (skills || []).map(s => `<span class="cap-mq-chip">${s}</span>`).join('');

  return `
    <section class="cap-sec" id="skills">
      <div class="cap-sec__inner">
        <div class="cap-sec__header">
          <span class="cap-sec__label">CAPABILITIES</span>
          <span class="cap-sec__sub">— explore</span>
        </div>
        <div class="cap-grid">${cards}</div>
        <div class="cap-desc">${descParagraphs}</div>
        <div class="cap-chips">${chips}</div>
      </div>
      <div class="cap-marquee" aria-hidden="true">
        <div class="cap-marquee__track">${chipsMq}${chipsMq}</div>
        <div class="cap-marquee__track cap-marquee__track--rev">${chipsMq}${chipsMq}</div>
        <div class="cap-marquee__track">${chipsMq}${chipsMq}</div>
      </div>
    </section>`;
}

function AboutSection({ about, skills }) {
  return `
    <section class="about" id="about">
      <div class="section-label">About</div>
      <div class="about__inner">
        <p class="about__text">${about}</p>
        ${SkillList({ skills })}
      </div>
    </section>`;
}

/* ─── Hanging ID card ────────────────────────────────────────────────────────
   The card is real markup, positioned by js/lanyard.js. With no JS, a blocked
   script, or reduced motion it simply hangs straight from the CSS below — the
   physics is an enhancement, never the thing holding the content up. */
function LanyardCard(card, name, title) {
  const c = card || {};
  const rows = (c.rows || []).map(([k, v]) => `
    <div class="idc__row"><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  return `
    <div class="lanyard" data-lanyard>
      <svg class="lanyard__rope" aria-hidden="true" preserveAspectRatio="none">
        <path class="lanyard__strand" d="" />
        <path class="lanyard__strand" d="" />
        <path class="lanyard__clip-strap" d="" />
        <g class="lanyard__clasp" transform="translate(-999,-999)">
          <rect class="lanyard__clasp-body" x="-13" y="-9" width="26" height="30" rx="4" />
          <rect class="lanyard__clasp-slot" x="-8" y="-4" width="4.5" height="13" rx="2" />
          <rect class="lanyard__clasp-slot" x="3.5" y="-4" width="4.5" height="13" rx="2" />
        </g>
      </svg>
      <div class="lanyard__bar" aria-hidden="true"></div>

      <!-- shown only until the simulation takes over -->
      <div class="lanyard__static" aria-hidden="true">
        <i class="lanyard__band lanyard__band--l"></i>
        <i class="lanyard__band lanyard__band--r"></i>
        <i class="lanyard__static-clasp"></i>
      </div>

      <article class="idc" data-lanyard-card>
        <div class="idc__head">
          <span class="idc__org">${c.org || name}</span>
          <span class="idc__tag">ID</span>
        </div>
        <div class="idc__photo">
          <img src="${c.photo || 'assets/avatar.png'}" alt="" loading="lazy" draggable="false">
        </div>
        <h3 class="idc__name">${name}</h3>
        <p class="idc__role">${c.role || title}</p>
        <dl class="idc__rows">${rows}</dl>
        <div class="idc__barcode" aria-hidden="true"></div>
        ${c.footnote ? `<p class="idc__foot" aria-hidden="true">${c.footnote}</p>` : ''}
      </article>
    </div>`;
}

function AboutHeroSection({ name, title, statement, bioParagraphs, skills, idCard }) {
  const bioHTML = bioParagraphs.map(p => `<p>${p}</p>`).join("");
  const skillsHTML = skills.map(s => Tag({ label: s })).join("");


  return `
    <section class="about-hero">
      <div class="about-hero__left">
        <div class="about-hero__top">
          <p class="about-hero__label">About me.</p>
          <h1 class="about-hero__statement">${statement}</h1>
        </div>
        <div class="about-hero__bio">${bioHTML}</div>
      </div>
      <div class="about-hero__right">
        <div class="about-hero__hint">
          <span class="about-hero__hint-text">dont touch me</span>
          <svg width="44" height="48" viewBox="0 0 44 48" fill="none" class="about-hero__hint-arrow">
            <path d="M8 4 C8 4 28 10 30 28 C32 40 20 46 20 46" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M20 46 L14 38 M20 46 L28 40" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        ${LanyardCard(idCard, name, title)}
      </div>
    </section>
    <section class="about-skills">
      <div class="section-label">Skills</div>
      <div class="skill-list">${skillsHTML}</div>
    </section>`;
}

// SVG marks keyed by logoId
const LOGO_SVGS = {
  convegenius: `
    <circle cx="24" cy="24" r="7" fill="rgba(255,255,255,0.95)"/>
    <circle cx="10" cy="10" r="4" fill="rgba(255,255,255,0.75)"/>
    <circle cx="38" cy="10" r="4" fill="rgba(255,255,255,0.75)"/>
    <circle cx="10" cy="38" r="4" fill="rgba(255,255,255,0.75)"/>
    <circle cx="38" cy="38" r="4" fill="rgba(255,255,255,0.75)"/>
    <line x1="13.5" y1="13.5" x2="18.5" y2="18.5" stroke="rgba(255,255,255,0.45)" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="34.5" y1="13.5" x2="29.5" y2="18.5" stroke="rgba(255,255,255,0.45)" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="13.5" y1="34.5" x2="18.5" y2="29.5" stroke="rgba(255,255,255,0.45)" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="34.5" y1="34.5" x2="29.5" y2="29.5" stroke="rgba(255,255,255,0.45)" stroke-width="1.8" stroke-linecap="round"/>`,
  iqline: `
    <rect x="19" y="7"  width="10" height="34" rx="5" fill="rgba(255,255,255,0.95)"/>
    <rect x="7"  y="19" width="34" height="10" rx="5" fill="rgba(255,255,255,0.95)"/>`,
  samagra: `
    <polygon points="24,7 42,39 6,39" fill="rgba(255,255,255,0.92)"/>
    <polygon points="24,17 36,37 12,37" fill="rgba(0,0,0,0.18)"/>
    <line x1="24" y1="22" x2="24" y2="34" stroke="rgba(255,255,255,0.9)" stroke-width="2.5" stroke-linecap="round"/>`,
};

function CompanyLogo({ logoId, logoGradient, logoUrl, company }) {
  if (logoUrl) {
    return `
      <div class="hexp__logo hexp__logo--img" aria-label="${company} logo">
        <img src="${logoUrl}" alt="${company}" loading="lazy" />
      </div>`;
  }
  const svgContent = LOGO_SVGS[logoId] || `<text x="24" y="31" text-anchor="middle" fill="white" font-size="18" font-weight="700" font-family="system-ui">${company[0]}</text>`;
  return `
    <div class="hexp__logo" style="background:${logoGradient}" aria-label="${company} logo">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
        ${svgContent}
      </svg>
    </div>`;
}

// An entry marked hidden: true stays in the data and off the page — see the
// note on the hidden entry in data.js.
const visibleExperience = experience => (experience || []).filter(e => !e.hidden);

function HomeExperienceSection({ experience }) {
  const cards = visibleExperience(experience).map(({ role, company, period, location, tags, logoGradient, logoId, logoUrl }) => {
    const tagsHTML = tags.map(t => `<span class="tag">${t}</span>`).join("");
    return `
      <div class="hexp__card">
        ${CompanyLogo({ logoId, logoGradient, logoUrl, company })}
        <div class="hexp__body">
          <span class="hexp__company">${company}</span>
          <span class="hexp__role">${role}</span>
          <span class="hexp__period">${period}${location ? ` · ${location}` : ""}</span>
          <div class="hexp__tags">${tagsHTML}</div>
        </div>
      </div>`;
  }).join("");

  return `
    <section class="hexp" id="experience-home">
      <div class="section-label">Experience</div>
      <div class="hexp__grid">${cards}</div>
    </section>`;
}

function ExperienceSection({ experience }) {
  const items = visibleExperience(experience).map(({ role, company, url, period, location, tags, points }) => {
    const tagsHTML = tags.map(t => Tag({ label: t })).join("");
    const pointsHTML = points.map(p => `<li class="exp__point">${p}</li>`).join("");
    const companyEl = url
      ? `<a class="exp__company" href="${url}" target="_blank" rel="noopener noreferrer">${company}</a>`
      : `<span class="exp__company">${company}</span>`;
    return `
      <div class="exp__item">
        <div class="exp__meta">
          ${companyEl}
          <span class="exp__period">${period}${location ? ` · ${location}` : ""}</span>
          <div class="exp__tags">${tagsHTML}</div>
        </div>
        <div class="exp__body">
          <h3 class="exp__role">${role}</h3>
          <ul class="exp__points">${pointsHTML}</ul>
        </div>
      </div>`;
  }).join("");

  return `
    <section class="experience" id="experience">
      <div class="section-label">Experience</div>
      <div class="exp__list">${items}</div>
    </section>`;
}

function CarouselSlide({ label, bg }) {
  return `
    <div class="carousel__slide" style="--slide-bg: ${bg}" data-bg="${bg}" data-label="${label}">
      <span class="carousel__slide-label">${label}</span>
    </div>`;
}

function Carousel({ id, title, slides }) {
  const slidesHTML = slides.map(s => CarouselSlide(s)).join("");
  const dotsHTML = slides.map((_, i) =>
    `<button class="carousel__dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
  ).join("");

  return `
    <div class="carousel" data-carousel="${id}">
      <div class="carousel__header">
        <span class="carousel__title">${title}</span>
        <div class="carousel__arrows">
          <button class="carousel__arrow carousel__arrow--prev" aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="carousel__arrow carousel__arrow--next" aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="carousel__viewport">
        <div class="carousel__track">
          ${slidesHTML}
        </div>
      </div>
      <div class="carousel__dots">
        ${dotsHTML}
      </div>
    </div>`;
}

function GallerySection({ carousels }) {
  const carouselsHTML = carousels.map(c => Carousel(c)).join("");
  return `
    <section class="gallery" id="gallery">
      <div class="section-label">Gallery</div>
      <div class="gallery__grid">
        ${carouselsHTML}
      </div>
    </section>`;
}

function ShoutoutsSection({ shoutouts }) {
  // An entry without a quote is a person whose words we do not have yet, so it
  // does not render — and an empty set takes the whole section off the page
  // rather than leaving an empty frame behind.
  const withQuotes = (shoutouts || []).filter(s => s.quote && s.quote.trim());
  if (!withQuotes.length) return '';
  const slidesHTML = withQuotes.map(({ quote, name, role, company, initials }, i) => `
    <div class="shout__slide${i === 0 ? ' is-active' : ''}" data-index="${i}">
      <blockquote class="shout__quote">${quote}"</blockquote>
      <div class="shout__person">
        <div class="shout__avatar">${initials}</div>
        <div class="shout__info">
          <span class="shout__name">${name}</span>
          <span class="shout__role">${role} · ${company}</span>
        </div>
      </div>
    </div>`).join('');

  const dotsHTML = withQuotes.map((_, i) =>
    `<span class="shout__dot${i === 0 ? ' is-active' : ''}" data-dot="${i}"></span>`
  ).join('');

  return `
    <section class="shoutouts" id="shoutouts">
      <div class="shout__inner">
        <div class="shout__content">
          <div class="shout__header">
            <span class="shout__label">LETTERS TO THE EDITOR</span>
            <h2 class="shout__heading">What people <em class="shout__em">say</em></h2>
          </div>
          <div class="shout__slides" id="shout-slides">
            ${slidesHTML}
          </div>
          <div class="shout__dots" id="shout-dots">
            ${dotsHTML}
          </div>
        </div>
        <div class="shout__nav" aria-label="Testimonial navigation">
          <button class="shout__arrow shout__arrow--prev" id="shout-prev" aria-label="Previous testimonial">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="shout__arrow shout__arrow--next" id="shout-next" aria-label="Next testimonial">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>`;
}

function ContactSection() { return ''; }

// Every external profile the data actually carries — no invented handles
function SocialLinks(p) {
  return [
    ['LinkedIn', p.linkedin],
    ['Behance', p.behance],
    ['GitHub', p.github],
    ['Dribbble', p.dribbble],
    ['Medium', p.medium],
    ['X / Twitter', p.twitter],
  ].filter(([, href]) => href);
}

/* Copy-to-clipboard for the contact band. Delegated and self-installing, so a
   page only has to render the section — no per-page wiring. */
if (typeof document !== 'undefined' && !window.__contactCopyBound) {
  window.__contactCopyBound = true;
  document.addEventListener('click', e => {
    const btn = e.target.closest('#contact-copy');
    if (!btn) return;
    const cta = btn.querySelector('.ct__email-cta');
    const done = msg => {
      btn.classList.add('is-copied');
      cta.textContent = msg;
      setTimeout(() => {
        btn.classList.remove('is-copied');
        cta.innerHTML = 'Click to copy <span aria-hidden="true">\u2192</span>';
      }, 2000);
    };
    navigator.clipboard.writeText(btn.dataset.email)
      .then(() => done('Copied'))
      // Clipboard can be blocked; fall back to opening the mail client
      .catch(() => { done('Opening mail'); window.location.href = 'mailto:' + btn.dataset.email; });
  });
}

/* ─── Résumé overlay ─────────────────────────────────────────────────────────
   The dock's Resume link points at the PDF itself and opens in a new tab, so it
   works with JavaScript off. This intercepts the click and shows the file in
   place instead, with download and open-in-new-tab in a bar across the top.

   Built on first open rather than rendered into every page, and the <iframe> is
   only given its src at that moment — otherwise every page load would fetch a
   1.6MB PDF nobody asked for.

   Mobile browsers get the actions without the embed. iOS Safari renders a PDF
   in an iframe as a single non-scrolling page, which looks broken rather than
   minimal, and no feature query reports that — so the cut is by viewport, where
   an embedded A4 page is unreadable anyway. */
if (typeof document !== 'undefined' && !window.__resumeOverlayBound) {
  window.__resumeOverlayBound = true;

  let el = null;         // the overlay, built once
  let opener = null;     // what to hand focus back to

  const EMBEDS = () => !window.matchMedia('(max-width: 720px)').matches;

  function build(href, filename, updated) {
    const wrap = document.createElement('div');
    wrap.className = 'rz';
    wrap.id = 'resume-overlay';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', 'Résumé');

    const actions = `
      <div class="rz__actions">
        <a class="rz__btn rz__btn--primary" href="${href}" download="${filename || ''}">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v8M4 7l4 4 4-4M3 13h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Download
        </a>
        <a class="rz__btn" href="${href}" target="_blank" rel="noopener">
          Open
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3h7v7M13 3L4 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <button class="rz__close" type="button" aria-label="Close résumé">
          <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
        </button>
      </div>`;

    // #toolbar=0 — the viewer's own chrome would sit right under ours and
    // duplicate the download button. view=FitH fits the page width.
    const body = EMBEDS()
      ? `<iframe class="rz__frame" title="Résumé, PDF" data-src="${href}#toolbar=0&navpanes=0&view=FitH"></iframe>`
      : `<div class="rz__fallback">
           <p class="rz__fallback-h">Best read full screen</p>
           <p class="rz__fallback-p">Phone browsers squeeze an A4 page down past readable. Open it in a tab or take the file.</p>
         </div>`;

    wrap.innerHTML = `
      <div class="rz__panel" role="document">
        <div class="rz__bar">
          <div class="rz__meta">
            <span class="rz__title">Résumé</span>
            ${updated ? `<span class="rz__updated">Updated ${updated}</span>` : ''}
          </div>
          ${actions}
        </div>
        <div class="rz__body">${body}</div>
      </div>`;

    document.body.appendChild(wrap);

    wrap.addEventListener('click', e => {
      if (e.target === wrap) close();                       // backdrop
      if (e.target.closest('.rz__close')) close();
      // taking the file is not a reason to lose your place
      if (e.target.closest('.rz__btn--primary')) setTimeout(close, 400);
    });

    return wrap;
  }

  function open(trigger) {
    const href = trigger.getAttribute('href');
    if (!href || href === '#') return false;

    opener = trigger;
    if (!el) el = build(href, trigger.dataset.filename, trigger.dataset.updated);

    // load the PDF now, not at page load
    const frame = el.querySelector('.rz__frame');
    if (frame && !frame.src) frame.src = frame.dataset.src;

    const scroller = document.getElementById('scroll-wrap');
    if (scroller) scroller.classList.add('no-scroll');

    el.classList.add('is-open');
    const first = el.querySelector('.rz__close');
    if (first) first.focus();
    return true;
  }

  function close() {
    if (!el || !el.classList.contains('is-open')) return;
    el.classList.remove('is-open');
    const scroller = document.getElementById('scroll-wrap');
    if (scroller) scroller.classList.remove('no-scroll');
    if (opener) { opener.focus(); opener = null; }
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest && e.target.closest('[data-resume]');
    if (!trigger) return;
    // a modifier or middle click means they want their own tab — let them have it
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (open(trigger)) e.preventDefault();
  });

  document.addEventListener('keydown', e => {
    if (!el || !el.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    // keep tabbing inside the dialog
    const stops = el.querySelectorAll('a[href], button');
    if (!stops.length) return;
    const first = stops[0], last = stops[stops.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ─── The Intelligence Triangle ──────────────────────────────────────────────
   Three corners, a marker for where I sit between them, and a self-assessment
   per corner on hover, focus or tap. The marker is placed by weight rather than
   by hand, so moving the numbers in data.js moves the dot. */
function IntelligenceTriangle(p) {
  const t = p.triangle;
  if (!t || !t.nodes) return '';

  // geometry, in viewBox units
  const V = { cq: [300, 96], eq: [92, 432], bq: [508, 432] };
  const R = 27;
  const LABEL = { cq: [300, 46], eq: [92, 486], bq: [508, 486] };

  const w = t.marker.weights, sum = (w.cq + w.eq + w.bq) || 1;
  const mx = (V.cq[0] * w.cq + V.eq[0] * w.eq + V.bq[0] * w.bq) / sum;
  const my = (V.cq[1] * w.cq + V.eq[1] * w.eq + V.bq[1] * w.bq) / sum;

  const edge = (a, b) =>
    `<line class="tri__edge" x1="${V[a][0]}" y1="${V[a][1]}" x2="${V[b][0]}" y2="${V[b][1]}"/>`;

  const node = n => `
    <g class="tri__node" data-node="${n.id}" tabindex="0" role="button"
       aria-label="${n.name} — read the self-assessment" aria-controls="tri-readout">
      <circle class="tri__halo" cx="${V[n.id][0]}" cy="${V[n.id][1]}" r="${R + 20}"/>
      <circle class="tri__disc" cx="${V[n.id][0]}" cy="${V[n.id][1]}" r="${R}"/>
      <text class="tri__abbr" x="${V[n.id][0]}" y="${V[n.id][1]}" dy="0.35em">${n.abbr}</text>
      <text class="tri__label" x="${LABEL[n.id][0]}" y="${LABEL[n.id][1]}">${n.name}</text>
    </g>`;

  const readouts = t.nodes.map(n => `
    <div class="tri__readout" data-readout="${n.id}" hidden>
      <p class="tri__readout-key">${n.name}</p>
      <p class="tri__readout-body">${n.body}</p>
    </div>`).join('');

  return `
    <section class="tri" id="triangle">
      <div class="tri__inner">
        <header class="tri__head">
          <div>
            <p class="tri__eyebrow">${t.eyebrow}</p>
            <h2 class="tri__title">${t.headline} <em>${t.headlineAccent}</em> ${t.headlineEnd}</h2>
            <p class="tri__sub">${t.sub}</p>
          </div>
          <p class="tri__hint"><span aria-hidden="true">→</span> ${t.hint}</p>
        </header>

        <div class="tri__cols">
          <div class="tri__figure">
            <svg class="tri__svg" viewBox="0 0 600 520" role="img"
                 aria-label="A triangle with Creative, Emotional and Business Quotient at its corners, and a marker showing where I currently sit between them.">
              ${edge('cq', 'eq')}${edge('eq', 'bq')}${edge('bq', 'cq')}
              <g class="tri__marker" aria-hidden="true">
                <text class="tri__marker-label" x="${mx}" y="${my - 26}">${t.marker.label}</text>
                <circle class="tri__marker-ring" cx="${mx}" cy="${my}" r="11"/>
                <circle class="tri__marker-dot" cx="${mx}" cy="${my}" r="4.5"/>
              </g>
              ${t.nodes.map(node).join('')}
            </svg>
            <div class="tri__readouts" id="tri-readout" aria-live="polite">${readouts}</div>
          </div>

          <div class="tri__why">
            <h3 class="tri__why-h">${t.why.heading}</h3>
            ${t.why.body.map(b => `<p class="tri__why-body">${b}</p>`).join('')}
          </div>
        </div>
      </div>
    </section>`;
}

/* Corner interaction. Hover and focus behave the same; on a touch screen a tap
   selects a corner and tapping it again clears it. Delegated and self-installing
   so a page only has to render the section. */
if (typeof document !== 'undefined' && !window.__triangleBound) {
  window.__triangleBound = true;
  const setActive = (section, id) => {
    section.dataset.active = id || '';
    section.querySelectorAll('.tri__node').forEach(n =>
      n.classList.toggle('is-active', n.dataset.node === id));
    section.querySelectorAll('.tri__readout').forEach(r =>
      r.hidden = r.dataset.readout !== id);
  };
  const nodeFrom = e => e.target.closest && e.target.closest('.tri__node');

  document.addEventListener('pointerover', e => {
    const n = nodeFrom(e);
    if (n && e.pointerType !== 'touch') setActive(n.closest('.tri'), n.dataset.node);
  });
  document.addEventListener('pointerout', e => {
    const n = nodeFrom(e);
    if (!n || e.pointerType === 'touch') return;
    const to = e.relatedTarget;
    if (to && to.closest && to.closest('.tri__node')) return;   // moving between corners
    setActive(n.closest('.tri'), '');
  });
  document.addEventListener('focusin', e => {
    const n = nodeFrom(e);
    if (n) setActive(n.closest('.tri'), n.dataset.node);
  });
  document.addEventListener('click', e => {
    const n = nodeFrom(e);
    if (!n) return;
    const sec = n.closest('.tri');
    setActive(sec, sec.dataset.active === n.dataset.node ? '' : n.dataset.node);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.tri[data-active]').forEach(sec => setActive(sec, ''));
  });
}

/* ─── Contact band ──────────────────────────────────────────────────────────
   Two columns: the ask on the left with the email as the primary object on the
   page, the standing facts on the right. */
function ContactSection(p) {
  const c = p.contact || {};
  const links = SocialLinks(p).map(([label, href]) =>
    `<a class="ct__social" href="${href}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a>`
  ).join('');

  return `
    <section class="ct" id="contact">
      <div class="ct__inner">
        <p class="ct__eyebrow">✶ ${c.eyebrow || 'Get in touch'}</p>
        <h2 class="ct__headline">${c.headline || "Let's"} <em>${c.headlineAccent || 'talk'}</em>.</h2>
        ${c.sub ? `<p class="ct__sub">${c.sub}</p>` : ''}
        ${c.note ? `<p class="ct__note">${c.note}</p>` : ''}

        <div class="ct__cols">
          <div class="ct__actions">
            <button class="ct__email" id="contact-copy" data-email="${p.email}">
              <span class="ct__key">✉ Email</span>
              <span class="ct__email-val">${p.email}</span>
              <span class="ct__email-cta">Click to copy <span aria-hidden="true">→</span></span>
            </button>
            ${c.calendly ? `
            <a class="ct__row" href="${c.calendly}" target="_blank" rel="noopener">
              <span class="ct__key">◷ Schedule</span>
              <span class="ct__row-val">Book a 30-minute coffee</span>
              <span class="ct__row-arrow" aria-hidden="true">↗</span>
            </a>` : ''}
          </div>

          <dl class="ct__facts">
            ${c.location ? `
            <div class="ct__fact">
              <dt class="ct__key">Currently in</dt>
              <dd class="ct__fact-val">${c.location}</dd>
            </div>` : ''}
            ${c.availability ? `
            <div class="ct__fact">
              <dt class="ct__key ct__key--live"><span class="ct__dot" aria-hidden="true"></span>${c.availability}</dt>
              <dd class="ct__fact-val">${c.availabilityNote || ''}</dd>
            </div>` : ''}
            ${links ? `
            <div class="ct__fact">
              <dt class="ct__key">Find me also at</dt>
              <dd class="ct__socials">${links}</dd>
            </div>` : ''}
          </dl>
        </div>
      </div>
    </section>`;
}

/* The wordmark as outlined geometry (js/wordmark.js), so the letters are the
   same on every device and can be morphed. Renders the finished name — the
   morph script swaps in its start shapes only when it is about to animate, so
   with no JS, a failed CDN, or reduced motion this is simply the wordmark.
   Falls back to live text if the outline data isn't loaded. */
function WordmarkSVG(name, accentIndex) {
  if (typeof WORDMARK === 'undefined' || WORDMARK.text !== name) return '';
  const letters = WORDMARK.letters;
  // accentIndex counts characters in the name; the outlines skip the space
  let charPos = -1;
  const accentFor = idx => {
    for (let i = 0, c = 0; i < name.length; i++) {
      if (name[i] === ' ') continue;
      if (c === idx) return i;
      c++;
    }
    return -1;
  };
  const paths = (cls, ghost) => letters.map((l, idx) => {
    const isAccent = accentFor(idx) === accentIndex;
    return `<path class="${cls}${isAccent && !ghost ? ' is-accent' : ''}" d="${l.d}" data-to="${l.d}" data-from="${l.from}"></path>`;
  }).join('');

  return `
    <svg class="ft__svg" viewBox="${WORDMARK.viewBox}" role="img" aria-label="${name}"
         data-wordmark preserveAspectRatio="xMidYMid meet">
      <g class="ft__svg-ghost" aria-hidden="true">${paths('ft__glyph-ghost', true)}</g>
      <g class="ft__svg-name">${paths('ft__glyph', false)}</g>
    </svg>`;
}

/* ─── Footer ────────────────────────────────────────────────────────────────
   The name at display size with an offset ghost behind it, one letter in the
   accent, then the small print. */
function Footer(p, { contact = false } = {}) {
  const f = p.footer || {};
  const name = p.name || '';
  const i = Number.isInteger(f.accentIndex) ? f.accentIndex : -1;
  const wordmark = i >= 0 && i < name.length
    ? `${name.slice(0, i)}<em>${name[i]}</em>${name.slice(i + 1)}`
    : name;
  const svgMark = WordmarkSVG(name, f.accentIndex);
  const links = SocialLinks(p).map(([label, href]) =>
    `<a class="ft__link" href="${href}" target="_blank" rel="noopener">${label}</a>`
  ).join('');
  const ticker = (f.ticker || []).join(' · ');

  return `
    ${contact ? ContactSection(p) : ''}
    <footer class="ft">
      <div class="ft__rule" aria-hidden="true"></div>
      <div class="ft__inner">
        <a class="ft__wordmark" href="index.html" aria-label="${name} — home">
          ${svgMark || `
          <span class="ft__ghost" aria-hidden="true">${name}</span>
          <span class="ft__name">${wordmark}</span>`}
        </a>
        ${f.tagline ? `<p class="ft__tagline">${f.tagline}</p>` : ''}
        <nav class="ft__links" aria-label="Elsewhere">
          <a class="ft__link" href="mailto:${p.email}">Email</a>
          ${links}
        </nav>
        ${f.colophon ? `<p class="ft__colophon"><span>Colophon</span><i aria-hidden="true"></i>${f.colophon}</p>` : ''}
      </div>
      ${ticker ? `<div class="ft__ticker" aria-hidden="true">
        <div class="ft__ticker-track"><span>${ticker} · </span><span>${ticker} · </span></div>
      </div>` : ''}
    </footer>`;
}

// ─── Detail panel components ─────────────────────────────────────────────────

function StatBlock({ value, label }) {
  return `
    <div class="stat">
      <span class="stat__value">${value}</span>
      <span class="stat__label">${label}</span>
    </div>`;
}

function DesignFrame({ type, label, color }) {
  const canvas = `<div class="frame__canvas" style="--frame-color: ${color}"></div>`;

  const dots = `<span class="frame__dots"><i></i><i></i><i></i></span>`;

  if (type === "mobile") {
    return `
      <div class="frame frame--mobile">
        <div class="frame__notch"></div>
        ${canvas}
        <div class="frame__home"></div>
        <span class="frame__label">${label}</span>
      </div>`;
  }

  if (type === "wide") {
    return `
      <div class="frame frame--wide">
        <div class="frame__bar">${dots}<span class="frame__url"></span></div>
        ${canvas}
        <span class="frame__label">${label}</span>
      </div>`;
  }

  // default: desktop
  return `
    <div class="frame frame--desktop">
      <div class="frame__bar">${dots}<span class="frame__url"></span></div>
      ${canvas}
      <span class="frame__label">${label}</span>
    </div>`;
}

function RecruiterGlanceCard({ detail, year, category }) {
  const rec = detail.recruiter;
  if (!rec) return '';
  const ownedHTML = (rec.owned || []).join(' · ');
  // liveAt is stored as a plain URL string — show it without the protocol
  const liveAtHTML = rec.liveAt
    ? `<a class="rg__val rg__val--link" href="${rec.liveAt}" target="_blank" rel="noopener">${rec.liveAt.replace(/^https?:\/\//, '')} ↗</a>`
    : `<span class="rg__val rg__val--muted">Not public</span>`;
  return `
    <div class="rg">
      <p class="rg__label">AT A GLANCE</p>
      <div class="rg__divider"></div>
      <div class="rg__grid">
        <div class="rg__cell"><span class="rg__key">ROLE</span><span class="rg__val">${rec.role || detail.role || '—'}</span></div>
        <div class="rg__cell"><span class="rg__key">TIMELINE</span><span class="rg__val">${rec.timeline || year || '—'}</span></div>
        <div class="rg__cell"><span class="rg__key">LIVE AT</span>${liveAtHTML}</div>
      </div>
      <div class="rg__divider"></div>
      <div class="rg__grid">
        <div class="rg__cell"><span class="rg__key">DOMAIN</span><span class="rg__val">${rec.domain || category || '—'}</span></div>
        <div class="rg__cell"><span class="rg__key">PLATFORM</span><span class="rg__val">${rec.platform || '—'}</span></div>
        <div class="rg__cell"><span class="rg__key">TEAM</span><span class="rg__val">${rec.team || '—'}</span></div>
      </div>
      <div class="rg__divider"></div>
      <div class="rg__problems">
        <div class="rg__card rg__card--problem">
          <p class="rg__card-label rg__card-label--problem">⚡ THE PROBLEM</p>
          <p class="rg__card-body">${rec.problem}</p>
        </div>
        <div class="rg__card rg__card--shipped">
          <p class="rg__card-label rg__card-label--shipped">✓ WHAT I SHIPPED</p>
          <p class="rg__card-body">${rec.shipped}</p>
        </div>
      </div>
      <div class="rg__divider"></div>
      <div class="rg__owned-row">
        <span class="rg__key">WHAT I OWNED</span>
        <p class="rg__owned">${ownedHTML}</p>
      </div>
    </div>`;
}

function QuickReadSection({ detail }) {
  const rec = detail.recruiter;
  if (!rec || !rec.bullets) return '';
  function parseStat(val) {
    const m = val.match(/^([0-9.]+)([^0-9.]*)$/);
    return m ? { num: m[1], suffix: m[2] } : { num: val, suffix: '' };
  }
  const bulletsHTML = rec.bullets.map((b, i) => `
    <li class="rq__item">
      <span class="rq__num">0${i + 1}</span>
      <span class="rq__text">${b}</span>
    </li>`).join('');
  const statsHTML = detail.stats.map(s => {
    const { num, suffix } = parseStat(s.value);
    return `
      <div class="rq__stat">
        <div class="rq__stat-value">${num}<span class="rq__stat-suffix">${suffix}</span></div>
        <div class="rq__stat-label">${s.label}</div>
      </div>`;
  }).join('');
  return `
    <div class="rq" id="pp-quick-read">
      <p class="rq__label">★ QUICK READ</p>
      <h2 class="rq__heading">The 30-second version</h2>
      <ol class="rq__bullets">${bulletsHTML}</ol>
      <div class="rq__stats">${statsHTML}</div>
      <p class="rq__cta">↵ SWITCH TO <button class="rq__switch-btn" data-switch-to="lead">DESIGN LEAD VIEW</button> FOR THE FULL PROCESS, TRADE-OFFS, AND REFLECTION.</p>
    </div>`;
}

function ProjectPageContent({ id, title, category, year, tags, color, description, detail }) {
  const tagHTML = tags.map(t => Tag({ label: t })).join("");

  function parseStat(val) {
    const m = val.match(/^([0-9.]+)([^0-9.]*)$/);
    return m ? { num: m[1], suffix: m[2] } : { num: val, suffix: '' };
  }

  const statsHTML = detail.stats.map(s => {
    const { num, suffix } = parseStat(s.value);
    return `
      <div class="pp__stat">
        <div class="pp__stat-value">${num}<span class="pp__stat-suffix">${suffix}</span></div>
        <div class="pp__stat-label">${s.label}</div>
      </div>`;
  }).join("");

  const [first, ...rest] = detail.frames;

  const allProjects = portfolio.projects;
  const idx = allProjects.findIndex(p => p.id === id);
  const nextProjects = [
    allProjects[(idx + 1) % allProjects.length],
    allProjects[(idx + 2) % allProjects.length],
  ].filter(p => p.id !== id).slice(0, 2);

  const nextHTML = nextProjects.map(p => `
    <a class="pp__next-card" href="project.html?id=${p.id}">
      <span class="pp__next-eye">✶ Up next</span>
      <h4 class="pp__next-title">${p.title}</h4>
      <p class="pp__next-desc">${p.description}</p>
    </a>`).join("");

  const coverHTML = `
    <figure class="pp__cover" style="--cover-bg:${color || '#f0ede8'}">
      <div class="pp__cover-inner">
        ${DesignFrame({ ...first, color })}
      </div>
    </figure>`;

  const glanceHTML = `
    <div class="pp__glance">
      <p class="pp__glance-label">✶ At a glance</p>
      <div class="pp__glance-grid">
        <div class="pp__glance-cell">
          <span class="pp__glance-key">Role</span>
          <span class="pp__glance-val">${detail.role}</span>
        </div>
        <div class="pp__glance-cell">
          <span class="pp__glance-key">Year</span>
          <span class="pp__glance-val">${year}</span>
        </div>
        <div class="pp__glance-cell">
          <span class="pp__glance-key">Category</span>
          <span class="pp__glance-val">${category}</span>
        </div>
      </div>
      <div class="pp__glance-rule"></div>
      <div class="pp__glance-grid">
        ${tags.map(t => `
          <div class="pp__glance-cell">
            <span class="pp__glance-key">Tag</span>
            <span class="pp__glance-val">${t}</span>
          </div>`).join("")}
      </div>
    </div>`;

  return `
    <div class="pp">
      <div class="pp__topbar">
        <a class="pp__back" href="work.html">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to work
        </a>
        <span class="pp__crumb">${category} · ${year}</span>
      </div>

      <hr class="pp__rule">

      <div class="pp__layout">

        <!-- Sticky sidebar column -->
        <div class="pp__sidenav-col">

          <!-- Recruiter nav -->
          <nav class="pp__sidenav" data-sidenav="recruiter" aria-label="Recruiter navigation">
            <a class="pp__sidenav-back" href="work.html">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Back
            </a>
            <div class="pp__sidenav-links pp__sidenav-links--recruiter">
              <span class="pp__sidenav-indicator" aria-hidden="true"></span>
              <a class="pp__sidenav-rlink is-active" href="#pp-overview">At a glance</a>
              <a class="pp__sidenav-rlink" href="#pp-quick-read">Quick read</a>
            </div>
          </nav>

          <!-- Lead nav -->
          <nav class="pp__sidenav is-active" data-sidenav="lead" aria-label="Section navigation">
            <a class="pp__sidenav-back" href="work.html">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              All work
            </a>
            <div class="pp__sidenav-links">
              <span class="pp__sidenav-indicator" aria-hidden="true"></span>
              <a class="pp__sidenav-link" href="#pp-overview">Overview</a>
              <a class="pp__sidenav-link pp__sidenav-link--lead" href="#pp-challenge">The challenge</a>
              <a class="pp__sidenav-link" href="#pp-impact">Impact</a>
              <a class="pp__sidenav-link pp__sidenav-link--lead" href="#pp-outcome">The outcome</a>
              ${rest.length ? `<a class="pp__sidenav-link pp__sidenav-link--lead" href="#pp-frames">Screens</a>` : ""}
            </div>
          </nav>

        </div>

        <!-- Main content -->
        <div class="pp__content">

          <div id="pp-overview">
            <p class="pp__eyebrow">${category} · ${year}</p>
            <h1 class="pp__title">${title}</h1>
            <p class="pp__subtitle">${description || detail.challenge.split('.')[0] + '.'}</p>

            <div class="pp__view-tabs" role="tablist">
              <button class="pp__view-tab" data-view="recruiter" role="tab" aria-selected="false">
                RECRUITER VIEW <span class="pp__view-tab__dot">·</span> <span class="pp__view-tab__sub">30-SECOND SKIM</span>
              </button>
              <button class="pp__view-tab is-active" data-view="lead" role="tab" aria-selected="true">
                DESIGN LEAD VIEW <span class="pp__view-tab__dot">·</span> <span class="pp__view-tab__sub">FULL DEEP-DIVE</span>
              </button>
            </div>
          </div>

          <!-- Recruiter panel: at a glance card + quick read -->
          <div class="pp__view-panel" data-panel="recruiter">
            ${RecruiterGlanceCard({ detail, year, category })}
            ${QuickReadSection({ detail })}
          </div>

          <!-- Lead panel: full deep-dive -->
          <div class="pp__view-panel is-active" data-panel="lead">
            ${coverHTML}
            ${glanceHTML}

            <section class="pp__section" id="pp-challenge">
              <p class="pp__section-eye">✶ The challenge</p>
              <h2 class="pp__section-heading">The opportunity</h2>
              <p class="pp__section-body">${detail.challenge}</p>
            </section>

            <div class="pp__stats" id="pp-impact">${statsHTML}</div>

            <section class="pp__section" id="pp-outcome">
              <p class="pp__section-eye">✶ The outcome</p>
              <h2 class="pp__section-heading">What shipped</h2>
              <p class="pp__section-body">${detail.outcome}</p>
            </section>

            ${rest.length ? `<div class="pp__frames" id="pp-frames">${rest.map(f => `
              <figure class="pp__frame-fig" style="background:${color || '#f0ede8'}">
                ${DesignFrame({ ...f, color })}
                <figcaption class="pp__frame-cap">${f.label}</figcaption>
              </figure>`).join("")}</div>` : ""}

            <div class="pp__tagrow">${tagHTML}</div>

            ${nextHTML ? `<div class="pp__next-wrap">
              <p class="pp__next-label">✶ Read next</p>
              <div class="pp__next-grid">${nextHTML}</div>
            </div>` : ""}
          </div>

        </div>
      </div>
    </div>`;
}

function ProjectDetailPanel({ id, title, category, year, tags, color, detail }) {
  const tagHTML = tags.map(t => Tag({ label: t })).join("");
  const statsHTML = detail.stats.map(s => StatBlock(s)).join("");

  // Layout frames: wide frame full-width, then remaining side by side
  const [first, ...rest] = detail.frames;
  const firstFrame = DesignFrame({ ...first, color });
  const restFrames = rest.map(f => DesignFrame({ ...f, color })).join("");

  return `
    <div class="detail__inner">
      <div class="detail__bar">
        <button class="detail__close" id="detail-close" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Back to work
        </button>
        <span class="detail__breadcrumb">${id} / ${title}</span>
      </div>

      <div class="detail__hero">
        <p class="detail__meta">${category} · ${year} · ${detail.role}</p>
        <h1 class="detail__title">${title}</h1>
      </div>

      <div class="detail__stats">
        ${statsHTML}
      </div>

      <div class="detail__frames">
        <div class="frames__primary">${firstFrame}</div>
        ${restFrames ? `<div class="frames__secondary">${restFrames}</div>` : ""}
      </div>

      <div class="detail__prose">
        <div class="detail__section">
          <p class="detail__section-label">Challenge</p>
          <p class="detail__section-text">${detail.challenge}</p>
        </div>
        <div class="detail__section">
          <p class="detail__section-label">Outcome</p>
          <p class="detail__section-text">${detail.outcome}</p>
        </div>
      </div>

      <div class="detail__tags">
        ${tagHTML}
      </div>
    </div>`;
}

/* ─── Story layout ──────────────────────────────────────────────────────────
   A linear, image-led case study: single column, no side rail, no view tabs.
   Images carry the page, prose sits between them. Projects opt in with
   `detail.story`; everything else keeps the two-view Case File layout.

   Image blocks render the file at `src` and fall back to a labelled slot when
   the file isn't there yet, so dropping the image into assets/ is the only step
   needed to fill the page. Draft projects (status: 'coming-soon') also show
   authoring hints for empty prose; shipped projects never do. */

function StoryFigure(img, layout) {
  const { src, alt = '', caption = '', ratio = '16 / 10' } = img || {};
  if (!src) return '';
  return `
    <figure class="st-fig st-fig--${layout || 'full'}" style="--st-ratio:${ratio}">
      <img class="st-fig__img" src="${src}" alt="${alt}" loading="lazy"
           onerror="this.closest('.st-fig').classList.add('is-empty')">
      <div class="st-slot" aria-hidden="true">
        <span class="st-slot__path">${src}</span>
        ${alt ? `<span class="st-slot__hint">${alt}</span>` : ''}
      </div>
      ${caption ? `<figcaption class="st-fig__cap">${caption}</figcaption>` : ''}
    </figure>`;
}

function StoryBlock(block, isDraft) {
  const hint = text => (isDraft && text ? `<p class="st-hint">${text}</p>` : '');
  switch (block.type) {
    case 'prose':
      return block.text
        ? `<p class="st-prose">${block.text}</p>`
        : hint(block.hint);

    case 'callout':
      return block.text || (isDraft && block.hint)
        ? `<div class="st-callout">
             <span class="st-callout__mark" aria-hidden="true">${block.emoji || '✶'}</span>
             ${block.text ? `<p>${block.text}</p>` : hint(block.hint)}
           </div>`
        : '';

    case 'bullets': {
      const items = block.items || [];
      if (!items.length) return hint(block.hint);
      return `<ul class="st-bullets">${items.map(i =>
        `<li><span class="st-bullets__mark" aria-hidden="true">${block.emoji || '—'}</span><span>${i}</span></li>`
      ).join('')}</ul>`;
    }

    case 'citations': {
      const items = block.items || [];
      if (!items.length) return hint(block.hint);
      return `<ul class="st-cites">${items.map(c =>
        `<li>${c.href
          ? `<a href="${c.href}" target="_blank" rel="noopener">${c.label} ↗</a>`
          : c.label}</li>`
      ).join('')}</ul>`;
    }

    case 'image':
      return StoryFigure(block, block.full ? 'bleed' : 'full') || hint(block.hint);

    case 'stack': {
      const imgs = (block.images || []).map(i => StoryFigure(i, 'full')).join('');
      return imgs ? `<div class="st-stack">${imgs}</div>` : hint(block.hint);
    }

    case 'grid': {
      const imgs = (block.images || []).map(i => StoryFigure(i, 'grid')).join('');
      return imgs ? `<div class="st-grid">${imgs}</div>` : hint(block.hint);
    }

    default:
      return '';
  }
}

function StorySection(section, isDraft) {
  const blocks = (section.blocks || []).map(b => StoryBlock(b, isDraft)).join('');
  const subs = (section.subs || []).map(sub => `
    <div class="st-sub">
      <h3 class="st-sub__h">${sub.title}</h3>
      ${(sub.blocks || []).map(b => StoryBlock(b, isDraft)).join('')}
    </div>`).join('');
  return `
    <section class="st-section" id="st-${section.id}">
      <h2 class="st-section__h">${section.title}</h2>
      ${blocks}
      ${subs}
    </section>`;
}

function ProjectStoryPage(project) {
  const { id, title, category, year, description, detail, status } = project;
  const story = detail.story;
  const isDraft = status === 'coming-soon';
  const hero = story.hero || {};

  const allProjects = portfolio.projects;
  const idx = allProjects.findIndex(p => p.id === id);
  const pad = n => String(n).padStart(2, '0');

  const nextProjects = [
    allProjects[(idx + 1) % allProjects.length],
    allProjects[(idx + 2) % allProjects.length],
  ].filter(p => p && p.id !== id).slice(0, 2);
  const nextHTML = nextProjects.map(p => `
    <a class="cs-next__card" href="project.html?id=${p.id}">
      <span class="cs-next__kicker">${p.category} · ${p.year}</span>
      <span class="cs-next__title">${p.title} <span class="cs-next__arrow">→</span></span>
      <p class="cs-next__desc">${p.description}</p>
    </a>`).join('');

  return `
    <div class="cs-page st-page">

      <div class="cs-topbar">
        <a class="cs-topbar__back" href="work.html">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Back to work
        </a>
        <span class="cs-topbar__crumb">${pad(idx + 1)} / ${pad(allProjects.length)}</span>
      </div>

      <header class="st-hero">
        <p class="st-hero__eyebrow">${hero.eyebrow || `${category} · ${year}`}</p>
        <h1 class="st-hero__title">${hero.title || title}</h1>
        ${hero.subtitle ? `<p class="st-hero__sub">${hero.subtitle}</p>` : ''}
        ${StoryFigure(hero.image, 'hero')}
      </header>

      <div class="st-body">
        ${(story.sections || []).map(s => StorySection(s, isDraft)).join('')}

        <section class="cs-end">
          <p class="cs-eyebrow">Thanks for reading</p>
          <h2 class="cs-end__heading">That's the case study, front to back.</h2>
          <p class="cs-end__body">Want to dig into the process, edge cases, or trade-offs that didn't fit on the page? Happy to walk through any of it.</p>
          <div class="cs-end__actions">
            <a class="cs-end__btn-primary" href="mailto:${portfolio.email || ''}">Talk about this project →</a>
            <button class="cs-end__btn-secondary" id="cs-share-btn">Copy link</button>
          </div>
        </section>

        ${nextHTML ? `<nav class="cs-next">
          <p class="cs-next__label">Read next</p>
          <div class="cs-next__grid">${nextHTML}</div>
        </nav>` : ''}
      </div>
    </div>`;
}

/* ─── Case File blocks ──────────────────────────────────────────────────────
   Rendered only for projects that carry a `detail.caseFile`. Both views read
   from the same object, so a matter's one-liner and its long-form context can
   never drift apart. */

// The 30-second view: one line per matter, state visible, no prose.
function CauseListTable(cf) {
  const matters = (cf && cf.matters) || [];
  if (!matters.length) return '';
  const cl = cf.causeList || {};
  const rows = matters.map(m => `
    <a class="cl__row" href="#cs-${m.slug}" data-switch-to="lead">
      <span class="cl__no">${m.no}</span>
      <span class="cl__matter">${m.title}</span>
      <span class="cl__line">${m.oneLine}</span>
      <span class="cl__state">${m.state}</span>
    </a>`).join('');
  return `
    <section class="cl" id="cs-cause-list">
      <p class="cl__label">${cl.label || 'Cause list'}</p>
      <h2 class="cl__heading">${cl.heading || 'Three matters, one line each'}</h2>
      <div class="cl__table" role="table">
        <div class="cl__head" role="row">
          <span class="cl__no">No.</span>
          <span class="cl__matter">Matter</span>
          <span class="cl__line">What I did</span>
          <span class="cl__state">State</span>
        </div>
        ${rows}
      </div>
      ${cl.note ? `<p class="cl__note">${cl.note}</p>` : ''}
      ${MatterExhibits(cf.heroExhibits, { layout: 'strip' })}
    </section>`;
}

function CaseFileCitation(c) {
  if (!c) return '';
  return `<p class="cf-cite">Source · <a href="${c.href}" target="_blank" rel="noopener">${c.label} ↗</a></p>`;
}

function DecisionBlock(d) {
  const options = (d.options || []).map(o => `<li>${o}</li>`).join('');
  return `
    <div class="cf-dec">
      <p class="cf-dec__label">Decision</p>
      <dl class="cf-dec__rows">
        <div class="cf-dec__row"><dt>Constraint</dt><dd>${d.constraint}</dd></div>
        ${options ? `<div class="cf-dec__row"><dt>Options</dt><dd><ul class="cf-dec__options">${options}</ul></dd></div>` : ''}
        <div class="cf-dec__row"><dt>What I chose</dt><dd>${d.chose}</dd></div>
        <div class="cf-dec__row"><dt>Why</dt><dd>${d.why}</dd></div>
        <div class="cf-dec__row cf-dec__row--cost"><dt>What it cost</dt><dd>${d.cost}</dd></div>
      </dl>
      ${d.lever ? `<p class="cf-dec__lever">${d.lever}</p>` : ''}
    </div>`;
}

function RejectedList(rejected) {
  if (!rejected || !rejected.length) return '';
  const items = rejected.map(r => `
    <li class="cf-rej__item">
      <p class="cf-rej__dir">${r.direction}</p>
      <p class="cf-rej__why">${r.whyNot}</p>
    </li>`).join('');
  return `
    <div class="cf-rej">
      <p class="cf-block-label">Not taken</p>
      <ul class="cf-rej__list">${items}</ul>
    </div>`;
}

// Severity carries a text label as well as colour — never colour alone.
function AuditFindings(findings) {
  if (!findings || !findings.length) return '';
  const rows = findings.map(f => `
    <div class="cf-audit__row">
      <span class="cf-audit__n">${f.n}</span>
      <div class="cf-audit__body">
        <p class="cf-audit__finding">${f.finding}</p>
        <p class="cf-audit__why">${f.why}</p>
      </div>
      <span class="cf-sev cf-sev--${f.severity.toLowerCase()}">${f.severity}</span>
    </div>`).join('');
  return `
    <div class="cf-audit">
      <div class="cf-audit__head">
        <span class="cf-audit__n">#</span>
        <span class="cf-audit__body">Finding · why it matters</span>
        <span class="cf-sev-head">Severity</span>
      </div>
      ${rows}
    </div>`;
}

// Ledger columns are data-driven: a numbered matter list and an unnumbered
// surface list are the same component with different headers.
function RoleLedger(ledger) {
  if (!ledger || !ledger.rows) return '';
  const numbered = ledger.rows.some(r => r.no);
  const cols = ledger.columns || (numbered ? ['No.', 'Matter', 'Mode', 'Scope'] : ['Surface', 'Mode', 'Scope']);
  const rows = ledger.rows.map(r => `
    <div class="cf-ledger__row">
      ${numbered ? `<span class="cf-ledger__no">${r.no}</span>` : ''}
      <span class="cf-ledger__matter">${r.matter}</span>
      <span class="cf-mode cf-mode--${r.mode.toLowerCase()}">${r.mode}</span>
      <span class="cf-ledger__scope">${r.scope}</span>
    </div>`).join('');
  const key = (ledger.modeKey || []).map(([mode, meaning]) =>
    `<span class="cf-ledger__key-item"><strong>${mode}</strong> ${meaning}</span>`).join('');
  return `
    <div class="cf-ledger${numbered ? '' : ' cf-ledger--3col'}">
      <div class="cf-ledger__head">
        ${numbered ? `<span class="cf-ledger__no">${cols[0]}</span>` : ''}
        <span class="cf-ledger__matter">${cols[numbered ? 1 : 0]}</span>
        <span class="cf-ledger__mode-head">${cols[numbered ? 2 : 1]}</span>
        <span class="cf-ledger__scope">${cols[numbered ? 3 : 2]}</span>
      </div>
      ${rows}
      ${key ? `<p class="cf-ledger__key">${key}</p>` : ''}
    </div>`;
}

// The experiment surfaces — a rig, not a feature set
function SurfaceTable(block) {
  const items = (block && block.items) || [];
  if (!items.length) return '';
  const rows = items.map(s => `
    <div class="cf-surf__row">
      <span class="cf-surf__name">${s.name}${s.fullScreen ? ` <span class="cf-surf__fs">full screen</span>` : ''}</span>
      <span class="cf-surf__tests">${s.tests}</span>
      <span class="cf-surf__route">${s.route}</span>
    </div>`).join('');
  return `
    <div class="cf-surf">
      ${block.label ? `<p class="cf-block-label">${block.label}</p>` : ''}
      <div class="cf-surf__head">
        <span class="cf-surf__name">Experiment</span>
        <span class="cf-surf__tests">What it tests</span>
        <span class="cf-surf__route">Route</span>
      </div>
      ${rows}
    </div>`;
}

/* Contrast pairs. Headroom is recomputed here from light − floor rather than
   read from the content file, so the page cannot drift from its own numbers —
   the same instinct as the Foundations page this section is about. */
function ContrastTable(block) {
  const pairs = (block && block.pairs) || [];
  if (!pairs.length) return '';
  const RISK_BELOW = 0.25;
  const fmt = n => (Math.round(n * 100) / 100).toFixed(2);
  const rows = pairs.map(p => {
    const headroom = p.light - p.floor;
    const atRisk = headroom < RISK_BELOW;
    return `
      <div class="cf-cp__row${atRisk ? ' cf-cp__row--risk' : ''}">
        <span class="cf-cp__pair">${p.pair}</span>
        <span class="cf-cp__tokens">${p.tokens}</span>
        <span class="cf-cp__num" data-k="light">${fmt(p.light)}</span>
        <span class="cf-cp__num" data-k="dark">${p.dark != null ? fmt(p.dark) : '—'}</span>
        <span class="cf-cp__num cf-cp__floor" data-k="floor">${fmt(p.floor)}</span>
        <span class="cf-cp__num cf-cp__headroom${atRisk ? ' is-risk' : ''}" data-k="headroom">${headroom >= 0 ? '+' : ''}${fmt(headroom)}${atRisk ? '<span class="cf-cp__flag">at floor</span>' : ''}</span>
      </div>
      ${atRisk && p.risk ? `<p class="cf-cp__risknote">${p.risk}</p>` : ''}`;
  }).join('');
  return `
    <div class="cf-cp">
      ${block.label ? `<p class="cf-block-label">${block.label}</p>` : ''}
      <div class="cf-cp__head">
        <span class="cf-cp__pair">Pair</span>
        <span class="cf-cp__tokens">Tokens</span>
        <span class="cf-cp__num">Light</span>
        <span class="cf-cp__num">Dark</span>
        <span class="cf-cp__num">Floor</span>
        <span class="cf-cp__num">Headroom</span>
      </div>
      ${rows}
      ${block.note ? `<p class="cf-cp__note">${block.note}</p>` : ''}
    </div>`;
}

/* Generic figures table — for arithmetic that has to be checkable on the page.
   `mono` marks numeric columns, `highlight` marks the rows carrying the finding. */
function DataTable(block) {
  if (!block || !block.rows) return '';
  const mono = new Set(block.mono || []);
  const hi = new Set(block.highlight || []);
  const cells = (row, tag) => row.map((c, i) =>
    `<${tag} class="cf-dt__cell${mono.has(i) ? ' cf-dt__cell--num' : ''}">${c}</${tag}>`).join('');
  return `
    <div class="cf-dt">
      ${block.label ? `<p class="cf-block-label">${block.label}</p>` : ''}
      <div class="cf-dt__scroll">
        <table class="cf-dt__table">
          <thead><tr>${cells(block.columns, 'th')}</tr></thead>
          <tbody>${block.rows.map((r, i) =>
            `<tr class="${hi.has(i) ? 'is-highlight' : ''}">${cells(r, 'td')}</tr>`).join('')}</tbody>
        </table>
      </div>
      ${block.formula ? `<p class="cf-dt__formula">${block.formula}</p>` : ''}
      ${block.note ? `<p class="cf-dt__note">${block.note}</p>` : ''}
    </div>`;
}

/* The band strip — the HPC signature graphic. A 0-100 axis where the bottom
   third can never be reached, the two upper band boundaries marked, and one
   judgment flip drawn to scale against the band it sits in. Static SVG,
   theme-aware through currentColor. */
function BandStrip(cfg) {
  const c = cfg || {};
  const floor = c.floor != null ? c.floor : 33;
  const bands = c.bands || { proficient: 70, advanced: 85 };
  const flip = c.flip != null ? c.flip : 8.5;   // one competency flip, n = 4
  const W = 760, H = 250, L = 52, R = 30;
  const x = v => L + (v / 100) * (W - L - R);
  const top = 108, h = 52, bot = top + h;
  const bandW = bands.advanced - bands.proficient - 0.1;
  const flipPct = Math.round((flip / bandW) * 100);
  const ticks = [0, floor, bands.proficient, bands.advanced, 100];
  return `
    <figure class="bs">
      <svg class="bs__svg" viewBox="0 0 ${W} ${H}" role="img"
           aria-label="A 0 to 100 scale on which the lowest achievable score is ${floor}, so the bottom ${floor} points can never be used. Band boundaries sit at ${bands.proficient} and ${bands.advanced}. One competency judgment in a four-competency domain moves the score ${flip} points, which is ${flipPct} per cent of the ${bandW.toFixed(1)} point Proficient band.">
        <defs>
          <pattern id="bs-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" stroke-width="1.1" opacity="0.3"/>
          </pattern>
        </defs>

        <g class="bs__mono" fill="currentColor">
          <line x1="${x(bands.proficient)}" y1="${top - 44}" x2="${x(bands.proficient)}" y2="${top - 12}" stroke="currentColor" stroke-opacity="0.45"/>
          <line x1="${x(bands.proficient + flip)}" y1="${top - 44}" x2="${x(bands.proficient + flip)}" y2="${top - 12}" stroke="currentColor" stroke-opacity="0.45"/>
          <line x1="${x(bands.proficient)}" y1="${top - 28}" x2="${x(bands.proficient + flip)}" y2="${top - 28}" stroke="currentColor" stroke-width="1.4"/>
          <text class="bs__fliplabel" x="${x(100)}" y="${top - 52}" font-size="11" text-anchor="end">one judgment flip = ${flip} pts · ${flipPct}% of the Proficient band</text>
        </g>

        <rect x="${x(0)}" y="${top}" width="${x(floor) - x(0)}" height="${h}" fill="url(#bs-hatch)" stroke="currentColor" stroke-opacity="0.35"/>
        <rect x="${x(floor)}" y="${top}" width="${x(bands.proficient) - x(floor)}" height="${h}" fill="currentColor" opacity="0.10"/>
        <rect x="${x(bands.proficient)}" y="${top}" width="${x(bands.advanced) - x(bands.proficient)}" height="${h}" fill="currentColor" opacity="0.20"/>
        <rect x="${x(bands.advanced)}" y="${top}" width="${x(100) - x(bands.advanced)}" height="${h}" fill="currentColor" opacity="0.32"/>
        <rect x="${x(0)}" y="${top}" width="${x(100) - x(0)}" height="${h}" fill="none" stroke="currentColor" stroke-opacity="0.45"/>
        ${[floor, bands.proficient, bands.advanced].map(v =>
          `<line x1="${x(v)}" y1="${top}" x2="${x(v)}" y2="${bot}" stroke="currentColor" stroke-opacity="0.55"/>`).join('')}

        <g class="bs__mono" fill="currentColor" text-anchor="middle">
          <text x="${(x(floor) + x(bands.proficient)) / 2}" y="${top + 31}" font-size="12">Emerging</text>
          <text x="${(x(bands.proficient) + x(bands.advanced)) / 2}" y="${top + 31}" font-size="10">Proficient</text>
          <text x="${(x(bands.advanced) + x(100)) / 2}" y="${top + 31}" font-size="11">Advanced</text>
        </g>

        <g class="bs__mono" fill="currentColor" text-anchor="middle" opacity="0.75">
          ${ticks.map(v => `
            <line x1="${x(v)}" y1="${bot}" x2="${x(v)}" y2="${bot + 7}" stroke="currentColor" stroke-opacity="0.6"/>
            <text x="${x(v)}" y="${bot + 22}" font-size="11">${v}</text>`).join('')}
        </g>

        <g class="bs__mono" fill="currentColor">
          <line x1="${x(0)}" y1="${bot + 40}" x2="${x(floor)}" y2="${bot + 40}" stroke="currentColor" stroke-width="1.4"/>
          <line x1="${x(0)}" y1="${bot + 35}" x2="${x(0)}" y2="${bot + 45}" stroke="currentColor" stroke-width="1.4"/>
          <line x1="${x(floor)}" y1="${bot + 35}" x2="${x(floor)}" y2="${bot + 45}" stroke="currentColor" stroke-width="1.4"/>
          <text class="bs__fliplabel" x="${x(0)}" y="${bot + 62}" font-size="11">${floor} points that can never be used — “Not Yet” on every competency still scores ${floor}%</text>
        </g>
      </svg>
      ${c.caption ? `<figcaption class="bs__cap">${c.caption}</figcaption>` : ''}
    </figure>`;
}

// The generation → hosting → measurement loop, as a diagram rather than prose
function LoopDiagram(loop) {
  if (!loop) return '';
  const inputs = (loop.inputs || []).map(i =>
    `<li class="cf-loop__input"><span class="cf-loop__mono">${i.label}</span>${i.note ? `<span class="cf-loop__note">${i.note}</span>` : ''}</li>`).join('');
  const stages = (loop.stages || []).map(s => `
    <div class="cf-loop__stage">
      <span class="cf-loop__mono">${s.label}</span>
      ${s.note ? `<span class="cf-loop__note">${s.note}</span>` : ''}
    </div>`).join('<span class="cf-loop__arrow" aria-hidden="true">↓</span>');
  const branches = (loop.branches || []).map(b => `
    <div class="cf-loop__branch${b.fail ? ' cf-loop__branch--fail' : ''}">
      <span class="cf-loop__cond">${b.cond}</span>
      <span class="cf-loop__then">${b.then}</span>
    </div>`).join('');
  return `
    <div class="cf-loop">
      ${loop.label ? `<p class="cf-block-label">${loop.label}</p>` : ''}
      ${inputs ? `<ul class="cf-loop__inputs">${inputs}</ul>` : ''}
      <div class="cf-loop__flow">${stages}</div>
      ${branches ? `<div class="cf-loop__branches">${branches}</div>` : ''}
      ${loop.gap ? `<p class="cf-loop__gap"><span class="cf-loop__gap-label">What it does not catch</span>${loop.gap}</p>` : ''}
    </div>`;
}

/* Exhibits. Real files with a labelled fallback slot, so the case study is
   complete before the screenshots land. Clearance is rendered, not implied. */
function MatterExhibits(exhibits, opts) {
  const items = exhibits || [];
  if (!items.length) return '';
  const layout = (opts && opts.layout) || 'stack';
  const figs = items.map(x => {
    const fig = StoryFigure({
      src: x.src,
      alt: x.alt,
      caption: `${x.id ? `Exhibit ${x.id} — ` : ''}${x.caption}`,
      ratio: x.ratio,
    }, layout === 'strip' ? 'grid' : 'full');
    const flag = x.clearance && x.clearance !== 'public'
      ? `<p class="cf-ex__clearance">${x.clearance}${x.redactionNote ? ` — ${x.redactionNote}` : ''}</p>`
      : '';
    // A portrait exhibit at full column width swallows the screen — cap it.
    const [rw, rh] = String(x.ratio || '1 / 1').split('/').map(n => parseFloat(n));
    const portrait = rw && rh && rw / rh < 0.9;
    return `<div class="cf-ex__item${portrait ? ' cf-ex__item--portrait' : ''}">${fig}${flag}</div>`;
  }).join('');
  return `<div class="cf-ex cf-ex--${layout}">${figs}</div>`;
}

function LeverMap(levers) {
  if (!levers || !levers.rows) return '';
  const rows = levers.rows.map(l => {
    const flag = l.loadBearing ? 'Load-bearing'
      : l.outOfScope ? 'Out of software scope' : '';
    return `
      <div class="cf-lever${l.loadBearing ? ' cf-lever--load' : ''}${l.outOfScope ? ' cf-lever--oos' : ''}">
        <div class="cf-lever__head">
          <span class="cf-lever__n">${l.n}</span>
          <h3 class="cf-lever__name">${l.name}</h3>
          ${flag ? `<span class="cf-lever__flag">${flag}</span>` : ''}
        </div>
        <div class="cf-lever__cols">
          <div class="cf-lever__col">
            <p class="cf-lever__key">The friction it names</p>
            <p class="cf-lever__text">${l.friction}</p>
          </div>
          <div class="cf-lever__col">
            <p class="cf-lever__key">Design response</p>
            <p class="cf-lever__text">${l.response}</p>
          </div>
        </div>
      </div>`;
  }).join('');
  return `<div class="cf-levers">${rows}</div>`;
}

function CaseFileMatter(m, { sectionOpen, figureHTML, frames }) {
  const context = (m.context || []).map(p => `<p class="cs-section__body">${p}</p>`).join('');
  const goals = (m.goals || []).map(g => `<li>${g}</li>`).join('');
  const decisions = (m.decisions || []).map(d => DecisionBlock(d)).join('');
  const figures = (m.figureIdx || []).map(i => figureHTML(frames[i])).join('');
  return `
    ${sectionOpen(`Matter ${m.no} — ${m.title}`, `cs-${m.slug}`)}
      <p class="cf-matter__meta">
        <span class="cf-matter__state">${m.state}</span>
        <span class="cf-matter__mode">${m.mode}</span>
      </p>
      ${context}
      ${goals ? `<div class="cf-goals">
        <p class="cf-block-label">Stated goals</p>
        <ul class="cf-goals__list">${goals}</ul>
      </div>` : ''}
      ${m.graphic ? BandStrip(m.graphic) : ''}
      ${m.surfaces ? SurfaceTable(m.surfaces) : ''}
      ${MatterExhibits(m.exhibits)}
      ${figures}
      ${(m.tables || []).map(t => DataTable(t)).join('')}
      ${m.contrast ? ContrastTable(m.contrast) : ''}
      ${decisions}
      ${m.loop ? LoopDiagram(m.loop) : ''}
      ${m.findingsIntro ? `<p class="cs-section__body">${m.findingsIntro}</p>` : ''}
      ${AuditFindings(m.findings)}
      ${m.worked ? `<p class="cs-section__body cf-note">${m.worked}</p>` : ''}
      ${m.openIssue ? `<div class="cf-open">
        <p class="cf-block-label">${m.openIssue.label}</p>
        <p class="cf-open__body">${m.openIssue.body}</p>
      </div>` : ''}
      ${RejectedList(m.rejected)}
      ${m.selfNote ? `<p class="cf-selfnote">${m.selfNote}</p>` : ''}
    </section>`;
}

// Returns { nav, html } so the left navigation is generated from the content
// itself rather than maintained beside it.
function CaseFileBody(cf, helpers) {
  const { sectionOpen } = helpers;
  const nav = [['#cs-overview', 'Overview']];
  let html = '';

  if (cf.premise) {
    nav.push(['#cs-premise', cf.premise.heading]);
    html += `${sectionOpen(cf.premise.heading, 'cs-premise')}
      ${cf.premise.body.map(p => `<p class="cs-section__body">${p}</p>`).join('')}
      ${MatterExhibits(cf.premise.exhibits)}
      ${CaseFileCitation(cf.premise.citation)}
    </section>`;
  }

  if (cf.ledger) {
    nav.push(['#cs-ledger', cf.ledger.heading]);
    html += `${sectionOpen(cf.ledger.heading, 'cs-ledger')}
      ${(cf.ledger.body || []).map(p => `<p class="cs-section__body">${p}</p>`).join('')}
      ${RoleLedger(cf.ledger)}
    </section>`;
  }

  (cf.matters || []).forEach(m => {
    nav.push([`#cs-${m.slug}`, `${m.no} · ${m.title}`, 'sub']);
    html += CaseFileMatter(m, helpers);
  });

  if (cf.loopSection) {
    nav.push(['#cs-loop', cf.loopSection.heading]);
    html += `${sectionOpen(cf.loopSection.heading, 'cs-loop')}
      ${(cf.loopSection.body || []).map(p => `<p class="cs-section__body">${p}</p>`).join('')}
      ${LoopDiagram(cf.loopSection.loop)}
    </section>`;
  }

  if (cf.levers) {
    nav.push(['#cs-levers', cf.levers.heading]);
    html += `${sectionOpen(cf.levers.heading, 'cs-levers')}
      <p class="cs-section__body">${cf.levers.intro}</p>
      ${LeverMap(cf.levers)}
      ${cf.levers.throughline ? `<p class="cs-section__body cf-throughline">${cf.levers.throughline}</p>` : ''}
      ${CaseFileCitation(cf.levers.citation)}
    </section>`;
  }

  // Audit table — findings in work the designer shipped themselves. Numbered
  // so the prose can point at a row.
  if (cf.findings) {
    nav.push(['#cs-findings', cf.findings.heading]);
    html += `${sectionOpen(cf.findings.heading, 'cs-findings')}
      ${cf.findings.note ? `<p class="cs-section__body cf-findings__note">${cf.findings.note}</p>` : ''}
      <div class="cf-findings">
        <table class="cf-findings__table">
          <thead><tr>${(cf.findings.columns || []).map(c => `<th>${c}</th>`).join('')}</tr></thead>
          <tbody>${cf.findings.rows.map(r => `
            <tr>
              <td class="cf-findings__n" data-k="#">${r[0]}</td>
              <td class="cf-findings__what" data-k="Finding">${r[1]}</td>
              <td class="cf-findings__why" data-k="Cost">${r[2]}</td>
            </tr>`).join('')}</tbody>
        </table>
      </div>
    </section>`;
  }

  // The counterweight to the audit. A case study that only lists defects in its
  // own work reads as performance rather than judgement.
  if (cf.worked) {
    nav.push(['#cs-worked', cf.worked.heading]);
    html += `${sectionOpen(cf.worked.heading, 'cs-worked')}
      <ul class="cf-worked">${cf.worked.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </section>`;
  }

  /* Personas. Hidden while they are still scaffolding rather than research:
     the section renders nothing until hidden is lifted, which is what keeps
     invented personas from reading as findings now that they carry no banner.
     check:content fails if placeholder personas are ever made visible. */
  if (cf.personas && !cf.personas.hidden) {
    nav.push(['#cs-personas', cf.personas.heading]);
    html += `${sectionOpen(cf.personas.heading, 'cs-personas')}
      <div class="cf-personas">${cf.personas.items.map(p => `
        <div class="cf-persona${p.source === 'placeholder' ? ' is-placeholder' : ''}">
          <p class="cf-persona__name">${p.name}</p>
          <p class="cf-persona__body">${p.body}</p>
        </div>`).join('')}</div>
    </section>`;
  }

  if (cf.differently) {
    nav.push(['#cs-differently', cf.differently.heading]);
    html += `${sectionOpen(cf.differently.heading, 'cs-differently')}
      <div class="cf-diff">${cf.differently.items.map(i => `
        <div class="cf-diff__item">
          <p class="cf-diff__title">${i.title}</p>
          <p class="cf-diff__body">${i.body}</p>
        </div>`).join('')}</div>
    </section>`;
  }

  if (cf.forward) {
    nav.push(['#cs-forward', cf.forward.heading]);
    html += `${sectionOpen(cf.forward.heading, 'cs-forward')}
      <ul class="cf-forward">${cf.forward.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </section>`;
  }

  return { nav, html };
}

function ProjectCaseStudyPage(project) {
  const { id, title, category, year, accentColor, description, detail } = project;
  const r = detail.recruiter || {};
  const pad = n => String(n).padStart(2, '0');

  // Position in the project list — "01 / 05" crumb + next-up cards
  const allProjects = portfolio.projects;
  const idx = allProjects.findIndex(p => p.id === id);
  const crumb = `${pad(idx + 1)} / ${pad(allProjects.length)}`;

  // Stats
  function parseStat(val) {
    const m = val.match(/^([0-9.]+)([^0-9.]*)$/);
    return m ? { num: m[1], suffix: m[2] } : { num: val, suffix: '' };
  }
  const statsHTML = (detail.stats || []).map(s => {
    const { num, suffix } = parseStat(s.value);
    return `<div class="cs-stat">
      <div class="cs-stat__num">${num}<span class="cs-stat__suffix">${suffix}</span></div>
      <div class="cs-stat__label">${s.label}</div>
    </div>`;
  }).join('');

  // Placeholder figures, numbered in page order
  const tint = accentColor || '#7a7066';
  let figCount = 0;
  function figureHTML(frame) {
    if (!frame) return '';
    figCount += 1;
    const h = frame.type === 'mobile' ? 460 : 380;
    return `
      <figure class="cs-fig">
        <div class="cs-fig__panel" style="height:${h}px;--fig-tint:${tint}"></div>
        <figcaption class="cs-fig__caption">Fig. ${pad(figCount)} — ${frame.label}</figcaption>
      </figure>`;
  }
  const [frameA, frameB] = detail.frames || [];

  // Meta grid
  const liveAtHTML = r.liveAt
    ? `<a class="cs-meta__link" href="${r.liveAt}" target="_blank" rel="noopener">${r.liveAt.replace(/^https?:\/\//, '')} ↗</a>`
    : '—';
  const metaHTML = [
    ['Role', r.role || detail.role || '—'],
    ['Timeline', r.timeline || year],
    ['Team', r.team || '—'],
    ['Domain', r.domain || category],
    ['Platform', r.platform || '—'],
    ['Live at', liveAtHTML],
  ].map(([key, val]) => `<div class="cs-meta__cell">
      <span class="cs-meta__key">${key}</span>
      <span class="cs-meta__val">${val}</span>
    </div>`).join('');

  const ownedHTML = (r.owned || []).map(o => `<span class="cs-chip">${o}</span>`).join('');

  // Highlights (first 3 bullets) + reflection (last 2)
  const bullets = r.bullets || [];
  const highlightsHTML = bullets.slice(0, 3).map(b =>
    `<li>${b.replace(/^([^.]+\.)/, '<strong>$1</strong>')}</li>`).join('');
  const reflectionHTML = bullets.slice(-2).map(b => {
    const dotIdx = b.indexOf('.');
    const bold = dotIdx > 0 ? b.slice(0, dotIdx + 1) : b;
    const rest = dotIdx > 0 ? b.slice(dotIdx + 1) : '';
    return `<p class="cs-reflection__item"><strong>${bold}</strong>${rest}</p>`;
  }).join('');

  // Next projects
  const nextProjects = [
    allProjects[(idx + 1) % allProjects.length],
    allProjects[(idx + 2) % allProjects.length],
  ].filter(p => p && p.id !== id).slice(0, 2);
  const nextHTML = nextProjects.map(p => `
    <a class="cs-next__card" href="project.html?id=${p.id}">
      <span class="cs-next__kicker">${p.category} · ${p.year}</span>
      <span class="cs-next__title">${p.title} <span class="cs-next__arrow">→</span></span>
      <p class="cs-next__desc">${p.description}</p>
    </a>`).join('');

  // Numbered section opener
  let secCount = 0;
  function sectionOpen(heading, id) {
    secCount += 1;
    return `<section class="cs-section" id="${id}">
      <p class="cs-kicker">${pad(secCount)}</p>
      <h2 class="cs-section__h2">${heading}</h2>`;
  }

  // The 30-second skim only exists when the project has recruiter bullets.
  const hasSkim = !!(r.bullets && r.bullets.length);

  const tabsHTML = hasSkim ? `
    <div class="pp__view-tabs" role="tablist">
      <button class="pp__view-tab" data-view="recruiter" role="tab" aria-selected="false">
        RECRUITER VIEW <span class="pp__view-tab__dot">·</span> <span class="pp__view-tab__sub">30-SECOND SKIM</span>
      </button>
      <button class="pp__view-tab is-active" data-view="lead" role="tab" aria-selected="true">
        DESIGN LEAD VIEW <span class="pp__view-tab__dot">·</span> <span class="pp__view-tab__sub">FULL DEEP-DIVE</span>
      </button>
    </div>` : '';

  // Case File projects generate their own sections and left nav from content.
  const cf = detail.caseFile;
  const caseFile = cf
    ? CaseFileBody(cf, { sectionOpen, figureHTML, frames: detail.frames || [] })
    : null;

  // Left nav — one list per view, only the active one is displayed
  const leadNavItems = caseFile ? caseFile.nav : [
    ['#cs-overview',  'Overview'],
    ['#cs-challenge', 'The challenge'],
    ['#cs-approach',  'The approach'],
    ['#cs-outcome',   'The outcome'],
  ];
  if (!caseFile && reflectionHTML) leadNavItems.push(['#cs-reflection', 'Reflection']);

  const sidenavHTML = `
    <div class="cs-sidenav-col">
      ${hasSkim ? `
      <nav class="pp__sidenav" data-sidenav="recruiter" aria-label="Skim navigation">
        <a class="pp__sidenav-back" href="work.html">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          All work
        </a>
        <div class="pp__sidenav-links pp__sidenav-links--recruiter">
          <span class="pp__sidenav-indicator" aria-hidden="true"></span>
          <a class="pp__sidenav-rlink is-active" href="#cs-glance">At a glance</a>
          ${cf && cf.matters ? `<a class="pp__sidenav-rlink" href="#cs-cause-list">Cause list</a>` : ''}
          <a class="pp__sidenav-rlink" href="#pp-quick-read">Quick read</a>
        </div>
      </nav>` : ''}

      <nav class="pp__sidenav is-active" data-sidenav="lead" aria-label="Section navigation">
        <a class="pp__sidenav-back" href="work.html">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          All work
        </a>
        <div class="pp__sidenav-links">
          <span class="pp__sidenav-indicator" aria-hidden="true"></span>
          ${leadNavItems.map(([href, label, kind], i) =>
            `<a class="pp__sidenav-link${i === 0 ? ' is-active' : ''}${kind === 'sub' ? ' pp__sidenav-link--sub' : ''}" href="${href}">${label}</a>`).join('')}
        </div>
      </nav>
    </div>`;

  const skimPanelHTML = hasSkim ? `
    <div class="pp__view-panel" data-panel="recruiter">
      <div id="cs-glance">${RecruiterGlanceCard({ detail, year, category })}</div>
      ${cf ? CauseListTable(cf) : ''}
      ${QuickReadSection({ detail })}
    </div>` : '';

  return `
    <div class="cs-page">

      <div class="cs-topbar">
        <a class="cs-topbar__back" href="work.html">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Back to work
        </a>
        <span class="cs-topbar__crumb">${crumb}</span>
      </div>

      <div class="cs-layout">
        ${sidenavHTML}

        <div class="cs-main">

          <header class="cs-hero">
            <p class="cs-eyebrow">${category} · ${year}</p>
            <h1 class="cs-title">${title}</h1>
            <p class="cs-subtitle">${description}</p>
            ${tabsHTML}
          </header>

          ${skimPanelHTML}

          <div class="pp__view-panel is-active" data-panel="lead">

            <div class="cs-overview" id="cs-overview">
              <div class="cs-meta">${metaHTML}</div>
              ${ownedHTML ? `<div class="cs-owned">
                <span class="cs-meta__key">What I owned</span>
                <div class="cs-chips">${ownedHTML}</div>
              </div>` : ''}
              ${caseFile && statsHTML ? `<div class="cs-stats cs-stats--overview">${statsHTML}</div>` : ''}
            </div>

            <div class="cs-content">

              ${caseFile ? caseFile.html : `
              ${sectionOpen('The challenge', 'cs-challenge')}
                <p class="cs-section__body">${detail.challenge}</p>
                ${figureHTML(frameA)}
              </section>

              ${sectionOpen('The approach', 'cs-approach')}
                <p class="cs-section__body">Understanding the real constraints meant talking to users, stakeholders, and the team before opening any design tools. The goal was to frame the problem correctly before solving it.</p>
                ${figureHTML(frameB)}
              </section>

              ${sectionOpen('The outcome', 'cs-outcome')}
                <p class="cs-section__body">${detail.outcome}</p>
                ${statsHTML ? `<div class="cs-stats">${statsHTML}</div>` : ''}
                ${highlightsHTML ? `<ul class="cs-highlights">${highlightsHTML}</ul>` : ''}
              </section>

              ${reflectionHTML ? `${sectionOpen('Reflection', 'cs-reflection')}
                <div class="cs-reflection">${reflectionHTML}</div>
              </section>` : ''}`}

              <section class="cs-end">
                <p class="cs-eyebrow">Thanks for reading</p>
                <h2 class="cs-end__heading">That's the case study, front to back.</h2>
                <p class="cs-end__body">Want to dig into the process, edge cases, or trade-offs that didn't fit on the page? Happy to walk through any of it.</p>
                <div class="cs-end__actions">
                  <a class="cs-end__btn-primary" href="mailto:${portfolio.email || ''}">Talk about this project →</a>
                  <button class="cs-end__btn-secondary" id="cs-share-btn">Copy link</button>
                </div>
              </section>

              ${nextHTML ? `<nav class="cs-next">
                <p class="cs-next__label">Read next</p>
                <div class="cs-next__grid">${nextHTML}</div>
              </nav>` : ''}

            </div>
          </div>

        </div>
      </div>
    </div>`;
}
