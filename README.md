# Eazy Cyber Agent - Cybersecurity & Digital Transformation Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748?style=for-the-badge&logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-8+-4479A1?style=for-the-badge&logo=mysql)

**A bilingual (Arabic/English) cybersecurity and digital transformation platform built with Next.js 15**

[Features](#-features) •
[Quick Start](#-quick-start) •
[Documentation](#-documentation) •
[Deployment](#-deployment)

</div>

---

## 📋 Overview

**Eazy Cyber Agent** is a Saudi cybersecurity company's website and content management system, offering:

- 🌐 **Bilingual Support**: Full Arabic & English localization with RTL/LTR support
- 🔐 **Advanced Security**: JWT authentication, role-based access, rate limiting
- 📝 **Content Management**: Blog system with rich text editor
- 📊 **Admin Dashboard**: Comprehensive admin panel for content & user management
- 🎨 **Modern UI**: Responsive design with SCSS, Bootstrap, and custom animations
- ⚡ **High Performance**: Optimized images, lazy loading, code splitting
- 🚀 **SEO Optimized**: Meta tags, Open Graph, structured data

---

## ✨ Features

### For Visitors

- **Bilingual Content**: Seamless Arabic-English switching
- **Service Showcase**: AI Solutions, Cybersecurity, Big Data, Cloud Hosting
- **Industry Focus**: Specialized solutions for Government, Finance, Healthcare, Education
- **Vision 2030 Alignment**: Saudi Arabia's digital transformation initiative
- **Blog & News**: Latest insights and cybersecurity news
- **Contact & Consultation**: Easy consultation request forms

### For Administrators

- **User Management**: Create, edit, delete users with role assignment
- **Blog Management**: Create/edit/publish blog posts with image uploads
- **Consultation Tracking**: Manage customer consultation requests
- **Activity Logs**: Track all admin actions for audit trails
- **Secure Authentication**: JWT-based authentication
- **Rate Limiting**: Automatic protection against brute force attacks

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **MySQL**: 8.0 or higher

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd eazy-cyber-agent
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:

```env
# Database
DATABASE_URL="mysql://username:password@host:port/database?ssl=true"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"

# Site Configuration
SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

5. **Start development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
eazy-cyber-agent/
├── src/
│   ├── app/              # Next.js App Router (pages & API routes)
│   ├── components/       # React components (95 files)
│   ├── lib/              # Utilities (auth, db, security, performance)
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization (Arabic/English)
│   └── context/          # React Context providers
├── public/               # Static assets (images, fonts)
├── prisma/               # Database schema
├── styles/               # Global SCSS styles
└── docs/                 # Documentation
```

📖 **See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed architecture**

---

## 🛠️ Tech Stack

### Core

- **Framework**: [Next.js 15](https://nextjs.org/) (React Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: SCSS + [Bootstrap](https://getbootstrap.com/)
- **Database**: [MySQL 8+](https://www.mysql.com/) with [Prisma ORM](https://www.prisma.io/)

### Authentication & Security

- **Authentication**: JWT ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken))
- **Password Hashing**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Rate Limiting**: Custom implementation
- **Security Headers**: CSP, HSTS, X-Frame-Options

---

## 🔐 Security

This project implements industry-standard security practices:

✅ JWT tokens with 7-day expiry
✅ HTTP-only cookies (XSS protection)
✅ bcrypt password hashing (12 salt rounds)
✅ Account lockout after failed attempts
✅ Password strength validation
✅ Rate limiting on sensitive endpoints
✅ Input validation & sanitization
✅ Secure HTTP headers

📖 **See security utilities in** `src/lib/security.ts`

---

## ⚡ Performance

### Optimization Strategies

- ✅ **Image Optimization**: Next.js Image component with AVIF/WebP
- ✅ **Lazy Loading**: Intersection Observer API
- ✅ **Code Splitting**: Route and component-based
- ✅ **Caching**: Static assets (1 year), API responses (configurable)
- ✅ **Compression**: Gzip enabled
- ✅ **Font Optimization**: `next/font` with `display: swap`

📖 **See performance utilities in** `src/lib/performance.ts`

---

## 🌍 Internationalization

### Supported Languages

- 🇸🇦 **Arabic (ar)**: Default language (RTL)
- 🇬🇧 **English (en)**: Secondary language (LTR)

### Translation Files

- `src/i18n/messages/ar.json`
- `src/i18n/messages/en.json`

---

## 📡 API Reference

### Public Endpoints

- `GET /api/blog/public` - List published blog posts
- `GET /api/blog/[slug]` - Get blog post by slug
- `POST /api/contacts` - Submit contact form
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Admin Endpoints (Auth Required)

- `GET/POST /api/admin/blog` - Manage blog posts
- `GET/POST /api/admin/users` - Manage users
- `POST /api/admin/upload` - Upload files

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

📖 **See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed guide**

### Environment Variables (Required)

```
DATABASE_URL=mysql://user:pass@host:port/db?ssl=true
JWT_SECRET=your-secure-random-string
SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Env Files & Best Practices

- Precedence (production): `.env.production.local` > `.env.local` > `.env.production` > `.env`
- Do not commit real secrets. Use hosting env vars or `.env.production.local` (gitignored).
- `.env.example` contains placeholders for all required keys. Keep it in sync.
- Development: copy `.env.example` to `.env.local` and fill values.
- Self-hosted production: copy `.env.example` to `.env.production.local` and fill real values on the server.

Quick setup (self-hosted):

```bash
cp .env.example .env.production.local  # then edit with real values
npm ci
npm run build
npm run start
```

---

## 📚 Documentation

- [📁 Project Structure](./PROJECT_STRUCTURE.md) - Detailed architecture
- [🚀 Vercel Deployment](./VERCEL_DEPLOYMENT.md) - Deployment guide
- [🔐 Security Utilities](./src/lib/security.ts) - Security features
- [⚡ Performance Utilities](./src/lib/performance.ts) - Performance optimizations

---

## 🧪 Testing

### Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 📝 License

This project is proprietary software owned by **Eazy Cyber Agent**.
All rights reserved © 2025.

---

## 🆘 Support

For issues or questions:

- 📧 **Email**: support@eazycyber.sa
- 🌐 **Website**: [https://eazycyber.sa](https://eazycyber.sa)

---

<div align="center">

**Built with ❤️ in Saudi Arabia 🇸🇦**

</div>
