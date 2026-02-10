# 04 — PERFORMANCE + ENGINEERING STANDARDS: BRUTAL BREAKDOWN

> **Target:** Production-ready, component-driven architecture, reusable UI components, type-safe (TypeScript), linting + formatting, env config, analytics integration, error boundaries, forms validation, API integration ready, deployment ready, CI/CD friendly  
> **Current State:** Prototype-grade. Mixed JS/TS, no strict types, no tests, no CI/CD, no analytics, no error tracking, copy-paste architecture, env vars unchecked.

---

## 1. TYPE SAFETY — EFFECTIVELY ZERO

### 1.1 TypeScript Config is Deliberately Loose

**File:** `tsconfig.json`

```json
"strict": false
```

This single setting disables ALL strict checks:
- `noImplicitAny` — OFF: Functions accept `any` without warning
- `strictNullChecks` — OFF: `null` and `undefined` pass everywhere silently
- `strictFunctionTypes` — OFF: Unsafe function assignments allowed
- `strictBindCallApply` — OFF
- `noImplicitThis` — OFF
- `alwaysStrict` — OFF

**Impact:** TypeScript is essentially JavaScript with extra file extensions. You get zero safety benefits.

### 1.2 Mixed File Extensions — Chaotic

| Extension | Count | Examples |
|---|---|---|
| `.js` | 3 | `layout.js`, `page.js`, `coursesMetaData.js`, all data files |
| `.jsx` | 25+ | All components, most pages |
| `.tsx` | 4 | `error.tsx`, `not-found.tsx`, `loading.tsx`, `ScrollUp.tsx`, `menuData.tsx` |
| `.ts` | 4 | `sitemap.ts`, `robots.ts`, `mongodb.ts`, `rateLimit.ts`, `route.ts` |

**Pattern:** Lib files are `.ts`, pages are `.js`/`.jsx`, error pages are `.tsx`, components are `.jsx` — No consistency whatsoever.

**Rule should be:** ALL files should be `.ts`/`.tsx` with `strict: true`. Period.

### 1.3 No Type Definitions Anywhere

| File | Missing Types |
|---|---|
| `header/index.jsx` | `navbarOpen`, `sticky`, `openIndex`, `handleSubmenu(index)` — all untyped |
| `ContactForm.jsx` | `state`, `formData`, `validate()`, `sendEmail()` — all untyped |
| `team/index.jsx` | `member`, `scroll(direction)` — untyped |
| `projects/index.jsx` | `ProjectsCard` props — untyped |
| `SectionTitle.jsx` | Props `title`, `paragraph`, `width`, `center`, `mb` — untyped |
| `SingleBlog.jsx` | `blog` prop — untyped |
| `Breadcrumb.jsx` | `pageName`, `description` — untyped |
| `CourseCard.jsx` | `selectedCourse` — untyped |
| All data files | Exported arrays/objects — no interfaces or types |

**Only typed files:** `mongodb.ts` (partial), `rateLimit.ts` (good), `route.ts` (minimal), `error.tsx` (Next.js default).

### 1.4 Required Actions for Type Safety

1. Set `"strict": true` in `tsconfig.json`
2. Rename ALL `.js`/`.jsx` files to `.ts`/`.tsx`
3. Define interfaces for all component props
4. Define types for all data structures (Team member, Blog, Course, etc.)
5. Create a `src/types/` directory with shared type definitions
6. Add `@types/react-modal-video` or declare module if no types exist
7. Type all event handlers, state, and refs

---

## 2. COMPONENT ARCHITECTURE — POOR

### 2.1 No Component Abstraction / Reusable UI Library

The project has ZERO reusable UI primitives. Every component reinvents basic elements:

**Buttons** — 7+ different inline Tailwind patterns (detailed in UX audit). Should be:
```
src/components/ui/Button.tsx — variants: primary, secondary, outline, ghost
```

**Input fields** — `ContactForm.jsx` defines `ContactInputBox` and `ContactTextArea` inline at the bottom of the file. `enrollment/page.jsx` has its own inline `<input>` patterns. Should be:
```
src/components/ui/Input.tsx
src/components/ui/Textarea.tsx
src/components/ui/Select.tsx
```

**Cards** — Blog cards, team cards, project cards, course cards all have different structures. Should have a base `Card` component.

