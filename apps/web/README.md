# AstroMood Web App

Next.js 16 application for AstroMood - Your Cosmic Mood Companion.

## 🚀 Deploy to Vercel (100% Working Configuration)

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CreatingValueFirst/astro-mood&project-name=astro-mood-app&root-directory=apps/web&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Option 2: Manual Deploy (Detailed Steps)

1. **Go to Vercel**: https://vercel.com/new
2. **Import Repository**: Select `astro-mood` from GitHub
3. **Configure Project** (CRITICAL - DO THIS BEFORE DEPLOYING):

   **Project Name**: `astro-mood-app` (or any name you want)

   **Root Directory**: Click **Edit** → Type `apps/web` ← MUST SET THIS!

   **Framework**: Next.js (auto-detected)

   **Build Settings**: Leave as auto-detected

4. **Environment Variables** - Add these TWO variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://fegqcrzdqbhoubruchky.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ3FjcnpkcWJob3VicnVjaGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzcyMDAsImV4cCI6MjA1MzE1MzIwMH0.OtC2-XTfqdqFa8CtdG1NaQ_-EdD2nzG
   ```

   Select **Production, Preview, Development** for both.

5. **Deploy** - Click deploy and wait 2-3 seconds

### ✅ Success Indicators

Build logs should show:
```
▲ Next.js 16.1.2
Route (app)
┌ ○ /
├ ○ /login
├ ○ /signup
└ ƒ /dashboard
✓ Build Completed in 2-3s
```

**NOT**:
- ❌ "No framework detected"
- ❌ "Build Completed in 48ms"
- ❌ "Static Assets"

## 📦 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 🔨 Build Locally

```bash
npm run build
npm run start
```

## 🧪 Test Database Connection

```bash
node test-supabase.js
```

Should show all ✅ checkmarks for database tables and connections.

## 📂 Project Structure

```
apps/web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Login & Signup
│   │   ├── dashboard/    # Main dashboard
│   │   ├── onboarding/   # User onboarding
│   │   └── page.tsx      # Landing page
│   ├── components/ui/    # shadcn/ui components
│   ├── lib/supabase/     # Supabase clients
│   └── middleware.ts     # Auth middleware
├── public/               # Static assets
└── vercel.json           # Vercel configuration
```

## 🔧 Tech Stack

- **Framework**: Next.js 16.1.2
- **React**: 19.2.3
- **TypeScript**: 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Backend**: Supabase (Auth + Database)
- **Deployment**: Vercel

## 🐛 Troubleshooting

### Build Fails - "Cannot find module"
**Fix**: Verify Root Directory is set to `apps/web` in Vercel

### 404 on All Pages
**Fix**: Check build logs show "Next.js 16.1.2" not "No framework detected"

### Environment Variables Not Loading
**Fix**: Ensure both variables are set for all environments (Prod, Preview, Dev)

## 📚 Documentation

- `/DEPLOYMENT.md` - Complete deployment guide
- `/FIX_VERCEL_NOW.md` - Detailed troubleshooting
- `/FINAL_VERIFICATION.md` - Full verification report

## ✅ Deployment Checklist

Before deploying, verify:
- [ ] Root Directory = `apps/web`
- [ ] Both environment variables added
- [ ] All environments selected for env vars
- [ ] Framework shows "Next.js"
- [ ] No build cache when redeploying

After deployment:
- [ ] Build time > 1 second (not 48ms)
- [ ] See "Route (app)" with pages listed
- [ ] Visit site - should see landing page
- [ ] No 404 errors

## 🎉 What You'll See

When working correctly:
- Beautiful cosmic gradient landing page
- "AstroMood" title with gradient text
- "Get Started" and "Sign In" buttons
- Login and signup forms work
- Dashboard loads after authentication

## 🔐 Post-Deployment

Configure Supabase redirect URLs:
1. Get your Vercel URL
2. Go to Supabase Dashboard → Auth → URL Configuration
3. Add Vercel URL to redirect URLs
4. Set Site URL to your Vercel URL

## 📞 Support

For deployment issues, check:
- Build logs in Vercel Dashboard
- Browser console for errors (F12 → Console)
- Supabase connection test: `node test-supabase.js`
