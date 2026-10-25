(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // CA intentionally not published — keep copy disabled
  const copyBtn = document.getElementById("copy-ca");
  const caDisplay = document.getElementById("ca-display");
  if (copyBtn && caDisplay) {
    copyBtn.addEventListener("click", async () => {
      const ca = caDisplay.textContent.trim();
      if (!ca || ca === "CA Coming Soon") return;
      try {
        await navigator.clipboard.writeText(ca);
        const label = copyBtn.querySelector("span");
        if (label) {
          const prev = label.textContent;
          label.textContent = "Copied!";
          setTimeout(() => { label.textContent = prev; }, 1500);
        }
      } catch {
        // fallback for older browsers
        const range = document.createRange();
        range.selectNodeContents(caDisplay);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand("copy");
        sel.removeAllRanges();
      }
    });
  }
})();
