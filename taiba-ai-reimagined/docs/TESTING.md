# Validation report

Executed in headless Chromium on Linux. The implementation is an interactive frontend demonstration; backend behavior is intentionally outside scope.

## Functional verification

**22 functional check groups passed:** 14 studio/mobile interaction groups and 8 account/administration groups. Reports:

- root-qa-results.json
- account-admin-qa.json

| Area | Verified behavior |
| --- | --- |
| Responsive architecture | Studio/history/campus at 320, 360, 375, 390, 430, 768, 1280px, both themes, no document overflow |
| Mobile navigation | Bottom dock and main region remain separate |
| Language | Explicit Arabic/English UI, RTL/LTR layout, authored content preserved |
| Inquiry direction | Empty Arabic field is RTL; empty English field is LTR; typed content uses auto direction |
| Mobile controls | 44px send/attachment hit areas, readable mode labels, no mode/send overlap |
| First question | Welcome desk transitions to reading and restores existing typing focus |
| Consecutive questions | Exact same textarea node and focus retained during later sends |
| Drafts | Preserved across route/theme changes and while responses stream |
| Response states | Waiting, progressive display, stop, error, retry, completed |
| Notebook | Pin an idea, edit it, persist locally, reopen the notebook |
| Focus timer | Start, tick, pause and reset; deadline arithmetic instead of counting ticks |
| Archive | Search, filter and delete with confirmation |
| Campus | Open details, read/unread states, important filter |
| Reading | Code and tables scroll locally; long mixed-language content does not overflow the page |
| Reduced viewport | Composer remains inside available height in short portrait and landscape approximations |
| Profile | Display name, theme and language settings update the root shell |
| Login | Error, visibility toggle, busy state, successful local demonstration |
| Password | Minimum 12 characters, mismatch feedback, success, clearing, no password persistence |
| Students | Add, edit, search, duplicate rejection, activation/deactivation and simulated reset |
| Announcements | Create/edit/delete shared with Campus |
| Providers | All 22 providers represented; filter, switches, quotas, local health check |
| Runtime | No JavaScript errors, failed assets or external service requests in functional runs |

The mobile inquiry geometry check covers320 / 360 / 390px × Arabic/English × initial/active conversation. Account/admin English screens were additionally checked at 320px.

## Accessibility verification

**60 axe-core scans completed with zero reported violations** in selected WCAG 2 A/AA, 2.1 AA and 2.2 AA rule tags:

- 32 root route scans: 8 views × 2 widths × 2 themes, recorded in accessibility-results.json.
- 28 integrated account/admin scans: 7 surfaces × 2 widths × 2 themes, recorded in account-admin-qa.json.

The totals include overlapping route coverage, not 60 different screens. The initial run found contrast issues in small navigation indices; opacity and the accent token were corrected, then the route scan was rerun successfully.

Keyboard interactions and focus retention were exercised separately. Automated scans are not complete WCAG certification or a substitute for screen-reader testing.

## Concept exploration

The independent concepts.html gallery was tested at 320,390,768,1280px. A/B/C tabs, keyboard arrows/Home/End, hash selection, and bounds passed without JavaScript errors.

## Re-run root checks

The app itself needs no npm installation. Optional test dependencies can be installed outside the checkout:

~~~bash
python3 -m http.server 4174

# In a separate terminal:
npm install --prefix /tmp/riwaq-tests playwright
/tmp/riwaq-tests/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/riwaq-tests/node_modules node docs/root-qa.cjs
~~~

The runner supports BASE_URL and BROWSER_PATH. The JSON reports also record the independently executed administration and accessibility checks.

## Standalone export

The exported single HTML was checked in an isolated browser page: embedded fonts, chat/code, notebook pin, all22 providers, and the concept-summary dialog passed with no dependent network requests or JavaScript errors. See standalone-check.json. Direct file navigation is blocked by browser administration in this environment, so physical-device file opening is not claimed as tested.

## Known limitations / remaining manual acceptance

1. **Real mobile keyboards were not tested.** Desktop viewport shrinking cannot reproduce iOS Safari toolbar movement, visual viewport panning, Android IME composition, password-manager suggestions, OS animations, or real safe areas.
2. **Chromium only.** Physical Safari/WebKit, Firefox, screen readers, and large system text still need manual acceptance.
3. **No real services.** Authentication, account reset, AI output, provider health and quotas are clearly labeled local demonstrations.
4. **Local data only.** No synchronization, production authorization or account isolation is implied by localStorage.
5. **Markdown subset.** HTML is escaped. Links and advanced Markdown features are not implemented.
6. **Attachments are filenames only.** No file ingestion or analysis occurs.
7. **Clipboard permission varies.** Failure produces manual-copy guidance.
8. **Standalone file environments vary.** LocalStorage and clipboard may be restricted by the browser; the session remains usable. The review file embeds its fonts and scripts.
9. **No website was deployed.** Files are shared for review and future integration.

Physical-device acceptance should repeat long conversations, consecutive sends, Arabic/English composition, rotation, keyboard dismiss/reopen, text scaling, safe areas, and separate password-screen behavior on actual iPhone Safari and Android Chrome.
