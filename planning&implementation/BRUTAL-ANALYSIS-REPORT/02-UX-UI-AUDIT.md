# 02 — UX/UI AUDIT: BRUTAL BREAKDOWN

> **Target:** Mobile-first responsive, strong typography scale, consistent components, clear section hierarchy, micro-interactions, accessible contrast  
> **Current State:** Desktop-first approach in many areas, no design system, inconsistent spacing/sizing, no accessibility standards, minimal micro-interactions

---

## 1. MOBILE-FIRST RESPONSIVENESS — MAJOR GAPS

### 1.1 Header / Navigation

**File:** `src/components/header/index.jsx`

| Issue | Severity | Detail |
|---|---|---|
| Mobile menu has no backdrop/overlay | HIGH | When `navbarOpen` is true, user can still scroll background. No overlay to indicate modal state. |
| No close-on-outside-click | MEDIUM | Clicking outside the mobile menu doesn't close it. User must tap the hamburger again. |
| No close-on-route-change cleanup | MEDIUM | `navbarToggleHandler` is called on link click, but submenu state (`openIndex`) isn't reset. |
| Logo text `"uantum HashLink"` hidden on mobile via `hidden lg:block` | HIGH | On mobile, user only sees a small 50x50 logo with NO text — no brand recognition. |
| No `aria-expanded` on hamburger | MEDIUM | Screen readers can't determine menu state. |
| Container uses `w-[100vw]` | HIGH | This causes horizontal overflow because it ignores scrollbar width. Should be `w-full`. |

### 1.2 Hero Section

**File:** `src/components/hero/index.jsx`

| Issue | Severity | Detail |
|---|---|---|
| CTA buttons are `hidden` on mobile | **CRITICAL** | `sm:flex ... hidden` — The TWO most important buttons on the entire site are invisible on mobile. This is a conversion killer. |
| Paragraph has `w-96` hardcoded | HIGH | `w-96 sm:w-auto` — On screens < 384px, text overflows horizontally. |
| Hero image is tiny on mobile (48x48 / `w-48 h-48`) | MEDIUM | Too small to make visual impact. |
| No `priority` on hero image | MEDIUM | Hero image is the LCP candidate but lacks `priority` prop for Next.js Image optimization. |

### 1.3 Team Section

**File:** `src/components/team/index.jsx`

| Issue | Severity | Detail |
|---|---|---|
| Horizontal scroll with no visual indicator on mobile | HIGH | Cards overflow horizontally but there's no scroll indicator, swipe hint, or arrow buttons on mobile. Only desktop gets the "scroll to right" text. |
| CEO image uses `blog-01.jpg` placeholder | HIGH | The CEO section literally uses a blog stock image. |
| Fixed heights `h-[35rem]`, `h-[33rem]` | MEDIUM | Fragile — content overflow on different screen sizes. |
| Internees section scroll (`scrollRef2`) has no scroll control | LOW | Only `scrollRef1` has scroll buttons. |

### 1.4 Enrollment Page

**File:** `src/app/enrollment/page.jsx`

| Issue | Severity | Detail |
|---|---|---|
| `border-4` on the section | LOW | Leaves a thick debug-looking border around the entire enrollment section. |
| Course card has `h-screen` | **CRITICAL** | `w-full h-screen lg:w-[30%]` — On mobile, the course card takes FULL VIEWPORT HEIGHT even if content is short. Massive empty space. |
| Form doesn't reset `fieldErrors` on new submission | MEDIUM | Old errors persist after retry. |
| Gender select bound to wrong state variable | **BUG** | `value={selectedCourseId}` instead of `formData.gender` — Gender dropdown shows course names. |
| `console.log(formData)` in production | LOW | Debug statement left in `handleEnroll`. |
| `loading` state not reset in `finally` block properly | MEDIUM | `setLoading(false)` is in `finally` but `setFieldErrors` early return doesn't call `setLoading(false)` after the `return` — Fixed: it does because `finally` runs regardless, but `fieldErrors` remain from previous attempts. |

### 1.5 Blog Detail Page

**File:** `src/app/blog/[slug]/page.jsx`

| Issue | Severity | Detail |
|---|---|---|
| `border-4` on the section | LOW | Same debug border issue. |
| Hardcoded date "12 Jan 2024" | **BUG** | Ignores `blog.publishedAt` — always shows wrong date. |
| Hardcoded tag "Design" | **BUG** | Ignores `blog.tags` — always shows "Design". |
| No blog sidebar, TOC, or related posts | MEDIUM | Single column with no navigation aids for long content. |
| Stray semicolon after Markdown component | LOW | Line 188: bare `;` renders as text on the page. |

