-- ─── Seed Data ───────────────────────────────────────────────────────────────
-- Run after schema.sql

-- Projects
insert into projects (id, status, title, category, year, description, tags, color, icon_gradient, accent_color, detail, sort_order) values
(
  '01', 'shipped', 'Dashboard Redesign', 'Product Design', '2025',
  'Simplified a complex analytics dashboard — reduced cognitive load by 40% through progressive disclosure and a tighter information hierarchy.',
  '["UX", "Data Viz", "Design Systems"]',
  '#f0ede8',
  'linear-gradient(135deg,#3a7bd5,#00d2ff)',
  '#3a7bd5',
  $${
    "role": "Lead Product Designer",
    "challenge": "The existing dashboard showed 40+ metrics simultaneously with no hierarchy. Users were making decisions from the wrong data because everything looked equally important — there was no signal, only noise.",
    "outcome": "A phased dashboard that surfaces the 3 most critical KPIs upfront, with progressive drill-down to secondary metrics. Shipped in Q2 2025 to 2,000+ daily active users.",
    "stats": [
      {"value": "40%", "label": "Cognitive load reduced"},
      {"value": "3×",  "label": "Faster decision time"},
      {"value": "94%", "label": "User satisfaction"}
    ],
    "frames": [
      {"type": "desktop", "label": "Overview — primary KPIs"},
      {"type": "desktop", "label": "Drill-down — metrics detail"},
      {"type": "mobile",  "label": "Mobile companion view"}
    ],
    "recruiter": {
      "timeline": "2025 · Q2 launch",
      "liveAt": null,
      "domain": "Analytics · B2B SaaS · Data visualization",
      "platform": "Web app",
      "team": "Solo designer · 8 engineers · 1 PM",
      "problem": "The existing dashboard showed 40+ metrics simultaneously with no hierarchy. Users were making decisions from the wrong data because everything looked equally important.",
      "shipped": "A phased dashboard surfacing the 3 most critical KPIs upfront, with progressive drill-down. Shipped to 2,000+ daily active users in Q2 2025.",
      "owned": ["UX strategy", "Research", "IA", "Flows", "Wireframing", "Visual design", "Prototyping", "Dev handoff"],
      "bullets": [
        "Lead Product Designer on a B2B analytics dashboard used by 2,000+ daily active users.",
        "Reduced cognitive load by 40% through restructured information hierarchy and progressive disclosure.",
        "Designed a phased KPI system surfacing signal over noise — 3 critical metrics shown upfront.",
        "Cut decision-making time by 3× through clearer data presentation and contextual drill-downs.",
        "Shipped Q2 2025 with 94% user satisfaction post-launch."
      ]
    }
  }$$::jsonb,
  1
),
(
  '02', 'shipped', 'Component Library', 'Design Systems', '2025',
  'Built a shared component library spanning 60+ components across web and mobile, used by a team of 12 engineers.',
  '["Figma", "Tokens", "Documentation"]',
  '#e8edf0',
  'linear-gradient(135deg,#7f53ac,#647dee)',
  '#7f53ac',
  $${
    "role": "Design Systems Lead",
    "challenge": "The product had grown across 4 separate surfaces with no shared language. Every new feature required re-solving solved problems, and visual inconsistency was eroding user trust.",
    "outcome": "A single source of truth — 60+ components, design tokens, and written usage guidelines — that cut new feature design time from days to hours.",
    "stats": [
      {"value": "60+", "label": "Components documented"},
      {"value": "12",  "label": "Engineers onboarded"},
      {"value": "70%", "label": "Faster feature design"}
    ],
    "frames": [
      {"type": "wide",    "label": "Token system overview"},
      {"type": "desktop", "label": "Component documentation page"},
      {"type": "mobile",  "label": "Mobile component variants"}
    ],
    "recruiter": {
      "timeline": "2025 · Ongoing",
      "liveAt": null,
      "domain": "Design Systems · Multi-surface product",
      "platform": "Web app · Mobile app",
      "team": "Solo designer · 12 engineers",
      "problem": "The product had grown across 4 separate surfaces with no shared language. Every new feature required re-solving solved problems — visual inconsistency was eroding user trust.",
      "shipped": "A single source of truth — 60+ components, design tokens, and written usage guidelines that cut new feature design time from days to hours.",
      "owned": ["Design systems", "Design tokens", "Component architecture", "Documentation", "Figma", "Engineer onboarding"],
      "bullets": [
        "Design Systems Lead, building a shared component library for a team of 12 engineers.",
        "60+ components documented with design tokens and written usage guidelines.",
        "Reduced new feature design time by 70% through standardised, reusable patterns.",
        "Eliminated visual inconsistency across 4 product surfaces with a single source of truth.",
        "Onboarded the full engineering team in under a week using structured documentation."
      ]
    }
  }$$::jsonb,
  2
),
(
  '03', 'shipped', 'Onboarding Flow', 'UX / Product', '2024',
  'Redesigned a 12-step onboarding into a conversational 4-step flow. Increased activation rate from 31% to 67%.',
  '["UX Research", "Prototyping", "A/B Testing"]',
  '#ede8f0',
  'linear-gradient(135deg,#f7971e,#ffd200)',
  '#f7971e',
  $${
    "role": "UX Designer",
    "challenge": "A 12-step onboarding was losing 69% of new users before they reached their first value moment. Exit interviews revealed confusion about what the product actually did.",
    "outcome": "Conversational 4-step flow that front-loads value and defers non-critical setup. Activation rate more than doubled from 31% to 67% in the first 30 days post-launch.",
    "stats": [
      {"value": "67%", "label": "Activation rate (was 31%)"},
      {"value": "4",   "label": "Steps (was 12)"},
      {"value": "2.1×","label": "Increase in day-7 retention"}
    ],
    "frames": [
      {"type": "mobile",  "label": "Welcome — step 1 of 4"},
      {"type": "mobile",  "label": "Goal setting — step 2 of 4"},
      {"type": "desktop", "label": "First value moment"}
    ],
    "recruiter": {
      "timeline": "2024 · 30 days post-launch",
      "liveAt": null,
      "domain": "Growth · Onboarding · SaaS activation",
      "platform": "Web app · Mobile",
      "team": "Solo designer · 2 engineers · 1 PM",
      "problem": "A 12-step onboarding was losing 69% of new users before they reached their first value moment. Exit interviews revealed confusion about what the product actually did.",
      "shipped": "A conversational 4-step flow front-loading value and deferring non-critical setup — activation rate doubled from 31% to 67% in the first 30 days.",
      "owned": ["UX research", "User interviews", "Flows", "Wireframing", "Prototyping", "A/B testing", "Dev handoff"],
      "bullets": [
        "UX Designer on a SaaS onboarding redesign that doubled the activation rate.",
        "Conducted exit interviews to identify where and why 69% of new users dropped off.",
        "Redesigned a 12-step onboarding into a conversational 4-step flow that front-loads value.",
        "Activation rate increased from 31% to 67% in the first 30 days post-launch.",
        "Day-7 retention improved 2.1× as users reached their first value moment faster."
      ]
    }
  }$$::jsonb,
  3
),
(
  '04', 'shipped', 'Brand Identity', 'Visual Design', '2024',
  'Created a cohesive visual identity for an edtech startup — logo, typography, color, and motion language.',
  '["Branding", "Motion", "Typography"]',
  '#e8f0ec',
  'linear-gradient(135deg,#11998e,#38ef7d)',
  '#11998e',
  $${
    "role": "Visual Designer",
    "challenge": "An early-stage edtech startup had strong product ideas but no visual language to match. Their pitch deck used 5 different fonts and every screen felt like a different product.",
    "outcome": "A complete identity system: wordmark, type scale, color palette, illustration style, and motion principles — all documented for handoff to an in-house team.",
    "stats": [
      {"value": "1",  "label": "Cohesive design language"},
      {"value": "3",  "label": "Weeks from brief to delivery"},
      {"value": "5×", "label": "Increase in brand mentions"}
    ],
    "frames": [
      {"type": "wide",    "label": "Brand board — color & type"},
      {"type": "desktop", "label": "Marketing landing page"},
      {"type": "mobile",  "label": "App icon & splash screen"}
    ],
    "recruiter": {
      "timeline": "2024 · 3-week sprint",
      "liveAt": null,
      "domain": "Brand Identity · EdTech · Visual design",
      "platform": "Marketing site · App · Pitch deck",
      "team": "Solo designer · CEO · 1 engineer",
      "problem": "An early-stage edtech startup had strong product ideas but no visual language. Their pitch deck used 5 different fonts and every screen felt like a different product.",
      "shipped": "A complete identity system — wordmark, type scale, color palette, illustration style, and motion principles — all documented for handoff to an in-house team.",
      "owned": ["Brand strategy", "Logo design", "Typography", "Color system", "Motion principles", "Documentation"],
      "bullets": [
        "Visual Designer on a full brand identity system for an early-stage edtech startup.",
        "Delivered wordmark, type scale, color palette, illustration style, and motion principles in 3 weeks.",
        "Resolved visual inconsistency across 5 mismatched fonts and disjointed screens.",
        "Documented the entire system for handoff — zero dependency on me post-delivery.",
        "Brand mentions increased 5× in the 3 months following launch."
      ]
    }
  }$$::jsonb,
  4
),
(
  '05', 'coming-soon', 'AI Design Toolkit', 'Product Design', '2025',
  'A design system extension for AI-generated UI — bridging LLM output with consistent, accessible components.',
  '["AI", "Design Systems", "Research"]',
  '#e8eaf0',
  null,
  '#6366f1',
  null,
  5
);

