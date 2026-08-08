-- ─── Seed Data ───────────────────────────────────────────────────────────────
-- Run after schema.sql

-- Projects
-- The placeholder/demo projects (01-05) and LabSaarthi (06) were removed.
-- Live projects are seeded by their own files: supabase/add_encode_pucar.sql.
-- To drop the old rows from an existing database, run supabase/delete_projects.sql.

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
  'Design Lead', 'Agami', 'https://agami.in/', 'Sep 2025 — Present', 'Part-Time',
  '["Judiciary", "Service Delivery", "AI Design", "Systems", "Research", "Product"]',
  'linear-gradient(135deg,#047857 0%,#10b981 100%)',
  'agami', null,
  '["Leading design for a completely codeless user experience, live across four states — Kerala, Haryana, Punjab and Sikkim.", "Defined the complex user journeys for resolving cases, currently solving for the S138 case."]',
  2
),
(
  'Associate UX Designer', 'Samagra', 'https://samagragovernance.in/', 'Jan 2023 — Aug 2025', 'New Delhi',
  '["GovTech", "Research", "Product"]',
  'linear-gradient(135deg,#ea580c 0%,#f59e0b 100%)',
  'samagra', 'https://samagragovernance.in/static/Samagra_Logo_updated-f59ec74c713638ada10b837a71238eaa.svg',
  '["Multiple product and design thinking along with on-ground research resulting in accelerated usage of app and website.", "Worked on improving user interfaces for high-stake civic platforms including Kumbh Sah''AIyak and Bharat Sah''AIyak (now part of Krutrim-OLA).", "Implemented user and stakeholder feedback, reworked friction points, and consequently improved user experience across products."]',
  3
),
(
  'UX Designer', 'IQ-Line', 'https://iqline.co.in/', 'Apr 2025 — Sep 2025', 'New Delhi · Part-Time',
  '["Healthcare", "LIMS", "B2B"]',
  'linear-gradient(135deg,#0891b2 0%,#0d9488 100%)',
  'iqline', null,
  '["Led the development and implementation of a token-based design system, improving consistency and scalability across multiple platforms.", "Led the UI redesign for a LIMS, enhancing usability and optimizing workflows for healthcare professionals.", "Designed and developed the user interface for a new blood sample transfer system, improving the tracking and management of critical medical samples.", "Coordinated with healthcare professionals to gather insights and define requirements, ensuring alignment with medical standards and user needs."]',
  4
);

-- Testimonials
insert into testimonials (quote, name, role, company, initials, sort_order) values
('Om''s designs are always clear and easy to implement. We rarely had to go back and forth, which made development significantly smoother.', 'Arjun Mehta', 'Frontend Engineer', 'ConveGenius.AI', 'AM', 1),
('Working with Om felt seamless. He thinks in systems — every decision he made scaled well across the product and saved us rework down the line.', 'Priya Nair', 'Product Manager', 'Samagra', 'PN', 2),
('Om approaches design with strong strategic thinking and a clear sense of direction. His instinct for what users actually need is sharp.', 'Rahul Verma', 'Engineering Lead', 'IQ-Line', 'RV', 3),
('The token system Om built for us became the foundation every team now works from. It''s one of those rare pieces of work that keeps giving.', 'Sneha Kulkarni', 'Design Lead', 'Samagra', 'SK', 4),
('Om is the kind of designer who makes engineers feel heard. He cares about feasibility as much as aesthetics — genuinely great to work with.', 'Dev Sharma', 'Full-Stack Developer', 'ConveGenius.AI', 'DS', 5);
