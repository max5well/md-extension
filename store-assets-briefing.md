# Copy as Markdown — Chrome Web Store Image Production Briefing

**Product:** Copy as Markdown (Chrome Extension)
**Date:** 2026-04-07
**Tool:** Nanobanana 2 (AI image generation)
**Designer notes:** Each section contains a copy-pasteable Nanobanana prompt. Prompts are written left-to-right, top-to-bottom. Drop the prompt block directly into Nanobanana with no modification and it should land at ~90%. Iterate on color fidelity and typography weight first.

---

## Brand Tokens — Quick Reference

| Token | Value |
|---|---|
| Background | `#160828` (deep purple) |
| Card background | `#1e0f35` |
| Gradient | `linear-gradient(135deg, #EC008C 0%, #00DCC8 100%)` |
| Magenta | `#EC008C` |
| Turquoise | `#00DCC8` |
| White | `#FFFFFF` |
| Muted text | `#9b8db0` |
| Glow style | Soft box-shadow in magenta or teal, 40% opacity, blur 40–60px |
| Logo shape | Rounded square, corner radius 14px, magenta→turquoise gradient fill, lowercase white "md" in Helvetica Neue Bold, centered |
| Card radius | 12px |
| Font stack | Helvetica Neue, Inter, system-ui |

---

## Asset 1 — Store Icon (128×128px)

**Purpose:** Primary icon shown in the Chrome Web Store listing and on the browser toolbar.
**Dimensions:** 128×128px

**Status:** Already complete. Use existing file `icon128.png`. No generation needed.

---

## Asset 2 — Marquee / Hero Banner (1400×560px)

**Purpose:** Chrome Web Store hero slot — the large promotional banner shown at the top of the listing page. This is the highest-visibility asset.
**Dimensions:** 1400×560px

**Nanobanana Prompt:**

```
UI product marketing banner, 1400x560px, horizontal orientation.

Background: solid deep purple #160828 filling the entire canvas.

LEFT ZONE (leftmost 30% of canvas, ~420px wide): vertically centered in this zone, a rounded square logo tile, 160x160px, corner radius 14px, filled with a linear gradient from #EC008C (magenta, top-left) to #00DCC8 (turquoise, bottom-right) at 135 degrees. On top of the gradient, centered, the lowercase text "md" in Helvetica Neue Bold, color #FFFFFF, font-size approximately 72px, letter-spacing tight. Behind the logo tile, a soft radial glow: color #EC008C at 40% opacity, blur radius 60px, spread 20px, no hard edge.

CENTER ZONE (middle 40% of canvas, ~560px wide): vertically centered. Line 1: headline text "Copy any page as Markdown." in Helvetica Neue Bold, color #FFFFFF, font-size approximately 38px, letter-spacing -0.5px, no line break. Line 2: 16px gap below headline. Subtitle text "One click. No clutter. LLM-ready." in Inter Regular, color #9b8db0, font-size approximately 20px, letter-spacing 0px.

RIGHT ZONE (rightmost 30% of canvas, ~420px wide): three pill-shaped app badge rows stacked vertically with 14px gaps between them, all vertically centered as a group. Each pill: height 52px, rounded corners 26px, background slightly lighter than canvas (#1e0f35), left-padded 14px. Pill 1 (top): small circular icon in ChatGPT green (#10a37f), 28px diameter, followed by 10px gap, then text "ChatGPT" in Inter Medium #FFFFFF, font-size 16px. Pill 2 (middle): small circular icon in Claude orange (#cc785c), 28px, text "Claude" in Inter Medium #FFFFFF. Pill 3 (bottom): small circular icon in white (#FFFFFF), 28px, text "Notion" in Inter Medium #FFFFFF. Connecting the center of the logo tile to the left edge of the pill stack: a thin 1.5px line, color gradient #EC008C to #00DCC8, with a small arrowhead at the right end pointing right, color #00DCC8.

BOTTOM EDGE OVERLAY: a full-width horizontal bar 80px tall anchored to the bottom edge, filled with linear-gradient(90deg, #EC008C 0%, #00DCC8 100%) at 15% opacity, blended softly upward (gradient alpha fades from 15% at bottom to 0% at top of the bar).

Mood: dark, premium, minimal, high-end SaaS — evokes Linear or Vercel launch graphics. No stock photography. No decorative shapes other than what is described. Clean negative space dominates.
```

**Notes:**
- Asset 8 (Marquee Promo Tile) is identical to this asset. Reuse this file for both slots.
- Verify the gradient connector line between logo and pills reads clearly on dark bg — may need to increase opacity to 80% if it disappears.

