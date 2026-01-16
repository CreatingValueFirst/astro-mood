# 🔧 Fix: Enable Email Authentication

## Current Issue

**Error**: "Email signups are disabled"

The email authentication provider has been **completely disabled** in your Supabase project. We need to re-enable it.

## Step-by-Step Fix

I've opened your Supabase Auth Providers page in your browser. Follow these steps carefully:

### 1. Enable Email Provider

**URL**: https://supabase.com/dashboard/project/fegqcrzdqbhoubruchky/auth/providers

1. **Look for the "Email" section** (should be at the top of the providers list)
2. You should see a toggle switch that says **"Enable Email provider"**
3. **Turn this toggle ON** (it should turn green/blue)

### 2. Configure Email Settings

Once the Email provider is enabled, scroll down to find these settings:

#### **Enable Email Signup**
- **Toggle**: Turn ON
- **What it does**: Allows new users to create accounts with email/password

#### **Confirm Email** (IMPORTANT!)
- **Toggle**: Turn OFF (for development/testing)
- **What it does**: When OFF, users can login immediately without confirming their email
- **Note**: Turn this ON later for production

#### **Other Settings** (Keep defaults)
- Double confirm email changes: Can leave as is
- Secure email change: Can leave as is

### 3. Save Changes

- Look for a **"Save"** button at the bottom of the page
- Click it to apply your changes

## Visual Guide

```
┌─────────────────────────────────────────────┐
│ Email Provider                              │
│                                             │
│ [ Toggle ON ] Enable Email provider         │
│                                             │
│ ─────────────────────────────────────────  │
│                                             │
│ [ Toggle ON ] Enable Email Signup           │
│                                             │
│ [ Toggle OFF ] Confirm email                │
│   └─ Disable this for easy testing          │
│                                             │
│ [ Save ]                                    │
└─────────────────────────────────────────────┘
```

## After Enabling

Once you've completed these steps, I'll run the test again to verify everything works!

## What Each Setting Does

| Setting | Recommended | Why |
|---------|------------|-----|
| **Enable Email provider** | ✅ ON | Required for email/password authentication |
| **Enable Email Signup** | ✅ ON | Allows new users to register |
| **Confirm email** | ❌ OFF (dev)<br>✅ ON (prod) | OFF = immediate login<br>ON = must confirm email first |

## Common Mistakes to Avoid

❌ **Don't disable** "Enable Email provider" - This turns off email auth completely
❌ **Don't disable** "Enable Email Signup" - Users won't be able to register
✅ **Do disable** "Confirm email" (for now) - Makes testing easier

---

**Let me know when you've made these changes and I'll test the flow!**