**Section wrapper** — Every section repeats `<section className="py-8 md:py-10 lg:py-14 flex justify-center">`. Should be:
```
src/components/ui/Section.tsx — props: background, spacing variant
```

### 2.2 100+ Lines of Duplicated Markdown Renderer

**Files:** `src/app/blog/[slug]/page.jsx` (lines 83-184) and `src/app/project/[id]/page.jsx` (lines 96-197)

These two files contain an **identical** 100-line Markdown component configuration — same custom renderers for h1, h2, h3, p, ul, ol, li, blockquote, code, table, thead, tbody, tr, th, td.

**Should be:**
```
src/components/common/MarkdownRenderer.tsx — Single shared component
```

### 2.3 Data Files Mixed with Component Logic

- `featuresData.jsx` contains JSX (SVG icons) inside a data file — This means data files can't be used in server components without the SVGs
- `blogData.jsx` is defined inside `src/components/blog/` but is data, not a component
- `coursesMetaData.js` is in `src/data/` — Correct location
- `teamMembersData.js` is in `src/data/` — Correct location

**Pattern inconsistency:** Some data is in `src/data/`, some is inside component directories.

### 2.4 Index File Re-export Pattern Issues

**File:** `src/data/courses/index.js`

```js
export { pythonCourse } from './python';
// ... individual exports

import { pythonCourse } from './python';
// ... re-imports the same things

export const courseDetails = [ ... ];
```

The file both exports individually AND re-imports to create an array. The individual exports are never used anywhere — only `courseDetails` is imported. Dead code.

**File:** `src/data/team/index.js` — Same pattern. Individual exports + array export. Only array is used.

### 2.5 Component File Organization Issues

| Issue | Detail |
|---|---|
| Inconsistent naming | `Customtypewriter.jsx` (lowercase 't'), `SingleFeature.jsx` (PascalCase), `featuresData.jsx` (camelCase) |
| Components inside page files | `ProjectsCard` is defined inside `projects/index.jsx` (line 158). Should be its own file. |
| `ContactInputBox` & `ContactTextArea` inside `ContactForm.jsx` | Should be in `ui/` components |
| `HeroImages.jsx` exists but is NOT used | Dead file — Hero uses a direct `<Image>` tag instead |
| `blogData.jsx` inside components | Used nowhere after Contentlayer migration — Dead file |

---

## 3. FORMS & VALIDATION — WEAK

### 3.1 Contact Form

**File:** `src/components/contact/ContactForm.jsx`

| Issue | Severity |
|---|---|
| Email validation is just `.includes("@")` | HIGH — `@` alone passes. No regex, no proper validation. `test@` would pass. |
| Phone validation is `length < 7` | MEDIUM — Too loose. Accepts `1234567` with no format check. |
| No rate limiting on client side | MEDIUM — User can spam submissions. |
| EmailJS credentials are `NEXT_PUBLIC_*` env vars | HIGH — Public keys exposed in client bundle. This is by EmailJS design, but should be documented and monitored. |
| `form.useRef()` is declared but never used | LOW — Dead ref. |
| Error state handling inconsistency | MEDIUM — `success` is a string on success but `false` (boolean) on EmailJS failure. Type confusion. |
| No CSRF protection | LOW — Client-side form, but still best practice. |

### 3.2 Enrollment Form

**File:** `src/app/enrollment/page.jsx`

| Issue | Severity |
|---|---|
| **Gender select bound to `selectedCourseId`** | **CRITICAL BUG** — `value={selectedCourseId}` should be `value={formData.gender}` |
| `formData.course` not set on initial load | HIGH — Course dropdown starts with "Select a course" but `formData.course` is empty string `""`. Form submission with default selection sends empty course. |
| `formData.gender` never initialized | HIGH — Gender field not in initial state. First submission always fails Zod validation for gender. |
| `console.log(formData)` in handleEnroll | LOW — Debug statement in production. |
| `fieldErrors` not cleared on successful submission | MEDIUM — Old error messages persist. |
| `sucessMsg` typo | LOW — Variable named `sucessMsg` instead of `successMsg`. |

### 3.3 Zod Schema Issues

**File:** `src/lib/enrollmentValidator.js`

