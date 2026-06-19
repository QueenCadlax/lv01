# 📱 Property Page - Responsive Design Visual Guide

## Screen Size Specifications

```
Extra Small (xs)     Small (sm)       Medium (md)      Large (lg)       X-Large (xl)
<640px              640px-767px      768px-1023px     1024px-1279px    1280px+

Mobile Portrait     Mobile Landscape  Tablet          Desktop          Large Desktop
```

## Column Layout Breakdown

### 📊 FEATURED PROPERTIES SECTION

**Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`**

```
┌──────────────────────────────────────────────────────────────────────────┐
│ MOBILE (xs, sm: 640px)        │ 1 COLUMN - Full Width              │
│                               ├─────────────────────────────────────┤
│  ┌─────────────────────────┐  │ ┌──────────────────────────────────┐│
│  │                         │  │ │ Property Image (h-48)            ││
│  │  Property Image         │  │ ├──────────────────────────────────┤│
│  │  (h-48 = 192px)         │  │ │ • Name                           ││
│  │                         │  │ │ • Location 🏘️                    ││
│  │  PLATINUM Badge         │  │ │ │ ⭐ 4.9 (123)                 ││
│  ├─────────────────────────┤  │ │ │ →                              ││
│  │ Property Name (2 lines) │  │ └──────────────────────────────────┘│
│  │ 🏘️ Location             │  │                                     │
│  │ Description (2 lines)   │  │ [Auto scroll vertically]            │
│  │                         │  │ [NO HORIZONTAL SCROLL]             │
│  │ ⭐ 4.9 (234) →         │  │                                     │
│  └─────────────────────────┘  │ Each card: 100% width - 32px       │
│                               │                                     │
│ [Touch-friendly padding]      └─────────────────────────────────────┘
│ [Readable text sizes]
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ TABLET (md: 768px-1023px)     │ 2 COLUMNS - Side by Side          │
│                               ├─────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────┐  │ ┌────────────────┐ ┌────────────┐ │
│  │             │ │         │  │ │ Image (h-56)   │ │Image(h-56) │ │
│  │  Property   │ │ Property│  │ ├────────────────┤ ├────────────┤ │
│  │  Image      │ │  Image  │  │ │ Name/Location  │ │ Name/Loc   │ │
│  │             │ │         │  │ │ Rating Info    │ │Rating Info │ │
│  │  Gap: 24px  │ │ Gap:24px│  │ └────────────────┘ └────────────┘ │
│  │ Height 56   │ │ Height: │  │                                    │
│  ├─────────────┤ ├─────────┤  │ ┌────────────────┐ ┌────────────┐ │
│  │ Name/Loc    │ │ Name/Lo │  │ │ Image (h-56)   │ │Image(h-56) │ │
│  │ ⭐ Rating   │ │⭐ Rating│  │ ├────────────────┤ ├────────────┤ │
│  └─────────────┘ └─────────┘  │ │ Details        │ │ Details    │ │
│                               │ └────────────────┘ └────────────┘ │
│ Total width per card:         │                                    │
│ (Container - 32px gap) / 2    │ Gap between: 24px                 │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ DESKTOP (lg: 1024px+)         │ 4 COLUMNS - Maximum Showcase      │
│                               ├─────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌─ │ ┌───────┐ ┌───────┐ ┌───────┐ ┌──── │
│ │ Img  │ │ Img  │ │ Img  │ │I │ │ Image │ │ Image │ │ Image │ │ Img  │
│ │ h-48 │ │ h-48 │ │ h-48 │ │h │ │       │ │       │ │       │ │      │
│ │(192) │ │(192) │ │(192) │ │4 │ ├───────┤ ├───────┤ ├───────┤ ├─────│
│ ├──────┤ ├──────┤ ├──────┤ ├─ │ │ Name  │ │ Name  │ │ Name  │ │ Name │
│ │ Name │ │ Name │ │ Name │ │Na │ │ Loc   │ │ Loc   │ │ Loc   │ │ Loc  │
│ │ ⭐   │ │ ⭐   │ │ ⭐   │ │⭐ │ │ Rating│ │ Rating│ │ Rating│ │ Rate │
│ └──────┘ └──────┘ └──────┘ └─ │ └───────┘ └───────┘ └───────┘ └─────│
│  Gap: 24px (md:gap-6)         │                                      │
│                               │ Each card gets 1/4 width              │
│ Featured shows 4 cards        │ Gap: 24px between columns            │
│ in perfect 4-card row         │ Perfect alignment, no wrapping        │
└──────────────────────────────────────────────────────────────────────────┘
```

### 📊 ALL PROPERTIES GRID SECTION

**Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6`**

Same layout as Featured, but with 20 properties maximum displayed.

---

## Height Specifications

### Featured Properties Cards

```
Mobile (xs-sm):
┌─────────────┐
│   Image     │  h-48 = 192px
├─────────────┤
│ Content     │  p-5 = 20px padding
│ • Title     │
│ • Location  │  line-clamp-2 on title & desc
│ • Rating    │  text-sm = 14px
└─────────────┘
Total: ~320px

Tablet (md):
┌─────────────┐
│   Image     │  h-56 = 224px (increased for screen size)
├─────────────┤
│ Content     │  p-5
│ • Title     │  Same line-clamp-2 system
│ • Desc      │
│ • Rating    │
└─────────────┘
Total: ~340px

Desktop (lg):
┌─────────────┐
│   Image     │  h-48 = 192px (responsive sizing)
├─────────────┤
│ Content     │  p-5
│ • Title     │  2-line clamp
│ • Location  │  text-sm
│ • Rating    │
└─────────────┘
Total: ~310px
```

