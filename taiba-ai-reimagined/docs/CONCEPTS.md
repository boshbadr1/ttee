# Taiba AI — three directions, one new product architecture

## The brief interpreted

Taiba AI is a university learning application with conversations, personal accounts, campus announcements, and administration. The reinvention must change the experience of those capabilities, without inventing a backend or reducing the quality of the mobile conversation.

The earlier prototype is retained separately. Its defining structure — a persistent conversation-history sidebar, centered greeting, four prompt cards, and a bottom textarea — is not the starting point for this application.

The three concepts below were explored before the new application was implemented. Each changes the composition, navigation, typography hierarchy, and interaction model. They are alternative product architectures, not alternate skins.

---

## A · Editorial Intelligence

**Working idea:** a personal academic folio. Questions develop into readable articles, with the care and rhythm of an editorial publication.

### Desktop architecture

The application opens as a reading desk with a horizontal publication-style masthead. A prominent, left/right asymmetric question headline establishes the main subject. A small numbered section index occupies a margin; it is a table of contents for the current work, not a list of chats. Previous conversations live in an archive view reached through the masthead.

Responses use a measured reading column, clear subheadings, pull quotes, and margin actions. A student can select a section to expand an explanation or save it to a personal reading list. Asking a follow-up extends the current folio instead of appending another oversized card.

```text
DESKTOP · reading folio
┌──────────────────────────────────────────────────────────────┐
│ TAIBA / FOLIO        Read · Archive · Campus          Account │
├──────────────────────────────────────────────────────────────┤
│ Current subject                           Folio no. / date   │
│ A large, composed question                                  │
├──────────┬───────────────────────────────┬───────────────────┤
│ Contents │ Article / explanation         │ Margin notes      │
│ 01       │ Heading                       │ Save section      │
│ 02       │ Paragraphs and code           │ Related question  │
│ 03       │ Quote / diagram               │ Reading progress  │
├──────────┴───────────────────────────────┴───────────────────┤
│ Follow-up question within the folio                          │
└──────────────────────────────────────────────────────────────┘
```

### Mobile architecture

The folio becomes one full-width reading column. The contents index folds into a compact section disclosure below the subject. Margin actions become a small contextual sheet; they do not squeeze the answer. A bottom navigation bar connects reading, archive, campus, and account views. The follow-up field remains in a reserved app-shell row when a conversation is active.

```text
MOBILE · one reading column
┌──────────────────────────────┐
│ Taiba / subject      Account │
├──────────────────────────────┤
│ Question headline            │
│ Contents ▾                   │
│                              │
│ Article, section by section  │
│                              │
├──────────────────────────────┤
│ Follow-up                    │
├──────────────────────────────┤
│ Read · Archive · Campus · Me │
└──────────────────────────────┘
```

### Type and interaction character

- Confident Arabic display headings paired with quieter running text and compact editorial captions.
- Numbered sections and thin rules create hierarchy instead of repeated card outlines.
- Motion follows reading: a section reveals in place, a saved extract moves into the reading list, and the current position remains stable.
- The visual identity is a folio monogram and a publication-like title treatment.

### Strength and tradeoff

Excellent for long explanations and sustained reading. Its strongest personality appears after there is substantial content, so the first interaction would need careful composition to avoid feeling like an empty document editor. The notebook and practical study tools would remain secondary.

---

## B · Future Intelligence

**Working idea:** a precise, contextual instrument. The application is a focused stage where a student can ask, inspect, compare, and continue.

### Desktop architecture

A narrow utility rail provides destinations without becoming a conversation sidebar. The central stage is the dominant surface. Context tools open beside the selected item: an explanation outline, a code inspection pane, or a provider-status summary in administration. The command tray is part of the stage and can expand into a keyboard-accessible command palette.

History is a dedicated timeline view, not permanent chrome. Depth comes from purposeful layers and contrasting material values; no neon grids, cyberpunk glow, or background gradients are needed.

```text
DESKTOP · contextual instrument
┌───────┬──────────────────────────────────────────────────────┐
│       │ Subject / state                     Command shortcut │
│ Tools ├───────────────────────────────────┬──────────────────┤
│       │                                   │ Context          │
│ Ask   │ Main working stage                │ outline / code / │
│ Files │ response, comparison, or exercise  │ selected extract │
│ Time  │                                   │                  │
│ News  ├───────────────────────────────────┴──────────────────┤
│       │ Command tray / question / current mode               │
└───────┴──────────────────────────────────────────────────────┘
```

