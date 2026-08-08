# CLEARANCE — HPC case study

Per BRIEF §3 C5. This is ConveGenius work on a government-facing programme in a
partner state, so publishing needs internal sign-off. Nothing in the right-hand
column is a legal opinion — it is a list of what to put in front of Brand & Comms
and the programme lead before the page goes public.

Status values: `pending` · `cleared` · `refused` · `not needed`.

| # | Item | Why it needs sign-off | Owner | Status |
|---|------|----------------------|-------|--------|
| 1 | Naming **Himachal Pradesh** as the field state | Identifies a partner state in a case study that critiques a scoring model. Generalising to "a north Indian hill state" is the fallback if refused — but it costs the 3,000-single-teacher-schools argument its specificity. | Programme lead | pending |
| 2 | Naming **districts, blocks or schools** visited | Narrows toward identifiable schools and teachers. Default: omit entirely; report counts only. | Programme lead | pending |
| 3 | Quoting or paraphrasing the **HPC concept note** (§ numbers, scoring rules, KPI list) | Internal document. The whole arithmetic chapter rests on it. Ask whether the scoring model may be described as published, or must be described generically. | Programme lead | pending |
| 4 | Screenshots of the **Excel entry sheet / bot flows** | Internal tooling, may carry school names, IDs, formulas. Must be redacted or redrawn with synthetic data. | Programme lead + Brand | pending |
| 5 | Screenshots of the **state dashboard** | Shows real school/district figures and the KPI set. Redraw with synthetic data unless explicitly cleared. | Programme lead | pending |
| 6 | Any **filled HPC card or register page** | Child-level data. Redaction is not optional (C2), and clearance is separate from redaction. | Programme lead | pending |
| 7 | **Photographs from the field** — classrooms, teachers, work samples | C2 governs what may be shown; clearance governs whether it may be published at all. Teacher consent needed separately, per person. | Programme lead | pending |
| 8 | **Teacher quotes**, even anonymised | Consent at the time of interview is not the same as consent to publish on a personal portfolio. | Om (consent record) | pending |
| 9 | Attributing the **scoring-model findings** | The arithmetic reads as critique of a document ConveGenius produced or co-produced. Framing must be agreed: self-critique of joint work, or design audit. §15 Q12 decides this. | Programme lead | pending |
| 10 | Any figure **attributed to the state or the programme** — coverage, submission %, adoption | Highest-risk content type (§14.4). If not cleared, the case study uses only public UDISE+/NCF-FS numbers, which is already enough. | Programme lead | pending |
| 11 | **APAAR ID** in any schema diagram, and the data-minimisation section | Child identifier + children's data. Verify current DPDP rules status before publishing anything that reads as a legal claim. | Brand & Comms / legal | pending |
| 12 | Naming **ConveGenius** as the employer on this page | Employer attribution on a personal site. Needs the standard disclaimer either way (§14.6). | Brand & Comms | pending |
| 13 | **Roadmap phase names or dates** from the internal plan | Internal planning detail. Describe generically if refused. | Programme lead | pending |
| 14 | **The five device mockups now on the case-study page** — teacher home, Live HPC drill-down, student report, grade selection, student profile | Built from the HPC app designs, so they are internal product screens regardless of the framing around them. The profile exhibit is published with every value blurred; the others show synthetic demo content. Also needs a statement of who designed those screens. | Programme lead + Brand | pending |

## Publishing gates

1. No page goes live with any row at `pending` that the page actually depends on.
2. If rows 1–3 are refused, the case study is still publishable: the NCF-FS
   structure, the 68 competencies, the level/band arithmetic, and the UDISE+
   single-teacher figures are all public. The field chapter is what shrinks.
   If row 14 is refused, remove the `exhibits` arrays from project 09 in
   `js/data.js` — the argument stands without the screens, it just loses its
   evidence.
3. Footer disclaimer, required regardless: this is a personal portfolio and does
   not represent ConveGenius or any government body.
