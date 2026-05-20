(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
})();

document.addEventListener("DOMContentLoaded", async () => {
  await loadPortfolioData(['projects']);
  const app = document.getElementById("app");

  app.innerHTML = [
    ProjectsGrid(portfolio),
    Footer(portfolio),
    BottomDock(portfolio, { page: "work" }),
  ].join("");

  // ─── Theme toggle ─────────────────────────────────────────────────────────
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

  // ─── Project navigation ───────────────────────────────────────────────────
  const grid = document.querySelector(".fw-grid");
  if (grid) {
    grid.addEventListener("click", e => {
      const row = e.target.closest("[data-project-id]");
      if (row) window.location.href = `project.html?id=${row.dataset.projectId}`;
    });

    grid.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const row = e.target.closest("[data-project-id]");
        if (row) window.location.href = `project.html?id=${row.dataset.projectId}`;
      }
    });
  }

  // ─── Go to top button ─────────────────────────────────────────────────────
  const goTopBtn = document.createElement('button');
  goTopBtn.className = 'go-top';
  goTopBtn.setAttribute('aria-label', 'Back to top');
  goTopBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  document.body.appendChild(goTopBtn);
  const wrapEl = document.getElementById('scroll-wrap') || window;
  (wrapEl === window ? window : wrapEl).addEventListener('scroll', () => {
    goTopBtn.classList.toggle('is-visible', (wrapEl === window ? wrapEl.scrollY : wrapEl.scrollTop) > 300);
  }, { passive: true });
  goTopBtn.addEventListener('click', () => {
    (wrapEl === window ? window : wrapEl).scrollTo({ top: 0, behavior: 'smooth' });
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
});
