# Eazy Cyber Agent - Project Structure Documentation

## 📁 Project Overview

This is a **Next.js 15** application using the **App Router** architecture, TypeScript, and a bilingual (Arabic/English) content management system.

### Technology Stack

- **Framework**: Next.js 15.5.0 (React 19.2.0)
- **Language**: TypeScript 5.x
- **Database**: MySQL 8+ (Aiven Cloud) with Prisma ORM
- **Authentication**: JWT + bcryptjs
- **Styling**: SCSS + Bootstrap + Animate.css
- **Icons**: Boxicons + Flaticon
- **Package Manager**: npm

---

## 📂 Directory Structure

```
d:\my projects\Eazy/
│
├── 📁 .claude/              # Claude CLI configuration
├── 📁 database/             # Database schemas and SQL files
│   ├── schema.sql          # Main database schema
│   ├── admin-schema.sql    # Admin-specific tables
│   └── sample-consultations.sql
│
├── 📁 libs/                 # Shared libraries
│   └── menus.tsx           # Menu configuration
│
├── 📁 prisma/               # Prisma ORM configuration
│   └── schema.prisma       # Database schema definition
│
├── 📁 public/               # Static assets (served publicly)
│   ├── 📁 fonts/           # Web fonts (Boxicons, Flaticon)
│   ├── 📁 img/             # Images organized by section
│   │   ├── 📁 blog/        # Blog post images
│   │   ├── 📁 industries/  # Industry sector images
│   │   ├── 📁 services/    # Service category images
│   │   └── 📁 team/        # Team member photos
│   ├── 📁 uploads/         # User-uploaded content
│   │   └── 📁 blog/        # Blog post uploads
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
│
├── 📁 src/                  # Source code
│   │
│   ├── 📁 app/             # Next.js App Router (pages & API routes)
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── not-found.tsx   # 404 page
│   │   ├── providers.tsx   # Client-side providers
│   │   │
│   │   ├── 📁 admin/       # Admin panel
│   │   │   ├── page.tsx    # Dashboard
│   │   │   ├── 📁 blog/    # Blog management
│   │   │   ├── 📁 users/   # User management
│   │   │   └── 📁 consultations/
│   │   │
│   │   ├── 📁 api/         # API routes
│   │   │   ├── 📁 auth/    # Authentication endpoints
│   │   │   ├── 📁 admin/   # Admin API endpoints
│   │   │   ├── 📁 blog/    # Public blog API
│   │   │   └── 📁 contacts/
│   │   │
│   │   ├── 📁 blog/        # Blog pages
│   │   ├── 📁 about/       # About section
│   │   ├── 📁 services/    # Services page
│   │   ├── 📁 industries/  # Industries page
│   │   ├── 📁 vision-2030/ # Vision 2030 page
│   │   ├── 📁 contact/     # Contact page
│   │   └── 📁 sign-in/     # Authentication pages
│   │
│   ├── 📁 components/      # React components (95 files)
│   │   ├── 📁 About/       # About section components
│   │   ├── 📁 Admin/       # Admin panel components
│   │   ├── 📁 Auth/        # Authentication forms
│   │   ├── 📁 Blog/        # Blog components
│   │   ├── 📁 Common/      # Shared/reusable components
│   │   ├── 📁 Home/        # Home page components
│   │   ├── 📁 Layouts/     # Layout components (Navbar, Footer)
│   │   └── ... (other sections)
│   │
│   ├── 📁 context/         # React Context providers
│   │   ├── LangContext.tsx # Language/i18n context
│   │   └── ScrollSpyContext.tsx
│   │
│   ├── 📁 hooks/           # Custom React hooks
│   │   ├── useAdminLang.ts # Admin language hook
│   │   ├── useLazyLoad.ts  # Lazy loading hook
│   │   └── useScrollSpy.ts
│   │
│   ├── 📁 i18n/            # Internationalization
│   │   ├── index.ts        # i18n configuration
│   │   └── 📁 messages/
│   │       ├── ar.json     # Arabic translations
│   │       └── en.json     # English translations
│   │
│   ├── 📁 lib/             # Utility libraries
│   │   ├── auth.ts         # User authentication
│   │   ├── adminAuth.ts    # Admin authentication
│   │   ├── db.ts           # MySQL database connection
│   │   ├── prisma.ts       # Prisma client instance
│   │   ├── security.ts     # 🆕 Security utilities
│   │   └── performance.ts  # 🆕 Performance utilities
│   │
│   └── 📁 generated/       # Auto-generated Prisma files
│       └── 📁 prisma/      # Prisma Client (auto-generated)
│
├── 📁 styles/               # Global styles (SCSS)
│   ├── style.scss          # Main stylesheet
│   ├── responsive.scss     # Responsive styles
│   ├── _navbar-mobile.scss # Component-specific styles
│   └── ... (other partials)
│
├── 📄 Configuration Files
│   ├── .env                # Environment variables (NEVER COMMIT)
│   ├── .env.example        # Environment template
│   ├── .gitignore          # Git ignore rules
│   ├── middleware.ts       # Next.js middleware (i18n routing)
│   ├── next.config.js      # Next.js configuration
│   ├── package.json        # Dependencies & scripts
│   ├── tsconfig.json       # TypeScript configuration
│   └── README.md           # Project documentation
│
└── 📄 Documentation
    ├── PROJECT_STRUCTURE.md  # This file
    ├── VERCEL_DEPLOYMENT.md  # Deployment guide
    └── .env.example          # Environment variables template
```

