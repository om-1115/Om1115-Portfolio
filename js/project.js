(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
})();

document.addEventListener("DOMContentLoaded", async () => {
  await loadPortfolioData(['projects']);
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const project = portfolio.projects.find(p => p.id === id);
  const app = document.getElementById("app");

  if (!project) {
    app.innerHTML = `<div style="padding:4rem;text-align:center;color:var(--text-muted)">Project not found. <a href="work.html" style="color:var(--text);text-decoration:underline">Back to work</a></div>`;
    return;
  }

  document.title = `${project.title} — Om Kumar`;

  app.innerHTML = [
    ProjectPageContent(project),
    Footer(portfolio),
    BottomDock(portfolio, { page: "work" }),
  ].join("");

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
  const scrollWrap = document.getElementById('scroll-wrap') || window;
  (scrollWrap === window ? window : scrollWrap).addEventListener('scroll', () => {
    goTopBtn.classList.toggle('is-visible', (scrollWrap === window ? scrollWrap.scrollY : scrollWrap.scrollTop) > 300);
  }, { passive: true });
  goTopBtn.addEventListener('click', () => {
    (scrollWrap === window ? window : scrollWrap).scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── Dock scroll hide/show ────────────────────────────────────────────────
  const dockWrap = document.getElementById("dock-wrap");
  if (dockWrap) {
    let lastY = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      dockWrap.classList.toggle("is-hidden", y > lastY && y > 120);
      lastY = y;
    }, { passive: true });
  }

  // ─── View tabs ────────────────────────────────────────────────────────────
  const viewTabs    = document.querySelectorAll('.pp__view-tab');
  const viewPanels  = document.querySelectorAll('.pp__view-panel');
  const sidenavs    = document.querySelectorAll('.pp__sidenav[data-sidenav]');
  const leadLinks   = document.querySelectorAll('.pp__sidenav-link--lead');

  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view;
      viewTabs.forEach(t => {
        t.classList.toggle('is-active', t.dataset.view === view);
        t.setAttribute('aria-selected', String(t.dataset.view === view));
      });
      viewPanels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === view));
      sidenavs.forEach(n => n.classList.toggle('is-active', n.dataset.sidenav === view));
      leadLinks.forEach(l => { l.style.display = view === 'lead' ? '' : 'none'; });
    });
  });

  // ─── Quick read → lead view switch ───────────────────────────────────────
  document.addEventListener('click', e => {
    const btn = e.target.closest('.rq__switch-btn[data-switch-to]');
    if (!btn) return;
    const view = btn.dataset.switchTo;
    viewTabs.forEach(t => {
      t.classList.toggle('is-active', t.dataset.view === view);
      t.setAttribute('aria-selected', String(t.dataset.view === view));
    });
    viewPanels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === view));
    sidenavs.forEach(n => n.classList.toggle('is-active', n.dataset.sidenav === view));
    leadLinks.forEach(l => { l.style.display = ''; });
    document.getElementById('scroll-wrap')?.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── Sidenav indicator helper ─────────────────────────────────────────────
  function moveIndicator(indicator, activeLink) {
    if (!indicator || !activeLink) return;
    const top = activeLink.offsetTop + activeLink.offsetHeight / 2 - indicator.offsetHeight / 2;
    indicator.style.top = top + "px";
  }

  // ─── Lead nav scroll spy ──────────────────────────────────────────────────
  const sideLinks     = document.querySelectorAll(".pp__sidenav-link");
  const leadIndicator = document.querySelector(".pp__sidenav[data-sidenav='lead'] .pp__sidenav-indicator");

  if (sideLinks.length) {
    const sectionIds = [...sideLinks].map(a => a.getAttribute("href").replace("#", ""));
    const sections   = sectionIds.map(sid => document.getElementById(sid)).filter(Boolean);

    function setLeadActive(link) {
      sideLinks.forEach(a => a.classList.toggle("is-active", a === link));
      moveIndicator(leadIndicator, link);
    }

    function onScroll() {
      const offset = 120;
      let active = sections[0];
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= offset) active = sec;
      }
      const activeLink = [...sideLinks].find(a => a.getAttribute("href") === `#${active.id}`);
      setLeadActive(activeLink);
    }

    sideLinks.forEach(link => {
      link.addEventListener("click", () => setLeadActive(link));
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ─── Recruiter nav click active ───────────────────────────────────────────
  const recruiterLinks    = document.querySelectorAll(".pp__sidenav-rlink");
  const recruiterIndicator = document.querySelector(".pp__sidenav[data-sidenav='recruiter'] .pp__sidenav-indicator");

  function setRecruiterActive(link) {
    recruiterLinks.forEach(a => a.classList.toggle("is-active", a === link));
    moveIndicator(recruiterIndicator, link);
  }

  if (recruiterLinks.length) {
    const rSectionIds = [...recruiterLinks].map(a => a.getAttribute("href").replace("#", ""));
    const rSections   = rSectionIds.map(sid => document.getElementById(sid)).filter(Boolean);

    function onRecruiterScroll() {
      const offset = 120;
      let active = rSections[0];
      for (const sec of rSections) {
        if (sec.getBoundingClientRect().top <= offset) active = sec;
      }
      const activeLink = [...recruiterLinks].find(a => a.getAttribute("href") === `#${active.id}`);
      if (activeLink) setRecruiterActive(activeLink);
    }

    recruiterLinks.forEach(link => {
      link.addEventListener("click", () => setRecruiterActive(link));
    });

    window.addEventListener("scroll", onRecruiterScroll, { passive: true });

    // Initial position
    requestAnimationFrame(() => {
      const first = document.querySelector(".pp__sidenav-rlink.is-active") || recruiterLinks[0];
      setRecruiterActive(first);
    });
  }
});
