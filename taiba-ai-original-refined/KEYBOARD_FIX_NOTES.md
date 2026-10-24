# Mobile keyboard and conversation stability

This refinement preserves the original Taiba AI star, soft-purple identity, sidebar, welcome screen, and familiar conversation layout. The changes below concern application-controlled sizing, focus, and scrolling; they do not replace the interface architecture.

## One viewport authority

The app shell has one height token, **--app-height**, whose default is **100dvh**.

The layout is:

~~~text
app shell
├── sidebar / mobile history drawer
└── workspace
    ├── header                         — reserved, non-shrinking
    ├── main conversation region      — flex:1, min-height:0, independently scrollable
    ├── message composer              — reserved flex child, not an overlapping layer
    └── ancillary footer              — omitted on narrow phones
~~~

The shell is fixed to the available application area with inset-inline:0, top:var(--app-top,0), and height:var(--app-height). The document is not the conversation's scrolling container. Long messages scroll in main; long code and tables scroll within their own containers.

The viewport meta retains **interactive-widget=resizes-content** as a progressive enhancement for Android Chromium. When the browser resizes the layout viewport with the keyboard, modern viewport sizing remains in charge; JavaScript does not add a second resize scheme.

## The Visual Viewport bridge

There is one scheduled measurement function, **syncViewport()**:

1. Visual Viewport resize/scroll and window resize events schedule the same requestAnimationFrame callback.
2. It compares visualViewport.height with document.documentElement.clientHeight and observes visualViewport.offsetTop.
3. Only when the visible viewport is smaller or panned does it override --app-height / --app-top to fit the visible area.
4. It writes changed measurements only, avoiding redundant style updates from duplicate events.
5. At pinch-zoom scales other than 1, it does not apply keyboard sizing calculations.
6. When layout and visible bounds match again, it removes the temporary overrides and returns to the CSS default.

The bridge deliberately does not depend on textarea focus. Keyboard dismissal can outlast a blur event; following the closing viewport avoids prematurely expanding the application during that animation.

It does not call focus(), blur(), scrollIntoView(), or window.scrollTo(). It does not attempt to change OS keyboard controls.

This bridge specifically addresses the distinction between a browser that resizes its layout viewport and one, such as an iOS Safari configuration, that overlays or pans a smaller visual viewport. It is not proof that every Safari or Android version behaves identically.

## Focus and sending

- The composer and **#message-input** remain the same DOM elements across messages and screen navigation.
- Sending does not rebuild the form, blur the textarea, or disable writing while a response is displayed.
- Pointer sending preserves existing textarea focus by preventing the button's pointerdown focus transfer only when the textarea already owns focus.
- Enter submits normally; Shift+Enter inserts a newline. IME composition is not submitted as an ordinary Enter press.
- No focus loop runs during streaming or viewport events.
- The empty textarea follows the interface direction; entered Arabic/English content uses automatic direction.
- Textarea font size is at least 16px on mobile to avoid text-input auto-zoom.
- Safe-area bottom padding remains part of the composer layout.

Browser policy can still affect focus and keyboard visibility. The implementation preserves focus where permitted rather than promising to keep a software keyboard open in every browser situation.

## Stable streaming and scroll ownership

The original prototype rebuilt the entire message region on every stream update. The refined implementation uses **patchAssistant(index)** to update only the affected assistant article / Markdown region.

Before an update, it records whether the reader is already near the bottom:

- If so, the message region follows the growing response.
- If the reader moved up, their position is retained rather than being dragged to the latest text.
- A new user submission intentionally moves to the latest exchange.
- Code and table containers retain their horizontal scroll positions during Markdown updates.

Textarea growth and viewport-height changes preserve the same prior reading anchor. Only the inner message region moves; the document is not scrolled to the composer.

## Password screens are separate

Password fields are rendered on their dedicated login/change-password screens, not in or alongside the chat composer. The chat textarea uses a message-specific name and autocomplete hints to discourage inappropriate credential suggestions.

A website cannot reliably remove the operating system's password-manager button, keyboard dismissal control, or input-method toolbar. Those controls are browser/OS-owned. The layout reserves usable space around the keyboard instead of attempting to hide them.

## Verification status

Completed Chromium checks passed: nine focused keyboard/scroll groups, including exact textarea identity/focus and zero blur events across three sends; 56 width/theme/language combinations; 12 short portrait/landscape combinations; simulated overlay height and panning; one-RAF coalescing; no repeated CSS writes for unchanged measurements; and pinch-zoom guards. Separate iPhone 13 and Pixel 5 touch profiles each passed three tap-sends in Chromium. These are emulations, not tests of the physical devices or their native browsers. See docs/keyboard-qa-results.json and docs/touch-emulation-results.json for evidence.

Available-tool inspection found:

- A system Chromium binary is available for Playwright-driven browser and viewport/touch emulation.
- Playwright's bundled WebKit and Firefox binaries were not installed at inspection time.
- No physical iPhone or Android device was attached.

Chromium emulation, simulated reduced viewport heights, and mocked viewport events can test application geometry and handlers. They do not reproduce an actual iOS Safari keyboard, Android IME, browser toolbar animation, password-manager overlay, or physical safe area.

Do not interpret a passing headless check as successful physical-device testing.

## Required real-device acceptance

Run on actual **iPhone Safari** and **Android Chrome**, including Arabic and English keyboards:

1. Open a long conversation and focus the composer. Verify that the document does not jump and the composer stays above the keyboard.
2. Send at least three messages consecutively without manually refocusing. Check whether typing focus and the keyboard remain available.
3. Continue drafting while a demo response streams, then submit the next message.
4. Scroll up while streaming. Confirm that older content remains in place.
5. Scroll a long code block or wide table sideways while the response grows.
6. Expand the textarea to its cap and verify that its own scrolling works.
7. Dismiss/reopen the keyboard, rotate the device, and repeat in landscape.
8. Open/close the history drawer and return from another screen to a saved draft.
9. Check the login/password screens separately, including password-manager behavior.
10. Test text scaling, safe areas, browser toolbar movement, IME composition, and reduced motion.

Record OS/browser versions and any remaining browser-specific behavior before production integration.