---

## 🗂️ Key Directories Explained

### `/src/app/` - Application Pages & API Routes

Next.js 15 App Router structure:
- **Pages**: Files named `page.tsx` become routes
- **Layouts**: Files named `layout.tsx` wrap pages
- **API Routes**: Files named `route.ts` in `/api/` folders
- **Dynamic Routes**: `[param]` folders for dynamic segments

### `/src/components/` - React Components

Organized by feature/domain:
- **Common**: Reusable components across the app
- **Home**: Home page-specific components
- **Admin**: Admin panel components
- **Auth**: Authentication forms
- **Blog**: Blog-related components
- **Layouts**: Site-wide layouts (Navbar, Footer)

### `/src/lib/` - Utility Libraries

Core business logic and utilities:
- `auth.ts`: User authentication, JWT, password hashing
- `adminAuth.ts`: Admin role verification
- `db.ts`: MySQL database connection pool
- `prisma.ts`: Prisma ORM client
- `security.ts`: Rate limiting, input validation, file security
- `performance.ts`: Caching, lazy loading, optimization helpers

### `/src/i18n/` - Internationalization

Bilingual support (Arabic/English):
- Translation files in JSON format
- Context provider for language switching
- Middleware for locale routing

### `/public/` - Static Assets

Publicly accessible files:
- `/img/`: Organized by section (blog, services, industries)
- `/fonts/`: Web fonts
- `/uploads/`: User-uploaded content (gitignored)

---

## 🔐 Security Architecture

### Authentication Flow

```
User/Admin Login
   ↓
Credentials Validation (lib/auth.ts)
   ↓
JWT Token Generation (7-day expiry)
   ↓
HTTP-only Cookie Storage
   ↓
Middleware Verification on Protected Routes
```

### Security Features

✅ **Password Security**:
- bcrypt hashing with 12 salt rounds
- Strength validation (min 8 chars, uppercase, lowercase, numbers, special)
- Account lockout after 5 failed attempts (15-minute lock)

✅ **Rate Limiting** (NEW):
- Login: 5 attempts per 15 minutes
- Registration: 3 attempts per hour
- API calls: 100 per 15 minutes
- File uploads: 10 per hour

✅ **Input Validation**:
- Email format validation
- SQL injection prevention (parameterized queries)
- XSS prevention (HTML sanitization)
- Path traversal prevention (file uploads)

✅ **HTTP Security Headers**:
- Strict-Transport-Security (HTTPS enforcement)
- X-Frame-Options (clickjacking protection)
- Content-Security-Policy (XSS mitigation)
- X-Content-Type-Options (MIME sniffing protection)

---

## ⚡ Performance Optimizations

### Image Optimization

- **Next.js Image Component**: Automatic optimization
- **Modern Formats**: AVIF, WebP support
- **Responsive Images**: Multiple sizes for different devices
- **Lazy Loading**: Intersection Observer API

### Code Splitting

- **Route-based**: Automatic with App Router
- **Component-based**: Dynamic imports for heavy components
- **Vendor Splitting**: Separate chunks for libraries

