# Azure Deployment Guide for Sabra Shah Quran Academy

## Overview
Your Angular app has two deployment options on Azure. **For maximum SEO optimization, you should use Option 2 (Azure App Service with SSR).**

---

## 🎯 **OPTION 1: Azure Static Web Apps (Easiest & Cheapest, but NO SSR)**

**Cost:** FREE tier available (100GB bandwidth/month, unlimited sites)
**Best for:** Simple static sites that don't need SEO optimization
**Difficulty:** ⭐ Very Easy
**⚠️ SEO Limitation:** This option deploys only the static (client-side) version. While Google can crawl JavaScript apps, **SSR is better for SEO** because:
- Content is immediately available in HTML (no JavaScript execution needed)
- Faster initial page load = better SEO ranking
- Better social media sharing (OG tags work perfectly)
- More reliable indexing by search engines

**Recommendation:** Use this only if SEO is not a priority.

### Step-by-Step Instructions:

#### **Step 1: Prepare Your App**
First, let's make sure your app can build for static deployment:

1. Open your terminal in the project folder
2. Run: `yarn build:prod`
3. This creates a `dist` folder with your production-ready app

#### **Step 2: Create Azure Account (if you don't have one)**
1. Go to [portal.azure.com](https://portal.azure.com)
2. Sign up for a free account (you get $200 credit for 30 days, then free tier services)
3. Complete the sign-up process

#### **Step 3: Create Static Web App in Azure Portal**
1. Log into [Azure Portal](https://portal.azure.com)
2. Click the **"+ Create a resource"** button (top left)
3. Search for **"Static Web Apps"** in the search bar
4. Click **"Static Web Apps"** from the results
5. Click the **"Create"** button

#### **Step 4: Configure Your Static Web App**
Fill in these details:

- **Subscription:** Choose your subscription (free tier is fine)
- **Resource Group:** 
  - Click "Create new"
  - Name it: `quran-academy-rg` (or any name you like)
  - Click "OK"
- **Name:** `sabra-shah-quran-academy` (or any unique name - this becomes part of your URL)
- **Plan type:** Select **"Free"** (this is the free tier!)
- **Region:** Choose the closest region to you (e.g., "East US", "West Europe")
- **Source:** Select **"GitHub"**
- **Sign in with GitHub:** Click this button and authorize Azure to access your GitHub
- **Organization:** Select your GitHub username
- **Repository:** Select `sabra-shah-quran-academy`
- **Branch:** Select `main`
- **Build Presets:** Select **"Angular"** (Azure will auto-configure for Angular!)

#### **Step 5: Configure Build Settings**
Azure will auto-fill most settings, but verify:

- **App location:** `/` (root of your repo)
- **Api location:** Leave empty (unless you have a separate API)
- **Output location:** `dist/sabra-shah-quran-academy/browser` (this is where Angular builds your static files)

> **Note:** Your Angular config shows the project name is "sabra-shah-quran-academy", so the output will be in `dist/sabra-shah-quran-academy/browser`

#### **Step 6: Review and Create**
1. Click **"Review + Create"** at the bottom
2. Review your settings
3. Click **"Create"** button
4. Wait 2-3 minutes for Azure to set everything up

#### **Step 7: Azure Sets Up GitHub Actions**
- Azure automatically creates a GitHub Actions workflow file in your repo
- This file (`.github/workflows/azure-static-web-apps-*.yml`) handles automatic deployments
- Every time you push to `main`, it will automatically rebuild and deploy!

#### **Step 8: Get Your Live URL**
1. After creation, click **"Go to resource"**
2. In the Overview page, you'll see **"URL"** - this is your live website!
3. It will look like: `https://sabra-shah-quran-academy.azurestaticapps.net`
4. Click the URL to see your deployed app!

#### **Step 9: Test Automatic Deployment**
1. Make a small change to your app (like updating a text)
2. Commit and push to GitHub: 
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. Go to your GitHub repo → **"Actions"** tab
4. You'll see Azure building and deploying your app automatically!
5. Wait 2-3 minutes, then refresh your live URL to see the changes

---

## 🔧 **OPTION 2: Azure App Service (RECOMMENDED FOR SEO - SSR Enabled)**

**Cost:** ~$13/month for Basic tier (or free tier with limitations)
**Best for:** Apps that need maximum SEO optimization
**Difficulty:** ⭐⭐ Moderate

### ⚠️ **IMPORTANT: Why You Need This for SEO**

**YES, you need SSR for maximum SEO optimization!** Here's why:

1. **Better Search Engine Indexing:**
   - With SSR, search engines get fully rendered HTML immediately
   - No waiting for JavaScript to execute
   - Your content (including meta tags, structured data) is visible right away

2. **Faster Initial Page Load:**
   - SSR serves pre-rendered HTML = faster Time to First Byte (TTFB)
   - Google uses page speed as a ranking factor
   - Better user experience = better SEO ranking

3. **Social Media Sharing:**
   - Open Graph tags work perfectly with SSR
   - When someone shares your site on Facebook/Twitter, the preview loads correctly
   - This improves click-through rates = better SEO

4. **Structured Data (JSON-LD):**
   - Your app includes SEO service for structured data
   - With SSR, this data is in the initial HTML
   - Google can immediately understand your business and services

5. **Content Visibility:**
   - All your content is in the HTML
   - Search engines can index it immediately
   - Better chance of ranking for your target keywords

### When to Use This:
- ✅ **You want maximum SEO optimization**
- ✅ You need server-side rendering (SSR) to work
- ✅ You have API endpoints in your Express server
- ✅ You need more server-side features

### Step-by-Step Instructions:

#### **Step 1: Build Your App**
```bash
yarn build:prod
```

#### **Step 2: Create App Service in Azure Portal**
1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"+ Create a resource"**
3. Search for **"Web App"**
4. Click **"Create"**

#### **Step 3: Configure Web App**
- **Subscription:** Your subscription
- **Resource Group:** Create new: `quran-academy-rg`
- **Name:** `sabra-shah-quran-academy` (must be globally unique)
- **Publish:** Code
- **Runtime stack:** Node.js 20 LTS (or latest)
- **Operating System:** Linux (cheaper than Windows)
- **Region:** Closest to you
- **App Service Plan:** 
  - Click "Create new"
  - Name: `quran-academy-plan`
  - **SKU and size:** Select **"Free F1"** (free tier) or **"Basic B1"** ($13/month)
  - Click "OK"

#### **Step 4: Review and Create**
- Click **"Review + Create"**
- Click **"Create"**
- Wait for deployment

#### **Step 5: Configure Deployment**
1. Go to your App Service resource
2. Go to **"Deployment Center"** in the left menu
3. Select **"GitHub"** as source
4. Authorize and select your repo: `sabra-shah-quran-academy`
5. Branch: `main`
6. Click **"Save"**

#### **Step 6: Configure Build Settings**
1. Go to **"Configuration"** → **"General settings"**
2. Set **"Startup command"** to:
   ```
   node dist/sabra-shah-quran-academy/server/server.mjs
   ```
3. Set **"PORT"** environment variable (if needed):
   - Go to **"Configuration"** → **"Application settings"**
   - Add new setting: `PORT` = `8080` (Azure uses this port)

#### **Step 7: Update GitHub Actions Workflow (IMPORTANT)**
Azure will create a GitHub Actions workflow, but you need to update it to use `yarn` instead of `npm`:

1. Go to your GitHub repo: `https://github.com/YOUR_USERNAME/sabra-shah-quran-academy`
2. Click on `.github/workflows/` folder
3. Find the Azure-generated workflow file (name like `azure-webapps-deploy-*.yml`)
4. Click "Edit" (pencil icon)
5. Find the step that says `npm install` and replace with:
   ```yaml
   - name: Install yarn
     run: npm install -g yarn
   
   - name: Install dependencies
     run: yarn install --frozen-lockfile
   ```
6. Find `npm run build` and replace with:
   ```yaml
   - name: Build with Angular
     run: yarn build:prod
   ```
7. Click "Commit changes"

#### **Step 8: Get Your URL**
- In the Overview, find **"Default domain"**
- Your app will be at: `https://sabra-shah-quran-academy.azurewebsites.net`

---

## 💰 **Cost Comparison**

| Option | Free Tier | Paid Tier |
|--------|-----------|-----------|
| **Static Web Apps** | ✅ 100GB bandwidth/month | $9/month for more |
| **App Service** | ⚠️ Limited (shared resources) | $13/month (Basic) |

**Recommendation:** 
- **For SEO optimization:** Use **Azure App Service** (Option 2) with SSR - $13/month but much better for Google rankings
- **For simple hosting** (SEO not important): Use **Static Web Apps** (Option 1) - free and simpler

---

## 🚀 **Quick Start (TL;DR)**

**For SEO-optimized deployment (RECOMMENDED):**
1. Go to [portal.azure.com](https://portal.azure.com)
2. Create → Web App
3. Configure: Node.js 20 LTS, Linux, Basic B1 plan ($13/month) or Free F1
4. Connect to GitHub repo: `sabra-shah-quran-academy`
5. Set startup command: `node dist/sabra-shah-quran-academy/server/server.mjs`
6. Set PORT environment variable: `8080`
7. Update GitHub Actions workflow to use `yarn` instead of `npm`
8. Click Create
9. Wait 5 minutes
10. Get your URL from the Overview page
11. Done! 🎉 Your SEO-optimized app is live!

**For simple static deployment (no SSR, cheaper but less SEO):**
1. Go to [portal.azure.com](https://portal.azure.com)
2. Create → Static Web Apps
3. Connect to GitHub repo: `sabra-shah-quran-academy`
4. Select branch: `main`
5. Build preset: **Angular**
6. Output location: `dist/sabra-shah-quran-academy/browser`
7. Click Create
8. Wait 3 minutes
9. Get your URL from the Overview page
10. Done! 🎉

---

## 📝 **Important Notes**

1. **Your app uses SSR** - Static Web Apps will deploy the static version (browser build). **For SEO optimization, use App Service (Option 2) with SSR enabled.**

2. **Build Output Location:** Based on your `angular.json`, the static files are in `dist/sabra-shah-quran-academy/browser` after building. For SSR, use `dist/sabra-shah-quran-academy/server/server.mjs`.

3. **Automatic Deployments:** Once set up, every `git push` to `main` automatically deploys!

4. **Custom Domain:** You can add your own domain later in the Azure Portal under "Custom domains". This is important for SEO!

5. **Environment Variables:** If your app needs API keys or config, add them in Azure Portal under "Configuration" → "Application settings".

6. **SEO Features Already Configured:** Your app now includes:
   - ✅ SEO service for dynamic meta tags
   - ✅ Structured data (JSON-LD) support
   - ✅ Open Graph tags for social media
   - ✅ Twitter Card tags
   - ✅ SSR support for better search engine indexing

## 🎯 **SEO Optimization Checklist**

After deployment, make sure to:

1. **Update SEO Data:**
   - Edit `src/app/app.ts` and update:
     - Business address (streetAddress, postalCode)
     - Phone number (telephone)
     - Website URL (replace with your actual domain)
   - Edit `src/index.html` and update:
     - All URLs to your actual domain
     - Add an OG image (`/assets/og-image.jpg`)

2. **Submit to Google Search Console:**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add your website
   - Submit your sitemap (you may need to generate one)

3. **Verify Structured Data:**
   - Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
   - Enter your website URL
   - Verify your structured data is detected

4. **Monitor Performance:**
   - Use Google Search Console to track rankings
   - Monitor Core Web Vitals (page speed metrics)
   - Track keyword rankings

---

## 🔄 **Migrating from Option 1 to Option 2 (Static Web Apps → App Service with SSR)**

**Good news:** Your code already supports SSR! You don't need to change any code. You just need to create a new Azure resource.

### Can I Switch Later?
✅ **Yes!** You can easily switch from Static Web Apps (Option 1) to App Service with SSR (Option 2) at any time. Here's how:

### Migration Steps:

#### **Step 1: Create New App Service Resource**
1. Go to [Azure Portal](https://portal.azure.com)
2. Follow **Option 2** steps above to create a new App Service
3. Use the same GitHub repo: `sabra-shah-quran-academy`
4. This creates a NEW resource alongside your existing Static Web App

#### **Step 2: Configure for SSR**
1. Set **Startup command:** `node dist/sabra-shah-quran-academy/server/server.mjs`
2. Set **PORT** environment variable: `8080`
3. Update GitHub Actions workflow to use `yarn` (see Step 7 in Option 2)

#### **Step 3: Test the New URL**
- Your new App Service will have a different URL: `https://sabra-shah-quran-academy.azurewebsites.net`
- Test it to make sure SSR is working
- You can keep both running during testing

#### **Step 4: Update Custom Domain (if you have one)**
If you set up a custom domain on your Static Web App:
1. Remove it from Static Web App
2. Add it to your new App Service
3. Update DNS records if needed

#### **Step 5: Switch Traffic (Optional)**
You have two options:

**Option A: Keep Both Running**
- Keep Static Web App for backup
- Use App Service as primary
- Both will auto-deploy from the same GitHub repo

**Option B: Delete Static Web App**
- Once you've verified App Service works:
  1. Go to Azure Portal
  2. Find your Static Web App resource
  3. Click "Delete"
  4. Confirm deletion

### What Changes?
- ✅ **No code changes needed** - Your app already supports SSR
- ✅ **Same GitHub repo** - Both can deploy from the same repo
- ✅ **Same build process** - `yarn build:prod` works for both
- ⚠️ **Different URLs** - You'll get a new URL (or update your custom domain)
- ⚠️ **Different costs** - App Service costs ~$13/month vs free Static Web Apps

### Pro Tip:
You can actually run **both simultaneously** during migration:
- Static Web App: `https://sabra-shah-quran-academy.azurestaticapps.net`
- App Service: `https://sabra-shah-quran-academy.azurewebsites.net`

This lets you test SSR before fully switching over!

---

## 🆘 **Troubleshooting**

**Build fails?**
- Check the GitHub Actions logs (in your repo's "Actions" tab)
- Verify the output location is correct: `dist/sabra-shah-quran-academy/browser` (static) or `dist/sabra-shah-quran-academy/server/server.mjs` (SSR)
- Make sure GitHub Actions workflow uses `yarn` not `npm`

**App not loading?**
- Wait a few minutes after first deployment
- Check the URL is correct
- Look at Azure Portal → "Activity log" for errors
- Verify startup command is set correctly: `node dist/sabra-shah-quran-academy/server/server.mjs`

**Need help?**
- Azure has great documentation at [docs.microsoft.com/azure](https://docs.microsoft.com/azure)
- Check your GitHub Actions workflow file for build errors

---

## ✅ **Next Steps After Deployment**

1. ✅ Test your live URL
2. ✅ Set up a custom domain (optional)
3. ✅ Configure environment variables if needed
4. ✅ Set up monitoring/alerts (optional)
5. ✅ Celebrate! 🎉 Your app is live!
