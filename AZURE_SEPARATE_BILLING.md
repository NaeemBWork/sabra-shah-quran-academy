# Setting Up Separate Billing in Azure

This guide explains how to set up your Quran Academy project with completely separate billing from your surf-shop project.

---

## 🎯 **Understanding Azure Billing**

**Key Concept:** In Azure, billing is tied to **Subscriptions**, not individual resources.

- Each **Subscription** has its own:
  - Payment method (credit card/bank account)
  - Billing cycle
  - Invoice
  - Cost tracking

- **Resources** (like Static Web Apps) belong to a Subscription
- To have separate billing, you need **separate Subscriptions**

---

## 📋 **Step-by-Step: Create New Subscription with Separate Billing**

### **STEP 1: Create a New Azure Subscription**

1. Go to [portal.azure.com](https://portal.azure.com)
2. In the top search bar, type: **"Subscriptions"**
3. Click on **"Subscriptions"** from the results
4. Click the **"+ Add"** button at the top
5. You'll see subscription options. Choose one:

   **Option A: Pay-As-You-Go (Recommended)**
   - Best for: Most users
   - No upfront cost
   - Pay only for what you use
   - Can use free tier services
   - Click **"Pay-As-You-Go"** → **"Create"**

   **Option B: Free Trial (if eligible)**
   - Only if you haven't used Azure free trial before
   - $200 credit for 30 days
   - Click **"Free Trial"** → **"Create"**

6. Fill in the details:
   - **Subscription Name:** `Quran Academy Subscription` (or any name)
   - **Billing Account:** Select your existing billing account OR create new
   - Click **"Create"**

---

### **STEP 2: Link New Payment Method**

**Important:** This is where you add your separate bank account/credit card.

1. After creating the subscription, you'll be prompted to add a payment method
2. Click **"Add payment method"**
3. Enter your **NEW bank account/credit card details**:
   - Card number
   - Expiry date
   - CVV
   - Billing address
   - **This should be DIFFERENT from your surf-shop subscription**

4. Click **"Save"**

**OR** if you need to add it later:

1. Go to [portal.azure.com](https://portal.azure.com)
2. Search for **"Cost Management + Billing"**
3. Click **"Payment methods"** in the left menu
4. Click **"+ Add"**
5. Enter your new payment method details
6. Link it to your new subscription

---

### **STEP 3: Verify Subscription is Set Up**

1. Go to **"Subscriptions"** in Azure Portal
2. You should now see TWO subscriptions:
   - Your original subscription (for surf-shop)
   - Your new subscription (for Quran Academy)
3. Click on your new subscription
4. Verify:
   - **Status:** Active
   - **Payment method:** Shows your new payment method
   - **Billing account:** Should be separate or clearly identified

---

### **STEP 4: Create Resources Under New Subscription**

**CRITICAL:** When creating your Static Web App, make sure you select the NEW subscription!

1. When you follow the deployment steps, in **STEP 4** (Configure Basic Settings):
2. **Subscription:** Select your **NEW subscription** (Quran Academy Subscription)
   - ⚠️ **DO NOT** select your old subscription (surf-shop one)
3. Continue with the rest of the setup

---

### **STEP 5: Set Up Billing Alerts (Recommended)**

To track costs separately:

1. Go to **"Cost Management + Billing"** in Azure Portal
2. Click **"Cost alerts"** → **"+ Add"**
3. Configure:
   - **Alert name:** `Quran Academy Budget Alert`
   - **Subscription:** Select your NEW subscription
   - **Budget amount:** Set a limit (e.g., $10/month)
   - **Alert emails:** Your email
4. Click **"Create"**

This way you'll get notified if costs exceed your budget.

---

## 🔍 **How to Verify Resources are Under Correct Subscription**

### **Check Existing Resources:**

1. Go to **"Subscriptions"** in Azure Portal
2. Click on your **NEW subscription** (Quran Academy)
3. Click **"Resources"** in the left menu
4. You should see your Static Web App listed here
5. If you see surf-shop resources here, something is wrong!

### **Check When Creating New Resources:**

Every time you create a resource in Azure:
- **ALWAYS check the Subscription dropdown**
- Make sure it's set to your **NEW subscription** (Quran Academy)
- Not your old subscription (surf-shop)

---

## 💰 **Billing Best Practices**

### **1. Use Resource Groups for Organization**

Create separate resource groups for each project:

- **Resource Group 1:** `surf-shop-rg` (under old subscription)
- **Resource Group 2:** `quran-academy-rg` (under NEW subscription)

This helps organize resources even if they're in the same subscription.

### **2. Set Up Cost Alerts**

Set up alerts for both subscriptions:
- Surf-shop subscription: Alert at your budget
- Quran Academy subscription: Alert at your budget

### **3. Review Billing Regularly**

1. Go to **"Cost Management + Billing"**
2. Select your subscription
3. Click **"Cost analysis"**
4. Review monthly costs
5. Do this for BOTH subscriptions separately

### **4. Use Tags for Tracking (Optional)**

You can tag resources for better cost tracking:
- Tag all Quran Academy resources with: `Project: QuranAcademy`
- Tag all surf-shop resources with: `Project: SurfShop`

---

## ⚠️ **Important Notes**

### **What's Separate:**
- ✅ Billing/Payment methods
- ✅ Invoices
- ✅ Cost tracking
- ✅ Budget alerts
- ✅ Resource organization

### **What's Shared:**
- ⚠️ **Azure Account** (same login)
- ⚠️ **Access Control** (unless you set up separate users)
- ⚠️ **Support Plan** (if you have one)

### **Free Tier Services:**
- Both subscriptions can use free tier services
- Free tier limits apply **per subscription**
- Example: You can have 1 free Static Web App in EACH subscription

---

## 🆘 **Troubleshooting**

### **I Created a Resource Under Wrong Subscription**

**Don't worry!** You can move resources:

1. Go to the resource (e.g., Static Web App)
2. Click **"Move"** → **"Move to another subscription"**
3. Select your target subscription
4. Click **"Move"**

**Note:** Some resources can't be moved. If that's the case, you'll need to delete and recreate under the correct subscription.

### **I Can't See My New Subscription**

1. Check you're logged into the correct Azure account
2. Go to **"Subscriptions"** and verify it's listed
3. If not, check if you need to accept an invitation (if created by someone else)

### **Payment Method Not Working**

1. Go to **"Cost Management + Billing"** → **"Payment methods"**
2. Verify the payment method is active
3. Check if there are any errors
4. Try adding a different payment method

---

## ✅ **Quick Checklist**

Before creating your Static Web App, verify:

- [ ] New subscription created
- [ ] New payment method added and linked
- [ ] Subscription is active
- [ ] You know which subscription to select when creating resources
- [ ] Billing alerts set up (optional but recommended)

---

## 🎯 **Summary**

**To have completely separate billing:**

1. ✅ Create a **new Azure Subscription**
2. ✅ Link a **new payment method** (different bank account/card)
3. ✅ When creating resources, **select the new subscription**
4. ✅ Set up **separate billing alerts** for each subscription
5. ✅ Use **separate resource groups** for organization

**Result:** 
- Separate invoices
- Separate payment methods
- Separate cost tracking
- Complete billing separation

---

## 📞 **Need Help?**

- Azure Billing Support: [azure.microsoft.com/support](https://azure.microsoft.com/support)
- Azure Portal: [portal.azure.com](https://portal.azure.com)
- Cost Management Docs: [docs.microsoft.com/azure/cost-management-billing](https://docs.microsoft.com/azure/cost-management-billing)
