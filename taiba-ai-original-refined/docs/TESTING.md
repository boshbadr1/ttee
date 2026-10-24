# Refined original — verification

All checks below were executed against the original-style refinement, not inherited as passing claims from earlier versions.

## Functional results

**30 check groups passed:** 16 general application groups, 9 focused keyboard/scroll groups, and 5 provider-management groups.

- test-results.json / core-qa.cjs: responsive shell, drawer, drafts, three consecutive sends, Markdown/copy, error/retry, expansion, reduced viewport, login, password validation/privacy, profile, announcements, student management, provider switches, English, runtime/network.
- keyboard-qa-results.json / keyboard-qa.cjs: exact textarea node/focus with zero blur events across three sends; previous message nodes retained through streaming; reader position preserved when scrolled up; code/table scroll offsets retained; native viewport behavior and overlay simulation; font and direction checks.
- providers-qa.json: all 22 demo providers, saved-metadata migration, search/status filters, switches, local health check, overview count, no key fields, no provider toolbar in Chat.

The focused geometry matrix checked **320, 360, 375, 390, 430, 768, 1280px × both themes × both UI languages**: 56 combinations. Twelve further short portrait/landscape combinations checked composer bounds. These showed no page scroll, composer overlap, or horizontal document overflow.

## Touch emulation

touch-emulation-results.json records **iPhone 13** and **Pixel 5** device profiles, each with three tap-sends while preserving the textarea and focus.

**Both ran in Chromium.** The iPhone profile does not turn Chromium into Safari. These tests do not open real software keyboards or constitute physical iPhone/Android testing.

## Viewport-handler verification

Mocked visual bounds verified:

- Overlay-height and offsetTop handling without moving document scroll.
- A burst of resize/scroll events coalesces into one animation-frame measurement.
- Unchanged measurements cause no repeated root-style writes.
- A layout viewport already resized by the browser needs no JavaScript height override.
- Pinch-zoom scale does not trigger keyboard sizing calculations.
- Input focus remains unchanged by viewport work.
- Restoring native bounds removes the temporary overrides.
- The mode-options popover stays inside a simulated visible viewport.

See KEYBOARD_FIX_NOTES.md for architecture and required physical-device acceptance.

## Accessibility

**30 selected axe-core scans passed with zero reported violations:**

- 24 route scans: six screens × 375/1280px × light/dark, in accessibility-results.json.
- Four provider-management scans in providers-qa.json.
- Two open-dialog scans in overlay-dialog-results.json.

Rule tags: WCAG 2 A/AA, 2.1 AA, 2.2 AA. Modal names, keyboard drawer navigation and focus behavior were checked. These automated scans do not certify full WCAG compliance or replace screen-reader testing.

## Re-run optional checks

The prototype needs no npm packages. Browser testing dependencies can be installed outside the project:

~~~bash
python3 -m http.server 4175

# Separate terminal:
npm install --prefix /tmp/taiba-refined-tests playwright @axe-core/playwright
/tmp/taiba-refined-tests/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/taiba-refined-tests/node_modules node docs/core-qa.cjs
NODE_PATH=/tmp/taiba-refined-tests/node_modules node docs/keyboard-qa.cjs
NODE_PATH=/tmp/taiba-refined-tests/node_modules node docs/audit.cjs
~~~

Use BROWSER_PATH for an existing Chromium executable. The focused runner also supports BASE_URL.

## Standalone export

standalone-results.json verifies the exported HTML as one isolated resource: original star/palette, dynamic welcome, embedded fonts/styles/scripts, chat and code, preserved input focus, and all 22 provider controls. No dependent resource requests or JavaScript errors occurred.

## Limits

- System Chromium was available. Bundled WebKit/Firefox engines and physical phones were not available.
- No actual iOS Safari or Android software keyboard, IME animation, password-manager overlay, browser chrome movement, or physical safe area was tested.
- No real authentication, database, AI transport, provider availability, quotas, or password-reset emails are implemented.
- The Markdown parser is an escaped subset, not a production Markdown/sanitizer stack.
- Local file access can restrict clipboard/storage. The server-free export embeds resources; direct file navigation is administratively blocked in this test environment.
- User-authored content stays in its authored language. The translation adapter should be replaced by production localization keys during integration.
- No deployment occurred.
