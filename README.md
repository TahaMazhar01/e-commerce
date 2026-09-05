# AURA INTIMATES

A storefront for a next-to-skin intimate apparel label — Next.js 15 App Router, React 19,
vanilla CSS, and two Three.js surfaces (a procedural silk hero and a drag-to-rotate fabric
inspector).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Design system

The palette is defined once as CSS custom properties at the top of
[`src/app/globals.css`](src/app/globals.css). Five brand hues carry the identity:

| Token | Hex | Name | Role |
| --- | --- | --- | --- |
| `--brand-amethyst` | `#9c89b8` | Amethyst Smoke | Primary accent — rules, marks, gradients |
| `--brand-blush` | `#f0a6ca` | Blush Pop | Highlights, badges, hero key light |
| `--brand-orchid` | `#efc3e6` | Pink Orchid | Washes, badge fills, CTA gradient end |
| `--brand-mist` | `#f0e6ef` | Lavender Mist | Elevated surfaces |
| `--brand-periwinkle` | `#b8bedd` | Periwinkle | Supporting accent, hero rim light |

The raw brand hues are all light, so none of them clears 4.5:1 as text on a pastel ground.
Two derived tints — `--accent-amethyst-deep` (`#5F4C7E`) and `--accent-blush-deep`
(`#9E4470`) — carry type and links, while the brand hues carry fills, borders and marks.
Every text/background pair in the app has been measured and passes WCAG AA.

Ink runs `--text-primary` → `--text-secondary` → `--text-muted` over three surfaces
(`--bg-primary`, `--bg-surface`, `--bg-surface-elevated`), with `--bg-deep` reserved for the
announcement band. Style through the tokens rather than adding literals.

## Structure

```
src/
  app/          layout, single storefront route, global stylesheet
  components/   navbar, hero, catalog, modals, cart drawer, 3D canvases
  context/      ShopContext — cart, wishlist, filters, promo codes
  data/         product catalog and reviews
```

State lives in one `ShopContext` provider; cart and wishlist persist to `localStorage`.
There is no backend — checkout is a simulation.

## Status

A full audit of the initial build is tracked separately. The five ship-blockers are fixed:

- Product imagery replaced — 24 colorways, 24 verified photographs, no broken URLs
- Size guide now follows the department it was opened from
- Quick view and the 3D fabric inspector are reachable on touch and by keyboard
- Checkout no longer ships with a hardcoded identity or card number
- The hero headline no longer depends on an animation frame to become visible

Since fixed: a mobile navigation menu, a wishlist view, Escape and scroll-lock on both
drawers, and the removal of the duplicated GSAP slide that could strand a drawer
mid-transform.

Still outstanding, roughly in priority order: promo state reset after an order, product
detail routes, focus traps on the three modals, a responsive checkout grid, lazy-loading
for Three.js, and SEO metadata.

## Notes

- Photography is sourced from Unsplash for development. Replace it with licensed product
  photography before launch.
- `npm run lint` has no ESLint config yet and will drop into an interactive setup prompt.
