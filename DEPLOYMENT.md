# AstroMood Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Your Supabase project is already configured ✅

### Step 1: Push to GitHub

```bash
# Create a new repository on GitHub: https://github.com/new
# Name it: astro-mood

# Add the remote and push
git remote add origin https://github.com/YOUR_USERNAME/astro-mood.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your `astro-mood` repository from GitHub
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://fegqcrzdqbhoubruchky.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ3FjcnpkcWJob3VicnVjaGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MjMxODIsImV4cCI6MjA4NDA5OTE4Mn0.30Vg58OxWNAGTOouse1FwABW1AzuUqsiXed3FwXHjoY
   ```

6. Click "Deploy"

### Step 3: Configure Supabase Redirect URLs

After deployment, add your Vercel URL to Supabase:

1. Go to [https://supabase.com/dashboard/project/fegqcrzdqbhoubruchky/auth/url-configuration](https://supabase.com/dashboard/project/fegqcrzdqbhoubruchky/auth/url-configuration)

2. Add these URLs to **Redirect URLs**:
   ```
   http://localhost:3000/**
   https://YOUR-APP-NAME.vercel.app/**
   ```

3. Update **Site URL** to your production URL:
   ```
   https://YOUR-APP-NAME.vercel.app
   ```

### Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Click "Get Started" → Create an account
3. Enter your birth date in onboarding
4. See your dashboard!

## Automatic Deployments

Vercel will automatically deploy:
- **Production**: When you push to `main` branch
- **Preview**: For every pull request

## Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Supabase redirect URLs with your custom domain

## Troubleshooting

### Issue: "Failed to create profile" on onboarding
**Solution**: Check Supabase RLS policies are enabled and user is authenticated.

### Issue: Redirect loop after login
**Solution**: Ensure middleware.ts is present and Supabase cookies are configured correctly.

### Issue: Environment variables not working
**Solution**: Redeploy after adding environment variables in Vercel dashboard.

## Monitoring

- **Vercel Analytics**: Automatically enabled (view in Vercel dashboard)
- **Supabase Logs**: View database queries and auth events
- **Error Tracking**: Consider adding Sentry for production

## What's Built

✅ **Authentication**: Login, signup, session management
✅ **Onboarding**: Birth profile creation
✅ **Dashboard**: Protected route with user greeting
✅ **Database**: Supabase with RLS policies
✅ **Astrology Engine**: Complete calculation engine ready to use

## Next Steps

Build forecast generation API:
1. Create API route `/api/forecast/generate`
2. Integrate astro-core package calculations
3. Add calendar and insights pages
4. Implement mood visualization charts

---

**Your app is ready to deploy!** 🚀