### 1.6 Project Detail Page

**File:** `src/app/project/[id]/page.jsx`

| Issue | Severity | Detail |
|---|---|---|
| Same hardcoded date "12 Jan 2024" | **BUG** | Copy-pasted from blog detail. |
| Same hardcoded tag "Design" | **BUG** | Copy-pasted from blog detail. |
| Entire Markdown renderer is copy-pasted | HIGH | 100+ lines of identical code between blog and project pages. |

---

## 2. TYPOGRAPHY SCALE — NO SYSTEM

### 2.1 Font Loading Is Broken

**File:** `src/app/globals.css`

```css
body {
  font-family: Arial, Helvetica, sans-serif;  /* Line 25 */
}

@layer base {
  body {
    font-family: "Inter", sans-serif;  /* Line 36-37 */
  }
}
```

**Problems:**
- **"Inter" is never loaded.** No `@import`, no `<link>`, no `next/font/google`. The browser falls back to Arial.
- **Two competing `font-family` declarations.** The `@layer base` one wins due to cascade, but since Inter isn't loaded, the user sees Arial.
- **Next.js 15 best practice** is to use `next/font/google` for automatic font optimization, subsetting, and zero layout shift.

### 2.2 Heading Scale Is Inconsistent

| Component | Heading | Classes | Actual Size |
|---|---|---|---|
| Hero h1 | `text-3xl sm:text-left md:text-4xl lg:text-5xl` | 30px → 36px → 48px | OK range |
| SectionTitle h2 | `text-3xl sm:text-4xl md:text-[45px]` | 30px → 36px → 45px | Arbitrary `45px` |
| Projects h2 | `text-3xl sm:text-4xl md:text-[40px]` | 30px → 36px → 40px | Different from SectionTitle |
| Contact h2 | `text-[32px] sm:text-[40px] lg:text-[36px] xl:text-[40px]` | 32px → 40px → 36px → 40px | **SHRINKS at `lg` then grows again** |
| Blog detail h2 | `text-3xl sm:text-4xl` | 30px → 36px | Different again |

**Verdict:** There is NO typographic scale system. Each component defines its own arbitrary sizes, creating visual inconsistency across pages.

### 2.3 Body Text Inconsistency

| Component | Text Classes |
|---|---|
| SectionTitle paragraph | `text-base md:text-lg` |
| Hero paragraph | `text-base sm:text-lg md:text-xl` |
| Features paragraph | `text-base` |
| Contact paragraph | `text-base` |
| Blog detail body | `text-base sm:text-lg lg:text-base xl:text-lg` — **Shrinks at lg then grows** |

---

## 3. COMPONENT CONSISTENCY — NO DESIGN SYSTEM

### 3.1 Button Styles — 7+ Different Patterns

| Location | Button Style |
|---|---|
| Hero "Get Started" | `bg-primary rounded-md px-6 py-3` |
| Hero "Explore Services" | `border border-primary rounded-md px-6 py-3` |
| CTA "Get Started" | `bg-white text-primary rounded-md px-6 py-3` |
| CTA "Explore Services" | `border-2 border-white rounded-md px-6 py-3` |
| Projects "View Details" | `border border-stroke rounded-md py-[10px] px-7 text-sm` |
| Contact submit | `border border-primary bg-primary rounded p-3 w-full` |
| Enrollment submit | `bg-gradient-to-r from-pink-400 to-pink-700 rounded-lg px-5 py-2.5` |
| Course card "Learn More" | `bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg px-8 py-3` |
| 404 "Go Home" | `bg-primary rounded-lg px-8 py-3` |

**Verdict:** Zero button consistency. Different `border-radius` (`rounded-md` vs `rounded-lg` vs `rounded`), different padding, different color approaches (solid vs gradient vs outline). A design system should have `Button` component variants: `primary`, `secondary`, `outline`, `ghost`.

### 3.2 Card Styles — Inconsistent

- Blog cards use `rounded-sm bg-white shadow-one`
- Team cards use `rounded-lg shadow-lg`
- Project cards use `rounded-[10px]` with overlay card
- Course card uses `rounded-2xl shadow-lg` with gradient background
- Testimonial cards use `rounded-md bg-pink-500`

### 3.3 Section Spacing — Inconsistent

| Component | Vertical Padding |
|---|---|
| Features | `py-8 md:py-10 lg:py-14` |
| Team | `py-16 md:py-20 lg:py-28` |
| Projects | `py-8 md:py-10 lg:py-14` |
| Video | `py-8 md:py-10 lg:py-14` |
| Testimonials | `py-8 md:py-10 lg:py-14` |
| Contact | `py-20 lg:py-[120px]` — Different pattern |
| CTA | `py-8 md:py-16 lg:py-24` — Different pattern |
| Footer | `pt-16 md:pt-20 lg:pt-24` — No bottom padding |

