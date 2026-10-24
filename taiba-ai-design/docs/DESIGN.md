# Taiba AI · design decisions

## Direction

An AI-native educational workspace rather than a university brochure. The ui-ux-pro-max search for “education AI assistant minimal” recommended a conversational interface, quiet chrome, streaming feedback, restrained violet, and paired themes. Its landing-page/video pattern was not applied: this product is an application. The supplied Arabic typography and frontend-only requirements take precedence over generic font and framework suggestions.

The main screen uses a right-hand navigation rail, a compact product header, a comfortable central reading measure, four intentional starting points, and an understated composer. A custom four-point Taiba mark represents a question becoming an idea.

## Foundations

- Warm ivory #f9f9f7, paper surfaces, charcoal text, violet #7460af.
- Dark surfaces #191b1e / #222529, soft off-white text, desaturated violet #b5a2e5.
- Muted text was darkened after automated contrast testing, including sidebar group labels and keyboard hints.
- IBM Plex Sans Arabic in local 400, 500, and 600 weights; complementary Inter for Latin text.
- Consistent outline SVG icons, accessible control names, and decorative aria-hidden semantics.
- A 4/8px spacing rhythm, 9–18px component radii, minimal elevation, and visible violet focus rings.
- 16px mobile textarea and form controls prevent text-input auto-zoom.
- Motion communicates entrance, waiting, and state change. prefers-reduced-motion is respected.

## Mobile keyboard architecture

There is one sizing authority: --app-height. Its default is 100dvh. On narrow screens, a single Visual Viewport resize listener substitutes visualViewport.height only at scale 1 to accommodate browsers whose software keyboard overlays the layout viewport. The listener does not move focus or scroll the document.

The app is a flex shell:

~~~text
app shell
├── sidebar (drawer on narrow screens)
└── workspace
    ├── header                 — non-shrinking
    ├── main                   — flex: 1, min-height: 0, independently scrollable
    ├── composer region        — normal flex flow, non-shrinking
    └── footer                 — omitted on phones
~~~

The composer is not fixed over the message list. Its height is naturally reserved by flex layout. Its textarea grows to a cap, then scrolls internally. Long code and tables also scroll within their own containers. The body does not become a second scrolling surface.

interactive-widget=resizes-content is a progressive enhancement for Android Chromium. The Visual Viewport bridge handles overlay behavior where available. Neither changes OS-owned keyboard controls. Safe-area bottom padding protects the composer and navigation.

Sending never calls blur(). Pointer send preserves existing textarea focus using pointerdown.preventDefault() only when it already has focus. Enter submission naturally retains focus. Other controls remain keyboard accessible; there is no forced focus on route changes or continuous scroll-to-input loop. Password fields are rendered only on separate account screens.

**Limit:** reduced viewport tests cannot reproduce Safari toolbar movement, IME composition, password-manager overlays, physical safe areas, or actual keyboard animation. Real iPhone/Safari and Android/Chrome testing is required.

## Accessibility and localization

Native buttons, forms, tables, labeled inputs, live status messages, focusable scroll regions, and a native dialog form the interaction foundation. Dialogs trap focus natively; the mobile drawer marks the workspace inert and implements Tab wrapping and Escape. Returning to a wide viewport restores workspace interaction.

Interface language switches to English/LTR with the EN control. The local adapter translates interface chrome while preserving authored messages and records. dir=auto, isolated code, and explicit LTR identifiers support mixed-language content. Production localization should replace the prototype text-node adapter with explicit translation keys.

## Responsive behavior

- Up to 600px: compact branded header, 2×2 prompt cards, touch-accessible drawer, no ancillary footer.
- Up to 900px: drawer replaces persistent navigation; primary controls remain available.
- Above 900px: persistent sidebar, centered reading column, spacious header.
- Short visible viewports: welcome decoration contracts and scrolls within main; composer remains in flow.

See TESTING.md for measured viewport results and remaining device checks.
