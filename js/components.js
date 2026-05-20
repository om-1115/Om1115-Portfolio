// ─── Reusable component functions ───────────────────────────────────────────

function BottomDock({ name, email }, { page = 'home' } = {}) {
  const isWork  = page === 'work';
  const isAbout = page === 'about';
  const homeHref = (isWork || isAbout) ? 'index.html' : '#top';

  return `
    <div class="dock-wrap" id="dock-wrap">
      <nav class="dock" aria-label="Site navigation">
        <a class="dock__brand" href="${homeHref}">${name}</a>
        <a class="dock__link${!isWork && !isAbout ? ' is-active' : ''}" href="${homeHref}">
          ${!isWork && !isAbout ? '<span class="dock__bullet"></span>' : ''}Home
        </a>
        <a class="dock__link${isWork ? ' is-active' : ''}" href="work.html">
          ${isWork ? '<span class="dock__bullet"></span>' : ''}Work
        </a>
        <a class="dock__link${isAbout ? ' is-active' : ''}" href="about.html">
          ${isAbout ? '<span class="dock__bullet"></span>' : ''}About
        </a>
        <a class="dock__link" href="#contact">Contact</a>
        <a class="dock__resume" href="#">
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

function HeroSection({ heroGreeting, heroSubtitle, email, heroCyclePrefix, heroCycleWords }) {
  const firstWord = (heroCycleWords && heroCycleWords[0]) || '';
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
            <span class="hero__cycle-placeholder" aria-hidden="true">design systems that scale</span>
            <em class="hero__cycle-word" id="hero-cycle-word">${firstWord}</em>
          </span>
        </h1>
        <p class="hero__sub">${heroSubtitle}</p>
      </div>
      <div class="hero__scroll">
        <span class="hero__scroll-label">Scroll</span>
        <span class="hero__scroll-line"></span>
      </div>
    </section>`;
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

function WorkProjectRow({ id, title, category, year, tags, color, accentColor, description, status }) {
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
      <div class="fw-card__thumb" style="--thumb-bg:${color};--thumb-accent:${accentColor || '#888'}">
        ${WorkScreenshotMockup({ accentColor })}
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

function AboutHeroSection({ name, title, statement, bioParagraphs, skills }) {
  const bioHTML = bioParagraphs.map(p => `<p>${p}</p>`).join("");
  const skillsHTML = skills.map(s => Tag({ label: s })).join("");

  const photos = [
    { bg: "linear-gradient(160deg,#3a7bd5,#00d2ff)", rot: "-6deg", l: "0px",   t: "30px",  zi: 1 },
    { bg: "linear-gradient(160deg,#f7971e,#ffd200)", rot: "5deg",  l: "30px",  t: "0px",   zi: 2 },
    { bg: "linear-gradient(160deg,#7f53ac,#647dee)", rot: "-2deg", l: "-15px", t: "-20px", zi: 3 },
  ];

  const photosHTML = photos.map(p => `
    <div class="photo-card" style="--rot:${p.rot}; left:${p.l}; top:${p.t}; z-index:${p.zi}">
      <div class="photo-card__img" style="background:${p.bg}"></div>
    </div>`).join("");

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
          <span class="about-hero__hint-text">Pssst...You can drag the photographs</span>
          <svg width="44" height="48" viewBox="0 0 44 48" fill="none" class="about-hero__hint-arrow">
            <path d="M8 4 C8 4 28 10 30 28 C32 40 20 46 20 46" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M20 46 L14 38 M20 46 L28 40" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="photo-stack" id="photo-stack">${photosHTML}</div>
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

function HomeExperienceSection({ experience }) {
  const cards = experience.map(({ role, company, period, location, tags, logoGradient, logoId, logoUrl }) => {
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
  const items = experience.map(({ role, company, url, period, location, tags, points }) => {
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
  const slidesHTML = shoutouts.map(({ quote, name, role, company, initials }, i) => `
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

  const dotsHTML = shoutouts.map((_, i) =>
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

function Footer({ name, email, linkedin, behance }) {
  const year = new Date().getFullYear();
  return `
    <footer class="sf" id="contact">
      <div class="sf__main">
        <div class="sf__left">
          <h2 class="sf__headline">
            Great products<br>
            start with <em>great</em><br>
            <em>decisions.</em>
          </h2>
          <p class="sf__sub">Let's talk about what you're building.</p>
          <a href="mailto:${email}" class="sf__cta">
            Get in touch
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="sf__right">
          <span class="sf__find-label">FIND ME HERE:</span>
          <a href="mailto:${email}" class="sf__social-link">${email}</a>
          <a href="${linkedin}" target="_blank" rel="noopener" class="sf__social-link">LinkedIn</a>
          <a href="${behance}" target="_blank" rel="noopener" class="sf__social-link">Behance</a>
        </div>
      </div>
      <div class="sf__meta">
        <span>AVAILABLE FOR PROJECTS</span>
        <span>WORKING GLOBALLY</span>
      </div>
      <div class="sf__bottom">
        <span>© ${year}</span>
        <a href="#top" class="sf__logo">${name}</a>
        <a href="#top" class="sf__back-top">Back to top ↑</a>
      </div>
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
  const ownedHTML = rec.owned.join(' · ');
  const liveAtHTML = rec.liveAt
    ? `<a class="rg__val rg__val--link" href="${rec.liveAt.url}" target="_blank" rel="noopener">${rec.liveAt.label} ↗</a>`
    : `<span class="rg__val rg__val--muted">Not public</span>`;
  return `
    <div class="rg">
      <p class="rg__label">AT A GLANCE</p>
      <div class="rg__divider"></div>
      <div class="rg__grid">
        <div class="rg__cell"><span class="rg__key">ROLE</span><span class="rg__val">${detail.role}</span></div>
        <div class="rg__cell"><span class="rg__key">TIMELINE</span><span class="rg__val">${rec.timeline}</span></div>
        <div class="rg__cell"><span class="rg__key">LIVE AT</span>${liveAtHTML}</div>
      </div>
      <div class="rg__divider"></div>
      <div class="rg__grid">
        <div class="rg__cell"><span class="rg__key">DOMAIN</span><span class="rg__val">${rec.domain}</span></div>
        <div class="rg__cell"><span class="rg__key">PLATFORM</span><span class="rg__val">${rec.platform}</span></div>
        <div class="rg__cell"><span class="rg__key">TEAM</span><span class="rg__val">${rec.team}</span></div>
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
