# Mobile Testing Checklist

## Overview
All pages in the AstroMood app have been optimized for mobile devices. Use this checklist to verify the mobile experience on actual devices.

## Test Devices Recommended
- **iPhone**: Test on Safari (iOS default browser)
- **Android**: Test on Chrome (Android default browser)
- **Tablet**: Test on iPad or Android tablet (optional)

## Pre-Testing Setup

### 1. Deploy to Vercel
The mobile optimizations have been committed. Push to GitHub to deploy:
```bash
cd /Users/carpediem/astro-mood
git push origin main
```

Wait 2-3 minutes for Vercel to deploy, then visit your production URL on mobile devices.

### 2. Test Locally (Optional)
You can also test locally using your phone on the same WiFi network:
```bash
cd /Users/carpediem/astro-mood/apps/web
npm run dev
```

Find your local IP address:
```bash
# On Mac:
ipconfig getifaddr en0

# Visit on your phone:
http://YOUR_IP_ADDRESS:3000
```

---

## Testing Checklist

### Landing Page (/)
- [ ] Page loads without horizontal scroll
- [ ] Purple/pink gradient background displays correctly
- [ ] "AstroMood" title is readable (not too small, not too large)
- [ ] Three feature cards stack vertically on mobile
- [ ] "Get Started" button is easy to tap (at least 44x44px)
- [ ] "Sign In" button is easy to tap
- [ ] No text is cut off or unreadable
- [ ] Page respects iOS safe areas (no content hidden by notch)
- [ ] Page doesn't bounce/pull-to-refresh when scrolling up

### Sign Up Page (/signup)
- [ ] Form card is centered and doesn't overflow screen
- [ ] Email input is at least 16px font (prevents iOS zoom on focus)
- [ ] Password inputs are at least 16px font
- [ ] Tapping inputs doesn't cause page zoom
- [ ] "Create Account" button is touch-friendly (44x44px minimum)
- [ ] "Sign in" link is easy to tap
- [ ] Keyboard appears smoothly when focusing inputs
- [ ] Error messages are readable
- [ ] Form submits correctly on mobile
- [ ] No content hidden behind keyboard when typing

### Login Page (/login)
- [ ] Email input is at least 16px font
- [ ] Password input is at least 16px font
- [ ] Tapping inputs doesn't cause page zoom
- [ ] "Sign In" button is touch-friendly
- [ ] "Sign up" link is easy to tap
- [ ] Form submits correctly on mobile
- [ ] Keyboard behavior is smooth

### Onboarding Page (/onboarding)
- [ ] Form card displays correctly
- [ ] Name input is at least 16px font
- [ ] Birth date picker works correctly on mobile (native date picker appears)
- [ ] "Continue to Dashboard" button is touch-friendly
- [ ] Form submits successfully
- [ ] Data saves to Supabase correctly (verify in Supabase dashboard)

### Dashboard Page (/dashboard)
- [ ] Welcome message displays correctly with user's name
- [ ] "Sign Out" button is touch-friendly
- [ ] Three feature cards stack vertically on mobile (single column)
- [ ] Cards are readable and don't overlap
- [ ] Profile card displays all information (name, birth date, email)
- [ ] Long email addresses don't overflow (should break to new line)
- [ ] Page respects iOS safe areas
- [ ] Tapping "Sign Out" works correctly

---

## Specific Mobile Features to Test

### iOS-Specific
- [ ] **Notch/Dynamic Island**: Content doesn't hide behind notch (safe-top padding)
- [ ] **Home Indicator**: Content doesn't hide behind home indicator (safe-bottom padding)
- [ ] **Safari UI**: When scrolling, Safari's collapsing UI doesn't break layout
- [ ] **PWA Install**: Can add to Home Screen (Safari → Share → Add to Home Screen)
- [ ] **Standalone Mode**: When launched from Home Screen, status bar is translucent
- [ ] **No Zoom on Input**: Focusing form inputs doesn't zoom the page

### Android-Specific
- [ ] **Chrome UI**: Collapsing Chrome address bar doesn't break layout
- [ ] **PWA Install**: Can install as app (Chrome → Menu → Add to Home screen)
- [ ] **Back Button**: Android back button works correctly in navigation flow
- [ ] **Keyboard**: Soft keyboard doesn't cover input fields

