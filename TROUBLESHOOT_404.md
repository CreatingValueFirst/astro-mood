# 🔍 Troubleshooting 404 Error

## Quick Diagnosis Steps

### 1. Which URL is giving 404?

Please check **EXACTLY** which URL you're visiting:

**✅ Correct URLs:**
- `https://astro-mood.vercel.app` (homepage)
- `https://astro-mood.vercel.app/dashboard`
- `https://astro-mood.vercel.app/chart`

**❌ Common Mistakes:**
- `https://astro-world-eight.vercel.app` (old deployment name?)
- `http://localhost:3000` (only works with `npm run dev`)
- Missing `/` at the end
- Typos in URL

---

## Most Likely Causes

### Cause #1: Deployment Still In Progress ⏳
**Time:** Deployments take 2-5 minutes

**Check:**
1. Go to: https://vercel.com/dashboard
2. Look for **astro-mood** project
3. Check if deployment shows "Building..." or "Ready"

**Status Indicators:**
- 🟡 Building... → Wait 2-5 minutes
- ✅ Ready → Should work now
- ❌ Failed → See "Deployment Failed" section below

---

### Cause #2: Wrong URL
**You might be using an old deployment URL**

**Find Your Correct URL:**
1. Go to: https://vercel.com/dashboard
2. Click on **astro-mood** project
3. Look for "Domains" section
4. Copy the production URL

**It should look like:**
- `astro-mood.vercel.app`
- `astro-mood-[username].vercel.app`
- Or a custom domain if you set one up

---

### Cause #3: Authentication Redirect
**The app might be redirecting you incorrectly**

**Symptoms:**
- You see 404 after trying to visit /dashboard
- You're not logged in

**Solution:**
1. Go to the homepage first: `https://[your-url].vercel.app`
2. Click "Sign Up" or "Login"
3. Complete authentication
4. Then try /dashboard or /chart

---

### Cause #4: Deployment Failed ❌

**Check Build Logs:**
1. Vercel Dashboard → astro-mood project
2. Click on latest deployment
3. Click "Building" or "Failed" status
4. Read error messages

**Common Build Errors:**
- TypeScript errors (we fixed these)
- Missing dependencies (we installed them)
- Environment variables missing

---

## Step-by-Step Debugging

### Step 1: Verify Deployment Exists

```bash
# In your terminal:
cd /Users/carpediem/astro-mood
git log --oneline -1
```

**Expected output:**
```
1869add feat: Add natal chart visualization and today's transits features
```

**If different:** Deployment might not have picked up latest commit

---

### Step 2: Check Vercel Dashboard

**Go to:** https://vercel.com/dashboard

**Look for:**
- Project name: **astro-mood**
- Latest deployment
- Status: Should show "Ready" (green checkmark)

**Click on deployment to see:**
- Build logs
- Deployment time
- Production URL
- Any errors

---

### Step 3: Test Each Route

**Try these URLs one by one:**

1. **Homepage:**
   ```
   https://astro-mood.vercel.app
   ```
   **Expected:** Landing page with "AstroMood" title

2. **Signup:**
   ```
   https://astro-mood.vercel.app/signup
   ```
   **Expected:** Registration form

3. **Login:**
   ```
   https://astro-mood.vercel.app/login
   ```
   **Expected:** Login form

4. **Dashboard (requires auth):**
   ```
   https://astro-mood.vercel.app/dashboard
   ```
   **Expected:** Redirects to /login if not authenticated

5. **Chart (requires auth):**
   ```
   https://astro-mood.vercel.app/chart
   ```
   **Expected:** Redirects to /login if not authenticated

---

## Common 404 Scenarios

### Scenario A: "All pages give 404"
**Likely cause:** Deployment hasn't started or failed

**Fix:**
1. Check Vercel dashboard
2. Look for deployment with commit `1869add`
3. If no deployment, trigger manual deployment:
   - Vercel Dashboard → astro-mood → Deployments
   - Click "Redeploy" on latest deployment

---

### Scenario B: "Only /chart gives 404"
**Likely cause:** Route not building correctly

**Fix:**
1. Check if chart/page.tsx exists:
   ```bash
   ls apps/web/src/app/chart/page.tsx
   ```
2. If exists, rebuild:
   ```bash
   npm run build
   ```
3. If build succeeds locally, redeploy on Vercel

---

