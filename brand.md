# Brand Style Guide — Copy as Markdown

## Logo

File: `icons/icon128.png`
Style: Rounded square, magenta → turquoise diagonal gradient, lowercase white `md`

---

## Colors

| Role                        | Name       | Hex       | RGB           |
|-----------------------------|------------|-----------|---------------|
| Gradient Start (top-left)   | Magenta    | `#EC008C` | 236, 0, 140   |
| Gradient End (bottom-right) | Turquoise  | `#00DCC8` | 0, 220, 200   |
| Text / Foreground           | White      | `#FFFFFF` | 255, 255, 255 |
| Dark Background             | Deep Purple| `#160828` | 22, 8, 40     |

**Gradient:** `linear-gradient(135deg, #EC008C 0%, #00DCC8 100%)`

---

## Typography

| Role            | Font                                                        | Weight  |
|-----------------|-------------------------------------------------------------|---------|
| Logo / Display  | Helvetica Neue                                              | Regular |
| Body / UI       | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Regular |
| Code / Markdown | `"SF Mono", "Fira Code", "Courier New", monospace`          | Regular |

---

## CSS Variables

```css
:root {
  --color-magenta:    #EC008C;
  --color-turquoise:  #00DCC8;
  --color-bg-dark:    #160828;
  --color-white:      #FFFFFF;

  --gradient-brand: linear-gradient(135deg, #EC008C 0%, #00DCC8 100%);

  --font-display: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono:    "SF Mono", "Fira Code", "Courier New", monospace;

  --radius-logo:   14px;
  --radius-button: 8px;
}
```

---

## Usage Notes

- Always use the gradient on a white or dark (`#160828`) background
- Never stretch or recolor the `md` logotype
- Minimum icon size: 16×16px
- Preferred display size: 48px and above
