# ⚡ PERFORMANCE OPTIMIZATION - Complete Guide

**Priority**: 🟡 HIGH  
**Impact**: User Experience, SEO Rankings, Conversion Rates

---

## 📊 CURRENT PERFORMANCE STATUS

### Lighthouse Scores (Estimated)
- **Performance**: ~60/100 ⚠️
- **Accessibility**: ~75/100 ⚠️
- **Best Practices**: ~70/100 ⚠️
- **SEO**: ~65/100 ⚠️

### Core Web Vitals (Estimated)
- **LCP** (Largest Contentful Paint): ~3.5s ❌ (Target: <2.5s)
- **FID** (First Input Delay): ~150ms ⚠️ (Target: <100ms)
- **CLS** (Cumulative Layout Shift): ~0.15 ⚠️ (Target: <0.1)

### Key Issues
- ❌ No image optimization strategy
- ❌ No code splitting
- ❌ Heavy bundle size (~500KB+)
- ❌ No lazy loading
- ❌ Unoptimized fonts
- ❌ No caching strategy

---

## 📋 ISSUE #1: IMAGE OPTIMIZATION

### Current Problems
```javascript
// ❌ BAD: No optimization
<Image src="/hero.png" fill />

// ❌ BAD: External images (slow)
<Image src="https://images.unsplash.com/..." width={500} height={400} />

// ❌ BAD: No sizes attribute
<Image src="/blog.jpg" width={600} height={400} />
```

### ✅ SOLUTION: Complete Image Optimization

**1. Hero Images (Above the Fold)**
```javascript
// src/components/hero/HeroImage.jsx
import Image from 'next/image';

export const HeroImage = () => (
  <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[500px] lg:h-[500px]">
    <Image 
      src="/images/hero/9796308.png"
      fill
      priority // ✅ Load immediately
      sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 500px"
      quality={90}
      alt="Quantum HashLink - Modern Software Development"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Generate with plaiceholder
    />
  </div>
);
```

**2. Blog/Project Images (Below the Fold)**
```javascript
// src/components/blog/SingleBlog.jsx
<Image 
  src={blog.coverImage}
  width={600}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  loading="lazy" // ✅ Lazy load
  alt={blog.title}
  placeholder="blur"
  blurDataURL={blog.blurDataURL}
  className="rounded-lg"
/>
```

**3. Team Member Images**
```javascript
// src/components/team/index.jsx
<Image 
  src={member.image}
  width={500}
  height={400}
  sizes="(max-width: 768px) 192px, 256px"
  quality={80}
  loading="lazy"
  alt={`${member.name} - ${member.role}`}
  className="object-cover w-full h-full rounded-sm"
/>
```

**4. Generate Blur Placeholders**

Install package:
```bash
pnpm add plaiceholder sharp
```

Create utility:
```javascript
// lib/getBlurDataURL.js
import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';
import path from 'path';

export async function getBlurDataURL(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    const file = await fs.readFile(fullPath);
    const { base64 } = await getPlaiceholder(file);
    return base64;
  } catch (error) {
    console.error('Error generating blur:', error);
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'; // Fallback
  }
}
```

**5. Update next.config.mjs**
```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'], // ✅ Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};
```

---

## 📋 ISSUE #2: BUNDLE SIZE OPTIMIZATION

### Current Issues
- Framer Motion loaded on every page (~100KB)
- Swiper loaded globally (~80KB)
- React Icons entire library (~50KB)
- No code splitting

### ✅ SOLUTION: Dynamic Imports & Code Splitting

**1. Dynamic Import Heavy Components**
```javascript
// src/app/page.js
import dynamic from 'next/dynamic';
import Hero from '@/components/hero';
import Features from '@/components/Features';

// ✅ Lazy load heavy components
const Testimonial = dynamic(() => import('@/components/testimonial'), {
  loading: () => <TestimonialSkeleton />,
  ssr: false, // Client-side only
});

const Projects = dynamic(() => import('@/components/projects'), {
  loading: () => <ProjectsSkeleton />,
});

const Video = dynamic(() => import('@/components/video'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Team />
      <Projects />
      <Video />
      <Testimonial />
      <Cta />
      <Contact />
      <FeaturedBlogs />
    </>
  );
}
```

