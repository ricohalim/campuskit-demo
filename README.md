# CampusKit — Campus Equipment Checkout System

**Instructor teaching prototype · Synthetic data · Not production-ready**

CampusKit is a fictional campus equipment checkout app for teaching business problem analysis, dataset exploration, relational database design/normalization, and basic web implementation. All sample records and reported metrics are synthetic and must not be presented as evidence from a real campus.

## Live demo with GitHub Pages

1. Create a public GitHub repository (for example, `campuskit-demo`).
2. Extract this ZIP on your computer.
3. Upload **every file in this folder** to the repository root. This version intentionally keeps reports, SQL scripts, and data files at the root so they can be uploaded easily using GitHub's web interface. Do not upload only `index.html`, `styles.css`, `app.js`, and `analysis.html`.
4. Confirm these files are visible in the Code tab: `index.html`, `styles.css`, `app.js`, `analysis.html`, `BUSINESS_PROBLEM_ANALYSIS_REPORT.md`, `TEACHING_REPORT.md`, `schema.sql`, `seed_demo.sql`, `demo_policies.sql`, `synthetic_checkouts.csv`, and `demo_metrics.json`.
5. Go to **Settings → Pages**. Choose **Deploy from a branch**, branch `main`, folder `/(root)`, and save.
6. Wait for publishing, then open `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

The browser-only synthetic demo does not require a database. The Business Analysis button opens `analysis.html` from the same repository root.

## Project files

- `index.html`, `styles.css`, `app.js` — main static web app.
- `analysis.html` — Business Analysis dashboard.
- `synthetic_checkouts.csv` — 180 synthetic checkout records for exercises.
- `demo_metrics.json` — summary metrics for the synthetic dataset.
- `BUSINESS_PROBLEM_ANALYSIS_REPORT.md` — business problem analysis, requirements mapping, and limitations.
- `TEACHING_REPORT.md` — teaching report covering the case and database design.
- `schema.sql` — PostgreSQL schema.
- `seed_demo.sql` — fictional seed data.
- `demo_policies.sql` — insecure, disposable-demo-only policies.
- `DEPLOY_TO_GITHUB.md` — concise deployment checklist.

## Optional: connect Supabase

1. Create a Supabase project.
2. Run `schema.sql` in the Supabase SQL Editor.
3. Run `seed_demo.sql` to insert fictional sample records.
4. In `app.js`, replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` with your project URL and publishable/anon key if the integration is being used.
5. Configure Row Level Security policies appropriate for your use case before enabling writes.

**Security:** Never put a Supabase `service_role` or secret key in browser code. `demo_policies.sql` intentionally allows broad public access for a disposable classroom demonstration only. Do not use it with real data. A public GitHub Pages site is accessible to anyone.

## Limitations

This is a classroom prototype, not a production system. The browser-only demo mode is read-only. A real deployment needs authentication, role-based access controls, secure RLS policies, server-side validation as appropriate, audit logging, error handling, and backups. Dashboard metrics describe the synthetic teaching dataset only.
