# Chamber of Advocate Sachin — Independent Legal Practice Website

A production-ready website and administrative system for an independent advocate practising in **Gurugram, Haryana, and the Delhi NCR region**.

Built strictly in accordance with:
- **Advocates Act, 1961**
- **Bar Council of India (BCI) Rules, Rule 36 (Section IV, Chapter II, Part VI)**
- **Digital Personal Data Protection Act, 2023 (DPDP Act)** principles of data minimisation
- **Web Content Accessibility Guidelines (WCAG 2.2 AA)**

---

## 1. Visual Design System

- **Deep Navy**: `#10243A`
- **Ivory**: `#F7F3EA`
- **Muted Gold**: `#B99A5B`
- **White**: `#FFFFFF`
- **Primary Text**: `#202936`
- **Secondary Text**: `#596579`
- **Subtle Borders**: `#E5E0D7`

### Typography Hierarchy
- **Headings**: Refined Serif (`Playfair Display`, `Georgia`, serif)
- **Body & Controls**: Legible Sans-Serif (`Inter`, system-ui, sans-serif)
- **Monospace Tokens / Enrolment IDs**: Monospace font family

---

## 2. Technology Stack

- **Framework**: Next.js App Router (React 19 Server Components by default)
- **Language**: TypeScript with strict type checking (`strict: true`)
- **Styling**: Tailwind CSS with custom design tokens and `@tailwindcss/typography`
- **Database**: MongoDB 6.0+ via official `mongodb` client with connection pooling and dev in-memory fallback
- **Authentication**: Stateless encrypted `HttpOnly` JWT sessions via `jose` and `bcryptjs` password hashing
- **Validation**: Schema-level runtime validation with `zod`
- **Security**: Content Security Policy, strict HTTP security headers, anti-abuse sliding-window rate limiting, and honeypot bot traps
- **Content Rendering**: XSS-safe markdown parser with strict tag sanitisation via `sanitize-html`

---

## 3. Bar Council of India (BCI) Rule 36 Compliance Safeguards

Under Rule 36 of the BCI Rules framed under Section 49(1)(c) of the Advocates Act, 1961, advocates are strictly prohibited from advertising or soliciting work, directly or indirectly. The platform enforces these safeguards:

1. **No Laudatory Claims**: Strictly prohibits claims of being "best", "top-ranked", "leading", or offering "guaranteed outcomes".
2. **No Testimonials or Case Results**: No client reviews, past case results, or success statistics are displayed.
3. **Factual Verification Badges**: Every profile field displays either `Verified Detail` or `Pending Verification` until verified.
4. **Mandatory Disclaimer**: First-time visitors are presented with a BCI compliance acknowledgement modal.
5. **Gated Public Features**:
   - `enablePublicEnquiries`: Kept disabled (`false`) by default until reviewed.
   - `enableWhatsAppChat`: Kept disabled (`false`) by default until approved.
6. **Publication Gate for Legal Articles**: Three-stage editorial workflow (`Draft` &rarr; `Reviewed` &rarr; `Published`). Drafts are excluded from public routes and sitemaps.

---

## 4. Local Development Setup

### Prerequisites
- Node.js `v20.x` or later (`v24.x` recommended)
- npm `v10.x` or later
- MongoDB instance (optional for dev; in-memory fallback is active when offline)

### Installation Steps

```powershell
# 1. Clone or navigate to the workspace
cd "c:\Users\Mohit Yadav\Desktop\Sachin"

# 2. Install dependencies
npm install

# 3. Configure environment variables
Copy-Item .env.example .env.local

# 4. Bootstrap the initial administrator account
node scripts/seed-admin.mjs

# 5. Start the Next.js development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public website and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin portal.

### Default Admin Credentials (Development)
- **Email**: `admin@advocatechamber.local`
- **Password**: `AdvocateAdmin2026!Secure`
*(Configurable via `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD` in `.env.local`)*

---

## 5. Website Routes

### Public Routes
- `/` — Chamber Home (Factual introduction, credentials summary, practice areas overview)
- `/about` — Advocate Profile (Verified qualifications, Bar Council enrolment, Bar associations)
- `/practice-areas` — Practice Areas Index (Neutral legal descriptions)
- `/practice-areas/[slug]` — Individual Practice Area procedural guide
- `/legal-articles` — Legal Information & Commentary Index
- `/legal-articles/[slug]` — Article reading view (with educational commentary disclaimer)
- `/contact` — Office, court chamber, and gated consultation enquiry form
- `/privacy-policy` — Data privacy policy (90-day retention rule, DPDP Act alignment)
- `/disclaimer` — BCI Rule 36 and Advocates Act 1961 professional disclaimer
- `/sitemap.xml` — Dynamic XML sitemap (drafts and admin routes strictly excluded)
- `/robots.txt` — Dynamic search engine crawler instructions

### Protected Admin Routes
- `/admin/login` — Private administrator login
- `/admin` — Protected Dashboard overview & compliance checklist
- `/admin/enquiries` — Consultation enquiry queue & retention controls
- `/admin/articles` — Legal articles CMS (Draft / Reviewed / Published)
- `/admin/articles/new` — Article editor with live markdown preview
- `/admin/articles/[id]/edit` — Article editing & review workflow
- `/admin/settings` — Verification toggles & BCI feature flags

---

## 6. Verification and Testing

Execute the test suites:

```powershell
# TypeScript strict type checking
npx tsc --noEmit

# Automated verification test suite
node scripts/verify-suite.mjs

# Production build verification
npm run build
```

---

## 7. Production Deployment Instructions

1. **Environment Variables**: Populate all production keys in hosting dashboard (Vercel, Railway, or AWS):
   - `MONGODB_URI`: Production MongoDB Atlas connection URI with strong credentials.
   - `ADMIN_SESSION_SECRET`: Minimum 32-character cryptographically random secret (`openssl rand -base64 32`).
   - `NEXT_PUBLIC_APP_URL`: Production domain with `https://`.
   - `ENABLE_PUBLIC_ENQUIRIES`: Set to `true` only after advocate formal approval.
   - `ENABLE_WHATSAPP_CHAT`: Set to `true` only after number verification.
2. **Database Indexes**: The MongoDB driver will maintain indexes on `{ slug: 1 }` and `{ retentionExpiresAt: 1 }`.
3. **Build**: Run `npm run build` to generate the standalone deployment artifact.
