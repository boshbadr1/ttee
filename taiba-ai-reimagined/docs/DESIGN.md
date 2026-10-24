# Riwaq · a new product architecture

## Creative decision

The selected concept is a learning studio: **ask → understand → capture**. The three concepts and their independent desktop/mobile wireframes are documented in CONCEPTS.md and the interactive concepts.html gallery.

The application is newly authored. Prior fonts and their open licenses are reused, but the former centered greeting, suggestion-card grid, chat-history sidebar, bubble-led conversation, and phone drawer are replaced together. The result changes the workflow as well as the visual identity.

## Composition

### Desktop studio

The masthead provides named destinations instead of permanently exposing conversation history. The asymmetric desk pairs a dominant inquiry sheet with a genuine editable notebook and focus timer. Large Arabic display typography is balanced with numbered continuation rows, fine rules, and a dated campus slip. The arch-shaped Taiba mark suggests an open academic space.

The central editor belongs to the inquiry desk; it is not a footer tacked onto an empty welcome page. Submitting the first inquiry opens a folio reading space. Questions appear as numbered headings and answers as open, readable content.

### Mobile

The phone does not compress the desktop companion column. It has four persistent bottom destinations — studio, conversations, campus, account. The notebook and timer are a deliberate sheet opened from account controls or the notebook action. Active conversation makes the answer the primary content.

There is no drawer of chat history. Conversation history is an independent, searchable destination. Campus news takes the form of a dated bulletin, while administration uses an open register and editorial analytics.

## Visual system

- Architectural paper #f4f1e9, ink #25271f, and a burnt-orange signal #b54123.
- A complementary dark material palette: #20241f / #292e27 with soft light ink and #f49973 signal.
- Ruled fieldnotes in muted yellow-green, distinct from inquiry paper.
- Local IBM Plex Sans Arabic in three weights; Inter for Latin text and technical numbering.
- An original nested-arch symbol, without the previous sparkle motif.
- 4/8px spacing rhythm, fine dividers, limited radii, and shape changes with a purpose.
- No external image requests, decorative stock assets, or animation framework.
- Motion communicates streaming/waiting or entry and respects prefers-reduced-motion.

## One mobile viewport strategy

The shell has one height token: --app-height, defaulting to 100dvh. At narrow sizes a single Visual Viewport resize listener bridges browsers that overlay their software keyboard. It substitutes visualViewport.height only at scale 1. The listener does not scroll or focus the document.

The active reading studio is a flex column:

~~~text
masthead
main
  reading toolbar
  scrollable exchanges  ← flex:1, min-height:0
  reserved inquiry form ← normal layout flow, not an overlapping fixed layer
bottom navigation / safe area
~~~

When a software keyboard measurably reduces usable space while the inquiry field is focused, the bottom navigation yields its space. Safe-area insets are retained. The meta interactive-widget=resizes-content improves Android behavior, while the Visual Viewport bridge handles overlay cases.

Repeated sends retain the **same textarea DOM element**. No blur() is called. Pointer sending preserves existing writing focus; Enter submits without discarding the next draft. The first welcome-to-reading transition synchronously restores existing input focus with preventScroll.

The textarea grows to a cap, then scrolls inside. Code and tables have their own horizontal scroll containers. The document does not become a competing scroll region. Empty inquiry direction follows UI language; entered content uses automatic bidirectional direction.

This architecture does not claim control of OS keyboard toolbars, password suggestions, Safari chrome, or hardware safe areas. These need physical-device acceptance checks.

## Accessibility

Native controls, semantic tables, visible labels, language-aware direction, named icon controls, visible focus outlines, native modal focus containment, live status announcements, and reduced motion are included. Phone send/attach/mode/account controls have 44px hit areas.

Timer updates are not announced every second. A completed session uses a status message. Sample replies explicitly identify their demo nature.

Automated accessibility results are evidence for the selected rules, not a complete accessibility certification.
