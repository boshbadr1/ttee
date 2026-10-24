# Frontend handoff · production integration points

This folder is independent static content. It does not contain production Cloudflare code or imply an API contract.

## Modules

| File / function | Responsibility |
| --- | --- |
| index.html | Semantic shell, metadata, main region and native dialog |
| style.css | Tokens, studio, folio reading, notebook, timer, archive, bulletin, mobile layout |
| demo.js / studio | Inquiry desk and continuation rows |
| demo.js / reading, exchangeHTML | Open conversation, progressive display, response actions |
| demo.js / markdown, inline | Escaped Markdown subset with code and tables |
| demo.js / send, startResponse, stop, retry | Local demonstration state machine |
| demo.js / companion, notebookDialog | Editable fieldnotes, pin action and focus session |
| demo.js / historyView, campus | Searchable archive and dated campus feed |
| screens.js / TaibaScreens | Profile, login, password setup, administration |
| screens.css | Account folio, administrative register and provider network |
| concepts.html | Review gallery; not part of an AI backend |

## Shared UI contract

The account/admin module consumes window.Taiba:

~~~js
{
  state, icon, esc, t, save, toast,
  navigate, render, setTheme, dialog, closeDialog
}
~~~

Root actions use data-action. Account/admin actions use data-s-action and data-s-form. Routes are studio, history, campus, profile, admin, login, and password. UI translations use explicit t(ar, en) calls rather than modifying arbitrary DOM text.

## Replace these demo boundaries

1. **Identity and permissions:** replace the local profile and credential comparison with authenticated session data. Enforce student/admin access server-side; route names and local state are not authorization.
2. **AI transport:** replace chooseReply/startResponse with a streaming service adapter. Keep waiting/streaming/completed/stopped/error states and cancellation. Add stable message IDs, request IDs, rate limiting, and errors from the actual service.
3. **Provider network:** replace local health, quota, and switch metadata with server-produced data. All22 providers in the current UI are examples. No secret entry field is present. API credentials belong on the server.
4. **Persistence:** replace localStorage with user-scoped storage appropriate to chats and notes. Preserve per-conversation drafts; do not migrate demo account data into production.
5. **Passwords:** replace local validation with a secure server-validated change flow and authenticated authorization. New passwords must never enter client storage or logs.
6. **Students and announcements:** replace in-memory mutations with authenticated operations, loading states, and error feedback. Reset confirmation currently sends no email.
7. **Attachments:** the UI currently retains the filename only. Real uploads require validation, progress, cancellation, file limits, authenticated storage, and consent.
8. **Markdown:** the small prototype parser escapes HTML. Production should use a reviewed parser/sanitizer with safe links, bounded inputs, and a suitable content-security policy.
9. **Focus timer:** client deadline arithmetic is adequate for a local focus aid. Background tab throttling is handled by checking the deadline rather than counting interval ticks. Cross-device focus history is not implemented.

## Example local shapes

~~~js
chat = {
  id, title, category, date,
  exchanges: [{ q, a, loading, streaming, error }]
};
provider = {
  id, name, enabled, health, quota, latency, priority
};
announcement = { id, title, body, date, kind };
student = { id, name, email, faculty, active };
~~~

The actual backend should establish its own schemas with stable exchange IDs and timestamps.

## Static serving

No bundler or npm runtime is needed. The relative assets can be served by an existing Cloudflare Workers static-asset path later. This prototype did not connect to Workers, D1, authentication services, or AI providers, and was not deployed.

The optional standalone export embeds fonts, styles, and JavaScript for easy review. Use the source folder for integration and keep the generated HTML as a review artifact.