### Scenario C: "Homepage works, but /dashboard gives 404"
**Likely cause:** Authentication middleware issue

**Fix:**
1. Clear browser cache
2. Try incognito mode
3. Check browser console for errors
4. Ensure you're logged in

---

### Scenario D: "Different domain shows old version"
**Likely cause:** Multiple deployments/domains

**Fix:**
1. Vercel Dashboard → astro-mood → Settings → Domains
2. Check which domain is "Production"
3. Use the production domain
4. Or promote latest deployment to production

---

## Emergency Fixes

### Fix #1: Force Redeploy

**Via Vercel Dashboard:**
1. Go to: https://vercel.com/dashboard
2. Click **astro-mood** project
3. Go to "Deployments" tab
4. Click on latest deployment
5. Click "..." menu → "Redeploy"
6. Wait 2-5 minutes

---

### Fix #2: Check Environment Variables

**Required environment variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Verify:**
1. Vercel Dashboard → astro-mood → Settings → Environment Variables
2. Make sure both are set
3. If missing, add them and redeploy

---

### Fix #3: Clear Vercel Cache

**Via Vercel Dashboard:**
1. Settings → General
2. Scroll to "Cache"
3. Click "Clear Cache"
4. Trigger new deployment

---

### Fix #4: Check Build Command

**Verify in Vercel Dashboard:**
1. Settings → General
2. Check "Build & Development Settings"

**Should be:**
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `apps/web/.next`
- **Install Command:** `npm install --include=workspace-root`

---

## Advanced Debugging

### Check GitHub Actions
1. Go to: https://github.com/CreatingValueFirst/astro-mood
2. Click "Actions" tab
3. Look for workflow runs
4. Check if any failed

### Check Vercel Integration
1. GitHub repo → Settings → Integrations
2. Look for "Vercel"
3. Ensure it's connected
4. If not, reconnect from Vercel dashboard

### Test Locally
```bash
cd /Users/carpediem/astro-mood
npm run build
npm run start
```

**Open:** http://localhost:3000

**If works locally but not on Vercel:**
- Environment variable mismatch
- Build configuration issue
- Cache problem

---

## Get Your Production URL

### Method 1: Vercel Dashboard
1. https://vercel.com/dashboard
2. Click **astro-mood**
3. Look for "Production Deployment"
4. Copy URL shown

### Method 2: Check vercel.json
```bash
cat .vercel/project.json
```

Look for `projectName` → Your URL is likely:
`https://[projectName].vercel.app`

### Method 3: Check Git
Your git push should show deployment URL in the output

---

## Still Getting 404?

### Provide This Information:

1. **Exact URL you're visiting:**
   ```
   Example: https://astro-mood.vercel.app/chart
   ```

2. **Vercel deployment status:**
   - Go to dashboard, screenshot deployment status

3. **Browser console errors:**
   - Open DevTools (F12)
   - Go to Console tab
   - Screenshot any red errors

4. **Network tab:**
   - DevTools → Network tab
   - Refresh page
   - Look for 404 response
   - Screenshot the request

5. **Which page works:**
   - Homepage works? Yes/No
   - /login works? Yes/No
   - /dashboard works? Yes/No
   - /chart gives 404? Yes/No

---

## Quick Test Checklist

Run through this checklist:

- [ ] I'm using the correct production URL from Vercel dashboard
- [ ] Deployment shows "Ready" status (green checkmark)
- [ ] At least the homepage loads successfully
- [ ] I've waited at least 5 minutes since pushing to GitHub
- [ ] I'm logged in when trying to access /dashboard or /chart
- [ ] Browser cache is cleared (or using incognito mode)
- [ ] No errors in browser console (F12 → Console tab)

---

## Most Common Solution

**90% of the time, it's one of these:**

1. ⏳ **Deployment still building** - Wait 2-5 minutes
2. 🔗 **Wrong URL** - Check Vercel dashboard for correct URL
3. 🔒 **Not logged in** - Login first, then visit /dashboard or /chart
4. 🌐 **Using old domain** - Use the production URL from Vercel
5. 💾 **Cache issue** - Clear browser cache or use incognito

---

## Contact Info

If none of this works, provide:
1. Exact URL
2. Screenshot of Vercel deployment status
3. Screenshot of browser console errors
4. Which routes work vs don't work

---

**Last Updated:** 2026-01-17
**Purpose:** Debug 404 errors after deployment
