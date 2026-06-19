# 🎯 LowveldHub Luxury Profile - Visual Reference Guide

## Component: `HealthDetailV2.tsx` ✅ COMPLETE

---

## 🌟 Visual Layout & Color Palette

### Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│  NAVIGATION: Black bg | Gray-300 text | Yellow hover        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Portrait]              Name (text-7xl)                   │
│  3:4 aspect ratio        ━━━━━━━━━━━━━━━━━━━━━━━━          │
│                          Specialty (text-2xl)              │
│  Gold border             ━━━━━━━━━━━━━━━━━━━━━━━━          │
│  Shadow-2xl              Credentials (floating)            │
│  Rounded-2xl             ━━━━━━━━━━━━━━━━━━━━━━━━          │
│                          At A Glance (premium box)         │
│                          ━━━━━━━━━━━━━━━━━━━━━━━━          │
│                          Location | Service Area           │
│                          ━━━━━━━━━━━━━━━━━━━━━━━━          │
│                          [CTA Button] [WhatsApp]           │
│                          ♡  ↗  📍 (small icons)            │
│                                                             │
│  Background: Gray-900 → Black gradient                     │
│  Overlay: Yellow-400/5 soft gradient                       │
└─────────────────────────────────────────────────────────────┘
```

### Quote Section (Emotional Centerpiece)
```
┌─────────────────────────────────────────────────────────────┐
│         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━               │
│                                                             │
│   "There is a CAN in cancer because                        │
│    we CAN beat it."                                        │
│                                                             │
│   — Dr Joseph Mthombeni                                    │
│                                                             │
│         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━               │
│                                                             │
│  Text: text-5xl | font-light | text-white                 │
│  CAN highlighted: text-yellow-400                          │
│  Attribution: text-sm | text-gray-400                      │
│  Borders: border-y border-yellow-400/20                    │
└─────────────────────────────────────────────────────────────┘
```

### Expertise Chips
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Prostate     │  │ Lung Cancer  │  │ Brain Tumor  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  px-5 py-2.5       rounded-full        hover:scale-up      │
│  border-yellow-400/40  bg-yellow-400/10  text-yellow-400   │
│  font-light        transition-all       hover:border-60     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Treatment Services (with Icons)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ 🛡️  Radiation    │  │ ⚡ Chemotherapy  │               │
│  │    Therapy       │  │                  │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ 🧠 Immunotherapy │  │ 🎯 Nuclear Med   │               │
│  │                  │  │                  │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                             │
│  Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3           │
│  Each: border-2 border-yellow-400/30 | bg-black/50        │
│  Icons: w-6 h-6 | text-yellow-400 | group-hover:scale-110 │
│  Text: text-white | font-light                            │
└─────────────────────────────────────────────────────────────┘
```

### Qualifications (Resume Style)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ▌ FC Rad Onc (SA)                                         │
│  │ College of Radiation & Clinical Oncologists             │
│  │ (Yellow left border | bg-yellow-400/5)                  │
│                                                             │
│  ▌ MMed Radiation Oncology                                 │
│  │ University of the Free State                            │
│  │                                                         │
│                                                             │
│  ▌ MBChB                                                   │
│  │ Sefako Makgatho University                              │
│                                                             │
│  Each: border-l-4 border-yellow-400 | pl-6                │
│        bg-yellow-400/5 | p-6 | rounded-r-lg               │
│        hover:bg-yellow-400/10 transition-colors            │
└─────────────────────────────────────────────────────────────┘
```

### Practice Locations (with Maps)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Location Card          Google Map                          │
│  ┌──────────────────┐   ┌──────────────────┐              │
│  │ Main Practice    │   │                  │              │
│  │ Unit 01, 24 R... │   │   [Map iframe]   │              │
│  │ Mbombela         │   │                  │              │
│  │ [View Maps →]    │   │                  │              │
│  └──────────────────┘   └──────────────────┘              │
│                                                             │
│  Card: border-2 border-yellow-400/30 | bg-black/50        │
│        p-8 | hover:border-yellow-400 hover:bg-yellow-400/5 │
│  Maps: w-full h-64 | border border-yellow-400/20          │
│        rounded-lg | iframe responsive                      │
└─────────────────────────────────────────────────────────────┘
```