**2. Lazy Load Swiper**
```javascript
// src/components/testimonial/index.jsx
'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// ✅ Load Swiper only when needed
const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), {
  ssr: false,
});

export default function TestimonialSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <TestimonialSkeleton />;
  }

  return (
    <Swiper {...swiperConfig}>
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          {/* Content */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

**3. Optimize React Icons**
```javascript
// ❌ BAD: Imports entire library
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

// ✅ GOOD: Import specific icons
import FaLinkedin from 'react-icons/fa/FaLinkedin';
import FaTwitter from 'react-icons/fa/FaTwitter';
import FaGithub from 'react-icons/fa/FaGithub';

// ✅ BETTER: Create icon component
// src/components/ui/Icon.jsx
export const Icon = ({ name, size = 20, className }) => {
  const icons = {
    linkedin: <svg width={size} height={size}>...</svg>,
    twitter: <svg width={size} height={size}>...</svg>,
    github: <svg width={size} height={size}>...</svg>,
  };
  return <span className={className}>{icons[name]}</span>;
};
```

**4. Optimize Framer Motion**
```javascript
// ❌ BAD: Import entire library
import { motion } from 'framer-motion';

// ✅ GOOD: Use LazyMotion
import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function Component() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Content
      </m.div>
    </LazyMotion>
  );
}
```

---

## 📋 ISSUE #3: FONT OPTIMIZATION

### Current Issues
```css
/* ❌ BAD: Generic fonts, no optimization */
font-family: Arial, Helvetica, sans-serif;
```

### ✅ SOLUTION: Next.js Font Optimization

```javascript
// src/app/layout.js
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // ✅ Prevent FOIT
  preload: true,
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
```

**Update Tailwind Config**:
```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

---

## 📋 ISSUE #4: NO CACHING STRATEGY

### Current Issues
- Blog data fetched on every request
- No ISR (Incremental Static Regeneration)
- No client-side caching

### ✅ SOLUTION: Implement Caching

**1. Static Generation with Revalidation**
```javascript
// src/app/blogs/page.jsx
export const revalidate = 3600; // ✅ Revalidate every hour

export default async function BlogsPage() {
  const blogs = allBlogs; // Cached for 1 hour
  return <BlogList blogs={blogs} />;
}
```

**2. Dynamic Routes with ISR**
```javascript
// src/app/blog/[slug]/page.jsx
export const revalidate = 3600; // ✅ ISR

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((b) => b.slug === slug);
  return <BlogContent blog={blog} />;
}
```

**3. API Route Caching**
```javascript
// src/app/api/courses/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const courses = await getCourses();
  
  return NextResponse.json(courses, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

**4. Client-Side Caching with SWR**
```bash
pnpm add swr
```

```javascript
// src/hooks/useCourses.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useCourses() {
  const { data, error, isLoading } = useSWR('/api/courses', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // 1 minute
  });

  return {
    courses: data,
    isLoading,
    isError: error,
  };
}
```

---

## 📋 ISSUE #5: NEXT.JS CONFIG OPTIMIZATION

### Current Config (Basic)
```javascript
// ❌ Minimal optimization
const nextConfig = {
  images: {
    remotePatterns: [...],
  },
};
```

### ✅ SOLUTION: Production-Ready Config

```javascript
// next.config.mjs
import { withContentlayer } from 'next-contentlayer';

const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compression
  compress: true,

  // Production optimizations
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'framer-motion', 'swiper'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(nextConfig);
```

---

## 📋 ISSUE #6: CSS OPTIMIZATION

### Current Issues
- Large CSS bundle
- Unused Tailwind classes
- No CSS purging strategy

### ✅ SOLUTION: Optimize Tailwind

**1. Update Tailwind Config**
```javascript
// tailwind.config.mjs
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Only include what you need
    },
  },
  plugins: [],
  
  // Production optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
  
  // Remove unused utilities
  safelist: [
    // Only safelist dynamic classes
    'bg-primary',
    'text-primary',
  ],
};
```

**2. Critical CSS Extraction**
```javascript
// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Inline critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .header { /* critical styles */ }
            .hero { /* critical styles */ }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 📋 ISSUE #7: JAVASCRIPT OPTIMIZATION

