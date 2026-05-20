// Default to dark on about page unless user explicitly chose light
(function () {
  const saved = localStorage.getItem("theme");
  const dark = saved ? saved === "dark" : true;
  if (dark) document.documentElement.setAttribute("data-theme", "dark");
})();

document.addEventListener("DOMContentLoaded", async () => {
  await loadPortfolioData(['experience']);

  const app = document.getElementById("app");

  app.innerHTML = [
    AboutHeroSection(portfolio),
    ExperienceSection(portfolio),
    Footer(portfolio),
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

  // ─── Draggable photos ─────────────────────────────────────────────────────
  document.querySelectorAll(".photo-card").forEach((card, idx) => {
    let dragging = false;
    let startX, startY, startLeft, startTop;

    function getPos() {
      return {
        l: parseFloat(card.style.left) || 0,
        t: parseFloat(card.style.top)  || 0,
      };
    }

    card.addEventListener("mousedown", e => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const p = getPos();
      startLeft = p.l;
      startTop  = p.t;
      card.style.zIndex = 50 + idx;
      card.style.transition = "none";
      e.preventDefault();
    });

    card.addEventListener("touchstart", e => {
      dragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      const p = getPos();
      startLeft = p.l;
      startTop  = p.t;
      card.style.zIndex = 50 + idx;
      card.style.transition = "none";
    }, { passive: true });

    function onMove(cx, cy) {
      if (!dragging) return;
      card.style.left = (startLeft + cx - startX) + "px";
      card.style.top  = (startTop  + cy - startY) + "px";
    }

    document.addEventListener("mousemove",  e => onMove(e.clientX, e.clientY));
    document.addEventListener("touchmove",  e => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

    function onEnd() {
      dragging = false;
      card.style.transition = "";
    }
    document.addEventListener("mouseup",  onEnd);
    document.addEventListener("touchend", onEnd);
  });
});
