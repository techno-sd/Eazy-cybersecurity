# Vercel Deployment Guide for Eazy Cyber

This guide explains how to deploy your Next.js application to Vercel with proper environment variable configuration.

## Important: Environment Variable Files

### Which files does Vercel use?

**Vercel DOES NOT use environment variable files from your repository.**

- ❌ `.env.example` - This is only a template for developers
- ❌ `.env.production` - This is only for local production builds
- ❌ `.env.local` - This is only for local development
- ✅ **Vercel uses environment variables from the Vercel Dashboard**

### How to configure environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Select which environments need the variable (Production, Preview, Development)
5. Click **Save**

---

## Required Environment Variables for Vercel

### 1. DATABASE_URL (Required)

**Full MySQL connection string for Prisma:**

```
DATABASE_URL="mysql://avnadmin:YOUR_PASSWORD@your-mysql-service.aivencloud.com:14507/eazyDb?ssl=true"
```

**How to construct this:**
- Username: `avnadmin` (from your Aiven account)
- Password: Get from Aiven dashboard → Service Overview → Connection Information
- Host: Your Aiven MySQL service hostname (e.g., `mysql-xxx.aivencloud.com`)
- Port: Usually `14507` for Aiven MySQL
- Database: `eazyDb` (your database name)
- SSL: `?ssl=true` (required for Aiven)

**Steps to get Aiven connection details:**
1. Log in to Aiven Console (https://console.aiven.io)
2. Select your MySQL service
3. Go to "Overview" or "Connection Information"
4. Copy the connection details
5. Construct the full URL as shown above

---

### 2. JWT_SECRET (Required)

**Secret key for JWT authentication:**

```
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
```

**How to generate a secure JWT secret:**

```bash
# Option 1: Using OpenSSL (recommended)
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Important:**
- Must be the same across all deployments (Production, Preview, Development)
- Never share this secret publicly
- Use a strong random string (at least 32 characters)
- If changed, all existing user sessions will be invalidated

---

### 3. SITE_URL (Required)

**Your production website URL:**

```
SITE_URL="https://eazycyber.sa"
```

**For different environments:**
- **Production**: `https://eazycyber.sa`
- **Preview**: `https://your-preview-url.vercel.app` (or use production URL)
- **Development**: `http://localhost:3000`

---

### 4. NEXT_PUBLIC_SITE_URL (Required)

**Public site URL accessible in browser:**

```
NEXT_PUBLIC_SITE_URL="https://eazycyber.sa"
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Optional Environment Variables

### Google Analytics (Optional)

```
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Google Tag Manager (Optional)

```
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
```

---

## Step-by-Step Deployment Process

### 1. Prepare Your Repository

Make sure your latest changes are pushed to GitHub:

```bash
git add .
git commit -m "feat: Prepare for Vercel deployment"
git push origin main
```

### 2. Connect Repository to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Select your GitHub repository
4. Click **"Import"**

### 3. Configure Build Settings

Vercel should auto-detect Next.js settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (already includes `prisma generate`)
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Add Environment Variables

**Before deploying, add these environment variables in Vercel:**

1. Click **"Environment Variables"** section
2. Add each variable:
   - Name: `DATABASE_URL`
   - Value: Your full MySQL connection string
   - Environments: Check **Production**, **Preview**, **Development**

3. Repeat for:
   - `JWT_SECRET`
   - `SITE_URL`
   - `NEXT_PUBLIC_SITE_URL`

4. Click **"Deploy"**

### 5. Verify Deployment

After deployment completes:

1. ✅ Check build logs for errors
2. ✅ Visit your site and test basic navigation
3. ✅ Test admin login: `https://eazycyber.sa/admin/login`
4. ✅ Test blog page: `https://eazycyber.sa/blog`
5. ✅ Check database connectivity (create a test user)

---

## Troubleshooting Common Issues

### Error: "Can't resolve '@/generated/prisma/client'"

**Solution:** This is already fixed in your build script:
```json
"build": "prisma generate && next build"
```

### Error: "Missing environment variable: DATABASE_URL"

**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Make sure `DATABASE_URL` is added with the full connection string
3. Redeploy the project

### Error: "PrismaClient initialization failed"

**Possible causes:**
1. Incorrect DATABASE_URL format
2. Aiven service is not running
3. IP not whitelisted in Aiven (check Aiven firewall settings)

**Solution:**
1. Verify your DATABASE_URL format
2. Test connection locally first
3. Check Aiven service status

### Error: "JWT verification failed"

**Solution:**
1. Make sure JWT_SECRET is set in Vercel environment variables
2. Make sure JWT_SECRET is the same in all environments
3. Redeploy after adding/changing JWT_SECRET

---

## Database Connection Security

### Aiven MySQL Configuration

Your Aiven MySQL service should:
1. ✅ Have SSL/TLS encryption enabled (required)
2. ✅ Allow connections from Vercel's IP addresses (or use 0.0.0.0/0 for all IPs)
3. ✅ Have the database `eazyDb` created
4. ✅ Have all tables migrated (users, blog_posts, consultations, etc.)

**To allow Vercel connections in Aiven:**
1. Go to Aiven Console → Your Service
2. Click **"Overview"** or **"Allowed IP Addresses"**
3. Either:
   - Add specific Vercel IP ranges, OR
   - Allow all IPs: `0.0.0.0/0` (less secure but simpler)

---

## Post-Deployment Checklist

After successful deployment:

- [ ] Test user authentication (login/logout)
- [ ] Test admin panel access
- [ ] Test blog post creation and viewing
- [ ] Test consultations submission
- [ ] Test file uploads (blog images)
- [ ] Verify Arabic/English language switching
- [ ] Check responsive design on mobile
- [ ] Test all navigation links
- [ ] Verify SSL certificate (HTTPS)
- [ ] Check browser console for errors
- [ ] Test contact forms submission

---

## Environment Variables Summary Table

| Variable | Required | Where Used | Example Value |
|----------|----------|------------|---------------|
| `DATABASE_URL` | ✅ Yes | Prisma database connection | `mysql://avnadmin:pass@host:14507/eazyDb?ssl=true` |
| `JWT_SECRET` | ✅ Yes | Authentication tokens | Generate with `openssl rand -base64 32` |
| `SITE_URL` | ✅ Yes | Backend URLs, redirects | `https://eazycyber.sa` |
| `NEXT_PUBLIC_SITE_URL` | ✅ Yes | Frontend URLs | `https://eazycyber.sa` |
| `NEXT_PUBLIC_GA_ID` | ❌ No | Google Analytics | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | ❌ No | Google Tag Manager | `GTM-XXXXXXX` |

---

## Need Help?

1. **Check build logs**: Vercel Dashboard → Deployments → Your deployment → Build logs
2. **Check function logs**: Vercel Dashboard → Deployments → Your deployment → Function logs
3. **Test locally first**: Make sure `npm run build` works locally
4. **Verify environment variables**: Settings → Environment Variables

---

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Prisma with Vercel Deployment](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Aiven MySQL Connection Guide](https://docs.aiven.io/docs/products/mysql/getting-started)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
