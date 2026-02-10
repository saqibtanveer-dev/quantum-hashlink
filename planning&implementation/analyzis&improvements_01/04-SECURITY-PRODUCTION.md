# 🔐 SECURITY & PRODUCTION READINESS

**Priority**: 🔴 CRITICAL  
**Impact**: Data Security, User Trust, Legal Compliance

---

## 🚨 CRITICAL SECURITY VULNERABILITIES

### 1. EXPOSED CREDENTIALS IN .ENV FILE

**Severity**: 🔴 CRITICAL  
**Risk Level**: MAXIMUM

**Current Exposure**:
```env
# ⚠️ EXPOSED IN VERSION CONTROL
MONGODB_URI=mongodb+srv://quantumhashlink:quantum@cluster0.1ibqrk7.mongodb.net/...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_jdxkaam
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_yushna5
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=MINJJl2aEEqDV66s4
```

**Risks**:
- ❌ Database can be accessed by anyone
- ❌ EmailJS account can be abused
- ❌ Data breach possible
- ❌ Financial liability
- ❌ Reputation damage

### ✅ IMMEDIATE ACTIONS REQUIRED

**Step 1: Rotate All Credentials (DO THIS NOW)**

```bash
# 1. Change MongoDB password
# Login to MongoDB Atlas → Database Access → Edit User → Change Password

# 2. Regenerate EmailJS keys
# Login to EmailJS → Account → API Keys → Regenerate

# 3. Update .env with new credentials
MONGODB_URI=mongodb+srv://quantumhashlink:NEW_PASSWORD@cluster0...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=NEW_KEY
```

**Step 2: Remove from Git History**

```bash
# Check if .env is tracked
git status

# If tracked, remove it
git rm --cached .env
git commit -m "Remove .env from tracking"

# Remove from history (if already committed)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (CAUTION: Coordinate with team)
git push origin --force --all
```

**Step 3: Verify .gitignore**

```bash
# .gitignore
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local
```

**Step 4: Use Environment Variables Properly**

```javascript
// ✅ GOOD: Server-side only
const MONGODB_URI = process.env.MONGODB_URI;

// ❌ BAD: Exposed to client
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// ✅ GOOD: Use server actions
async function saveData(data) {
  'use server';
  const client = await connectDB(process.env.MONGODB_URI);
  // ...
}
```

---

## 📋 ISSUE #2: NO API RATE LIMITING

### Current Vulnerability
```typescript
// ❌ NO PROTECTION: Anyone can spam API
export async function POST(request: Request) {
  const body = await request.json();
  // Process enrollment...
}
```

**Risks**:
- DDoS attacks
- Resource exhaustion
- Database overload
- Increased costs

### ✅ SOLUTION: Implement Rate Limiting

**Install Dependencies**:
```bash
pnpm add lru-cache
```

**Create Rate Limiter**:
```typescript
// lib/rateLimit.ts
import { LRUCache } from 'lru-cache';

type RateLimitOptions = {
  interval: number;
  uniqueTokenPerInterval: number;
};

export function rateLimit(options: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        return isRateLimited ? reject() : resolve();
      }),
  };
}

// Create limiters for different endpoints
export const enrollmentLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export const contactLimiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});
```

**Apply to API Routes**:
```typescript
// app/api/enrollment/route.ts
import { NextResponse } from 'next/server';
import { enrollmentLimiter } from '@/lib/rateLimit';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Get IP address
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown';

    // Rate limit: 5 requests per minute per IP
    try {
      await enrollmentLimiter.check(5, ip);
    } catch {
      return NextResponse.json(
        { 
          status: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
          },
        }
      );
    }

    // Process request...
    const body = await request.json();
    
    // Validation and processing...
    
    return NextResponse.json({ 
      status: true, 
      message: 'Enrollment successful' 
    });

  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 📋 ISSUE #3: INSUFFICIENT INPUT VALIDATION

### Current Issues
```typescript
// ❌ Basic validation only
const validation = enrollmentSchema.safeParse(body);
```

### ✅ SOLUTION: Enhanced Validation

**Update Validation Schema**:
```typescript
// lib/enrollmentValidator.ts
import { z } from 'zod';