### Mobile architecture

The selected task becomes a full-screen focus view. The utility rail becomes bottom navigation, and context opens as a sheet with a visible close action. The command tray condenses to a single composing row. The student can move between response and context without seeing two compressed panes at once.

```text
MOBILE · focus stage
┌──────────────────────────────┐
│ Subject              Context │
├──────────────────────────────┤
│                              │
│ One task / one response      │
│                              │
│ Context opens intentionally  │
│ as a secondary sheet        │
├──────────────────────────────┤
│ Command tray                 │
├──────────────────────────────┤
│ Ask · Timeline · Campus · Me │
└──────────────────────────────┘
```

### Type and interaction character

- Medium-weight Arabic headings with precise, compact labels; tabular numerals for timings and status.
- Strong distinction between stage, contextual layer, and system state.
- Short, directed transitions show where a panel came from and return focus to its trigger.
- The identity is a restrained instrument mark and an intentionally technical cadence.

### Strength and tradeoff

Strong for technical study, code, and administrative monitoring. However, context panels and a command palette require more onboarding. Too much instrumentation could make a student-facing educational product feel like a specialist console.

---

## C · Riwaq / رواق — the selected direction

**Working idea:** a contemporary learning studio. A question is the beginning of a working session, and the product gives ideas a place to develop.

Riwaq means a sheltered passage or colonnaded space associated with shared study and exchange. It supplies an architectural idea rather than a decorative theme: clear thresholds, a central working surface, and a companion place to keep thoughts.

### Desktop architecture

The application uses a horizontal masthead with explicit destinations: **Studio / مساحتك**, **Conversations / المحادثات**, **Campus / الجامعة**, and **Administration / الإدارة**. Conversation history has its own usable screen; it does not consume the side of every other task.

The studio is an asymmetric desk. A generous inquiry surface is the main action. A smaller companion contains a functional ruled-paper notebook and a focus timer. Both can be used without starting a conversation. Recent work appears as a numbered continuation list, not four matching suggestion cards.

The new-question surface is a real composing workspace with contextual learning modes. On sending, the same learning session becomes a readable conversation. This is a change of task state, not a jump from a landing-page hero to an unrelated chat screen.

```text
DESKTOP · learning studio
┌──────────────────────────────────────────────────────────────┐
│ Arch / TAIBA    Studio · Conversations · Campus · Admin      │
├───────────────────────────────────────┬──────────────────────┤
│ Working-session title / greeting      │ Session / focus      │
│                                       │                      │
│ Large, asymmetric Arabic headline     │ Functional notebook  │
│                                       │ on a ruled surface   │
│ Inquiry surface                       │                      │
│ Ask / summarize / work through        │ Focus timer          │
│                                       │ Start · Pause · Reset│
├───────────────────────────────────────┴──────────────────────┤
│ Continue your thinking · numbered recent work                │
│ Campus notice · dated and subordinate                       │
└──────────────────────────────────────────────────────────────┘
```

The conversation state keeps the comfortable reading measure while giving the notebook a genuine purpose: useful ideas can be captured during a session. A companion pane must never take enough space to squeeze Arabic text or code. It can collapse when the viewport cannot support both comfortably.

### Mobile architecture

Mobile is a first-class arrangement. A compact branded header sits over one clear task. Studio, conversations, campus, and account use bottom navigation. Administration is reached intentionally through account/navigation access rather than crowding the primary student navigation.

The notebook becomes a dedicated sheet or view; the focus timer is a compact control. History is a full screen with room to search and choose a conversation. There is no chat-history drawer to operate before the student can find their work.

