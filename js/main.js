// Apply saved theme before render to avoid flash
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

function initSmoothScroll() {
  const el = document.getElementById('scroll-wrap');
  if (!el || 'ontouchstart' in window) return;

  let target  = 0;
  let current = 0;
  let rafId   = null;
  const EASE  = 0.082;

  const maxScroll = () => el.scrollHeight - el.clientHeight;

  function schedule() {
    if (rafId) return;
    (function tick() {
      const diff = target - current;
      if (Math.abs(diff) < 0.12) {
        current = target;
        el.scrollTop = current;
        rafId = null;
        return;
      }
      current += diff * EASE;
      el.scrollTop = current;
      rafId = requestAnimationFrame(tick);
    })();
  }

  function nudge(delta) {
    target = Math.max(0, Math.min(target + delta, maxScroll()));
    schedule();
  }

  el.addEventListener('wheel', e => {
    e.preventDefault();
    nudge(e.deltaY);
  }, { passive: false });

  const KEY = {
    ArrowDown: 120,   ArrowUp: -120,
    PageDown:  window.innerHeight * 0.85,
    PageUp:   -window.innerHeight * 0.85,
    ' ':       window.innerHeight * 0.85,
    Home:     -Infinity, End: Infinity,
  };

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key in KEY) { e.preventDefault(); nudge(KEY[e.key]); }
  });

  // Smooth anchor-link scrolling
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const dest = document.getElementById(id);
    if (!dest) return;
    e.preventDefault();
    target = Math.max(0, Math.min(
      dest.getBoundingClientRect().top + el.scrollTop,
      maxScroll()
    ));
    schedule();
  });

  // Re-sync when scrollbar is dragged or external scroll occurs
  el.addEventListener('scroll', () => {
    if (!rafId) { target = el.scrollTop; current = el.scrollTop; }
  }, { passive: true });
}

function initGoTop() {
  const btn = document.createElement('button');
  btn.className = 'go-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  document.body.appendChild(btn);

  const scrollEl = document.getElementById('scroll-wrap') || window;
  const getY = () => scrollEl === window ? scrollEl.scrollY : scrollEl.scrollTop;

  (scrollEl === window ? window : scrollEl).addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', getY() > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    if (scrollEl === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function initMouseGlow() {
  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  document.body.appendChild(glow);

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);

  let mx = -9999, my = -9999;
  let rx = -9999, ry = -9999;
  let visible = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (!visible) {
      visible = true;
      glow.classList.add('is-visible');
      ring.classList.add('is-visible');
    }
    const hovered = document.elementFromPoint(mx, my);
    const interactive = hovered && hovered.closest('a, button, [role="button"], .fw-card, .carousel__arrow');
    ring.classList.toggle('is-hovering', !!interactive);
  });

  document.addEventListener('mouseleave', () => {
    visible = false;
    glow.classList.remove('is-visible');
    ring.classList.remove('is-visible');
  });

  (function tick() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;

    glow.style.transform = `translate(${mx - 375}px,${my - 375}px)`;
    ring.style.transform = `translate(${rx - 11}px,${ry - 11}px)`;

    requestAnimationFrame(tick);
  })();
}

function initCycleText() {
  const el = document.getElementById('hero-cycle-word');
  if (!el) return;
  const words = portfolio.heroCycleWords;
  if (!words || words.length < 2) return;
  let i = 0;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  setInterval(() => {
    i = (i + 1) % words.length;
    el.classList.add('is-leaving');
    setTimeout(() => {
      el.textContent = words[i];
      el.classList.add('is-entering');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.classList.remove('is-leaving', 'is-entering');
      }));
    }, 550);
  }, 2800);
}

