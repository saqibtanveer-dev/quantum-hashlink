# 03 — SEO DEEP DIVE: BRUTAL BREAKDOWN

> **Target:** Semantic HTML, schema markup, meta tags, OpenGraph, sitemap, fast performance, Core Web Vitals  
> **Current State:** Basic metadata exists in layout.js but riddled with gaps. Semantic HTML is weak. Schema is minimal. Multiple pages lack proper meta. Core Web Vitals are at risk.

---

## 1. SEMANTIC HTML — POOR

### 1.1 Missing Landmark Elements

**File:** `src/app/layout.js`

```jsx
<body>
  <Header />
  {children}
  <Footer />
</body>
```

**Missing:**
- **No `<main>` element** — The most critical landmark. Screen readers and crawlers use this to identify primary content. Every page's children should be wrapped in `<main>`.
- **No `<nav>` with `aria-label`** — The header has `<nav id="navbarCollapse">` but no `aria-label="Main navigation"`. Footer links have no `<nav>` at all.
- **No `role` attributes** on decorative SVGs — All background SVGs should have `role="presentation"` or `aria-hidden="true"`.

### 1.2 Section Heading Hierarchy — BROKEN

Google expects a clean `h1 → h2 → h3` flow on every page. Current homepage hierarchy:

```
<h1> "Quantum HashLink | ..." (Hero)
  <h2> "Main Features" (Features - SectionTitle)
    <h3> Feature titles (correct!)
  <h2> "Meet Our Team" (Team - SectionTitle)
    <h2> "Professor Sonia Rafaqat" (CEO name) ← WRONG: Should be h3
  <h2> "Our Recent Projects" (Projects)
    <h3> Project titles (correct!)
  <h2> "We are ready to help" (Video - SectionTitle)
  <h2> "Don't take our words..." (Testimonials)
    <h3> Testimonial names (correct!)
  <h2> "Let's Build Something Great Together" (CTA)
  <h2> "GET IN TOUCH WITH US" (Contact)
    <h4> Contact info titles ← WRONG: Skips h3
  <h2> "Our Latest Blogs" (Blog)
    <h3> Blog card titles ← But wrapped in <h3><Link> which is valid
```

**Issues:**
- CEO name is `<h2>` — should be `<h3>` under "Meet Our Team" section
- Contact uses `<h4>` for info items but skips `<h3>` level entirely
- Multiple pages have no `<h1>` — `/blogs` page jumps straight to Breadcrumb's `<h1>` but it says "Blog Grid" (generic)
- `/enrollment` uses `<h1>` "Course Enrollment" — OK but generic

### 1.3 Sections Lack Proper `<article>` and `<section>` Usage
- Blog cards should be wrapped in `<article>` elements
- Individual blog posts should be `<article>` with proper `<time>` elements
- Project cards should be `<article>` elements
- No `<time datetime="...">` element used anywhere — dates are plain `<p>` tags

### 1.4 Lists Are Not Semantic
- Projects filter tabs are `<ul><li><button>` — OK but should have `role="tablist"` with `role="tab"` on items
- Footer links correctly use `<ul><li>` — Good
- Feature cards are `<div>` grid — Should arguably be a `<ul>` of `<li>` items

---

## 2. META TAGS & OPEN GRAPH — PARTIAL

### 2.1 Root Layout Meta — GOOD START, NEEDS WORK

**File:** `src/app/layout.js`

**What's present (Good):**
- `title` with template pattern (`%s | Quantum HashLink`)
- `description` — Clear and relevant
- `keywords` — Present
- `openGraph` with title, description, url, images, locale, type
- `twitter` card with summary_large_image
- `robots` with proper indexing rules
- `authors`, `creator`, `publisher`

**What's missing:**
| Missing Meta | Impact | Detail |
|---|---|---|
| `alternates.canonical` | HIGH | No canonical URL set. Risk of duplicate content indexing. |
| `openGraph.images` dimensions | MEDIUM | Only one OG image (logo). Should be a proper 1200x630 OG image. |
| `icons` metadata | MEDIUM | No favicon configuration via Next.js metadata API. Using a 99KB ICO file. |
| `manifest` | LOW | No web app manifest for PWA readiness. |
| `category` | LOW | No website category meta. |
| `verification` | MEDIUM | No Google Search Console, Bing Webmaster verification tags. |

### 2.2 Per-Page Meta Coverage

