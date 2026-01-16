# AstroMood - v0.dev Export Documentation

**Design System Export for v0.dev**
**Date**: January 16, 2026
**Version**: 1.0.0

---

## Project Overview

**Name**: AstroMood - Your Cosmic Mood Companion
**Type**: Astrology Dashboard Application
**Framework**: Next.js 16.1.2 + React + TypeScript
**Styling**: Tailwind CSS + Framer Motion
**Components**: Radix UI + Custom Components

---

## Design System

### Color Palette

```css
/* Primary Colors */
--purple-900: #581c87
--purple-500: #a855f7
--purple-400: #c084fc
--indigo-900: #312e81
--indigo-500: #6366f1

/* Accent Colors */
--pink-500: #ec4899
--pink-400: #f472b6

/* Status Colors */
--green-500: #22c55e (Excellent mood)
--blue-500: #3b82f6 (Good mood)
--yellow-500: #eab308 (Moderate mood)
--orange-500: #f97316 (Challenging mood)
--red-500: #ef4444 (Difficult mood)

/* Neutral Colors */
--gray-900: #111827
--gray-800: #1f2937
--gray-400: #9ca3af
--gray-300: #d1d5db
```

### Typography

```css
/* Headings */
h1: text-3xl sm:text-4xl md:text-5xl font-bold
h2: text-xl sm:text-2xl font-bold
h3: text-lg sm:text-xl font-semibold

/* Body */
body: text-sm sm:text-base
small: text-xs
```

### Spacing Scale
- Mobile: p-4, gap-4
- Desktop: p-8, gap-6

---

## Component Library

### 1. DashboardClient
**Location**: `apps/web/src/components/DashboardClient.tsx`

**Purpose**: Main dashboard container with starry background and feature cards

**Props**:
```typescript
interface DashboardClientProps {
  profile: {
    name: string;
    birth_date: string;
  };
  userEmail: string;
  onSignOut: () => void;
}
```

**Features**:
- Animated entrance with stagger effect
- Starry background animation
- Responsive grid layout
- Profile information display

**v0 Prompt**:
```
Create a full-screen dashboard with:
- Gradient background from purple-900 via indigo-900 to black
- Animated starry background (twinkling stars)
- Welcome header with gradient text (purple-400 to pink-400)
- 3-column grid of feature cards (responsive to 1 column on mobile)
- Profile card at bottom showing user info
- Smooth stagger animations on mount using framer-motion
```

---

### 2. MonthlyForecastCard
**Location**: `apps/web/src/components/MonthlyForecastCard.tsx`

**Purpose**: Display monthly astrological forecast with mood scores

**Features**:
- Loading skeleton animation
- Mood score bars (animated width)
- Key dates list
- Daily affirmation
- Error handling

**Design**:
```
Card Layout:
├─ Header: Moon icon + "January Forecast" + Overall Mood Score
├─ Summary: 2-3 sentences explaining the month
├─ Mood Bars: 4 horizontal bars with percentages
│  ├─ Energy (orange)
│  ├─ Focus (blue)
│  ├─ Romance (pink)
│  └─ Social (green)
├─ Key Dates: Top 3 astrological events
└─ Affirmation: Daily positive message
```

**v0 Prompt**:
```
Create a glassmorphic card (bg-gray-900/50, backdrop-blur-xl) with:
- Purple border (border-purple-500/20)
- Header with moon icon and title
- Text summary paragraph
- 4 animated progress bars with different colors
- Each bar: label, animated width, percentage
- Key dates section with date + event name
- Affirmation section with star icon
- Hover effect: lift up 5px, increase shadow
```

---

### 3. CalendarView
**Location**: `apps/web/src/components/CalendarView.tsx`

**Purpose**: Interactive monthly calendar with color-coded mood levels

**Features**:
- 7-column grid (Sun-Sat)
- Color-coded days by mood score
- Month navigation (prev/next)
- Click to view day details
- Modal with mood breakdown
- Special event indicators (stars)

**Design**:
```
Calendar Layout:
├─ Header: Calendar icon + Month/Year + Navigation buttons
├─ Week day labels (Sun, Mon, Tue...)
├─ Calendar grid (7 columns × 5-6 rows)
│  └─ Each day cell:
│     ├─ Day number
│     ├─ Mood score
│     ├─ Background color (based on mood)
│     └─ Star icon (if special event)
├─ Legend: Color meanings
└─ Modal (on day click):
   ├─ Date header
   ├─ Overall mood bar
   ├─ Mood breakdown (5 metrics)
   └─ Special events (if any)
```

**v0 Prompt**:
```
Create an interactive calendar card with:
- Glassmorphic card design
- Header with calendar icon, month name, and arrow navigation
- 7-column grid with week day headers
- Calendar cells: square, colored by mood level (green=high, red=low)
- Each cell shows day number and mood score
- Hover effect: scale 1.05
- Legend showing color meanings
- Click to open modal with:
  - Full date display
  - Animated mood bar
  - 5 sub-metrics with bars (Energy, Focus, Romance, Social, Stress)
  - Event list if applicable
```

---

### 4. StarryBackground
**Location**: `apps/web/src/components/StarryBackground.tsx`

**Purpose**: Animated starry sky background

**Features**:
- 50 randomly positioned stars
- Twinkling animation
- Random sizes and animation delays
- Positioned behind content (z-0)

**v0 Prompt**:
```
Create an animated starry background:
- Absolute positioned, full viewport
- 50 small white dots (2-3px)
- Random positions across screen
- Twinkling animation (opacity 0.3 to 1)
- Each star has random animation delay
- z-index 0 (behind content)
```

