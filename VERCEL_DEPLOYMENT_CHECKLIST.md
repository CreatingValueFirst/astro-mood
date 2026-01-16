# Vercel Deployment Checklist - Fix 404 Error

## 🔴 Current Issue: 404 Error After Deployment

Your build succeeded, but the site shows a 404 error. Follow this checklist **exactly** to fix it.

---

## ✅ Step-by-Step Fix Guide

### Step 1: Verify Vercel Project Settings

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project** (e.g., `astro-mood`)
3. **Go to Settings** → **General**
4. **Find "Root Directory"** section
5. **CRITICAL CHECK**:
   - Click **Edit** next to Root Directory
   - It MUST say: `apps/web`
   - If it's blank or says something else, **change it to `apps/web`**
   - Click **Save**

### Step 2: Verify Framework Detection

Still in **Settings** → **General**:

1. **Framework Preset**: Should be **Next.js**
2. **Build Command**: Should be `npm run build` or auto-detected
3. **Output Directory**: Should be `.next` or auto-detected
4. **Install Command**: Should be `npm install` or auto-detected

If any of these are wrong:
- Click **Edit** for each
- Set the correct values
- Click **Save**

### Step 3: Verify Environment Variables

Go to **Settings** → **Environment Variables**:

**Required Variables** (must have BOTH):

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fegqcrzdqbhoubruchky.supabase.co` | All (Production, Preview, Development) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` (your full anon key) | All (Production, Preview, Development) |

**Check**:
- [ ] Both variables exist
- [ ] Values have NO extra spaces before or after
- [ ] Both are available in "Production" environment
- [ ] Keys match exactly (including `NEXT_PUBLIC_` prefix)

**If variables are missing or wrong**:
1. Click **Add Environment Variable**
2. Enter exact name (copy from table above)
3. Paste value (no spaces!)
4. Select **All Environments**
5. Click **Save**

### Step 4: Trigger Fresh Deployment

After fixing the above settings:

1. **Go to Deployments tab**
2. **Click** the **⋮** (three dots) on the LATEST deployment
3. **Select** "Redeploy"
4. **Check** "Use existing build cache" (UNCHECK this box) ← Important!
5. **Click** "Redeploy"

Wait 2-3 minutes for the build to complete.

### Step 5: Check Build Logs

While the build is running:

1. **Click** on the deployment to open it
2. **View Build Logs** (automatically shows during build)
3. **Look for**:
   - ✅ `Build Completed in X seconds`
   - ✅ `Route (app)` section showing all your pages
   - ❌ Any errors in red

**Expected Output**:
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /dashboard
├ ○ /login
├ ○ /onboarding
└ ○ /signup
```

If you see this, the build is successful!

### Step 6: Test the Deployed Site

After deployment finishes:

1. **Click** "Visit" button or copy the URL
2. **Test these URLs**:
   - `https://your-project.vercel.app/` - Should show landing page
   - `https://your-project.vercel.app/login` - Should show login page
   - `https://your-project.vercel.app/signup` - Should show signup page

**If you still get 404**:
- Clear your browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Try in incognito/private browser window
- Wait 1-2 minutes for CDN propagation

---

## 🔍 Troubleshooting Specific Errors

### Error: "Cannot find module" during build

**Cause**: Root Directory not set to `apps/web`

**Fix**:
1. Settings → General → Root Directory → Edit → `apps/web`
2. Save and redeploy

### Error: "Missing required environment variable"

**Cause**: Environment variables not set or incorrect

**Fix**:
1. Settings → Environment Variables
2. Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Select "All Environments"
4. Save and redeploy

### Error: Build succeeds but 404 on all pages

**Causes**:
1. Stale cache - Redeploy without build cache
2. CDN caching - Wait 5 minutes or clear browser cache
3. Wrong output directory - Should be `.next`

**Fix**:
1. Go to Deployments
2. Redeploy WITHOUT build cache
3. Wait 5 minutes
4. Try in incognito browser

### Pages work locally but not on Vercel

**Cause**: Environment variables or Supabase URL issue

**Fix**:
1. Verify environment variables are set in Vercel (see Step 3)
2. Check browser console for errors (F12 → Console tab)
3. Check Vercel Function logs (Deployments → Latest → Functions)

---

## 📊 Verification Checklist

After redeploying, verify:

- [ ] Landing page loads (`/`)
- [ ] Login page loads (`/login`)
- [ ] Signup page loads (`/signup`)
- [ ] No console errors in browser (F12 → Console)
- [ ] Supabase connection works (try signing up)
- [ ] No 404 errors on any page

---

## 🚨 If Still Getting 404

### Option A: Delete and Recreate Vercel Project

Sometimes Vercel caches bad configuration. Fresh start:

1. **Vercel Dashboard** → Your Project → **Settings** → **General**
2. Scroll to bottom → **Delete Project**
3. Confirm deletion
4. Go back to **Dashboard** → **Add New** → **Project**
5. **Import** your GitHub repo again
6. **Set Root Directory** to `apps/web` BEFORE deploying
7. **Add environment variables**
8. **Deploy**

### Option B: Deploy from Vercel CLI

If the dashboard isn't working:

```bash
cd /Users/carpediem/astro-mood/apps/web

# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# When prompted:
# - Project name: astro-mood
# - Directory: . (current directory, since you're already in apps/web)
# - Override settings: No
```

---

## 🎯 Expected Final Result

After following this checklist, you should see:

1. ✅ **Landing page** with "AstroMood" title and cosmic gradient
2. ✅ **Login page** with email/password form
3. ✅ **Signup page** with registration form
4. ✅ **No 404 errors**
5. ✅ **No console errors** in browser DevTools

---

## 📞 Still Stuck?

If you've followed every step and still have issues:

1. **Screenshot** your Vercel settings (Root Directory, Environment Variables)
2. **Copy** your full build log from Vercel
3. **Check** browser console errors (F12 → Console)
4. **Share** these with me for debugging

---

## ✅ Database Verification

To verify your Supabase database is working correctly:

```bash
cd /Users/carpediem/astro-mood/apps/web
node test-supabase.js
```

You should see:
```
✅ Database connection successful
✅ All tables exist
✅ RLS is enabled
✅ Auth endpoints are working
```

If this fails, your Supabase project may be paused or your credentials are incorrect.

---

## 🎉 Success Indicators

Your deployment is successful when:

- ✅ Build completes without errors
- ✅ All routes show in build output
- ✅ Landing page loads correctly
- ✅ Can navigate to /login, /signup
- ✅ No 404 on any page
- ✅ Browser console shows no errors
- ✅ Supabase test script passes

**You're ready to go!** 🚀

---

**Last Updated**: After commit f6879f0
**Verified**: Local build ✅ | Supabase connection ✅ | All tests passing ✅
