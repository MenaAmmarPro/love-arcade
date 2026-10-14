# Love Arcade — for Mena

Ten tiny, gentle games with collectable badges and a saved best-score board.
Part of the **Love for Mena** collection.

**Live:** https://menaammarpro.github.io/love-arcade/

## Games

Bubble pop · Catch falling hearts · Memory match · Pet the kitty · Whack a
heart · Flappy heart · 2048 hearts · Constellation connect · Word scramble ·
Puzzle slider.

Each game unlocks a badge when you hit its goal, and your personal best is kept
on the device. Everything is offline-capable and installable as a PWA.

## Files

- `index.html` — the arcade
- `css/theme.css` — shared love-theme (copied from `_love-theme/`)
- `css/app.css` — page-specific styles
- `js/theme-main.js`, `js/effects.js` — shared behaviour/effects
- `js/games.js` — the ten games
- `js/arcade.js` — badge/best-score persistence
- `manifest.webmanifest`, `sw.js` — PWA
- `assets/` — favicon and icons

## Run locally

```powershell
py -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

Static site, deployed with GitHub Pages from `main`.

## License

Creative Commons BY-NC-ND 4.0 — see [`LICENSE`](LICENSE).
© 2026 Ammar (MenaAmmarPro). Made with care for Mena.
