# Eazy Cyber Agent - Complete Project Documentation
## Professional Cybersecurity & Digital Transformation Platform

**Version:** 1.8.0
**Last Updated:** November 16, 2025
**Company:** Eazy Cyber Agent, Saudi Arabia

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Platform Overview](#2-platform-overview)
3. [Key Features](#3-key-features)
4. [Admin Panel - Complete Feature Set](#4-admin-panel---complete-feature-set)
5. [Technical Architecture](#5-technical-architecture)
6. [Database Schema](#6-database-schema)
7. [Security Features](#7-security-features)
8. [API Documentation](#8-api-documentation)
9. [User Roles & Permissions](#9-user-roles--permissions)
10. [Deployment & Infrastructure](#10-deployment--infrastructure)

---

## 1. Executive Summary

**Eazy Cyber Agent** is an enterprise-grade, bilingual cybersecurity and digital transformation platform built for the Saudi market. The platform combines a public-facing website showcasing cybersecurity services with a comprehensive admin panel for content management, customer consultation tracking, and system administration.

### Platform Highlights

- **Bilingual Support**: Full Arabic (RTL) and English (LTR) support
- **Vision 2030 Alignment**: Saudi Arabia's digital transformation initiative
- **Enterprise Security**: Bank-grade security with JWT authentication, rate limiting, and audit trails
- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, MySQL 8+, Prisma ORM
- **Production Ready**: Deployed and tested for high-traffic scenarios

---

## 2. Platform Overview

### 2.1 Target Audience

**Primary Users:**
- **Government Entities**: Security for critical infrastructure
- **Financial Institutions**: Banking and financial security solutions
- **Healthcare Providers**: HIPAA-compliant security services
- **Educational Institutions**: Campus-wide cybersecurity
- **SMEs (Small & Medium Enterprises)**: Affordable security packages

### 2.2 Core Services Offered

#### Cybersecurity Services
- **Penetration Testing & Vulnerability Assessment**
- **Security Operations Center (SOC)**
- **Incident Response & Digital Forensics**
- **Security Training & Awareness Programs**
- **Compliance & Risk Management** (SAMA, NCA, GDPR)

#### AI Solutions
- **Machine Learning Model Development**
- **Natural Language Processing (Arabic & English)**
- **Computer Vision Applications**
- **Predictive Analytics**
- **AI-Powered Threat Detection**

#### Big Data & Analytics
- **Data Warehousing Solutions**
- **Real-time Analytics Platforms**
- **Business Intelligence Dashboards**
- **Data Science Consulting**

#### Cloud Computing & Hosting
- **Secure Cloud Infrastructure**
- **Hybrid Cloud Solutions**
- **Cloud Migration Services**
- **Managed Hosting Services**

#### Digital Transformation
- **Vision 2030 Compliance Consulting**
- **Digital Strategy Development**
- **Process Automation**
- **Legacy System Modernization**

#### SME-EAZY Program
- **Affordable Security Packages for SMEs**
- **Simplified Cybersecurity Solutions**
- **24/7 Support**
- **Scalable Infrastructure**

---

## 3. Key Features

### 3.1 Public Website Features

#### Homepage
- **Dynamic Hero Section** with animated statistics
- **Services Showcase** with interactive cards
- **Industry Solutions** carousel (Government, Finance, Healthcare, Education)
- **Vision 2030 Section** highlighting Saudi alignment
- **AI Solutions Preview** with feature highlights
- **Blog Preview** showing latest cybersecurity insights
- **Partners Section** displaying trusted collaborators
- **Contact CTA** for consultation requests

#### Service Pages
- **Detailed Service Descriptions** (AI, Cybersecurity, Big Data, Cloud)
- **Industry-Specific Solutions**
- **Pricing Plans** (Starter, Professional, Enterprise)
- **Service Consultation Form** with real-time validation

#### Blog System
- **Multi-layout Support** (Grid, Left Sidebar, Right Sidebar)
- **Category & Tag Filtering**
- **Search Functionality**
- **Social Sharing Integration**
- **Related Posts Suggestions**
- **View Tracking**
- **SEO Optimized** (Meta tags, Open Graph, Schema markup)

#### Additional Pages
- **About Us**: Company mission, vision, core values
- **Team**: Leadership and expert team members
- **Testimonials**: Client success stories
- **Vision 2030**: Saudi digital transformation alignment
- **FAQ**: Common questions and answers
- **Privacy Policy** & **Terms & Conditions**
- **Contact Us**: Multi-channel contact options

### 3.2 Bilingual Support

#### Language Features
- **Arabic (Default)**: Right-to-Left (RTL) layout
- **English**: Left-to-Right (LTR) layout
- **Seamless Language Switching**: Instant without page reload
- **Complete Translations**: All UI elements, content, and messages
- **Locale-aware Formatting**: Dates, numbers, currency

#### Translation Coverage
- Navigation menus
- Service descriptions
- Blog posts (title, content, excerpt)
- Form labels and validation messages
- Admin panel interface
- Error messages
- Email notifications

### 3.3 Performance Optimizations

- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Lazy Loading**: Intersection Observer for images and components
- **Code Splitting**: Route-based and component-based splitting
- **Caching Strategy**:
  - Static assets: 1 year
  - API responses: Configurable (short, medium, long)
  - Database query optimization
- **Font Optimization**: `next/font` with `display: swap`
- **Compression**: Gzip enabled for text assets
- **Connection Pooling**: Optimized MySQL connections (30 max, 15 idle)

### 3.4 SEO Features

- **Meta Tags**: Dynamic title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema.org JSON-LD markup
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling directives
- **Canonical URLs**: Duplicate content prevention
- **Alt Tags**: All images have descriptive alt text
- **Mobile-Friendly**: Responsive design tested on all devices

---

## 4. Admin Panel - Complete Feature Set

### 4.1 Dashboard Overview

The admin dashboard provides a comprehensive view of platform activity and key metrics.

#### Statistics Cards
- **Total Blog Posts**: Count of all blog entries
- **New Consultations**: Pending customer consultation requests
- **Total Consultations**: All consultation requests (all statuses)
- **Total Users**: Registered user count
- **Contact Messages**: Customer inquiries

#### Recent Activity
- **Recent Consultations** (Last 5):
  - Company name
  - Contact person
  - Email
  - Service type
  - Status badge
  - Submission date
  - Quick action buttons

- **Recent Blog Posts** (Last 5):
  - Title (English & Arabic)
  - Status (Draft, Published, Archived)
  - View count
  - Creation date
  - Quick edit link

#### Quick Actions
- **New Blog Post**: Direct link to blog editor
- **View Consultations**: Jump to consultation management
- **View Messages**: Check contact messages
- **User Management**: Access user administration

### 4.2 Blog Management

Complete content management system for blog posts.

#### Blog Posts List

**Features:**
- **Filtering**:
  - By status (All, Draft, Published, Archived)
  - By search (title, content)
  - By date range

- **Sorting**:
  - By creation date
  - By views
  - By title (alphabetically)

**Display Information:**
- Featured image thumbnail
- Title (both languages)
- Author name
- Category
- Tags (JSON array)
- Status badge with color coding
- View count
- Publication date
- Last update time

**Actions Per Post:**
- **Edit**: Modify post content
- **View**: Preview published post
- **Delete**: Remove post (with confirmation)
- **Publish/Unpublish**: Toggle publication status

#### Blog Post Editor

**Rich Text Editor Features:**
- Bilingual content entry (English & Arabic side-by-side)
- Title input (both languages)
- Slug generation (auto or manual)
- Excerpt/summary (both languages)
- Full content editor (HTML support)
- Featured image upload
- Category selection
- Tags input (comma-separated)
- Status selection (Draft, Published, Archived)
- SEO meta data fields
- Publication date/time picker

**Image Upload:**
- Drag-and-drop support
- File type validation (JPEG, PNG, WebP, AVIF)
- Size limit: 5MB
- Auto-resize and optimization
- Preview before upload
- Stored in `/public/uploads/blog/`

**Auto-save:**
- Drafts saved every 30 seconds
- Manual save button
- Unsaved changes warning

#### Blog Analytics
- View count tracking
- Popular posts report
- Category performance
- Tag usage statistics

### 4.3 Consultation Management

Manage customer consultation requests from the website.

#### Consultations List

**Filtering Options:**
- Status: Pending, Scheduled, Completed, Cancelled
- Service type: AI, Cybersecurity, Big Data, Cloud, etc.
- Date range
- Search by company name or contact person

**Display Information:**
- Company name
- Contact person name
- Email address
- Phone number
- Service type
- Budget range
- Description/requirements
- Preferred consultation date
- Status with color-coded badge
- Submission date
- IP address (for security tracking)

**Actions:**
- **View Details**: Full consultation information
- **Update Status**: Change to In Progress, Completed, Cancelled
- **Contact**: Direct email link
- **Export**: Download as CSV/PDF
- **Delete**: Remove (with confirmation)

#### Consultation Details View
- Complete form submission data
- Communication history
- Status change log
- Admin notes field
- Response templates
- Email notification trigger

#### Consultation Statistics
- Total consultations by service type
- Conversion rate (pending → completed)
- Average response time
- Monthly trends chart

### 4.4 User Management

Complete user administration with role-based access control.

#### Users List

**Display Columns:**
- ID
- Full name
- Email address
- Phone number
- Company
- Role (Admin, Moderator, User)
- Status (Active/Inactive)
- Last login date & IP
- Registration date
- Failed login attempts
- Account lock status

**Filtering:**
- By role (All, Admin, Moderator, User)
- By status (All, Active, Inactive)
- Search by name, email, or company

**User Statistics:**
- Total users
- Admins count
- Active users
- Inactive users

#### User Actions

**Create New User:**
- Full name (required)
- Email address (unique, validated)
- Password (strength requirements)
- Phone number
- Company
- Role assignment (Admin, Moderator, User)
- Active status toggle
- Email verification trigger

**Edit User:**
- Update profile information
- Change role
- Toggle active status
- Reset failed login attempts
- Unlock account

**Reset Password:**
- Admin can reset any user's password
- Minimum 8 characters
- Password confirmation required
- Activity logged for audit

**Delete User:**
- Soft delete (deactivate)
- Hard delete option
- Confirmation dialog
- Cascade delete related data option

#### User Activity Log
- Login history
- IP addresses
- Actions performed
- Timestamp tracking

### 4.5 Roles & Permissions Management

Simplified menu-based RBAC (Role-Based Access Control).

#### Roles List

**Default Roles:**
1. **Admin**:
   - Full system access
   - All menu items enabled
   - User management
   - Role management
   - System configuration

2. **Moderator**:
   - Content management
   - Dashboard access
   - Blog posts management
   - Consultations management
   - No user/role management

**Display Information:**
- Role name
- Description
- Menu access count (e.g., "5/5 menus")
- Active status
- Creation date
- User count assigned to role

**Actions:**
- **Edit Role**: Modify permissions
- **Delete Role**: Remove (only custom roles)

#### Role Editor

**Menu Access Configuration:**
Checkbox-based permission assignment:
- Dashboard
- Blog Posts
- Consultations
- Users Management
- Roles & Permissions

**Visual Feedback:**
- Checked boxes highlight in blue
- Active menu count displayed
- Changes preview before saving

**Role Properties:**
- Role name (required, unique)
- Description (required)
- Active status toggle
- Menu access JSON object

### 4.6 Activity Logs & Audit Trail

Complete audit trail of all admin actions.

#### Logged Actions:
- User login/logout
- Blog post create/edit/delete
- Consultation status changes
- User create/edit/delete
- Role modifications
- Password resets
- Permission changes
- Failed login attempts

#### Log Entry Details:
- User ID and name
- Action performed
- Entity type (user, blog_post, consultation, role)
- Entity ID
- Description
- IP address
- User agent (browser/device)
- Timestamp

#### Log Viewer Features:
- Filter by user
- Filter by action type
- Filter by date range
- Search by description
- Export to CSV
- Auto-cleanup old logs (configurable retention)

### 4.7 Admin Panel Interface Features

#### Navigation
- **Sidebar Menu**:
  - Dashboard (home icon)
  - Blog Management (article icon)
  - Consultations (calendar icon)
  - Users (people icon)
  - Roles & Permissions (shield icon)
  - Settings (gear icon)
  - Logout (sign-out icon)

- **Top Bar**:
  - Admin name and role
  - Language switcher (Arabic/English)
  - Notifications bell
  - Profile dropdown
  - Quick search

#### Design & UX
- **Color Scheme**: Professional cyber blue (#0EA5E9) with dark theme
- **Responsive Design**: Works on desktop, tablet, mobile
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Toast notifications
- **Confirmation Dialogs**: For destructive actions
- **Keyboard Shortcuts**: Common actions accessible via keyboard

#### Performance
- **Fast Page Loads**: Server-side rendering
- **Optimistic Updates**: UI updates before server response
- **Debounced Search**: Reduces unnecessary API calls
- **Pagination**: Large lists paginated for performance
- **Lazy Loading**: Components loaded on demand

---

## 5. Technical Architecture

### 5.1 Technology Stack

#### Frontend
- **Framework**: Next.js 15.5.0 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5.x
- **Styling**: SCSS + Bootstrap 5
- **Animations**: Custom CSS animations
- **Icons**: Boxicons
- **Image Carousel**: Swiper 11.1.1
- **Lightbox**: FSLightbox React 1.7.6
- **Tabs**: React Tabs 6.0.2
- **Accordion**: React Accessible Accordion 5.0.0

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Database**: MySQL 8+ (Aiven hosted)
- **ORM**: Prisma 6.19.0
- **Database Client**: mysql2 3.15.3

#### Authentication & Security
- **JWT**: jsonwebtoken 9.0.2
- **Password Hashing**: bcryptjs 3.0.3 (12 salt rounds)
- **Cookies**: HTTP-only, secure, SameSite
- **Rate Limiting**: Custom implementation
- **CSRF Protection**: Token-based

#### Development Tools
- **Package Manager**: pnpm 9.12.3
- **Linting**: ESLint 8
- **Type Checking**: TypeScript compiler
- **Build Tool**: Next.js build system

### 5.2 Project Structure

```
eazy-cybersecurity/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Root layout
│   │   ├── admin/               # Admin panel routes
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── blog/           # Blog management
│   │   │   ├── consultations/  # Consultation management
│   │   │   ├── users/          # User management
│   │   │   └── roles/          # Role management
│   │   ├── blog/               # Public blog pages
│   │   ├── services/           # Service pages
│   │   ├── contact/            # Contact page
│   │   ├── sign-in/            # Login page
│   │   ├── sign-up/            # Registration page
│   │   └── api/                # API routes
│   │       ├── auth/           # Authentication endpoints
│   │       ├── blog/           # Blog API
│   │       ├── admin/          # Admin API
│   │       └── consultations/  # Consultation API
│   │
│   ├── components/              # React components (98 files)
│   │   ├── Admin/              # Admin panel components
│   │   ├── Home/               # Homepage sections
│   │   ├── Blog/               # Blog components
│   │   ├── Common/             # Shared components
│   │   ├── Layouts/            # Layout components
│   │   ├── Auth/               # Authentication forms
│   │   └── [Features]/         # Feature-specific components
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── auth.ts             # Authentication utilities
│   │   ├── db.ts               # Database connection
│   │   ├── security.ts         # Security utilities
│   │   ├── performance.ts      # Performance optimization
│   │   ├── adminAuth.ts        # Admin authentication
│   │   └── permissions.ts      # Permission checking
│   │
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript type definitions
│   ├── i18n/                    # Internationalization
│   │   └── messages/           # Translation files
│   │       ├── ar.json         # Arabic translations
│   │       └── en.json         # English translations
│   └── context/                # React Context providers
│
├── public/                      # Static assets
│   ├── img/                    # Images
│   ├── uploads/                # User-uploaded files
│   ├── fonts/                  # Custom fonts
│   └── favicon.ico            # Site icon
│
├── styles/                      # Global styles
│   ├── globals.scss           # Global styles
│   ├── bootstrap.scss         # Bootstrap customization
│   └── [pages]/               # Page-specific styles
│
├── database/                    # Database files
│   └── complete-migration.sql  # Database schema
│
├── prisma/                      # Prisma ORM
│   └── schema.prisma          # Database schema
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── README.md                   # Documentation
```

### 5.3 Architecture Patterns

#### Server-Side Rendering (SSR)
- Homepage and service pages pre-rendered
- SEO optimization
- Fast initial page load

#### Client-Side Rendering (CSR)
- Admin panel (requires authentication)
- Interactive forms
- Real-time updates

#### API Design
- RESTful API endpoints
- JSON request/response
- Consistent error handling
- Versioning support

#### State Management
- React hooks (useState, useEffect, useContext)
- Server-side data fetching
- Optimistic UI updates

---

## 6. Database Schema

### 6.1 Tables Overview

The database consists of 6 main tables with the following relationships:

```
users (1) ----< (M) blog_posts
users (1) ----< (M) activity_logs
users (1) ----< (M) user_roles (M) >---- (1) roles
```

### 6.2 Users Table

Stores all user accounts (public users, moderators, admins).

```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(50),
  `company` varchar(255),
  `role` enum('user','admin','moderator') DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT 1,
  `failed_login_attempts` int DEFAULT 0,
  `last_failed_login` timestamp NULL,
  `locked_until` timestamp NULL,
  `last_login` timestamp NULL,
  `last_login_ip` varchar(45),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Indexes:**
- Primary key: `id`
- Unique: `email`
- Index: `is_active`

**Security Features:**
- Password hashed with bcrypt (12 rounds)
- Failed login attempt tracking
- Account lockout after 5 failed attempts (15 minutes)
- IP address logging

### 6.3 Blog Posts Table

Stores all blog content with bilingual support.

```sql
CREATE TABLE `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(500) NOT NULL,
  `title_ar` varchar(500) NOT NULL,
  `slug` varchar(500) NOT NULL UNIQUE,
  `excerpt` text,
  `excerpt_ar` text,
  `content` longtext NOT NULL,
  `content_ar` longtext NOT NULL,
  `featured_image` varchar(500),
  `author_id` int NOT NULL,
  `category` varchar(100),
  `tags` JSON,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `views` int DEFAULT 0,
  `published_at` timestamp NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
```

**Indexes:**
- Primary key: `id`
- Unique: `slug`
- Index: `slug`, `status`, `author_id`, `created_at`

**Features:**
- Bilingual content (English & Arabic)
- SEO-friendly slugs
- Category and tag support (JSON array)
- View tracking
- Draft/Published/Archived workflow

### 6.4 Consultations Table

Stores customer consultation requests from the website.

```sql
CREATE TABLE `consultations` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `company_name` varchar(255) NOT NULL,
  `contact_person` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `service_type` varchar(100),
  `budget` varchar(50),
  `description` text,
  `preferred_date` date,
  `status` enum('pending','scheduled','completed','cancelled') DEFAULT 'pending',
  `ip_address` varchar(45),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Indexes:**
- Primary key: `id`
- Index: `email`, `status`, `created_at`

**Service Types:**
- ai-solutions
- cybersecurity
- big-data
- cloud-computing
- sme-eazy
- digital-transformation
- vision-2030
- security-training
- other

### 6.5 Activity Logs Table

Comprehensive audit trail of all admin actions.

```sql
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `action` varchar(100) NOT NULL,
  `entity_type` varchar(50),
  `entity_id` int,
  `description` text,
  `ip_address` varchar(45),
  `user_agent` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- Primary key: `id`
- Index: `user_id`, `action`, `created_at`, `entity_type+entity_id`

**Logged Actions:**
- login, logout
- create_user, update_user, delete_user
- create_post, update_post, delete_post, publish_post
- update_consultation, delete_consultation
- update_role, delete_role
- reset_password

### 6.6 Roles Table

Simplified RBAC with menu-based permissions.

```sql
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL UNIQUE,
  `description` text,
  `menu_access` JSON DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**menu_access JSON Structure:**
```json
{
  "dashboard": true,
  "blog": true,
  "consultations": true,
  "users": false,
  "roles": false
}
```

**Default Roles:**
- **admin**: All permissions enabled
- **moderator**: Dashboard, blog, consultations only

### 6.7 User Roles Table

Junction table for many-to-many user-role relationships.

```sql
CREATE TABLE `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `assigned_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `assigned_by` int DEFAULT NULL,
  UNIQUE KEY `unique_user_role` (`user_id`, `role_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`assigned_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);
```

### 6.8 Default Data

#### Admin User
```
Email: admin@eazycyber.sa
Password: Admin@Eazy
```
(Password should be changed immediately in production)

#### Sample Blog Posts
3 sample cybersecurity blog posts in English and Arabic

---

## 7. Security Features

### 7.1 Authentication

#### JWT (JSON Web Tokens)
- **Algorithm**: HS256
- **Expiration**: 7 days
- **Storage**: HTTP-only cookies
- **Payload**: userId, email, role
- **Refresh**: No refresh token (re-login required)

#### Password Security
- **Algorithm**: bcrypt
- **Salt Rounds**: 12 (2^12 = 4,096 iterations)
- **Minimum Length**: 8 characters
- **Requirements**:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (!@#$%^&*(),.?":{}|<>)

#### Session Management
- JWT stored in HTTP-only cookie (XSS protection)
- Secure flag in production (HTTPS only)
- SameSite=Strict (CSRF protection)
- No session on client-side localStorage (security best practice)

### 7.2 Rate Limiting

Protects against brute force attacks and API abuse.

#### Configuration

| Endpoint | Max Requests | Time Window |
|----------|--------------|-------------|
| Login | 5 | 15 minutes |
| Registration | 3 | 1 hour |
| Forgot Password | 3 | 1 hour |
| Contact Form | 5 | 1 hour |
| Consultation Form | 5 | 1 hour |
| File Upload | 10 | 1 hour |
| General API | 100 | 15 minutes |

#### Implementation
- In-memory storage (Map)
- IP-based identification
- Exponential backoff
- Clear error messages with retry time
- Auto-cleanup of expired entries

### 7.3 Account Lockout

Protects against credential stuffing and brute force attacks.

- **Trigger**: 5 failed login attempts
- **Duration**: 15 minutes
- **Counter Reset**: On successful login
- **IP Tracking**: Last failed login IP logged
- **Admin Override**: Admins can unlock accounts manually

### 7.4 Input Validation & Sanitization

#### Server-Side Validation
- **Email**: RFC 5322 compliant regex
- **Phone**: International format support
- **URLs**: Protocol and domain validation
- **File Upload**: Extension and MIME type checking
- **SQL Injection Prevention**: Parameterized queries (Prisma ORM)
- **XSS Prevention**: Input sanitization, Content Security Policy

#### Client-Side Validation
- Real-time form validation
- User-friendly error messages
- Prevent form submission with errors
- Visual feedback (red borders, error icons)

### 7.5 Security Headers

Implemented via `getSecurityHeaders()` utility:

```typescript
{
  'X-Frame-Options': 'DENY',                    // Clickjacking protection
  'X-Content-Type-Options': 'nosniff',          // MIME sniffing protection
  'X-XSS-Protection': '1; mode=block',          // XSS protection (legacy)
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': "default-src 'self'; ...", // CSP
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains' // HSTS
}
```

### 7.6 File Upload Security

#### Allowed Extensions
- Images: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
- Documents: (future support for PDF, DOCX)

#### Validation
- File size limit: 5MB
- MIME type verification
- Extension whitelist
- Filename sanitization (remove special characters)
- Path traversal prevention

#### Storage
- Uploaded to `/public/uploads/[type]/`
- Unique filename generation (timestamp + random)
- Separate folders by type (blog, profile, documents)

### 7.7 CSRF Protection

- SameSite cookie attribute (Strict)
- Origin header validation
- Custom CSRF tokens for sensitive operations (planned)

### 7.8 SQL Injection Prevention

- **Prisma ORM**: Parameterized queries by default
- **Manual Queries**: Always use prepared statements
- **Input Validation**: Type checking and sanitization
- **Recent Fix**: Blog API pagination now uses parameterized LIMIT/OFFSET

### 7.9 Environment Variables Security

- **Sensitive Data**: Never committed to Git
- **`.gitignore` Protection**: All .env variants ignored
- **.env.example**: Template with placeholders only
- **Production Secrets**: Managed via hosting platform (Vercel, AWS)
- **JWT Secret**: Minimum 32 characters, cryptographically random
- **Database Credentials**: Encrypted in transit (SSL/TLS)

### 7.10 Audit Trail

Every admin action is logged for security and compliance:

```javascript
await logActivity(
  userId,           // Who performed the action
  'update_user',    // What action was performed
  'user',           // Entity type affected
  targetUserId,     // Entity ID
  'Updated user profile for John Doe', // Description
  ipAddress,        // Where from
  userAgent         // Using what device/browser
);
```

**Retention Policy**: 90 days (configurable)

---

## 8. API Documentation

### 8.1 Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe",
  "phone": "+966501234567",
  "company": "ACME Corp"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "userId": 42,
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

**Errors:**
- 400: Validation error (weak password, invalid email)
- 409: Email already exists
- 429: Too many registration attempts

---

#### POST /api/auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@eazycyber.sa",
  "password": "Admin@Eazy"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": 1,
    "email": "admin@eazycyber.sa",
    "full_name": "Admin User",
    "role": "admin"
  }
}
```

**Sets Cookie:**
```
auth_token=<JWT>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

**Errors:**
- 400: Missing email or password
- 401: Invalid credentials
- 403: Account locked or disabled
- 429: Too many login attempts

---

#### POST /api/auth/logout
Clear authentication token.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 8.2 Blog Endpoints

#### GET /api/blog/public
Get published blog posts (public endpoint).

**Query Parameters:**
- `limit`: Number of posts (default: 12, max: 100)
- `offset`: Pagination offset (default: 0)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Getting Started with Cybersecurity",
      "title_ar": "البدء مع الأمن السيبراني",
      "slug": "getting-started-cybersecurity",
      "excerpt": "Learn the fundamentals...",
      "excerpt_ar": "تعلم أساسيات...",
      "featured_image": "/img/blog/blog1.jpg",
      "views": 1024,
      "created_at": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 12,
    "offset": 0,
    "hasMore": true
  }
}
```

---

#### GET /api/blog/[slug]
Get single blog post by slug.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Getting Started with Cybersecurity",
    "title_ar": "البدء مع الأمن السيبراني",
    "slug": "getting-started-cybersecurity",
    "content": "Full HTML content...",
    "content_ar": "المحتوى الكامل...",
    "featured_image": "/img/blog/blog1.jpg",
    "category": "Security",
    "tags": ["cybersecurity", "security", "protection"],
    "views": 1024,
    "published_at": "2025-01-15T10:30:00Z",
    "author": {
      "id": 1,
      "full_name": "Admin User"
    }
  }
}
```

**Errors:**
- 404: Blog post not found

---

### 8.3 Admin Blog Endpoints (Auth Required)

#### GET /api/admin/blog
Get all blog posts (admin only).

**Headers:**
```
Cookie: auth_token=<JWT>
```

**Query Parameters:**
- `status`: Filter by status (draft, published, archived)
- `search`: Search in title and content

**Response:** Same as public endpoint but includes draft posts

---

#### POST /api/admin/blog
Create new blog post.

**Request Body:**
```json
{
  "title": "New Security Update",
  "title_ar": "تحديث أمني جديد",
  "slug": "new-security-update",
  "excerpt": "Brief description...",
  "excerpt_ar": "وصف موجز...",
  "content": "Full content...",
  "content_ar": "المحتوى الكامل...",
  "featured_image": "/uploads/blog/image.jpg",
  "category": "Security",
  "tags": ["security", "update"],
  "status": "draft"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": 42,
    "slug": "new-security-update"
  }
}
```

---

#### PUT /api/admin/blog/[id]
Update existing blog post.

**Request Body:** Same as POST

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Blog post updated successfully"
}
```

---

#### DELETE /api/admin/blog/[id]
Delete blog post.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

---

### 8.4 Consultation Endpoints

#### GET /api/admin/consultations
Get all consultations (admin/moderator only).

**Query Parameters:**
- `status`: Filter by status
- `service_type`: Filter by service

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "company_name": "Tech Corp",
      "contact_person": "Ahmed Al-Saud",
      "email": "ahmed@techcorp.sa",
      "phone": "+966501234567",
      "service_type": "cybersecurity",
      "budget": "100000-500000",
      "description": "Need pentesting services...",
      "preferred_date": "2025-12-01",
      "status": "pending",
      "created_at": "2025-11-10T14:20:00Z"
    }
  ]
}
```

---

#### PUT /api/admin/consultations/[id]
Update consultation status.

**Request Body:**
```json
{
  "status": "scheduled"
}
```

---

### 8.5 User Management Endpoints

#### GET /api/admin/users
Get all users (admin only).

**Query Parameters:**
- `role`: Filter by role
- `status`: Filter by active status

---

#### POST /api/admin/users
Create new user (admin only).

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "full_name": "New User",
  "role": "user",
  "is_active": true
}
```

---

#### PUT /api/admin/users/[id]
Update user (admin only).

---

#### POST /api/admin/users/[id]/reset-password
Reset user password (admin only).

**Request Body:**
```json
{
  "new_password": "NewSecurePass123!"
}
```

---

### 8.6 File Upload Endpoint

#### POST /api/admin/upload
Upload file (images for blog posts).

**Request:** multipart/form-data
```
file: <binary data>
type: "blog" | "profile" | "document"
```

**Response (200 OK):**
```json
{
  "success": true,
  "url": "/uploads/blog/1731756000-abc123.jpg"
}
```

**Errors:**
- 400: Invalid file type or size
- 401: Authentication required
- 413: File too large (>5MB)

---

## 9. User Roles & Permissions

### 9.1 Role Hierarchy

```
Admin (Full Access)
  ├─ Moderator (Content Management)
  └─ User (Public Access)
```

### 9.2 Permission Matrix

| Feature | Admin | Moderator | User |
|---------|-------|-----------|------|
| **Public Website** |
| View pages | ✅ | ✅ | ✅ |
| Submit consultation | ✅ | ✅ | ✅ |
| Read blog posts | ✅ | ✅ | ✅ |
| **Dashboard** |
| View dashboard | ✅ | ✅ | ❌ |
| View statistics | ✅ | ✅ | ❌ |
| **Blog Management** |
| View all posts | ✅ | ✅ | ❌ |
| Create post | ✅ | ✅ | ❌ |
| Edit post | ✅ | ✅ | ❌ |
| Delete post | ✅ | ✅ | ❌ |
| Publish post | ✅ | ✅ | ❌ |
| **Consultations** |
| View consultations | ✅ | ✅ | ❌ |
| Update status | ✅ | ✅ | ❌ |
| Delete consultation | ✅ | ❌ | ❌ |
| **User Management** |
| View users | ✅ | ❌ | ❌ |
| Create user | ✅ | ❌ | ❌ |
| Edit user | ✅ | ❌ | ❌ |
| Delete user | ✅ | ❌ | ❌ |
| Reset password | ✅ | ❌ | ❌ |
| **Roles & Permissions** |
| View roles | ✅ | ❌ | ❌ |
| Edit roles | ✅ | ❌ | ❌ |
| Assign roles | ✅ | ❌ | ❌ |
| **System** |
| View activity logs | ✅ | ❌ | ❌ |
| System settings | ✅ | ❌ | ❌ |

### 9.3 Custom Roles

Admins can create custom roles with specific menu permissions:

**Example: Content Editor Role**
```json
{
  "name": "content_editor",
  "description": "Can only manage blog content",
  "menu_access": {
    "dashboard": true,
    "blog": true,
    "consultations": false,
    "users": false,
    "roles": false
  },
  "is_active": true
}
```

---

## 10. Deployment & Infrastructure

### 10.1 Environment Requirements

#### Production Environment
- **Node.js**: 18.x or higher
- **MySQL**: 8.0 or higher
- **Memory**: Minimum 2GB RAM
- **Storage**: 10GB+ (for uploaded files)
- **SSL Certificate**: Required for HTTPS
- **Domain**: Custom domain configured

### 10.2 Environment Variables

#### Required Variables
```bash
# Database
DATABASE_URL="mysql://user:password@host:port/database?ssl=true"
DB_HOST="your-mysql-host.aiven.com"
DB_PORT="12345"
DB_USER="avnadmin"
DB_PASSWORD="your-secure-password"
DB_NAME="defaultdb"
DB_SSL="true"

# Authentication
JWT_SECRET="your-256-bit-secret-generated-with-openssl-rand-base64-32"

# Site Configuration
SITE_URL="https://eazycyber.sa"
NEXT_PUBLIC_SITE_URL="https://eazycyber.sa"
NODE_ENV="production"
```

#### Optional Variables
```bash
# Email (future feature)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="noreply@eazycyber.sa"
SMTP_PASSWORD="your-smtp-password"

# Analytics (future feature)
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

### 10.3 Vercel Deployment (Recommended)

#### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/eazy-cybersecurity.git
git push -u origin main
```

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import Git repository
4. Select "eazy-cybersecurity" repo

#### Step 3: Configure Environment Variables
Add all environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add each variable (DATABASE_URL, JWT_SECRET, etc.)

#### Step 4: Deploy
- Vercel automatically builds and deploys
- Access deployed site at `your-project.vercel.app`
- Configure custom domain in Settings → Domains

### 10.4 Self-Hosted Deployment

#### Step 1: Server Setup (Ubuntu 22.04)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install MySQL 8
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

#### Step 2: Clone and Build
```bash
# Clone repository
git clone https://github.com/your-username/eazy-cybersecurity.git
cd eazy-cybersecurity

# Install dependencies
pnpm install

# Create production environment file
cp .env.example .env.production.local
nano .env.production.local  # Edit with your values

# Generate Prisma client
pnpm prisma generate

# Build application
pnpm run build
```

#### Step 3: Run with PM2
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "eazy-cyber" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### Step 4: Configure Nginx
```nginx
server {
    listen 80;
    server_name eazycyber.sa;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Step 5: SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d eazycyber.sa -d www.eazycyber.sa
```

### 10.5 Database Setup

#### Initial Database Setup
```bash
# Import schema
mysql -h HOST -u USER -p DATABASE < database/complete-migration.sql

# Or using Prisma
pnpm prisma db push
```

#### Backup Strategy
```bash
# Daily automated backup
0 2 * * * mysqldump -h HOST -u USER -pPASS DATABASE | gzip > /backups/db-$(date +\%Y\%m\%d).sql.gz

# Keep last 30 days
find /backups -type f -mtime +30 -delete
```

### 10.6 Monitoring & Logs

#### Application Logs
```bash
# View PM2 logs
pm2 logs eazy-cyber

# View error logs
pm2 logs eazy-cyber --err

# Clear logs
pm2 flush
```

#### Database Monitoring
- Connection pool status
- Query performance
- Slow query log
- Disk usage

#### Performance Monitoring
- Response times
- Error rates
- Memory usage
- CPU usage

### 10.7 Scaling Considerations

#### Horizontal Scaling
- Load balancer (Nginx)
- Multiple Next.js instances
- Shared database
- Redis for session store (future)

#### Vertical Scaling
- Increase server resources (CPU, RAM)
- Database optimization (indexes, caching)
- CDN for static assets

#### Database Scaling
- Read replicas
- Connection pooling
- Query optimization
- Caching layer (Redis)

---

## 11. Maintenance & Support

### 11.1 Regular Maintenance Tasks

#### Daily
- Monitor error logs
- Check database connections
- Review new consultations
- Respond to contact messages

#### Weekly
- Review activity logs for suspicious activity
- Check failed login attempts
- Update content (blog posts)
- Database backup verification

#### Monthly
- Security audit
- Performance optimization
- Dependency updates
- User feedback review

### 11.2 Updating Dependencies

```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Update Next.js
pnpm update next@latest react@latest react-dom@latest

# Test after updates
pnpm run build
pnpm run lint
```

### 11.3 Troubleshooting

#### Common Issues

**1. Database Connection Errors**
```
Error: Cannot connect to database
```
**Solution:** Check database credentials, SSL configuration, firewall rules

**2. Build Failures**
```
Error: Build failed
```
**Solution:** Check TypeScript errors, missing environment variables

**3. Authentication Not Working**
```
Error: Invalid token
```
**Solution:** Verify JWT_SECRET matches between deployments

**4. Images Not Loading**
```
Error: 404 on /uploads/blog/image.jpg
```
**Solution:** Check file permissions, upload directory exists

---

## 12. Future Enhancements

### 12.1 Planned Features

#### Phase 2 (Q1 2026)
- Email notifications (consultation responses, blog comments)
- Newsletter subscription system
- Blog comments with moderation
- Advanced analytics dashboard
- Multi-factor authentication (MFA)
- API documentation with Swagger
- Mobile app (React Native)

#### Phase 3 (Q2 2026)
- Live chat support
- Knowledge base / FAQ CMS
- Customer portal (track consultations)
- Payment gateway integration
- Automated invoicing
- CRM integration
- Advanced reporting

#### Phase 4 (Q3 2026)
- AI-powered chatbot (Arabic/English)
- Automated threat intelligence feed
- Security assessment tools
- Online training platform
- Certification management
- Partner portal

### 12.2 Technical Improvements

- Redis caching layer
- ElasticSearch for blog search
- GraphQL API
- WebSocket for real-time updates
- Docker containerization
- Kubernetes orchestration
- CI/CD pipeline (GitHub Actions)
- Automated testing (Jest, Playwright)

---

## 13. Conclusion

**Eazy Cyber Agent** is a production-ready, enterprise-grade cybersecurity platform built with modern web technologies. The platform successfully combines a professional public website with a comprehensive admin panel, providing a complete solution for managing cybersecurity services, content, and customer relationships.

### Key Achievements

✅ **Bilingual Support**: Complete Arabic and English localization
✅ **Security**: Bank-grade security with JWT, rate limiting, and audit trails
✅ **Performance**: Optimized for speed with caching, lazy loading, and CDN
✅ **Scalability**: Designed to handle growth with connection pooling and efficient queries
✅ **Maintainability**: Clean code, TypeScript, comprehensive documentation
✅ **Admin Panel**: Full-featured CMS with blog, consultations, users, and roles management

### Contact Information

**Website:** https://eazycyber.sa
**Email:** support@eazycyber.sa
**Phone:** +966 XX XXX XXXX
**Location:** Saudi Arabia

---

**Document Version:** 1.0
**Last Updated:** November 16, 2025
**Prepared By:** Technical Documentation Team

---

*This documentation is proprietary and confidential. Unauthorized distribution is prohibited.*
