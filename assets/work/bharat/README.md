# Bharat SahAIyak — screens

Captured from the Claude Design project **"Bharat SahAIyak design system"**
(`3efede94-454a-4fab-8117-3bdc43231c97`, file `Bharat SahAIyak.dc.html`).

## Recapturing

The design is a `<x-dc>` document: `support.js` boots React 18 + Babel from
unpkg, and `_ds/…/_ds_bundle.js` supplies the shadcn/ui kit. To re-render it:

1. Pull `Bharat SahAIyak.dc.html`, `support.js` and the `_ds/…` bundle + CSS
   from the design project into one folder, preserving paths.
2. The published CSS `@font-face`s Geist from 18 local `.ttf` files. Those were
   not downloaded — swap that block for a Google Fonts import of Geist.
3. Serve the folder and screenshot at 1760×1100, device scale 2.

The state selector top-right is React-controlled, so a plain `select.value = x`
is swallowed. Use the native setter, then dispatch `change`:

    const set = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
    set.call(sel, 'degraded'); sel.dispatchEvent(new Event('change', { bubbles: true }));

State values: `default`, `loading`, `empty`, `error`, `degraded`, `denied`.
Studio is reached by clicking the sidebar item, not by a URL.

## Files

| File | Screen |
|------|--------|
| `01-bots-default.png` | Bot registry, one service flagged for a decision |
| `02-loading.png` | Registry loading |
| `03-empty.png` | No bots yet — start from a recipe |
| `04-error.png` | Registry unreachable |
| `05-ai-down.png` | AI service down, fleet still readable |
| `06-no-permission.png` | Reader lacks Build access |
| `09-studio.png` | Recipe canvas + plain-language config rail |
| `laptop-*.png` | The above, framed by `scripts/build-laptop-mockups.js` |

## Before publishing

The screens name a real department and realistic officers, and every figure in
them (4,120 queries/day, 61,400 workers, 98.4% answered) is **demo data from the
design file**. The case study says so; do not let those numbers travel as
outcomes, and confirm the screens may be published at all.
