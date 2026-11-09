# SARANAM — The Ayyappa Journey

A cinematic, educational, mobile-responsive, static website prototype about Lord Ayyappa, the 41-day Mandala Vratham, Guru Swamy, Sarana Ghosha and the Sabarimala pilgrimage.

## Preview

Open `index.html` in a browser, or start a local static server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Deploy to Cloudflare Pages

1. Create a new empty GitHub repository and add all the files in this folder (including `assets/`).
2. Connect the repository to Cloudflare Pages using **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command: leave blank. Output directory: `/` (repository root), or use `.` if the UI requires a directory value.
4. Deploy. There are no required API keys, server components or build dependencies.

Alternatively use `npx wrangler pages deploy . --project-name saranam-ayyappa` from this folder after signing in to Cloudflare.

## Implemented

- Looping, muted cinematic hero using a user-provided video, optimized to 1.9 MB
- Responsive navigation, motion controls and reduced-motion support
- Sourced story, 41-day Vratham guide and practices by topic
- 41-day daily reflections, interactive progress calendar stored privately in the browser
- Sarana Ghosha starter invocations with Telugu/transliteration toggle
- Guru Swamy / Irumudi / pilgrimage explainer
- Curated external source links and FAQs
- No tracking, accounts, or third-party JavaScript

## Content and editorial limitations

- This is an **independent educational prototype**, not an official Sabarimala site.
- Temple stories are identified as devotional tradition, not independently proven history.
- Full Puranic text verification, transcript-review of discourses, regional rule differences, complete chant collections, audio pronunciations and teacher review remain future editorial phases.
- Ritual specifics require confirmation with a trusted Guru Swamy and current official temple guidance.
- No YouTube videos are downloaded or reproduced; links point to external sources.
- The 41-day reflection calendar is a non-prescriptive companion, not a list of mandatory observances.

## Main references

- Official Sabarimala: https://sabarimala.kerala.gov.in/about-lordayyappa
- Official Sabarimala rituals: https://sabarimala.kerala.gov.in/rituals
- Kerala Tourism: https://www.keralatourism.org/sabarimala/rituals
- Kerala Tourism overview: https://www.keralatourism.org/destination/sabarimala-temple/47/
- Telugu discourse listing: https://www.pravachanam.com/albums/swamy-ayyappa
- Sanskrit Documents Ayyappa collection: https://sanskritdocuments.org/iast/ayyappa/

## Suggested next versions

**V1 editorial:** Expert-reviewed story articles with source-level citations and regional-variation markers, Telugu-language parity, pronunciation-reviewed Sarana Ghosha, original prayer audio when rights are cleared.

**V2 companion:** Daily schedule customization, reminders (opt-in), routines and recipes, offline-first experience, reader bookmarks, private notes.

**V3 pilgrimage:** Guru Swamy-reviewed step-by-step guides, practical packing/checklists, latest official regulations, transit links, accessibility, local-language guidance.

**V4 content platform:** Markdown-based editorial CMS, review workflow, bibliography, YouTube resource index with transcript permissions, search, glossary and accessibility audit.

## Assets

`assets/ayyappa-forest.mp4` is a compressed version of the user's supplied video. `assets/hero-poster.jpg` is a poster frame. No third-party stock imagery is packaged.