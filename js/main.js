document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".nav__item--dropdown");

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(".nav__toggle");
    const menu = dd.querySelector(".subnav");
    if (!toggle || !menu) return;

    let closeTimer = null;
    const closeDelay = 160;

    const open = () => {
      if (closeTimer) clearTimeout(closeTimer);
      dd.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        dd.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }, closeDelay);
    };

    dd.addEventListener("mouseenter", open);
    dd.addEventListener("mouseleave", close);

    toggle.addEventListener("focus", open);
    dd.addEventListener("focusin", open);
    dd.addEventListener("focusout", (e) => {
      if (!dd.contains(e.relatedTarget)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dd.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".nav-toggle.site-nav--mobile");
  const drawer = document.querySelector(".nav-drawer.site-nav--mobile");
  const backdrop = drawer?.querySelector(".nav-drawer__backdrop");
  const closeBtn = drawer?.querySelector(".nav-drawer__close");

  if (!openBtn || !drawer || !backdrop || !closeBtn) return;

  const open = () => {
    document.body.classList.add("nav-open");
    drawer.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    document.body.classList.remove("nav-open");
    drawer.setAttribute("aria-hidden", "true");
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  const accToggle = drawer.querySelector(".drawer-acc__toggle");
  const panelId = accToggle?.getAttribute("aria-controls");
  const accPanel = panelId ? document.getElementById(panelId) : null;

  if (!accToggle || !accPanel) return;

  accToggle.addEventListener("click", () => {
    const isOpen = accToggle.getAttribute("aria-expanded") === "true";
    accToggle.setAttribute("aria-expanded", String(!isOpen));
    accPanel.hidden = isOpen;
  });

  drawer.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) close();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navClose = document.querySelector(".nav-drawer__close");
  const navBackdrop = document.querySelector(".nav-drawer__backdrop");

  function openDrawer() {
    document.body.classList.add("nav-open");
  }

  function closeDrawer() {
    document.body.classList.remove("nav-open");
  }

  if (navToggle) {
    navToggle.addEventListener("click", openDrawer);
  }

  if (navClose) {
    navClose.addEventListener("click", closeDrawer);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeDrawer);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
      closeDrawer();
    }
  });

  const accordions = document.querySelectorAll(".drawer-acc");

  accordions.forEach((accordion) => {
    const toggle = accordion.querySelector(".drawer-acc__toggle");
    const panel = accordion.querySelector(".drawer-acc__panel");

    if (toggle && panel) {
      const panelId =
        panel.id || `accordion-panel-${Math.random().toString(36).slice(2, 9)}`;
      panel.id = panelId;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", panelId);
      panel.setAttribute("hidden", "");

      toggle.addEventListener("click", () => {
        const isOpen = accordion.classList.contains("is-open");

        if (isOpen) {
          accordion.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          panel.setAttribute("hidden", "");
        } else {
          accordion.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
          panel.removeAttribute("hidden");
        }
      });
    }
  });

  const dropdowns = document.querySelectorAll(".nav__item--dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav__toggle");

    if (toggle) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = dropdown.classList.contains("is-open");

        dropdowns.forEach((d) => d.classList.remove("is-open"));

        if (!isOpen) {
          dropdown.classList.add("is-open");
        }
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav__item--dropdown")) {
      dropdowns.forEach((d) => d.classList.remove("is-open"));
    }
  });
});

const leftCol = document.querySelector(".hero-mid__media");
const rightCol = document.querySelector(".hero-mid__content");

if (leftCol && rightCol) {
  const speed = 6;
  const lerp = 0.09;

  let current = 0;
  let target = 0;
  let rafId = 0;

  const tick = () => {
    current += (target - current) * lerp;

    const x = current * speed;
    leftCol.style.transform = `translate3d(${-x}px,0,0)`;
    rightCol.style.transform = `translate3d(${x}px,0,0)`;

    if (Math.abs(target - current) > 0.1) {
      rafId = requestAnimationFrame(tick);
    } else {
      current = target;
      rafId = 0;
    }
  };

  const onScroll = () => {
    target = window.scrollY;
    if (!rafId) rafId = requestAnimationFrame(tick);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
