# 🚀 Deployment Guide - Eazy Cyber Agent

## ✅ Build Status

**Production Build:** ✅ **SUCCESSFUL**
- **Total Routes:** 28
- **Static Pages:** 2
- **Dynamic Pages:** 26
- **Total JS Size:** ~173 KB (First Load)
- **Build Time:** ~36s

---

## 📋 Pre-Deployment Checklist

### 1. ✅ Completed

- [x] Production build successful
- [x] Database connected (Aiven MySQL)
- [x] Security headers configured
- [x] SEO meta tags added
- [x] PWA manifest created
- [x] Environment variables configured
- [x] TypeScript errors resolved
- [x] ESLint warnings minimal

### 2. 🔄 Required Before Deployment

- [ ] Add Google Analytics ID
- [ ] Add verification codes (Google, Facebook, etc.)
- [ ] Create social media images (OG image, Twitter card)
- [ ] Generate app icons (favicon, apple-touch-icon, etc.)
- [ ] Update domain name from `eazycyber.sa` if different
- [ ] Add SSL certificate
- [ ] Configure CDN (optional but recommended)

---

## 🌐 Deployment Options

### Option 1: **Vercel** (Recommended - Easiest)

#### Why Vercel?
- Built by Next.js creators
- Zero configuration for Next.js
- Automatic SSL
- Global CDN
- Serverless functions
- Free tier available

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set Environment Variables:**
   Go to Vercel Dashboard → Project → Settings → Environment Variables

   Add these variables:
   ```
   DB_HOST=your-mysql-service.aivencloud.com
   DB_PORT=14507
   DB_USER=avnadmin
   DB_PASSWORD=YOUR_AIVEN_SERVICE_PASSWORD
   DB_NAME=defaultdb
   DB_SSL=true
   SITE_URL=https://eazycyber.sa
   ```

5. **Custom Domain:**
   - Go to Vercel Dashboard → Project → Settings → Domains
   - Add `eazycyber.sa`
   - Follow DNS configuration instructions

6. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

**Estimated Setup Time:** 10-15 minutes

---

### Option 2: **AWS (EC2 + RDS)**

#### Steps:

1. **Launch EC2 Instance:**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)

2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone Repository:**
   ```bash
   git clone <your-repo-url>
   cd Eazy
   ```

5. **Install Dependencies:**
   ```bash
   npm install
   ```

6. **Create .env.production:**
   ```bash
   nano .env.production
   ```
   Add all environment variables from `.env.local`

7. **Build Application:**
   ```bash
   npm run build
   ```

8. **Start with PM2:**
   ```bash
   pm2 start npm --name "eazy-cyber" -- start
   pm2 save
   pm2 startup
   ```

9. **Setup Nginx:**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/eazycyber
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name eazycyber.sa www.eazycyber.sa;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/eazycyber /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Setup SSL with Let's Encrypt:**
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d eazycyber.sa -d www.eazycyber.sa
    ```

**Estimated Setup Time:** 1-2 hours

---

### Option 3: **DigitalOcean App Platform**

#### Steps:

1. **Create Account:** https://www.digitalocean.com/

2. **Create New App:**
   - Go to App Platform
   - Connect GitHub repository
   - Select branch: `main`

3. **Configure Build:**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - HTTP Port: 3000

4. **Add Environment Variables:**
   ```
   DB_HOST=your-mysql-service.aivencloud.com
   DB_PORT=14507
   DB_USER=avnadmin
   DB_PASSWORD=YOUR_AIVEN_SERVICE_PASSWORD
   DB_NAME=defaultdb
   DB_SSL=true
   SITE_URL=https://eazycyber.sa
   ```

5. **Deploy:**
   Click "Create Resources"

6. **Add Custom Domain:**
   - Go to Settings → Domains
   - Add `eazycyber.sa`
   - Update DNS records

**Estimated Setup Time:** 30 minutes

---

### Option 4: **Docker Container**

#### Dockerfile:

```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

#### Deploy:

```bash
# Build
docker build -t eazy-cyber-agent .

# Run
docker run -p 3000:3000 \
  -e DB_HOST=your-mysql-service.aivencloud.com \
  -e DB_PORT=14507 \
  -e DB_USER=avnadmin \
  -e DB_PASSWORD=YOUR_AIVEN_SERVICE_PASSWORD \
  -e DB_NAME=defaultdb \
  -e DB_SSL=true \
  eazy-cyber-agent
```