-- Experience
insert into experience (role, company, url, period, location, tags, logo_gradient, logo_id, logo_url, points, sort_order) values
(
  'Senior UX Designer', 'ConveGenius.AI', 'https://convegenius.com/', 'Sep 2025 — Present', 'Noida',
  '["EdTech", "AI", "Design Systems"]',
  'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
  'convegenius', null,
  '["Increasing user experience, enhancing usability and optimizing workflows of tech-based solutions for optimum educational impact.", "Leading the development and implementation of a token-based design system, improving consistency and scalability across multiple platforms."]',
  1
),
(
  'Associate UX Designer', 'Samagra', 'https://samagragovernance.in/', 'Jan 2023 — Aug 2025', 'New Delhi',
  '["GovTech", "Research", "Product"]',
  'linear-gradient(135deg,#ea580c 0%,#f59e0b 100%)',
  'samagra', 'https://samagragovernance.in/static/Samagra_Logo_updated-f59ec74c713638ada10b837a71238eaa.svg',
  '["Multiple product and design thinking along with on-ground research resulting in accelerated usage of app and website.", "Worked on improving user interfaces for high-stake civic platforms including Kumbh Sah''AIyak and Bharat Sah''AIyak (now part of Krutrim-OLA).", "Implemented user and stakeholder feedback, reworked friction points, and consequently improved user experience across products."]',
  2
),
(
  'UX Designer', 'IQ-Line', 'https://iqline.co.in/', 'Apr 2025 — Sep 2025', 'New Delhi · Part-Time',
  '["Healthcare", "LIMS", "B2B"]',
  'linear-gradient(135deg,#0891b2 0%,#0d9488 100%)',
  'iqline', null,
  '["Led the development and implementation of a token-based design system, improving consistency and scalability across multiple platforms.", "Led the UI redesign for a LIMS, enhancing usability and optimizing workflows for healthcare professionals.", "Designed and developed the user interface for a new blood sample transfer system, improving the tracking and management of critical medical samples.", "Coordinated with healthcare professionals to gather insights and define requirements, ensuring alignment with medical standards and user needs."]',
  3
);

-- Testimonials
insert into testimonials (quote, name, role, company, initials, sort_order) values
('Om''s designs are always clear and easy to implement. We rarely had to go back and forth, which made development significantly smoother.', 'Arjun Mehta', 'Frontend Engineer', 'ConveGenius.AI', 'AM', 1),
('Working with Om felt seamless. He thinks in systems — every decision he made scaled well across the product and saved us rework down the line.', 'Priya Nair', 'Product Manager', 'Samagra', 'PN', 2),
('Om approaches design with strong strategic thinking and a clear sense of direction. His instinct for what users actually need is sharp.', 'Rahul Verma', 'Engineering Lead', 'IQ-Line', 'RV', 3),
('The token system Om built for us became the foundation every team now works from. It''s one of those rare pieces of work that keeps giving.', 'Sneha Kulkarni', 'Design Lead', 'Samagra', 'SK', 4),
('Om is the kind of designer who makes engineers feel heard. He cares about feasibility as much as aesthetics — genuinely great to work with.', 'Dev Sharma', 'Full-Stack Developer', 'ConveGenius.AI', 'DS', 5);
