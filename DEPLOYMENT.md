# Deployment Guide

This guide walks you through deploying AstroMood to production on Vercel.

## Prerequisites

Before deploying, ensure you have:

- ✅ **GitHub account** with your AstroMood repository
- ✅ **Supabase project** with database migrations applied
- ✅ **Vercel account** (free tier works fine)
- ✅ **Environment variables** ready (Supabase URL and Anon Key)

## Quick Deploy (Recommended)

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CreatingValueFirst/astro-mood&project-name=astro-mood&repository-name=astro-mood&root-directory=apps/web&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY)

1. Click the "Deploy with Vercel" button above
2. Log in to Vercel (or create an account)
3. **Import from GitHub** - Connect your GitHub account if not already connected
4. **Configure Project**:
   - Project Name: `astro-mood` (or your preferred name)
   - Root Directory: `apps/web` (should auto-detect from URL)
5. **Environment Variables** - Add the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://fegqcrzdqbhoubruchky.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
6. Click **Deploy**
7. Wait 2-3 minutes for the build to complete
8. Visit your deployed app at `https://your-project-name.vercel.app`

### Option 2: Import Existing Repository (RECOMMENDED)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. Click **Add New...** → **Project**
3. **Import Git Repository**:
   - Select your `astro-mood` repository
   - If not visible, click "Adjust GitHub App Permissions" to grant access
4. **Configure Project**:
   - Framework Preset: **Next.js** (should auto-detect)
   - **Root Directory: `apps/web`** ⚠️ **CRITICAL**: Click "Edit" next to Root Directory and type: `apps/web`
     - This tells Vercel to build from the apps/web folder
     - Without this, the build will fail!
   - Build Command: `npm run build` (leave as default)
   - Output Directory: `.next` (leave as default)
   - Install Command: `npm install` (leave as default)

5. **Environment Variables**:
   Click "Add Environment Variable" and add BOTH of these:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://fegqcrzdqbhoubruchky.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` (paste your full anon key) |

   ⚠️ **Important**: Make sure there are no extra spaces before or after the values!

6. Click **Deploy**
7. Wait for the build to complete (usually 2-3 minutes)
8. If successful, you'll get a live URL like `https://astro-mood-xyz.vercel.app`

## Post-Deployment Configuration

### 1. Configure Supabase Authentication

After your Vercel deployment is live, you need to add your Vercel URL to Supabase:

1. **Get Your Vercel URL**:
   - Example: `https://astro-mood-xyz123.vercel.app`
   - Or custom domain: `https://yourdomain.com`

2. **Update Supabase Auth Settings**:
   - Go to your Supabase dashboard: https://supabase.com/dashboard
   - Select your project: https://supabase.com/dashboard/project/fegqcrzdqbhoubruchky
   - Navigate to: **Authentication** → **URL Configuration**

3. **Add Redirect URLs**:
   ```
   https://your-app.vercel.app/auth/callback
   https://your-app.vercel.app/**
   ```

4. **Set Site URL**:
   ```
   https://your-app.vercel.app
   ```

5. **Save Changes**

### 2. Test Your Deployment

1. **Visit Your App**: `https://your-app.vercel.app`
2. **Test Sign Up**:
   - Navigate to `/signup`
   - Create a test account
   - Check if email confirmation works (check Supabase inbox if in dev mode)
3. **Test Authentication**:
   - Sign in with your test account
   - Verify redirect to `/onboarding` or `/dashboard`
4. **Test Onboarding**:
   - Enter birth data
   - Submit form
   - Verify profile is created in Supabase (check database)
5. **Check Logs**:
   - Vercel Dashboard → Your Project → Deployments → Latest → Functions
   - Look for any errors in the logs

### 3. Custom Domain (Optional)

To use a custom domain like `astro-mood.com`:

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS records
4. Update Supabase redirect URLs with your custom domain
5. Wait for SSL certificate provisioning (automatic)

## Troubleshooting

### Build Fails with "Cannot find module"

**Solution**: Ensure `root-directory` is set to `apps/web` in Vercel settings.

1. Vercel Dashboard → Your Project → **Settings** → **General**
2. Scroll to **Root Directory**
3. Click **Edit**
4. Enter: `apps/web`
5. **Save**
6. Trigger a new deployment: **Deployments** → **Redeploy**

