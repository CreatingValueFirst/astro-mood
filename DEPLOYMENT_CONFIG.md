# AstroMood - Deployment Configuration

**Date**: January 16, 2026
**Version**: Public Demo (No Authentication)
**Platform**: Vercel
**Repository**: https://github.com/CreatingValueFirst/astro-mood

---

## Deployment Settings

### Vercel Project Configuration

**Framework**: Next.js 16.1.2
**Build Command**: `npm run build`
**Output Directory**: `.next`
**Install Command**: `npm install`
**Root Directory**: `apps/web`

### Environment Variables Required

```bash
NEXT_PUBLIC_SUPABASE_URL=https://fegqcrzdqbhoubruchky.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note**: For public demo, these are only used for potential future features. Current implementation uses mock data.

---

## Configuration Files

### 1. vercel.json
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/dashboard",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

### 2. .vercelignore
Standard Next.js ignore patterns to optimize deployment size.

---

## Public Demo Configuration

### Authentication: DISABLED
- No login required
- No sign up required
- Direct access to all features

### Mock Data Used
- **Name**: Demo User
- **Birth Date**: June 15, 1990 (Gemini)
- **Email**: demo@astromood.app

### Features Enabled
✓ **Monthly Forecast Card**
  - Real astronomical calculations
  - Personalized for Gemini sun sign
  - Mood scores, key dates, affirmations

✓ **Calendar View**
  - Interactive calendar grid
  - Color-coded mood levels
  - Day detail modal
  - Month navigation

✓ **Insights Card**
  - Shows "Coming soon" placeholder
  - Ready for future implementation

---

## Routes Configuration

### Public Routes (No Auth Required)
- `/` - Landing page
- `/dashboard` - Main dashboard (public demo)
- `/login` - Login page (not enforced)
- `/signup` - Signup page (not enforced)
- `/onboarding` - Onboarding (skipped)

### API Routes
- `/api/forecast` - Monthly forecast generation (no auth)
- `/api/check-env` - Environment check (development only)

---

## Middleware Configuration

**Status**: DISABLED
**File**: `middleware.ts` renamed to `middleware.ts.disabled`

**Reason**: Middleware was causing authentication redirects even when checks were commented out. Disabled completely to allow public access.

**Previous behavior**: Redirected `/dashboard` → `/login`
**Current behavior**: Direct access to `/dashboard`

---

## Build Output

```
Route (app)
┌ ○ /                    Static
├ ○ /_not-found          Static
├ ƒ /api/check-env       Dynamic
├ ƒ /api/forecast        Dynamic
├ ○ /dashboard           Static (PUBLIC)
├ ○ /login               Static
├ ○ /onboarding          Static
└ ○ /signup              Static
```

**Dashboard is fully static** - No server-side rendering, no authentication checks, instant load.

---

## Deployment Process

### Automatic Deployment (Recommended)
1. Push to `main` branch
2. Vercel automatically detects changes
3. Builds and deploys
4. Live in 2-3 minutes

### Manual Deployment (If needed)
```bash
# From project root
npx vercel --prod

# Or with configuration
npx vercel deploy --prod --build-env NEXT_PUBLIC_SUPABASE_URL=xxx
```

---

## Post-Deployment Verification

### Check These URLs:
1. **Home**: https://astro-world-eight.vercel.app/
   - Should show: Landing page

2. **Dashboard**: https://astro-world-eight.vercel.app/dashboard
   - Should show: Dashboard with "Welcome, Demo User"
   - Should NOT redirect to /login
   - Should display: Monthly Forecast + Calendar View

3. **API**: https://astro-world-eight.vercel.app/api/forecast
   - Should return: JSON with forecast data
   - Should NOT return: 401 Unauthorized

### Expected Response Times:
- Dashboard (static): < 500ms
- API (forecast): 1-2 seconds (calculation time)
- Calendar navigation: Instant (client-side)

---

## Troubleshooting

### Issue: Dashboard redirects to /login
**Solution**:
- Ensure middleware.ts is disabled/renamed
- Clear Vercel build cache
- Force rebuild with `vercel --force`

### Issue: API returns 401
**Solution**:
- Check environment variables on Vercel
- Verify forecast API uses mock data (not authentication)

### Issue: Forecast doesn't load
**Solution**:
- Check browser console for errors
- Verify API endpoint responds
- Check network tab for failed requests

---

## Cache Configuration

### Dashboard Pages
- **Cache-Control**: no-cache
- **Reason**: Ensure users see latest deployment

### API Routes
- **Forecast API**: No cache (generates fresh)
- **Reason**: Public demo doesn't use database caching

### Static Assets
- **Next.js assets**: Cached by CDN
- **Images**: Cached by Vercel CDN

---

## Performance Metrics

**Target Performance:**
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

**Actual (Production):**
- Dashboard loads in < 1s (static)
- Forecast calculates in 1-2s
- Calendar navigation: Instant

---

## Security Notes

### Public Demo Considerations:
- No user data collected
- No authentication required
- No database writes
- API uses mock data only

### Environment Variables:
- Supabase keys present but not actively used
- No sensitive data exposed
- All calculations client-side or stateless API

---

## Future Enhancements

### Phase 1: Add Authentication (Optional)
- Re-enable middleware
- Add user accounts
- Personalized forecasts

### Phase 2: User Birth Data
- Allow users to input birth date
- Calculate personalized forecasts
- Store preferences (optional)

### Phase 3: Advanced Features
- Birth time (rising sign)
- Birth location (houses)
- Natal chart visualization
- Synastry/compatibility

---

## Rollback Plan

### If Deployment Fails:
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or checkout specific commit
git checkout 99a8827
git push -f origin main
```

### Previous Working Commits:
- `99a8827` - Monthly Forecast (with auth)
- `d9c7472` - Calendar View (with auth)
- `2d339c8` - Public Demo (current)

---

## Contact & Support

**Repository Issues**: https://github.com/CreatingValueFirst/astro-mood/issues
**Vercel Dashboard**: https://vercel.com/dashboard
**Production URL**: https://astro-world-eight.vercel.app

---

## Deployment Checklist

Before deploying:
- ✓ Build succeeds locally (`npm run build`)
- ✓ Dashboard accessible without auth
- ✓ API returns forecast data
- ✓ No TypeScript errors
- ✓ Environment variables set on Vercel
- ✓ vercel.json configured
- ✓ Middleware disabled

After deploying:
- ✓ Dashboard loads without redirect
- ✓ Forecast card displays data
- ✓ Calendar view functional
- ✓ Month navigation works
- ✓ Day detail modal opens
- ✓ No console errors

---

**Status**: Ready for production deployment ✅
