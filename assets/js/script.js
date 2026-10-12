// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Pixxen  Financial Advisor js start
 // Financial Advisor Cards reveal JS
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.financeadvice-card-reveal');
  if (!cards.length) return;

  // ---- tweak these ----
  const STAGGER = 220;   // ms between cards revealed together
  const DURATION = 1300; // ms for each card's reveal
  // ---------------------

  // arm the cards (so they stay visible if JS fails)
  cards.forEach((card) => {
    card.style.setProperty('--duration', `${DURATION}ms`);
    card.classList.add('is-ready');
  });
  void document.body.offsetHeight; // force reflow so the first transition plays

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        // reveal in DOM order (left to right, top to bottom)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left
        )
        .forEach((entry, i) => {
          const card = entry.target;
          card.style.setProperty('--delay', `${i * STAGGER}ms`);
          card.classList.add('is-revealed');

          card.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform') card.classList.add('is-done');
          });

          observer.unobserve(card);
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  cards.forEach((card) => observer.observe(card));
});

// 
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.financeadvice-serving-slider').forEach(function (root) {
    const section = root.closest('section');
    const prev = section.querySelector('.financeadvice-serving-prev');
    const next = section.querySelector('.financeadvice-serving-next');

    if (!prev || !next) {
      console.warn('Client slider navigation buttons not found.');
      return;
    }

    const splide = new Splide(root, {
      type: 'loop',
      perPage: 4.5,
      perMove: 1,
      gap: '1.5rem',
      arrows: false,
      pagination: false,
      drag: true,
      breakpoints: {
        1279: { perPage: 3.5 },
        1023: { perPage: 2.5 },
        767: { perPage: 1.5 },
        639: { gap: '1rem' },
      },
    });

    prev.addEventListener('click', function (e) {
      e.preventDefault();
      splide.go('<');
    });

    next.addEventListener('click', function (e) {
      e.preventDefault();
      splide.go('>');
    });

    const lastLeft = new WeakMap();

    function updateOpacity() {
      const viewportWidth = document.documentElement.clientWidth;
      const tolerance = 4;
      const slides = root.querySelectorAll('.splide__slide');

      // Detect a teleport: a card suddenly moving more than its own width
      let jumped = false;
      slides.forEach(function (slide) {
        const r = slide.getBoundingClientRect();
        const before = lastLeft.get(slide);
        if (before !== undefined && r.width > 0 && Math.abs(r.left - before) > r.width) {
          jumped = true;
        }
        lastLeft.set(slide, r.left);
      });

      if (jumped) root.classList.add('is-jumping');

      slides.forEach(function (slide) {
        const r = slide.getBoundingClientRect();
        const inside =
          r.width > 0 &&
          r.left >= -tolerance &&
          r.right <= viewportWidth + tolerance;
        slide.classList.toggle('is-fully-visible', inside);
      });

      if (jumped) {
        void root.offsetWidth; // flush styles so the change applies without animating
        requestAnimationFrame(function () {
          root.classList.remove('is-jumping');
        });
      }
    }

    let rafId = null;
    function trackMovement() {
      cancelAnimationFrame(rafId);
      const end = performance.now() + (splide.options.speed || 400) + 150;

      (function loop() {
        updateOpacity();
        if (performance.now() < end) rafId = requestAnimationFrame(loop);
      })();
    }

    function settle() {
      updateOpacity();
      requestAnimationFrame(updateOpacity);
      setTimeout(updateOpacity, 150);
      setTimeout(updateOpacity, 500);
    }

    splide.on('mounted resized refresh', settle);
    splide.on('move', trackMovement);
    splide.on('dragging scrolling moved dragged', updateOpacity);

    splide.mount();

    window.addEventListener('load', settle);
    window.addEventListener('resize', updateOpacity);
  });
});

// 
// Pool counter JS
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll(".financeadvice-counter-item");

  counters.forEach((counter) => {
    const rawVal =
      counter.getAttribute("data-value") || counter.textContent.trim();

    const prefix = counter.getAttribute("data-prefix") || "";
    const suffix = counter.getAttribute("data-suffix") || "";

    const cleanVal = rawVal.replace(/[^\d.]/g, "");
    const chars = cleanVal.split("");
    const isSingleDigit = cleanVal.replace(".", "").length === 1;

    counter.innerHTML = "";

    if (prefix) {
      const pSpan = document.createElement("span");
      pSpan.innerHTML = prefix;
      counter.appendChild(pSpan);
    }

    chars.forEach((char, index) => {
      if (char === ".") {
        const dot = document.createElement("span");
        dot.textContent = ".";
        counter.appendChild(dot);
        return;
      }

      const col = document.createElement("span");
      col.className = "financeadvice-counter-digit-col";

      const list = document.createElement("span");
      list.className = "financeadvice-counter-digit-list";

      const finalNum = parseInt(char, 10);

      // Standardize the roll: 0 through 9, ending with the specific finalNum
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, finalNum];

      numbers.forEach((num) => {
        const numSpan = document.createElement("span");
        numSpan.textContent = num;
        list.appendChild(numSpan);
      });

      col.appendChild(list);
      counter.appendChild(col);

      // Ensure first digit (index 0) starts cleanly from top
      let startY = 0;

      if (index === 0) {
        startY = 0;
      } else if (!isSingleDigit && index % 2 !== 0) {
        startY = 100;
      } else {
        startY = -100;
      }

      ScrollTrigger.create({
        trigger: counter,
        start: "top bottom",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            list,
            {
              yPercent: startY,
            },
            {
              yPercent: -((numbers.length - 1) * (100 / numbers.length)),
              duration: 2.8,
              ease: "expo.out",
              delay: index * 0.1,
            },
          );
        },
      });
    });

    if (suffix) {
      const sSpan = document.createElement("span");
      sSpan.innerHTML = suffix;
      counter.appendChild(sSpan);
    }
  });
});