export const enrollmentSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .transform(val => val.trim()),
  
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .toLowerCase()
    .transform(val => val.trim()),
  
  contact: z.string()
    .regex(/^(\+92|0)?[0-9]{10}$/, 'Invalid phone number format')
    .transform(val => val.replace(/\s+/g, '')),
  
  course: z.string()
    .min(1, 'Course is required')
    .refine(
      (val) => ['python', 'javascript', 'react', 'nodejs'].includes(val),
      'Invalid course selection'
    ),
  
  dob: z.string()
    .refine((val) => {
      const date = new Date(val);
      const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      return age >= 13 && age <= 100;
    }, 'Invalid date of birth'),
  
  address: z.string()
    .min(10, 'Address too short')
    .max(500, 'Address too long')
    .transform(val => val.trim()),
  
  education: z.string()
    .min(5, 'Education details required')
    .max(200, 'Education details too long')
    .transform(val => val.trim()),
  
  courseType: z.enum(['ONLINE', 'PHYSICAL'], {
    errorMap: () => ({ message: 'Invalid course type' }),
  }),
  
  gender: z.enum(['Male', 'Female', 'Other'], {
    errorMap: () => ({ message: 'Invalid gender selection' }),
  }),
});

// Sanitization helper
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/[^\w\s@.-]/g, '') // Remove special chars except common ones
    .trim();
}
```

**Add Server-Side Sanitization**:
```typescript
// app/api/enrollment/route.ts
import { sanitizeInput } from '@/lib/enrollmentValidator';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Sanitize all string inputs
  const sanitizedBody = {
    ...body,
    name: sanitizeInput(body.name),
    address: sanitizeInput(body.address),
    education: sanitizeInput(body.education),
  };
  
  // Validate
  const validation = enrollmentSchema.safeParse(sanitizedBody);
  
  if (!validation.success) {
    return NextResponse.json(
      { 
        status: false, 
        errors: validation.error.flatten().fieldErrors 
      },
      { status: 400 }
    );
  }
  
  // Process validated data...
}
```

---

## 📋 ISSUE #4: NO ERROR HANDLING

### Current Issues
- No global error boundary
- No custom 404 page
- No error logging
- Poor error messages

### ✅ SOLUTION: Comprehensive Error Handling

**1. Global Error Boundary**

**File**: `src/app/error.tsx`
```typescript
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
    
    // Send to error tracking service (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
      // logErrorToService(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-8">
          We're sorry for the inconvenience. Our team has been notified and is working on a fix.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg text-left">
            <p className="text-sm text-red-800 font-mono">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**2. Custom 404 Page**

**File**: `src/app/not-found.tsx`
```typescript
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-primary px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <div className="relative w-64 h-64 mx-auto mb-8">
            <Image
              src="/images/404.svg"
              alt="Page not found"
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition font-semibold"
          >
            Go Home
          </Link>
          
          <Link
            href="/blogs"
            className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition font-semibold"
          >
            View Blogs
          </Link>
          
          <Link
            href="/contact"
            className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**3. API Error Handler**

**File**: `lib/apiErrorHandler.ts`
```typescript
import { NextResponse } from 'next/server';

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    return NextResponse.json(
      {
        status: false,
        message: error.message,
        code: error.code,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        status: false,
        message: process.env.NODE_ENV === 'production' 
          ? 'Internal server error' 
          : error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      status: false,
      message: 'An unexpected error occurred',
    },
    { status: 500 }
  );
}

// Usage in API routes
export async function POST(request: Request) {
  try {
    // Your logic...
    
    if (!data) {
      throw new APIError(404, 'Resource not found', 'NOT_FOUND');
    }
    
    return NextResponse.json({ status: true, data });
  } catch (error) {
    return handleAPIError(error);
  }
}
```

---

## 📋 ISSUE #5: NO CORS CONFIGURATION

### ✅ SOLUTION: Configure CORS

**File**: `middleware.ts`
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // CORS headers
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://quantum-hashlink.com',
    'https://www.quantum-hashlink.com',
  ];

  if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000');
  }

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## 📋 ISSUE #6: NO LOGGING & MONITORING

### ✅ SOLUTION: Implement Logging

**File**: `lib/logger.ts`
```typescript
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
}

class Logger {
  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    // Console output
    const logMethod = level === 'error' ? console.error : 
                     level === 'warn' ? console.warn : 
                     console.log;
    
    logMethod(JSON.stringify(entry));

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(entry);
    }
  }

  private sendToMonitoring(entry: LogEntry) {
    // Send to service like Sentry, LogRocket, etc.
    // fetch('/api/logs', { method: 'POST', body: JSON.stringify(entry) });
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, any>) {
    this.log('error', message, context);
  }

  debug(message: string, context?: Record<string, any>) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, context);
    }
  }
}

export const logger = new Logger();

