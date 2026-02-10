# 05 — IMPLEMENTATION ROADMAP: PHASED ACTION PLAN

> **Approach:** Fix foundation first, then layer improvements. Each phase should be completed fully before moving to the next. Every task is tagged with its pillar and estimated effort.

---

## PHASE 0: EMERGENCY FIXES (Day 1-2)
> **Goal:** Fix things that are actively broken or embarrassing. A visitor right now would see bugs.

| # | Task | Pillar | Effort | File(s) |
|---|---|---|---|---|
| 0.1 | **Fix gender dropdown bug** — Change `value={selectedCourseId}` to `value={formData.gender || ''}` and add `gender: ''` to initial formData state | ENG | 10 min | `enrollment/page.jsx` |
| 0.2 | **Fix blog detail hardcoded date** — Replace "12 Jan 2024" with `blog.publishedAt` using date formatter | ENG/SEO | 10 min | `blog/[slug]/page.jsx` |
| 0.3 | **Fix blog detail hardcoded tag** — Replace "Design" with `blog.tags[0]` or `blog.category` | ENG/SEO | 5 min | `blog/[slug]/page.jsx` |
| 0.4 | **Fix project detail hardcoded date/tag** — Same fix as blog | ENG/SEO | 10 min | `project/[id]/page.jsx` |
| 0.5 | **Remove stray semicolon** after Markdown component in blog detail (line 188) | ENG | 2 min | `blog/[slug]/page.jsx` |
| 0.6 | **Remove `border-4`** debug borders from enrollment and blog detail sections | UX | 5 min | `enrollment/page.jsx`, `blog/[slug]/page.jsx` |
| 0.7 | **Fix `h-screen` on CourseCard** — Change to `h-fit` or remove fixed height | UX | 5 min | `enrollment/CourseCard.jsx` |
| 0.8 | **Remove ALL `console.log`** statements from production code | ENG | 10 min | `mongodb.ts`, `enrollment/page.jsx` |
| 0.9 | **Fix MongoDB URI check** — Change `console.log` to `throw new Error(...)` | ENG | 5 min | `lib/mongodb.ts` |
| 0.10 | **Fix header `w-[100vw]`** — Change to `w-full` to prevent horizontal overflow | UX | 2 min | `header/index.jsx` |
| 0.11 | **Show hero CTA buttons on mobile** — Remove `hidden` class, make `flex` default | UX/BRAND | 5 min | `hero/index.jsx` |
| 0.12 | **Fix Zod `.nonempty()` deprecation** — Replace with `.min(1, "...")` | ENG | 5 min | `lib/enrollmentValidator.js` |
| 0.13 | **Fix typos in validator** — "educaton" → "education", "you" → "your" | ENG | 2 min | `lib/enrollmentValidator.js` |
| 0.14 | **Fix blogs page title** — "Quantum HashLink like to post" → proper professional title | SEO | 2 min | `blogs/page.jsx` |

**Total Phase 0:** ~1.5 hours

---

## PHASE 1: FOUNDATION (Week 1)
> **Goal:** Establish the engineering foundation — types, formatting, design tokens, semantic HTML.

### 1A. TypeScript Migration

| # | Task | Effort | Detail |
|---|---|---|---|
| 1.1 | Set `"strict": true` in `tsconfig.json` | 5 min | Will surface 100+ errors — expected |
| 1.2 | Create `src/types/index.ts` | 1 hr | Define interfaces: `MenuItem`, `TeamMember`, `BlogPost`, `Course`, `CourseDetail`, `Feature`, `Testimonial`, `ContactFormData`, `EnrollmentFormData`, `SectionTitleProps`, etc. |
| 1.3 | Rename all `.js`/`.jsx` → `.ts`/`.tsx` | 30 min | Batch rename, update imports |
| 1.4 | Fix all TypeScript errors | 3-4 hrs | Add types to all components, props, state, handlers |
| 1.5 | Add proper types to data files | 1 hr | Type all exported arrays/objects with defined interfaces |

### 1B. Linting & Formatting