### ✅ SOLUTION: Reduce JS Execution Time

**1. Debounce Scroll Events**
```javascript
// src/components/header/index.jsx
import { useEffect, useState } from 'react';

const Header = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSticky(window.scrollY >= 80);
      }, 10); // Debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return <header className={sticky ? 'sticky' : ''}>{/* ... */}</header>;
};
```

**2. Use Intersection Observer**
```javascript
// src/hooks/useInView.js
import { useEffect, useState, useRef } from 'react';

export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

// Usage
const [ref, isInView] = useInView({ threshold: 0.1 });

return (
  <div ref={ref}>
    {isInView && <HeavyComponent />}
  </div>
);
```

---

## 📋 ISSUE #8: DATABASE OPTIMIZATION

### Current Issues
- No connection pooling
- No query optimization
- No caching layer

### ✅ SOLUTION: Optimize MongoDB

**1. Connection Pooling**
```typescript
// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  compressors: ['zlib'],
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

**2. Query Optimization**
```typescript
// lib/queries.ts
import clientPromise from './mongodb';

export async function getEnrollments(limit = 100) {
  const client = await clientPromise;
  const db = client.db('quantum-hashlink');
  
  return db.collection('enrollments')
    .find({})
    .project({ _id: 1, name: 1, course: 1, createdAt: 1 }) // Only needed fields
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}
```

---

## 🎯 PERFORMANCE CHECKLIST

### Week 1: Images & Fonts
- [ ] Add `priority` to hero images
- [ ] Add `sizes` attribute to all images
- [ ] Generate blur placeholders
- [ ] Implement next/font
- [ ] Update next.config.mjs image settings

### Week 2: Code Splitting
- [ ] Dynamic import Testimonial component
- [ ] Dynamic import Projects component
- [ ] Dynamic import Video component
- [ ] Lazy load Swiper
- [ ] Optimize React Icons imports

### Week 3: Caching & Optimization
- [ ] Add revalidate to blog pages
- [ ] Implement ISR for dynamic routes
- [ ] Add API route caching
- [ ] Setup SWR for client-side caching
- [ ] Optimize MongoDB connection pooling

### Week 4: Advanced Optimization
- [ ] Debounce scroll events
- [ ] Implement Intersection Observer
- [ ] Optimize Tailwind CSS
- [ ] Add bundle analyzer
- [ ] Performance monitoring

---

## 📊 EXPECTED RESULTS

### Lighthouse Scores
- **Performance**: 60 → 95+ ✅
- **Accessibility**: 75 → 95+ ✅
- **Best Practices**: 70 → 100 ✅
- **SEO**: 65 → 95+ ✅

### Core Web Vitals
- **LCP**: 3.5s → 1.2s ✅
- **FID**: 150ms → 50ms ✅
- **CLS**: 0.15 → 0.05 ✅

### Bundle Size
- **Before**: ~500KB
- **After**: ~280KB (-44%)

### Load Times
- **First Contentful Paint**: 2.5s → 1.0s
- **Time to Interactive**: 4.5s → 2.0s
- **Speed Index**: 3.8s → 1.8s

---

## 🔧 MONITORING & TESTING

### Tools
1. **Lighthouse CI** - Automated performance testing
2. **Web Vitals** - Real user monitoring
3. **Bundle Analyzer** - Bundle size analysis
4. **Chrome DevTools** - Performance profiling

### Setup Bundle Analyzer
```bash
pnpm add -D @next/bundle-analyzer
```

```javascript
// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
```

```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

---

**Next Document**: `04-SECURITY-PRODUCTION.md`