| Issue | Detail |
|---|---|
| `.nonempty()` is deprecated in Zod v3 | Should use `.min(1, "...")` instead |
| Phone regex `^\d{10,}$` | Doesn't allow common formats like `0300-1234567`, `+923001234567`, or spaces |
| No `.trim()` transforms | Whitespace-only inputs pass validation |
| No max length on any field | User can submit megabytes of text |
| Typo in error: "educaton" | `"Please fill in you educaton level"` — two typos: "you" → "your", "educaton" → "education" |

---

## 4. API DESIGN — MINIMAL BUT FUNCTIONAL

### 4.1 Enrollment API Route

**File:** `src/app/api/enrollment/route.ts`

**What's good:**
- Server-side Zod validation (defense in depth — validates on both client and server)
- Rate limiting via LRU cache (5 requests per minute per IP)
- Proper HTTP status codes (400, 429, 500)
- Uses `headers()` for IP extraction

**What's missing/wrong:**
| Issue | Severity | Detail |
|---|---|---|
| No CORS headers | LOW | Next.js API routes handle same-origin by default, but explicit CORS is better for future API consumers. |
| No request size limit | MEDIUM | No `bodyParser` config. User could send massive payloads. |
| No sanitization | HIGH | `parseResult.data` is inserted directly into MongoDB. No HTML/script sanitization. XSS risk if admin dashboard reads this data. |
| No duplicate check | MEDIUM | Same person can enroll multiple times for same course. |
| DB name is hardcoded | LOW | `client.db('enrollment')` — Should come from env config. |
| Only POST endpoint | LOW | No GET for checking enrollment status, no admin endpoints. |
| Error logging is console.error only | MEDIUM | No structured logging, no error tracking service. |

### 4.2 MongoDB Connection

**File:** `src/lib/mongodb.ts`

| Issue | Severity | Detail |
|---|---|---|
| Missing URI just logs, doesn't throw | **CRITICAL** | `if(!uri){ console.log("Connection To DB Failed") }` — App continues with `undefined` URI, crashes later with unclear error. Should `throw new Error(...)`. |
| `console.log("no global instance")` | LOW | Debug log in production. |
| No connection error handling | HIGH | `client.connect()` promise rejection is unhandled. |
| No connection pooling config | MEDIUM | Uses default MongoClient settings. Production should configure `maxPoolSize`, `minPoolSize`, connection timeouts. |
| Global type augmentation pattern | OK | `declare global { var _mongoClientPromise }` — Standard Next.js pattern for dev mode HMR. |

---

## 5. ERROR HANDLING — MINIMAL

### 5.1 Error Boundary

**File:** `src/app/error.tsx`