Some use 3-step (`py-8 md:py-10 lg:py-14`), some use 2-step, some use arbitrary pixel values. No rhythm.

---

## 4. ACCESSIBILITY — NOT ADDRESSED

### 4.1 Critical Accessibility Issues

| Issue | WCAG Level | Detail |
|---|---|---|
| No `<main>` landmark | A | `layout.js` has `<body>` → `<Header>` → `{children}` → `<Footer>` with no `<main>` wrapper. Screen readers can't find main content. |
| No skip-to-content link | A | Users with assistive technology can't skip the navigation. |
| No focus indicators on custom buttons | AA | Project filter buttons, hamburger, video play button — no visible focus ring. |
| Image alt texts are generic | A | Hero image: "Hero illustration", Projects: all say "Projects", Blog: "image" |
| Color contrast not verified | AA | `text-body-color` (#788293) on white background — likely fails WCAG AA for normal text (ratio ~4.1:1, needs 4.5:1). |
| SVG icons have no `aria-label` | A | Feature icons, contact icons — purely decorative but not marked as `aria-hidden`. |
| Team hover-only interactions | A | Team member names/roles are ONLY visible on hover overlay — invisible to keyboard/touch users. |
| No ARIA on accordion | A | Course details accordion uses hidden radio inputs — no `role="tablist"` or ARIA attributes. |
| Form inputs have no `aria-describedby` for errors | A | Error messages exist but aren't linked to inputs for screen readers. |

---

## 5. MICRO-INTERACTIONS — MINIMAL

### 5.1 What Exists
- Framer Motion fade-in on team cards (basic `opacity: 0 → 1`)
- Typewriter effect in hero
- `hover:scale-105` on team cards
- Swiper coverflow effect on testimonials
- `hover:bg-opacity-90` on most buttons

### 5.2 What's Missing
- **No scroll-triggered animations** — Sections appear statically. Should use intersection observer or Framer Motion `whileInView`.
- **No page transition animations** — Hard cut between pages.
- **No skeleton loading states** — `loading.tsx` shows a spinner, but no content-shaped skeletons.
- **No hover animations on project cards** — Just static cards.
- **No button click feedback** — No press/ripple effect.
- **No form field focus animations** — Plain border color change only.
- **No success/error toast notifications** — Inline text only, not noticeable.
- **No smooth number counters** for stats (when added).
- **No parallax or scroll-linked decorative movement**.

---

## 6. IMPROVEMENT PLAN — UX/UI

### Phase 1: Foundation (Critical)
1. **Create a Design System file** — Define tokens: colors, spacing scale, typography scale, border-radius, shadows
2. **Build reusable `Button` component** — Variants: `primary`, `secondary`, `outline`, `ghost`, sizes: `sm`, `md`, `lg`
3. **Build reusable `Card` component** — Consistent padding, radius, shadow
4. **Fix font loading** — Use `next/font/google` for Inter (or chosen font)
5. **Add `<main>` element** in layout
6. **Show CTA buttons on mobile** in hero section
7. **Fix enrollment gender dropdown bug**
8. **Fix blog/project hardcoded dates and tags**
9. **Remove `border-4` debug borders** from enrollment and blog detail
10. **Fix `h-screen` on CourseCard** — Use `min-h-fit` or auto height

### Phase 2: Consistency
11. **Standardize section spacing** — Pick one scale: `py-16 md:py-20 lg:py-28` for all
12. **Standardize heading scale** — Define h1-h6 in Tailwind config or CSS layer
13. **Standardize container padding** — Currently varies: `px-4`, `px-4 lg:px-8`, `px-4 lg:px-12`, `px-4 lg:px-20`
14. **Extract Markdown renderer** into shared component — Eliminate 100+ line duplication
15. **Add proper alt texts** — Descriptive, context-rich alt attributes
16. **Add skip-to-content link**
17. **Add focus-visible rings** to all interactive elements
18. **Make team member info visible without hover** — Show name/role below image, keep overlay for social links

### Phase 3: Polish
19. **Add scroll-triggered section animations** via Framer Motion `whileInView`
20. **Add skeleton loading states** instead of spinner
21. **Add toast notification system** for form submissions
22. **Add page transition animations** via Next.js layout transitions
23. **Improve testimonials** — Star ratings, company logos, photo avatars
24. **Add a proper mobile navigation** — Full-screen overlay with smooth animation
25. **Implement dark mode** if brand supports it (infrastructure already partially exists in Tailwind config)