| Page | Has Custom Meta? | Issues |
|---|---|---|
| `/` (Home) | ✅ Via layout.js | Good — inherits root meta |
| `/blogs` | ⚠️ Partial | Only `title`. No `description`, no `openGraph`, no `keywords`. |
| `/blog/[slug]` | ✅ Yes | Has `generateMetadata` with OG and Twitter. **BUT** no error handling — crashes if `blog` is `undefined` (invalid slug). |
| `/contact` | ✅ Yes | Good — full meta with OG and Twitter. |
| `/enrollment` | ✅ Via layout.jsx | Good — full meta. **BUT** the page itself is `"use client"` which means the layout.jsx metadata handles it. Works correctly. |
| `/course-details/[id]` | ❌ No | **Zero metadata.** No title, no description, no OG. Google will index these with generic titles. |
| `/project/[id]` | ✅ Yes | Has `generateMetadata`. Same crash risk if project not found (accesses `project.seo.keywords` without null check). |
| `/team-profile/[teamId]` | ❌ No | **Zero metadata.** No title, no description, no OG. |

### 2.3 OpenGraph Image Issues
- Current OG image is `/qhl_logo.png` (99KB, 512x512) — Should be a purpose-designed 1200x630 image
- Blog OG images use `blog.seo.image` but the `openGraph.url` is set to the image URL instead of the page URL — **BUG**
- Project OG has `type: "project"` which is **not a valid OpenGraph type**. Valid types: `website`, `article`, `profile`. Should be `article`.

---

## 3. STRUCTURED DATA / SCHEMA MARKUP — MINIMAL

### 3.1 What Exists