**What's good:**
- Exists (many projects don't have one)
- Has retry and go-home buttons
- Catches rendering errors

**What's missing:**
| Missing | Impact |
|---|---|
| No error reporting service (Sentry, LogRocket, etc.) | HIGH — Errors are lost to `console.error` |
| No error context (what page, what action) | MEDIUM — Can't diagnose issues |
| No user-friendly error codes | LOW — Shows generic "Something went wrong" |
| No route-specific error boundaries | MEDIUM — One error crashes entire page. Sub-sections should have their own boundaries. |

### 5.2 Not Found Page

**File:** `src/app/not-found.tsx`

**Assessment:** Good — clean design, links to home/blogs/contact. No issues.

### 5.3 Loading State

**File:** `src/app/loading.tsx`

**Issues:**
- Generic spinner for ALL routes — Should have content-specific skeleton loaders
- No route-specific loading states (e.g., blog list should show card skeletons)

### 5.4 Unhandled Error Scenarios

| Scenario | Current Behavior |
|---|---|
| Blog with invalid slug | `allBlogs.find()` returns `undefined` → Page crashes accessing `blog.title` |
| Project with invalid id | Same crash risk accessing `project.seo.keywords` |
| Team profile with invalid id | `member` is `undefined` → Page crashes accessing `member.image` |
| MongoDB connection failure | Silent failure, unclear error |
| EmailJS service down | Sets `success: false` but button still says "Send Message" — no retry guidance |
| Contentlayer build failure | Build crashes — no fallback content |

---

## 6. ENV CONFIGURATION — WEAK

### 6.1 Current Env Vars

**File:** `.env.example`

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
MONGODB_URI
NEXT_PUBLIC_BASE_URL
```

### 6.2 Issues

| Issue | Severity |
|---|---|
| No env validation at build time | HIGH — App builds fine with missing vars, crashes at runtime |
| No type-safe env access | MEDIUM — Direct `process.env.X` access with no type checking |
| `NEXT_PUBLIC_BASE_URL` defined but not used | LOW — `sitemap.ts` and `layout.js` hardcode `https://quantum-hashlink.com` |
| No environment-specific configs | MEDIUM — No `.env.development`, `.env.production` split |

**Required:** Use a library like `@t3-oss/env-nextjs` or Zod schema to validate env vars at build time:
```ts
// src/env.ts
import { z } from 'zod';
const envSchema = z.object({
  MONGODB_URI: z.string().url(),
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string().min(1),
  // ...
});
export const env = envSchema.parse(process.env);
```

---

## 7. LINTING & FORMATTING — BARE MINIMUM

### 7.1 Current Setup

**ESLint:** `eslint.config.mjs` — Only extends `next/core-web-vitals`. No custom rules, no TypeScript plugin, no import sorting, no accessibility linting.

**Prettier:** ❌ Does not exist. No `.prettierrc`, no formatting config. Code style is inconsistent:
- Some files use single quotes, some double quotes
- Some files have trailing commas, some don't
- Inconsistent semicolons
- No import ordering

### 7.2 Required Linting Setup

```
eslint-config-next (existing)
+ @typescript-eslint/eslint-plugin
+ @typescript-eslint/parser
+ eslint-plugin-import (import ordering)
+ eslint-plugin-jsx-a11y (accessibility)
+ prettier + eslint-config-prettier
+ .prettierrc with consistent rules
+ lint-staged + husky (pre-commit hooks)
```

---

## 8. TESTING — ZERO

| Test Type | Present? | Impact |
|---|---|---|
| Unit tests | ❌ | Can't verify business logic (validation, data transforms) |
| Component tests | ❌ | Can't verify rendering, interactions |
| Integration tests | ❌ | Can't verify API routes, form submissions |
| E2E tests | ❌ | Can't verify user flows |
| Visual regression | ❌ | Can't catch UI breakage |
| Accessibility tests | ❌ | Can't verify WCAG compliance |

**Required minimum:**
- Jest + React Testing Library for unit/component tests
- Playwright or Cypress for E2E
- `jest.config.ts` and test scripts in `package.json`
- At minimum: test the enrollment API route and form validation

---

## 9. CI/CD & DEPLOYMENT — ZERO

### 9.1 Current State
- No GitHub Actions workflow
- No `.github/workflows/` directory
- No Dockerfile
- No Vercel config (`vercel.json`)
- No deployment documentation
- `pnpm-lock.yaml` exists — good for reproducible builds

### 9.2 Required CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
- Checkout
- Install (pnpm)
- Lint (eslint)
- Type check (tsc --noEmit)
- Unit tests (jest)
- Build (next build)
- E2E tests (playwright)
- Deploy (Vercel / Netlify)
```

### 9.3 Deployment Readiness Checklist

| Item | Status |
|---|---|
| Environment variables documented | ⚠️ `.env.example` exists but incomplete |
| Build succeeds without warnings | ❌ Not verified — likely has TS/lint warnings |
| No `console.log` in production | ❌ Multiple instances |
| Error tracking configured | ❌ |
| Analytics configured | ❌ |
| Performance monitoring | ❌ |
| Security headers (CSP, HSTS, etc.) | ❌ Not configured in `next.config.mjs` |
| Image optimization configured | ✅ `formats: ['image/avif', 'image/webp']` |
| Compression enabled | ✅ `compress: true` |
| `poweredByHeader` disabled | ✅ `poweredByHeader: false` |

---

## 10. ANALYTICS INTEGRATION — ZERO

No analytics of any kind:
- No Google Analytics / GA4
- No Vercel Analytics
- No Vercel Speed Insights
- No Plausible / Umami / PostHog
- No event tracking on CTAs, form submissions, course selections
- No heatmap tools (Hotjar, Microsoft Clarity)

**Minimum required:**
1. Vercel Analytics (free, easy integration with Next.js)
2. Google Analytics 4 (for marketing team)
3. Microsoft Clarity (free heatmaps)
4. Custom event tracking on: CTA clicks, form submissions, course enrollments, blog reads

---

## 11. SECURITY — GAPS

| Issue | Severity | Detail |
|---|---|---|
| No security headers | HIGH | No CSP, HSTS, X-Frame-Options, X-Content-Type-Options in `next.config.mjs` |
| No input sanitization on API | HIGH | MongoDB injection risk (though Zod helps) — should sanitize HTML entities |
| `.env` is gitignored | ✅ Good | `.gitignore` correctly excludes `.env*` |
| No rate limiting on contact form | MEDIUM | Only enrollment API has rate limiting |
| EmailJS public key in client bundle | LOW | By design, but should be documented |
| External links missing `rel="noopener noreferrer"` | LOW | Some have it (footer), some don't (team section) |
| No Content Security Policy | MEDIUM | Allows any script/style/image source |

### Required Security Headers (next.config.mjs)

```js
headers: async () => [
  {
    source: '/:path*',
    headers: [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  },
],
```

---

## 12. CONTENTLAYER — FUNCTIONAL BUT OUTDATED

### 12.1 Current Usage
- Blog and Project content types defined
- SEO nested type — Good practice
- Computed URL fields

### 12.2 Issues

| Issue | Severity | Detail |
|---|---|---|
| `contentlayer` is unmaintained | HIGH | Original contentlayer is abandoned. Should migrate to `contentlayer2` (community fork) or `@content-collections/core`. |
| Computed URL is wrong | MEDIUM | `resolve: (blog) => '/src/content/${blog._raw.flattenedPath}'` — This generates a URL pointing to source directory, not a public URL. Should be `/blog/${blog.slug}`. |
| `projects/` content directory is empty | LOW | Document type defined but no content exists yet. |
| No draft field | MEDIUM | No way to write drafts without them being published. Should add `draft: boolean` field. |

---

## 13. IMPROVEMENT PLAN — ENGINEERING

### Phase 1: Foundation (Must-Do)
1. **Enable `strict: true`** in `tsconfig.json` and fix ALL type errors
2. **Rename all `.js`/`.jsx` to `.ts`/`.tsx`** — Full TypeScript migration
3. **Create `src/types/` directory** — Shared type definitions for all data structures
4. **Add Prettier** — `.prettierrc` with consistent formatting rules
5. **Enhance ESLint** — Add TypeScript, import, and a11y plugins
6. **Fix ALL bugs** identified in this report (gender dropdown, hardcoded dates, etc.)
7. **Remove ALL `console.log`** from production code
8. **Fix MongoDB connection** — Throw on missing URI, add error handling
9. **Add env validation** — Zod schema for all environment variables
10. **Fix Contentlayer computed URLs** — Point to actual page routes

### Phase 2: Architecture
11. **Create `src/components/ui/` directory** — Button, Input, Card, Section primitives
12. **Extract shared Markdown renderer** — Single component for blog + project
13. **Move all data files to `src/data/`** — Remove `blogData.jsx` from components
14. **Clean up dead files** — `HeroImages.jsx` (unused), `blogData.jsx` (superseded by Contentlayer)
15. **Add input sanitization** on API route
16. **Add security headers** in `next.config.mjs`
17. **Add proper error handling** for all dynamic pages (null checks)
18. **Add loading skeletons** per-route instead of generic spinner

### Phase 3: Production Readiness
19. **Set up Jest + React Testing Library** — At minimum test validation logic and API route
20. **Set up Playwright** — E2E test for enrollment flow
21. **Create GitHub Actions CI pipeline** — lint → typecheck → test → build
22. **Add Vercel Analytics** — or equivalent
23. **Add Sentry** — Error tracking and monitoring
24. **Add pre-commit hooks** — Husky + lint-staged for formatting/linting
25. **Create deployment documentation** — README with setup, env vars, deployment steps
26. **Migrate from contentlayer to contentlayer2** — Or alternative maintained solution
27. **Implement `next/font`** for font optimization
28. **Optimize bundle** — Replace heavy libraries (framer-motion for basic animations, react-modal-video, etc.) or ensure proper tree-shaking