---

## Asset 3 — Screenshot 1 (1280×800px)

**Purpose:** First screenshot slot. Communicates the core value prop: messy web → clean Markdown in one click.
**Dimensions:** 1280×800px

**Nanobanana Prompt:**

```
UI product screenshot, 1280x800px, dark mode browser mockup.

TOP BAR (outside browser chrome, full width, height 48px): solid #160828 background. Left half contains white text "Before" in Inter Medium 18px, right half contains white text "After" in Inter Medium 18px. Centered between them, a right-pointing arrow glyph (→) in a gradient fill from #EC008C to #00DCC8, size 24px.

BROWSER CHROME FRAME (below top bar, full width, approximately 56px tall): macOS-style dark browser chrome in #1a1a2e. Left side: three traffic light circles (red, yellow, green) at 12px diameter. Center: a URL bar pill with rounded corners, light gray #2a2a3e fill, displaying text "en.wikipedia.org/wiki/Markdown" in gray #888, font-size 13px. Right side: toolbar icons including the extension icon — a 20px rounded square with the magenta→turquoise gradient and white "md" text visible.

BROWSER CONTENT AREA (below chrome frame, full width, remaining height ~696px): split vertically into two equal halves with a 2px vertical divider line in the center running full height, filled with linear-gradient(180deg, #EC008C 0%, #00DCC8 100%).

LEFT HALF OF BROWSER CONTENT (~638px wide): simulates a Wikipedia-style article page. White background #f8f8f8. Top: a gray navigation bar 40px tall with blue link text "Wikipedia" and placeholder nav items. Below nav: a two-column layout — left column 200px wide sidebar with placeholder blue links in a list and a gray box labeled "Contents"; main column with a large black H1 headline "Markdown", a small italic gray subtitle, then body text in 14px black Times-style serif in three short paragraphs. Scattered across the layout: three semi-transparent red rectangles at 35% opacity, each with a white text label — one labeled "Ads" over a sidebar ad placeholder, one labeled "Nav" over the top navigation bar, one labeled "Sidebar" over the left column. These overlays indicate noise/clutter to be removed.

RIGHT HALF OF BROWSER CONTENT (~638px wide): dark code editor panel background #1e0f35. Padding 24px on all sides. Content is clean Markdown text rendered in a monospace font (JetBrains Mono or similar), color #e0e0e0, font-size 13px, line-height 1.6. Lines shown (top to bottom): "# Markdown" in white bold, then ">" followed by "Source: https://en.wikipedia.org/wiki/Markdown" in #9b8db0, blank line, "## Introduction" in white bold, then three lines of body paragraph text in #e0e0e0, blank line, "## History" in white bold, two bullet points starting with "-", blank line, a fenced code block with backtick delimiters showing two lines of example markdown syntax in #00DCC8. Subtle line numbers in #3a2a5a on the far left edge.

EXTENSION POPUP OVERLAY: floating card positioned in the top-right quadrant of the browser content area, 20px from the top of the content area and 20px from the right edge. Card size 240x160px, rounded corners 12px, background #1e0f35, subtle white border 1px at 12% opacity, soft drop shadow. Inside the card: top row has the 24px "md" logo icon (gradient square) and text "Copy as Markdown" in white Inter Medium 13px. Below: a full-width button 40px tall, rounded 8px, filled with linear-gradient(135deg, #EC008C, #00DCC8), white text "Copy Full Page" in Inter SemiBold 14px, centered.

Mood: technical, clear, satisfying — like a "before/after" product demo slide. High contrast between cluttered left and clean right.
```

**Notes:**
- The red overlay boxes on the left should feel like translucent annotation layers, not opaque blocks — ensure they're see-through enough that the Wikipedia layout is still legible beneath.
- The Markdown text on the right should look like real content, not lorem ipsum — use the specific lines listed above exactly.

---

## Asset 4 — Screenshot 2 (1280×800px)

**Purpose:** Second screenshot slot. Communicates the "Prettify" token-reduction feature with a data-forward visual.
**Dimensions:** 1280×800px

**Nanobanana Prompt:**

