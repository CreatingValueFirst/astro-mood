# 🎯 Add Environment Variables - Simple Steps

## The Problem
You tried to add BOTH variables at once - Vercel only allows ONE at a time!

---

## ADD FIRST VARIABLE (5 steps)

### Step 1: Clear the Form
- If the form still has text, delete everything
- Or close the form and click "Add New" again

### Step 2: Fill in ONLY the First Variable

**In the "Name" or "Key" field, type:**
```
NEXT_PUBLIC_SUPABASE_URL
```
(Copy this EXACTLY - just this line!)

**In the "Value" field, type:**
```
https://fegqcrzdqbhoubruchky.supabase.co
```
(Copy this EXACTLY - just this line!)

**STOP! Don't add anything else!**

### Step 3: Select All Environments

Look for checkboxes or dropdown that says "Environments" or "Apply to":

**Check ALL THREE boxes:**
- ✅ Production
- ✅ Preview
- ✅ Development

**IMPORTANT: All 3 must be checked!**

### Step 4: Save

Click the **"Save"** or **"Add"** button

### Step 5: Confirm It Saved

You should see the variable appear in the list:
```
NEXT_PUBLIC_SUPABASE_URL
https://fegqcrzdqbhoubruchky.supabase.co
Production, Preview, Development
```

---

## ADD SECOND VARIABLE (5 steps)

### Step 1: Click "Add New" Again

Click the button to add another variable (might say "Add New" or "Add Another")

### Step 2: Fill in ONLY the Second Variable

**In the "Name" or "Key" field, type:**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
(Copy this EXACTLY - just this line!)

**In the "Value" field, type:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZ3FjcnpkcWJob3VicnVjaGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MjMxODIsImV4cCI6MjA4NDA5OTE4Mn0.30Vg58OxWNAGTOouse1FwABW1AzuUqsiXed3FwXHjoY
```
(Copy this EXACTLY - just this line!)

**STOP! Don't add anything else!**

### Step 3: Select All Environments

**Check ALL THREE boxes again:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Save

Click the **"Save"** or **"Add"** button

### Step 5: Confirm Both Variables Are Listed

You should now see BOTH variables in the list:
```
1. NEXT_PUBLIC_SUPABASE_URL
   https://fegqcrzdqbhoubruchky.supabase.co
   Production, Preview, Development

2. NEXT_PUBLIC_SUPABASE_ANON_KEY
   eyJhbGc... (hidden)
   Production, Preview, Development
```

---

## Visual Guide

```
┌─────────────────────────────────────────┐
│ Add Environment Variable                │
├─────────────────────────────────────────┤
│ Name/Key:                               │
│ ┌─────────────────────────────────────┐ │
│ │ NEXT_PUBLIC_SUPABASE_URL            │ │  ← Type ONLY this
│ └─────────────────────────────────────┘ │
│                                         │
│ Value:                                  │
│ ┌─────────────────────────────────────┐ │
│ │ https://fegqcrzdqbhoubruchky...     │ │  ← Type ONLY this
│ └─────────────────────────────────────┘ │
│                                         │
│ Environments:                           │
│ ☑ Production                            │  ← Check ALL THREE
│ ☑ Preview                               │
│ ☑ Development                           │
│                                         │
│           [Cancel]  [Save]              │  ← Click Save
└─────────────────────────────────────────┘
```

---

## Common Mistakes to Avoid

❌ **WRONG:** Putting both variables in one form
```
Name: NEXT_PUBLIC_SUPABASE_URL
      NEXT_PUBLIC_SUPABASE_ANON_KEY    ← NO! One at a time!
```

✅ **CORRECT:** Adding them separately
```
Form 1:
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://...

Form 2:
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGc...
```

❌ **WRONG:** Not selecting all environments
```
☑ Production
☐ Preview          ← Must check these too!
☐ Development
```

✅ **CORRECT:** All environments checked
```
☑ Production
☑ Preview
☑ Development
```

---

## After Adding Both Variables

Once you have BOTH variables saved:

1. Go to **"Deployments"** tab
2. Click **three dots (...)** on latest deployment
3. Click **"Redeploy"**
4. Wait for it to finish (1-2 minutes)
5. Test signup again

---

## Need Help?

If you're still stuck, take a screenshot of:
1. The "Add Environment Variable" form
2. The list of saved variables

And paste them here so I can see what's wrong!

---

**Try adding the FIRST variable now (just the URL one) and tell me if it saves!**
