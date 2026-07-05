# Urban Company — Clickable Prototype

A clickable UI prototype of the Urban Company app, built as part of a PM internship assignment. Made with plain HTML, CSS and vanilla JS — no frameworks, no libraries.

---

## What is this?

This is a mobile prototype that simulates the core booking flow of the Urban Company app. You can click through screens, toggle dark/light mode, and explore the privacy features. It's not a real app, just an interactive demo.

The flow covered:
- Splash → Login → Age verification (adult & minor paths)
- Browse services → Add to cart → Schedule a slot
- Partner matching → Service in progress → Rating & tip
- My Bookings → Privacy Center (consent toggles, data access, erasure)

---

## How to run

No installation needed. Just serve it locally:

```bash
cd Urban_company_Prototype
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Or just open `index.html` directly in a browser (some features may not work due to CORS on file://).

---

## Tech used

- HTML5
- Vanilla CSS (custom properties for theming)
- Vanilla JavaScript (no jQuery, no React, nothing)
- Google Fonts — Inter + Outfit

---

## File structure

```
Urban_company_Prototype/
├── index.html      → shell / phone frame
├── style.css       → all styling, light + dark theme
├── app.js          → screen logic, state, navigation
└── README.md       → this file
```

---

## Features

- **Light / Dark mode** — toggle button in the top-right corner of the phone frame
- **Minor account flow** — select "Rohan (16)" in signup to trigger parental gate
- **Live consent toggles** — consent changes reflect immediately without re-rendering
- **Smooth transitions** — no page flashes, pure DOM updates for interactive elements
- **Floating cart** — slides up when you add a service, slides away when removed
- **Privacy Center** — view data summary, toggle consents, request erasure

---

## Known limitations

- Only the AC Service booking flow is fully interactive. Other categories (Cleaning, Salon etc.) show a demo notice.
- No backend — all data is stored in a JS state object in memory, resets on refresh.
- Designed for a 375×760 viewport (standard mobile size).

---

## Screenshots

Run it and see for yourself, it's better live.

---

Made by Anshu Singh  
B.Tech CSE · PM Intern Assignment · July 2026