```
UI product screenshot, 1280x800px, dark background, data visualization layout.

Background: solid #160828 filling the entire canvas.

TOP CENTER (y=40px, horizontally centered): a small pill badge, height 32px, horizontal padding 16px, rounded corners 16px, filled with linear-gradient(135deg, #EC008C 0%, #00DCC8 100%). Inside: uppercase text "TOKEN SAVER" in Helvetica Neue Bold 12px, color #FFFFFF, letter-spacing 1.5px.

CENTER ROW (vertically centered in canvas at approximately y=260px to y=520px): two large comparison boxes side by side, centered horizontally as a group with a 40px gap between them. Total group width approximately 900px.

LEFT BOX: 420x260px, rounded corners 12px, background #1e0f35, border 1px solid rgba(255,255,255,0.08). Inside, padding 28px. Top: label text "Full Copy" in Inter Regular 13px, color #9b8db0, uppercase, letter-spacing 1px. Below label, 8px gap: large number "4,200 tokens" in Helvetica Neue Bold 48px, color #FFFFFF. Below number, 16px gap: a block of dense markdown-style text in Inter Regular 12px, color #6a5a80, line-height 1.5, showing approximately 5 lines: "[img: banner.jpg](http://example.com/img/banner.jpg)", "**Introduction** — see also: [link1](#) [link2](#) [link3](#)", "text with [ref](https://...) and more [refs](https://...) embedded", "![alt text](image.png) and additional ![icon](icon.png)", "Source: [external](https://example.com/very/long/url/path)". This represents noisy markdown with image refs and link clutter.

RIGHT BOX: 420x260px, rounded corners 12px, background #1e0f35, border 2px solid transparent with background-clip border-box and a gradient border: linear-gradient(135deg, #EC008C 0%, #00DCC8 100%) — rendered as a glowing gradient border. Inside, padding 28px. Top: label text "Prettify Mode" in Inter Regular 13px, color #9b8db0, uppercase, letter-spacing 1px. Below label, 8px gap: large number "1,800 tokens" in Helvetica Neue Bold 48px, filled with gradient text from #EC008C to #00DCC8 (text gradient clipped to characters). Below number, 16px gap: a block of clean markdown text in Inter Regular 12px, color #c0b8d0, line-height 1.5, showing approximately 4 lines: "## Introduction", "Markdown is a lightweight markup language for creating formatted text.", "It was created by John Gruber in 2004.", "## Key Features". This represents clean, stripped markdown with no link noise.

BADGE BETWEEN BOXES (centered horizontally between left and right box, vertically centered on the boxes at y-midpoint): a circular badge 90x90px, filled with linear-gradient(135deg, #EC008C 0%, #00DCC8 100%), with a soft outer glow (magenta, 40% opacity, blur 20px). Inside the circle: text "−58%" in Helvetica Neue Black 28px, color #FFFFFF, centered.

BOTTOM SECTION (y approximately 560px to 660px): horizontally centered, showing the extension popup card. Card size 300x80px, rounded corners 12px, background #1e0f35, border 1px solid rgba(255,255,255,0.10). Inside: a single button spanning nearly full width, height 44px, rounded 8px, filled with linear-gradient(135deg, #EC008C, #00DCC8), text "✨ Prettify & Copy  TOKEN SAVER" in Inter SemiBold 14px, color #FFFFFF, centered. The button should appear highlighted/active with a subtle glow beneath it matching the gradient at 30% opacity.

Mood: data-driven, impactful, clean — like a SaaS pricing comparison or performance benchmark slide. No decorative elements outside what is specified.
```

**Notes:**
- The gradient border on the right box is the key differentiator — if Nanobanana renders it as a solid colored border instead, note this for manual Figma cleanup.
- The "−58%" badge should feel like an achievement/stat callout, bold and confident.

---

## Asset 5 — Screenshot 3 (1280×800px)

**Purpose:** Third screenshot slot. Shows compatibility with the full LLM/PKM ecosystem.
**Dimensions:** 1280×800px

**Nanobanana Prompt:**

