# 🔍 Debugging "Invalid API key" in Browser

## Current Situation

- ✅ Automated tests (Node.js scripts) **work perfectly**
- ❌ Browser signup/login shows **"Invalid API key"**

This means the issue is specific to how the browser is loading environment variables.

---

## Step 1: Check Environment Variables in Browser

I've created a debug page. Please follow these steps:

### 1. Open the Debug Page

Visit: **http://localhost:3000/debug-env**

### 2. What You Should See

**If environment variables are loaded correctly:**
- ✅ NEXT_PUBLIC_SUPABASE_URL: `https://fegqcrzdqbhoubruchky.supabase.co`
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- ✅ Green success message

**If there's a problem:**
- ❌ UNDEFINED shown for one or both variables
- ❌ Red error message

### 3. Take a Screenshot

Please take a screenshot of what you see and let me know.

---

## Step 2: Check Browser Console

### 1. Open Browser Developer Tools

- **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Cmd+Option+I` (Mac)
- **Safari**: Enable Develop menu first, then `Cmd+Option+I`

### 2. Go to Console Tab

Click on the "Console" tab

### 3. Go to Signup Page

Visit: http://localhost:3000/signup

### 4. Check Console Output

You should see these debug logs I added:
```
🔍 Supabase URL: https://fegqcrzdqbhoubruchky.supabase.co
🔍 Supabase Key: eyJhbGciOiJIUzI1NiIsInR...
```

**What do you see?**
- If you see the URL and key → Environment variables are loading
- If you see `undefined` → Environment variables are NOT loading

### 5. Try to Sign Up

Enter email and password, then check for errors in the console.

---

## Step 3: Clear Browser Cache

Sometimes browsers cache old builds. Let's clear it:

### Hard Refresh (Try This First)

- **Windows/Linux**: `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

### Clear All Cache (If Hard Refresh Doesn't Work)

**Chrome/Edge:**
1. Press `Cmd/Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"

**Firefox:**
1. Press `Cmd/Ctrl + Shift + Delete`
2. Select "Cache"
3. Click "Clear Now"

**Safari:**
1. Open Preferences → Privacy
2. Click "Manage Website Data"
3. Click "Remove All"

### After Clearing Cache

1. Close and reopen your browser
2. Visit http://localhost:3000/debug-env again
3. Then try signup at http://localhost:3000/signup

---

## Step 4: Verify .env.local File Location

The `.env.local` file **must** be in the correct location.

### Check File Location

Run this command:
```bash
ls -la /Users/carpediem/astro-mood/apps/web/.env.local
```

You should see:
```
-rw-r--r--  1 carpediem  staff  447 Jan 16 02:32 /Users/carpediem/astro-mood/apps/web/.env.local
```

### Verify File Contents

```bash
cat /Users/carpediem/astro-mood/apps/web/.env.local
```

Should show:
```
NEXT_PUBLIC_SUPABASE_URL=https://fegqcrzdqbhoubruchky.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ3FjcnpkcWJob3VicnVjaGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MjMxODIsImV4cCI6MjA4NDA5OTE4Mn0.30Vg58OxWNAGTOouse1FwABW1AzuUqsiXed3FwXHjoY
```

---

## Step 5: Check Server is Running with .env.local

The server output should show that `.env.local` is being loaded:

```bash
tail -20 /private/tmp/claude/-Users-carpediem/tasks/b8ad491.output
```

You should see:
```
▲ Next.js 16.1.2 (Turbopack)
- Local:         http://localhost:3000
- Environments: .env.local    ← This line is important!
✓ Ready in 495ms
```

If you DON'T see "Environments: .env.local", that's the problem!

---

## What To Report Back

Please tell me:

1. **Debug Page** (http://localhost:3000/debug-env):
   - Do you see the environment variables?
   - Screenshot if possible

2. **Browser Console** (on /signup page):
   - What do you see in the console?
   - Any errors or warnings?
   - Do you see the 🔍 debug logs?

3. **Cache Clearing**:
   - Did you do a hard refresh?
   - Did it help?

4. **File Location**:
   - Is .env.local in the right place?
   - Does it have the correct contents?

5. **Server Output**:
   - Does it show "Environments: .env.local"?

---

## Possible Solutions

Based on what you find, here are potential fixes:

### If env vars are undefined in browser:
1. Restart the dev server completely
2. Make sure .env.local is in `apps/web/` not root
3. Check for typos in variable names

### If env vars show up but signup still fails:
1. The API keys might be invalid
2. Supabase project settings might have changed
3. Network/CORS issue

### If nothing works:
I'll need to see:
- Screenshot of debug page
- Browser console logs
- Any network errors in Network tab

---

Let me know what you find!
