Project: KayMetrics Portfolio Hub

What this is

The main landing page for kaymetrics.com — a portfolio of interactive data dashboards built by Kelvin Kay. Users land here, read the brand proposition, and browse all available dashboards.

Live URL

https://kaymetrics.com (deployed via Vercel)

Stack


React + Vite
CSS modules for styling
No charting libraries needed on this page
No external APIs


Branding


Brand name: KayMetrics
Tagline: Built for Decisions, Not Decoration (no S at the end — this is locked)
Logo mark: K with white vertical stroke + blue pulse line as the lower arm of the K, with a dot at the end of the pulse


Logo Files

All logo files are located at: D:\ClaudePro\kaymetrics\logos\

FileDescriptionUsekaymetrics-logo-dark.pngFull logo (mark + wordmark + tagline) on dark blue background, wide/banner formatSite header, TikTok banner, LinkedIn bannerkaymetrics-logo-transparent.pngFull logo on black/transparent background, wide formatEmbedding on dark backgrounds in site or decksKaymetrics_Logo_fav.pngK mark only, square, dark blue background, no rounded cornersFavicon, small icon contextsKaymetrics_Logo_stacked.pngFull stacked logo in square format on dark blueTikTok profile picture, social media square formatkaymetrics-avatar.pngK mark only, square with rounded cornersApp icon, GitHub avatar, TikTok/LinkedIn profile picture

Logo usage rules


Never use emoji as icons anywhere in the UI
Use Kaymetrics_Logo_fav.png as the favicon across all dashboards and the hub
Use kaymetrics-logo-dark.png in the site header
Use Kaymetrics_Logo_fav.png (K mark) as the icon on dashboard cards — not the stacked logo
The K mark should appear consistently across all dashboard cards


Design


Modern Blue colour scheme:

Background: #0a1628
Surface/cards: #162447
Primary accent: #3b82f6
Text primary: #ffffff
Text secondary: #94a3b8
Borders: #1f3a6e



Visual direction: clean, dark, data-forward. Cards should feel elevated not flat — use subtle box-shadow and slight gradient on surfaces. Reference: Dashdark-style UI depth.


Structure

Each dashboard is represented as a card showing:


K mark icon (Kaymetrics_Logo_fav.png) as the dashboard icon
Dashboard title
Short description
Category tag (Sports / Music / Finance etc)
"View Dashboard" button linking to the live URL


Current dashboards


World Cup 2026 — Category: Sports — URL: https://worldcup-ochre.vercel.app
Spotify Dashboard — Category: Music — Status: Coming Soon


Rules for Claude


Keep it clean, minimal, and fast loading
Mobile responsive; cards stack on mobile
Subtle depth on cards (box-shadow, slight gradient) — not flat
Use functional components only
CSS modules for all styling
Never use emoji as icons — always use the K mark SVG/PNG
Tagline "Built for Decisions, Not Decoration" must appear in the hero section
Favicon must be Kaymetrics_Logo_fav.png on every page and dashboard