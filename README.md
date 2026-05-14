# Mohamed Aadhil — Portfolio

Personal portfolio of Mohamed Aadhil — Software Engineer & Full-Stack Developer.
Built with React + Vite, Three.js, Framer Motion, and EmailJS.

Live: <https://aadhil-official.github.io/Aadhil.github.io/>

## Tech stack

- **Build**: Vite 5 (SWC React plugin) + Terser
- **UI**: React 18, Framer Motion, custom CSS (design tokens + dark/light)
- **3D**: Three.js (hero scene)
- **Forms**: Zod validation + EmailJS + react-hot-toast
- **SEO**: Meta tags, Open Graph, Twitter Cards, JSON-LD (Person + WebSite), sitemap, robots.txt, web manifest

## Getting started

```bash
# Node 18+
npm install

# Copy env template and fill in your EmailJS keys
cp .env.example .env

npm run dev        # http://localhost:5173
npm run build      # production build → ./build
npm run preview    # preview built site
npm run deploy     # publish ./build to gh-pages
```

## Project structure

```
.
├── index.html                # SEO meta, OG/Twitter, JSON-LD, manifest
├── public/                   # Static assets (served as-is)
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   ├── og-image.jpg          # Social share card
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── App.jsx               # Main component (nav, sections, form)
│   ├── main.jsx              # Entry
│   ├── assets/               # Imported assets (MyPic, CV)
│   ├── context/
│   │   └── ThemeContext.jsx  # Dark/light theme provider
│   ├── styles/
│   │   └── global.css        # Design tokens + all styles
│   └── utils/
│       └── toastify.js       # Toast helpers
├── vite.config.js            # Build config (chunking, minify)
└── .env.example              # EmailJS keys template
```

## Environment variables

Create `.env` from `.env.example`:

| Variable | Description |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## SEO checklist

- [x] Unique, keyword-rich `<title>` and `<meta name="description">`
- [x] Canonical URL
- [x] Open Graph (Facebook/LinkedIn) and Twitter Card meta
- [x] JSON-LD structured data: `Person` + `WebSite`
- [x] `robots.txt` + `sitemap.xml`
- [x] `site.webmanifest` (PWA-ready)
- [x] Semantic HTML (header, nav, sections, footer, h1/h2)
- [x] `lang="en"`, `viewport`, `theme-color`
- [x] Skip-to-content link for accessibility
- [x] `aria-label`s on icon-only buttons and nav

After deploy, submit the sitemap at:

- Google Search Console: <https://search.google.com/search-console>
- Bing Webmaster Tools: <https://www.bing.com/webmasters>

## Deploy

The site is configured to deploy to GitHub Pages. After `npm run build`:

```bash
npm run deploy
```

This publishes the contents of `build/` to the `gh-pages` branch.

## License

MIT © Mohamed Aadhil