### Authentication Not Working

**Problem**: Users can't sign up or sign in.

**Solution**: Check Supabase redirect URLs:

1. Verify your Vercel URL is added to Supabase Auth settings
2. Ensure the URL includes the protocol: `https://` (not `http://`)
3. Make sure there are no trailing slashes in the Site URL
4. Check Vercel logs for error messages

### Environment Variables Not Loading

**Problem**: App shows "Missing Supabase credentials" error.

**Solution**:

1. Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify both variables are present:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Ensure there are no extra spaces or quotes
4. **Redeploy** after adding/updating environment variables

### "Middleware is deprecated" Warning

**What it is**: Next.js 16 deprecated the "middleware" file naming convention in favor of "proxy".

**Impact**: This is just a warning and doesn't affect functionality. The app will work fine.

**Fix (optional)**:
- Rename `apps/web/src/middleware.ts` to `apps/web/src/proxy.ts`
- Update imports if needed
- Commit and redeploy

### Database Connection Errors

**Problem**: App shows database errors or can't connect to Supabase.

**Solution**:

1. **Check Database Status**:
   - Supabase Dashboard → Database → Check if project is paused
   - Free tier projects pause after 1 week of inactivity
   - Click "Restore" if paused

2. **Verify RLS Policies**:
   - Run migrations: `npx supabase db reset --linked`
   - Ensure RLS policies are applied

3. **Check Service Role Key** (if using server-side operations):
   - Verify you're using the correct key for server vs client operations
   - Never expose service role key to the client

## Performance Optimization

### Enable Edge Functions (Optional)

For faster response times globally:

1. Vercel Dashboard → Your Project → **Settings** → **Functions**
2. Enable **Edge Functions**
3. Update route configs if needed
4. Redeploy

### Configure Caching

Add cache headers in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
      ],
    },
  ];
}
```

## Monitoring & Analytics

### Vercel Analytics

1. Vercel Dashboard → Your Project → **Analytics**
2. Enable **Vercel Analytics** (free for hobbyists)
3. View real-time traffic, performance metrics, and error rates

### Error Tracking

Consider integrating Sentry for production error tracking:

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Continuous Deployment

Vercel automatically deploys:
- ✅ **Production**: Pushes to `main` branch
- ✅ **Preview**: Pull requests and other branches

To disable auto-deployment:
1. Vercel Dashboard → Your Project → **Settings** → **Git**
2. Configure **Production Branch** and **Preview Deployments**

## Rollback

To rollback to a previous deployment:

1. Vercel Dashboard → Your Project → **Deployments**
2. Find the working deployment
3. Click **⋮** → **Promote to Production**
4. Confirm

## Environment-Specific Deployments

For staging/production separation:

1. Create a separate Supabase project for production
2. Create separate Vercel projects:
   - `astro-mood-staging` → `staging` branch
   - `astro-mood-production` → `main` branch
3. Use different environment variables for each

## Security Checklist

Before going live:

- [ ] RLS policies are enabled and tested
- [ ] Environment variables are set correctly
- [ ] Supabase redirect URLs are configured
- [ ] No secrets in client-side code
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Service role key is only used server-side (if applicable)
- [ ] Auth emails are working correctly
- [ ] CORS is configured properly

## Support

If you encounter issues:

1. **Check Vercel Logs**: Dashboard → Deployments → Functions → View logs
2. **Check Supabase Logs**: Dashboard → Logs → API, Auth, Database
3. **GitHub Issues**: [Report a bug](https://github.com/CreatingValueFirst/astro-mood/issues)
4. **Vercel Support**: [Vercel Help](https://vercel.com/help)
5. **Supabase Support**: [Supabase Discord](https://discord.supabase.com)

## Next Steps

After successful deployment:

1. ✅ Test all user flows (signup, login, onboarding)
2. ✅ Monitor performance with Vercel Analytics
3. ✅ Set up error tracking (Sentry)
4. ✅ Configure custom domain
5. ✅ Enable authentication providers (Google, GitHub, etc.)
6. ✅ Implement forecast generation API
7. ✅ Add more features from the roadmap

---

**Congratulations!** Your AstroMood app is now live. 🌟