// 
/**
 * Finance Advisor hero – GSAP + ScrollTrigger
 * Load before this file:
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
 * Buttons are intentionally not animated.
 */
/**
 * Finance Advisor hero – GSAP + ScrollTrigger
 * Load before this file:
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
 * Buttons are intentionally not animated.
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Split text into words, each inside a clipping mask (same reveal as the section headings)
  function splitWords(el) {
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-label', text);
    el.innerHTML = '';

    return text.split(' ').map((word, i, arr) => {
      const mask = document.createElement('span');
      mask.setAttribute('aria-hidden', 'true');
      mask.style.cssText =
        'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.08em;';

      const inner = document.createElement('span');
      inner.style.cssText = 'display:inline-block;will-change:transform;';
      inner.textContent = word;

      mask.appendChild(inner);
      el.appendChild(mask);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
      return inner;
    });
  }

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const titleEl = document.querySelector('.financeadvice-hero-title');
    const subtitleEl = document.querySelector('.financeadvice-hero-subtitle');
    const titleWords = titleEl ? splitWords(titleEl) : [];
    const subtitleWords = subtitleEl ? splitWords(subtitleEl) : [];

    const img = document.querySelector('.financeadvice-hero-img');
    const section = document.querySelector('.financeadvice-hero-title')?.closest('section');
    const checkIcons = gsap.utils.toArray('.financeadvice-hero-checklists img');

    // Price count-up: wrap the number so only it animates
    const priceEl = document.querySelector('.financeadvice-hero-pricebox p');
    let priceNum = null;
    let priceTarget = 0;
    if (priceEl) {
      priceEl.innerHTML = priceEl.textContent.replace(
        /(\d[\d,]*)/,
        '<span class="fa-price-num" style="font-variant-numeric:tabular-nums">$1</span>'
      );
      priceNum = priceEl.querySelector('.fa-price-num');
      priceTarget = parseInt(priceNum.textContent.replace(/,/g, ''), 10);
    }
    const counter = { val: priceTarget };

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.financeadvice-hero-title',
        start: 'top 85%',
        toggleActions: 'play none none none', // play once; use 'play none none reverse' to replay
        once: true
      },
      defaults: {
        ease: 'power3.out',
        duration: 0.8
      }
    });

    heroTl
      .from(titleWords, { yPercent: 110, rotate: 3, duration: 0.9, stagger: 0.07 }, 0)
      .from(subtitleWords, { yPercent: 110, rotate: 3, duration: 0.9, stagger: 0.05 }, '-=0.5')
      .from('.financeadvice-hero-desc', { y: 30, opacity: 0 }, '-=0.5')
      .from('.financeadvice-hero-pricebox', { y: 20, opacity: 0 }, '-=0.3')
      .from(
        '.financeadvice-hero-divider',
        { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power2.inOut' },
        '-=0.4'
      )
      .from('.financeadvice-hero-checklists li', { x: -20, opacity: 0, stagger: 0.1 }, '-=0.3')
      .from(
        checkIcons,
        { scale: 0, rotate: -90, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
        '<'
      )
      // Starts at 0 so it fires together with the title
      .from(
        '.financeadvice-hero-img',
        { scale: 0.92, y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' },
        0
      );

    if (priceNum) {
      gsap.set(counter, { val: 0 });
      priceNum.textContent = '0';
      heroTl.to(
        counter,
        {
          val: priceTarget,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            priceNum.textContent = Math.round(counter.val).toLocaleString('en-US');
          }
        },
        '-=1.6'
      );
    }

    // Idle float once the intro finishes
    heroTl.add(() => {
      if (!img) return;
      gsap.to(img, { y: -10, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });

    // Light scroll parallax on the mockup
    if (img && section) {
      gsap.to(img, {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    }
  });
});

// 
/**
 * Heading reveal – GSAP + ScrollTrigger
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const headings = gsap.utils.toArray('.financeadvice-heading-reveal');
  if (!headings.length) return;

  // Split heading text into words, each inside a clipping mask
  function splitWords(el) {
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-label', text);
    el.innerHTML = '';

    return text.split(' ').map((word, i, arr) => {
      const mask = document.createElement('span');
      mask.setAttribute('aria-hidden', 'true');
      mask.style.cssText =
        'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.08em;';

      const inner = document.createElement('span');
      inner.style.cssText = 'display:inline-block;will-change:transform;';
      inner.textContent = word;

      mask.appendChild(inner);
      el.appendChild(mask);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
      return inner;
    });
  }

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    headings.forEach((heading) => {
      const words = splitWords(heading);

      gsap.fromTo(
        words,
        { yPercent: 110, rotate: 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    // Re-measure after fonts load so trigger positions are accurate
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  });
});