```text
MOBILE · studio
┌──────────────────────────────┐
│ Arch / Taiba        Settings │
├──────────────────────────────┤
│ Session / greeting           │
│ Bold Arabic proposition      │
│                              │
│ Inquiry surface              │
│ Learning modes               │
│                              │
│ Notebook / focus access      │
│ Continue recent work         │
├──────────────────────────────┤
│ Studio · History · Campus · Me│
└──────────────────────────────┘

MOBILE · active conversation
┌──────────────────────────────┐
│ Subject           Notebook  │
├──────────────────────────────┤
│ Independently scrolling     │
│ conversation / readable     │
│ responses and code          │
├──────────────────────────────┤
│ Reserved composing space    │
├──────────────────────────────┤
│ Compact navigation          │
└──────────────────────────────┘
```

When the keyboard reduces usable space, composing and reading take priority. The composer belongs to the app shell's normal layout, with its height reserved. The design does not rely on floating controls over the answer or repeated focus/resize tricks. Notebook and other secondary tools remain available through deliberate navigation rather than simultaneous compressed panels.

### Original visual identity

- **Architectural paper:** warm, lightly tonal surfaces, not a generic white canvas.
- **Ink:** decisive, readable typography with clear hierarchy and comfortable Arabic line height.
- **Burnt orange:** a purposeful emphasis for the inquiry action, active navigation, and selected learning modes.
- **Arch gateway mark:** a custom Taiba symbol built around an open threshold. It replaces the previous sparkle rather than recoloring it.
- **Ruled paper:** only the working notebook uses the ruled treatment; the rule lines communicate that it is a place to write.
- **Varied geometry:** surfaces are shaped according to purpose. The product is not a grid of interchangeable rounded rectangles.

The dark theme preserves this architecture. Ink and paper values adapt without turning the product into Concept B or replacing its identity with glow effects.

### Interaction character

1. Open the studio and begin a question immediately.
2. Choose a learning intent using compact typographic controls, not another four-card launcher.
3. Read the response as an open learning document with code, tables, and restrained actions.
4. Keep a note or start a focused study interval alongside the work.
5. Return to a full, searchable conversations destination when continuing a different subject.

The notebook must save local demonstration notes, and the timer must actually start, pause, and reset. These elements earn their place through function. Neither is decorative screenshot content.

### Why C was selected

Riwaq gives Taiba a recognizably educational identity without becoming a conventional university portal. Its asymmetry and architectural mark provide a memorable first impression, while its inquiry, notebook, and focus controls support real study behavior.

It is also the clearest departure from the old interface: different primary navigation, different home composition, different role for history, different question-entry architecture, a dedicated mobile navigation pattern, and a new brand mark. Originality comes from those decisions, not from an accent color.

---

## Comparison and decision

| Criterion | A · Editorial folio | B · Contextual instrument | C · Riwaq studio |
| --- | --- | --- | --- |
| Primary mental model | Read a developing academic article | Operate a focused intelligent instrument | Work through a learning session |
| Home architecture | Publication masthead and reading folio | Utility rail and central stage | Horizontal masthead and asymmetric desk |
| History | Archive destination | Timeline destination | Full conversations destination |
| Primary hierarchy | Article title, contents, reading column | Current task, stage, contextual tools | Inquiry, working notebook, focus interval |
| Mobile transformation | Full-width article and section index | Single stage with context sheet | Studio and full history views with bottom navigation |
| Strongest advantage | Long-form reading quality | Technical precision and contextual depth | Product identity combined with practical study tools |
| Main risk | An empty first page can feel document-like | Instrumentation can increase cognitive load | Companion tools must remain useful and subordinate |
| Relationship to previous design | A new reading architecture | A new command architecture | A new learning-workspace architecture |

**Decision: implement C, Riwaq.** Preserve the clarity of A's reading typography and B's explicit system feedback, but do not combine their competing navigation systems. The selected product remains one coherent studio.

## Non-negotiable checks for implementation

- No permanent conversation-history sidebar.
- No centered sparkle, greeting, four-card, footer-textarea composition.
- No decorative gradients, neon grids, or animation without a task-related purpose.
- No placeholder notebook, non-working timer, or impressive screenshot masking incomplete interactions.
- Readable Arabic, stable mixed-direction text, visible keyboard focus, labeled controls, and theme-specific contrast.
- A stable mobile app shell and independently scrolling conversation, with safe-area-aware composer space.
- Conversation, account, campus, and administrative capabilities remain complete frontend demonstrations.
- No real authentication, AI calls, API credentials, database, or deployment is introduced by the concept.