// Usage
logger.info('User enrolled', { userId: '123', course: 'python' });
logger.error('Database connection failed', { error: err.message });
```

---

## 📋 ISSUE #7: NO CSRF PROTECTION

### ✅ SOLUTION: Implement CSRF Tokens

**File**: `lib/csrf.ts`
```typescript
import { cookies } from 'next/headers';
import crypto from 'crypto';

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function setCSRFToken(): string {
  const token = generateCSRFToken();
  cookies().set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return token;
}

export function verifyCSRFToken(token: string): boolean {
  const cookieToken = cookies().get('csrf-token')?.value;
  return cookieToken === token;
}

// Usage in API route
export async function POST(request: Request) {
  const csrfToken = request.headers.get('x-csrf-token');
  
  if (!csrfToken || !verifyCSRFToken(csrfToken)) {
    return NextResponse.json(
      { status: false, message: 'Invalid CSRF token' },
      { status: 403 }
    );
  }
  
  // Process request...
}
```

---

## 📋 ISSUE #8: DATABASE SECURITY

### ✅ SOLUTION: Secure Database Operations

**File**: `lib/db/secureQueries.ts`
```typescript
import clientPromise from '../mongodb';
import { logger } from '../logger';

export async function secureInsert(
  collection: string,
  data: Record<string, any>
) {
  try {
    const client = await clientPromise;
    const db = client.db('quantum-hashlink');
    
    // Add metadata
    const document = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      _version: 1,
    };
    
    const result = await db.collection(collection).insertOne(document);
    
    logger.info('Document inserted', {
      collection,
      documentId: result.insertedId,
    });
    
    return result;
  } catch (error) {
    logger.error('Database insert failed', {
      collection,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

export async function secureFind(
  collection: string,
  query: Record<string, any>,
  options: { limit?: number; skip?: number } = {}
) {
  try {
    const client = await clientPromise;
    const db = client.db('quantum-hashlink');
    
    // Sanitize query
    const sanitizedQuery = sanitizeMongoQuery(query);
    
    const result = await db
      .collection(collection)
      .find(sanitizedQuery)
      .limit(options.limit || 100)
      .skip(options.skip || 0)
      .toArray();
    
    return result;
  } catch (error) {
    logger.error('Database find failed', {
      collection,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

function sanitizeMongoQuery(query: Record<string, any>): Record<string, any> {
  // Remove dangerous operators
  const dangerousOps = ['$where', '$function', '$accumulator'];
  
  const sanitized = { ...query };
  
  for (const key of Object.keys(sanitized)) {
    if (dangerousOps.includes(key)) {
      delete sanitized[key];
    }
    
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeMongoQuery(sanitized[key]);
    }
  }
  
  return sanitized;
}
```

---

## 🎯 SECURITY CHECKLIST

### Immediate (Day 1)
- [ ] Rotate all exposed credentials
- [ ] Remove .env from Git
- [ ] Verify .gitignore
- [ ] Add rate limiting to API routes
- [ ] Create error.tsx and not-found.tsx

### Week 1
- [ ] Implement input validation
- [ ] Add input sanitization
- [ ] Setup error logging
- [ ] Configure CORS
- [ ] Add security headers

### Week 2
- [ ] Implement CSRF protection
- [ ] Secure database queries
- [ ] Add API authentication (if needed)
- [ ] Setup monitoring
- [ ] Add request logging

### Week 3
- [ ] Security audit
- [ ] Penetration testing
- [ ] Dependency vulnerability scan
- [ ] Setup automated security checks
- [ ] Document security procedures

---

## 📊 SECURITY METRICS

### Before
- Exposed credentials: ❌ Yes
- Rate limiting: ❌ No
- Input validation: ⚠️ Basic
- Error handling: ❌ Poor
- Logging: ❌ None
- CSRF protection: ❌ No

### After
- Exposed credentials: ✅ Secured
- Rate limiting: ✅ Implemented
- Input validation: ✅ Comprehensive
- Error handling: ✅ Complete
- Logging: ✅ Production-ready
- CSRF protection: ✅ Enabled

---

## 🔧 SECURITY TOOLS

### Recommended Tools
1. **npm audit** - Dependency vulnerabilities
2. **Snyk** - Security scanning
3. **OWASP ZAP** - Penetration testing
4. **Sentry** - Error tracking
5. **LogRocket** - Session replay

### Commands
```bash
# Check for vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit fix

# Update dependencies
pnpm update

# Security scan
npx snyk test
```

---

**Next Document**: `05-ARCHITECTURE-IMPROVEMENTS.md`
