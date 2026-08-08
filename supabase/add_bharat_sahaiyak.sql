-- Generated from js/data.js — do not hand-edit the JSON.
-- Needs the thumb column: run supabase/add_thumb_column.sql first.
insert into projects (id, status, title, category, year, description, tags, color, icon_gradient, accent_color, thumb, detail, sort_order) values
(
  $$10$$, $$shipped$$, $$Bharat SahAIyak$$, $$Product Design$$, $$2026$$,
  $$An admin console for the conversational services a state department runs — six bots, three languages, and a model deprecation that needs a decision before the next deployment.$$, $$["Gov Tech","AI UX","Design Systems","Multilingual"]$$, $$#f1f3f6$$,
  $$linear-gradient(135deg,#171717,#525252)$$, $$#171717$$, $$assets/work/bharat/laptop-studio.png$$,
  $${
  "role": "Product Designer",
  "challenge": "A department does not run one chatbot. It runs six, across WhatsApp, IVR and a PWA, in Odia, Hindi and English, each stitched from adapters, translators, retrievers and a language model — and every one of those parts can be deprecated, rate-limited or quietly degraded by someone else's release. The person accountable for that is a bot owner in a department, not an ML engineer.",
  "outcome": "A console that treats a conversational service as an operable thing: a registry that flags configuration changes which have already happened upstream, a recipe canvas where each step states what it does in the language of the work rather than the language of the stack, and designed states for the ways an AI system actually fails — the model retired, the service degraded, the permission missing.",
  "stats": [
    {
      "value": "6",
      "label": "Conversational services in one registry",
      "provisional": true
    },
    {
      "value": "3",
      "label": "Languages per bot — Odia, Hindi, English",
      "provisional": true
    },
    {
      "value": "6",
      "label": "System states designed, not just the happy one",
      "provisional": true
    }
  ],
  "frames": [],
  "recruiter": {
    "role": "Product Designer",
    "timeline": "2026",
    "liveAt": null,
    "domain": "Gov tech · Conversational AI · Multilingual",
    "platform": "Admin console · WhatsApp / IVR / PWA",
    "team": "Samagra · cross-functional — scope to confirm",
    "problem": "A state department runs six conversational services across three languages, assembled from parts that other people version. When a model is deprecated or a retriever degrades, the person who has to decide is a bot owner in a department, not an ML engineer.",
    "shipped": "A console where a bot is an operable service: a registry that flags upstream changes as decisions, a recipe canvas that names each step in the language of the work, and designed states for the ways an AI system actually fails.",
    "owned": [
      "Product design",
      "Information architecture",
      "AI UX",
      "Interaction design",
      "Content design",
      "Design system"
    ],
    "bullets": [
      "Designed the admin console for Bharat SahAIyak — six conversational services for a state department, across WhatsApp, IVR and an audience PWA, in Odia, Hindi and English.",
      "The registry surfaces upstream change as a decision, not a notice. A deprecated language model is shown with what it will cost, what still works, and the two things you can do about it — and the row stays flagged until someone decides, not until someone dismisses.",
      "The recipe canvas asks the question, not the parameter. Instead of retrieval.top_k, the rail asks 'How many passages before answering?' with the token name underneath — so a bot owner can configure retrieval without learning the vocabulary first.",
      "Six states are designed, not one. Loading, empty, error, AI service down, and no permission each say what is true and what the reader can still do — because a system assembled from other people's services spends real time in every one of them.",
      "Every number inside these screens is demo data from the design file, and is labelled as such. What is real here is the structure: how a bot is registered, configured, blocked and handed to the next person."
    ]
  },
  "caseFile": {
    "causeList": {
      "label": "Cause list",
      "heading": "Three matters, one line each",
      "note": "An operations console for AI services someone else keeps changing."
    },
    "heroExhibits": [
      {
        "id": "A",
        "src": "assets/work/bharat/laptop-studio.png",
        "alt": "The recipe canvas in a laptop, with each pipeline step as a card and the configuration rail asking questions in plain language",
        "caption": "Studio — the pipeline as steps, configured in plain language",
        "clearance": "public",
        "ratio": "1600 / 1002"
      },
      {
        "id": "B",
        "src": "assets/work/bharat/laptop-bots.png",
        "alt": "The bot registry in a laptop, six services with channel, languages, environment and health in one row each",
        "caption": "The registry — six services, and what each one is doing right now",
        "clearance": "public",
        "ratio": "1600 / 1002"
      },
      {
        "id": "C",
        "src": "assets/work/bharat/laptop-ai-down.png",
        "alt": "The console with AI assistance unavailable, showing what still works while the service is degraded",
        "caption": "AI service down — a designed state, not a broken one",
        "clearance": "public",
        "ratio": "1600 / 1002"
      }
    ],
    "premise": {
      "heading": "The premise",
      "body": [
        "A department does not run a chatbot. It runs a fleet of them. This console covers six: an agricultural advisory in Odia on WhatsApp, a ration helpline on IVR, a scheme helpdesk in a PWA, and three more — each one assembled from an input adapter, a speech-to-text service, two translators, a retriever, a language model and an output adapter.",
        "Every one of those parts belongs to somebody else's release cycle. A model gets deprecated. A translator changes version. An org policy locks a node. The work of running the service is mostly absorbing those changes — and the person accountable is a bot owner inside a department, not the engineer who assembled the stack.",
        "So the console is built around a single idea: an upstream change is a decision someone has to make, and the interface should hold it open until they make it. My read is that this is the difference between an admin panel and an operations console — a panel tells you what happened, and a console tells you what it costs you and what you can do about it."
      ],
      "citation": {
        "label": "WCAG 2.2, SC 1.4.3 Contrast (Minimum) — the console is built on shadcn/ui tokens and inherits its floors",
        "href": "https://www.w3.org/TR/WCAG22/#contrast-minimum"
      },
      "exhibits": [
        {
          "id": "D",
          "src": "assets/work/bharat/01-bots-default.png",
          "alt": "The bot registry listing six services with a flagged banner explaining a language model deprecation and its consequences",
          "caption": "The registry, with one service flagged for a decision",
          "clearance": "public",
          "ratio": "1800 / 1125"
        }
      ]
    },
    "matters": [
      {
        "no": "001",
        "slug": "matter-001",
        "title": "The registry — upstream change as a decision",
        "state": "Designed",
        "mode": "Designed",
        "oneLine": "A deprecated model is shown as a decision, with what it costs and what still works.",
        "context": [
          "Every row carries the things an owner is actually accountable for: channel, languages, environment, health, when it last deployed, and who owns it. The two rows that need something from a person are tinted and flagged, and the note under the table says the rule out loud — flagged rows stay flagged until someone decides, not until someone dismisses.",
          "The flag itself is written as a consequence rather than an alert. The model behind the agricultural advisory loses provider support on a date; the banner says how many questions a day run on it, in which language, for how many extension workers, what happens if nobody acts, and offers exactly three moves: review, compare on the test set, or snooze for thirty days."
        ],
        "decisions": [
          {
            "constraint": "A deprecation notice is information. The owner needs a decision, and the cost of not making one.",
            "options": [
              "A toast when the deprecation lands",
              "A badge on the row",
              "An inline banner that states the consequence and offers the moves"
            ],
            "chose": "An inline banner inside the row, naming the date, the daily volume, the language, the audience, and the fallback behaviour if the date passes with no decision.",
            "why": "The question 'should I care about this' has a factual answer, and the interface knows it. Making the reader open a detail page to find out is how these notices get ignored.",
            "cost": "It is a large object in a table, and only two rows can carry one before the registry stops being scannable. That ceiling is a design constraint the product has to live inside."
          },
          {
            "constraint": "Dismissible alerts train people to dismiss.",
            "options": [
              "Dismissible with a reminder",
              "Snooze only",
              "Stays until a decision is recorded"
            ],
            "chose": "The flag persists until someone chooses. Snooze is bounded at thirty days and says so on the button.",
            "why": "The state being tracked is 'has a person decided', which is not the same as 'has a person seen this'.",
            "cost": "A row can stay visually loud for weeks, and there is no path to acknowledge without acting. On a busy fleet that could read as nagging."
          }
        ],
        "rejected": [
          {
            "direction": "A separate alerts inbox for upstream changes",
            "whyNot": "It would be tidier and nobody would read it. The change belongs against the service it affects, in the table the owner already opens."
          }
        ],
        "exhibits": [
          {
            "id": "E",
            "src": "assets/work/bharat/03-empty.png",
            "alt": "The registry with no bots yet, offering recipes to start from rather than an empty table",
            "caption": "Empty — a starting point rather than an apology",
            "clearance": "public",
            "ratio": "1800 / 1125"
          }
        ]
      },
      {
        "no": "002",
        "slug": "matter-002",
        "title": "Studio — the pipeline in the language of the work",
        "state": "Designed",
        "mode": "Designed",
        "oneLine": "The rail asks what the step should do; the token name sits underneath it.",
        "context": [
          "A bot is a chain: WhatsApp inbound, speech to text, translate to English, retrieve, answer, translate back to Odia, text to speech, WhatsApp outbound. The canvas shows that chain as cards with their provider and version on the face, so the thing you are looking at is the actual stack rather than a diagram of it.",
          "The configuration rail is where the argument is. Every control asks a question in the language of the work — 'What should it search with?', 'How many passages before answering?', 'Should it re-read what it found and put the best answer first?' — with the parameter name in mono underneath, so someone who does know the vocabulary is not slowed down and someone who does not is not blocked."
        ],
        "decisions": [
          {
            "constraint": "The people configuring retrieval are bot owners in departments. The vocabulary of the stack is a barrier to entry, not a feature.",
            "options": [
              "Parameter names with tooltips",
              "A simple mode and an advanced mode",
              "Ask the question in plain language, show the parameter name beneath it"
            ],
            "chose": "Question first, parameter second, both always visible.",
            "why": "A simple mode teaches nobody and a tooltip is a thing you have to know to look for. Showing both means the interface is also the documentation.",
            "cost": "Every control is taller, so fewer fit in the rail, and each question has to be written and translated rather than inherited from the library. Copy becomes a maintained artefact."
          },
          {
            "constraint": "A recipe can be incomplete in ways that will only show up in production — no voice selected, no fallback, a model about to be retired.",
            "options": [
              "Validate on save",
              "Warn on deploy",
              "A standing list of what blocks this recipe"
            ],
            "chose": "A 'Before this recipe can run' panel under the canvas, splitting blockers from warnings, each naming the node and offering the fix inline.",
            "why": "The blockers are known long before deploy. Holding them at the bottom of the canvas makes the gap between 'built' and 'runnable' visible while there is still time to close it.",
            "cost": "It occupies canvas height permanently, including when the list is empty, and it duplicates state that also appears on the node cards."
          }
        ],
        "rejected": [
          {
            "direction": "Drag-and-drop as the primary way to build a recipe",
            "whyNot": "The canvas states it plainly: tab moves between steps, Enter configures, Alt+N inserts. Dragging is never the only way, because a console used over a remote desktop on a department machine cannot depend on it."
          }
        ],
        "exhibits": [
          {
            "id": "F",
            "src": "assets/work/bharat/09-studio.png",
            "alt": "The full recipe canvas with plugin library, node cards showing provider and version, and the plain-language configuration rail",
            "caption": "Studio — the stack on the canvas, the questions in the rail",
            "clearance": "public",
            "ratio": "1800 / 1125"
          }
        ]
      },
      {
        "no": "003",
        "slug": "matter-003",
        "title": "The states a fleet actually spends time in",
        "state": "Designed",
        "mode": "Designed",
        "oneLine": "Loading, empty, error, degraded and no-permission, each written as a state.",
        "context": [
          "A console stitched from other people's services is not usually in its happy state. The registry can be loading, empty, unreachable, or readable-but-degraded because the AI service is down; and the person opening it may not have rights to the half of it they can see.",
          "Each of those is designed rather than defaulted. The degraded state keeps the fleet readable and says which capabilities are gone. The permission state names what the reader cannot do and who can. The error state says the registry could not load, which is a different sentence from 'no bots'."
        ],
        "decisions": [
          {
            "constraint": "'Something went wrong' is not a state, it is an apology.",
            "options": [
              "A generic error card",
              "A retry button",
              "Name what failed, and what still works"
            ],
            "chose": "Each non-happy state says what is true, what is still usable, and what the reader can do next.",
            "why": "The reader's next action is different in every case — retry, wait, ask for access, or carry on with the parts that work — so a single generic state serves none of them.",
            "cost": "Five extra states to design, write and keep true as the product changes, and each one is another thing that can drift out of date."
          }
        ],
        "rejected": [
          {
            "direction": "Treating 'AI service down' as an error",
            "whyNot": "It is not an error, it is a capability being absent. The console still lists the fleet, still shows health, and still lets an owner work — the only thing missing is the assistance."
          }
        ],
        "exhibits": [
          {
            "id": "G",
            "src": "assets/work/bharat/05-ai-down.png",
            "alt": "The console with AI assistance unavailable, keeping the fleet readable while naming the capabilities that are gone",
            "caption": "AI service down — degraded, still operable",
            "clearance": "public",
            "ratio": "1800 / 1125"
          },
          {
            "id": "H",
            "src": "assets/work/bharat/06-no-permission.png",
            "alt": "The no-permission state naming what this reader cannot reach and who can grant it, instead of hiding the section",
            "caption": "No permission — named, not hidden",
            "clearance": "public",
            "ratio": "1800 / 1125"
          },
          {
            "id": "I",
            "src": "assets/work/bharat/04-error.png",
            "alt": "The registry failing to load, stating that the registry itself is unreachable rather than reporting zero bots",
            "caption": "Error — the registry is unreachable, which is not the same as empty",
            "clearance": "public",
            "ratio": "1800 / 1125"
          }
        ]
      }
    ],
    "differently": {
      "heading": "What I'd do differently",
      "items": [
        {
          "title": "Write the questions before drawing the rail.",
          "body": "The plain-language questions are the best thing in this design and they were written into a layout that already existed. Starting from the questions would have changed the rail's proportions, and probably its order."
        },
        {
          "title": "Design the fleet view for twenty bots, not six.",
          "body": "The inline banner works because only two rows carry one. At department scale that assumption breaks, and the pattern needs a version that degrades into a queue."
        },
        {
          "title": "Put the demo data beyond doubt.",
          "body": "The screens carry realistic figures and real-sounding officers. That is what makes a design review feel real, and exactly what makes a public case study risky. Obviously-synthetic data costs nothing at design time and saves this conversation later."
        }
      ]
    },
    "forward": {
      "heading": "What I'm taking forward",
      "items": [
        "Ask the question, then show the parameter. If the interface has to name a token, it can afford one line saying what the token does.",
        "An upstream change is a decision. Track whether a person decided, not whether a person looked.",
        "Design the degraded state early. On a system assembled from other people's services, it is not an edge case — it is a Tuesday."
      ]
    }
  }
}$$, 10
)
on conflict (id) do update set
  status=excluded.status, title=excluded.title, category=excluded.category,
  year=excluded.year, description=excluded.description, tags=excluded.tags,
  color=excluded.color, icon_gradient=excluded.icon_gradient,
  accent_color=excluded.accent_color, thumb=excluded.thumb,
  detail=excluded.detail, sort_order=excluded.sort_order;