---

### 5. AnimatedButton
**Location**: `apps/web/src/components/AnimatedButton.tsx`

**Purpose**: Button with hover and tap animations

**Features**:
- Hover: scale 1.05, brightness increase
- Tap: scale 0.95
- Smooth spring animations
- Variant support (default, outline)

**v0 Prompt**:
```
Create an animated button component:
- Framer motion wrapper
- Hover: scale 1.05, filter brightness 1.1
- Tap: scale 0.95
- Spring animation (stiffness 300, damping 20)
- Supports variant="outline" with border styling
```

---

## Page Layouts

### Landing Page (`/`)
```
Layout:
├─ Starry background
├─ Hero section:
│  ├─ Large gradient heading
│  ├─ Subtitle
│  └─ CTA button → /dashboard
└─ Features grid (3 columns)
```

### Dashboard (`/dashboard`)
```
Layout:
├─ Starry background
├─ Welcome header + user name
├─ Feature cards grid (3 columns):
│  ├─ Monthly Forecast
│  ├─ Calendar View
│  └─ Insights (coming soon)
└─ Profile info card
```

---

## Animation Patterns

### Container Animation (Stagger Children)
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
```

### Item Animation (Fade + Slide Up)
```javascript
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};
```

### Card Hover
```javascript
<motion.div
  whileHover={{ y: -5, scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
```

### Progress Bar Animation
```javascript
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${value}%` }}
  transition={{ duration: 1, ease: 'easeOut' }}
/>
```

---

## Responsive Design

### Breakpoints
```css
/* Mobile First */
base: < 640px (single column)
sm: 640px+ (tablet)
md: 768px+ (desktop)
lg: 1024px+ (large desktop)
```

### Grid Patterns
```css
/* Feature cards */
mobile: grid-cols-1
tablet: grid-cols-2
desktop: grid-cols-3

/* Calendar */
all: grid-cols-7 (always 7 days)
```

---

## Key UI Patterns

### Glassmorphism Cards
```css
bg-gray-900/50
backdrop-blur-xl
border border-purple-500/20
hover:bg-gray-900/70
hover:border-purple-500/40
hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]
```

### Gradient Text
```css
bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400
bg-clip-text text-transparent
```

### Status Badges
```css
/* High impact */
bg-red-500/20 text-red-300

/* Medium impact */
bg-yellow-500/20 text-yellow-300

/* Low impact */
bg-blue-500/20 text-blue-300
```

---

## Data Structures

### Monthly Forecast
```typescript
interface MonthlyForecast {
  summary: string;
  overallMood: number; // 0-100
  moodScores: {
    energy: number;
    focus: number;
    romance: number;
    social: number;
    stress: number;
  };
  keyDates: Array<{
    date: string;
    event: string;
    type: 'lunation' | 'transit' | 'retrograde';
    impact: 'high' | 'medium' | 'low';
    description: string;
  }>;
  affirmations: string[];
}
```

### Daily Score
```typescript
interface DayData {
  date: string; // YYYY-MM-DD
  mood: number; // 0-100
  energy: number;
  focus: number;
  romance: number;
  stress: number;
  social: number;
}
```

---

## v0.dev Import Instructions

### To recreate in v0.dev:

1. **Create New Project**
   - Framework: Next.js
   - Styling: Tailwind CSS
   - TypeScript: Enabled

2. **Install Dependencies**
   ```bash
   npm install framer-motion @radix-ui/react-dialog lucide-react
   ```

3. **Copy Components** (in order):
   - StarryBackground
   - AnimatedButton
   - ui/card (shadcn)
   - ui/dialog (shadcn)
   - MonthlyForecastCard
   - CalendarView
   - DashboardClient

4. **Apply Design System**:
   - Use provided color palette
   - Apply glassmorphism patterns
   - Add framer-motion animations

5. **Test Responsiveness**:
   - Mobile: single column
   - Tablet: 2 columns
   - Desktop: 3 columns

---

## Component Hierarchy

```
App
└─ DashboardClient
   ├─ StarryBackground
   ├─ Header (Welcome + Name)
   ├─ Feature Cards
   │  ├─ MonthlyForecastCard
   │  │  └─ MoodBar components
   │  ├─ CalendarView
   │  │  ├─ Calendar grid
   │  │  └─ Day detail Dialog
   │  └─ Insights Card (placeholder)
   └─ Profile Card
```

---

## Export Assets

### Icons Used (lucide-react):
- Moon, Calendar, Brain, Star
- ChevronLeft, ChevronRight
- LogOut (disabled in demo)

### Animations:
- Container stagger: 0.1s delay between children
- Items: fade in + slide up (y: 20 → 0)
- Hover: lift -5px + scale 1.02
- Tap: scale 0.95
- Bars: width 0% → value% over 1s

---

## Production URLs

- **Live Demo**: https://astro-world-eight.vercel.app
- **Dashboard**: https://astro-world-eight.vercel.app/dashboard
- **Repository**: https://github.com/CreatingValueFirst/astro-mood

---

## Design Philosophy

1. **Cosmic Theme**: Purple/indigo gradient with starry background
2. **Glassmorphism**: Semi-transparent cards with blur effect
3. **Smooth Animations**: Spring physics for natural feel
4. **Mobile-First**: Works beautifully on all devices
5. **Accessibility**: High contrast, semantic HTML, ARIA labels

---

**Ready for v0.dev Import** ✨

Use the prompts above to recreate components in v0.dev, or reference this document when designing similar cosmic/astrology themed applications.
