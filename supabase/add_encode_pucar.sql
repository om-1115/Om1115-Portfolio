-- Generated from js/data.js — do not hand-edit the JSON.
-- Needs the thumb column: run supabase/add_thumb_column.sql first.
insert into projects (id, status, title, category, year, description, tags, color, icon_gradient, accent_color, thumb, detail, sort_order) values
(
  $$07$$, $$shipped$$, $$Encode Pucar$$, $$Product Design$$, $$2026$$,
  $$Court software designed for people who did not choose to be in court — a filing redesign, the design system under it, and an audit of the public face.$$, $$["Gov Tech","Judiciary","AI UX","Design Systems"]$$, $$#f0f6f5$$,
  $$linear-gradient(135deg,#007e7e,#0d9488)$$, $$#007e7e$$, $$assets/work/thumbs/encode-pucar.png$$,
  $${
  "role": "Product Designer",
  "challenge": "Court delay is rarely one large failure. It accumulates from small, ordinary frictions — a token court fee that slips a lawyer's mind, a postal stamp bought and handed over by hand, a requirement revealed at the last moment — and each one can cost a hearing date. Filing software that asks a litigant for facts they have already handed over on paper adds to that pile rather than clearing it.",
  "outcome": "A filing flow rebuilt around upfront document upload, machine extraction, and a review screen that shows what the system already knows; a deployed court workspace with the design system living inside it, measuring its own rendered output in both themes; and a severity-ranked audit of the public site, written so a developer could close each finding.",
  "stats": [
    {
      "value": "38%",
      "label": "Fewer filings returned at scrutiny",
      "provisional": true
    },
    {
      "value": "11 min",
      "label": "Median time to complete a filing, from 26",
      "provisional": true
    },
    {
      "value": "2.4×",
      "label": "Filings finished without help from the counter",
      "provisional": true
    }
  ],
  "frames": [
    {
      "type": "desktop",
      "label": "Review screen — extracted values marked beside the source document"
    },
    {
      "type": "mobile",
      "label": "Mobile fallback — correction overlay where the error is seen"
    },
    {
      "type": "desktop",
      "label": "Token ramps — the semantic layer aliased over the primitives"
    },
    {
      "type": "desktop",
      "label": "Audit sheet — four findings ranked by severity, each with the fix"
    }
  ],
  "recruiter": {
    "role": "Product Designer",
    "timeline": "Sep 2025 — Present · part-time, via Agami",
    "liveAt": "https://pucar.org/",
    "domain": "Gov tech · Courts · Judiciary",
    "platform": "Web app · Design system",
    "team": "PUCAR / Agami · cross-functional — my slice is in the role ledger",
    "problem": "Court delay accumulates from small frictions — a token fee that slips someone's mind, a stamp bought and handed over by hand, a requirement revealed at the last moment. Filing software that asks for what a litigant already handed over on paper adds to the pile.",
    "shipped": "A filing flow built on upfront upload and an inspectable extraction review; ON Court, a deployed court workspace with the design system inside it measuring its own rendered output; and a severity-ranked audit of the public site.",
    "owned": [
      "Flows",
      "Interaction design",
      "AI UX scoping",
      "Design tokens",
      "Component design",
      "Documentation",
      "UI audit"
    ],
    "bullets": [
      "Built ON Court, a working court workspace with the design system living inside it. Dashboard, cases and filing on one side of the sidebar; foundations, components and a scratch surface for new screens on the other — same shell, same tokens, one click apart.",
      "The system measures its own output. Foundations reads every colour back from the browser after the cascade resolves, so 31 token pairs are re-derived in both themes instead of trusted from the token file — and the no-AI state of the scrutiny workspace is a switchable state, not a broken version of the good one.",
      "Redesigned court e-filing rather than reskinning it. Documents go up first, the system extracts the fields, and the review screen becomes the primary surface instead of a wizard asking for facts already on the paper.",
      "The pair with no room left is in the case study, not hidden. Success and destructive pills both measure 4.54:1 against a 4.5:1 floor — four hundredths of headroom — written up as standing risks with a proposed guard, beside the warning token that used to measure 1.54:1 and now measures 9.47:1 solid.",
      "The measurement layer catches contrast and only contrast. It cannot see a wrong information architecture, bad copy, or an AI callout that overstates its confidence — saying so is what keeps the loop a rig for trying screens rather than a machine for shipping them."
    ]
  },
  "caseFile": {
    "causeList": {
      "label": "Cause list",
      "heading": "Three matters, one line each",
      "note": "Design decisions mapped to five published reform levers."
    },
    "heroExhibits": [
      {
        "id": "A",
        "src": "assets/work/oncourt/07-filing-documents.png",
        "alt": "Filing step three of five with document slots grouped by filing role and the primary action disabled until the gaps are named",
        "caption": "Matter 001 — filing, grouped the way the statute organises the case",
        "clearance": "public",
        "ratio": "1800 / 992"
      },
      {
        "id": "B",
        "src": "assets/work/oncourt/03-foundations-light.png",
        "alt": "Foundations page reporting contrast measured back from the rendered result rather than read from the token file",
        "caption": "Matter 002 — the system, measuring what it actually rendered",
        "clearance": "public",
        "ratio": "1800 / 992"
      },
      {
        "id": "C",
        "src": "assets/work/pucar-site/03-nav-pill-over-cta.png",
        "alt": "The public site's fixed nav pill sitting on top of a linked card, cutting off the card's own subtitle line",
        "caption": "Matter 003 — the nav pill occluding a click target, reproduced on the live site",
        "clearance": "public",
        "ratio": "1800 / 1013"
      }
    ],
    "premise": {
      "heading": "The premise",
      "body": [
        "Nobody arrives at a district court by choice. They arrive with a dispute, a bundle of documents, a day taken off work, and no map of what happens next. PUCAR — the Public Collective for Avoidance and Resolution of Disputes, anchored by Agami — is a non-profit mission rebuilding court software around that person rather than around the register.",
        "The framing I designed against is PUCAR's own, published as the third part of a Bar &amp; Bench series by Supriya Sankaran and Siddarth Raman. Read that way, delay is not one large failure — it is an accumulation of small, ordinary frictions, each of which can cost a listed hearing. Which makes faster case disposal the wrong design target. The target is removing the reasons a hearing cannot happen on the day it was listed.",
        "My read: software cannot clear all of those frictions, and stretching the claim is how gov-tech products lose the confidence of the institutions that adopt them. What software can do is stop creating new work, and stop asking people for what they have already handed over."
      ],
      "citation": {
        "label": "Sankaran, S. &amp; Raman, S., “Five strategic levers for court transformation,” Bar &amp; Bench, 15 May 2026",
        "href": "https://www.barandbench.com/columns/five-strategic-levers-for-court-transformation"
      }
    },
    "ledger": {
      "heading": "Where I came in",
      "body": [
        "Six surfaces, and they were not all mine in the same way. The labels below are the point: a reader should be able to trust them, so they are stated as scope rather than as credit.",
        "Two things were already settled when I arrived. The platform was DRISTI, and the AI in scope was deliberately narrow — OCR extraction from uploaded documents, and rule-based field validation. Both were chosen for reliability rather than novelty, which is the constraint that shaped every decision in Matter 001."
      ],
      "columns": [
        "Surface",
        "Mode",
        "Scope"
      ],
      "rows": [
        {
          "matter": "E-filing redesign",
          "mode": "Contributed",
          "scope": "The filing and review flow, inside PUCAR's product scope"
        },
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
          "matter": "pucar.org UI audit",
          "mode": "Audited",
          "scope": "Solo, unsolicited — evaluated work I did not design"
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
        "title": "E-filing redesign",
        "state": "Shipped to review",
        "mode": "Contributed",
        "oneLine": "Rebuilt filing around upfront upload and an inspectable extraction review.",
        "context": [
          "Court e-filing, redesigned rather than reimplemented — explicitly not a reskin of the existing screens. A stepped wizard asked a person to type, field by field, what was already printed on the documents in their hand.",
          "So the flow inverts. Everything is uploaded upfront, the system extracts what it can read, and the review screen — not the form — becomes the place the work happens."
        ],
        "goals": [
          "Find the UX patterns that hold when a machine fills the fields.",
          "Identify the UI elements that repeat, and make them the first component set.",
          "Define atoms, tokens and variables from those components — the bridge into Matter 002."
        ],
        "decisions": [
          {
            "constraint": "A person has already handed the documents over. Asking them to retype what is printed on the page is the friction — the form is only where it shows up.",
            "options": [
              "Keep the stepped wizard, extract inline per step",
              "Full-page review after upload",
              "Split review — extracted fields beside the source document"
            ],
            "chose": "Split review: extracted fields on the left, the source document on the right at roughly 30% width, auto-scrolling to the region the current field came from.",
            "why": "The reviewer's question is always the same — does this match the paper? Putting the answer in the same eyeful removes the memory work.",
            "cost": "The split cannot hold on a small screen, so the flow carries two review patterns instead of one, and both have to stay in sync as fields change.",
            "lever": "Lever 5 · Don't wait for information you don't need"
          },
          {
            "constraint": "Fixing one wrong character meant navigating back to an earlier step.",
            "options": [
              "Send the user back to the originating step",
              "A modal per field",
              "Edit where the error is seen — side panel on web, overlay on mobile"
            ],
            "chose": "Corrections happen in place: a side panel on web, an overlay on mobile.",
            "why": "My read was that the trip backwards is where filings were abandoned — the cost of fixing one character was a full re-navigation.",
            "cost": "Two edit surfaces to design, test and document, and a review screen that holds more state than a read-only summary would.",
            "lever": "Lever 2 · Break down silos"
          },
          {
            "constraint": "The split review needs horizontal room, and the left rail was spending it.",
            "options": [
              "Keep the left rail, narrow the document pane",
              "Collapsible rail",
              "Top navbar with section-level submenus"
            ],
            "chose": "Moved navigation from the left rail to a top navbar with section-level submenus.",
            "why": "Two things were true at once — the review needed the width, and section-level submenus described a filing better than a flat rail did. My read is that the width mattered more; I am confirming which one drove it before this reads as settled.",
            "cost": "Deep sections sit one hover away instead of always visible, and the top bar has to carry more labels on narrow screens."
          },
          {
            "constraint": "A wrong auto-filled field is worse than an empty one — it looks like a fact the user already agreed to.",
            "options": [
              "Trust the extraction silently",
              "Show a confidence score per field",
              "Mark every machine-filled value so it reads differently from what the user typed"
            ],
            "chose": "Colour-marked the auto-filled values, each carrying a text label as well as the colour.",
            "why": "Trust has to be inspectable. Marking what the machine asserted keeps the burden of verification on the page, where the person can discharge it.",
            "cost": "A busier review screen, and because colour alone is not enough the marking needs a label everywhere it appears — more markup, more to keep consistent.",
            "lever": "Lever 5 · Don't wait for information you don't need"
          }
        ],
        "rejected": [
          {
            "direction": "Keeping the stepped wizard with inline extraction",
            "whyNot": "It preserved the thing that was actually wrong. Extraction inside a wizard still asks the person to move forward through questions the documents have already answered."
          },
          {
            "direction": "An LLM for extraction instead of OCR plus rules",
            "whyNot": "The templates are effectively standardised and the scans are usually clean printed text, where OCR returns text with coordinates — which is exactly what the split view needs in order to point at a region. A model would have added a failure mode we could not show the user. Poor scans and varied layouts are where a model earns its place, and that was not this flow."
          }
        ],
        "exhibits": [
          {
            "id": "F",
            "src": "assets/work/oncourt/08-filing-documents-lower.png",
            "alt": "Notice and service group with optional supporting documents and empty slots stating what each one expects",
            "caption": "Upload-first, in the sandbox prototype — every slot says what belongs in it",
            "clearance": "public",
            "ratio": "1800 / 992"
          },
          {
            "id": "G",
            "src": "assets/work/oncourt/01-scrutiny-ai-mismatch.png",
            "alt": "Review workspace with extracted values beside the source document and each conflict offering accept, keep or flag",
            "caption": "Review beside the source — the machine asserts, the person decides",
            "clearance": "public",
            "ratio": "1800 / 992"
          }
        ]
      },
      {
        "no": "002",
        "slug": "matter-002",
        "title": "From screens to a system",
        "state": "Deployed prototype",
        "mode": "Designed",
        "oneLine": "The components became a system, and the system became a working court app.",
        "context": [
          "The component set from the filing work became a documented system — primitive ramps with a semantic layer aliased on top, Tailwind tokens mapped through @theme inline, shadcn/Radix primitives with PUCAR adaptations patched over upstream, and an AGENTS.md written for coding agents rather than only for people.",
          "It did not stay a documentation site. What is deployed is ON Court: a working court workspace with the design system living in the other half of its sidebar, measuring its own rendered output in both themes and hosting new screens as experiments. That has its own case study — <a class=\"cf-xref\" href=\"project.html?id=08\">read the ON Court sandbox &rarr;</a>"
        ],
        "decisions": [
          {
            "constraint": "The brand palette's warning colour measured about 1.54:1 against its own surface. That is a real number, and it did not pass.",
            "options": [
              "Claim AA across the palette and hope nobody measures",
              "Redraw the brand warning colour",
              "Keep the colour and carry the contrast inside the component"
            ],
            "chose": "Kept the brand colour and moved the burden into the component — the solid warning button shipped a warning-ink border, which is what made that state pass.",
            "why": "The palette was not mine to redraw mid-flight, and a documented mitigation can be audited. Silence cannot.",
            "cost": "Every non-solid warning usage stayed a known risk, so the system had to document where the token may not be used. The ramp has since been darkened — warning now measures 9.47:1 solid and 5.17:1 ink — but only because something was finally measuring it, which is the argument the ON Court case study makes at length.",
            "lever": "Lever 3 &middot; Evolve rules to match digital tools"
          }
        ],
        "rejected": [
          {
            "direction": "Shipping the system as a documentation site",
            "whyNot": "A docs site tells you what the tokens are. It cannot show you they hold up, and it gives nothing real to measure. Replacing it with a working app under the same tokens is the whole of matter 002's second half."
          }
        ],
        "exhibits": [
          {
            "id": "L",
            "src": "assets/work/oncourt/09-test-ui-index.png",
            "alt": "The sandbox's Test UI index listing four experiments, which is what the components became once they had somewhere to be tried",
            "caption": "Where the components went — a rig for trying screens, not a docs page",
            "clearance": "public",
            "ratio": "1800 / 992"
          }
        ],
        "openIssue": {
          "label": "Open issue",
          "body": "The body and UI face is Helvetica Neue while the system claims Indic script support. Helvetica Neue has no Devanagari coverage, so an undocumented fallback chain is doing real work — including for the Kerala deployment. Either the fallback gets documented in the system or it stays an open issue here; it does not get quietly claimed as coverage."
        }
      },
      {
        "no": "003",
        "slug": "matter-003",
        "title": "Auditing the public face",
        "state": "Reported",
        "mode": "Audited",
        "oneLine": "Four reproducible defects on the public site; one occluded a click target.",
        "context": [
          "A structured UI audit of the public site at 1440×820 and 390×780: homepage, the pinned journey section, the collaboration section, the footer, and the dropdowns, in both viewports. Every finding was reproduced before it was written down, so each one arrives as something a developer can close rather than an impression.",
          "The exhibits below were re-captured from the live site on 7 August 2026 — which is also how finding 1 came to be corrected. Re-checking a finding before publishing it is the cheapest way to avoid publishing one that has since been fixed, or one that was never quite right."
        ],
        "exhibits": [
          {
            "id": "H",
            "src": "assets/work/pucar-site/01-home-hero.png",
            "alt": "The homepage at rest, with the full wordmark sitting inside the hero rather than in the fixed navigation",
            "caption": "At the top — the wordmark lives in the hero, which scrolls",
            "clearance": "public",
            "ratio": "1800 / 1025"
          },
          {
            "id": "I",
            "src": "assets/work/pucar-site/02-scrolled-no-wordmark.png",
            "alt": "The same page scrolled, where the fixed bar carries links and a call to action but no mark and no route home",
            "caption": "One scroll later — links, a button, and nothing that returns you home",
            "clearance": "public",
            "ratio": "1800 / 1025"
          },
          {
            "id": "J",
            "src": "assets/work/pucar-site/04-mobile-nav.png",
            "alt": "The mobile bar at the same scroll depth, showing a menu control and no compact brand mark of any kind",
            "caption": "Mobile, same depth — a Main Menu control and no mark",
            "clearance": "public",
            "ratio": "831 / 1800"
          }
        ],
        "findings": [
          {
            "n": "1",
            "finding": "The brand wordmark sits inside the scrolling hero rather than the fixed nav, so it leaves on first scroll and never returns — on a very long page.",
            "why": "No persistent brand, and no obvious click-to-home for the rest of a very long page. Re-checked while capturing the exhibits on 7 August 2026: the fixed bar carries links and a Get in touch button and no mark — on the homepage and on /about alike — and the mobile bar shows only a Main Menu control. So this is not a matter of copying a pattern that already exists elsewhere in the codebase, as the original audit note assumed. It is a change to the shared navigation, which is a larger piece of work and a more useful one.",
            "severity": "High"
          },
          {
            "n": "2",
            "finding": "The fixed nav pill has a transparent, blurred fill, so content scrolls under it — in one section it covers a card's View control.",
            "why": "Not cosmetic. It occludes a click target.",
            "severity": "High"
          },
          {
            "n": "3",
            "finding": "The pinned ten-step journey section cross-fades between steps, and the outgoing and incoming text are both fully legible mid-transition. Reproducible at every step change.",
            "why": "Reads as a rendering fault, on the section that carries the core narrative.",
            "severity": "Medium"
          },
          {
            "n": "4",
            "finding": "With the wordmark gone, the only back-to-top cue is a small arrow of unclear meaning.",
            "why": "Resolved for free by fixing finding 1.",
            "severity": "Low"
          }
        ],
        "worked": "An audit that only lists faults is not an audit. What held up: dropdowns behaved correctly on both hover and click, mobile stacking was clean, no broken assets, and no contrast failures in the light sections.",
        "selfNote": "Finding 3 is an animation defect, which sets a standard for this page too: no transition here renders two blocks of text legible at the same time.",
        "rejected": [
          {
            "direction": "Filing the findings as a list of impressions",
            "whyNot": "An unreproduced defect is an opinion. Every finding carries the viewport it was found in and the steps that surface it, which is the difference between a critique and a ticket."
          }
        ]
      }
    ],
    "levers": {
      "heading": "How the design traced back to strategy",
      "intro": "PUCAR's published analysis names five levers for court transformation. The levers are theirs; what follows is how the design responded to each — including the one it cannot touch.",
      "citation": {
        "label": "Sankaran, S. &amp; Raman, S., “Five strategic levers for court transformation,” Bar &amp; Bench, 15 May 2026",
        "href": "https://www.barandbench.com/columns/five-strategic-levers-for-court-transformation"
      },
      "rows": [
        {
          "n": "1",
          "name": "Follow the money",
          "friction": "Very small mandatory payments — a token court fee, postal stamps bought and handed over physically — get forgotten in a working day and compound into adjournments.",
          "response": "Collapse the micro-payments into a single upfront step at filing. A payment is never a mid-flow interruption."
        },
        {
          "n": "2",
          "name": "Break down silos",
          "friction": "Every handoff between court and post, police, or treasury reverts to manual work, and bench clerks absorb the printing, scanning and status entry. Digitisation without integration added steps.",
          "response": "The filing UI must not create new scanning or re-entry work. Status is read from the system, never typed into it."
        },
        {
          "n": "3",
          "name": "Evolve rules to match digital tools",
          "friction": "Rules written for paper produce one OTP per signature, and an assumption that work only happens when everyone is present at once.",
          "response": "Batch signing, and asynchronous states designed as first-class UI states rather than error states."
        },
        {
          "n": "4",
          "name": "Rethink who secures appearance",
          "friction": "The appearance stage is the longest stage, and escalation adds load to a system already at capacity.",
          "response": "Out of software scope. Naming it as out of scope is worth more than stretching a claim to cover it.",
          "outOfScope": true
        },
        {
          "n": "5",
          "name": "Don't wait for information you don't need",
          "friction": "Requirements that are effectively standardised are revealed only at the last moment, so people arrive unprepared.",
          "response": "Upload everything upfront, extract and show what the system already knows, and surface requirements before they are needed.",
          "loadBearing": true
        }
      ],
      "throughline": "Lever 5 is the load-bearing one, and Matter 001 is what it looks like as an interface: the filing flow asks for the documents once, then spends its screen space showing the person what the system has already understood."
    },
    "differently": {
      "heading": "What I'd do differently",
      "items": [
        {
          "title": "Ship the tokens as an installable artefact.",
          "body": "The sandbox proves the system inside one app. It still does not let a second app consume it — no package, no registry endpoint — so the system travels as a repo to copy from rather than a dependency to install. That is the next thing to build, and it is a build problem now rather than a documentation one."
        },
        {
          "title": "Measure the palette before building on it.",
          "body": "I found the 1.54:1 warning contrast while documenting the system, not while designing with it. A contrast pass across the ramps at the start would have made it a palette conversation rather than a per-component patch — which is exactly the gap the Foundations page now closes, and the reason two pills sitting at 4.54:1 are visible at all."
        },
        {
          "title": "Design the mobile review first.",
          "body": "The split review is the best thing in the filing flow and the one thing that cannot survive a 390px screen. Starting from the hardest constraint would have produced one review pattern instead of two — and the sticky-header defects the audit found are both very likely worse at that width, which I have not yet tested."
        }
      ]
    },
    "forward": {
      "heading": "What I'm taking forward",
      "items": [
        "Scope AI to what a user can verify on screen. Reliability that can be inspected beats capability that has to be trusted.",
        "Write the limitation down. The strongest paragraph in this case study is the one that says what the system cannot do yet."
      ]
    }
  }
}$$, 7
)
on conflict (id) do update set
  status=excluded.status, title=excluded.title, category=excluded.category,
  year=excluded.year, description=excluded.description, tags=excluded.tags,
  color=excluded.color, icon_gradient=excluded.icon_gradient,
  accent_color=excluded.accent_color, thumb=excluded.thumb,
  detail=excluded.detail, sort_order=excluded.sort_order;
