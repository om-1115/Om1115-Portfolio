-- ─── Add LabSaarthi project ──────────────────────────────────────────────────
-- Run in Supabase SQL Editor. Content sourced from iqline.co.in/products/lims.

insert into projects (id, status, title, category, year, description, tags, color, icon_gradient, accent_color, detail, sort_order) values
(
  '06', 'shipped', 'LabSaarthi', 'Product Design', '2025',
  'Cloud-native, ABDM-compliant LIMS unifying the entire laboratory lifecycle — from first registration to final smart report — with barcode-driven, zero-error automation.',
  '["Health Tech", "LIMS", "B2B SaaS"]',
  '#e6efed',
  'linear-gradient(135deg,#0d9488,#06b6d4)',
  '#0d9488',
  $${
    "role": "Product Designer",
    "challenge": "Diagnostic labs juggle thousands of samples a day across collection, processing, and reporting. Samples got lost in the noise of busy queues, results were transcribed by hand from analysers, turnaround times stretched into hours, and NABL audits meant reconstructing paper trails. Fragmented tools made zero-error operation impossible — a patient, a sample, and a report should never live in three different systems.",
    "outcome": "A cloud-native, ABDM-compliant LIMS that unifies the lab lifecycle for everyone from single diagnostic centres to distributed national networks. Barcode-first chain-of-custody makes zero-loss the default — no scan, no move. Analyser results flow in with zero manual transcription, smart reports generate the moment a test is validated, and a built-in QMS keeps labs NABL audit-ready every single day.",
    "stats": [
      {"value": "0",    "label": "Lost samples — no scan, no move"},
      {"value": "6",    "label": "Modules — registration to smart report"},
      {"value": "NABL", "label": "Audit-ready QMS, built in"}
    ],
    "frames": [
      {"type": "desktop", "label": "Sample journey — barcode chain-of-custody"},
      {"type": "desktop", "label": "Smart report — validated results, auto-formatted"},
      {"type": "desktop", "label": "QC dashboard — LJ charts & calibration logs"}
    ],
    "recruiter": {
      "timeline": "2025 · In production",
      "liveAt": "https://iqline.co.in/products/lims",
      "domain": "Health tech · Diagnostics · B2B SaaS",
      "platform": "Web app · Cloud-native",
      "team": "Product · Engineering · Healthcare domain experts",
      "problem": "Busy labs lose samples in manual handoffs, transcribe analyser results by hand, and scramble through paper logs to stay audit-ready. Precision is the lifeblood of diagnostics — fragmented systems bleed it away.",
      "shipped": "An ABDM-compliant LIMS with barcode-first chain-of-custody, zero-touch analyser integration, smart automated reporting, and an audit-ready QMS with real-time QC, calibration logs, and LJ charts.",
      "owned": ["UX strategy", "Workflows", "IA", "Wireframing", "Visual design", "Design system", "Prototyping", "Dev handoff"],
      "bullets": [
        "Barcode-driven sample traceability. Total visibility from collection to report with a digital chain-of-custody — no scan means no move, so no sample is ever lost in the noise of a busy lab.",
        "Smart automated reporting. Auto-formatted, standardised diagnostic reports generated the moment a test is validated — backed by a configurable rule engine for automated validations and high-precision approvals.",
        "Zero-touch machine integration (LIS-LIMS). Results flow from lab analysers straight into the LIMS with no manual transcription — real-time data capture that cuts entry errors and accelerates processing.",
        "Audit-ready QMS. Built-in NABL readiness with real-time QC tracking, calibration logs, and Levey-Jennings charts — every action timestamped, user-attributed, and immutable.",
        "Advanced inventory control. FEFO (first-expired, first-out) logic and predictive alerts prevent critical reagent stock-outs before they ever reach a patient."
      ]
    }
  }$$::jsonb,
  6
)
on conflict (id) do update set
  status        = excluded.status,
  title         = excluded.title,
  category      = excluded.category,
  year          = excluded.year,
  description   = excluded.description,
  tags          = excluded.tags,
  color         = excluded.color,
  icon_gradient = excluded.icon_gradient,
  accent_color  = excluded.accent_color,
  detail        = excluded.detail,
  sort_order    = excluded.sort_order;
