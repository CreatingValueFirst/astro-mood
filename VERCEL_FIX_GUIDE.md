# 🔧 VERCEL 404 FIX - Monorepo Configuration

## 🎯 THE PROBLEM

Your app is a **monorepo** with Next.js in `apps/web`, but Vercel might be trying to build from the root directory. This causes 404 errors because it can't find the Next.js app.

---

## ✅ THE SOLUTION - Configure Root Directory in Vercel

### Step 1: Go to Vercel Dashboard

1. Visit: **https://vercel.com/dashboard**
2. Click on your **astro-mood** project
3. Click **Settings** (top navigation)
4. Click **General** (left sidebar)

---

### Step 2: Set Root Directory

Scroll down to **"Root Directory"** section

**Current setting:** Probably `.` (root) or empty

**Change to:** `apps/web`

**Steps:**
1. Click **"Edit"** next to Root Directory
2. Enter: `apps/web`
3. Click **"Save"**

**Screenshot what you should see:**
```
Root Directory: apps/web
└─ This is where your Next.js app lives
```

---

### Step 3: Verify Build Settings

While in Settings → General, scroll to **"Build & Development Settings"**

**Verify these settings:**

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Build Command** | (leave default or empty) |
| **Output Directory** | (leave default or empty) |
| **Install Command** | `npm install --include=workspace-root` |

**Why leave empty?**
- Vercel auto-detects from `apps/web/package.json`
- Root directory setting tells it where to look

---

### Step 4: Trigger New Deployment

**Option A: Via Dashboard (Recommended)**
1. Go to **Deployments** tab
2. Click **"Redeploy"** button on the latest deployment
3. Wait 2-5 minutes
4. Status should change to "Ready" ✅

**Option B: Via Git Push**
```bash
# Make a tiny change to trigger deployment
git commit --allow-empty -m "chore: trigger Vercel redeploy with correct root"
git push origin main
```

---

## 🧪 VERIFY THE FIX

Once deployment completes (2-5 min), test these URLs:

1. **Homepage:**
   ```
   https://astro-mood.vercel.app
   ```
   ✅ Should show: Landing page

2. **Login:**
   ```
   https://astro-mood.vercel.app/login
   ```
   ✅ Should show: Login form

3. **Dashboard** (after logging in):
   ```
   https://astro-mood.vercel.app/dashboard
   ```
   ✅ Should show: Dashboard with "Today's Cosmic Energy"

4. **Chart** (after logging in):
   ```
   https://astro-mood.vercel.app/chart
   ```
   ✅ Should show: Natal chart wheel

---

## 🔍 WHY THIS FIXES IT

### The Problem
```
Your repository structure:
/
├── apps/
│   └── web/          ← Next.js app is HERE
│       ├── package.json
│       ├── next.config.ts
│       └── src/
├── packages/
└── package.json      ← Vercel was building from HERE (wrong!)
```

### The Solution
By setting **Root Directory** to `apps/web`, Vercel now:
1. ✅ Finds `next.config.ts` in the right place
2. ✅ Finds `package.json` with Next.js scripts
3. ✅ Builds the app correctly
4. ✅ Serves all routes properly

---

## 📋 ALTERNATIVE: Environment Variable Method

If you can't change Root Directory for some reason:

### Create vercel.json in apps/web/
```bash
cat > apps/web/vercel.json << 'EOF'
{
  "framework": "nextjs"
}
EOF
```

### Update root vercel.json
```json
{
  "buildCommand": "cd apps/web && npm run build",
  "installCommand": "npm install --include=workspace-root",
  "outputDirectory": "apps/web/.next"
}
```

### Commit and push
```bash
git add apps/web/vercel.json vercel.json
git commit -m "fix: Configure Vercel for monorepo"
git push origin main
```

---

## 🆘 STILL NOT WORKING?

### Check #1: Deployment Logs
1. Vercel Dashboard → astro-mood → Deployments
2. Click on latest deployment
3. Click "Building" section
4. Look for errors

**Common errors:**
- "Cannot find module 'next'" → Wrong directory
- "Command not found" → Build command wrong
- "Module not found" → Dependencies not installed

---

### Check #2: Environment Variables

Make sure these are set in Vercel:

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key

**Verify:**
1. Settings → Environment Variables
2. Both should be present
3. If missing, add them and redeploy

**Get values from:**
- Supabase Dashboard → Settings → API
- Copy URL and anon public key

---

### Check #3: Build Output

In deployment logs, look for:

**Good output:**
```
Route (app)
├ ○ /
├ ○ /chart          ← Should be here!
├ ○ /dashboard      ← Should be here!
├ ƒ /api/chart      ← Should be here!
└ ƒ /api/transits/today ← Should be here!
```

**Bad output:**
```
Error: Cannot find module 'next'
```
→ This means wrong root directory

---

## 🎯 QUICK FIX CHECKLIST

Follow this in order:

- [ ] 1. Go to Vercel Dashboard → astro-mood → Settings → General
- [ ] 2. Set **Root Directory** to `apps/web`
- [ ] 3. Click Save
- [ ] 4. Go to Deployments tab
- [ ] 5. Click "Redeploy" on latest deployment
- [ ] 6. Wait 2-5 minutes for build to complete
- [ ] 7. Check deployment shows "Ready" ✅
- [ ] 8. Visit `https://astro-mood.vercel.app`
- [ ] 9. Should work! 🎉

---

## 📱 CONTACT INFO IF STUCK

If still getting 404 after following these steps, provide:

1. **Screenshot of:**
   - Vercel Settings → General → Root Directory setting
   - Latest deployment status (Ready/Failed)
   - Deployment logs (if failed)

2. **Answer these:**
   - Does homepage work? (Yes/No)
   - Does /login work? (Yes/No)
   - What error shows in browser console? (F12 → Console)

---

## 🎓 EXPLANATION: Monorepo Best Practices

### Why Root Directory Matters

**Monorepo structure:**
```
astro-mood/
├── apps/
│   └── web/               ← Your Next.js app
│       ├── next.config.ts  ← Vercel needs to find this
│       ├── package.json    ← And this
│       └── src/
└── package.json           ← This is just for workspace
```

**Without Root Directory:**
- Vercel looks in `/` for `next.config.ts` → Not found!
- Vercel can't build Next.js app
- Result: 404 on all pages

**With Root Directory = `apps/web`:**
- Vercel looks in `/apps/web/` for `next.config.ts` → Found! ✅
- Vercel builds Next.js app correctly
- Result: All pages work! 🎉

---

## 🚀 EXPECTED RESULT

After fixing:

**Before:**
```
https://astro-mood.vercel.app → 404 ❌
```

**After:**
```
https://astro-mood.vercel.app → Landing page ✅
https://astro-mood.vercel.app/chart → Chart page ✅
https://astro-mood.vercel.app/dashboard → Dashboard ✅
```

---

## ⏱️ HOW LONG?

- **Setting root directory:** 30 seconds
- **Triggering redeploy:** 10 seconds
- **Build time:** 2-5 minutes
- **Total:** < 6 minutes to fix

---

**Last Updated:** 2026-01-17
**Status:** Ready to fix
**Confidence:** 95% this solves the 404 issue

---

## 🎯 TL;DR

**Problem:** Vercel building from wrong directory
**Solution:** Set Root Directory to `apps/web` in Vercel Settings
**Time:** 5 minutes
**Success Rate:** Very high for monorepo 404 issues