### Caching Strategy

- **Static Assets**: 1-year cache with stale-while-revalidate
- **API Responses**: Configurable cache times (1min - 1 day)
- **HTML Pages**: 1 hour for static, 1 minute for dynamic

### Bundle Optimization

- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JS minification
- **Compression**: Gzip compression enabled

---

## 🗄️ Database Architecture

### Prisma ORM

**Connection**: MySQL 8+ on Aiven Cloud (SSL-enabled)

**8 Database Tables**:

1. **users**: User accounts (admin/user/moderator roles)
2. **sessions**: Active user sessions with JWT tokens
3. **blog_posts**: Bilingual blog content (draft/published/archived)
4. **blog_categories**: Blog categorization (bilingual)
5. **consultations**: Customer consultation requests
6. **contacts**: Contact form submissions
7. **activity_logs**: Admin action tracking
8. **website_settings**: Configurable site settings

### Query Optimization

- **Connection Pooling**: Max 10 connections
- **Parameterized Queries**: SQL injection prevention
- **Batch Operations**: Up to 1000 records
- **Pagination**: Default 20 items per page

---

## 🌍 Internationalization (i18n)

### Supported Languages

- **Arabic (ar)**: Default language (RTL)
- **English (en)**: Secondary language (LTR)

### Implementation

**Route Structure**:
```
/ → Redirects to /ar (default)
/ar → Arabic content
/en → English content
```

**Translation Files**:
- `src/i18n/messages/ar.json`
- `src/i18n/messages/en.json`

**Language Detection**:
1. Cookie (`NEXT_LOCALE`)
2. Accept-Language header
3. Default to Arabic

---

## 📦 Build & Deployment

### Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Build Process

```bash
prisma generate  # Generate Prisma Client
next build       # Build Next.js app
```

### Environment Variables

**Required**:
- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: JWT signing key
- `SITE_URL`: Site URL
- `NEXT_PUBLIC_SITE_URL`: Public site URL

**Optional**:
- `NEXT_PUBLIC_GA_ID`: Google Analytics
- `NEXT_PUBLIC_GTM_ID`: Google Tag Manager

See `.env.example` for full list.

---

## 🧪 Testing Strategy (Recommended)

### Unit Tests
- Test authentication logic
- Test input validation
- Test database queries

### Integration Tests
- Test API endpoints
- Test authentication flow
- Test file uploads

### E2E Tests
- Test user registration/login
- Test admin panel workflows
- Test blog post creation

**Recommended Tools**:
- Jest + React Testing Library
- Cypress or Playwright for E2E

---

## 📚 Best Practices

### Code Organization

✅ **Feature-based structure**: Group by domain
✅ **Separation of concerns**: Logic in `/lib`, UI in `/components`
✅ **Consistent naming**: PascalCase for components, camelCase for utilities
✅ **TypeScript**: Strong typing throughout

### Security

✅ **Never commit**: `.env` files, API keys, secrets
✅ **Validate all inputs**: Client and server-side
✅ **Use HTTPS**: Always in production
✅ **Update dependencies**: Regular security updates

### Performance

✅ **Lazy load**: Images and heavy components
✅ **Code split**: Route and component level
✅ **Optimize images**: Use modern formats (WebP, AVIF)
✅ **Cache strategically**: Static assets and API responses

### Accessibility

✅ **Semantic HTML**: Use proper HTML5 elements
✅ **ARIA labels**: For interactive elements
✅ **Keyboard navigation**: Full keyboard support
✅ **RTL support**: Proper Arabic text handling

---

## 🔄 Continuous Improvement

### TODO

- [ ] Add automated testing (Jest, Cypress)
- [ ] Implement Redis caching for API responses
- [ ] Add Sentry for error tracking
- [ ] Implement A/B testing framework
- [ ] Add automated image optimization pipeline
- [ ] Migrate all queries to Prisma ORM
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement webhooks for integrations

### Monitoring

- **Performance**: Web Vitals tracking
- **Errors**: Error logging and alerting
- **Security**: Failed login attempts monitoring
- **Usage**: Analytics integration (GA, GTM)

---

## 📞 Contact & Support

For questions or issues:
- Check project documentation
- Review code comments
- Contact development team

---

**Last Updated**: January 2025
**Version**: 1.8.0