### All Properties Cards (Compact)

```
Mobile (xs-sm):
┌──────────────┐
│   Image      │  h-56 = 224px (compact view)
│   [Hover]    │
│ View Details │  Appears on hover
├──────────────┤
│ Title        │  text-base, 2-line clamp
│ 📍 Location  │  text-sm
│ ⭐ 4.9       │  text-sm
└──────────────┘
Total: ~310px

Tablet (md):
Same sizing
Total: ~310px

Desktop (lg):
Same sizing
Total: ~310px
```

---

## Padding & Spacing System

```
Container padding:      px-4 md:px-6 = 16px (mobile) / 24px (tablet+)
Section padding:        py-16 = vertical 64px
Card padding (featured): p-5 = 20px all sides
Card gap:               gap-6 = 24px (md), gap-4 md:gap-6 = 16px → 24px
Search bar margin:      mb-8 = 32px

Line clamp heights:
- Title (2 lines):      ~56px
- Description (2 lines): ~40px
```

---

## Breakpoints Used

```
xs: 0px       (Mobile portrait - default)
sm: 640px     (Mobile landscape)
md: 768px     (Tablet)
lg: 1024px    (Desktop)
xl: 1280px    (Large desktop)
2xl: 1536px   (Extra large desktop)

Property Page Breakpoints:
- grid-cols-1           → xs, sm (1 column)
- md:grid-cols-2        → md (2 columns from 768px+)
- lg:grid-cols-4        → lg (4 columns from 1024px+)
```

---

## Mobile Optimization Features

✅ **No Horizontal Scroll**
- All cards fit vertically within viewport
- Proper padding prevents edge-cutting
- Images scale responsively

✅ **Touch-Friendly**
- Button min-height: 44px (accessibility standard)
- Proper spacing between clickable elements
- No hover-only interactions (mobile has view buttons)

✅ **Text Readability**
- Font sizes scale: text-sm → text-base on tablet+
- Line clamps prevent overflow
- Proper contrast ratios

✅ **Performance**
- No horizontal scrolling = no reflow
- Smooth vertical scroll only
- Images lazy-load efficiently

---

## Example Layouts

### Mobile Portrait (375px - iPhone 12)
```
[HERO SECTION]
┌─────────────────────┐
│ Premium Properties  │
│ Search bar          │
└─────────────────────┘

[QUICK FILTERS - Wrapped]
┌─────────────────────┐
│ All Types   Luxury  │ ← Row 1
│ Apartments  Estate  │ ← Row 2
│ Rentals   Commercial│ ← Row 3
│ Land                │ ← Row 4
└─────────────────────┘

[FEATURED - 1 Per Row]
┌─────────────────────┐
│ Property 1          │
├─────────────────────┤
│ Property 2          │
├─────────────────────┤
│ Property 3          │
├─────────────────────┤
│ Property 4          │
└─────────────────────┘
Scroll down for all properties
```

### Tablet (768px - iPad)
```
[HERO SECTION - Wider]
┌──────────────────────────────────┐
│ Premium Properties               │
│ [Search bar - wider]             │
└──────────────────────────────────┘

[FEATURED - 2 Per Row]
┌──────────────────────────────────┐
│ Prop 1        │ Prop 2          │
├──────────────┼─────────────────┤
│ Prop 3        │ Prop 4          │
└──────────────┴─────────────────┘

[ALL PROPERTIES - 2 Per Row]
Full scrolling grid, 2 wide
```

### Desktop (1024px+)
```
[FEATURED - 4 Per Row]
┌──────────────────────────────────────────────────────┐
│ Prop 1 │ Prop 2 │ Prop 3 │ Prop 4                   │
└──────────────────────────────────────────────────────┘

[ALL PROPERTIES - 4 Per Row, 20 max]
Perfect grid layout, no wrapping issues
```

---

## Design Tokens

```
Colors:
- Background: #000000 (black)
- Text Primary: #FFFFFF (white)
- Text Secondary: #9CA3AF (gray-400)
- Accent: #E3B92C (gold-400)
- Borders: rgba(255,255,255,0.1) (white/10)

Typography:
- Serif Font: Font-serif (headings)
- Title: font-bold text-lg md:text-xl
- Body: text-sm md:text-base
- Label: text-xs md:text-sm

Effects:
- Transition: duration-300 md:duration-500
- Hover Scale: hover:scale-110 (images)
- Shadows: shadow-xl md:shadow-2xl
```

---

## Testing Checklist

✅ Mobile Portrait (375px)
✅ Mobile Landscape (667px)
✅ Tablet (768px)
✅ Desktop (1024px)
✅ Large Desktop (1440px)
✅ No horizontal scroll
✅ Cards don't squash
✅ Images load properly
✅ Filters work on all sizes
✅ Text readable on small screens
✅ Touch targets adequate size
✅ Smooth scrolling performance