```
UI product screenshot, 1280x800px, dark background, ecosystem diagram layout.

Background: solid #160828 filling the entire canvas.

CENTER: the "md" logo tile, 120x120px, rounded corners 14px, linear-gradient(135deg, #EC008C 0%, #00DCC8 100%) fill, lowercase white "md" in Helvetica Neue Bold 54px centered. Behind the logo, a soft radial glow: 50% magenta #EC008C at 35% opacity, blur 70px. Position this logo at the exact center of the canvas (x=640px, y=400px).

SURROUNDING THE CENTER LOGO: six app tiles arranged in a gentle elliptical arc. Each tile is 80x80px, rounded corners 14px. Tiles are positioned evenly around the center logo with approximately 200px radius from center. Placement (clockwise from top-left): top-left, top-right, middle-left, middle-right, bottom-left, bottom-right.

Tile 1 (top-left position): background #10a37f (ChatGPT green). Inside: the OpenAI "O" logo mark in white, 36px. Below logo mark: text label "ChatGPT" in Inter Medium 11px, color #FFFFFF, centered.

Tile 2 (top-right position): background #cc785c (Claude orange/terracotta). Inside: a stylized abstract Claude logo mark in white, 36px. Below: text "Claude" in Inter Medium 11px, #FFFFFF.

Tile 3 (middle-left position): background #1a73e8 (Google blue). Inside: a four-pointed Gemini star sparkle icon in white, 36px. Below: text "Gemini" in Inter Medium 11px, #FFFFFF.

Tile 4 (middle-right position): background #FFFFFF. Inside: the Notion "N" lettermark in black #191919, 36px. Below: text "Notion" in Inter Medium 11px, color #191919.

Tile 5 (bottom-left position): background #7c3aed (Obsidian purple). Inside: a crystal/gem shape icon outline in white, 36px. Below: text "Obsidian" in Inter Medium 11px, #FFFFFF.

Tile 6 (bottom-right position): background #1a1f36 (dark navy). Inside: a stylized "R" or leaf-node graph icon in white, 36px. Below: text "Roam" in Inter Medium 11px, #FFFFFF.

CONNECTOR LINES: thin 1.5px lines connecting from the edge of the center logo to the edge of each of the six surrounding tiles. Each line is filled with linear-gradient(from magenta #EC008C near center to turquoise #00DCC8 near tile). Lines should appear clean and straight, not curved.

CHECKMARK BADGES: on the top-right corner of each of the six app tiles, a small circular badge 18x18px, filled solid #00DCC8 turquoise, with a white "✓" checkmark glyph centered, font-size 11px bold. The badge overlaps the tile corner slightly (8px beyond the tile edge in each direction).

BOTTOM TAGLINE: at y approximately 680px, horizontally centered: text "One extension. Every tool." in Helvetica Neue Bold 28px, color #FFFFFF, letter-spacing -0.3px.

Mood: ecosystem, connected, premium — like a SaaS integrations page hero or an app marketplace feature callout. Balanced and geometric. No gradients on backgrounds other than what is specified.
```

