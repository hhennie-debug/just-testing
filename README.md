# ⚡ Alex Carter — Portfolio

A fast, modern, single-page developer portfolio built with **pure HTML, CSS & JavaScript** — no frameworks, no build step, no dependencies. Deploy it anywhere as static files.

## ✨ Features

- 🌗 **Dark / light mode** — toggle with saved preference + respects `prefers-color-scheme`
- ⌨️ **Typing animation** in the hero (skipped for reduced-motion users)
- 📊 **Animated stat counters** and skill bars triggered on scroll
- 🗂 **Project filtering** (All / Web Apps / Mobile / Open Source)
- 🧭 **Scroll-spy nav** with active-link highlighting + sticky glass navbar
- 📱 **Fully responsive** with a mobile hamburger drawer menu
- 📬 **Contact form** with client-side validation (ready to wire to Formspree/your API)
- ♿ **Accessible** — semantic landmarks, focus states, `prefers-reduced-motion` support
- 🎨 Design tokens via CSS custom properties — re-theme the whole site from one block

## 📁 Structure

```
/workspace
├── index.html        # All sections: hero, about, skills, projects, experience, testimonials, contact
├── css/style.css     # Tokens, components, animations, responsive rules
└── js/main.js        # Theme, nav, typing effect, reveal, counters, filters, form
```

## 🚀 Run locally

Any static server works:

```bash
python3 -m http.server 8090
# open http://localhost:8090
```

Or just double-click `index.html`.

## 🛠 Make it yours (5-minute checklist)

1. **Name & branding** — search/replace "Alex Carter" and `alex.carter` in `index.html`.
2. **Colors** — edit `--primary`, `--accent`, `--grad` at the top of `css/style.css`.
3. **Hero phrases** — update the `phrases` array in `js/main.js`.
4. **Projects** — duplicate a `<article class="project">` card; set `data-cat` to `web | mobile | opensource` and add real demo/GitHub links.
5. **Skills & timeline** — adjust percentages (`--w`) and copy in `index.html`.
6. **Contact form** — point the submit handler in `js/main.js` to [Formspree](https://formspree.io), Web3Forms, or your own endpoint.
7. **Resume** — drop `resume.pdf` in the root and update the "Download CV" link.
8. **Photo** — replace the `.avatar` initials block with `<img src="me.jpg" alt="Alex Carter">`.

## 🌐 Deploy

- **GitHub Pages**: push to `main`, then Settings → Pages → deploy from branch root.
- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop or connect the repo — no build command needed.

---

© 2026 Alex Carter. MIT licensed (see `LICENSE`).
