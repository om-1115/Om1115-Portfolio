// Light by default — dark only when the visitor explicitly picked it
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
})();

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  // Render immediately with static fallback data
  app.innerHTML = [
    AboutHeroSection(portfolio),
    ExperienceSection(portfolio),
    IntelligenceTriangle(portfolio),
    Footer(portfolio, { contact: true }),
    BottomDock(portfolio, { page: "about" }),
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

  function syncIcons() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    moonIcon.style.display = dark ? "none" : "";
    sunIcon.style.display  = dark ? "" : "none";
  }

  syncIcons();

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


  // Fetch live experience data in background and patch the section
  await loadPortfolioData(['experience']);
  const expEl = document.getElementById('experience');
  if (expEl) expEl.outerHTML = ExperienceSection(portfolio);
});
