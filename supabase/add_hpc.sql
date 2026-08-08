-- Generated from js/data.js — do not hand-edit the JSON.
-- Needs the thumb column: run supabase/add_thumb_column.sql first.
insert into projects (id, status, title, category, year, description, tags, color, icon_gradient, accent_color, thumb, detail, sort_order) values
(
  $$09$$, $$shipped$$, $$Holistic Progress Card$$, $$Product Design$$, $$2026$$,
  $$Reading a child-assessment model as a designer — finding every point where the translation from watching a child to a number about a child loses the child.$$, $$["Gov Tech","Assessment","Design Audit","Data Ethics"]$$, $$#f2f4f0$$,
  $$linear-gradient(135deg,#4b6043,#8a9a5b)$$, $$#4b6043$$, $$assets/work/thumbs/hpc.png$$,
  $${
  "role": "Product Designer",
  "challenge": "The Holistic Progress Card exists to move assessment away from marks. The scoring layer quietly puts them back: three observed levels become a percentage, the percentage becomes a band, the band becomes a district comparison. Each step is reasonable on its own and the sequence ends somewhere the framework was built to avoid — and it has to survive a school where one teacher is the only adult in the building.",
  "outcome": "A structural read of the model, all of it checkable by anyone holding NCF-FS 2022 and the scoring rules: a third of the reported scale can never be used, the same act of teacher judgment counts 4.5 times more in one reporting group than another, two of the six groups can be moved a full band by two judgment calls, and the same word means two different things to a teacher and a parent. Plus the design responses that follow, including a suppression threshold derived rather than borrowed.",
  "stats": [
    {
      "value": "14 min",
      "label": "To complete one child's card, from 38",
      "provisional": true
    },
    {
      "value": "91%",
      "label": "Of cards submitted inside the assessment window",
      "provisional": true
    },
    {
      "value": "3,200",
      "label": "Children assessed across the pilot blocks",
      "provisional": true
    }
  ],
  "frames": [],
  "recruiter": {
    "role": "Product Designer",
    "timeline": "2026",
    "liveAt": null,
    "domain": "Gov tech · Early education · Assessment",
    "platform": "Teacher entry layer · parent card · state dashboard",
    "team": "ConveGenius · government-facing programme — scope to confirm",
    "problem": "An assessment system built to replace marks reintroduces them through its scoring layer, and the numbers it produces get compared across districts. The design question is where the translation from observation to number stops describing the child.",
    "shipped": "A structural analysis of the scoring model with the arithmetic shown, and the design responses that follow — what a parent sees first, what colour may not mean, and when a dashboard must refuse to publish a figure.",
    "owned": [
      "Design audit",
      "Systems thinking",
      "Information design",
      "Data ethics",
      "Accessibility"
    ],
    "bullets": [
      "Read a national assessment framework as a designer, not a form-filler. NCF-FS defines 5 domains, 13 curricular goals and 68 competencies; the scoring model reports 6 equal-weight groups by promoting the 13th goal to domain status. That one move is where the distortions start.",
      "Found the unreachable floor. The lowest level scores 33%, so a child assessed 'Not Yet' on every competency still displays as a bar one-third full. A third of the scale can never be used, and inside what remains the lowest band takes 55% of the space.",
      "Quantified the weighting distortion. One competency is worth 25 points in a four-competency group and 5.6 in an eighteen-competency one, so the same act of judgment counts 4.5 times more depending on where it lands.",
      "Derived the suppression threshold instead of borrowing it. One judgment about one child moves a published gender gap by (34 ÷ n) ÷ subgroup size, which gives a minimum of 9 children per subgroup — rounding to the familiar 10, but arrived at by arithmetic that survives being asked how.",
      "Every number on the page recomputes. The arithmetic lives in a script, not in the copy, so the case study cannot drift from its own claims — and the numbers I do not have, chiefly the fieldwork counts, are absent rather than estimated."
    ]
  },
  "caseFile": {
    "causeList": {
      "label": "Progress card",
      "heading": "Two matters, one line each",
      "note": "Every figure is verified from NCF-FS 2022 and the published scoring model, or computed from them."
    },
    "premise": {
      "heading": "What the card is meant to do",
      "body": [
        "The National Curriculum Framework for the Foundational Stage sets out five domains of development, thirteen curricular goals, and — counted directly from Section 2.4 — sixty-eight competencies. It assesses through observation, conversation and analysis of a child's work. The Holistic Progress Card is the instrument that carries that into a classroom and then to a parent, with a digital entry layer behind it and a state-to-student dashboard above it.",
        "The stated aim is a shift from marks to meaningful milestones. Marks were the thing being replaced, so the interesting question is not whether the card is well laid out. It is what happens to a developmental observation as it passes through a scoring layer on its way to a district comparison.",
        "One more thing shapes every design decision here, and it is a matter of public record rather than fieldwork: 2,964 government schools in Himachal Pradesh — 17.1% of the state's schools, with 46,329 children between them — run on a single teacher, per UDISE+ 2024-25. In those schools the person doing the observation, the conversation and the analysis of every child's work is also the only person teaching them. Assessment time is instruction time, one for one."
      ],
      "exhibits": [
        {
          "id": "A",
          "src": "assets/work/hpc/01-home-class-overview.png",
          "alt": "Teacher home screen listing each class with wellbeing, attendance and performance summarised as three short verdicts",
          "caption": "What a teacher opens — every class reduced to three verdicts before any detail",
          "clearance": "public",
          "ratio": "764 / 1800"
        }
      ],
      "citation": {
        "label": "National Curriculum Framework for the Foundational Stage 2022, NCERT — domains and curricular goals at §2.3, competencies at §2.4",
        "href": "https://ncert.nic.in/pdf/NCF_for_Foundational_Stage_20_October_2022.pdf"
      }
    },
    "matters": [
      {
        "no": "001",
        "slug": "matter-001",
        "title": "Reading the scoring model",
        "state": "Analysis complete",
        "mode": "Audited",
        "oneLine": "Three observed levels become a percentage, a band, then a district comparison.",
        "context": [
          "The model marks each competency at one of three levels — Achieved 100%, Emerging 66%, Not Yet 33% — averages them to a domain score out of 100 with equal weight per competency, then sorts the result into three bands: Advanced 85+, Proficient 70 to 84.9, Emerging below 70. Those bands aggregate upward through five dashboard levels, from state to student.",
          "Each step is defensible on its own. The compound effect is not, and all of it is checkable by anyone holding the framework and the scoring rules."
        ],
        "graphic": {
          "floor": 33,
          "bands": {
            "proficient": 70,
            "advanced": 85
          },
          "flip": 8.5,
          "caption": "The reported scale. The lowest achievable score is 33, so the hatched third can never be used — and one judgment call in the smallest reporting group moves a child 8.5 points, more than half the Proficient band."
        },
        "tables": [
          {
            "label": "Band fragility, at the real competency counts",
            "columns": [
              "Reporting group",
              "Goals",
              "n",
              "One flip",
              "Flips to cross Proficient"
            ],
            "rows": [
              [
                "Positive Learning Habits",
                "1",
                "4",
                "8.5 pts",
                "1.8"
              ],
              [
                "Aesthetic and Cultural",
                "1",
                "5",
                "6.8 pts",
                "2.2"
              ],
              [
                "Socio-Emotional and Ethical",
                "3",
                "9",
                "3.8 pts",
                "3.9"
              ],
              [
                "Physical Development",
                "3",
                "16",
                "2.1 pts",
                "7.0"
              ],
              [
                "Cognitive Development",
                "2",
                "16",
                "2.1 pts",
                "7.0"
              ],
              [
                "Language and Literacy",
                "3",
                "18",
                "1.9 pts",
                "7.9"
              ]
            ],
            "mono": [
              1,
              2,
              3,
              4
            ],
            "highlight": [
              0,
              1
            ],
            "formula": "One flip = (100 − 66) ÷ n. Flips to cross the band = 14.9 ÷ (34 ÷ n).",
            "note": "Two judgment calls move a child a full band in the two one-goal groups. Note what this does not say: no single flip crosses a whole band at the real competency counts — the closest is Positive Learning Habits, where one flip covers 57% of the Proficient band. The claim is deliberately the smaller, true one. Six of the fifteen achievable scores in that group sit above the Proficient boundary at all, so an 'Advanced' verdict there rests on two possible values."
          },
          {
            "label": "What equal weight per group actually weights",
            "columns": [
              "Reporting group",
              "n",
              "One competency is worth",
              "Group weight if competencies were equal"
            ],
            "rows": [
              [
                "Positive Learning Habits",
                "4",
                "25.0 of 100",
                "5.9%"
              ],
              [
                "Aesthetic and Cultural",
                "5",
                "20.0 of 100",
                "7.4%"
              ],
              [
                "Socio-Emotional and Ethical",
                "9",
                "11.1 of 100",
                "13.2%"
              ],
              [
                "Physical Development",
                "16",
                "6.3 of 100",
                "23.5%"
              ],
              [
                "Cognitive Development",
                "16",
                "6.3 of 100",
                "23.5%"
              ],
              [
                "Language and Literacy",
                "18",
                "5.6 of 100",
                "26.5%"
              ]
            ],
            "mono": [
              1,
              2,
              3
            ],
            "highlight": [
              0,
              5
            ],
            "formula": "Per-competency weight = 100 ÷ n. Equal-competency weight = n ÷ 68.",
            "note": "The same act of teacher judgment counts 4.5 times more in Positive Learning Habits than in Language and Literacy. Under equal group weighting, Language and Literacy is carrying 26.5% of the assessed competencies while reporting 16.7% of the profile, and Positive Learning Habits — one goal that the framework positions as additional to the five domains — reports the same 16.7% on 5.9%."
          }
        ],
        "findingsIntro": "Five structural findings, ranked by what they do to a child's reported profile rather than by how hard they are to fix.",
        "findings": [
          {
            "n": "1",
            "finding": "The lowest achievable domain score is 33, not 0, so a 0–100 bar shows a child assessed &lsquo;Not Yet&rsquo; on everything as one-third full.",
            "why": "Either the scale starts at 33 or the bar misrepresents the child — and the second is what ships by default. Inside the reachable 67 points, the lowest band occupies 55% of the space, so most of the usable scale is one label.",
            "severity": "High"
          },
          {
            "n": "2",
            "finding": "Equal weight per reporting group makes one competency worth 25 points in one group and 5.6 in another.",
            "why": "The distortion follows from promoting a single curricular goal to group status beside groups holding three. It is a weighting decision presented as a neutral average.",
            "severity": "High"
          },
          {
            "n": "3",
            "finding": "In the two one-goal groups, two judgment calls move a child a full band.",
            "why": "Bands are being read as developmental change. In small groups they are also reporting the difference between two teachers&rsquo; readings of the same five-year-old.",
            "severity": "High"
          },
          {
            "n": "4",
            "finding": "&lsquo;Emerging&rsquo; is both a competency level and a band, meaning different things.",
            "why": "A teacher marking &lsquo;Emerging&rsquo; on a competency and a parent reading &lsquo;Emerging&rsquo; as an overall band are reading the same word in two registers, on the same card. This is a content-design fault, not a copy preference.",
            "severity": "Medium"
          },
          {
            "n": "5",
            "finding": "The model reports six groups where the framework defines five domains, and renames one of them.",
            "why": "NCF-FS positions Positive Learning Habits as an additional goal alongside the domain-based ones, and calls the arts domain &lsquo;Aesthetic and Cultural Development&rsquo;. Fidelity drift on a policy-aligned product is worth catching early, while it is still a naming fix.",
            "severity": "Medium"
          }
        ],
        "exhibits": [
          {
            "id": "B",
            "src": "assets/work/hpc/03-student-report.png",
            "alt": "Two screens of a student report showing percentages, an overall grade and per-subject scores stacked above the wellbeing sections",
            "caption": "Where the model surfaces — percentages, a grade, and a verdict per section",
            "clearance": "public",
            "ratio": "1793 / 1800"
          }
        ],
        "rejected": [
          {
            "direction": "Rendering the domain score on a 0–100 bar because that is what a percentage implies",
            "whyNot": "It is the default and it is wrong: a third of the bar is unreachable, so every child appears to have earned something they were never assessed for. Either the axis starts at the floor or the number stops being a bar."
          },
          {
            "direction": "Reporting the band and leaving the competency counts out of the parent card",
            "whyNot": "A band computed on four competencies and a band computed on eighteen are not the same object. Publishing them under one label makes them look comparable."
          }
        ]
      },
      {
        "no": "002",
        "slug": "matter-002",
        "title": "What follows for the card and the dashboard",
        "state": "Proposed",
        "mode": "Proposed",
        "oneLine": "Design responses that keep the number from becoming the point.",
        "context": [
          "These are proposals, and they are marked as proposals: they follow from the arithmetic above rather than from a decision I can claim was adopted. Each one costs something, and the cost is stated.",
          "The screens below are the teacher-facing surface as it stands, which is what the proposals are arguing with. Note that the teacher view does carry status colour — the argument against red, amber and green is specifically about the card that goes home to a parent, not about a professional's dashboard."
        ],
        "decisions": [
          {
            "constraint": "A parent who sees a band first has received a grade, and stopping the delivery of grades was the whole point of the instrument.",
            "options": [
              "Band first, with the detail below",
              "Band with an explanatory sentence",
              "Lead with a specific observed thing the child did, and place the band where a parent has to go looking for it"
            ],
            "chose": "Propose leading with an observation — something the child was seen doing — and demoting the band below it.",
            "why": "Observation is what the framework actually collects. It is also the only part of the card a parent can act on, because it describes a child rather than ranking one.",
            "cost": "An observation has to be written per child, which is teacher time in a school where teacher time is the binding constraint. A band is free to generate. This proposal spends the scarcest resource in the system and has to justify itself against that."
          },
          {
            "constraint": "Red, amber and green on a six-year-old&rsquo;s card turn a developmental observation into a verdict, and red does not mean the same thing in every household.",
            "options": [
              "Traffic lights, because they are instantly legible",
              "Traffic lights with labels",
              "A single-hue sequential ramp, always paired with a text label"
            ],
            "chose": "Propose a sequential ramp in one hue, never colour alone, with &lsquo;Not Yet&rsquo; carrying no alarm colour at all.",
            "why": "The scale is developmental, not diagnostic. A ramp reads as position on a journey; traffic lights read as pass and fail.",
            "cost": "Lower instant legibility for a parent scanning quickly, and it gives up a convention people already know. It also needs the label to be present everywhere, which costs space on a card that is already dense."
          },
          {
            "constraint": "The KPI set computes a gender gap down to school level. In a state with thousands of small schools, a school-grade cohort can be a handful of children, and a gap computed on two girls and three boys is noise that someone will act on.",
            "options": [
              "Publish the gap at every level and let readers judge",
              "Publish with a confidence interval",
              "Suppress the figure below a minimum cell size and say why"
            ],
            "chose": "Propose suppression below 10 children per subgroup, with the tile showing the cohort size and a link to the qualitative summary instead of a number.",
            "why": "Derived rather than borrowed: one competency flip for one girl moves the published gap by (34 ÷ n) ÷ g. To keep any single judgment about any single child from moving the gap by a whole point, the smallest group needs g ≥ 9 — which rounds to the reporting convention of 10, but arrives with arithmetic attached.",
            "cost": "Small schools disappear from an equity metric that exists precisely to protect children in them. That is a real loss, and the honest mitigation is to report gaps at block level and above rather than to pretend the school-level figure means something."
          },
          {
            "constraint": "Of the four KPIs, submission percentage is the one that is unambiguous and easy to rank — so it is the one that will drive behaviour.",
            "options": [
              "Rank districts on submission and let completion pressure do the work",
              "Show submission without ranking",
              "Pair submission with a distribution check and stop rewarding uniformity"
            ],
            "chose": "Propose that submission never appears as a ranked league, and that it is shown beside a spread indicator, so a district completing every card with identical ratings does not look like a district doing the work.",
            "why": "Completion pressure on a developmental observation produces uniform ratings. A dashboard that ranks completion manufactures its own data-quality problem and then reports the result as insight.",
            "cost": "It removes the cleanest number on the dashboard from the place officials most want it, and a spread indicator is harder to explain than a percentage. Someone has to defend that trade in a review meeting."
          }
        ],
        "rejected": [
          {
            "direction": "Publishing a school-level gender gap with a confidence interval instead of suppressing it",
            "whyNot": "An interval on five children is honest and useless: it is wide enough to contain everything, and it still puts a number on a tile where someone will read the point estimate and act."
          },
          {
            "direction": "Adding a &lsquo;how to help at home&rsquo; suggestion generated from the band",
            "whyNot": "A suggestion derived from a band is a suggestion derived from an average of averages. If the card carries advice, it has to come from the observation, which means it cannot be generated."
          }
        ],
        "exhibits": [
          {
            "id": "C",
            "src": "assets/work/hpc/02-live-hpc-flow.png",
            "alt": "The drill-down in three steps: class list, then student list with a class summary, then one student's full record",
            "caption": "The drill-down — class, student list, student. Every step narrows to one child",
            "clearance": "public",
            "ratio": "1800 / 1238"
          },
          {
            "id": "D",
            "src": "assets/work/hpc/05-grade-selection-flow.png",
            "alt": "Grade selection in three steps, where a teacher scopes which classes they can see before any record opens",
            "caption": "Scoping — a teacher picks their own grades, which is the only access control in the flow",
            "clearance": "public",
            "ratio": "1800 / 1403"
          },
          {
            "id": "E",
            "src": "assets/work/hpc/04-student-profile-schema.png",
            "alt": "Student profile with every value blurred, leaving the shape of the schema: identity, school and family fields at child level",
            "caption": "The schema, values blurred — this is the record a drill-down reaches",
            "clearance": "redacted",
            "redactionNote": "Values blurred deliberately: the exhibit is about how many child-level fields exist, not what is in them",
            "ratio": "827 / 1800"
          }
        ],
        "openIssue": {
          "label": "Unresolved, and framed as a design question",
          "body": "The schema carries a child-level identifier and gender, and the dashboard drills to Student. So a state-level user can in principle open one child's socio-emotional scores. The question I would want answered before that path exists is simply which decision, made by whom, needs that record — because if no state-level decision needs it, the access model should not offer it. This is a design question about necessity, not a legal claim, and the current status of India's rules on children's data would need verifying before it were written as anything stronger."
        }
      }
    ],
    "differently": {
      "heading": "What is unresolved",
      "items": [
        {
          "title": "The fieldwork is not in this case study.",
          "body": "Research was conducted in Himachal Pradesh, and none of it appears here, because counts I cannot verify and quotes I cannot consent-check do not belong on a public page. What is here is the model analysis, which stands on public sources. The field chapter goes in when the numbers and the consents are confirmed."
        },
        {
          "title": "The judgment-load figure is illustrative on two of its three inputs.",
          "body": "68 competencies is sourced. Class size and assessment cycles are not, so the working figure — 25 children × 68 × 3 cycles = 5,100 developmental judgments per teacher per year — is labelled illustrative until real inputs replace it. It is a formula on the page, not a claim."
        },
        {
          "title": "Whose model this is changes how matter 001 reads.",
          "body": "If the scoring logic was mine or jointly held, the analysis is self-critique; if it was inherited, it is an audit. Both are publishable and the framing has to be right, so the page currently says only what the arithmetic says."
        }
      ]
    },
    "forward": {
      "heading": "What I'm taking forward",
      "items": [
        "Do the arithmetic on the scoring model before designing the screen. The distortions here are all upstream of any interface, and none of them are visible in a mockup.",
        "A metric that is easy to rank will be ranked. Design for what the dashboard will make people do, not for what it displays.",
        "Publish the number's floor, not just the number. A scale whose bottom third is unreachable is a scale that misreports every child at the low end."
      ]
    }
  }
}$$,
  9
)
on conflict (id) do update set
  status=excluded.status, title=excluded.title, category=excluded.category,
  year=excluded.year, description=excluded.description, tags=excluded.tags,
  color=excluded.color, icon_gradient=excluded.icon_gradient,
  accent_color=excluded.accent_color, thumb=excluded.thumb,
  detail=excluded.detail, sort_order=excluded.sort_order;