### Contact Section (Concierge Level)
```
┌─────────────────────────────────────────────────────────────┐
│         BOOK A CONSULTATION                               │
│                                                             │
│  Need to speak with Dr Mthombeni's practice?              │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐              │
│  │ ☎ CALL PRACTICE │  │ 💬 WhatsApp      │              │
│  │ +27 13 880 2039 │  │ Quick message    │              │
│  └──────────────────┘  └──────────────────┘              │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐              │
│  │ ✉ EMAIL PRACTICE│  │ 🌐 VISIT WEBSITE │              │
│  │ info@drj...      │  │ drjmoncology...  │              │
│  └──────────────────┘  └──────────────────┘              │
│                                                             │
│  ▌ PRACTICE HOURS                                          │
│  │ Monday – Friday: 08:00 – 16:30                          │
│  │ Closed Weekends & Public Holidays                       │
│                                                             │
│  Each card: p-6 | border border-yellow-400/20             │
│             bg-black/50 | hover:bg-yellow-400/10          │
│             group hover effects on icons                   │
│  Hours card: border-l-4 border-yellow-400 | bg-yellow-400/5│
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color System Reference

| Element | Color | Usage |
|---------|-------|-------|
| Background | `bg-black` | Main page background |
| Hero Gradient | `from-gray-900 to-black` | Hero section gradient |
| Text - Primary | `text-white` | Main content, headings |
| Text - Secondary | `text-gray-300` | Body text |
| Text - Tertiary | `text-gray-400` | Details, meta information |
| Accent - Primary | `text-yellow-400` | Icons, interactive elements |
| Accent - Background | `bg-yellow-400/10` | Card backgrounds, subtle fills |
| Accent - Border | `border-yellow-400/40` | Subtle borders |
| Accent - Hover | `hover:bg-yellow-400/10` | Interactive states |
| Overlay | `from-yellow-400/5` | Soft gradient overlays |
| Border - Subtle | `border-yellow-400/20` | Section borders |

**Color Philosophy**: 
- **Black** = Premium, sophisticated, luxury
- **Gold (Yellow-400)** = Authority, quality, aspirational
- **White/Gray** = Clean, readable, breathing room
- **Transparency** = Depth and elegance (avoid solid colors)

---

## 📐 Spacing & Typography

### Typography Hierarchy
```
Hero Name:          text-7xl font-light
Section Titles:     text-3xl font-light
Subsection:         text-2xl font-light
Body Text:          text-lg font-light
Labels:             text-sm font-medium or font-light
Meta:               text-xs font-light
```

### Spacing Units
```
Hero Section:       pt-12 pb-24
Main Content:       py-20
Section Gap:        space-y-24
Sub-section Gap:    space-y-8
Card Padding:       p-6 to p-8
List Items:         gap-3 to gap-6
```

---

## 🔄 Interaction States

### Button States
```
Primary Button:
  Normal:    bg-yellow-400 text-black
  Hover:     bg-white text-black
  Active:    scale-95 (implicit)

Secondary Button:
  Normal:    border-2 border-yellow-400 text-yellow-400
  Hover:     bg-yellow-400/10
  Active:    scale-95

Contact Card:
  Normal:    border border-yellow-400/20 bg-black/50
  Hover:     bg-yellow-400/10 border-yellow-400/40
  Icon:      group-hover:scale-110 transition-transform
```

### Icon States
```
Save (Heart):
  Unsaved:   text-gray-500
  Saved:     fill-yellow-400 text-yellow-400
  Hover:     text-yellow-400

Share/Directions:
  Default:   text-gray-500
  Hover:     text-yellow-400
  Active:    text-yellow-400 (implied)
```

---

## 📱 Responsive Design

### Breakpoints
```
Mobile (default):
  - Single column layouts
  - Full-width images
  - Stack actions vertically

Tablet (md):
  - 2-column grids for cards
  - Side-by-side hero (reversed on mobile)

Desktop (lg):
  - 3-column grids for services
  - Full 2-column hero layouts
  - Expanded spacing
```

---

## ✨ Elevation & Depth

### Shadow System
```
Hero Image:       shadow-2xl (high elevation)
Cards:            shadow-lg (implicit via border)
Floating Badge:   shadow-xl (layered over image)
```

### Z-Index Layers
```
Navigation:       z-40 (sticky, always visible)
Hero Section:     z-10 (default)
Overlays:         pointer-events-none (background)
```

---

## 🎭 Animation & Transitions

### Hover Effects
```
Chips:            hover:bg-yellow-400/20 transition-all
Cards:            hover:border-yellow-400 transition-all
Icons:            group-hover:scale-110 transition-transform
Buttons:          hover:bg-white transition-colors
Links:            hover:text-yellow-400 transition-colors
```

### Animations
```
Badge Dot:        animate-pulse (continuous)
Icons on Hover:   scale-110 (emphasis)
```

---

## 🏗️ Component Architecture

### Main Sections
1. **Navigation Bar** - Sticky header with back button
2. **Hero Section** - Portrait + content + floating badge
3. **Quote Section** - Emotional centerpiece
4. **Professional Profile** - Text content
5. **Expertise** - Luxury chips
6. **Services** - Icon cards grid
7. **Qualifications** - Resume-style list
8. **Locations** - Cards + embedded maps
9. **Contact** - Concierge-level booking

### Key Features
- ✅ Fully responsive (mobile → tablet → desktop)
- ✅ Smooth transitions on all interactive elements
- ✅ Luxury color palette (black + gold + white)
- ✅ Font weights optimized for readability (light typography)
- ✅ Generous whitespace and breathing room
- ✅ Icons from Lucide React (premium vector icons)
- ✅ Google Maps embedded (location authenticity)
- ✅ Floating credentials card (unique detail)

---

## 🎯 Design Principles Applied

1. **Minimalism** - Only necessary elements, maximum impact
2. **Luxury** - Premium materials, high-end aesthetic
3. **Storytelling** - Quote before info, emotion before facts
4. **Visual Hierarchy** - Portrait dominates, then narrative unfolds
5. **Functionality** - Beautiful AND easy to use
6. **Accessibility** - High contrast, semantic HTML, readable text
7. **Consistency** - Unified color, spacing, and typography throughout
8. **Elegance** - Light weights, generous spacing, intentional details

---

## 📊 Implementation Summary

| Aspect | Status |
|--------|--------|
| All 9 Luxury Upgrades | ✅ Complete |
| TypeScript Types | ✅ Full coverage |
| Responsive Design | ✅ Mobile-first |
| Color System | ✅ Black + Gold + White |
| Typography | ✅ Font-light throughout |
| Interactive States | ✅ All hover/active states |
| Accessibility | ✅ Semantic HTML |
| Build Status | ✅ Zero errors |
| Production Ready | ✅ YES |

---

**Component Ready for Production** ✅ **BUILD VERIFIED** ✅
