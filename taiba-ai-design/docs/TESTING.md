# Validation and known limitations

## Executed

Browser: headless Chromium, driven by Playwright on Linux. Functional results are in test-results.json; route-level axe-core results are in accessibility-results.json. Screenshots are captured after fonts load and layout settles, using reduced-motion preference.

**21 functional check groups passed.** **30 automated accessibility scans passed** with no reported WCAG A/AA violations in the selected axe rules.

| Area | Result |
| --- | --- |
| Layout at 320, 360, 375, 390, 430, 768, 1280px | Passed in light and dark themes |
| Page horizontal overflow | None at required widths |
| Composer position / separation from main | Within viewport, no overlap at required widths |
| Mobile drawer | Open/close, inert background, Tab wrapping, Escape passed |
| Drawer → desktop resize | Restores workspace interaction |
| Suggestions and draft preservation | Passed across navigation |
| Repeated sends | Three consecutive messages and completed progressive responses |
| Send focus | Textarea focus preserved on pointer send and Enter |
| Loading / streaming / stop | Visible loading, completed stream, stop with draft preserved |
| Reload while loading | Converts to recoverable error; retry succeeds |
| Demo failure / retry | Error displayed, retry completes, pending draft preserved |
| Markdown | Code, headings, paragraphs, lists, inline code, quotes, tables rendered |
| Copy | Code copied to browser clipboard in permitted test context |
| Mixed Arabic / English and long unbroken text | Wrapped without page overflow |
| Composer expansion | Grows then caps at 120px on phone |
| Reduced viewport | Composer remained visible at 390×420, 844×390, 320×360 |
| Login | Incorrect values, password visibility, loading, successful demo navigation |
| Password setup | Temporary value check, 12-character minimum, confirmation matching |
| Password privacy | New test password absent from localStorage; fields cleared on success |
| Profile | Display-name saving and dynamic greeting passed |
| Announcements | Details, read state, unread and important filters |
| Student management | Add, search, deactivate, simulated reset |
| Announcement management | Create, edit, delete local records |
| Providers | Toggle and demo health-check loading |
| English | LTR interface, English response, persisted language, 320px bounds |
| Safe rendering | HTML injection string escaped by Markdown renderer |
| Attachment | Filename only, no reading/upload/storage of file contents |
| Conversation history | Search and delete-confirmation dialog passed |
| Runtime | No JavaScript errors or failed assets in the functional run |
| Network | All application requests were to the local static server |

## Accessibility scans

axe-core checked the six routes — chat, login, password, profile, announcements, administration — at 375px and 1280px, in both themes: **24 scans**. A supplementary run checked students, providers, and announcement-management tabs in both themes: **6 scans**.

Rules selected: WCAG 2 A/AA, WCAG 2.1 AA, WCAG 2.2 AA tags. The initial scan found insufficient contrast in some secondary desktop sidebar text. Muted tokens were corrected and the complete route scan passed on rerun.

Automated scans do not certify complete WCAG compliance. Keyboard drawer behavior, modal Escape, input labeling, password validation, and live feedback were also exercised in the functional checks. Full screen-reader and assistive-technology testing remains manual.

## Re-run the optional browser checks

The prototype itself has no npm dependencies. The optional verification scripts use Playwright and axe-core, installed separately from the project:

~~~bash
# Start the static server from the project directory in one terminal:
python3 -m http.server 4173

# In another terminal, install optional test dependencies outside the project:
npm install --prefix /tmp/taiba-qa playwright @axe-core/playwright
/tmp/taiba-qa/node_modules/.bin/playwright install chromium

NODE_PATH=/tmp/taiba-qa/node_modules node docs/qa.cjs
NODE_PATH=/tmp/taiba-qa/node_modules node docs/qa-extra.cjs
NODE_PATH=/tmp/taiba-qa/node_modules node docs/audit.cjs
~~~

If using an existing Chromium binary, set BROWSER_PATH to its absolute location. Functional scripts save their latest report and screenshots. qa.cjs repeats the 16 core groups; qa-extra.cjs runs the five supplementary interaction groups and six admin-tab accessibility scans.

## Known limitations

1. **No physical-device keyboard testing.** Resized desktop viewports approximate reduced usable space, not real OS keyboard behavior. Safari visual viewport offset, browser toolbar animation, safe areas, password-manager suggestions, and Android/iOS input methods need real-device checks.
2. **Chromium was tested.** Firefox and WebKit/Safari were not executed in this environment.
3. **No real services.** Sign-in, provider health, quotas, administrative permissions, password reset, and AI output are intentionally demonstration UI.
4. **Local persistence only.** No synchronization, account isolation, encryption, or production authorization is provided.
5. **Localization scope.** Interface chrome supports Arabic and English. Authored sample news and chat records remain in their original language. The lightweight text adapter and dynamic validation messages should move to explicit translation keys during production integration.
6. **Clipboard permissions vary.** If the browser denies clipboard access, a status message explains manual copying.
7. **Attachments are filename previews.** No content ingestion, document analysis, or upload occurs.
8. **Markdown is a subset.** Links and raw HTML are intentionally not rendered as active content.
9. **No deployment or production integration occurred.** These source files are an independent handoff.

## Physical-device acceptance checklist

- iPhone Safari: open keyboard from a long conversation, type Arabic, send several messages, rotate, hide/reopen keyboard, return from another screen.
- Android Chrome: repeat with Gboard, including Arabic/English composition and suggestion bars.
- Confirm no unexpected zoom, document jumps, hidden composer, focus loss, or repeated resize loops.
- Verify OS password suggestions appear only where appropriate on the separate account forms.
- Test large text, screen-reader announcements, keyboard navigation, and actual device safe areas.