---

## 🔐 Environment Variables

### Production Environment Variables:

Create `.env.production` with:

```env
# Database
DB_HOST=your-mysql-service.aivencloud.com
DB_PORT=14507
DB_USER=avnadmin
DB_PASSWORD=YOUR_AIVEN_SERVICE_PASSWORD
DB_NAME=defaultdb
DB_SSL=true

# Site Configuration
SITE_URL=https://eazycyber.sa
NEXT_PUBLIC_SITE_URL=https://eazycyber.sa

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Email Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@eazycyber.sa

# Other
NODE_ENV=production
```

**⚠️ Security Note:** Never commit `.env.production` to git!

---

## 🗄️ Database Setup

Your database is already configured with Aiven MySQL. Ensure:

1. **Aiven Service is Running**
2. **IP Whitelist** (if enabled, add production server IP)
3. **Backups Configured** in Aiven console
4. **Monitoring Enabled**

### Run Schema on Production:

```bash
# Access your Aiven MySQL
mysql -h your-mysql-service.aivencloud.com \
      -P 14507 \
      -u avnadmin \
      -p \
      --ssl-mode=REQUIRED \
      defaultdb < database/schema.sql
```

Or use the API endpoint:
```bash
curl https://eazycyber.sa/api/setup-db
```

---

## 🔒 Security Checklist

Before going live:

- [x] HTTPS enabled
- [x] Security headers configured (CSP, HSTS, etc.)
- [x] Database uses SSL
- [ ] Rate limiting on API routes (recommended)
- [ ] CORS configured properly
- [ ] Environment variables secure
- [ ] Secrets not in git
- [ ] SQL injection protection (parameterized queries ✅)
- [ ] XSS protection enabled ✅
- [ ] Regular security updates scheduled

---

## 📊 Post-Deployment

### 1. **Monitoring**

Set up monitoring with:
- **Uptime Robot** - https://uptimerobot.com/
- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **Aiven Console** - Database metrics

### 2. **Performance**

Test with:
- **PageSpeed Insights** - https://pagespeed.web.dev/
- **GTmetrix** - https://gtmetrix.com/
- **WebPageTest** - https://www.webpagetest.org/

### 3. **SEO**

Submit to:
- **Google Search Console** - https://search.google.com/search-console
- **Bing Webmaster Tools** - https://www.bing.com/webmasters

### 4. **SSL/Security**

Test with:
- **SSL Labs** - https://www.ssllabs.com/ssltest/
- **Security Headers** - https://securityheaders.com/

---

## 🚨 Troubleshooting

### Issue: Build Fails

**Solution:**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Database Connection Fails

**Solutions:**
1. Check environment variables
2. Verify Aiven service is running
3. Check IP whitelist
4. Verify SSL is enabled

### Issue: 500 Error

**Solutions:**
1. Check server logs
2. Verify environment variables
3. Check database connection
4. Review Next.js error logs

---

## 📝 DNS Configuration

Point your domain to deployment:

### For Vercel:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For AWS/DigitalOcean:
```
Type: A
Name: @
Value: <your-server-ip>

Type: A
Name: www
Value: <your-server-ip>
```

---

## ✅ Go-Live Checklist

Final checks before launch:

- [ ] Build successful
- [ ] Database connected
- [ ] All environment variables set
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] DNS propagated (check with `dig eazycyber.sa`)
- [ ] Google Analytics installed
- [ ] Contact form working
- [ ] All pages loading
- [ ] Mobile responsive
- [ ] Arabic/English switching works
- [ ] Images loading
- [ ] Security headers verified
- [ ] Performance optimized
- [ ] SEO meta tags complete
- [ ] Backups configured
- [ ] Monitoring enabled

---

## 📞 Support

If you need help:

1. Check Next.js docs: https://nextjs.org/docs
2. Aiven support: https://aiven.io/support
3. Vercel support: https://vercel.com/support

---

## 🎉 You're Ready to Deploy!

Your application is production-ready. Choose your deployment platform and follow the steps above.

**Recommended:** Start with Vercel for the easiest deployment, then migrate to AWS/DigitalOcean if needed.

Good luck! 🚀