| # | Task | Effort | Detail |
|---|---|---|---|
| 1.6 | Install & configure Prettier | 15 min | `.prettierrc` with rules: singleQuote, trailingComma, semi, printWidth |
| 1.7 | Enhance ESLint config | 30 min | Add `@typescript-eslint`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y` |
| 1.8 | Run `prettier --write` on entire codebase | 10 min | One-time format |
| 1.9 | Add `format` and `format:check` scripts to `package.json` | 5 min | |
| 1.10 | Install Husky + lint-staged | 20 min | Pre-commit hooks for lint + format |

### 1C. Semantic HTML & Accessibility Foundation

| # | Task | Effort | Detail |
|---|---|---|---|
| 1.11 | Add `<main>` element in `layout.tsx` | 5 min | Wrap `{children}` in `<main>` |
| 1.12 | Add skip-to-content link | 15 min | Hidden link that becomes visible on focus, jumps to `<main>` |
| 1.13 | Fix heading hierarchy | 30 min | CEO name h2→h3, Contact h4→h3, verify all pages |
| 1.14 | Add `aria-label` to `<nav>` elements | 10 min | Header nav, footer nav (add `<nav>` to footer) |
| 1.15 | Add `aria-hidden="true"` to decorative SVGs | 30 min | All background SVGs in Hero, Breadcrumb, Contact, Footer |
| 1.16 | Add `aria-expanded` to hamburger menu | 5 min | `aria-expanded={navbarOpen}` |

### 1D. Font & Design Token Setup

| # | Task | Effort | Detail |
|---|---|---|---|
| 1.17 | Implement `next/font/google` for Inter | 15 min | Replace CSS font-family with Next.js optimized font loading |
| 1.18 | Define typography scale in Tailwind config | 30 min | Custom `fontSize` entries: `heading-1`, `heading-2`, `heading-3`, `body`, `body-sm`, `caption` |
| 1.19 | Define spacing scale | 15 min | Section padding tokens: `section-sm`, `section-md`, `section-lg` |
| 1.20 | Standardize color usage | 20 min | Replace all hardcoded `pink-500`, `pink-400`, `pink-600`, `pink-700` with `primary` variants in Tailwind config |

**Total Phase 1:** ~12-15 hours

---

## PHASE 2: CONTENT & BRAND (Week 2)
> **Goal:** Replace all placeholder content, establish brand voice, add trust signals.

### 2A. Kill Lorem Ipsum

| # | Task | Effort | Detail |
|---|---|---|---|
| 2.1 | Write real Features section copy | 1 hr | Outcome-driven descriptions for all 6 services |
| 2.2 | Write real Projects section copy | 1 hr | Replace "Creative Agency" × 6 with real or realistic project descriptions |
| 2.3 | Write real Blog section paragraph | 15 min | Replace Lorem with "Insights and tutorials from our team" or similar |
| 2.4 | Write real Blogs page breadcrumb description | 10 min | Replace Lorem |
| 2.5 | Delete `blogData.jsx` | 5 min | Dead file — Contentlayer handles blog data now |
| 2.6 | Write real blog content | 2-4 hrs | Ensure existing 3 blogs have quality content (or write new ones) |

### 2B. Trust Signals

| # | Task | Effort | Detail |
|---|---|---|---|
| 2.7 | Create stats/trust strip component | 1 hr | "X+ Projects" / "Y+ Clients" / "Z+ Team Members" — below hero |
| 2.8 | Add real team social links | 30 min | Replace `#` with actual LinkedIn/GitHub/Twitter URLs |
| 2.9 | Add real CEO photo | 10 min | Replace `blog-01.jpg` placeholder |
| 2.10 | Upgrade testimonials | 1 hr | Add photos, company names, or remove section entirely |
| 2.11 | Get professional email domain | 30 min | Configure `hello@quantumhashlink.com` or similar |
| 2.12 | Create Privacy Policy page | 1-2 hrs | Real legal content at `/privacy` |
| 2.13 | Create Terms of Service page | 1-2 hrs | Real legal content at `/terms` |
| 2.14 | Fix footer dead links | 15 min | Point TOS/Privacy/About to real pages |

### 2C. Conversion Optimization

| # | Task | Effort | Detail |
|---|---|---|---|
| 2.15 | Fix CTA section dead links | 10 min | Point "Get Started" → `#contact`, "Explore Services" → `#features` |
| 2.16 | Reorder homepage sections | 30 min | Hero → Trust Strip → Features → Projects → How We Work → Video → Testimonials → CTA → Contact → Blog |
| 2.17 | Create "How We Work" section | 2 hrs | 3-4 step process visualization |
| 2.18 | Add WhatsApp floating button | 1 hr | Fixed position button linking to WhatsApp Business |
| 2.19 | Write unique value proposition | 30 min | Clear UVP in hero section |

**Total Phase 2:** ~15-20 hours

---

