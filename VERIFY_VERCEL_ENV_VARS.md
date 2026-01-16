# 🔍 Verify Vercel Environment Variables

## The Problem

You're still getting "Invalid API key" which means the environment variables are either:
1. Not saved in Vercel
2. Not applied to the deployment
3. Saved incorrectly (typo in name or value)

---

## Step 1: Verify Environment Variables Are Saved

I've opened the Vercel Environment Variables page in your browser.

**Look for these TWO variables:**

### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Name must be EXACTLY**: `NEXT_PUBLIC_SUPABASE_URL` (case-sensitive!)
- **Value should be**: `https://fegqcrzdqbhoubruchky.supabase.co`
- **Environments**: All 3 checked (Production, Preview, Development)

### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name must be EXACTLY**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` (case-sensitive!)
- **Value should start with**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Environments**: All 3 checked (Production, Preview, Development)

---

## Step 2: Check What You See

**Look at your Vercel Environment Variables page and tell me:**

### Option A: ✅ Both variables are there
- You see both variables listed
- Names are spelled correctly
- All 3 environments are checked

**→ Go to Step 3 (Redeploy)**

### Option B: ❌ Variables are missing or wrong
- One or both variables are NOT listed
- OR the names are spelled wrong (even one letter!)
- OR not all 3 environments are checked

**→ Add them again following the instructions below**

### Option C: ⚠️ Variables are there but different names
- Maybe you see `SUPABASE_URL` instead of `NEXT_PUBLIC_SUPABASE_URL`
- OR `NEXT_PUBLIC_SUPABASE_KEY` instead of `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**→ DELETE the wrong ones and add the correct ones**

---

## Step 3: If Variables Are Missing - Add Them Again

### Add Variable #1

Click **"Add New"** (or "Add Another" button)

**Type EXACTLY** (copy and paste!):

**Name:**
```
NEXT_PUBLIC_SUPABASE_URL
```

**Value:**
```
https://fegqcrzdqbhoubruchky.supabase.co
```

**Environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

Click **"Save"**

### Add Variable #2

Click **"Add New"** again

**Type EXACTLY** (copy and paste!):

**Name:**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ3FjcnpkcWJob3VicnVjaGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MjMxODIsImV4cCI6MjA4NDA5OTE4Mn0.30Vg58OxWNAGTOouse1FwABW1AzuUqsiXed3FwXHjoY
```

**Environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

Click **"Save"**

---

## Step 4: Redeploy (IMPORTANT!)

After the variables are saved, you MUST redeploy:

### Option A: Redeploy from Deployments Tab (Recommended)

1. Go to **"Deployments"** tab (top of page)
2. Find the LATEST deployment (should be at the top)
3. Click the **three dots** (...) on the right side
4. Click **"Redeploy"**
5. **IMPORTANT**: Click **"Redeploy"** again to confirm (DO NOT click "Use existing build cache")
6. Wait 1-2 minutes for deployment to complete

### Option B: Trigger New Deployment from Git

```bash
cd /Users/carpediem/astro-mood
git commit --allow-empty -m "Trigger deployment with env vars"
git push
```

This creates an empty commit and triggers a new deployment.

---

## Step 5: Wait for Deployment

**Watch the deployment progress:**
- Status should change from "Building" → "Ready"
- Takes about 1-2 minutes
- You'll see "Ready" with a green checkmark when done

---

## Step 6: Test Again

Once deployment shows "Ready":

1. **Hard refresh** the signup page:
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

2. **Try signing up** at: https://astro-world-eight.vercel.app/signup

3. It should work now! ✅

---

## Common Mistakes

### ❌ Wrong Variable Names
```
SUPABASE_URL                    ← WRONG (missing NEXT_PUBLIC_)
NEXT_PUBLIC_SUPABASE_KEY        ← WRONG (should be ANON_KEY)
next_public_supabase_url        ← WRONG (wrong case)
```

### ✅ Correct Variable Names
```
NEXT_PUBLIC_SUPABASE_URL        ← CORRECT
NEXT_PUBLIC_SUPABASE_ANON_KEY   ← CORRECT
```

### ❌ Forgot to Check All Environments
- Only checked "Production" → Preview deployments won't work

### ✅ All Environments Checked
- Production ✅
- Preview ✅
- Development ✅

### ❌ Didn't Redeploy After Adding Variables
- Variables won't take effect until you redeploy!

### ✅ Redeployed After Adding Variables
- Environment variables are now included in the build

---

## Screenshot Guide

When you look at the Environment Variables page, you should see:

```
┌─────────────────────────────────────────────────────┐
│ Environment Variables                                │
├─────────────────────────────────────────────────────┤
│ NEXT_PUBLIC_SUPABASE_URL                            │
│ https://fegqcrzdqbhoubruchky.supabase.co            │
│ Production, Preview, Development                     │
│ [Edit] [Delete]                                      │
├─────────────────────────────────────────────────────┤
│ NEXT_PUBLIC_SUPABASE_ANON_KEY                       │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV... (hidden)       │
│ Production, Preview, Development                     │
│ [Edit] [Delete]                                      │
└─────────────────────────────────────────────────────┘
```

---

## What to Tell Me

Please check your Vercel dashboard and tell me:

1. **Do you see both variables listed?** (Yes/No)
2. **Are the names spelled exactly right?** (Yes/No)
3. **Are all 3 environments checked?** (Yes/No)
4. **Did you click "Redeploy" after adding them?** (Yes/No)

If all answers are YES, it should work after the new deployment completes!

---

**Check your Vercel dashboard now and report back what you see!**