### General Touch & Interaction
- [ ] **Tap Highlights**: Tapping buttons shows purple highlight (not default blue)
- [ ] **Smooth Scrolling**: Scrolling feels smooth (no lag or janky animations)
- [ ] **No Horizontal Scroll**: No page has horizontal scroll at any width
- [ ] **Button Size**: All buttons are at least 44x44px (touch-target class)
- [ ] **Text Readability**: All text is at least 14px (preferably 16px for body)
- [ ] **Link Spacing**: Links have enough spacing to tap accurately

### Responsive Breakpoints
Test at these widths (use browser DevTools or actual devices):

- [ ] **320px (iPhone SE)**: Layout doesn't break
- [ ] **375px (iPhone 12/13)**: Layout looks good
- [ ] **414px (iPhone 14 Plus)**: Layout looks good
- [ ] **768px (iPad)**: Cards start to show 2 columns
- [ ] **1024px (Large tablet)**: Cards show 3 columns on dashboard

---

## User Flow Testing (End-to-End on Mobile)

### Complete User Journey
1. [ ] Open app on mobile browser
2. [ ] Tap "Get Started"
3. [ ] Fill out signup form (email + password)
4. [ ] Submit form → redirects to onboarding
5. [ ] Enter name and birth date
6. [ ] Submit → redirects to dashboard
7. [ ] Verify data appears correctly
8. [ ] Tap "Sign Out"
9. [ ] Tap "Sign In"
10. [ ] Log back in with same credentials
11. [ ] Land on dashboard with profile loaded

### Verify Database
After completing the user journey:
1. [ ] Open Supabase Dashboard
2. [ ] Navigate to Table Editor → birth_profiles
3. [ ] Verify your test user's profile exists
4. [ ] Verify name and birth_date are correct
5. [ ] Verify is_primary is set to true

---

## Performance Testing

### Page Load Speed (on 4G mobile network)
- [ ] Landing page loads in < 3 seconds
- [ ] Login page loads in < 2 seconds
- [ ] Signup page loads in < 2 seconds
- [ ] Onboarding page loads in < 2 seconds
- [ ] Dashboard page loads in < 3 seconds

### Lighthouse Mobile Score (Chrome DevTools)
Run Lighthouse in "Mobile" mode for each page:
- [ ] Landing page: Performance > 80
- [ ] Login page: Performance > 80
- [ ] Signup page: Performance > 80
- [ ] Dashboard page: Performance > 80

To run Lighthouse:
1. Open page in Chrome on desktop
2. Open DevTools (F12 or Cmd+Option+I)
3. Go to "Lighthouse" tab
4. Select "Mobile" device
5. Click "Analyze page load"

---

## Known Issues (If Any)

Document any issues found during testing:

1. **Issue**: [Description]
   - **Device**: [iPhone 13, Android Samsung Galaxy S21, etc.]
   - **Browser**: [Safari, Chrome, etc.]
   - **Steps to Reproduce**: [Detailed steps]
   - **Expected**: [What should happen]
   - **Actual**: [What actually happens]

2. **Issue**: [Description]
   - **Device**:
   - **Browser**:
   - **Steps to Reproduce**:
   - **Expected**:
   - **Actual**:

---

## Accessibility Testing (Bonus)

### Screen Reader
- [ ] Test with VoiceOver (iOS) or TalkBack (Android)
- [ ] All buttons have readable labels
- [ ] Form inputs have proper labels
- [ ] Navigation flow makes sense with screen reader

### Color Contrast
- [ ] Text on background has sufficient contrast (WCAG AA)
- [ ] Links are distinguishable from body text
- [ ] Error messages are readable

### Keyboard Navigation (Tablet/Desktop)
- [ ] Can navigate through forms using Tab key
- [ ] Focus indicator is visible on all interactive elements
- [ ] Can submit forms using Enter key

---

## Sign-Off

Once all checkboxes above are complete:

**Tested by**: _______________
**Date**: _______________
**Devices tested**: _______________
**Overall status**: [ ] All tests passed [ ] Issues found (documented above)

---

## Next Steps After Testing

1. **If tests pass**: App is ready for mobile users! Consider:
   - Adding app icons (icon-192.png, icon-512.png) for PWA
   - Promoting the PWA install option to users
   - Monitoring mobile analytics

2. **If issues found**:
   - Document issues in this file
   - Create GitHub issues for each bug
   - Prioritize fixes (critical vs nice-to-have)
   - Retest after fixes are deployed

---

**Latest Commit**: fa8976f - "Optimize entire app for mobile responsiveness"
**Deployment Status**: Ready to push to Vercel
**Mobile Optimizations**: Complete
