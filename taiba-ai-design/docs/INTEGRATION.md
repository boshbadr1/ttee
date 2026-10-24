# Components and future integration

This folder is isolated from any production application. The services below are integration suggestions, not implemented network contracts.

## Component map

| Component | Implementation | Responsibility |
| --- | --- | --- |
| App shell | index.html, shell CSS, syncViewport | Stable header / scrolling content / composer layout |
| Sidebar | renderHistory, drawer helpers | Search, selected conversation, grouped history, account navigation |
| Welcome | welcomeHTML | Dynamic first name and contextual starting prompts |
| Conversation | renderChat, messageHTML | User messages, assistant labeling, errors, response actions |
| Markdown | markdown, inline | Escaped paragraphs, lists, headings, tables, quotes, code |
| Composer | composer form and handlers | Drafts, growth cap, local file-name attachment, sending/stopping |
| Response demo | startResponse, stopStream, retry | Local timed loading and progressive display |
| Profile / auth | renderProfile, renderLogin, renderPassword | Frontend forms and local-only validation |
| Campus feed | renderAnnouncements | Filtering, details, read states |
| Admin | renderAdmin and tab renderers | Overview, students, announcements, provider controls |
| Localization | assets/i18n.js | Arabic/English interface and direction |
| Dialogs / feedback | showModal, popover helpers, toast | Modal focus, transient options and status |

## Boundaries to replace

1. **Authentication:** replace the demo credential comparison with an authenticated backend session. Never treat route navigation or localStorage as authorization. Protect admin operations server-side.
2. **Student identity:** replace profile with sanitized account data; greeting derives from profile.name. Real passwords should only travel through an authenticated, secure password-change endpoint. No prototype password is stored.
3. **Conversations:** replace the chats, drafts, and save() demonstration store with account-scoped persistence. Preserve stable message IDs and per-conversation drafts. Add server pagination as needed.
4. **AI responses:** replace selectResponse / startResponse with a streaming adapter. Maintain loading, streaming, stopped, completed, and recoverable error states. Cancel streams with an AbortController. Keep provider keys on the server.
5. **Markdown:** this renderer supports a safe, small subset and escapes raw HTML. For production, use a reviewed Markdown library with sanitizer, bounded input size, safe links, and a complete content-security policy.
6. **Attachments:** the prototype displays a selected filename only. Real uploads require validation, consent, an authenticated endpoint, progress, cancellation, and server-side limits.
7. **Announcements and student management:** replace array mutations with authenticated backend operations. Keep error feedback and pending-button states. Password-reset confirmation currently sends nothing.
8. **Provider health / quotas:** replace sample values with server-provided metadata. Keep secrets out of HTML, JavaScript, frontend storage, and logs. Demo switches do not modify real providers or fallback order.
9. **Localization:** replace the DOM text adapter with application translation keys; records and user messages should remain in their authored language. Localize dynamic errors and date formatting through the same system.

## Suggested data shapes

~~~js
// Suggestions only; there are no implemented endpoints.
const conversation = {
  id: 'stable-id',
  title: 'Conversation title',
  messages: [
    { id: 'message-id', role: 'user', text: '...', createdAt: 'ISO date' },
    { id: 'reply-id', role: 'assistant', text: '...', status: 'complete' }
  ]
};
const student = { id: 'stable-id', name: '...', email: '...', faculty: '...', active: true };
const provider = { id: '...', name: '...', available: true, quotaPercent: 64 };
~~~

## Cloudflare Workers compatibility

The folder is ordinary static content with relative local assets. It can later be served by an existing static-asset route without a bundler. Wire adapters to your actual Workers routes after backend access controls, response schemas, and security review are established. This work did not connect to, modify, or deploy Cloudflare services.

## Prototype persistence

Only the keys taiba-demo-v1 and taiba-demo-language are used. Values contain demo records, drafted text, theme, and UI preferences. Do not reuse this scheme for real credentials or sensitive institutional records. Mid-stream reloads convert interrupted loading into a retryable state instead of leaving a permanent spinner.