**File:** `src/app/layout.js` — Organization schema (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Quantum HashLink",
  "url": "https://quantum-hashlink.com",
  "logo": "...",
  "description": "...",
  "contactPoint": { ... },
  "address": { ... }
}
```

**Assessment:** Good start, but only covers Organization. A B2B tech site needs much more.

### 3.2 Missing Schema Types

| Schema Type | Page | Impact | Detail |
|---|---|---|---|
| `WebSite` with `SearchAction` | Home | HIGH | Enables Google sitelinks search box |
| `BreadcrumbList` | All sub-pages | HIGH | Breadcrumb component exists but no schema |
| `Article` / `BlogPosting` | `/blog/[slug]` | HIGH | Blogs should have full Article schema with author, datePublished, dateModified |
| `Course` | `/course-details/[id]` | HIGH | Google has rich results for courses — huge SEO win |
| `FAQPage` | Any page with FAQ | MEDIUM | If FAQ section is added, this enables rich results |
| `LocalBusiness` | Contact page | MEDIUM | Enables Google Maps knowledge panel |
| `Person` | `/team-profile/[teamId]` | LOW | Helps with people search |
| `Service` | Features/Services | MEDIUM | Define offered services for structured data |
| `Review` / `AggregateRating` | Testimonials | MEDIUM | If real, enables star ratings in search results |

### 3.3 Schema Implementation Notes
- Current JSON-LD is injected via `dangerouslySetInnerHTML` in `<head>` — Works but Next.js 15 has a cleaner `metadata.other` approach
- Schema should be page-specific, not just global Organization
- `contactPoint.telephone` format should be `+92-336-0000994` → `+923360000994` (E.164 format)

---

## 4. SITEMAP & ROBOTS — GOOD BUT INCOMPLETE

### 4.1 Sitemap (`src/app/sitemap.ts`)

**What's good:**
- Dynamic generation from Contentlayer blogs and courses
- Proper `changeFrequency` and `priority` values
- Includes static pages

**What's missing:**
| Missing | Impact |
|---|---|
| `/team-profile/[id]` pages | MEDIUM — Team profiles are indexable pages not in sitemap |
| `/project/[id]` pages | HIGH — Project detail pages not in sitemap |
| `lastModified` uses `new Date()` for static pages | LOW — Should use actual last modified dates, not current date on every build |

### 4.2 Robots (`src/app/robots.ts`)

```ts
rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
sitemap: 'https://quantum-hashlink.com/sitemap.xml',
```

**Assessment:** Clean and correct. Properly disallows API and Next.js internals.

---

## 5. CORE WEB VITALS — AT RISK

### 5.1 Largest Contentful Paint (LCP) — Risk: HIGH

**Potential LCP elements:**
- Hero heading text (good — text renders fast)
- Hero image (`/images/hero/9796308.png`) — **No `priority` prop**, no `sizes` attribute. Next.js won't preload it.
- Blog cover images — No `priority` on above-fold images

**Issues:**
- Hero image uses `fill` without `sizes` — Browser can't determine optimal image size
- No `next/font` optimization — Text rendering is blocked waiting for font
- `react-modal-video` CSS is imported as a side effect in Video component — Blocks rendering

### 5.2 First Input Delay (FID) / Interaction to Next Paint (INP) — Risk: MEDIUM

**Issues:**
- Header scroll listener fires every pixel — No `requestAnimationFrame`, `throttle`, or `passive: true` option
- Entire Team and Projects sections are client components — Large JS bundles for interactivity
- `Customtypewriter.jsx` accepts props but ignores them all — Hardcodes its own values internally. This is dead prop passing.
- Framer Motion is imported in multiple client components — Bundle size concern

### 5.3 Cumulative Layout Shift (CLS) — Risk: MEDIUM

**Issues:**
- No `width`/`height` on hero image using `fill` without container aspect ratio lock
- Blog card images use `aspect-[37/22]` — Good, this prevents CLS
- Video section uses `aspect-[77/40]` — Good
- Font loading without `next/font` — Will cause FOUT (Flash of Unstyled Text) = layout shift
- No `placeholder="blur"` on any images — Content jumps when images load

### 5.4 Bundle Size Concerns

| Package | Size Impact | Necessity |
|---|---|---|
| `framer-motion` | ~30KB gzipped | Used only for basic fade-in. Could use CSS animations. |
| `react-modal-video` | ~15KB + CSS | Used for ONE video modal. Could use native dialog/iframe. |
| `swiper` | ~40KB + CSS | Used only for testimonial slider. Could use simpler solution. |
| `react-icons` | Tree-shakeable but imported from multiple sets | OK if tree-shaking works |
| `react-simple-typewriter` | ~3KB | OK — lightweight |
| `react-markdown` + `remark-gfm` | ~25KB | Needed for blog/project content |

**Total unnecessary bundle:** ~85KB gzipped could potentially be saved by replacing heavy libraries with CSS/native solutions.

---

## 6. CONTENT SEO — WEAK

### 6.1 Blog Content Strategy
- Only 3 blogs exist in `src/content/blogs/`
- Blog titles are generic template content (based on `blogData.jsx` which still has Lorem)
- No internal linking strategy between blogs
- No author pages
- No blog category/tag pages — Tags exist in content but no `/tag/[tag]` routes
- No related posts functionality on blog detail page
- No reading time estimate
- No structured content (no proper headings within blog markdown for featured snippets)

### 6.2 Page Title SEO Quality

| Page | Title | SEO Quality |
|---|---|---|
| Home | "Quantum HashLink \| Modern Software Development & Tech Solutions" | ⚠️ OK but long (62 chars). Should be < 60. |
| Blogs | "Blog Page \| Quantum HashLink like to post quality and useful content" | ❌ Grammatically incorrect ("like" should be "likes"). Too long and unprofessional. |
| Contact | "Contact Us \| Quantum HashLink" | ✅ Good |
| Enrollment | "Course Enrollment \| Quantum HashLink" | ✅ Good |
| Blog Detail | "{title} \| Quantum HashLink" | ✅ Good pattern |

### 6.3 URL Structure
- `/blog/[slug]` — Good, uses slugs
- `/blogs` — Good
- `/course-details/[id]` — OK but `/courses/[id]` would be cleaner
- `/team-profile/[teamId]` — OK but `/team/[id]` would be cleaner and shorter
- `/project/[id]` — Good
- **No trailing slash consistency** — Not configured in `next.config.mjs`

---

## 7. IMPROVEMENT PLAN — SEO

### Phase 1: Critical
1. **Add `<main>` element** in layout.js
2. **Fix heading hierarchy** — Ensure h1 → h2 → h3 flow on every page
3. **Add canonical URLs** via `alternates.canonical` in metadata
4. **Add metadata to `/course-details/[id]`** — Currently has ZERO meta
5. **Add metadata to `/team-profile/[teamId]`** — Currently has ZERO meta
6. **Fix blog detail page** — Use actual `publishedAt` date, actual tags
7. **Fix OpenGraph `type`** — Project pages use invalid type "project", change to "article"
8. **Fix OpenGraph `url`** — Blog OG url points to image instead of page URL
9. **Add null checks** in `generateMetadata` for blog and project pages
10. **Fix blogs page title** — Remove grammatically incorrect copy

### Phase 2: Rich Results
11. **Add `BlogPosting` schema** to individual blog pages
12. **Add `Course` schema** to course detail pages
13. **Add `BreadcrumbList` schema** to all pages with Breadcrumb component
14. **Add `WebSite` schema** with SearchAction to homepage
15. **Add `LocalBusiness` schema** to contact page
16. **Create proper 1200x630 OG image** — Not just the logo
17. **Add Google Search Console verification** meta tag
18. **Add project pages and team pages to sitemap**

### Phase 3: Content SEO
19. **Implement blog tag/category pages** — `/blog/tag/[tag]`
20. **Add reading time to blog posts**
21. **Add author schema and author pages**
22. **Add structured FAQ section** with `FAQPage` schema
23. **Implement `next/font/google`** for Inter — Eliminates FOUT
24. **Add `priority` to hero image** and other above-fold images
25. **Add `sizes` prop** to all Next.js `Image` components using `fill`
26. **Configure trailing slash** in `next.config.mjs` for consistency
27. **Optimize favicon** — Create proper multi-size favicon from the logo, < 5KB