**Notes:**
- If Nanobanana struggles with the elliptical arc layout, the fallback arrangement is a 2×3 grid of tiles centered below/above the logo — with the logo above the grid and the tagline below.
- Logo marks for ChatGPT, Claude, Notion etc. will likely be generic approximations — that is acceptable for the AI draft. Final production will require replacing with official brand assets (check each company's press kit for usage rights).

---

## Asset 6 — Screenshot 4 (1280×800px)

**Purpose:** Fourth screenshot slot. Privacy and trust signal — no accounts, no servers, no data sent.
**Dimensions:** 1280×800px

**Nanobanana Prompt:**

```
UI product screenshot, 1280x800px, dark background, trust/privacy layout.

Background: solid #160828 filling the entire canvas.

TOP CENTER (y=48px, horizontally centered): a small pill badge, height 32px, horizontal padding 16px, rounded corners 16px, filled with linear-gradient(135deg, #EC008C 0%, #00DCC8 100%). Inside: uppercase text "PRIVACY FIRST" in Helvetica Neue Bold 12px, color #FFFFFF, letter-spacing 1.5px.

CENTER ROW (vertically centered at approximately y=240px to y=480px): three cards arranged in a horizontal row, centered as a group, each card separated by 24px gaps.

Each card: 200x220px, rounded corners 14px, background #1e0f35, border 1px solid rgba(255,255,255,0.08), no drop shadow.

Card 1 (leftmost): Inside, padding 28px, all content centered. Top: a padlock icon, approximately 56x56px, filled with linear-gradient(135deg, #EC008C 0%, #00DCC8 100%). Below icon, 16px gap: label text "Local only" in Inter SemiBold 16px, color #FFFFFF. Below label, 8px gap: subtext "Runs entirely in your browser" in Inter Regular 13px, color #9b8db0, centered, line-height 1.4.

Card 2 (center): Inside, same padding and layout. Top: a server rack icon (three horizontal rectangles stacked, representing server hardware), 56x56px, same gradient fill. On top of the server icon, a red "×" overlay circle: 22px diameter circle with solid #ff4455 fill and white "×" text 14px inside, positioned at top-right of icon. Label: "No data sent" in Inter SemiBold 16px, #FFFFFF. Subtext: "Nothing ever leaves your device" in Inter Regular 13px, #9b8db0, centered.

Card 3 (rightmost): Inside, same layout. Top: a shield icon (shield outline with a checkmark inside), 56x56px, same gradient fill. Label: "No sign-up" in Inter SemiBold 16px, #FFFFFF. Subtext: "Works instantly, no account needed" in Inter Regular 13px, #9b8db0, centered.

HEADLINE BELOW CARDS (y approximately 520px, horizontally centered): text "Your data stays in your browser. Always." in Helvetica Neue Bold 28px, color #FFFFFF, letter-spacing -0.3px, centered.

Mood: trustworthy, minimal, reassuring — like a security company's trust page or a privacy policy illustration. Extremely clean. No gradients or decorative elements beyond what is listed.
```

**Notes:**
- The three icons (padlock, server-with-X, shield) should feel like a consistent icon set — same stroke weight, same visual style. If Nanobanana generates mismatched styles, note for Figma cleanup.
- The gradient fill on the icons is the key brand touch — ensure the icons do not render in flat white or flat color.

---

## Asset 7 — Small Promo Tile (440×280px)

**Purpose:** Small promotional tile for the Chrome Web Store sidebar or featured placement.
**Dimensions:** 440×280px

**Nanobanana Prompt:**

```
UI product marketing tile, 440x280px, horizontal card format.

Background: solid deep purple #160828 filling the entire canvas.

LEFT SIDE (x=0 to x=160px, vertically centered): centered at approximately x=80px, y=140px — the "md" logo tile, 80x80px, rounded corners 14px, linear-gradient(135deg, #EC008C 0%, #00DCC8 100%) fill, lowercase white "md" in Helvetica Neue Bold 36px centered. Behind the logo tile, a soft radial glow blob: #EC008C at 20% opacity, blur radius 50px, spread 10px.

RIGHT SIDE (x=170px to x=380px, vertically centered as a group): two lines of text. Line 1: "Copy as Markdown" in Helvetica Neue Bold 22px, color #FFFFFF, letter-spacing -0.2px. Line 2 (10px below line 1): "One click. LLM-ready." in Inter Regular 15px, color #9b8db0.

BOTTOM-RIGHT CORNER: a pill badge positioned at approximately x=340px, y=236px (bottom-right zone). Pill: height 28px, horizontal padding 12px, rounded corners 14px, linear-gradient(135deg, #EC008C 0%, #00DCC8 100%) fill. Inside: text "Free Chrome Extension" in Inter SemiBold 11px, color #FFFFFF, letter-spacing 0.3px.

Mood: compact, punchy, app-store tile — the entire design should feel like a premium mobile app card or Product Hunt thumbnail. No photos, no extra decoration.
```

**Notes:**
- At 440×280px this is a small canvas — keep font sizes exactly as specified, the proportions are intentional.
- The glow blob behind the logo should be very subtle at 20% — it should read as atmosphere, not a visible shape.

---

## Asset 8 — Marquee Promo Tile (1400×560px)

**Purpose:** Chrome Web Store marquee/laufschrift slot.
**Dimensions:** 1400×560px

**Status:** Same slot and same dimensions as Asset 2 (Hero Banner). Reuse `asset-02-hero-banner.png` for this slot. No additional generation needed.

---

## Delivery Format

All generated files must be delivered as:

- **Format:** PNG (24-bit)
- **Alpha channel:** None — no transparency. All backgrounds must be filled with solid color.
- **Color profile:** sRGB
- **Exact pixel dimensions:** No upscaling, no downscaling after export. Generate at the target size exactly.
- **Naming convention:**

| Asset | Filename |
|---|---|
| Asset 1 — Store Icon | `icon128.png` (existing, no generation) |
| Asset 2 — Hero Banner | `asset-02-hero-banner.png` |
| Asset 3 — Screenshot 1 | `asset-03-screenshot-before-after.png` |
| Asset 4 — Screenshot 2 | `asset-04-screenshot-token-saver.png` |
| Asset 5 — Screenshot 3 | `asset-05-screenshot-ecosystem.png` |
| Asset 6 — Screenshot 4 | `asset-06-screenshot-privacy.png` |
| Asset 7 — Small Promo Tile | `asset-07-small-promo-tile.png` |
| Asset 8 — Marquee Promo Tile | `asset-08-marquee-promo-tile.png` (copy of Asset 2) |

- **Delivery folder:** Drop all files into `/icons/store-assets/` in the project repo.
- **Chrome Web Store limits:** The store rejects images over 2MB. Run all PNGs through `pngquant --quality=80-95` if any file exceeds 1.8MB before submission.
