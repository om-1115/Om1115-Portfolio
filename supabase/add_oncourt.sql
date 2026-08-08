-- Generated from js/data.js — do not hand-edit the JSON.
-- Needs the thumb column: run supabase/add_thumb_column.sql first.
insert into projects (id, status, title, category, year, description, tags, color, icon_gradient, accent_color, thumb, detail, sort_order) values
(
  $$08$$, $$shipped$$, $$ON Court Sandbox$$, $$Design Systems$$, $$2026$$,
  $$A working court workspace with the design system living inside it — measuring its own rendered output in both themes, and hosting new screens as experiments.$$, $$["Design Systems","AI UX","Accessibility","Gov Tech"]$$, $$#f0f4f4$$,
  $$linear-gradient(135deg,#0f766e,#4f46e5)$$, $$#0f766e$$, $$assets/work/thumbs/oncourt-sandbox.png$$,
  $${
  "role": "Product Designer",
  "challenge": "A design system usually gets documented beside the product it built, which means nothing in the documentation is under load. The tokens are asserted, the components are shown in isolation, and the first time anyone finds out that a colour pairing fails is when a user cannot read it. Meanwhile the interesting new question is not whether a person can follow the system — it is whether an agent can, and whether anything is checking the output when it does.",
  "outcome": "ON Court: a court workspace whose sidebar is split between the product and the system that produced it. Foundations reads every colour back from the browser after the cascade resolves, so 31 token pairs are re-derived in both themes rather than trusted. Test UI hosts new screens as experiments — including a filing step and a scrutiny workspace with a switchable no-AI state — and the measurement page is what decides whether an experiment gets promoted.",
  "stats": [
    {
      "value": "4 days → 6 hrs",
      "label": "From a new screen brief to a reviewable build",
      "provisional": true
    },
    {
      "value": "83%",
      "label": "Of a new screen assembled from existing components",
      "provisional": true
    },
    {
      "value": "0",
      "label": "Contrast regressions since the check went in",
      "provisional": true
    }
  ],
  "frames": [],
  "recruiter": {
    "role": "Product Designer",
    "timeline": "2026",
    "liveAt": null,
    "domain": "Gov tech · Courts · Design systems",
    "platform": "Next.js web app · Tailwind tokens · shadcn/Radix",
    "team": "Solo build on the PUCAR design system — scope per surface is in the ledger",
    "problem": "A documented design system proves nothing on its own. Tokens are asserted rather than measured, components are shown in isolation where they always look fine, and a failing colour pair is discovered by a user rather than by a check.",
    "shipped": "A court workspace with the system inside it: 31 token pairs re-measured from the rendered result in both themes, five experiment surfaces including a scrutiny workspace with a switchable no-AI state, and a promotion rule that depends on the measurement rather than on an opinion.",
    "owned": [
      "Design tokens",
      "Component design",
      "Interaction design",
      "AI UX",
      "Accessibility",
      "Documentation",
      "Front-end build"
    ],
    "bullets": [
      "Built a working court workspace with the design system in the other half of its sidebar. Dashboard, cases and filing on one side; foundations, components and a scratch surface on the other — same shell, same tokens, one click apart.",
      "The system measures its own output. Foundations reads every colour back from the browser after the cascade resolves, so 31 pairs are re-derived per theme instead of copied from the token file — a token that fails silently is a bug in tokens.ts, not a styling opinion.",
      "Designed the no-AI state as a first-class, switchable state. A toggle takes the scrutiny workspace to manual: the banner states assistance is unavailable, mismatch cards go, and an officer can still finish the review. Court software cannot have a degraded state that is merely a broken one.",
      "The pair with no room left is in the case study, not hidden. Success and destructive pills both measure 4.54:1 against a 4.5:1 floor — four hundredths — written up as standing risks with a proposed guard rather than as passes.",
      "The measurement layer catches contrast and only contrast. It cannot see a wrong information architecture, bad copy, or an AI callout that overstates its confidence — which is why this is a rig for trying screens, not a machine for shipping them."
    ]
  },
  "caseFile": {
    "causeList": {
      "label": "Cause list",
      "heading": "Three matters, one line each",
      "note": "One deployed app: the product, the system that built it, and the rig where new screens get tried."
    },
    "heroExhibits": [
      {
        "id": "A",
        "src": "assets/work/oncourt/01-scrutiny-ai-mismatch.png",
        "alt": "Three-pane scrutiny workspace with two AI mismatch cards offering accept, keep or flag against the filed value",
        "caption": "Scrutiny — mismatch, with the decision left to the officer",
        "clearance": "public",
        "ratio": "1800 / 992"
      },
      {
        "id": "B",
        "src": "assets/work/oncourt/02-scrutiny-ai-unavailable.png",
        "alt": "The same scrutiny screen with assistance unavailable — banner, collapsed mismatch panel, manual checks stated",
        "caption": "The same screen with AI off — a designed state, not a failure state",
        "clearance": "public",
        "ratio": "1800 / 992"
      },
      {
        "id": "C",
        "src": "assets/work/oncourt/03-foundations-light.png",
        "alt": "Foundations page framing the token set as a laboratory, reporting 31 pairs clearing AA after the cascade resolves",
        "caption": "Foundations — the system measuring what it actually rendered",
        "clearance": "public",
        "ratio": "1800 / 992"
      },
      {
        "id": "I",
        "src": "assets/work/oncourt/09-test-ui-index.png",
        "alt": "The Test UI index listing four experiments, showing this is a rig for trying screens rather than a feature set",
        "caption": "Test UI — four experiments, two of them full screen",
        "clearance": "public",
        "ratio": "1800 / 992"
      }
    ],
    "premise": {
      "heading": "The thesis",
      "body": [
        "A design system that can measure its own output, sitting inside the product it produced, with a scratch surface for running new screens against it. An agent can generate a court screen; the system checks whether the result is actually accessible; the sandbox hosts the experiment. The loop closes without a human eyeballing a swatch.",
        "The sidebar says it before any of the copy does. Dashboard, Cases, Hearings, Documents, Parties on one side. Foundations, Components, Test UI on the other. The left half is a plausible court product; the right half is the system that built it, in the same shell and under the same tokens.",
        "Two floors are in play throughout, and they are not the same: 4.5:1 for text, 3:1 for boundaries and other non-text contrast. Reporting them together would hide the pairs that only clear the lower one."
      ],
      "citation": {
        "label": "WCAG 2.2, SC 1.4.3 Contrast (Minimum) and SC 1.4.11 Non-text Contrast — W3C",
        "href": "https://www.w3.org/TR/WCAG22/#contrast-minimum"
      }
    },
    "ledger": {
      "heading": "Where I came in",
      "body": [
        "Six surfaces, and they were not all mine in the same way. The labels are the point: a reader should be able to trust them, so they are stated as scope rather than as credit."
      ],
      "columns": [
        "Surface",
        "Mode",
        "Scope"
      ],
      "rows": [
        {
          "matter": "Design system — tokens, 31 pairs",
          "mode": "Designed",
          "scope": "Primitive ramps, semantic layer, component adaptations"
        },
        {
          "matter": "Foundations measurement page",
          "mode": "Contributed",
          "scope": "Designed the page — measurement implementation authorship to confirm"
        },
        {
          "matter": "Filing flow (5 steps)",
          "mode": "Designed",
          "scope": "Grouped document slots, OCR read-back, blocker states"
        },
        {
          "matter": "Scrutiny workspace + AI states",
          "mode": "Designed",
          "scope": "Three-pane review, the mismatch triad, the no-AI mode"
        },
        {
          "matter": "Components library",
          "mode": "Designed",
          "scope": "Patterns, navigation, disclosure rules against screen-craft"
        },
        {
          "matter": "Test UI rig",
          "mode": "Designed",
          "scope": "The scratch surface and the promotion rule behind it"
        }
      ],
      "modeKey": [
        [
          "Designed",
          "owned end to end"
        ],
        [
          "Contributed",
          "owned a defined slice inside someone else's scope"
        ],
        [
          "Audited",
          "evaluated existing work"
        ],
        [
          "Proposed",
          "recommended; not adopted, or not yet"
        ]
      ]
    },
    "matters": [
      {
        "no": "001",
        "slug": "matter-001",
        "title": "Measuring what rendered, not what was written",
        "state": "Deployed",
        "mode": "Contributed",
        "oneLine": "Foundations reads colours back from the browser, so the system checks itself.",
        "context": [
          "Foundations presents the token set as a laboratory rather than a swatch sheet. Every pair is read back from the browser after the cascade has resolved, which means the number on screen is the number that painted — not the number the token file intended. Flip the theme in the header and all 31 pairs re-derive.",
          "The dark column is not the light column recalculated. Every value is measured again in the other theme, which is why body text reads 15.98:1 in light and 16.25:1 in dark rather than one being derived from the other."
        ],
        "contrast": {
          "label": "What Foundations reports — measured after the cascade, both themes",
          "pairs": [
            {
              "pair": "Body text",
              "tokens": "--foreground on --background",
              "light": 15.98,
              "dark": 16.25,
              "floor": 4.5
            },
            {
              "pair": "Sidebar",
              "tokens": "--sidebar-foreground on --sidebar",
              "light": 15.58,
              "dark": null,
              "floor": 4.5
            },
            {
              "pair": "Prefilled field",
              "tokens": "--input-prefilled-foreground on --input-prefilled",
              "light": 15.76,
              "dark": null,
              "floor": 4.5
            },
            {
              "pair": "Warning solid",
              "tokens": "--warning-foreground on --warning",
              "light": 9.47,
              "dark": null,
              "floor": 4.5
            },
            {
              "pair": "Warning ink",
              "tokens": "--warning-ink on --warning-muted",
              "light": 5.17,
              "dark": null,
              "floor": 4.5
            },
            {
              "pair": "Primary button label",
              "tokens": "--primary-foreground on --primary",
              "light": 4.9,
              "dark": 7.5,
              "floor": 4.5
            },
            {
              "pair": "Success pill",
              "tokens": "--success-muted-foreground on --success-muted",
              "light": 4.54,
              "dark": null,
              "floor": 4.5,
              "risk": "Four hundredths of headroom. Any future nudge to either token — a lightened surface, a tweaked ink — drops it below the floor, and the failure would be silent unless something is watching. Proposed guard: a minimum-headroom rule in the check, not a comment in the token file."
            },
            {
              "pair": "Destructive pill",
              "tokens": "--destructive-muted-foreground on --destructive-muted",
              "light": 4.54,
              "dark": null,
              "floor": 4.5,
              "risk": "Same margin, same guard. Two of the three status pills sit at the floor, which suggests the muted surfaces were tuned to just clear it rather than to hold a margin."
            },
            {
              "pair": "Field boundary",
              "tokens": "--input-border on --background",
              "light": 3.22,
              "dark": null,
              "floor": 3,
              "risk": "Non-text contrast, so the floor is 3:1 rather than 4.5:1. It clears, with 0.22 to spare — worth knowing before anyone softens a border."
            }
          ],
          "note": "31 pairs clear AA in both themes, with decorative hairlines and surface fills exempted and measured apart. The flagged rows are not failures. They are the pairs with no room left, and they are written up as standing risks rather than as passes."
        },
        "decisions": [
          {
            "constraint": "A token file can be correct and the rendered result still wrong — a cascade override, a fallback, a shadow, an opacity layer. Auditing the source catches none of that.",
            "options": [
              "Audit tokens.ts and trust the cascade",
              "A CI check comparing token values against the floors",
              "Read every colour back from the browser after the cascade resolves, in both themes"
            ],
            "chose": "Foundations measures what painted. Nothing is copied from the token file; flip the theme and all 31 pairs re-derive.",
            "why": "The floor is a property of the rendered pixel, not of the source. Everything that can change a colour on its way to the screen is exactly what an audit needs to see.",
            "cost": "It only measures pairs someone thought to register, so coverage is a curation problem — 31 pairs clearing AA is a claim about the registry, not about the app. The next thing to build is the check that fails when a component ships a colour pairing the registry has never heard of.",
            "lever": "Lever 3 &middot; Evolve rules to match digital tools"
          }
        ],
        "rejected": [
          {
            "direction": "Publishing the tokens as a documentation site",
            "whyNot": "It tells you what the tokens are and proves nothing. A working app under the same tokens gives the measurement page something real to measure, and puts every component under content density it cannot fake."
          },
          {
            "direction": "A Storybook alongside the product",
            "whyNot": "Storybook shows components in isolation, which is exactly where they always look fine. The interesting failures only appear inside a dense screen with real content in it."
          }
        ],
        "exhibits": [
          {
            "id": "D",
            "src": "assets/work/oncourt/04-foundations-dark.png",
            "alt": "Foundations in dark theme with every contrast ratio re-derived rather than converted from the light values",
            "caption": "Foundations, dark — same 31 pairs, every number re-measured",
            "clearance": "public",
            "ratio": "1800 / 992"
          },
          {
            "id": "E",
            "src": "assets/work/oncourt/05-foundations-status-pairs.png",
            "alt": "Status token pairs showing the success and destructive pills sitting at 4.54:1 against a 4.5:1 floor",
            "caption": "Status pairs — where the four-hundredths pair lives",
            "clearance": "public",
            "ratio": "1800 / 992"
          },
          {
            "id": "F",
            "src": "assets/work/oncourt/06-foundations-boundaries.png",
            "alt": "Non-text contrast section measuring boundaries against the 3:1 floor with decorative hairlines exempted",
            "caption": "Boundaries measured against 3:1, hairlines exempted and measured apart",
            "clearance": "public",
            "ratio": "1800 / 992"
          }
        ]
      },
      {
        "no": "002",
        "slug": "matter-002",
        "title": "The experiment surfaces",
        "state": "Deployed",
        "mode": "Designed",
        "oneLine": "Five screens built to be tried against the system, measured, and thrown away.",
        "context": [
          "Test UI describes itself as a scratch surface for trying screens against the design system. That framing matters more than any individual screen on it: these are experiments, not features, and the rig is the deliverable.",
          "Two of them open full screen, because a filing step and an officer's review workspace cannot be judged inside a panel."
        ],
        "surfaces": {
          "label": "Five experiment surfaces",
          "items": [
            {
              "name": "Complete your profile",
              "tests": "The Figma → system translation — an onboarding modal redesigned into Pucar tokens",
              "route": "in-workspace",
              "fullScreen": false
            },
            {
              "name": "Pending payment dialog",
              "tests": "Payment under verification — amount receipt, one calm note, progressive disclosure",
              "route": "in-workspace",
              "fullScreen": false
            },
            {
              "name": "Document upload step",
              "tests": "Step 3 of 5 of the filing flow — grouped slots, OCR read-back, focused layout",
              "route": "/filing/documents",
              "fullScreen": true
            },
            {
              "name": "Scrutiny review workspace",
              "tests": "Officer review of an S.138 filing — evidence marking, mismatch callouts, flag composer",
              "route": "/scrutiny",
              "fullScreen": true
            },
            {
              "name": "New case form",
              "tests": "The structured-entry counterpart to the upload-first flow",
              "route": "/settings",
              "fullScreen": true
            }
          ]
        },
        "decisions": [
          {
            "constraint": "An officer still has to finish the review when the assistance is down. A degraded state cannot just be a broken version of the good one.",
            "options": [
              "Hide the AI affordances when unavailable",
              "Show them disabled with an error",
              "Ship a switchable no-AI mode that changes what the workspace claims, not only what it shows"
            ],
            "chose": "A 'Simulate AI unavailable' toggle in the header. With it on, a banner states that assistance is unavailable for this file and all checks are manual, every mismatch card goes, and the fields that never had a document to verify against still say so.",
            "why": "You cannot design a fallback you cannot stand in. As a toggle, the degraded state is testable by anyone — including me months later, and including whoever is reading this case study.",
            "cost": "Two full states to keep in sync, and one honest bug that fell out of it: with AI off the panel reports 'All fields reviewed' when no human has reviewed anything yet. That phrasing is doing optimistic work. It is on the list, not defended.",
            "lever": "Lever 3 &middot; Evolve rules to match digital tools"
          },
          {
            "constraint": "Extraction moves work earlier. Left alone, it also moves the decision — from the officer to the model.",
            "options": [
              "Auto-apply the highest-confidence value",
              "Auto-apply and write it to a log",
              "Surface the conflict and never replace a filed value without a decision"
            ],
            "chose": "Every mismatch names the document it came from, describes the conflict in a sentence a person can check, and offers exactly three: Accept suggestion &middot; Keep filed value &middot; Flag.",
            "why": "A wrong auto-filled field is worse than an empty one; it looks like a fact somebody already agreed to. Three explicit choices keep the agreement where it belongs.",
            "cost": "Three fields needing attention is three decisions the officer would not otherwise be making. The design buys accountability with the officer's time, and that trade should be stated rather than buried.",
            "lever": "Lever 5 &middot; Don't wait for information you don't need"
          },
          {
            "constraint": "A generic upload-your-documents dropzone pushes the grouping burden onto the person least equipped to carry it.",
            "options": [
              "One dropzone, sort it out later",
              "Group by file type",
              "Group the way the statute organises the case, and repeat the group per instrument"
            ],
            "chose": "Slots grouped as Cheques, Complainants, Notice &amp; service, and Supporting (optional) — each cheque a card holding front and bank return memo, 'Add another complainant' repeating the group. Progress reads 5 of 7 required documents &middot; 2 to go, and the primary action stays disabled with the blocker named in the footer.",
            "why": "The filing has a shape in law. Matching it means the interface can say what is missing in the same words the case uses, instead of asking someone to invent a folder structure.",
            "cost": "The structure has to be maintained per case type. Every new cause of action needs a schema, not just a form.",
            "lever": "Lever 5 &middot; Don't wait for information you don't need"
          }
        ],
        "rejected": [
          {
            "direction": "Auto-applying high-confidence extractions and logging the change",
            "whyNot": "Cheaper for the officer and quietly corrosive — the record would change without a person agreeing to it. Logged is not the same as decided."
          },
          {
            "direction": "Shipping the experiments straight into the workspace nav",
            "whyNot": "An experiment that appears as a feature stops being disposable. Keeping them behind Test UI is what makes it cheap to throw one away."
          }
        ],
        "exhibits": [
          {
            "id": "G",
            "src": "assets/work/oncourt/07-filing-documents.png",
            "alt": "Filing step 3 of 5 with document slots grouped by filing role and the primary action disabled with the blocker named",
            "caption": "Step 3 of 5 — grouped by filing role, blocker named in the footer",
            "clearance": "public",
            "ratio": "1800 / 992"
          },
          {
            "id": "H",
            "src": "assets/work/oncourt/08-filing-documents-lower.png",
            "alt": "Notice and service group with optional supporting documents and empty slot states showing what each slot expects",
            "caption": "Optional groups and empty slot states",
            "clearance": "public",
            "ratio": "1800 / 992"
          },
          {
            "id": "J",
            "src": "assets/work/oncourt/10-dashboard-light.png",
            "alt": "Court dashboard with the KPI row, filings chart and active docket split, on synthetic demo figures",
            "caption": "Dashboard — demo data throughout, not programme outcomes",
            "clearance": "public",
            "ratio": "1800 / 992"
          },
          {
            "id": "M",
            "src": "assets/work/oncourt/13-case-detail-overview.png",
            "alt": "Case detail overview summarising an S.138 filing with parties and documents in the right rail",
            "caption": "Case detail — the product half of the shell, same tokens",
            "clearance": "public",
            "ratio": "1800 / 992"
          },
          {
            "id": "O",
            "src": "assets/work/oncourt/15-components-patterns.png",
            "alt": "Components page documenting progressive disclosure rules and citing the screen-craft rulebook by section",
            "caption": "Components — patterns documented against a written rulebook",
            "clearance": "public",
            "ratio": "1800 / 992"
          }
        ]
      },
      {
        "no": "003",
        "slug": "matter-003",
        "title": "Auditing my own prototype",
        "state": "Reported",
        "mode": "Audited",
        "oneLine": "Seven reproducible defects in my own build, ranked, with what held up named too.",
        "context": [
          "One pass through the deployed app, every defect reproduced before it was written down. These are mine — it is my prototype, so this is an audit of my own work rather than someone else's, and it is here because a case study that shows only the working parts is a brochure."
        ],
        "findings": [
          {
            "n": "1",
            "finding": "/settings serves the New case form, and the header's New case button points there.",
            "why": "Route and purpose disagree, and a real settings page now has nowhere to live. Cheap to fix, and the kind of thing that reads as unfinished to anyone who looks at the URL bar.",
            "severity": "High"
          },
          {
            "n": "2",
            "finding": "Sidebar Hearings, Documents and Parties, plus Help &amp; support, are all href=\"#\".",
            "why": "Four items present as live and do nothing. Either disable them visibly or ship stubs — a nav that lies about what exists costs more trust than a nav with fewer items.",
            "severity": "High"
          },
          {
            "n": "3",
            "finding": "The filing page's sticky header detaches mid-scroll, leaving a blank band above it and the header floating over empty space.",
            "why": "A stacking and paint problem on the flow that matters most, and it will almost certainly be worse at 390px.",
            "severity": "Medium"
          },
          {
            "n": "4",
            "finding": "Scroll position is not reset on client-side navigation — arriving at Components lands mid-page, and Home did not restore the top.",
            "why": "The reader loses the start of every page they navigate to, which makes a documentation surface feel broken even when the content is right.",
            "severity": "Medium"
          },
          {
            "n": "5",
            "finding": "The case detail h1 is clipped by the sticky header when scrolled — the case title slides under it rather than behind a solid surface.",
            "why": "Same class of problem as the nav-pill overlap found on the public site: a transparent sticky layer over content that needs to stay readable.",
            "severity": "Medium"
          },
          {
            "n": "6",
            "finding": "The Documents tab on the case detail defers to the right rail — see the panel on the right.",
            "why": "A tab that does no work while a duplicate panel does it. Pick one surface and let the other go.",
            "severity": "Low"
          },
          {
            "n": "7",
            "finding": "The theme toggle needed two activations on first use and did not survive the first navigation. It worked and persisted thereafter.",
            "why": "A first-run hydration or persistence order problem. Small, but it is the first thing a reviewer touches.",
            "severity": "Low"
          }
        ],
        "worked": "What held up, and it is most of it: visible focus rings on icon buttons, monospace CNR and token names, sentence case throughout, tabs that switch cleanly, a dark theme that is genuinely complete rather than inverted, and copy discipline I would defend anywhere — 'Rare or advanced fields are hidden behind a trigger, never deleted. Critical information never lives only behind one.'",
        "selfNote": "Findings 3 and 5 are both sticky-layer problems, which sets a standard for this page too: nothing here scrolls under a transparent bar over text that has to stay readable.",
        "openIssue": {
          "label": "Held back before publishing",
          "body": "The scrutiny sample ships plausible identity-document content — a masked number, an address, a date of birth. It is invented, but invented identity data reads badly on a public portfolio in this sector, so those exhibits stay unpublished until the mock is restyled as visibly dummy content or the document pane is blurred. The dashboard figures are demo data too, and are labelled as demo data wherever they appear rather than presented as programme outcomes."
        },
        "rejected": [
          {
            "direction": "Fixing the seven quietly and publishing only the finished version",
            "whyNot": "The audit is the working practice, and it is more useful evidence than a clean screenshot. The fixes are worth doing; hiding that they were needed is not."
          }
        ]
      }
    ],
    "loopSection": {
      "heading": "How a screen gets made",
      "body": [
        "The question a portfolio reader will have is how much of this is automated, and the app already answers it. Two details make the pipeline credible rather than aspirational, and both are observable: the Components page cites a screen-craft rulebook by section number, so the generation stage has a written spec rather than vibes; and AGENTS.md exists so an agent can read the system instead of guessing at it."
      ],
      "loop": {
        "label": "Generate, host, measure",
        "inputs": [
          {
            "label": "Figma tokens → tokens.ts → globals.css",
            "note": "the values, mapped through @theme inline"
          },
          {
            "label": "screen-craft rulebook",
            "note": "the written spec — Components cites it by section, 'per screen-craft §5'"
          },
          {
            "label": "AGENTS.md",
            "note": "so an agent can read the system rather than guess at it"
          },
          {
            "label": "component inventory",
            "note": "what already exists, so nothing gets reinvented"
          }
        ],
        "stages": [
          {
            "label": "coding agent",
            "note": "generates a screen against the rulebook and the tokens"
          },
          {
            "label": "/test-ui",
            "note": "hosts the experiment — a scratch surface, not a release"
          },
          {
            "label": "/foundations",
            "note": "measures what actually rendered, in both themes"
          }
        ],
        "branches": [
          {
            "cond": "31 pairs clear AA",
            "then": "promote it to /components"
          },
          {
            "cond": "a pair drops below its floor",
            "then": "a bug in tokens.ts, not a styling opinion",
            "fail": true
          }
        ],
        "gap": "Contrast, and only contrast. The loop cannot see a wrong information architecture, bad copy, a mis-grouped document slot, or an AI callout that overstates its confidence. Those still need a designer — which is the reason this is a rig for trying screens, not a machine for shipping them."
      }
    },
    "differently": {
      "heading": "What I'd do differently",
      "items": [
        {
          "title": "Ship the tokens as an installable artefact.",
          "body": "The sandbox proves the system inside one app. It still does not let a second app consume it — no package, no registry endpoint — so the system travels as a repo to copy from rather than a dependency to install."
        },
        {
          "title": "Guard the floor in the check, not in a comment.",
          "body": "Two pills sitting at 4.54:1 are visible because something measures them, but nothing stops the next commit from pushing one under. A minimum-headroom rule belongs in the same place the measurement lives."
        },
        {
          "title": "Register pairs by construction, not by hand.",
          "body": "Coverage is curated, so the honest claim is about the registry rather than the app. The check I want next fails when a component renders a colour pairing the registry has never seen."
        }
      ]
    },
    "forward": {
      "heading": "What I'm taking forward",
      "items": [
        "Measure the rendered result, not the source. Everything that can change a value on its way to the screen is exactly what an audit needs to see.",
        "Design the degraded state as a state. If it cannot be switched on and stood in, it has not been designed.",
        "Say what the automation cannot see. The loop's limit is the most useful paragraph in the whole case study."
      ]
    }
  }
}$$,
  8
)
on conflict (id) do update set
  status=excluded.status, title=excluded.title, category=excluded.category,
  year=excluded.year, description=excluded.description, tags=excluded.tags,
  color=excluded.color, icon_gradient=excluded.icon_gradient,
  accent_color=excluded.accent_color, thumb=excluded.thumb,
  detail=excluded.detail, sort_order=excluded.sort_order;