## PHASE 3: COMPONENT ARCHITECTURE & UX (Week 3)
> **Goal:** Build reusable UI system, fix all UX issues, add micro-interactions.

### 3A. UI Component Library

| # | Task | Effort | Detail |
|---|---|---|---|
| 3.1 | Create `Button` component | 1 hr | Variants: primary, secondary, outline, ghost. Sizes: sm, md, lg. With loading state. |
| 3.2 | Create `Input` component | 45 min | With label, error message, `aria-describedby` |
| 3.3 | Create `Textarea` component | 30 min | Same pattern as Input |
| 3.4 | Create `Select` component | 30 min | Same pattern as Input |
| 3.5 | Create `Card` component | 30 min | Consistent padding, radius, shadow variants |
| 3.6 | Create `Section` wrapper | 30 min | Standardized padding, background variants |
| 3.7 | Create `MarkdownRenderer` component | 1 hr | Extract from blog/project, make shared |
| 3.8 | Refactor all existing components to use UI primitives | 3-4 hrs | Replace inline styles with component usage |

### 3B. UX Fixes

| # | Task | Effort | Detail |
|---|---|---|---|
| 3.9 | Fix mobile navigation | 1.5 hrs | Full-screen overlay, backdrop, close-on-outside-click, close-on-route |
| 3.10 | Fix header logo text | 15 min | Show full "Quantum HashLink" or just logo mark consistently |
| 3.11 | Make team member info visible without hover | 45 min | Show name/role below card, keep social links on hover |
| 3.12 | Add mobile scroll indicators for team section | 30 min | Visual swipe hints or dot indicators |
| 3.13 | Fix hero paragraph width overflow | 10 min | Remove `w-96`, use `max-w-prose` or similar |
| 3.14 | Add `priority` to hero image | 5 min | LCP optimization |
| 3.15 | Add proper image `alt` texts everywhere | 30 min | Descriptive, context-rich alts |
| 3.16 | Add `sizes` prop to all `fill` images | 30 min | Help browser pick optimal image size |

### 3C. Micro-interactions

| # | Task | Effort | Detail |
|---|---|---|---|
| 3.17 | Add `whileInView` scroll animations | 2 hrs | Framer Motion on sections: fade-up on scroll into view |
| 3.18 | Add skeleton loading states | 1.5 hrs | Per-route skeletons for blog list, enrollment, course details |
| 3.19 | Add toast notification system | 1 hr | For form submissions — success/error toasts |
| 3.20 | Add button press feedback | 30 min | Subtle scale-down on click |
| 3.21 | Add form field focus animations | 30 min | Label float or border glow effect |

**Total Phase 3:** ~16-20 hours

---

## PHASE 4: SEO & PERFORMANCE (Week 4)
> **Goal:** Full SEO optimization, structured data, Core Web Vitals green.

### 4A. Meta & Schema

| # | Task | Effort | Detail |
|---|---|---|---|
| 4.1 | Add canonical URLs to all pages | 30 min | `alternates.canonical` in metadata |
| 4.2 | Add metadata to `/course-details/[id]` | 30 min | `generateMetadata` with title, description, OG |
| 4.3 | Add metadata to `/team-profile/[teamId]` | 30 min | Same |
| 4.4 | Fix OG image — create 1200x630 branded image | 1 hr | Design + optimize |
| 4.5 | Fix OG `type` on project pages | 5 min | "project" → "article" |
| 4.6 | Fix OG `url` on blog pages | 5 min | Points to image instead of page URL |
| 4.7 | Add `BlogPosting` JSON-LD schema to blog detail pages | 1 hr | Author, datePublished, dateModified, etc. |
| 4.8 | Add `Course` JSON-LD schema to course detail pages | 1 hr | Provider, description, instructor |
| 4.9 | Add `BreadcrumbList` schema to all sub-pages | 45 min | Structured breadcrumb data |
| 4.10 | Add `WebSite` schema with `SearchAction` | 30 min | Enables sitelinks search |
| 4.11 | Add project & team pages to sitemap | 30 min | Currently missing |
| 4.12 | Add Google Search Console verification | 10 min | Meta tag |

### 4B. Performance

