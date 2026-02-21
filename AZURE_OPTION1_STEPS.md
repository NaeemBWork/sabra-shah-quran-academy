# Azure Static Web Apps - Step-by-Step Guide (Option 1)

Follow these steps to deploy your Quran Academy app to Azure Static Web Apps (FREE tier with automatic deployments).

---

## 📋 **Prerequisites Checklist**

Before you start, make sure you have:
- ✅ Azure account (free tier is fine) - [Sign up here](https://portal.azure.com)
- ✅ GitHub account
- ✅ Your code pushed to GitHub repository: `sabra-shah-quran-academy`

---

## 🚀 **Step-by-Step Instructions**

### **STEP 1: Push Your Code to GitHub (if not already done)**

1. Open terminal in your project folder
2. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Create a GitHub repository:
   - Go to [github.com](https://github.com)
   - Click "+" → "New repository"
   - Name it: `sabra-shah-quran-academy`
   - Don't initialize with README (you already have files)
   - Click "Create repository"

4. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sabra-shah-quran-academy.git
   git branch -M main
   git push -u origin main
   ```
   *(Replace `YOUR_USERNAME` with your actual GitHub username)*

---

### **STEP 2: Log into Azure Portal**

1. Go to [portal.azure.com](https://portal.azure.com)
2. Sign in with your Microsoft account
3. If you don't have an account, click "Start free" and follow the signup process

---

### **STEP 3: Create Static Web App Resource**

1. In Azure Portal, click the **"+ Create a resource"** button (top left, big green button)
2. In the search bar at the top, type: **"Static Web Apps"**
3. Click on **"Static Web Apps"** from the search results
4. Click the blue **"Create"** button

---

### **STEP 4: Configure Basic Settings**

Fill in the **Basics** tab:

#### **Project Details:**
- **Subscription:** Select your subscription (if you have multiple, choose the one you want to use)
- **Resource Group:** 
  - Click **"Create new"** button
  - Name it: `quran-academy-rg`
  - Click **"OK"**

#### **Static Web App Details:**
- **Name:** `sabra-shah-quran-academy` 
  - *(This must be globally unique - if taken, try adding numbers like `sabra-shah-quran-academy-2024`)*
- **Plan type:** Select **"Free"** from the dropdown
- **Region:** Choose the closest region to you:
  - **East US** (if you're in US East)
  - **West Europe** (if you're in Europe)
  - **Southeast Asia** (if you're in Asia)
  - *(Any region works, but closer = faster)*

#### **Deployment Details:**
- **Source:** Select **"GitHub"** from the dropdown
- Click the **"Sign in with GitHub"** button
- A popup will ask you to authorize Azure - click **"Authorize"**
- **Organization:** Select your GitHub username from the dropdown
- **Repository:** Select `sabra-shah-quran-academy` from the dropdown
- **Branch:** Select `main` from the dropdown

---

### **STEP 5: Configure Build Settings**

Click **"Next: Build Details >"** button at the bottom

#### **Build Presets:**
- **Build Presets:** Select **"Angular"** from the dropdown
  - *(Azure will auto-fill the build settings for Angular!)*

#### **Build Configuration:**
Azure should auto-fill these, but **VERIFY** they match:

- **App location:** `/` 
  - *(This means root of your repo)*

- **Api location:** Leave **EMPTY**
  - *(You don't have a separate API)*

- **Output location:** `dist/sabra-shah-quran-academy/browser`
  - ⚠️ **IMPORTANT:** This is where Angular puts your built files
  - Make sure this matches exactly!

---

### **STEP 6: Review and Create**

1. Click **"Review + Create"** button at the bottom
2. Azure will validate your settings (takes 10-20 seconds)
3. Review all the settings you entered
4. If everything looks good, click the blue **"Create"** button
5. Wait 2-3 minutes while Azure sets everything up
   - You'll see a "Deployment in progress" message

---

### **STEP 7: Get Your Live URL**

1. Once deployment completes, click the **"Go to resource"** button
2. In the Overview page, look for **"URL"** section
3. Your live website URL will be something like:
   ```
   https://sabra-shah-quran-academy.azurestaticapps.net
   ```
4. Click the URL to open your deployed app in a new tab! 🎉

---

### **STEP 8: Verify GitHub Actions is Set Up**

Azure automatically created a GitHub Actions workflow for you:

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/sabra-shah-quran-academy`
2. Click on the **"Actions"** tab
3. You should see a workflow file like: `azure-static-web-apps-*.yml`
4. This means automatic deployments are set up!

---

### **STEP 9: Test Automatic Deployment**

Let's verify that automatic deployments work:

1. Make a small change to your app:
   - Open `src/app/app.html`
   - Add a test comment or change some text

2. Commit and push:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```

3. Watch the deployment:
   - Go to GitHub → **"Actions"** tab
   - You'll see a new workflow run starting
   - Wait 2-3 minutes for it to complete
   - You should see a green checkmark ✅ when done

4. Check your live site:
   - Refresh your Azure Static Web Apps URL
   - Your changes should be live!

---

## ✅ **You're Done!**

Your app is now:
- ✅ Live on the internet
- ✅ Automatically deploying on every `git push`
- ✅ Running on Azure's free tier
- ✅ Accessible via your Azure Static Web Apps URL

---

## 🔧 **What Happens Behind the Scenes**

1. **GitHub Actions Workflow:**
   - Azure created a file: `.github/workflows/azure-static-web-apps-*.yml`
   - This file runs automatically when you push to `main`
   - It builds your Angular app and deploys it

2. **Build Process:**
   - Runs `npm install` (or you can update it to use `yarn`)
   - Runs `npm run build` (builds your Angular app)
   - Takes the files from `dist/sabra-shah-quran-academy/browser`
   - Deploys them to Azure Static Web Apps

3. **Deployment:**
   - Your static files are served from Azure's CDN
   - Fast, global distribution
   - HTTPS enabled automatically

---

## 🆘 **Troubleshooting**

### **Build Fails in GitHub Actions?**

1. Go to GitHub → **"Actions"** tab
2. Click on the failed workflow
3. Check the error message
4. Common issues:
   - **Wrong output location:** Make sure it's `dist/sabra-shah-quran-academy/browser`
   - **Build errors:** Check if your code compiles locally first
   - **Missing dependencies:** Make sure `package.json` has all dependencies

### **App Not Loading?**

1. Wait 5 minutes after first deployment (sometimes takes time)
2. Check the URL is correct
3. Go to Azure Portal → Your Static Web App → **"Activity log"** for errors
4. Try clearing your browser cache

### **Want to Use Yarn Instead of NPM?**

1. Go to GitHub → Your repo → `.github/workflows/` folder
2. Find the `azure-static-web-apps-*.yml` file
3. Click "Edit" (pencil icon)
4. Find the step that says `npm install` and replace with:
   ```yaml
   - name: Install yarn
     run: npm install -g yarn
   
   - name: Install dependencies
     run: yarn install --frozen-lockfile
   ```
5. Find `npm run build` and replace with:
   ```yaml
   - name: Build with Angular
     run: yarn build:prod
   ```
6. Click "Commit changes"

---

## 📝 **Next Steps**

1. **Custom Domain (Optional):**
   - Go to Azure Portal → Your Static Web App → **"Custom domains"**
   - Add your own domain (e.g., `quranacademy.com`)
   - Follow the DNS setup instructions

2. **Update SEO:**
   - Edit `src/index.html` with your actual website URL
   - Add proper meta tags
   - Add an OG image for social media sharing

3. **Monitor:**
   - Check GitHub Actions for deployment status
   - Monitor your Azure Portal for usage/errors

---

## 🎉 **Congratulations!**

Your Quran Academy app is now live on Azure! Every time you push code to GitHub, it will automatically deploy. No manual steps needed!
