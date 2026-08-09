const portfolio = {
  name: "Om Kumar",
  title: "User Experience Designer",
  heroGreeting: "Hello, from the designer's desk.",
  heroCyclePrefix: "UX designer with a focus on",
  heroCycleWords: ["decision-first dashboards", "0-to-1 strategy", "the quiet UX", "AI-native products", "human-in-the-loop UX", "design systems that scale", "agentic interfaces"],
  tagline: "Thoughtful",
  taglineAccent: "by",
  taglineEnd: "design",
  heroSubtitle: "Making complex things simple to create clear, efficient experiences that drive results.",
  heroStats: [
    { value: "3+",   label: "Years shipping" },
    { value: "10+",  label: "Projects delivered" },
    { value: "15+",  label: "Brands worked with" },
    { value: "36M+", label: "Users reached" },
  ],
  about: "I'm a UX designer with a focus on systems thinking and interface clarity. I believe good design disappears — it just works. Currently building at ConveGenius.AI.",
  statement: "Designer who codes, coder who thinks in strategy, strategist who ships.",
  bioParagraphs: [
    "I've been a designer since 2022. Initially drawn to visual design — crafting interfaces, replicating shots from Dribbble just to see if I could pull them off. What started as curiosity about making things look good slowly turned into something deeper.",
    "Over time, I found myself more interested in design systems and the spaces where design meets engineering. I love creating order, consistency, and scalable foundations. I've designed for governance, education, and healthcare — and I find myself most engaged when thinking about how systems can scale without breaking.",
  ],
  email: "okumar1502@gmail.com",

  // The dock's Resume button. `file` is also the link's real href, so the PDF
  // is reachable with JavaScript off; the overlay is the enhancement on top.
  // Update `updated` whenever the file is replaced — it is shown in the header.
  resume: {
    file: "assets/om-kumar-resume.pdf",
    filename: "Om-Kumar-Resume.pdf",
    updated: "August 2026",
    pages: 1,
  },

  linkedin: "https://www.linkedin.com/in/om-kumar-707762201/",
  behance: "https://www.behance.net/omkumar20cs105",
  github: "https://github.com/om-1115",
  workIntro: ["Hey! I'm a UX designer based in India.", "I'm currently building at ConveGenius.AI ✌️"],

  // ── The hanging ID card (about page) ──────────────────────────────────────
  idCard: {
    org: "Om Kumar",
    role: "User Experience Designer",
    photo: "assets/avatar.png",
    rows: [
      ["Based", "Noida · IST"],
      ["Since", "2022"],
      ["Pass", "OK-2026-DSGN"],
    ],
    footnote: "",
  },

  // ── The Intelligence Triangle (about page) ────────────────────────────────
  // TO REVIEW: the three assessments below are claims about you, drafted from
  // your own bio — the CS-into-design route, the systems work, the governance
  // and healthcare domains. Rewrite them in your words before this is public.
  // `weights` places the "I am here" marker: heavier corner, closer marker.
  triangle: {
    eyebrow: "Beyond the craft",
    headline: "The",
    headlineAccent: "Intelligence",
    headlineEnd: "Triangle",
    sub: "The work is half craft, half people. Here's how I think about the second half.",
    hint: "Hover any corner for self-assessment",
    why: {
      heading: "Why this framework?",
      body: [
        "I came across the Intelligence Triangle in a Park &amp; Co article and it reshaped how I evaluate my own growth as a designer.",
        "Great design sits at the intersection of three quotients — Creative (CQ), Emotional (EQ), and Business (BQ). I use it as a self-reflection tool: where I am, where I'm growing, and where I want to lead.",
      ],
    },
    marker: { label: "I am here", weights: { cq: 0.38, eq: 0.27, bq: 0.35 } },
    nodes: [
      {
        id: "cq",
        abbr: "CQ",
        name: "Creative Quotient",
        body: "Strong. I started in visual design — replicating shots just to see if I could pull them off — and kept going until the interesting part became systems rather than surfaces. I build fluency by exploring: tokens, motion, typography, and enough code to know what I am asking for.",
      },
      {
        id: "eq",
        abbr: "EQ",
        name: "Emotional Quotient",
        body: "Growing, and the honest edge. I work well across engineering and product, and I design for people under load — a teacher who is the only adult in the building, a litigant who did not choose to be there. What I am still sharpening is leading without formal authority in a room that has already decided.",
      },
      {
        id: "bq",
        abbr: "BQ",
        name: "Business Quotient",
        body: "Growing into it. Designing for governance, education and healthcare means the constraint is rarely taste — it is capacity, budget and adoption. I think in systems that scale and in what a decision costs, and I am still learning to argue that case earlier, in the language the room is already using.",
      },
    ],
  },

  // ── Contact band ──────────────────────────────────────────────────────────
  // TO CONFIRM: `availability` is deliberately soft. You are currently at
  // ConveGenius, so a loud "open for full-time roles" is your call to make, not
  // mine — change the label and it renders in the accent colour either way.
  // `calendly` drives the scheduling row — empty hides it, a URL shows it.
  contact: {
    eyebrow: "Letters to the editor · Get in touch",
    headline: "Let's",
    headlineAccent: "talk",
    sub: "Roles, collaborations, a design-system teardown, or a coffee on Zoom — drop me a line.",
    note: "I read every email.",
    location: "India · Noida · IST · Open to relocation",
    availability: "Open to conversations",
    availabilityNote: "Full-time, contract, or a second pair of eyes",
    calendly: "https://calendly.com/om-kumar-convegenius/new-meeting",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    // one letter of the name is set in the accent colour — index into the string
    accentIndex: 4,
    tagline: "Thoughtful by design.",
    colophon: "built by om · © 2026",
    ticker: ["Made in Figma", "Hand-written HTML, CSS and JS", "Designed in Noida", "♥"],
  },

  workHeading: "Handpicked",
  workHeadingAccent: "highlights",
  workDesc: "A selection of shipped and concept work from the last few years.",

  skills: [
    "Interaction Design", "Design Systems", "Figma", "Prototyping",
    "Wireframing", "Visual Design", "User Research", "Usability Testing",
    "Information Architecture", "ProtoPie", "Adobe CC", "Figma Make",
  ],

  // Populated at runtime from Supabase
  experience: [
    {
      role: "Senior UX Designer",
      company: "ConveGenius.AI",
      url: "https://convegenius.com/",
      period: "Sep 2025 — Present",
      location: "Noida",
      tags: ["EdTech", "AI", "Design Systems"],
      logoGradient: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)",
      logoId: "convegenius",
      // First two points lifted from the résumé, so the numbers here are sourced
      // rather than estimated. They lead because they are the specific ones.
      points: [
        "Direct design for 4 government education products deployed across 6 Indian states, spanning teacher entitlements, holistic assessment and multilingual AI assistance for 1.2M users.",
        "Built the HPC design system on a three-layer token architecture (primitive → semantic → component) with Zag.js state machines, published to npm with Nextra docs and adopted across React, Vue and Solid.",
        "Increasing user experience, enhancing usability and optimizing workflows of tech-based solutions for optimum educational impact.",
      ],
    },
    {
      // HIDDEN — kept in full, just not rendered. Both experience sections skip
      // any entry with hidden: true, so deleting this one line puts it back.
      hidden: true,
      role: "Design Lead",
      company: "Agami",
      url: "https://agami.in/",
      period: "Sep 2025 — Present",
      location: "Part-Time",
      tags: ["Judiciary", "Service Delivery", "AI Design", "Systems", "Research", "Product"],
      logoGradient: "linear-gradient(135deg,#047857 0%,#10b981 100%)",
      logoId: "agami",
      points: [
        "Leading design for a completely codeless user experience, live across four states — Kerala, Haryana, Punjab and Sikkim.",
        "Defined the complex user journeys for resolving cases, currently solving for the S138 case.",
      ],
    },
    {
      role: "Associate UX Designer",
      company: "Samagra",
      url: "https://samagragovernance.in/",
      period: "Jan 2023 — Aug 2025",
      location: "New Delhi",
      tags: ["GovTech", "Research", "Product"],
      logoGradient: "linear-gradient(135deg,#ea580c 0%,#f59e0b 100%)",
      logoId: "samagra",
      logoUrl: "https://samagragovernance.in/static/Samagra_Logo_updated-f59ec74c713638ada10b837a71238eaa.svg",
      points: [
        "Multiple product and design thinking along with on-ground research resulting in accelerated usage of app and website.",
        "Worked on improving user interfaces for high-stake civic platforms including Kumbh Sah'AIyak and Bharat Sah'AIyak (now part of Krutrim-OLA).",
        "Implemented user and stakeholder feedback, reworked friction points, and consequently improved user experience across products.",
        // Added verbatim. These sit after the Bharat Sah'AIyak point on purpose:
        // "Now an AI-powered vibe-marketing platform" has no subject of its own,
        // so it needs that mention above it to read as being about the product.
        "Sole designer 0 → launch",
        "Built entire AI-product design system",
        "Now an AI-powered vibe-marketing platform",
      ],
    },
    {
      role: "UX Designer",
      company: "IQ-Line",
      url: "https://iqline.co.in/",
      period: "Apr 2025 — Sep 2025",
      location: "New Delhi · Part-Time",
      tags: ["Healthcare", "LIMS", "B2B"],
      logoGradient: "linear-gradient(135deg,#0891b2 0%,#0d9488 100%)",
      logoId: "iqline",
      points: [
        "Led the development and implementation of a token-based design system, improving consistency and scalability across multiple platforms.",
        "Led the UI redesign for a LIMS, enhancing usability and optimizing workflows for healthcare professionals.",
        "Designed and developed the user interface for a new blood sample transfer system, improving the tracking and management of critical medical samples.",
        "Coordinated with healthcare professionals to gather insights and define requirements, ensuring alignment with medical standards and user needs.",
      ],
    },
  ],

  /* Real people, named by Om. Their quotes are NOT written here and must not be
     invented: these are identifiable professionals, and words they did not say
     cannot go on a public page under their names. An entry renders only once it
     has a `quote`, so the section stays off the site until the real words land
     — paste them in and each person appears automatically. */
  shoutouts: [
    {
      quote: "",
      name: "Shashank Pandey",
      role: "Co-founder",
      company: "ConveGenius.AI",
      initials: "SP",
    },
    {
      quote: "",
      name: "Akshata Malhotra",
      role: "VP of Design",
      company: "Samagra",
      initials: "AM",
    },
    {
      quote: "",
      name: "Prateek Hedge",
      role: "Manager",
      company: "ConveGenius.AI",
      initials: "PH",
    },
    {
      quote: "",
      name: "Abhay Singh",
      role: "Engineering Lead",
      company: "IQ-Line",
      initials: "AS",
    },
    {
      quote: "",
      name: "Supriya Sankaran",
      role: "Co-founder",
      company: "PUCAR",
      initials: "SS",
    },
  ],

  carousels: [
    {
      id: "c1",
      title: "Process",
      slides: [
        { label: "Research & Discovery", bg: "#f4f4f6" },
        { label: "Sketching & Ideation", bg: "#eef1f4" },
        { label: "High-fidelity Mockups", bg: "#f1eef4" },
        { label: "Handoff & QA", bg: "#eef3f0" },
      ],
    },
    {
      id: "c2",
      title: "Inspiration",
      slides: [
        { label: "Typography Studies", bg: "#f6f6f8" },
        { label: "Color Explorations", bg: "#f0f3f6" },
        { label: "Layout Patterns", bg: "#f3f0f6" },
        { label: "Motion References", bg: "#f0f5f2" },
      ],
    },
    {
      id: "c3",
      title: "Tools & Workspace",
      slides: [
        { label: "Figma Workspace", bg: "#f4f4f6" },
        { label: "Component Library", bg: "#eef1f4" },
        { label: "Design Tokens", bg: "#f1eef4" },
        { label: "Documentation", bg: "#eef3f0" },
      ],
    },
  ],

  skillGroups: [
    {
      num: "01",
      name: "Design Process",
      gradient: "linear-gradient(135deg, #b85c38 0%, #e8814d 100%)",
      skills: ["User Research", "Interaction Design", "Usability Testing", "Prototyping", "Wireframing", "Visual Design"],
    },
    {
      num: "02",
      name: "Systems",
      gradient: "linear-gradient(135deg, #1a6b4a 0%, #34a870 100%)",
      skills: ["Design Systems", "Information Architecture", "Design Tokens", "Component Libraries", "Pattern Libraries"],
    },
    {
      num: "03",
      name: "Tools & Stack",
      gradient: "linear-gradient(135deg, #4338ca 0%, #818cf8 100%)",
      skills: ["Figma", "Figma Make", "ProtoPie", "Adobe CC", "Notion", "Linear"],
    },
  ],

  capabilities: [
    {
      num: "01",
      title: "Structuring Complex Products",
      description: "Taking messy ideas, constraints, and edge cases — and turning them into clear product structures that actually make sense in the real world.",
    },
    {
      num: "02",
      title: "Designing User Behavior",
      description: "Designing flows that guide decisions, reduce friction, and help users move forward with clarity, even in complex scenarios.",
    },
    {
      num: "03",
      title: "Delivering Real-World Systems",
      description: "Building and shipping products that hold up under real usage, real constraints, and real users — not just ideal conditions.",
    },
  ],

  capDesc: [
    "Approaches I use to understand complex systems and turn requirements into concrete product decisions.",
    "A set of capabilities that connects strategy, structure, and experience to build clearer, more reliable products.",
  ],

  capBlobs: [
    { label: "Design Systems", color: "#c5b8f8", rotate: -12 },
    { label: "Interaction Design", color: "#d4efb8", rotate: 8 },
    { label: "User Research", color: "#f8d8b8", rotate: -5 },
    { label: "Prototyping", color: "#b8e4f8", rotate: 14 },
    { label: "Visual Design", color: "#f8b8d4", rotate: -18 },
  ],

  projects: [
    // ── Encode Pucar ──────────────────────────────────────────────────────────
    // TO CONFIRM before this goes public (do not guess upward):
    //   1. Role ledger modes across the six surfaces. Set conservatively below.
    //      Specifically: did you write the Foundations measurement logic, or
    //      design the page over someone else's implementation? That answer
    //      decides whether this reads as design engineering or as design —
    //      both are strong, only one is true. Currently 'Contributed'.
    //   2. Matter 002 state. Currently 'Deployed prototype'. Is ON Court a
    //      personal prototype, a PUCAR-sanctioned prototype, or on a path into
    //      DRISTI? This also decides whether it needs PUCAR clearance.
    //   3. Whether the deployment URL may be linked publicly. Withheld for now
    //      (recruiter.liveAt still points at pucar.org).
    //   4. Is the screen-craft rulebook yours, and can it be published or
    //      excerpted? It is the most interesting undocumented artefact here.
    //   5. Was the 4.54:1 pair a deliberate choice at the floor or an unnoticed
    //      near-miss? Written below as a standing risk, which is true either
    //      way — but the sentence changes if you set it there on purpose.
    //   6. Does the app track its own history — is there a record of the warning
    //      token moving from 1.54:1 to 9.47:1? A before/after on that one token
    //      is the cleanest proof the measurement layer does real work.
    //   7. Exact dates, and whether this was contract, volunteer, or via Agami.
    //   8. Team composition and who owned what.
    //   9. Matter 001 — why navigation moved from left rail to top navbar, and
    //      what was actually rejected during the e-filing work.
    //  10. Whether the Helvetica Neue / Indic coverage gap is resolved.
    //  11. Restyle or blur the scrutiny mock's identity-document content before
    //      publishing exhibits A and B (see matter 002 openIssue).
    //  12. PUCAR/Agami consent to publish, and anything they want excluded.
    {
      id: "07",
      thumb: "assets/work/thumbs/encode-pucar.png",
      status: "shipped",
      title: "Encode Pucar",
      category: "Product Design",
      year: "2026",
      description: "Court software designed for people who did not choose to be in court — a filing redesign, the design system under it, and an audit of the public face.",
      tags: ["Gov Tech", "Judiciary", "AI UX", "Design Systems"],
      color: "#f0f6f5",
      iconGradient: "linear-gradient(135deg,#007e7e,#0d9488)",
      accentColor: "#007e7e",
      detail: {
        role: "Product Designer",
        challenge: "Court delay is rarely one large failure. It accumulates from small, ordinary frictions — a token court fee that slips a lawyer's mind, a postal stamp bought and handed over by hand, a requirement revealed at the last moment — and each one can cost a hearing date. Filing software that asks a litigant for facts they have already handed over on paper adds to that pile rather than clearing it.",
        outcome: "A filing flow rebuilt around upfront document upload, machine extraction, and a review screen that shows what the system already knows; a deployed court workspace with the design system living inside it, measuring its own rendered output in both themes; and a severity-ranked audit of the public site, written so a developer could close each finding.",
        // PLACEHOLDER OUTCOMES — not measured. Replace before publishing; the
        // rest of this case study refuses invented numbers, so these three
        // cannot ship as they are. check:content warns about every one.
        stats: [
          { value: "38%", label: "Fewer filings returned at scrutiny", provisional: true },
          { value: "11 min", label: "Median time to complete a filing, from 26", provisional: true },
          { value: "2.4×", label: "Filings finished without help from the counter", provisional: true },
        ],
        frames: [
          { type: "desktop", label: "Review screen — extracted values marked beside the source document" },
          { type: "mobile", label: "Mobile fallback — correction overlay where the error is seen" },
          { type: "desktop", label: "Token ramps — the semantic layer aliased over the primitives" },
          { type: "desktop", label: "Audit sheet — four findings ranked by severity, each with the fix" },
        ],
        recruiter: {
          role: "Product Designer",
          timeline: "Sep 2025 — Present · part-time, via Agami",
          liveAt: "https://pucar.org/",
          domain: "Gov tech · Courts · Judiciary",
          platform: "Web app · Design system",
          team: "PUCAR / Agami · cross-functional — my slice is in the role ledger",
          problem: "Court delay accumulates from small frictions — a token fee that slips someone's mind, a stamp bought and handed over by hand, a requirement revealed at the last moment. Filing software that asks for what a litigant already handed over on paper adds to the pile.",
          shipped: "A filing flow built on upfront upload and an inspectable extraction review; ON Court, a deployed court workspace with the design system inside it measuring its own rendered output; and a severity-ranked audit of the public site.",
          owned: ["Flows", "Interaction design", "AI UX scoping", "Design tokens", "Component design", "Documentation", "UI audit"],
          bullets: [
            "Built ON Court, a working court workspace with the design system living inside it. Dashboard, cases and filing on one side of the sidebar; foundations, components and a scratch surface for new screens on the other — same shell, same tokens, one click apart.",
            "The system measures its own output. Foundations reads every colour back from the browser after the cascade resolves, so 31 token pairs are re-derived in both themes instead of trusted from the token file — and the no-AI state of the scrutiny workspace is a switchable state, not a broken version of the good one.",
            "Redesigned court e-filing rather than reskinning it. Documents go up first, the system extracts the fields, and the review screen becomes the primary surface instead of a wizard asking for facts already on the paper.",
            "The pair with no room left is in the case study, not hidden. Success and destructive pills both measure 4.54:1 against a 4.5:1 floor — four hundredths of headroom — written up as standing risks with a proposed guard, beside the warning token that used to measure 1.54:1 and now measures 9.47:1 solid.",
            "The measurement layer catches contrast and only contrast. It cannot see a wrong information architecture, bad copy, or an AI callout that overstates its confidence — saying so is what keeps the loop a rig for trying screens rather than a machine for shipping them.",
          ],
        },
        caseFile: {
          causeList: {
            label: "Cause list",
            heading: "Three matters, one line each",
            note: "Design decisions mapped to five published reform levers.",
          },
          heroExhibits: [
            { id: "A", src: "assets/work/oncourt/07-filing-documents.png", alt: "Filing step three of five with document slots grouped by filing role and the primary action disabled until the gaps are named", caption: "Matter 001 — filing, grouped the way the statute organises the case", clearance: "public", ratio: "1800 / 992" },
            { id: "B", src: "assets/work/oncourt/03-foundations-light.png", alt: "Foundations page reporting contrast measured back from the rendered result rather than read from the token file", caption: "Matter 002 — the system, measuring what it actually rendered", clearance: "public", ratio: "1800 / 992" },
          ],
          premise: {
            heading: "The premise",
            // leans on PUCAR's published framing, so check:content demands the citation
            attributed: true,
            body: [
              "Nobody arrives at a district court by choice. They arrive with a dispute, a bundle of documents, a day taken off work, and no map of what happens next. PUCAR — the Public Collective for Avoidance and Resolution of Disputes, anchored by Agami — is a non-profit mission rebuilding court software around that person rather than around the register.",
              "The framing I designed against is PUCAR's own, published as the third part of a Bar &amp; Bench series by Supriya Sankaran and Siddarth Raman. Read that way, delay is not one large failure — it is an accumulation of small, ordinary frictions, each of which can cost a listed hearing. Which makes faster case disposal the wrong design target. The target is removing the reasons a hearing cannot happen on the day it was listed.",
              "My read: software cannot clear all of those frictions, and stretching the claim is how gov-tech products lose the confidence of the institutions that adopt them. What software can do is stop creating new work, and stop asking people for what they have already handed over.",
            ],
            citation: {
              label: "Sankaran, S. &amp; Raman, S., “Five strategic levers for court transformation,” Bar &amp; Bench, 15 May 2026",
              href: "https://www.barandbench.com/columns/five-strategic-levers-for-court-transformation",
            },
          },
          ledger: {
            heading: "Where I came in",
            body: [
              "Six surfaces, and they were not all mine in the same way. The labels below are the point: a reader should be able to trust them, so they are stated as scope rather than as credit.",
              "Two things were already settled when I arrived. The platform was DRISTI, and the AI in scope was deliberately narrow — OCR extraction from uploaded documents, and rule-based field validation. Both were chosen for reliability rather than novelty, which is the constraint that shaped every decision in Matter 001.",
            ],
            columns: ["Surface", "Mode", "Scope"],
            rows: [
              { matter: "E-filing redesign", mode: "Contributed", scope: "The filing and review flow, inside PUCAR's product scope" },
              { matter: "Design system — tokens, 31 pairs", mode: "Designed", scope: "Primitive ramps, semantic layer, component adaptations" },
              { matter: "Foundations measurement page", mode: "Contributed", scope: "Designed the page — measurement implementation authorship to confirm" },
              { matter: "Filing flow (5 steps)", mode: "Designed", scope: "Grouped document slots, OCR read-back, blocker states" },
              { matter: "Scrutiny workspace + AI states", mode: "Designed", scope: "Three-pane review, the mismatch triad, the no-AI mode" },
              { matter: "Components library", mode: "Designed", scope: "Patterns, navigation, disclosure rules against screen-craft" },
              { matter: "pucar.org UI audit", mode: "Audited", scope: "Solo, unsolicited — evaluated work I did not design" },
            ],
            modeKey: [
              ["Designed", "owned end to end"],
              ["Contributed", "owned a defined slice inside someone else's scope"],
              ["Audited", "evaluated existing work"],
              ["Proposed", "recommended; not adopted, or not yet"],
            ],
          },
          matters: [
            {
              no: "001",
              slug: "matter-001",
              title: "E-filing redesign",
              state: "Shipped to review",
              mode: "Contributed",
              oneLine: "Rebuilt filing around upfront upload and an inspectable extraction review.",
              context: [
                "Court e-filing, redesigned rather than reimplemented — explicitly not a reskin of the existing screens. A stepped wizard asked a person to type, field by field, what was already printed on the documents in their hand.",
                "So the flow inverts. Everything is uploaded upfront, the system extracts what it can read, and the review screen — not the form — becomes the place the work happens.",
              ],
              goals: [
                "Find the UX patterns that hold when a machine fills the fields.",
                "Identify the UI elements that repeat, and make them the first component set.",
                "Define atoms, tokens and variables from those components — the bridge into Matter 002.",
              ],
              decisions: [
                {
                  constraint: "A person has already handed the documents over. Asking them to retype what is printed on the page is the friction — the form is only where it shows up.",
                  options: [
                    "Keep the stepped wizard, extract inline per step",
                    "Full-page review after upload",
                    "Split review — extracted fields beside the source document",
                  ],
                  chose: "Split review: extracted fields on the left, the source document on the right at roughly 30% width, auto-scrolling to the region the current field came from.",
                  why: "The reviewer's question is always the same — does this match the paper? Putting the answer in the same eyeful removes the memory work.",
                  cost: "The split cannot hold on a small screen, so the flow carries two review patterns instead of one, and both have to stay in sync as fields change.",
                  lever: "Lever 5 · Don't wait for information you don't need",
                },
                {
                  constraint: "Fixing one wrong character meant navigating back to an earlier step.",
                  options: [
                    "Send the user back to the originating step",
                    "A modal per field",
                    "Edit where the error is seen — side panel on web, overlay on mobile",
                  ],
                  chose: "Corrections happen in place: a side panel on web, an overlay on mobile.",
                  why: "My read was that the trip backwards is where filings were abandoned — the cost of fixing one character was a full re-navigation.",
                  cost: "Two edit surfaces to design, test and document, and a review screen that holds more state than a read-only summary would.",
                  lever: "Lever 2 · Break down silos",
                },
                {
                  constraint: "The split review needs horizontal room, and the left rail was spending it.",
                  options: [
                    "Keep the left rail, narrow the document pane",
                    "Collapsible rail",
                    "Top navbar with section-level submenus",
                  ],
                  chose: "Moved navigation from the left rail to a top navbar with section-level submenus.",
                  why: "Two things were true at once — the review needed the width, and section-level submenus described a filing better than a flat rail did. My read is that the width mattered more; I am confirming which one drove it before this reads as settled.",
                  cost: "Deep sections sit one hover away instead of always visible, and the top bar has to carry more labels on narrow screens.",
                },
                {
                  constraint: "A wrong auto-filled field is worse than an empty one — it looks like a fact the user already agreed to.",
                  options: [
                    "Trust the extraction silently",
                    "Show a confidence score per field",
                    "Mark every machine-filled value so it reads differently from what the user typed",
                  ],
                  chose: "Colour-marked the auto-filled values, each carrying a text label as well as the colour.",
                  why: "Trust has to be inspectable. Marking what the machine asserted keeps the burden of verification on the page, where the person can discharge it.",
                  cost: "A busier review screen, and because colour alone is not enough the marking needs a label everywhere it appears — more markup, more to keep consistent.",
                  lever: "Lever 5 · Don't wait for information you don't need",
                },
              ],
              rejected: [
                {
                  direction: "Keeping the stepped wizard with inline extraction",
                  whyNot: "It preserved the thing that was actually wrong. Extraction inside a wizard still asks the person to move forward through questions the documents have already answered.",
                },
                {
                  direction: "An LLM for extraction instead of OCR plus rules",
                  whyNot: "The templates are effectively standardised and the scans are usually clean printed text, where OCR returns text with coordinates — which is exactly what the split view needs in order to point at a region. A model would have added a failure mode we could not show the user. Poor scans and varied layouts are where a model earns its place, and that was not this flow.",
                },
              ],
              exhibits: [
                { id: "F", src: "assets/work/oncourt/08-filing-documents-lower.png", alt: "Notice and service group with optional supporting documents and empty slots stating what each one expects", caption: "Upload-first, in the sandbox prototype — every slot says what belongs in it", clearance: "public", ratio: "1800 / 992" },
                { id: "G", src: "assets/work/oncourt/01-scrutiny-ai-mismatch.png", alt: "Review workspace with extracted values beside the source document and each conflict offering accept, keep or flag", caption: "Review beside the source — the machine asserts, the person decides", clearance: "public", ratio: "1800 / 992" },
              ],
            },
            {
              no: "002",
              slug: "matter-002",
              title: "From screens to a system",
              state: "Deployed prototype",
              mode: "Designed",
              oneLine: "The components became a system, and the system became a working court app.",
              context: [
                "The component set from the filing work became a documented system — primitive ramps with a semantic layer aliased on top, Tailwind tokens mapped through @theme inline, shadcn/Radix primitives with PUCAR adaptations patched over upstream, and an AGENTS.md written for coding agents rather than only for people.",
                "It did not stay a documentation site. What is deployed is ON Court: a working court workspace with the design system living in the other half of its sidebar, measuring its own rendered output in both themes and hosting new screens as experiments. That has its own case study — <a class=\"cf-xref\" href=\"project.html?id=08\">read the ON Court sandbox &rarr;</a>",
              ],
              decisions: [
                {
                  constraint: "The brand palette's warning colour measured about 1.54:1 against its own surface. That is a real number, and it did not pass.",
                  options: [
                    "Claim AA across the palette and hope nobody measures",
                    "Redraw the brand warning colour",
                    "Keep the colour and carry the contrast inside the component",
                  ],
                  chose: "Kept the brand colour and moved the burden into the component — the solid warning button shipped a warning-ink border, which is what made that state pass.",
                  why: "The palette was not mine to redraw mid-flight, and a documented mitigation can be audited. Silence cannot.",
                  cost: "Every non-solid warning usage stayed a known risk, so the system had to document where the token may not be used. The ramp has since been darkened — warning now measures 9.47:1 solid and 5.17:1 ink — but only because something was finally measuring it, which is the argument the ON Court case study makes at length.",
                  lever: "Lever 3 &middot; Evolve rules to match digital tools",
                },
              ],
              rejected: [
                {
                  direction: "Shipping the system as a documentation site",
                  whyNot: "A docs site tells you what the tokens are. It cannot show you they hold up, and it gives nothing real to measure. Replacing it with a working app under the same tokens is the whole of matter 002's second half.",
                },
              ],
              exhibits: [
                { id: "L", src: "assets/work/oncourt/09-test-ui-index.png", alt: "The sandbox's Test UI index listing four experiments, which is what the components became once they had somewhere to be tried", caption: "Where the components went — a rig for trying screens, not a docs page", clearance: "public", ratio: "1800 / 992" },
              ],
              openIssue: {
                label: "Open issue",
                body: "The body and UI face is Helvetica Neue while the system claims Indic script support. Helvetica Neue has no Devanagari coverage, so an undocumented fallback chain is doing real work — including for the Kerala deployment. Either the fallback gets documented in the system or it stays an open issue here; it does not get quietly claimed as coverage.",
              },
            },
            {
              no: "003",
              slug: "matter-003",
              title: "Auditing the public face",
              state: "Reported",
              mode: "Audited",
              oneLine: "Four reproducible defects on the public site; one occluded a click target.",
              context: [
                "A structured UI audit of the public site at 1440×820 and 390×780: homepage, the pinned journey section, the collaboration section, the footer, and the dropdowns, in both viewports. Every finding was reproduced before it was written down, so each one arrives as something a developer can close rather than an impression.",
                "The exhibits below were re-captured from the live site on 7 August 2026 — which is also how finding 1 came to be corrected. Re-checking a finding before publishing it is the cheapest way to avoid publishing one that has since been fixed, or one that was never quite right.",
              ],
              exhibits: [
                { id: "H", src: "assets/work/pucar-site/01-home-hero.png", alt: "The homepage at rest, with the full wordmark sitting inside the hero rather than in the fixed navigation", caption: "At the top — the wordmark lives in the hero, which scrolls", clearance: "public", ratio: "1800 / 1025" },
                { id: "I", src: "assets/work/pucar-site/02-scrolled-no-wordmark.png", alt: "The same page scrolled, where the fixed bar carries links and a call to action but no mark and no route home", caption: "One scroll later — links, a button, and nothing that returns you home", clearance: "public", ratio: "1800 / 1025" },
                { id: "J", src: "assets/work/pucar-site/04-mobile-nav.png", alt: "The mobile bar at the same scroll depth, showing a menu control and no compact brand mark of any kind", caption: "Mobile, same depth — a Main Menu control and no mark", clearance: "public", ratio: "831 / 1800" },
              ],
              findings: [
                {
                  n: "1",
                  finding: "The brand wordmark sits inside the scrolling hero rather than the fixed nav, so it leaves on first scroll and never returns — on a very long page.",
                  why: "No persistent brand, and no obvious click-to-home for the rest of a very long page. Re-checked while capturing the exhibits on 7 August 2026: the fixed bar carries links and a Get in touch button and no mark — on the homepage and on /about alike — and the mobile bar shows only a Main Menu control. So this is not a matter of copying a pattern that already exists elsewhere in the codebase, as the original audit note assumed. It is a change to the shared navigation, which is a larger piece of work and a more useful one.",
                  severity: "High",
                },
                {
                  n: "2",
                  finding: "The fixed nav pill has a transparent, blurred fill, so content scrolls under it — in one section it covers a card's View control.",
                  why: "Not cosmetic. It occludes a click target.",
                  severity: "High",
                },
                {
                  n: "3",
                  finding: "The pinned ten-step journey section cross-fades between steps, and the outgoing and incoming text are both fully legible mid-transition. Reproducible at every step change.",
                  why: "Reads as a rendering fault, on the section that carries the core narrative.",
                  severity: "Medium",
                },
                {
                  n: "4",
                  finding: "With the wordmark gone, the only back-to-top cue is a small arrow of unclear meaning.",
                  why: "Resolved for free by fixing finding 1.",
                  severity: "Low",
                },
              ],
              worked: "An audit that only lists faults is not an audit. What held up: dropdowns behaved correctly on both hover and click, mobile stacking was clean, no broken assets, and no contrast failures in the light sections.",
              selfNote: "Finding 3 is an animation defect, which sets a standard for this page too: no transition here renders two blocks of text legible at the same time.",
              rejected: [
                {
                  direction: "Filing the findings as a list of impressions",
                  whyNot: "An unreproduced defect is an opinion. Every finding carries the viewport it was found in and the steps that surface it, which is the difference between a critique and a ticket.",
                },
              ],
            },
          ],
          levers: {
            attributed: true,
            heading: "How the design traced back to strategy",
            intro: "PUCAR's published analysis names five levers for court transformation. The levers are theirs; what follows is how the design responded to each — including the one it cannot touch.",
            citation: {
              label: "Sankaran, S. &amp; Raman, S., “Five strategic levers for court transformation,” Bar &amp; Bench, 15 May 2026",
              href: "https://www.barandbench.com/columns/five-strategic-levers-for-court-transformation",
            },
            rows: [
              {
                n: "1",
                name: "Follow the money",
                friction: "Very small mandatory payments — a token court fee, postal stamps bought and handed over physically — get forgotten in a working day and compound into adjournments.",
                response: "Collapse the micro-payments into a single upfront step at filing. A payment is never a mid-flow interruption.",
              },
              {
                n: "2",
                name: "Break down silos",
                friction: "Every handoff between court and post, police, or treasury reverts to manual work, and bench clerks absorb the printing, scanning and status entry. Digitisation without integration added steps.",
                response: "The filing UI must not create new scanning or re-entry work. Status is read from the system, never typed into it.",
              },
              {
                n: "3",
                name: "Evolve rules to match digital tools",
                friction: "Rules written for paper produce one OTP per signature, and an assumption that work only happens when everyone is present at once.",
                response: "Batch signing, and asynchronous states designed as first-class UI states rather than error states.",
              },
              {
                n: "4",
                name: "Rethink who secures appearance",
                friction: "The appearance stage is the longest stage, and escalation adds load to a system already at capacity.",
                response: "Out of software scope. Naming it as out of scope is worth more than stretching a claim to cover it.",
                outOfScope: true,
              },
              {
                n: "5",
                name: "Don't wait for information you don't need",
                friction: "Requirements that are effectively standardised are revealed only at the last moment, so people arrive unprepared.",
                response: "Upload everything upfront, extract and show what the system already knows, and surface requirements before they are needed.",
                loadBearing: true,
              },
            ],
            throughline: "Lever 5 is the load-bearing one, and Matter 001 is what it looks like as an interface: the filing flow asks for the documents once, then spends its screen space showing the person what the system has already understood.",
          },
          differently: {
            heading: "What I'd do differently",
            items: [
              {
                title: "Ship the tokens as an installable artefact.",
                body: "The sandbox proves the system inside one app. It still does not let a second app consume it — no package, no registry endpoint — so the system travels as a repo to copy from rather than a dependency to install. That is the next thing to build, and it is a build problem now rather than a documentation one.",
              },
              {
                title: "Measure the palette before building on it.",
                body: "I found the 1.54:1 warning contrast while documenting the system, not while designing with it. A contrast pass across the ramps at the start would have made it a palette conversation rather than a per-component patch — which is exactly the gap the Foundations page now closes, and the reason two pills sitting at 4.54:1 are visible at all.",
              },
              {
                title: "Design the mobile review first.",
                body: "The split review is the best thing in the filing flow and the one thing that cannot survive a 390px screen. Starting from the hardest constraint would have produced one review pattern instead of two — and the sticky-header defects the audit found are both very likely worse at that width, which I have not yet tested.",
              },
            ],
          },
          forward: {
            heading: "What I'm taking forward",
            items: [
              "Scope AI to what a user can verify on screen. Reliability that can be inspected beats capability that has to be trusted.",
              "Write the limitation down. The strongest paragraph in this case study is the one that says what the system cannot do yet.",
            ],
          },
        },
      },
    },
    // ── ON Court Sandbox ──────────────────────────────────────────────────────
    // TO CONFIRM (see the ON Court brief §9 — do not guess upward):
    //   1. Mode per surface. Foundations is 'Contributed' because I do not know
    //      whether the measurement logic is yours or you designed over someone
    //      else's implementation. That answer decides design vs design engineering.
    //   2. Is this a personal prototype, PUCAR-sanctioned, or on a path into
    //      DRISTI? state is currently 'Deployed prototype'.
    //   3. May the deployment URL be linked publicly? recruiter.liveAt is null.
    //   4. Is the screen-craft rulebook yours, and can it be excerpted?
    //   5. Was the 4.54:1 pair deliberate or an unnoticed near-miss?
    //   6. Any record of the warning token moving 1.54:1 -> 9.47:1? Best exhibit
    //      available if it exists.
    //   7. Restyle or blur the scrutiny mock's identity-document content before
    //      publishing exhibits A and B.
    {
      id: "08",
      thumb: "assets/work/thumbs/oncourt-sandbox.png",
      status: "shipped",
      title: "ON Court Sandbox",
      category: "Design Systems",
      year: "2026",
      description: "A working court workspace with the design system living inside it — measuring its own rendered output in both themes, and hosting new screens as experiments.",
      tags: ["Design Systems", "AI UX", "Accessibility", "Gov Tech"],
      color: "#f0f4f4",
      iconGradient: "linear-gradient(135deg,#0f766e,#4f46e5)",
      accentColor: "#0f766e",
      detail: {
        role: "Product Designer",
        challenge: "A design system usually gets documented beside the product it built, which means nothing in the documentation is under load. The tokens are asserted, the components are shown in isolation, and the first time anyone finds out that a colour pairing fails is when a user cannot read it. Meanwhile the interesting new question is not whether a person can follow the system — it is whether an agent can, and whether anything is checking the output when it does.",
        outcome: "ON Court: a court workspace whose sidebar is split between the product and the system that produced it. Foundations reads every colour back from the browser after the cascade resolves, so 31 token pairs are re-derived in both themes rather than trusted. Test UI hosts new screens as experiments — including a filing step and a scrutiny workspace with a switchable no-AI state — and the measurement page is what decides whether an experiment gets promoted.",
        // PLACEHOLDER OUTCOMES — not measured. The verified structural numbers
        // (31 pairs, 4.54:1, five surfaces) are still in the body, where they
        // belong and where anyone can check them by opening the app.
        stats: [
          { value: "4 days → 6 hrs", label: "From a new screen brief to a reviewable build", provisional: true },
          { value: "83%", label: "Of a new screen assembled from existing components", provisional: true },
          { value: "0", label: "Contrast regressions since the check went in", provisional: true },
        ],
        frames: [],
        recruiter: {
          role: "Product Designer",
          timeline: "2026",
          liveAt: null,
          domain: "Gov tech · Courts · Design systems",
          platform: "Next.js web app · Tailwind tokens · shadcn/Radix",
          team: "Solo build on the PUCAR design system — scope per surface is in the ledger",
          problem: "A documented design system proves nothing on its own. Tokens are asserted rather than measured, components are shown in isolation where they always look fine, and a failing colour pair is discovered by a user rather than by a check.",
          shipped: "A court workspace with the system inside it: 31 token pairs re-measured from the rendered result in both themes, five experiment surfaces including a scrutiny workspace with a switchable no-AI state, and a promotion rule that depends on the measurement rather than on an opinion.",
          owned: ["Design tokens", "Component design", "Interaction design", "AI UX", "Accessibility", "Documentation", "Front-end build"],
          bullets: [
            "Built a working court workspace with the design system in the other half of its sidebar. Dashboard, cases and filing on one side; foundations, components and a scratch surface on the other — same shell, same tokens, one click apart.",
            "The system measures its own output. Foundations reads every colour back from the browser after the cascade resolves, so 31 pairs are re-derived per theme instead of copied from the token file — a token that fails silently is a bug in tokens.ts, not a styling opinion.",
            "Designed the no-AI state as a first-class, switchable state. A toggle takes the scrutiny workspace to manual: the banner states assistance is unavailable, mismatch cards go, and an officer can still finish the review. Court software cannot have a degraded state that is merely a broken one.",
            "The pair with no room left is in the case study, not hidden. Success and destructive pills both measure 4.54:1 against a 4.5:1 floor — four hundredths — written up as standing risks with a proposed guard rather than as passes.",
            "The measurement layer catches contrast and only contrast. It cannot see a wrong information architecture, bad copy, or an AI callout that overstates its confidence — which is why this is a rig for trying screens, not a machine for shipping them.",
          ],
        },
        caseFile: {
          causeList: {
            label: "Cause list",
            heading: "Three matters, one line each",
            note: "One deployed app: the product, the system that built it, and the rig where new screens get tried.",
          },
          heroExhibits: [
            { id: "A", src: "assets/work/oncourt/01-scrutiny-ai-mismatch.png", alt: "Three-pane scrutiny workspace with two AI mismatch cards offering accept, keep or flag against the filed value", caption: "Scrutiny — mismatch, with the decision left to the officer", clearance: "public", ratio: "1800 / 992" },
            { id: "B", src: "assets/work/oncourt/02-scrutiny-ai-unavailable.png", alt: "The same scrutiny screen with assistance unavailable — banner, collapsed mismatch panel, manual checks stated", caption: "The same screen with AI off — a designed state, not a failure state", clearance: "public", ratio: "1800 / 992" },
            { id: "C", src: "assets/work/oncourt/03-foundations-light.png", alt: "Foundations page framing the token set as a laboratory, reporting 31 pairs clearing AA after the cascade resolves", caption: "Foundations — the system measuring what it actually rendered", clearance: "public", ratio: "1800 / 992" },
            { id: "I", src: "assets/work/oncourt/09-test-ui-index.png", alt: "The Test UI index listing four experiments, showing this is a rig for trying screens rather than a feature set", caption: "Test UI — four experiments, two of them full screen", clearance: "public", ratio: "1800 / 992" },
          ],
          premise: {
            heading: "The thesis",
            body: [
              "A design system that can measure its own output, sitting inside the product it produced, with a scratch surface for running new screens against it. An agent can generate a court screen; the system checks whether the result is actually accessible; the sandbox hosts the experiment. The loop closes without a human eyeballing a swatch.",
              "The sidebar says it before any of the copy does. Dashboard, Cases, Hearings, Documents, Parties on one side. Foundations, Components, Test UI on the other. The left half is a plausible court product; the right half is the system that built it, in the same shell and under the same tokens.",
              "Two floors are in play throughout, and they are not the same: 4.5:1 for text, 3:1 for boundaries and other non-text contrast. Reporting them together would hide the pairs that only clear the lower one.",
            ],
            citation: {
              label: "WCAG 2.2, SC 1.4.3 Contrast (Minimum) and SC 1.4.11 Non-text Contrast — W3C",
              href: "https://www.w3.org/TR/WCAG22/#contrast-minimum",
            },
          },
          ledger: {
            heading: "Where I came in",
            body: [
              "Six surfaces, and they were not all mine in the same way. The labels are the point: a reader should be able to trust them, so they are stated as scope rather than as credit.",
            ],
            columns: ["Surface", "Mode", "Scope"],
            rows: [
              { matter: "Design system — tokens, 31 pairs", mode: "Designed", scope: "Primitive ramps, semantic layer, component adaptations" },
              { matter: "Foundations measurement page", mode: "Contributed", scope: "Designed the page — measurement implementation authorship to confirm" },
              { matter: "Filing flow (5 steps)", mode: "Designed", scope: "Grouped document slots, OCR read-back, blocker states" },
              { matter: "Scrutiny workspace + AI states", mode: "Designed", scope: "Three-pane review, the mismatch triad, the no-AI mode" },
              { matter: "Components library", mode: "Designed", scope: "Patterns, navigation, disclosure rules against screen-craft" },
              { matter: "Test UI rig", mode: "Designed", scope: "The scratch surface and the promotion rule behind it" },
            ],
            modeKey: [
              ["Designed", "owned end to end"],
              ["Contributed", "owned a defined slice inside someone else's scope"],
              ["Audited", "evaluated existing work"],
              ["Proposed", "recommended; not adopted, or not yet"],
            ],
          },
          matters: [
            {
              no: "001",
              slug: "matter-001",
              title: "Measuring what rendered, not what was written",
              state: "Deployed",
              mode: "Contributed",
              oneLine: "Foundations reads colours back from the browser, so the system checks itself.",
              context: [
                "Foundations presents the token set as a laboratory rather than a swatch sheet. Every pair is read back from the browser after the cascade has resolved, which means the number on screen is the number that painted — not the number the token file intended. Flip the theme in the header and all 31 pairs re-derive.",
                "The dark column is not the light column recalculated. Every value is measured again in the other theme, which is why body text reads 15.98:1 in light and 16.25:1 in dark rather than one being derived from the other.",
              ],
              contrast: {
                label: "What Foundations reports — measured after the cascade, both themes",
                pairs: [
                  { pair: "Body text", tokens: "--foreground on --background", light: 15.98, dark: 16.25, floor: 4.5 },
                  { pair: "Sidebar", tokens: "--sidebar-foreground on --sidebar", light: 15.58, dark: null, floor: 4.5 },
                  { pair: "Prefilled field", tokens: "--input-prefilled-foreground on --input-prefilled", light: 15.76, dark: null, floor: 4.5 },
                  { pair: "Warning solid", tokens: "--warning-foreground on --warning", light: 9.47, dark: null, floor: 4.5 },
                  { pair: "Warning ink", tokens: "--warning-ink on --warning-muted", light: 5.17, dark: null, floor: 4.5 },
                  { pair: "Primary button label", tokens: "--primary-foreground on --primary", light: 4.90, dark: 7.50, floor: 4.5 },
                  {
                    pair: "Success pill", tokens: "--success-muted-foreground on --success-muted", light: 4.54, dark: null, floor: 4.5,
                    risk: "Four hundredths of headroom. Any future nudge to either token — a lightened surface, a tweaked ink — drops it below the floor, and the failure would be silent unless something is watching. Proposed guard: a minimum-headroom rule in the check, not a comment in the token file.",
                  },
                  {
                    pair: "Destructive pill", tokens: "--destructive-muted-foreground on --destructive-muted", light: 4.54, dark: null, floor: 4.5,
                    risk: "Same margin, same guard. Two of the three status pills sit at the floor, which suggests the muted surfaces were tuned to just clear it rather than to hold a margin.",
                  },
                  {
                    pair: "Field boundary", tokens: "--input-border on --background", light: 3.22, dark: null, floor: 3.0,
                    risk: "Non-text contrast, so the floor is 3:1 rather than 4.5:1. It clears, with 0.22 to spare — worth knowing before anyone softens a border.",
                  },
                ],
                note: "31 pairs clear AA in both themes, with decorative hairlines and surface fills exempted and measured apart. The flagged rows are not failures. They are the pairs with no room left, and they are written up as standing risks rather than as passes.",
              },
              decisions: [
                {
                  constraint: "A token file can be correct and the rendered result still wrong — a cascade override, a fallback, a shadow, an opacity layer. Auditing the source catches none of that.",
                  options: [
                    "Audit tokens.ts and trust the cascade",
                    "A CI check comparing token values against the floors",
                    "Read every colour back from the browser after the cascade resolves, in both themes",
                  ],
                  chose: "Foundations measures what painted. Nothing is copied from the token file; flip the theme and all 31 pairs re-derive.",
                  why: "The floor is a property of the rendered pixel, not of the source. Everything that can change a colour on its way to the screen is exactly what an audit needs to see.",
                  cost: "It only measures pairs someone thought to register, so coverage is a curation problem — 31 pairs clearing AA is a claim about the registry, not about the app. The next thing to build is the check that fails when a component ships a colour pairing the registry has never heard of.",
                  lever: "Lever 3 &middot; Evolve rules to match digital tools",
                },
              ],
              rejected: [
                {
                  direction: "Publishing the tokens as a documentation site",
                  whyNot: "It tells you what the tokens are and proves nothing. A working app under the same tokens gives the measurement page something real to measure, and puts every component under content density it cannot fake.",
                },
                {
                  direction: "A Storybook alongside the product",
                  whyNot: "Storybook shows components in isolation, which is exactly where they always look fine. The interesting failures only appear inside a dense screen with real content in it.",
                },
              ],
              exhibits: [
                { id: "D", src: "assets/work/oncourt/04-foundations-dark.png", alt: "Foundations in dark theme with every contrast ratio re-derived rather than converted from the light values", caption: "Foundations, dark — same 31 pairs, every number re-measured", clearance: "public", ratio: "1800 / 992" },
                { id: "E", src: "assets/work/oncourt/05-foundations-status-pairs.png", alt: "Status token pairs showing the success and destructive pills sitting at 4.54:1 against a 4.5:1 floor", caption: "Status pairs — where the four-hundredths pair lives", clearance: "public", ratio: "1800 / 992" },
                { id: "F", src: "assets/work/oncourt/06-foundations-boundaries.png", alt: "Non-text contrast section measuring boundaries against the 3:1 floor with decorative hairlines exempted", caption: "Boundaries measured against 3:1, hairlines exempted and measured apart", clearance: "public", ratio: "1800 / 992" },
              ],
            },
            {
              no: "002",
              slug: "matter-002",
              title: "The experiment surfaces",
              state: "Deployed",
              mode: "Designed",
              oneLine: "Five screens built to be tried against the system, measured, and thrown away.",
              context: [
                "Test UI describes itself as a scratch surface for trying screens against the design system. That framing matters more than any individual screen on it: these are experiments, not features, and the rig is the deliverable.",
                "Two of them open full screen, because a filing step and an officer's review workspace cannot be judged inside a panel.",
              ],
              surfaces: {
                label: "Five experiment surfaces",
                items: [
                  { name: "Complete your profile", tests: "The Figma → system translation — an onboarding modal redesigned into Pucar tokens", route: "in-workspace", fullScreen: false },
                  { name: "Pending payment dialog", tests: "Payment under verification — amount receipt, one calm note, progressive disclosure", route: "in-workspace", fullScreen: false },
                  { name: "Document upload step", tests: "Step 3 of 5 of the filing flow — grouped slots, OCR read-back, focused layout", route: "/filing/documents", fullScreen: true },
                  { name: "Scrutiny review workspace", tests: "Officer review of an S.138 filing — evidence marking, mismatch callouts, flag composer", route: "/scrutiny", fullScreen: true },
                  { name: "New case form", tests: "The structured-entry counterpart to the upload-first flow", route: "/settings", fullScreen: true },
                ],
              },
              decisions: [
                {
                  constraint: "An officer still has to finish the review when the assistance is down. A degraded state cannot just be a broken version of the good one.",
                  options: [
                    "Hide the AI affordances when unavailable",
                    "Show them disabled with an error",
                    "Ship a switchable no-AI mode that changes what the workspace claims, not only what it shows",
                  ],
                  chose: "A 'Simulate AI unavailable' toggle in the header. With it on, a banner states that assistance is unavailable for this file and all checks are manual, every mismatch card goes, and the fields that never had a document to verify against still say so.",
                  why: "You cannot design a fallback you cannot stand in. As a toggle, the degraded state is testable by anyone — including me months later, and including whoever is reading this case study.",
                  cost: "Two full states to keep in sync, and one honest bug that fell out of it: with AI off the panel reports 'All fields reviewed' when no human has reviewed anything yet. That phrasing is doing optimistic work. It is on the list, not defended.",
                  lever: "Lever 3 &middot; Evolve rules to match digital tools",
                },
                {
                  constraint: "Extraction moves work earlier. Left alone, it also moves the decision — from the officer to the model.",
                  options: [
                    "Auto-apply the highest-confidence value",
                    "Auto-apply and write it to a log",
                    "Surface the conflict and never replace a filed value without a decision",
                  ],
                  chose: "Every mismatch names the document it came from, describes the conflict in a sentence a person can check, and offers exactly three: Accept suggestion &middot; Keep filed value &middot; Flag.",
                  why: "A wrong auto-filled field is worse than an empty one; it looks like a fact somebody already agreed to. Three explicit choices keep the agreement where it belongs.",
                  cost: "Three fields needing attention is three decisions the officer would not otherwise be making. The design buys accountability with the officer's time, and that trade should be stated rather than buried.",
                  lever: "Lever 5 &middot; Don't wait for information you don't need",
                },
                {
                  constraint: "A generic upload-your-documents dropzone pushes the grouping burden onto the person least equipped to carry it.",
                  options: [
                    "One dropzone, sort it out later",
                    "Group by file type",
                    "Group the way the statute organises the case, and repeat the group per instrument",
                  ],
                  chose: "Slots grouped as Cheques, Complainants, Notice &amp; service, and Supporting (optional) — each cheque a card holding front and bank return memo, 'Add another complainant' repeating the group. Progress reads 5 of 7 required documents &middot; 2 to go, and the primary action stays disabled with the blocker named in the footer.",
                  why: "The filing has a shape in law. Matching it means the interface can say what is missing in the same words the case uses, instead of asking someone to invent a folder structure.",
                  cost: "The structure has to be maintained per case type. Every new cause of action needs a schema, not just a form.",
                  lever: "Lever 5 &middot; Don't wait for information you don't need",
                },
              ],
              rejected: [
                {
                  direction: "Auto-applying high-confidence extractions and logging the change",
                  whyNot: "Cheaper for the officer and quietly corrosive — the record would change without a person agreeing to it. Logged is not the same as decided.",
                },
                {
                  direction: "Shipping the experiments straight into the workspace nav",
                  whyNot: "An experiment that appears as a feature stops being disposable. Keeping them behind Test UI is what makes it cheap to throw one away.",
                },
              ],
              exhibits: [
                { id: "G", src: "assets/work/oncourt/07-filing-documents.png", alt: "Filing step 3 of 5 with document slots grouped by filing role and the primary action disabled with the blocker named", caption: "Step 3 of 5 — grouped by filing role, blocker named in the footer", clearance: "public", ratio: "1800 / 992" },
                { id: "H", src: "assets/work/oncourt/08-filing-documents-lower.png", alt: "Notice and service group with optional supporting documents and empty slot states showing what each slot expects", caption: "Optional groups and empty slot states", clearance: "public", ratio: "1800 / 992" },
                { id: "J", src: "assets/work/oncourt/10-dashboard-light.png", alt: "Court dashboard with the KPI row, filings chart and active docket split, on synthetic demo figures", caption: "Dashboard — demo data throughout, not programme outcomes", clearance: "public", ratio: "1800 / 992" },
                { id: "M", src: "assets/work/oncourt/13-case-detail-overview.png", alt: "Case detail overview summarising an S.138 filing with parties and documents in the right rail", caption: "Case detail — the product half of the shell, same tokens", clearance: "public", ratio: "1800 / 992" },
                { id: "O", src: "assets/work/oncourt/15-components-patterns.png", alt: "Components page documenting progressive disclosure rules and citing the screen-craft rulebook by section", caption: "Components — patterns documented against a written rulebook", clearance: "public", ratio: "1800 / 992" },
              ],
            },
            {
              no: "003",
              slug: "matter-003",
              title: "Auditing my own prototype",
              state: "Reported",
              mode: "Audited",
              oneLine: "Seven reproducible defects in my own build, ranked, with what held up named too.",
              context: [
                "One pass through the deployed app, every defect reproduced before it was written down. These are mine — it is my prototype, so this is an audit of my own work rather than someone else's, and it is here because a case study that shows only the working parts is a brochure.",
              ],
              findings: [
                { n: "1", finding: "/settings serves the New case form, and the header's New case button points there.", why: "Route and purpose disagree, and a real settings page now has nowhere to live. Cheap to fix, and the kind of thing that reads as unfinished to anyone who looks at the URL bar.", severity: "High" },
                { n: "2", finding: "Sidebar Hearings, Documents and Parties, plus Help &amp; support, are all href=\"#\".", why: "Four items present as live and do nothing. Either disable them visibly or ship stubs — a nav that lies about what exists costs more trust than a nav with fewer items.", severity: "High" },
                { n: "3", finding: "The filing page's sticky header detaches mid-scroll, leaving a blank band above it and the header floating over empty space.", why: "A stacking and paint problem on the flow that matters most, and it will almost certainly be worse at 390px.", severity: "Medium" },
                { n: "4", finding: "Scroll position is not reset on client-side navigation — arriving at Components lands mid-page, and Home did not restore the top.", why: "The reader loses the start of every page they navigate to, which makes a documentation surface feel broken even when the content is right.", severity: "Medium" },
                { n: "5", finding: "The case detail h1 is clipped by the sticky header when scrolled — the case title slides under it rather than behind a solid surface.", why: "Same class of problem as the nav-pill overlap found on the public site: a transparent sticky layer over content that needs to stay readable.", severity: "Medium" },
                { n: "6", finding: "The Documents tab on the case detail defers to the right rail — see the panel on the right.", why: "A tab that does no work while a duplicate panel does it. Pick one surface and let the other go.", severity: "Low" },
                { n: "7", finding: "The theme toggle needed two activations on first use and did not survive the first navigation. It worked and persisted thereafter.", why: "A first-run hydration or persistence order problem. Small, but it is the first thing a reviewer touches.", severity: "Low" },
              ],
              worked: "What held up, and it is most of it: visible focus rings on icon buttons, monospace CNR and token names, sentence case throughout, tabs that switch cleanly, a dark theme that is genuinely complete rather than inverted, and copy discipline I would defend anywhere — 'Rare or advanced fields are hidden behind a trigger, never deleted. Critical information never lives only behind one.'",
              selfNote: "Findings 3 and 5 are both sticky-layer problems, which sets a standard for this page too: nothing here scrolls under a transparent bar over text that has to stay readable.",
              openIssue: {
                label: "Held back before publishing",
                body: "The scrutiny sample ships plausible identity-document content — a masked number, an address, a date of birth. It is invented, but invented identity data reads badly on a public portfolio in this sector, so those exhibits stay unpublished until the mock is restyled as visibly dummy content or the document pane is blurred. The dashboard figures are demo data too, and are labelled as demo data wherever they appear rather than presented as programme outcomes.",
              },
              rejected: [
                {
                  direction: "Fixing the seven quietly and publishing only the finished version",
                  whyNot: "The audit is the working practice, and it is more useful evidence than a clean screenshot. The fixes are worth doing; hiding that they were needed is not.",
                },
              ],
            },
          ],
          loopSection: {
            heading: "How a screen gets made",
            body: [
              "The question a portfolio reader will have is how much of this is automated, and the app already answers it. Two details make the pipeline credible rather than aspirational, and both are observable: the Components page cites a screen-craft rulebook by section number, so the generation stage has a written spec rather than vibes; and AGENTS.md exists so an agent can read the system instead of guessing at it.",
            ],
            loop: {
              label: "Generate, host, measure",
              inputs: [
                { label: "Figma tokens → tokens.ts → globals.css", note: "the values, mapped through @theme inline" },
                { label: "screen-craft rulebook", note: "the written spec — Components cites it by section, 'per screen-craft §5'" },
                { label: "AGENTS.md", note: "so an agent can read the system rather than guess at it" },
                { label: "component inventory", note: "what already exists, so nothing gets reinvented" },
              ],
              stages: [
                { label: "coding agent", note: "generates a screen against the rulebook and the tokens" },
                { label: "/test-ui", note: "hosts the experiment — a scratch surface, not a release" },
                { label: "/foundations", note: "measures what actually rendered, in both themes" },
              ],
              branches: [
                { cond: "31 pairs clear AA", then: "promote it to /components" },
                { cond: "a pair drops below its floor", then: "a bug in tokens.ts, not a styling opinion", fail: true },
              ],
              gap: "Contrast, and only contrast. The loop cannot see a wrong information architecture, bad copy, a mis-grouped document slot, or an AI callout that overstates its confidence. Those still need a designer — which is the reason this is a rig for trying screens, not a machine for shipping them.",
            },
          },
          differently: {
            heading: "What I'd do differently",
            items: [
              {
                title: "Ship the tokens as an installable artefact.",
                body: "The sandbox proves the system inside one app. It still does not let a second app consume it — no package, no registry endpoint — so the system travels as a repo to copy from rather than a dependency to install.",
              },
              {
                title: "Guard the floor in the check, not in a comment.",
                body: "Two pills sitting at 4.54:1 are visible because something measures them, but nothing stops the next commit from pushing one under. A minimum-headroom rule belongs in the same place the measurement lives.",
              },
              {
                title: "Register pairs by construction, not by hand.",
                body: "Coverage is curated, so the honest claim is about the registry rather than the app. The check I want next fails when a component renders a colour pairing the registry has never seen.",
              },
            ],
          },
          forward: {
            heading: "What I'm taking forward",
            items: [
              "Measure the rendered result, not the source. Everything that can change a value on its way to the screen is exactly what an audit needs to see.",
              "Design the degraded state as a state. If it cannot be switched on and stood in, it has not been designed.",
              "Say what the automation cannot see. The loop's limit is the most useful paragraph in the whole case study.",
            ],
          },
        },
      },
    },
    // ── Holistic Progress Card ────────────────────────────────────────────────
    // Published from VERIFIED and COMPUTED material only. Everything below is
    // either NCF-FS 2022 (counted directly, §2.4), the published scoring model,
    // arithmetic on that model (scripts/hpc-arithmetic.js recomputes all of it),
    // or UDISE+ 2024-25. Nothing here is fieldwork.
    //
    // TO CONFIRM before this goes public:
    //   1. The Role Ledger is deliberately ABSENT — modes for the five surfaces
    //      (scoring model, entry layer, parent card, dashboard, field research)
    //      are unknown, and inventing them is the one thing this case study
    //      cannot do. Send them and it goes in.
    //   2. Fieldwork counts: districts, schools, teachers, observations, days,
    //      and whether one card was ever timed. No field chapter until then.
    //   3. Which of the candidate field realities you actually saw.
    //   4. Was the scoring logic yours, inherited, or joint? This decides
    //      whether matter 001 reads as self-critique or as audit.
    //   5. Class size and assessment cycles, for the judgment-load figure —
    //      currently stated as illustrative and labelled as such.
    //   6. Anything already working that deserves saying (required, not optional).
    //   7. ConveGenius sign-off — see CLEARANCE.md at the repo root. The five
    //      device mockups now on the page are built from the HPC app designs and
    //      are internal product screens: they need Brand/programme clearance
    //      before this is public, and authorship of those screens needs stating.
    //   8. Verify the concept note's own numbering against the note itself; the
    //      level/band values here come from the brief's quotation of it.
    {
      id: "09",
      thumb: "assets/work/thumbs/hpc.png",
      status: "shipped",
      title: "Holistic Progress Card",
      category: "Product Design",
      year: "2026",
      description: "Reading a child-assessment model as a designer — finding every point where the translation from watching a child to a number about a child loses the child.",
      tags: ["Gov Tech", "Assessment", "Design Audit", "Data Ethics"],
      color: "#f2f4f0",
      iconGradient: "linear-gradient(135deg,#4b6043,#8a9a5b)",
      accentColor: "#4b6043",
      detail: {
        role: "Product Designer",
        challenge: "The Holistic Progress Card exists to move assessment away from marks. The scoring layer quietly puts them back: three observed levels become a percentage, the percentage becomes a band, the band becomes a district comparison. Each step is reasonable on its own and the sequence ends somewhere the framework was built to avoid — and it has to survive a school where one teacher is the only adult in the building.",
        outcome: "A structural read of the model, all of it checkable by anyone holding NCF-FS 2022 and the scoring rules: a third of the reported scale can never be used, the same act of teacher judgment counts 4.5 times more in one reporting group than another, two of the six groups can be moved a full band by two judgment calls, and the same word means two different things to a teacher and a parent. Plus the design responses that follow, including a suppression threshold derived rather than borrowed.",
        // PLACEHOLDER OUTCOMES — not measured, and this one carries the most
        // risk: numbers attributed to a government programme are the highest-
        // risk content on the page (CLEARANCE.md row 10). The sourced figures
        // — 68 competencies, the 33-point dead scale, the 4.5x weighting gap —
        // are all still in the body with their working shown.
        stats: [
          { value: "14 min", label: "To complete one child's card, from 38", provisional: true },
          { value: "91%", label: "Of cards submitted inside the assessment window", provisional: true },
          { value: "3,200", label: "Children assessed across the pilot blocks", provisional: true },
        ],
        frames: [],
        recruiter: {
          role: "Product Designer",
          timeline: "2026",
          liveAt: null,
          domain: "Gov tech · Early education · Assessment",
          platform: "Teacher entry layer · parent card · state dashboard",
          team: "ConveGenius · government-facing programme — scope to confirm",
          problem: "An assessment system built to replace marks reintroduces them through its scoring layer, and the numbers it produces get compared across districts. The design question is where the translation from observation to number stops describing the child.",
          shipped: "A structural analysis of the scoring model with the arithmetic shown, and the design responses that follow — what a parent sees first, what colour may not mean, and when a dashboard must refuse to publish a figure.",
          owned: ["Design audit", "Systems thinking", "Information design", "Data ethics", "Accessibility"],
          bullets: [
            "Read a national assessment framework as a designer, not a form-filler. NCF-FS defines 5 domains, 13 curricular goals and 68 competencies; the scoring model reports 6 equal-weight groups by promoting the 13th goal to domain status. That one move is where the distortions start.",
            "Found the unreachable floor. The lowest level scores 33%, so a child assessed 'Not Yet' on every competency still displays as a bar one-third full. A third of the scale can never be used, and inside what remains the lowest band takes 55% of the space.",
            "Quantified the weighting distortion. One competency is worth 25 points in a four-competency group and 5.6 in an eighteen-competency one, so the same act of judgment counts 4.5 times more depending on where it lands.",
            "Derived the suppression threshold instead of borrowing it. One judgment about one child moves a published gender gap by (34 ÷ n) ÷ subgroup size, which gives a minimum of 9 children per subgroup — rounding to the familiar 10, but arrived at by arithmetic that survives being asked how.",
            "Every number on the page recomputes. The arithmetic lives in a script, not in the copy, so the case study cannot drift from its own claims — and the numbers I do not have, chiefly the fieldwork counts, are absent rather than estimated.",
          ],
        },
        caseFile: {
          causeList: {
            label: "Progress card",
            heading: "Two matters, one line each",
            note: "Every figure is verified from NCF-FS 2022 and the published scoring model, or computed from them.",
          },
          premise: {
            heading: "What the card is meant to do",
            body: [
              "The National Curriculum Framework for the Foundational Stage sets out five domains of development, thirteen curricular goals, and — counted directly from Section 2.4 — sixty-eight competencies. It assesses through observation, conversation and analysis of a child's work. The Holistic Progress Card is the instrument that carries that into a classroom and then to a parent, with a digital entry layer behind it and a state-to-student dashboard above it.",
              "The stated aim is a shift from marks to meaningful milestones. Marks were the thing being replaced, so the interesting question is not whether the card is well laid out. It is what happens to a developmental observation as it passes through a scoring layer on its way to a district comparison.",
              "One more thing shapes every design decision here, and it is a matter of public record rather than fieldwork: 2,964 government schools in Himachal Pradesh — 17.1% of the state's schools, with 46,329 children between them — run on a single teacher, per UDISE+ 2024-25. In those schools the person doing the observation, the conversation and the analysis of every child's work is also the only person teaching them. Assessment time is instruction time, one for one.",
            ],
            exhibits: [
              { id: "A", src: "assets/work/hpc/01-home-class-overview.png", alt: "Teacher home screen listing each class with wellbeing, attendance and performance summarised as three short verdicts", caption: "What a teacher opens — every class reduced to three verdicts before any detail", clearance: "public", ratio: "764 / 1800" },
            ],
            citation: {
              label: "National Curriculum Framework for the Foundational Stage 2022, NCERT — domains and curricular goals at §2.3, competencies at §2.4",
              href: "https://ncert.nic.in/pdf/NCF_for_Foundational_Stage_20_October_2022.pdf",
            },
          },
          matters: [
            {
              no: "001",
              slug: "matter-001",
              title: "Reading the scoring model",
              state: "Analysis complete",
              mode: "Audited",
              oneLine: "Three observed levels become a percentage, a band, then a district comparison.",
              context: [
                "The model marks each competency at one of three levels — Achieved 100%, Emerging 66%, Not Yet 33% — averages them to a domain score out of 100 with equal weight per competency, then sorts the result into three bands: Advanced 85+, Proficient 70 to 84.9, Emerging below 70. Those bands aggregate upward through five dashboard levels, from state to student.",
                "Each step is defensible on its own. The compound effect is not, and all of it is checkable by anyone holding the framework and the scoring rules.",
              ],
              graphic: {
                floor: 33,
                bands: { proficient: 70, advanced: 85 },
                flip: 8.5,
                caption: "The reported scale. The lowest achievable score is 33, so the hatched third can never be used — and one judgment call in the smallest reporting group moves a child 8.5 points, more than half the Proficient band.",
              },
              tables: [
                {
                  label: "Band fragility, at the real competency counts",
                  columns: ["Reporting group", "Goals", "n", "One flip", "Flips to cross Proficient"],
                  rows: [
                    ["Positive Learning Habits", "1", "4", "8.5 pts", "1.8"],
                    ["Aesthetic and Cultural", "1", "5", "6.8 pts", "2.2"],
                    ["Socio-Emotional and Ethical", "3", "9", "3.8 pts", "3.9"],
                    ["Physical Development", "3", "16", "2.1 pts", "7.0"],
                    ["Cognitive Development", "2", "16", "2.1 pts", "7.0"],
                    ["Language and Literacy", "3", "18", "1.9 pts", "7.9"],
                  ],
                  mono: [1, 2, 3, 4],
                  highlight: [0, 1],
                  formula: "One flip = (100 − 66) ÷ n. Flips to cross the band = 14.9 ÷ (34 ÷ n).",
                  note: "Two judgment calls move a child a full band in the two one-goal groups. Note what this does not say: no single flip crosses a whole band at the real competency counts — the closest is Positive Learning Habits, where one flip covers 57% of the Proficient band. The claim is deliberately the smaller, true one. Six of the fifteen achievable scores in that group sit above the Proficient boundary at all, so an 'Advanced' verdict there rests on two possible values.",
                },
                {
                  label: "What equal weight per group actually weights",
                  columns: ["Reporting group", "n", "One competency is worth", "Group weight if competencies were equal"],
                  rows: [
                    ["Positive Learning Habits", "4", "25.0 of 100", "5.9%"],
                    ["Aesthetic and Cultural", "5", "20.0 of 100", "7.4%"],
                    ["Socio-Emotional and Ethical", "9", "11.1 of 100", "13.2%"],
                    ["Physical Development", "16", "6.3 of 100", "23.5%"],
                    ["Cognitive Development", "16", "6.3 of 100", "23.5%"],
                    ["Language and Literacy", "18", "5.6 of 100", "26.5%"],
                  ],
                  mono: [1, 2, 3],
                  highlight: [0, 5],
                  formula: "Per-competency weight = 100 ÷ n. Equal-competency weight = n ÷ 68.",
                  note: "The same act of teacher judgment counts 4.5 times more in Positive Learning Habits than in Language and Literacy. Under equal group weighting, Language and Literacy is carrying 26.5% of the assessed competencies while reporting 16.7% of the profile, and Positive Learning Habits — one goal that the framework positions as additional to the five domains — reports the same 16.7% on 5.9%.",
                },
              ],
              findingsIntro: "Five structural findings, ranked by what they do to a child's reported profile rather than by how hard they are to fix.",
              findings: [
                { n: "1", finding: "The lowest achievable domain score is 33, not 0, so a 0–100 bar shows a child assessed &lsquo;Not Yet&rsquo; on everything as one-third full.", why: "Either the scale starts at 33 or the bar misrepresents the child — and the second is what ships by default. Inside the reachable 67 points, the lowest band occupies 55% of the space, so most of the usable scale is one label.", severity: "High" },
                { n: "2", finding: "Equal weight per reporting group makes one competency worth 25 points in one group and 5.6 in another.", why: "The distortion follows from promoting a single curricular goal to group status beside groups holding three. It is a weighting decision presented as a neutral average.", severity: "High" },
                { n: "3", finding: "In the two one-goal groups, two judgment calls move a child a full band.", why: "Bands are being read as developmental change. In small groups they are also reporting the difference between two teachers&rsquo; readings of the same five-year-old.", severity: "High" },
                { n: "4", finding: "&lsquo;Emerging&rsquo; is both a competency level and a band, meaning different things.", why: "A teacher marking &lsquo;Emerging&rsquo; on a competency and a parent reading &lsquo;Emerging&rsquo; as an overall band are reading the same word in two registers, on the same card. This is a content-design fault, not a copy preference.", severity: "Medium" },
                { n: "5", finding: "The model reports six groups where the framework defines five domains, and renames one of them.", why: "NCF-FS positions Positive Learning Habits as an additional goal alongside the domain-based ones, and calls the arts domain &lsquo;Aesthetic and Cultural Development&rsquo;. Fidelity drift on a policy-aligned product is worth catching early, while it is still a naming fix.", severity: "Medium" },
              ],
              exhibits: [
                { id: "B", src: "assets/work/hpc/03-student-report.png", alt: "Two screens of a student report showing percentages, an overall grade and per-subject scores stacked above the wellbeing sections", caption: "Where the model surfaces — percentages, a grade, and a verdict per section", clearance: "public", ratio: "1793 / 1800" },
              ],
              rejected: [
                {
                  direction: "Rendering the domain score on a 0–100 bar because that is what a percentage implies",
                  whyNot: "It is the default and it is wrong: a third of the bar is unreachable, so every child appears to have earned something they were never assessed for. Either the axis starts at the floor or the number stops being a bar.",
                },
                {
                  direction: "Reporting the band and leaving the competency counts out of the parent card",
                  whyNot: "A band computed on four competencies and a band computed on eighteen are not the same object. Publishing them under one label makes them look comparable.",
                },
              ],
            },
            {
              no: "002",
              slug: "matter-002",
              title: "What follows for the card and the dashboard",
              state: "Proposed",
              mode: "Proposed",
              oneLine: "Design responses that keep the number from becoming the point.",
              context: [
                "These are proposals, and they are marked as proposals: they follow from the arithmetic above rather than from a decision I can claim was adopted. Each one costs something, and the cost is stated.",
                "The screens below are the teacher-facing surface as it stands, which is what the proposals are arguing with. Note that the teacher view does carry status colour — the argument against red, amber and green is specifically about the card that goes home to a parent, not about a professional's dashboard.",
              ],
              decisions: [
                {
                  constraint: "A parent who sees a band first has received a grade, and stopping the delivery of grades was the whole point of the instrument.",
                  options: [
                    "Band first, with the detail below",
                    "Band with an explanatory sentence",
                    "Lead with a specific observed thing the child did, and place the band where a parent has to go looking for it",
                  ],
                  chose: "Propose leading with an observation — something the child was seen doing — and demoting the band below it.",
                  why: "Observation is what the framework actually collects. It is also the only part of the card a parent can act on, because it describes a child rather than ranking one.",
                  cost: "An observation has to be written per child, which is teacher time in a school where teacher time is the binding constraint. A band is free to generate. This proposal spends the scarcest resource in the system and has to justify itself against that.",
                },
                {
                  constraint: "Red, amber and green on a six-year-old&rsquo;s card turn a developmental observation into a verdict, and red does not mean the same thing in every household.",
                  options: [
                    "Traffic lights, because they are instantly legible",
                    "Traffic lights with labels",
                    "A single-hue sequential ramp, always paired with a text label",
                  ],
                  chose: "Propose a sequential ramp in one hue, never colour alone, with &lsquo;Not Yet&rsquo; carrying no alarm colour at all.",
                  why: "The scale is developmental, not diagnostic. A ramp reads as position on a journey; traffic lights read as pass and fail.",
                  cost: "Lower instant legibility for a parent scanning quickly, and it gives up a convention people already know. It also needs the label to be present everywhere, which costs space on a card that is already dense.",
                },
                {
                  constraint: "The KPI set computes a gender gap down to school level. In a state with thousands of small schools, a school-grade cohort can be a handful of children, and a gap computed on two girls and three boys is noise that someone will act on.",
                  options: [
                    "Publish the gap at every level and let readers judge",
                    "Publish with a confidence interval",
                    "Suppress the figure below a minimum cell size and say why",
                  ],
                  chose: "Propose suppression below 10 children per subgroup, with the tile showing the cohort size and a link to the qualitative summary instead of a number.",
                  why: "Derived rather than borrowed: one competency flip for one girl moves the published gap by (34 ÷ n) ÷ g. To keep any single judgment about any single child from moving the gap by a whole point, the smallest group needs g ≥ 9 — which rounds to the reporting convention of 10, but arrives with arithmetic attached.",
                  cost: "Small schools disappear from an equity metric that exists precisely to protect children in them. That is a real loss, and the honest mitigation is to report gaps at block level and above rather than to pretend the school-level figure means something.",
                },
                {
                  constraint: "Of the four KPIs, submission percentage is the one that is unambiguous and easy to rank — so it is the one that will drive behaviour.",
                  options: [
                    "Rank districts on submission and let completion pressure do the work",
                    "Show submission without ranking",
                    "Pair submission with a distribution check and stop rewarding uniformity",
                  ],
                  chose: "Propose that submission never appears as a ranked league, and that it is shown beside a spread indicator, so a district completing every card with identical ratings does not look like a district doing the work.",
                  why: "Completion pressure on a developmental observation produces uniform ratings. A dashboard that ranks completion manufactures its own data-quality problem and then reports the result as insight.",
                  cost: "It removes the cleanest number on the dashboard from the place officials most want it, and a spread indicator is harder to explain than a percentage. Someone has to defend that trade in a review meeting.",
                },
              ],
              rejected: [
                {
                  direction: "Publishing a school-level gender gap with a confidence interval instead of suppressing it",
                  whyNot: "An interval on five children is honest and useless: it is wide enough to contain everything, and it still puts a number on a tile where someone will read the point estimate and act.",
                },
                {
                  direction: "Adding a &lsquo;how to help at home&rsquo; suggestion generated from the band",
                  whyNot: "A suggestion derived from a band is a suggestion derived from an average of averages. If the card carries advice, it has to come from the observation, which means it cannot be generated.",
                },
              ],
              exhibits: [
                { id: "C", src: "assets/work/hpc/02-live-hpc-flow.png", alt: "The drill-down in three steps: class list, then student list with a class summary, then one student's full record", caption: "The drill-down — class, student list, student. Every step narrows to one child", clearance: "public", ratio: "1800 / 1238" },
                { id: "D", src: "assets/work/hpc/05-grade-selection-flow.png", alt: "Grade selection in three steps, where a teacher scopes which classes they can see before any record opens", caption: "Scoping — a teacher picks their own grades, which is the only access control in the flow", clearance: "public", ratio: "1800 / 1403" },
                { id: "E", src: "assets/work/hpc/04-student-profile-schema.png", alt: "Student profile with every value blurred, leaving the shape of the schema: identity, school and family fields at child level", caption: "The schema, values blurred — this is the record a drill-down reaches", clearance: "redacted", redactionNote: "Values blurred deliberately: the exhibit is about how many child-level fields exist, not what is in them", ratio: "827 / 1800" },
              ],
              openIssue: {
                label: "Unresolved, and framed as a design question",
                body: "The schema carries a child-level identifier and gender, and the dashboard drills to Student. So a state-level user can in principle open one child's socio-emotional scores. The question I would want answered before that path exists is simply which decision, made by whom, needs that record — because if no state-level decision needs it, the access model should not offer it. This is a design question about necessity, not a legal claim, and the current status of India's rules on children's data would need verifying before it were written as anything stronger.",
              },
            },
          ],
          differently: {
            heading: "What is unresolved",
            items: [
              {
                title: "The fieldwork is not in this case study.",
                body: "Research was conducted in Himachal Pradesh, and none of it appears here, because counts I cannot verify and quotes I cannot consent-check do not belong on a public page. What is here is the model analysis, which stands on public sources. The field chapter goes in when the numbers and the consents are confirmed.",
              },
              {
                title: "The judgment-load figure is illustrative on two of its three inputs.",
                body: "68 competencies is sourced. Class size and assessment cycles are not, so the working figure — 25 children × 68 × 3 cycles = 5,100 developmental judgments per teacher per year — is labelled illustrative until real inputs replace it. It is a formula on the page, not a claim.",
              },
              {
                title: "Whose model this is changes how matter 001 reads.",
                body: "If the scoring logic was mine or jointly held, the analysis is self-critique; if it was inherited, it is an audit. Both are publishable and the framing has to be right, so the page currently says only what the arithmetic says.",
              },
            ],
          },
          forward: {
            heading: "What I'm taking forward",
            items: [
              "Do the arithmetic on the scoring model before designing the screen. The distortions here are all upstream of any interface, and none of them are visible in a mockup.",
              "A metric that is easy to rank will be ranked. Design for what the dashboard will make people do, not for what it displays.",
              "Publish the number's floor, not just the number. A scale whose bottom third is unreachable is a scale that misreports every child at the low end.",
            ],
          },
        },
      },
    },
    // ── Bharat SahAIyak ───────────────────────────────────────────────────────
    // Screens are captured from the Claude Design project "Bharat SahAIyak
    // design system" (project 3efede94…), rendered locally and framed by
    // scripts/build-laptop-mockups.js. Recapture: see assets/work/bharat/README.md.
    //
    // TO CONFIRM before this goes public:
    //   1. Role and scope. Set to 'Designed' on the console and 'Contributed' on
    //      the platform work — correct if the real split differs.
    //   2. Dates. Bharat Sah'AIyak ran at Samagra and is now part of Krutrim-OLA;
    //      the year below is the design's, not necessarily the engagement's.
    //   3. Whether these screens may be published at all, and under whose name —
    //      the console names a real department and real-looking officers.
    //   4. Every figure inside the screens (4,120 queries/day, 61,400 workers,
    //      98.4% answered) is demo data in the design file. It is described as
    //      demo data here and must never be repeated as an outcome.
    {
      id: "10",
      status: "shipped",
      title: "Bharat SahAIyak",
      category: "Product Design",
      year: "2025",
      description: "An admin console for the conversational services a state department runs — six bots, three languages, and a model deprecation that needs a decision before the next deployment.",
      tags: ["Gov Tech", "AI UX", "Design Systems", "Multilingual"],
      color: "#f1f3f6",
      iconGradient: "linear-gradient(135deg,#171717,#525252)",
      accentColor: "#171717",
      thumb: "assets/work/bharat/laptop-studio.png",
      detail: {
        role: "Product Designer",
        challenge: "A department does not run one chatbot. It runs six, across WhatsApp, IVR and a PWA, in Odia, Hindi and English, each stitched from adapters, translators, retrievers and a language model — and every one of those parts can be deprecated, rate-limited or quietly degraded by someone else's release. The person accountable for that is a bot owner in a department, not an ML engineer.",
        outcome: "A console that treats a conversational service as an operable thing: a registry that flags configuration changes which have already happened upstream, a recipe canvas where each step states what it does in the language of the work rather than the language of the stack, and designed states for the ways an AI system actually fails — the model retired, the service degraded, the permission missing.",
        // PLACEHOLDER OUTCOMES — not measured. The figures inside the screens are
        // the design's demo data and are not outcomes either.
        stats: [
          { value: "6", label: "Conversational services in one registry", provisional: true },
          { value: "3", label: "Languages per bot — Odia, Hindi, English", provisional: true },
          { value: "6", label: "System states designed, not just the happy one", provisional: true },
        ],
        frames: [],
        recruiter: {
          role: "Product Designer",
          timeline: "2025",
          liveAt: null,
          domain: "Gov tech · Conversational AI · Multilingual",
          platform: "Admin console · WhatsApp / IVR / PWA",
          team: "Samagra · cross-functional — scope to confirm",
          problem: "A state department runs six conversational services across three languages, assembled from parts that other people version. When a model is deprecated or a retriever degrades, the person who has to decide is a bot owner in a department, not an ML engineer.",
          shipped: "A console where a bot is an operable service: a registry that flags upstream changes as decisions, a recipe canvas that names each step in the language of the work, and designed states for the ways an AI system actually fails.",
          owned: ["Product design", "Information architecture", "AI UX", "Interaction design", "Content design", "Design system"],
          bullets: [
            "Designed the admin console for Bharat SahAIyak — six conversational services for a state department, across WhatsApp, IVR and an audience PWA, in Odia, Hindi and English.",
            "The registry surfaces upstream change as a decision, not a notice. A deprecated language model is shown with what it will cost, what still works, and the two things you can do about it — and the row stays flagged until someone decides, not until someone dismisses.",
            "The recipe canvas asks the question, not the parameter. Instead of retrieval.top_k, the rail asks 'How many passages before answering?' with the token name underneath — so a bot owner can configure retrieval without learning the vocabulary first.",
            "Six states are designed, not one. Loading, empty, error, AI service down, and no permission each say what is true and what the reader can still do — because a system assembled from other people's services spends real time in every one of them.",
            "Every number inside these screens is demo data from the design file, and is labelled as such. What is real here is the structure: how a bot is registered, configured, blocked and handed to the next person.",
          ],
        },
        caseFile: {
          causeList: {
            label: "Cause list",
            heading: "Three matters, one line each",
            note: "An operations console for AI services someone else keeps changing.",
          },
          heroExhibits: [
            { id: "A", src: "assets/work/bharat/laptop-studio.png", alt: "The recipe canvas in a laptop, with each pipeline step as a card and the configuration rail asking questions in plain language", caption: "Studio — the pipeline as steps, configured in plain language", clearance: "public", ratio: "1600 / 1002" },
            { id: "B", src: "assets/work/bharat/laptop-bots.png", alt: "The bot registry in a laptop, six services with channel, languages, environment and health in one row each", caption: "The registry — six services, and what each one is doing right now", clearance: "public", ratio: "1600 / 1002" },
            { id: "C", src: "assets/work/bharat/laptop-ai-down.png", alt: "The console with AI assistance unavailable, showing what still works while the service is degraded", caption: "AI service down — a designed state, not a broken one", clearance: "public", ratio: "1600 / 1002" },
          ],
          premise: {
            heading: "The premise",
            body: [
              "A department does not run a chatbot. It runs a fleet of them. This console covers six: an agricultural advisory in Odia on WhatsApp, a ration helpline on IVR, a scheme helpdesk in a PWA, and three more — each one assembled from an input adapter, a speech-to-text service, two translators, a retriever, a language model and an output adapter.",
              "Every one of those parts belongs to somebody else's release cycle. A model gets deprecated. A translator changes version. An org policy locks a node. The work of running the service is mostly absorbing those changes — and the person accountable is a bot owner inside a department, not the engineer who assembled the stack.",
              "So the console is built around a single idea: an upstream change is a decision someone has to make, and the interface should hold it open until they make it. My read is that this is the difference between an admin panel and an operations console — a panel tells you what happened, and a console tells you what it costs you and what you can do about it.",
            ],
            citation: {
              label: "WCAG 2.2, SC 1.4.3 Contrast (Minimum) — the console is built on shadcn/ui tokens and inherits its floors",
              href: "https://www.w3.org/TR/WCAG22/#contrast-minimum",
            },
            exhibits: [
              { id: "D", src: "assets/work/bharat/01-bots-default.png", alt: "The bot registry listing six services with a flagged banner explaining a language model deprecation and its consequences", caption: "The registry, with one service flagged for a decision", clearance: "public", ratio: "1800 / 1125" },
            ],
          },
          matters: [
            {
              no: "001",
              slug: "matter-001",
              title: "The registry — upstream change as a decision",
              state: "Designed",
              mode: "Designed",
              oneLine: "A deprecated model is shown as a decision, with what it costs and what still works.",
              context: [
                "Every row carries the things an owner is actually accountable for: channel, languages, environment, health, when it last deployed, and who owns it. The two rows that need something from a person are tinted and flagged, and the note under the table says the rule out loud — flagged rows stay flagged until someone decides, not until someone dismisses.",
                "The flag itself is written as a consequence rather than an alert. The model behind the agricultural advisory loses provider support on a date; the banner says how many questions a day run on it, in which language, for how many extension workers, what happens if nobody acts, and offers exactly three moves: review, compare on the test set, or snooze for thirty days.",
              ],
              decisions: [
                {
                  constraint: "A deprecation notice is information. The owner needs a decision, and the cost of not making one.",
                  options: [
                    "A toast when the deprecation lands",
                    "A badge on the row",
                    "An inline banner that states the consequence and offers the moves",
                  ],
                  chose: "An inline banner inside the row, naming the date, the daily volume, the language, the audience, and the fallback behaviour if the date passes with no decision.",
                  why: "The question 'should I care about this' has a factual answer, and the interface knows it. Making the reader open a detail page to find out is how these notices get ignored.",
                  cost: "It is a large object in a table, and only two rows can carry one before the registry stops being scannable. That ceiling is a design constraint the product has to live inside.",
                },
                {
                  constraint: "Dismissible alerts train people to dismiss.",
                  options: ["Dismissible with a reminder", "Snooze only", "Stays until a decision is recorded"],
                  chose: "The flag persists until someone chooses. Snooze is bounded at thirty days and says so on the button.",
                  why: "The state being tracked is 'has a person decided', which is not the same as 'has a person seen this'.",
                  cost: "A row can stay visually loud for weeks, and there is no path to acknowledge without acting. On a busy fleet that could read as nagging.",
                },
              ],
              rejected: [
                {
                  direction: "A separate alerts inbox for upstream changes",
                  whyNot: "It would be tidier and nobody would read it. The change belongs against the service it affects, in the table the owner already opens.",
                },
              ],
              exhibits: [
                { id: "E", src: "assets/work/bharat/03-empty.png", alt: "The registry with no bots yet, offering recipes to start from rather than an empty table", caption: "Empty — a starting point rather than an apology", clearance: "public", ratio: "1800 / 1125" },
              ],
            },
            {
              no: "002",
              slug: "matter-002",
              title: "Studio — the pipeline in the language of the work",
              state: "Designed",
              mode: "Designed",
              oneLine: "The rail asks what the step should do; the token name sits underneath it.",
              context: [
                "A bot is a chain: WhatsApp inbound, speech to text, translate to English, retrieve, answer, translate back to Odia, text to speech, WhatsApp outbound. The canvas shows that chain as cards with their provider and version on the face, so the thing you are looking at is the actual stack rather than a diagram of it.",
                "The configuration rail is where the argument is. Every control asks a question in the language of the work — 'What should it search with?', 'How many passages before answering?', 'Should it re-read what it found and put the best answer first?' — with the parameter name in mono underneath, so someone who does know the vocabulary is not slowed down and someone who does not is not blocked.",
              ],
              decisions: [
                {
                  constraint: "The people configuring retrieval are bot owners in departments. The vocabulary of the stack is a barrier to entry, not a feature.",
                  options: [
                    "Parameter names with tooltips",
                    "A simple mode and an advanced mode",
                    "Ask the question in plain language, show the parameter name beneath it",
                  ],
                  chose: "Question first, parameter second, both always visible.",
                  why: "A simple mode teaches nobody and a tooltip is a thing you have to know to look for. Showing both means the interface is also the documentation.",
                  cost: "Every control is taller, so fewer fit in the rail, and each question has to be written and translated rather than inherited from the library. Copy becomes a maintained artefact.",
                },
                {
                  constraint: "A recipe can be incomplete in ways that will only show up in production — no voice selected, no fallback, a model about to be retired.",
                  options: ["Validate on save", "Warn on deploy", "A standing list of what blocks this recipe"],
                  chose: "A 'Before this recipe can run' panel under the canvas, splitting blockers from warnings, each naming the node and offering the fix inline.",
                  why: "The blockers are known long before deploy. Holding them at the bottom of the canvas makes the gap between 'built' and 'runnable' visible while there is still time to close it.",
                  cost: "It occupies canvas height permanently, including when the list is empty, and it duplicates state that also appears on the node cards.",
                },
              ],
              rejected: [
                {
                  direction: "Drag-and-drop as the primary way to build a recipe",
                  whyNot: "The canvas states it plainly: tab moves between steps, Enter configures, Alt+N inserts. Dragging is never the only way, because a console used over a remote desktop on a department machine cannot depend on it.",
                },
              ],
              exhibits: [
                { id: "F", src: "assets/work/bharat/09-studio.png", alt: "The full recipe canvas with plugin library, node cards showing provider and version, and the plain-language configuration rail", caption: "Studio — the stack on the canvas, the questions in the rail", clearance: "public", ratio: "1800 / 1125" },
              ],
            },
            {
              no: "003",
              slug: "matter-003",
              title: "The states a fleet actually spends time in",
              state: "Designed",
              mode: "Designed",
              oneLine: "Loading, empty, error, degraded and no-permission, each written as a state.",
              context: [
                "A console stitched from other people's services is not usually in its happy state. The registry can be loading, empty, unreachable, or readable-but-degraded because the AI service is down; and the person opening it may not have rights to the half of it they can see.",
                "Each of those is designed rather than defaulted. The degraded state keeps the fleet readable and says which capabilities are gone. The permission state names what the reader cannot do and who can. The error state says the registry could not load, which is a different sentence from 'no bots'.",
              ],
              decisions: [
                {
                  constraint: "'Something went wrong' is not a state, it is an apology.",
                  options: ["A generic error card", "A retry button", "Name what failed, and what still works"],
                  chose: "Each non-happy state says what is true, what is still usable, and what the reader can do next.",
                  why: "The reader's next action is different in every case — retry, wait, ask for access, or carry on with the parts that work — so a single generic state serves none of them.",
                  cost: "Five extra states to design, write and keep true as the product changes, and each one is another thing that can drift out of date.",
                },
              ],
              rejected: [
                {
                  direction: "Treating 'AI service down' as an error",
                  whyNot: "It is not an error, it is a capability being absent. The console still lists the fleet, still shows health, and still lets an owner work — the only thing missing is the assistance.",
                },
              ],
              exhibits: [
                { id: "G", src: "assets/work/bharat/05-ai-down.png", alt: "The console with AI assistance unavailable, keeping the fleet readable while naming the capabilities that are gone", caption: "AI service down — degraded, still operable", clearance: "public", ratio: "1800 / 1125" },
                { id: "H", src: "assets/work/bharat/06-no-permission.png", alt: "The no-permission state naming what this reader cannot reach and who can grant it, instead of hiding the section", caption: "No permission — named, not hidden", clearance: "public", ratio: "1800 / 1125" },
                { id: "I", src: "assets/work/bharat/04-error.png", alt: "The registry failing to load, stating that the registry itself is unreachable rather than reporting zero bots", caption: "Error — the registry is unreachable, which is not the same as empty", clearance: "public", ratio: "1800 / 1125" },
              ],
            },
          ],
          differently: {
            heading: "What I'd do differently",
            items: [
              {
                title: "Write the questions before drawing the rail.",
                body: "The plain-language questions are the best thing in this design and they were written into a layout that already existed. Starting from the questions would have changed the rail's proportions, and probably its order.",
              },
              {
                title: "Design the fleet view for twenty bots, not six.",
                body: "The inline banner works because only two rows carry one. At department scale that assumption breaks, and the pattern needs a version that degrades into a queue.",
              },
              {
                title: "Put the demo data beyond doubt.",
                body: "The screens carry realistic figures and real-sounding officers. That is what makes a design review feel real, and exactly what makes a public case study risky. Obviously-synthetic data costs nothing at design time and saves this conversation later.",
              },
            ],
          },
          forward: {
            heading: "What I'm taking forward",
            items: [
              "Ask the question, then show the parameter. If the interface has to name a token, it can afford one line saying what the token does.",
              "An upstream change is a decision. Track whether a person decided, not whether a person looked.",
              "Design the degraded state early. On a system assembled from other people's services, it is not an edge case — it is a Tuesday.",
            ],
          },
        },
      },
    },

    {
      id: "11",
      title: "ABHA Patient App",
      category: "Product Design",
      year: "2025",
      status: "shipped",
      thumb: "assets/work/thumbs/abha.png",
      description: "A national health ID app where the hardest screen is not the health record — it is working out which member of the household is holding the phone.",
      tags: ["Gov Tech", "Health", "Identity", "Android"],
      color: "#fdf6ec",
      iconGradient: "linear-gradient(135deg,#c2410c,#ea8c4f)",
      accentColor: "#c2410c",
      detail: {
        role: "Product Designer · Research",
        challenge: "One phone serves a whole household, and ABHA accounts duplicate across the facilities that create them. So before the app can show anyone a health record, it has to answer a question no health app expects to be hard: whose record is this, and is the person holding the phone allowed to see it? Get that wrong and the failure is not a bad experience — it is one person's medical history shown to another.",
        outcome: "A patient app for India's ABDM covering four capabilities — multiple ABHA accounts on one device, nearby facilities, health records fetched from linked facilities, and a Scan &amp; Share flow that turns a QR into a queue token at the counter. Shipped, Hindi and English, deployed against a community health centre in Uttar Pradesh.",
        // NO INVENTED STATS. This case study's whole argument is a counted one —
        // 33 of 86 screens — so a fabricated adoption number sitting beside it
        // would undo the only thing that makes the argument trustworthy. The
        // real numbers are in §8 of the brief and are still open; until they
        // land, the counts below are recomputed from the exhibit manifest by
        // check:content rather than typed in by hand.
        stats: [
          { value: "86", label: "Screens in the file, across 9 sections" },
          { value: "38%", label: "Of them identity and access, not health" },
          { value: "7", label: "Screens for health records, the nominal purpose" },
        ],
        frames: [
          { type: "mobile", label: "Select Your Profile — two identical rows, no way to tell them apart" },
          { type: "mobile", label: "Home — four shortcuts, three carrying the same subtitle" },
          { type: "mobile", label: "Scan &amp; Share — QR at the counter to token in four screens" },
          { type: "mobile", label: "Health records — five lab states, two of them the same green" },
        ],
        recruiter: {
          role: "Product Designer · Research and design",
          timeline: "Shipped — dates to confirm",
          liveAt: "",
          domain: "Gov tech · Public health · ABDM",
          platform: "Android · 412×917 · Hindi and English",
          team: "Scope to confirm — Om did the research and the design; illustration ownership unconfirmed",
          problem: "A household shares one phone and ABHA accounts duplicate across facilities. The app has to establish identity before it can safely show a health record, and the failure mode is showing one person's records to another.",
          shipped: "A four-capability patient app — multiple ABHA accounts, nearby facilities, fetched health records, and a QR-to-token counter flow — deployed in Hindi and English.",
          owned: ["Patient research", "Information architecture", "Identity &amp; profile system", "Scan &amp; Share flow", "Health records", "Visual system"],
          bullets: [
            "The file argues its own thesis by its proportions. Of 86 screens, 33 — 38% — are identity and access: PIN setup, profile management, profile selection. Health Records, what the app is nominally for, is 7. That ratio is not bloat; it is the honest shape of a shared-device problem.",
            "The security PIN is not protecting against a stranger who steals the phone — the phone is already OTP-verified. It is protecting against the household. Saying that out loud is what turns 12 screens of apparent security boilerplate into a design position.",
            "The profile-merge screen cannot support the decision it asks for. Two rows read character-for-character identically — same name, same age, same gender — and those three fields are everything the screen shows. Merging is irreversible and there is no confirmation step before it.",
            "Research was with patients only, and the Scan &amp; Share flow ends at a registration clerk who was never studied. Half of that interaction is designed on assumption, and the case study says so rather than quietly showing the happy path.",
            "The app fetches records across facilities and ABDM governs that with consent artefacts. A notification tells the patient their details were shared with a hospital group — and there is no screen anywhere to review, scope or revoke it. That gap is the largest one in the file.",
          ],
        },
        caseFile: {
          causeList: {
            label: "Contents",
            heading: "Three chapters, one line each",
            note: "An identity system, a counter flow, and an audit of what shipped.",
          },
          heroExhibits: [
            { id: "A", src: "assets/work/abha/02-select-profile.png", alt: "Profile selection showing two character-identical rows for the same 16-year-old — same name, age and gender — with no facility, date or account suffix to tell them apart, above Merge Profiles and Next buttons of equal weight", caption: "The screen the argument rests on — a merge decision with nothing to decide on", clearance: "scrubbed", redactionNote: "the real-format mobile number in the subtext was painted over and replaced with an obviously fictional one", ratio: "824 / 1834" },
            { id: "B", src: "assets/work/abha/01-home.png", alt: "Home screen where three of the four shortcut cards carry the identical subtitle 'Get your ABHA Account' and the alert component still reads 'This is a Heading'", caption: "Home — placeholder copy in the primary navigation of a shipped app", clearance: "review", redactionNote: "shows a mock account holder name; facility naming still to be cleared", ratio: "824 / 1834" },
          ],
          premise: {
            heading: "The premise",
            body: [
              "An ABHA patient app under India's Ayushman Bharat Digital Mission. Four capabilities: hold multiple ABHA accounts on one phone, find nearby facilities, fetch health records from linked facilities, and generate a code to show the clerk at the counter instead of queueing to register.",
              "The expected case study writes itself — health records are the product, so the record screen is the hard part. The file says otherwise, and it says it in numbers rather than in adjectives. Of 86 screens across 9 sections, 33 are identity and access: 12 on PIN setup, 14 on profile, 7 on profile selection. Health Records is 7 screens. <strong>Thirty-eight per cent of the app is about establishing who is holding the phone.</strong>",
              "That ratio is the finding. One phone serves a household; ABHA accounts duplicate across the facilities that issue them; and the failure mode is not a dropped session but one person's medical history displayed to another. A designer who treated the identity layer as plumbing would have shipped something unsafe. The identity layer <em>is</em> the product.",
            ],
          },
          ledger: {
            heading: "Where I came in",
            body: [
              "Research and design both, which is rarer than it sounds and worth stating plainly rather than implying. The rows below are scope, not credit.",
              "One boundary matters more than the others and is stated in the audit chapter too: research was conducted with <strong>patients only</strong>. The Scan &amp; Share flow ends at a registration clerk who receives the code and issues a token. That half of the interaction is designed on assumption.",
            ],
            columns: ["Surface", "Mode", "Scope"],
            rows: [
              { matter: "Patient research", mode: "Designed", scope: "Patients only — sample, method and duration to confirm" },
              { matter: "Information architecture", mode: "Designed", scope: "9 sections, 86 screens" },
              { matter: "Identity &amp; profile system", mode: "Designed", scope: "Multiple ABHA accounts, selection, merge, PIN" },
              { matter: "Scan &amp; Share flow", mode: "Designed", scope: "QR, facility confirmation, token" },
              { matter: "Health records", mode: "Designed", scope: "Five lab states, filters, detailed report" },
              { matter: "Visual system", mode: "Contributed", scope: "67 components at 642 instances — illustration ownership to confirm" },
            ],
            modeKey: [
              ["Designed", "owned end to end"],
              ["Contributed", "owned a defined slice inside someone else's scope"],
              ["Audited", "evaluated existing work"],
              ["Proposed", "recommended; not adopted, or not yet"],
            ],
          },
          matters: [
            {
              no: "001",
              slug: "matter-001",
              title: "The identity layer",
              state: "Shipped",
              mode: "Designed",
              oneLine: "Thirty-eight per cent of the app exists to answer who is holding the phone.",
              context: [
                "A household shares a device. ABHA accounts duplicate because each facility that registers a patient can create one. So the app carries a profile switcher, a profile selection screen, a merge flow, and a 12-screen PIN section — and the case study's job is to explain why that is correct rather than apologise for it.",
                "The PIN is the clearest example. The phone is already verified by OTP, so a second factor looks like security boilerplate. It is not. The PIN is not protecting the account from a stranger who steals the handset; it is protecting one household member's records from another. Once that is said, twelve screens stop looking excessive.",
              ],
              goals: [
                "Make the active profile unmissable at the moment records are displayed.",
                "Let a person resolve duplicate accounts without needing support.",
                "Protect a dependent's records inside an adult's app.",
              ],
              decisions: [
                {
                  constraint: "One phone, several ABHA accounts, and duplicates arriving from different facilities. The person has to be able to tell two profiles apart before deciding they are the same person.",
                  options: [
                    "Auto-merge on a name, age and gender match",
                    "Never merge — let duplicates accumulate",
                    "Patient-initiated merge from a selection screen",
                  ],
                  chose: "Patient-initiated merge, prompted from the profile selection screen with the instruction 'Select 2 or More Profiles to Merge.'",
                  why: "Auto-merging on name, age and gender would combine two real people who happen to match — a same-name mother and daughter, or two Deepikas at one address. Leaving duplicates alone pushes the problem to the counter, which is where the app is trying to save time.",
                  cost: "The decision is handed to the person least equipped to make it, on a screen that gives them nothing to make it with — see the finding below. And merge is irreversible.",
                },
                {
                  constraint: "The phone is already OTP-verified, so any additional factor has to justify twelve screens of setup, change and recovery.",
                  options: [
                    "No PIN — rely on phone possession",
                    "Biometric only",
                    "A PIN owned by the account holder",
                  ],
                  chose: "A security PIN on top of the phone OTP.",
                  why: "The threat model is not theft. It is the household. Phone possession authenticates the device, not the person, and on a shared device those are different questions.",
                  cost: "A PIN is one more thing to forget, which is why forgot-PIN recovery is part of the twelve screens rather than an afterthought — and recovery on a shared phone is exactly where the protection can leak.",
                },
              ],
              rejected: [
                {
                  what: "A single merged household view — one list of everyone's records with a person filter on top.",
                  whyNot: "It reads well on a design file and fails the actual threat model. The whole point of the identity layer is that one member's records must not be casually visible to another; a shared list with a filter makes exposure the default state and privacy an action.",
                },
                {
                  what: "Biometric unlock instead of a PIN.",
                  whyNot: "Fingerprint hardware is uneven on the devices this audience actually owns, and a fingerprint on a shared phone is enrolled by whoever set it up — usually the account holder. It would have protected the household boundary less well than the thing it replaced.",
                },
              ],
              exhibits: [
                { id: "A", src: "assets/work/abha/02-select-profile.png", alt: "Profile selection showing two character-identical rows for the same 16-year-old with no facility, date or account suffix to distinguish them", caption: "Two rows. Same name, same age, same gender. Nothing else is shown.", clearance: "scrubbed", redactionNote: "real-format mobile number painted over and replaced with a fictional one", ratio: "824 / 1834" },
                { id: "B", src: "assets/work/abha/03-merged-confirmation.png", alt: "A dialog reading Successfully Merged — the only merge confirmation in the file, shown after the irreversible action rather than before it", caption: "The only confirmation in the merge flow arrives after the fact.", clearance: "public", ratio: "382 / 286" },
              ],
            },
            {
              no: "002",
              slug: "matter-002",
              title: "Scan &amp; Share",
              state: "Shipped",
              mode: "Designed",
              oneLine: "Four screens replacing a registration queue — and one of them is designed blind.",
              context: [
                "The patient scans a QR at the facility, confirms which clinic they are at, and receives a token to show at the counter. Four screens replacing a queue is a real result, and shortness is the claim the flow makes.",
                "It is also where the research boundary bites. The flow ends at a registration clerk who receives the code and issues the token, and research was with patients only. The counter half is designed on assumption — which is a reasonable thing to have done under the constraint, and an unreasonable thing to leave unsaid.",
              ],
              goals: [
                "Get a patient from arrival to a queue position without joining the registration line.",
                "Make the token legible across a counter, at arm's length, on a low-end screen.",
                "Fail safely when the counter cannot or will not cooperate.",
              ],
              decisions: [
                {
                  constraint: "The patient has to hand something to a clerk, and the clerk has their own system, their own screen, and no reason to trust an unfamiliar app.",
                  options: [
                    "Show the full ABHA number",
                    "Show a QR for the clerk to scan",
                    "Issue a short numeric token",
                  ],
                  chose: "A short numeric token, set large — 120 at the top of the confirmation card.",
                  why: "A number can be read aloud, written on a paper slip, and typed into whatever the counter already runs. A QR needs the counter to have a scanner and the will to use it.",
                  cost: "A three-digit token carries no identity, so it only works if the counter's own system is holding the other half of the mapping — and that system was never studied.",
                },
              ],
              rejected: [
                {
                  what: "Showing the full ABHA number at the counter for the clerk to key in.",
                  whyNot: "It is a permanent health identifier being read aloud across a public counter. A disposable token exposes nothing if it is overheard, and the number was never the thing the counter needed.",
                },
                {
                  what: "A patient-side appointment booking step before arrival.",
                  whyNot: "It assumes the facility publishes slots and honours them. At a CHC the queue is the scheduling system, and designing around a booking model the counter does not run would have produced a flow that breaks on its first real morning.",
                },
              ],
              exhibits: [
                { id: "C", src: "assets/work/abha/04-qr-scan.png", alt: "Scan and Share step one — the camera view for scanning a facility QR code", caption: "Step 1 — QR at the counter", clearance: "public", ratio: "412 / 917" },
                { id: "D", src: "assets/work/abha/05-token-generated.png", alt: "Token confirmation showing the number 120 set large under the facility name, with an empty image placeholder where the facility photo should be and a low-contrast outlined Done button", caption: "Step 3 — token 120. The number is right; the empty image slot and the outlined Done are not.", clearance: "review", redactionNote: "names a real community health centre — pending clearance to show the facility by name", ratio: "412 / 917" },
              ],
            },
            {
              no: "003",
              slug: "matter-003",
              title: "Reading my own shipped file",
              state: "Audit",
              mode: "Audited",
              oneLine: "Eight findings in work I designed, ranked by what they cost the person using it.",
              context: [
                "This chapter audits the file I made. Every finding below was verified in the file rather than recalled, and each is stated as what it costs the reader of the screen, not as a rule it breaks.",
                "It belongs in the case study for the same reason the 38% count does: a portfolio that only shows the intended design is asking to be taken on trust. One that shows what shipped and what it got wrong is making a checkable claim.",
              ],
              goals: [
                "Separate the placeholder copy from the structural problems.",
                "Name the one gap that is about governance rather than craft.",
                "Say which findings are still live, rather than implying all were fixed.",
              ],
              decisions: [
                {
                  constraint: "The app fetches records across facilities, and ABDM is built on consent artefacts. A notification tells the patient that a doctor shared their details with a hospital group to discuss their treatment.",
                  options: [
                    "Leave consent to the ABDM gateway and stay silent in-app",
                    "A one-off consent prompt at registration",
                    "A consent ledger the patient can review, scope and revoke",
                  ],
                  chose: "Nothing — and that is the finding. The notification exists; the surface behind it does not.",
                  why: "This is the largest gap in the file. A notification announcing that data was shared is an event in a ledger that has no ledger. The patient is told, and cannot act.",
                  cost: "Designing it properly means a scope model — which facility, which records, for how long — and that is a product decision, not a screen. Naming the gap is worth more here than sketching a surface that hides its difficulty.",
                },
              ],
              rejected: [
                {
                  what: "Listing the file-hygiene numbers — auto-named layers, hidden layers, duplicated frames — as audit findings.",
                  whyNot: "They are working-file realities, not things a patient ever experiences. Ranking them beside a missing consent surface would flatten the difference between untidy and unsafe, and reads as self-flagellation rather than judgement.",
                },
                {
                  what: "Designing the consent screen and showing it as the fix.",
                  whyNot: "A screen would imply the hard part is solved. Consent scope — which facility, which records, for how long, revocable by whom — is a product decision, and a confident-looking mockup over an unanswered question is exactly the move this case study argues against.",
                },
              ],
              exhibits: [
                { id: "E", src: "assets/work/abha/06-health-records.png", alt: "Health records list showing five lab states where Report Ready and Provisional Report Ready are rendered in the same green, and every row repeats the same report ID and timestamp", caption: "Five lab states — real domain understanding, and two clinically different ones sharing a colour.", clearance: "review", redactionNote: "a named mock patient beside a named real facility and a diagnosis — pending clearance", ratio: "412 / 917" },
                { id: "F", src: "assets/work/abha/07-language-selection.png", alt: "Language selection offering Hindi and English inside the onboarding flow, before registration rather than buried in settings", caption: "Hindi as a first-class onboarding choice, not a settings afterthought.", clearance: "public", ratio: "412 / 917" },
              ],
            },
          ],
          // Verified against the Figma file rather than recalled. Anything the
          // build brief asserted that the file did not support was dropped —
          // see the note in CLEARANCE.md.
          findings: {
            heading: "The audit",
            note: "Each verified in the file. Status — fixed, live or deliberate — is still open for every row.",
            columns: ["#", "Finding", "Why it costs this audience"],
            rows: [
              ["1", "Three of the four home shortcuts carry the identical subtitle “Get your ABHA Account” — My ABHA, My Health Records and Scan &amp; Share. Nearby Facilities has none.", "The subtitle is doing the explaining for a low-literacy audience, and it explains nothing three times out of four."],
              ["2", "The alert component on the home screen still reads “This is a Heading / This is a detailed subtext regarding the alert.”", "Placeholder copy on the most prominent surface above the fold."],
              ["3", "The third tab of the bottom navigation changes identity between screens — “Doctor View” on home and health records, “My ABHA” on the token screen. No Doctor View screen exists in the file.", "Not a dead link but an unstable navigation bar, which is a more serious class of problem: the persistent element is the one a person is meant to be able to trust."],
              ["4", "Health Records and Facilities appear in both the bottom navigation and the shortcut grid, under different labels each time — “My Health Records” against “Health Records”.", "Two names for one destination is expensive for this audience specifically."],
              ["5", "Merging is irreversible and there is no confirmation step. The flow goes from two indistinguishable rows straight to a “Successfully Merged!” dialog.", "The only dialog in the flow arrives after the act it should have guarded."],
              ["6", "A notification reads “Dr. Alexander shared your details in the hospital's group to discuss your recent treatment” — a consent event with no consent surface behind it.", "ABDM runs on consent artefacts. The patient is informed and given nowhere to review, scope or revoke."],
              ["7", "“Report Ready” and “Provisional Report Ready” are rendered in the same green.", "Two clinically different things share a colour, and a patient acting on a provisional result is a real risk. Status is paired with text elsewhere, so the colour-alone test does pass."],
              ["8", "The Terms and Conditions checkbox on the registration screen is drawn pre-ticked.", "Pre-ticked consent is not consent, and this is the screen where the consent relationship starts."],
            ],
          },
          worked: {
            heading: "What worked",
            items: [
              "67 components at 642 instances. That is real system discipline for a file this size, and it is why the screens are consistent even where the copy is not.",
              "The illustration set is warm, specific to the setting, and not generic stock — a rural clinic scene with people who look like the people using it.",
              "Hindi is a first-class choice in the onboarding flow, before registration, rather than a setting to be found later.",
              "Five lab states — sample collected, in progress, provisional report ready, report ready, sample rejected. Most consumer health apps model two. That is domain understanding.",
              "The token number is set large and legible, which is exactly right for something read across a counter.",
            ],
          },
          personas: {
            heading: "Who this is for",
            // BLOCKING: every persona below is scaffolding, not research. Om did
            // patient research and his findings replace these. check:content
            // fails while any persona carries source: 'placeholder' — a portfolio
            // presenting invented personas as findings fails at the interview.
            // Hidden until the real research replaces these. The "Not research"
            // banner is gone, so this flag is now the only thing standing
            // between four invented personas and a reader who takes them for
            // findings — check:content fails if they are made visible while
            // still marked placeholder.
            hidden: true,
            placeholder: true,
            note: "Placeholder — synthesised from the file's mock data and deployment context so the case study could be built before the real research landed. These are not findings.",
            items: [
              { name: "Ramesh, 44 — the account holder", source: "placeholder", body: "Owns the phone. Registered ABHA for himself, his wife, his mother and his daughter. Reads Hindi comfortably, English haltingly. Cannot always remember which profile is active. <em>Design pressure:</em> profile switching must be unmissable at the moment records are displayed." },
              { name: "Deepika, 16 — the dependent", source: "placeholder", body: "Taken from the file's own mock data, where she appears 21 times. Has health records, owns no device, and has no control over who sees them. <em>Design pressure:</em> a minor's records inside an adult's app is a consent question the interface has to answer rather than dodge." },
              { name: "Kamla, 67 — the heavy user", source: "placeholder", body: "Highest healthcare need, lowest digital confidence. At the counter she hands the phone to whoever is nearest. <em>Design pressure:</em> Scan &amp; Share has to survive being operated by a stranger without exposing the record set." },
              { name: "Suresh, 52 — who this is not for", source: "placeholder", body: "Has a paper OPD card and a working relationship with the CHC clerk. For him the app adds a step. <em>Design pressure:</em> naming who a product is not for is the cheapest credibility a case study can buy." },
            ],
          },
          differently: {
            heading: "What I'd do differently",
            items: [
              {
                title: "Study the counter.",
                body: "Research was with patients, and the Scan &amp; Share flow ends at a registration clerk. The flow only works if the counter cooperates, and I did not study the counter. Everything past the token — whether the clerk recognises it, what happens when the facility is not on ABDM, what happens when there is no network at the desk — is designed on assumption.",
              },
              {
                title: "Give the merge screen something to decide with.",
                body: "Name, age and gender are all the screen shows, and all three match. To merge safely a person needs which facility created each profile, when, the last record attached, and the account number suffix. None of it is present, and the action it gates cannot be undone.",
              },
              {
                title: "Design the consent surface, not just the notification.",
                body: "The app tells a patient their details were shared and offers nowhere to act on it. That is the gap I would close first, and it is a product decision about scope and duration before it is a screen.",
              },
              {
                title: "Put the demo data beyond doubt.",
                body: "Four different mock identities across one file, a real-format phone number on the profile screen, and every record row repeating the same ID and timestamp. Obviously-synthetic, internally consistent data costs nothing at design time and saves this exact conversation later.",
              },
            ],
          },
          forward: {
            heading: "What I'm taking forward",
            items: [
              "Count the file before describing it. The 38% split was not an intuition — it came from tallying sections, and it turned out to be the whole argument.",
              "When a second factor looks like boilerplate, check the threat model. A PIN over an OTP is redundant against a thief and essential against a household.",
              "An irreversible action deserves a screen before it, not a dialog after it.",
              "If you did not research the other side of an interaction, say which side. It is worth more than an extra screen showing the happy path.",
            ],
          },
        },
      },
    },
  ],
};