| # | Task | Effort | Detail |
|---|---|---|---|
| 4.13 | Optimize logo PNG → SVG or <10KB PNG | 30 min | Current: 99KB |
| 4.14 | Optimize favicon | 15 min | Use `public/images/favicon.png` (326B) instead of 99KB ICO |
| 4.15 | Add `placeholder="blur"` to above-fold images | 30 min | Prevents CLS |
| 4.16 | Throttle header scroll listener | 15 min | `requestAnimationFrame` or `passive: true` |
| 4.17 | Add `loading` param to `next/dynamic` imports | 15 min | Skeleton loaders for lazy components |
| 4.18 | Evaluate bundle: Framer Motion usage | 1 hr | Replace with CSS animations where possible |
| 4.19 | Add security headers to `next.config.mjs` | 30 min | CSP, HSTS, X-Frame-Options, etc. |
| 4.20 | Configure trailing slash in `next.config.mjs` | 5 min | Consistency for SEO |

**Total Phase 4:** ~10-12 hours

---

## PHASE 5: PRODUCTION READINESS (Week 5)
> **Goal:** Testing, CI/CD, analytics, error tracking, deployment.

### 5A. Testing

| # | Task | Effort | Detail |
|---|---|---|---|
| 5.1 | Set up Jest + React Testing Library | 1 hr | Config, scripts, first test |
| 5.2 | Write unit tests for `enrollmentValidator` | 1 hr | All validation cases |
| 5.3 | Write unit tests for `rateLimit` | 30 min | Limit behavior |
| 5.4 | Write API route tests for enrollment | 1.5 hrs | Valid/invalid/rate-limited cases |
| 5.5 | Write component tests for `Button`, `Input` | 1 hr | Rendering, variants, interactions |
| 5.6 | Set up Playwright | 1 hr | Config + first E2E test |
| 5.7 | Write E2E test for enrollment flow | 1.5 hrs | Fill form → submit → verify success |
| 5.8 | Write E2E test for contact flow | 1 hr | Fill form → submit |

### 5B. CI/CD

| # | Task | Effort | Detail |
|---|---|---|---|
| 5.9 | Create `.github/workflows/ci.yml` | 1 hr | Lint → typecheck → test → build |
| 5.10 | Add branch protection rules doc | 15 min | PR required, CI must pass |
| 5.11 | Configure Vercel deployment | 30 min | Auto-deploy on main, preview on PR |

### 5C. Monitoring

| # | Task | Effort | Detail |
|---|---|---|---|
| 5.12 | Add Vercel Analytics | 15 min | `@vercel/analytics` package |
| 5.13 | Add Vercel Speed Insights | 15 min | `@vercel/speed-insights` package |
| 5.14 | Set up Sentry | 1 hr | Error tracking + source maps |
| 5.15 | Add Microsoft Clarity | 15 min | Free heatmaps + session replay |
| 5.16 | Add custom event tracking | 1 hr | CTA clicks, form submissions, enrollments |

### 5D. Documentation

| # | Task | Effort | Detail |
|---|---|---|---|
| 5.17 | Update README.md | 1 hr | Setup instructions, env vars, architecture overview, deployment |
| 5.18 | Create CONTRIBUTING.md | 30 min | Code style, PR process, branch naming |
| 5.19 | Add env validation with Zod | 1 hr | Build-time env validation, typed env access |

**Total Phase 5:** ~14-16 hours

---

## TOTAL ESTIMATED EFFORT

| Phase | Time | Focus |
|---|---|---|
| Phase 0: Emergency Fixes | ~1.5 hrs | Bugs & embarrassments |
| Phase 1: Foundation | ~12-15 hrs | TypeScript, lint, a11y, fonts |
| Phase 2: Content & Brand | ~15-20 hrs | Copy, trust, conversion |
| Phase 3: Components & UX | ~16-20 hrs | UI system, UX fixes, animations |
| Phase 4: SEO & Performance | ~10-12 hrs | Meta, schema, Core Web Vitals |
| Phase 5: Production Ready | ~14-16 hrs | Tests, CI/CD, analytics, docs |
| **TOTAL** | **~70-85 hours** | **Full production readiness** |

---

## PRIORITY MATRIX

```
                    HIGH IMPACT
                        │
         Phase 0        │        Phase 2
      (Bug fixes)       │     (Content/Brand)
                        │
  LOW EFFORT ───────────┼─────────── HIGH EFFORT
                        │
         Phase 1        │        Phase 3+4+5
      (Foundation)      │    (Architecture/SEO/Prod)
                        │
                    LOW IMPACT
```

**Do Phase 0 immediately.** Then Phase 1 and Phase 2 can run in parallel if there are separate people for engineering vs content. Phases 3-5 are sequential and build on earlier work.

---

## FILES REFERENCED IN THIS REPORT

