/* =========================================================
   Portfolio — main.js
   Theme toggle, mobile nav, typing effect, scroll reveal,
   active nav links, counters, project filters, form handling
   ========================================================= */
(() => {
  "use strict";

  /* ---------- Theme (dark/light) with localStorage ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) root.setAttribute("data-theme", "dark");

  themeToggle.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );

  /* ---------- Nav shadow on scroll + back-to-top button ---------- */
  const nav = document.getElementById("nav");
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    toTop.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Typing effect ---------- */
  const typedEl = document.getElementById("typed");
  const phrases = [
    "web apps that scale 💻",
    "delightful user interfaces 🎨",
    "REST & GraphQL APIs ⚙️",
    "developer tools people love 🧰",
    "your next big idea 🚀",
  ];
  let pi = 0, ci = 0, deleting = false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    typedEl.textContent = phrases[0];
  } else {
    (function type() {
      const word = phrases[pi];
      typedEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) { ci++; setTimeout(type, 70); }
      else if (!deleting) { deleting = true; setTimeout(type, 1800); }
      else if (ci > 0) { ci--; setTimeout(type, 35); }
      else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 350); }
    })();
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- Animated counters ---------- */
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        const dur = 1400;
        const t0 = performance.now();
        (function tick(t) {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".stat__num").forEach((el) => counterIO.observe(el));

  /* ---------- Active nav link highlighting ---------- */
  const sections = [...document.querySelectorAll("section[id]")];
  const linkMap = {};
  document.querySelectorAll(".nav__link").forEach((a) => (linkMap[a.getAttribute("href").slice(1)] = a));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          Object.values(linkMap).forEach((a) => a.classList.remove("active"));
          linkMap[e.target.id]?.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Project filters ---------- */
  const filterWrap = document.getElementById("filters");
  const projects = [...document.querySelectorAll(".project")];
  filterWrap.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".filter-btn");
    if (!btn) return;
    filterWrap.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    projects.forEach((p) => p.classList.toggle("hidden", f !== "all" && p.dataset.cat !== f));
  });

  /* ---------- Contact form (client-side validation demo) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let ok = true;

    form.querySelectorAll(".field").forEach((f) => f.classList.remove("invalid"));
    const mark = (input) => { input.closest(".field").classList.add("invalid"); ok = false; };
    if (!name) mark(form.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) mark(form.email);
    if (message.length < 10) mark(form.message);

    if (!ok) {
      status.textContent = "Please fix the highlighted fields ✋";
      status.className = "form-status err";
      return;
    }
    // Hook this up to Formspree / your own API endpoint to actually send.
    status.textContent = `Thanks, ${name}! Your message has been sent. 🎉`;
    status.className = "form-status ok";
    form.reset();
  });
})();
