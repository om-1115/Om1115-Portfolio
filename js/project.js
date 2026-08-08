(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
})();

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const app = document.getElementById("app");

  // Try to find project in static data first
  let project = portfolio.projects.find(p => p.id === id);

  if (!project) {
    // Need to load from DB
    await loadPortfolioData(['projects']);
    project = portfolio.projects.find(p => p.id === id);
  }

  if (!project) {
    app.innerHTML = `<div style="padding:4rem;text-align:center;color:var(--text-muted)">Project not found. <a href="work.html" style="color:var(--text);text-decoration:underline">Back to work</a></div>`;
    return;
  }

  // Coming-soon entries have no case study yet — they aren't linked from the
  // grid, but don't blow up if someone lands here directly.
  if (!project.detail) {
    app.innerHTML = `<div style="padding:4rem;text-align:center;color:var(--text-muted)">${project.title} — case study coming soon. <a href="work.html" style="color:var(--text);text-decoration:underline">Back to work</a></div>`;
    return;
  }

  document.title = `${project.title} — Om Kumar`;

  // Two layouts: the linear, image-led story page, and the two-view case file.
  const PageLayout = project.detail.story ? ProjectStoryPage : ProjectCaseStudyPage;

  app.innerHTML = [
    PageLayout(project),
    Footer(portfolio),
    BottomDock(portfolio, { page: "work", contactHref: "index.html#contact" }),
  ].join("");

  // ─── Scroll container ─────────────────────────────────────────────────────
  // html/body have overflow:hidden — #scroll-wrap is what actually scrolls.
  const scroller  = document.getElementById('scroll-wrap') || window;
  const isWin     = scroller === window;
  const scrollTop = () => isWin ? window.scrollY : scroller.scrollTop;
  const onScroll  = fn => scroller.addEventListener('scroll', fn, { passive: true });
  const scrollToY = y => scroller.scrollTo({ top: y, behavior: 'smooth' });

  const toggleBtn = document.getElementById("theme-toggle");
  const moonIcon  = document.getElementById("theme-icon-moon");
  const sunIcon   = document.getElementById("theme-icon-sun");

  function applyTheme(dark) {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    moonIcon.style.display = dark ? "none" : "";
    sunIcon.style.display  = dark ? "" : "none";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  applyTheme(document.documentElement.getAttribute("data-theme") === "dark");
  toggleBtn.addEventListener("click", () => {
    applyTheme(document.documentElement.getAttribute("data-theme") !== "dark");
  });

  // ─── Go to top button ─────────────────────────────────────────────────────
  const goTopBtn = document.createElement('button');
  goTopBtn.className = 'go-top';
  goTopBtn.setAttribute('aria-label', 'Back to top');
  goTopBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  document.body.appendChild(goTopBtn);
  onScroll(() => goTopBtn.classList.toggle('is-visible', scrollTop() > 300));
  goTopBtn.addEventListener('click', () => scrollToY(0));

  // ─── Dock scroll hide/show ────────────────────────────────────────────────
  const dockWrap = document.getElementById("dock-wrap");
  if (dockWrap) {
    let lastY = 0;
    onScroll(() => {
      const y = scrollTop();
      dockWrap.classList.toggle("is-hidden", y > lastY && y > 120);
      lastY = y;
    });
  }

  // ─── Share button copies URL ──────────────────────────────────────────────
  const shareBtn = document.getElementById('cs-share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const orig = shareBtn.textContent;
        shareBtn.textContent = 'Copied!';
        setTimeout(() => { shareBtn.textContent = orig; }, 2000);
      });
    });
  }

  // ─── Left sidenav — active link + sliding indicator ───────────────────────
  const SPY_OFFSET = 120;

  function buildSidenav(nav) {
    const indicator = nav.querySelector('.pp__sidenav-indicator');
    const pairs = [...nav.querySelectorAll('.pp__sidenav-link, .pp__sidenav-rlink')]
      .map(link => ({ link, section: document.getElementById(link.getAttribute('href').slice(1)) }))
      .filter(p => p.section);
    if (!pairs.length) return null;

    function setActive(link) {
      pairs.forEach(p => p.link.classList.toggle('is-active', p.link === link));
      // Links measure 0 while their nav is display:none — only move when visible
      if (indicator && link && link.offsetHeight) {
        indicator.style.top = (link.offsetTop + link.offsetHeight / 2 - indicator.offsetHeight / 2) + 'px';
      }
    }

    function sync() {
      if (!nav.classList.contains('is-active')) return;
      let active = pairs[0];
      for (const p of pairs) {
        if (p.section.getBoundingClientRect().top <= SPY_OFFSET) active = p;
      }
      setActive(active.link);
    }

    pairs.forEach(({ link, section }) => {
      link.addEventListener('click', e => {
        e.preventDefault();
        setActive(link);
        const base = isWin ? 0 : scroller.getBoundingClientRect().top;
        scrollToY(section.getBoundingClientRect().top - base + scrollTop() - 24);
      });
    });

    return { sync };
  }

  const sidenavs = [...document.querySelectorAll('.pp__sidenav[data-sidenav]')];
  const spies    = sidenavs.map(buildSidenav).filter(Boolean);
  onScroll(() => spies.forEach(s => s.sync()));

  // ─── View tabs — 30-second skim vs full deep-dive ─────────────────────────
  const viewTabs   = [...document.querySelectorAll('.pp__view-tab')];
  const viewPanels = [...document.querySelectorAll('.pp__view-panel')];

  function setView(view) {
    viewTabs.forEach(t => {
      const on = t.dataset.view === view;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
    viewPanels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === view));
    sidenavs.forEach(n => n.classList.toggle('is-active', n.dataset.sidenav === view));
    // Indicator offsets are only measurable once the nav is on screen
    requestAnimationFrame(() => spies.forEach(s => s.sync()));
  }

  viewTabs.forEach(tab => tab.addEventListener('click', () => setView(tab.dataset.view)));

  // "Switch to design lead view" link at the end of the quick read, and the
  // cause-list rows, which jump straight to their matter in the full view.
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-switch-to]');
    if (!btn) return;
    e.preventDefault();
    setView(btn.dataset.switchTo);

    const href = btn.getAttribute('href') || '';
    const target = href.startsWith('#') ? document.getElementById(href.slice(1)) : null;
    if (!target) return scrollToY(0);

    // The panel has only just been shown — measure after it lays out
    requestAnimationFrame(() => {
      const base = isWin ? 0 : scroller.getBoundingClientRect().top;
      scrollToY(target.getBoundingClientRect().top - base + scrollTop() - 24);
      // Smooth scrolling can settle after the last scroll event fires
      setTimeout(() => spies.forEach(s => s.sync()), 700);
    });
  });

  requestAnimationFrame(() => spies.forEach(s => s.sync()));
});
