# AURA INTIMATES

An intimate apparel storefront built with Next.js 15 App Router, React 19, vanilla CSS,
and an on-demand Three.js fabric viewer.

```bash
npm install
npm run dev
npm run build
```

The default development URL is http://localhost:3000. To choose another port:

```bash
node node_modules/next/dist/bin/next dev -p 3002
```

## Design

The storefront uses white surfaces, charcoal text, forest-green actions, Georgia
display type, and DM Sans body text. CSS tokens live in `src/app/globals.css`.
Legacy amethyst/blush token names are retained as aliases for the new palette so
the existing cart and modal components stay consistent.

The full-width campaign hero has separate desktop and mobile photographs. The
catalog uses four columns on desktop, three on tablet, and two on phones.
Product cards open a size/color selector before adding to the bag, preserving
the color selected in the grid.

## Structure

```text
src/app/          layout, storefront route, global stylesheet
src/components/   navigation, hero, catalog, modals, drawers, fabric viewer
src/context/      ShopContext: cart, wishlist, filtering, sorting, promotions
src/data/         static catalog and sample reviews
src/hooks/        shared modal keyboard, focus, and scroll behavior
public/images/    optimized campaign and product WebP images
docs/             image provenance, prompts, and output paths
```

Cart and wishlist state persist in localStorage. The fabric viewer loads only
when selected and supports pointer dragging, including touch.

## Verification

The redesign was checked with a production build and Playwright at 320, 390,
1440, and 1920 pixels. Browser checks covered collection filters, sorting,
search, saved items, nested dialogs, keyboard focus, mobile navigation,
size selection, quantity changes, bag and checkout layout. The fabric canvas
was checked for nonblank rendering and movement on desktop and mobile.

## Development Status

This is a storefront prototype with static inventory and sample reviews.
Checkout remains a simulation; no payment, email, or order service is connected.
Promotional state still needs to reset after a simulated order, and standalone
product detail routes are not implemented.

Campaign photography and all 24 product-color images are AI-generated concepts,
not photographs of verified inventory. Replace them with approved inventory
photography before using this catalog to sell real items. Full generation prompts
and paths are in `docs/campaign-assets.md` and `docs/catalog-assets.json`.

`npm run lint` is not configured for noninteractive checks.