function initFloatingChips() {
  const container = document.querySelector('.cap-chips');
  if (!container) return;

  const chips = [...container.querySelectorAll('.cap-chip')];
  const GAP = 8; // minimum gap between chips

  requestAnimationFrame(() => requestAnimationFrame(() => {
    const cw = container.clientWidth;
    const ch = container.clientHeight;

    // Read real dimensions after layout
    const state = chips.map(el => ({
      el,
      w: el.offsetWidth,
      h: el.offsetHeight,
      x: 0, y: 0,
      vx: 0, vy: 0,
    }));

    // Pack chips in rows so initial state has no overlaps
    let rowX = GAP, rowY = GAP, rowH = 0;
    state.forEach(s => {
      if (rowX + s.w + GAP > cw) { rowX = GAP; rowY += rowH + GAP; rowH = 0; }
      s.x = rowX;
      s.y = rowY;
      rowX += s.w + GAP;
      rowH = Math.max(rowH, s.h);
    });

    // Random launch velocity
    state.forEach(s => {
      const speed = 0.5 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
    });

    function resolveCollisions(cw, ch) {
      // 3 solver iterations per frame for stability
      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < state.length; i++) {
          const a = state[i];
          for (let j = i + 1; j < state.length; j++) {
            const b = state[j];

            const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + GAP;
            const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + GAP;

            if (ox <= 0 || oy <= 0) continue; // no overlap

            if (ox < oy) {
              // Push apart on X axis
              const push = ox / 2;
              if (a.x < b.x) { a.x -= push; b.x += push; }
              else            { a.x += push; b.x -= push; }
              // Swap X velocities (elastic)
              const tmp = a.vx; a.vx = b.vx; b.vx = tmp;
            } else {
              // Push apart on Y axis
              const push = oy / 2;
              if (a.y < b.y) { a.y -= push; b.y += push; }
              else            { a.y += push; b.y -= push; }
              const tmp = a.vy; a.vy = b.vy; b.vy = tmp;
            }
          }
        }

        // Clamp to walls after each iteration
        state.forEach(s => {
          if (s.x < 0)            { s.x = 0;          s.vx =  Math.abs(s.vx); }
          if (s.x + s.w > cw)     { s.x = cw - s.w;   s.vx = -Math.abs(s.vx); }
          if (s.y < 0)            { s.y = 0;           s.vy =  Math.abs(s.vy); }
          if (s.y + s.h > ch)     { s.y = ch - s.h;   s.vy = -Math.abs(s.vy); }
        });
      }
    }

    (function tick() {
      const cw = container.clientWidth;
      const ch = container.clientHeight;

      state.forEach(s => { s.x += s.vx; s.y += s.vy; });

      resolveCollisions(cw, ch);

      state.forEach(s => {
        s.el.style.transform = `translate(${Math.round(s.x)}px,${Math.round(s.y)}px)`;
      });

      requestAnimationFrame(tick);
    })();
  }));
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPortfolioData(['experience', 'testimonials']);
  const app = document.getElementById("app");

  // ─── Loading screen ───────────────────────────────────────────────────────
  const loader = document.getElementById('loader');
  if (loader) {
    // Split text into per-character spans with weight interpolated left→right
    const loaderText = loader.querySelector('.loader__text');
    if (loaderText) {
      const chars = loaderText.textContent.split('');
      const total = chars.length;
      loaderText.innerHTML = chars.map((char, i) => {
        if (char === ' ') return `<span style="display:inline-block;width:0.28em;animation:none"></span>`;
        const weight = Math.round(200 + 700 * (i / (total - 1)));
        const delay  = (i * 0.032).toFixed(3);
        return `<span style="font-weight:${weight};animation-delay:${delay}s">${char}</span>`;
      }).join('');
    }

    const bar = loader.querySelector('.loader__bar');
    bar.addEventListener('animationend', () => {
      sessionStorage.setItem('visited', '1');
      loader.classList.add('is-done');
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    }, { once: true });
  }

  app.innerHTML = [
    HeroSection(portfolio),
    `<div class="force-dark">${ProjectsGrid(portfolio, { limit: 3, viewAllUrl: 'work.html' })}</div>`,
    SkillsSection(portfolio),
    `<div class="force-dark">${ExperienceSection(portfolio)}</div>`,
    GallerySection(portfolio),
    ShoutoutsSection(portfolio),
    Footer(portfolio),
    BottomDock(portfolio, { page: 'home' }),
  ].join("");

  initHeroParticles();
  initMouseGlow();
  initSmoothScroll();
  initGoTop();
  initFloatingChips();
  initCycleText();

  // ─── Avatar click easter egg ──────────────────────────────────────────────
  const avatarWrap = document.querySelector('.hero__avatar-wrap');
  const bubble     = avatarWrap && avatarWrap.querySelector('.hero__bubble');
  if (avatarWrap && bubble) {
    const originalText = bubble.textContent;
    let resetTimer;
    avatarWrap.addEventListener('click', () => {
      bubble.textContent = 'Na buddy, you cannot zoom me 🥹';
      avatarWrap.classList.add('bubble-pinned');
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        bubble.textContent = originalText;
        avatarWrap.classList.remove('bubble-pinned');
      }, 2800);
    });
  }

  // ─── Copy email button ───────────────────────────────────────────────────
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(copyBtn.dataset.email).then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('is-copied');
        setTimeout(() => {
          copyBtn.textContent = orig;
          copyBtn.classList.remove('is-copied');
        }, 2000);
      });
    });
  }

  // ─── Floating navbar hide/show on scroll ─────────────────────────────────
  const dockWrap = document.getElementById('dock-wrap');
  if (dockWrap) {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      dockWrap.classList.toggle('is-hidden', y > lastY && y > 120);
      lastY = y;
    }, { passive: true });
  }

  // ─── Theme toggle ────────────────────────────────────────────────────────

  const toggleBtn = document.getElementById("theme-toggle");
  const moonIcon = document.getElementById("theme-icon-moon");
  const sunIcon = document.getElementById("theme-icon-sun");

  function applyTheme(dark) {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    moonIcon.style.display = dark ? "none" : "";
    sunIcon.style.display = dark ? "" : "none";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  // Sync icon with current theme on load
  applyTheme(document.documentElement.getAttribute("data-theme") === "dark");

  toggleBtn.addEventListener("click", () => {
    applyTheme(document.documentElement.getAttribute("data-theme") !== "dark");
  });

  // ─── Project navigation ───────────────────────────────────────────────────

  document.querySelector(".fw-grid").addEventListener("click", e => {
    const card = e.target.closest(".fw-card[data-project-id]");
    if (card) window.location.href = `project.html?id=${card.dataset.projectId}`;
  });

  document.querySelector(".fw-grid").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const card = e.target.closest(".fw-card[data-project-id]");
      if (card) window.location.href = `project.html?id=${card.dataset.projectId}`;
    }
  });

  // ─── Chip cursor follow (shipped + coming-soon) ───────────────────────────
  document.querySelectorAll(".fw-card--shipped, .fw-card--coming-soon").forEach(card => {
    const chip = card.querySelector(".fw-chip");
    if (!chip) return;
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      chip.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px) translate(-50%, -50%)`;
    });
  });

  // ─── Shoutouts slider ────────────────────────────────────────────────────
  const shoutSlides = document.querySelectorAll('.shout__slide');
  const shoutDots   = document.querySelectorAll('.shout__dot');
  const shoutPrev   = document.getElementById('shout-prev');
  const shoutNext   = document.getElementById('shout-next');

  if (shoutSlides.length && shoutPrev && shoutNext) {
    let shoutCurrent = 0;

    function shoutGoTo(idx) {
      shoutSlides[shoutCurrent].classList.remove('is-active');
      shoutDots[shoutCurrent].classList.remove('is-active');
      shoutCurrent = (idx + shoutSlides.length) % shoutSlides.length;
      shoutSlides[shoutCurrent].classList.add('is-active');
      shoutDots[shoutCurrent].classList.add('is-active');
    }

    shoutPrev.addEventListener('click', () => shoutGoTo(shoutCurrent - 1));
    shoutNext.addEventListener('click', () => shoutGoTo(shoutCurrent + 1));
    shoutDots.forEach((dot, i) => dot.addEventListener('click', () => shoutGoTo(i)));
  }

  // ─── Gallery lightbox ────────────────────────────────────────────────────
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = `
    <button class="gallery-lightbox__close" aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="gallery-lightbox__content">
      <span class="gallery-lightbox__label"></span>
    </div>`;
  document.body.appendChild(lightbox);

  const lbLabel = lightbox.querySelector('.gallery-lightbox__label');

  function openLightbox(bg, label) {
    lightbox.style.setProperty('--lb-bg', bg);
    lbLabel.textContent = label;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  lightbox.addEventListener('click', e => {
    if (!e.target.closest('.gallery-lightbox__content')) closeLightbox();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // ─── Carousels ───────────────────────────────────────────────────────────

  document.querySelectorAll(".carousel").forEach(carouselEl => {
    const track = carouselEl.querySelector(".carousel__track");
    const dots = carouselEl.querySelectorAll(".carousel__dot");
    const slides = carouselEl.querySelectorAll(".carousel__slide");
    let current = 0;
    let timer = null;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    }

    function startAuto() { timer = setInterval(() => goTo(current + 1), 3000); }
    function stopAuto()  { clearInterval(timer); }
    function resetAuto() { stopAuto(); startAuto(); }

    carouselEl.querySelector(".carousel__arrow--prev").addEventListener("click", () => { goTo(current - 1); resetAuto(); });
    carouselEl.querySelector(".carousel__arrow--next").addEventListener("click", () => { goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i); resetAuto(); }));

    carouselEl.addEventListener('mouseenter', stopAuto);
    carouselEl.addEventListener('mouseleave', startAuto);

    // Touch swipe
    let touchStartX = 0;
    const viewport = carouselEl.querySelector(".carousel__viewport");
    viewport.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener("touchend", e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) { goTo(current + (delta > 0 ? 1 : -1)); resetAuto(); }
    });

    // Click to zoom
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        openLightbox(slide.dataset.bg || 'var(--bg)', slide.dataset.label || '');
      });
    });

    startAuto();
  });

});