For quick navigation, here's every file mentioned across all audit documents:

### Config Files
- `tsconfig.json` — TypeScript config (strict: false)
- `tailwind.config.mjs` — Tailwind theme
- `next.config.mjs` — Next.js config
- `eslint.config.mjs` — ESLint (minimal)
- `package.json` — Dependencies
- `contentlayer.config.ts` — Content schema
- `.env.example` — Environment variables
- `postcss.config.mjs` — PostCSS

### Layout & Global
- `src/app/layout.js` — Root layout (no `<main>`)
- `src/app/globals.css` — Global styles (broken font)
- `src/app/page.js` — Homepage
- `src/app/error.tsx` — Error boundary
- `src/app/not-found.tsx` — 404 page
- `src/app/loading.tsx` — Loading state
- `src/app/robots.ts` — Robots config
- `src/app/sitemap.ts` — Sitemap generator

### Pages
- `src/app/blog/[slug]/page.jsx` — Blog detail (hardcoded data, duplicated code)
- `src/app/blogs/page.jsx` — Blog list (bad title)
- `src/app/contact/page.jsx` — Contact page
- `src/app/enrollment/page.jsx` — Enrollment (gender bug)
- `src/app/enrollment/layout.jsx` — Enrollment layout
- `src/app/enrollment/CourseCard.jsx` — Course card (h-screen bug)
- `src/app/course-details/[id]/page.jsx` — Course detail (no meta)
- `src/app/project/[id]/page.jsx` — Project detail (duplicated code)
- `src/app/team-profile/[teamId]/page.jsx` — Team profile (no meta)

### Components
- `src/components/header/index.jsx` — Navigation (w-[100vw], no a11y)
- `src/components/header/menuData.tsx` — Menu config
- `src/components/hero/index.jsx` — Hero (hidden mobile CTAs)
- `src/components/hero/HeroBackground.jsx` — Decorative SVGs
- `src/components/hero/HeroImages.jsx` — **UNUSED FILE**
- `src/components/hero/Customtypewriter.jsx` — Typewriter (ignores props)
- `src/components/Features/index.jsx` — Features (Lorem)
- `src/components/Features/SingleFeature.jsx` — Feature card
- `src/components/Features/featuresData.jsx` — Feature data (JSX in data file)
- `src/components/team/index.jsx` — Team section (client, heavy)
- `src/components/projects/index.jsx` — Projects (placeholder data, inline card component)
- `src/components/video/index.jsx` — Video modal
- `src/components/testimonial/index.jsx` — Testimonials (fake-looking)
- `src/components/cta/index.jsx` — CTA (dead links)
- `src/components/contact/index.jsx` — Contact wrapper
- `src/components/contact/ContactForm.jsx` — Form (weak validation, inline components)
- `src/components/contact/ContactInfo.jsx` — Contact details
- `src/components/contact/ContactDecorations.jsx` — Decorative dots
- `src/components/blog/index.jsx` — Featured blogs
- `src/components/blog/SingleBlog.jsx` — Blog card
- `src/components/blog/blogData.jsx` — **DEAD FILE** (superseded by Contentlayer)
- `src/components/blog/RelatedPost.jsx` — Related post (exists but unused context)
- `src/components/blog/SharePost.jsx` — Share buttons (exists but unused context)
- `src/components/blog/TagButton.jsx` — Tag button (exists but unused context)
- `src/components/footer/index.jsx` — Footer
- `src/components/footer/FooterLinks.jsx` — Footer links (dead links)
- `src/components/footer/FooterSocialLinks.jsx` — Social links
- `src/components/footer/FooterDecorations.jsx` — Decorative SVGs
- `src/components/Common/SectionTitle.jsx` — Section heading
- `src/components/Common/Breadcrumb.jsx` — Breadcrumb (no schema)
- `src/components/Common/ScrollUp.tsx` — Scroll to top

### Lib & Data
- `src/lib/enrollmentValidator.js` — Zod schema (deprecated methods, typos)
- `src/lib/mongodb.ts` — DB connection (silent failure)
- `src/lib/rateLimit.ts` — Rate limiter (functional)
- `src/data/coursesMetaData.js` — Course list
- `src/data/courses/index.js` — Course details (dead exports)
- `src/data/teamMembersData.js` — Team list
- `src/data/interneesData.js` — Internees list
- `src/data/team/index.js` — Team CVs (dead exports)

### API
- `src/app/api/enrollment/route.ts` — Enrollment API (no sanitization)
