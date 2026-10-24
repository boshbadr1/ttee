# Integration handoff

This independent folder restores the original Taiba visual direction. Production authentication, Cloudflare Workers, D1, and AI services were not modified.

## Components

| Component | Files / functions |
| --- | --- |
| Fixed flex app shell | index.html, style.css |
| Original star branding | icon('spark'), assets/taiba-mark.svg |
| Dynamic welcome | welcomeHTML, profile.name |
| Sidebar / history drawer | renderHistory, openSidebar, closeSidebar |
| Conversation | renderChat, messageHTML, patchAssistant |
| Markdown / copy | markdown, inline, copyText |
| Static message composer | #composer-form, #message-input, resizeComposer |
| Viewport bridge | scheduleViewport, syncViewport, preserveReading |
| Demo transport | sendMessage, startResponse, stopStream, retry |
| Profile / password screens | renderProfile, renderLogin, renderPassword |
| Campus feed | renderAnnouncements |
| Administration | renderAdmin, renderStudents, renderAnnouncementAdmin, renderProviders |
| UI language | assets/i18n.js |

## Backend boundaries

1. Replace the demo credential comparison with real authenticated session handling. Enforce administrator access on the server; local route navigation is not authorization.
2. Populate profile and account details from the real session. Greeting and avatar derive from the profile name.
3. Replace local arrays and save() with account-scoped persistence for conversations, settings, students, and announcements.
4. Replace selectResponse/startResponse with the production streaming transport. Preserve cancellation, recoverable errors, and next-message drafts. Keep API credentials server-side.
5. Keep the current static composer DOM across sends. Do not return to rebuilding the entire message region during every streamed chunk. Production streaming can use stable message IDs rather than local array indexes.
6. Replace provider metadata with server-produced status, quota, and fallback configuration. No key input is included in this prototype.
7. Replace password forms with a secure authenticated endpoint. Prototype passwords are neither saved nor sent.
8. Replace filename-only attachments with a consented, validated upload flow if needed. No file content is read by this demo.
9. Use a reviewed Markdown library and sanitizer for production. The local renderer deliberately escapes HTML and supports a small subset.
10. Replace the lightweight UI translation adapter with explicit application translation keys, including dynamic validation and status messages.

## Local demonstration storage

The prototype uses taiba-original-refined-v1 for demo records and preferences and taiba-original-refined-language for UI language. It intentionally does not read or overwrite either earlier prototype's storage. No secrets or passwords are stored.

The provider catalog appends missing demonstration providers while preserving any saved demo switches by ID. Every status and quota remains sample data.

## Mobile acceptance

Retain the single viewport authority and avoid adding independent keyboard-height hacks, focus loops, document scrolling, or a second fixed-position composer. Follow KEYBOARD_FIX_NOTES.md on actual iPhone Safari and Android Chrome before production integration.
