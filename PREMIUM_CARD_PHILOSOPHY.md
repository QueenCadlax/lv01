## 🏆 Premium Card Philosophy & Design System

**Date:** June 8, 2026  
**Status:** Foundation Document for All Categories  
**Applies To:** Property, Restaurant, Hotel, School, and future category cards

---

## Core Principle: Airbnb + Apple + Forbes

Think of **high-confidence decision-making**. A parent choosing where to spend R50,000–R250,000/year on education needs **visual trust drivers**, not text. Every card is a conversation starter, not a brochure.

---

## ❌ What NEVER Goes on Cards

These belong **only on the profile page**:

- Long descriptions
- Phone numbers
- Email addresses
- Full addresses
- 8+ feature chips
- Mission statements
- Principal/CEO names
- Years in business
- Huge paragraphs
- Lists of sports
- Lists of subjects
- Lists of facilities
- Application forms
- Detailed pricing

---

## ✅ What ALWAYS Goes on Cards

### Hierarchy (in order from largest to smallest visual weight):

1. **HERO IMAGE** (MOST IMPORTANT)
   - Beautiful, aspirational
   - 300+ pixels tall
   - What makes someone stop scrolling
   - Examples: Campus aerial, restaurant interior, hotel suite, property exterior

2. **VERIFY BADGE** (small, elegant)
   - `✓ Verified` — Adds trust
   - `🏆 Featured` — Premium designation
   - Top-left or top-right corner
   - Subtle background (black/70 with backdrop blur)
   - Font size: 10px

3. **INSTITUTION/BUSINESS TYPE** (small uppercase)
   - Examples:
     - `PRIVATE SCHOOL`, `UNIVERSITY`, `COLLEGE`, `TRAINING CENTRE`
     - `FINE DINING`, `CASUAL`, `FAMILY RESTAURANT`
     - `5-STAR HOTEL`, `BOUTIQUE`, `RESORT`
     - `LUXURY ESTATE`, `TOWNHOUSE`, `INVESTMENT`
   - Font size: 10px, uppercase, tracked
   - Color: gray-500

4. **NAME** (Large & Bold)
   - 18px serif font, bold
   - White text, gold on hover
   - Line-clamp-2 for consistency
   - Examples: "Penryn College", "The Graff", "White River Lodge"

5. **LOCATION** (with icon)
   - Emoji icon: 📍 (or ChevronRight, MapPin)
   - Simple one-liner
   - Examples: "Mbombela", "White River", "Nelspruit"
   - Font size: 12px, gray-400

6. **RATING** (Stars + Score)
   - Show 5-star visual (filled gold or gray)
   - Display number: "4.8"
   - Show review count: "(58)"
   - Font size: 12px for stars, score, and count
   - Adds trust immediately

7. **THREE PREMIUM CHIPS** (Max!)
   - Strongest 3 attributes only
   - Sourced from `highlights` array or top 3 tags
   - Examples:
     - School: `[ IEB ] [ Boarding ] [ Grade R–12 ]`
     - Restaurant: `[ Farm-to-Table ] [ Wine Pairing ] [ Private Events ]`
     - Hotel: `[ Infinity Pool ] [ Spa ] [ Mountain View ]`
     - Property: `[ Pool ] [ Gate ] [ 2-Car Garage ]`
   - Style: Gold border, translucent bg, hover darken
   - Font size: 10px
   - Padding: px-3 py-1.5

8. **ONE-LINE TAGLINE** (Italic)
   - Memorable phrase only
   - Examples:
     - "Believe. Belong. Become."
     - "Shaping Africa's Future Leaders."
     - "Future-focused Learning."
     - "Where luxury meets cuisine."
   - Font size: 12px, italic, gray-400
   - Line-clamp-1 (single line only)

9. **ONE LUXURY STATISTIC** (Confidence Driver)
   - **THIS IS THE MAGIC ELEMENT.**
   - Single stat that drives confidence, not description
   - Examples:
     - School: "100% Pass Rate" or "34+ Years Excellence" or "11 International Scholarships"
     - Restaurant: "2 Michelin Stars" or "Sommelier Award 2025"
     - Hotel: "99% Guest Satisfaction" or "Forbes Top 50 Africa"
     - Property: "R12.5M" or "4-Bed Estate"
   - Style: Boxed, gold accent, centered
   - Font size: 12px, semibold
   - Padding: px-3 py-2

10. **CTA BUTTON** (View Profile)
    - Label: "View Profile →"
    - Style: Outlined (not filled), gold text on black
    - Hover: Darker bg, darker border, arrow animate right
    - Font size: 12px, medium weight
    - Padding: px-4 py-2.5

---

## Visual Card Structure (Text Layout)

```
┌─────────────────────────────────────┐
│                                     │
│     LARGE CAMPUS IMAGE (h-80)       │
│                                     │
│   [❤️] Top-right      [✓ Verified] │
│                          Top-left    │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│  PRIVATE SCHOOL                     │
│                                     │
│  Penryn College                     │
│                                     │
│  📍 Mbombela                        │
│                                     │
│  ⭐⭐⭐⭐⭐ 4.8 (58)                 │
│                                     │
│  [ IEB ] [ Boarding ] [ Grade R–12 ]│
│                                     │
│  "Believe. Belong. Become."         │
│                                     │
│  ┌─────────────────────────────────┐│
│  │    100% Pass Rate                ││
│  └─────────────────────────────────┘│
│                                     │
│  [  View Profile  →  ]              │
│                                     │
└─────────────────────────────────────┘
```

---

## Category-Specific Examples

### PROPERTY (Homes)

**Card Content:**
```
IMAGE: Beautiful estate or home exterior
TYPE: LUXURY ESTATE
NAME: Kruger Gateway Lodge
LOCATION: 📍 White River
RATING: ⭐⭐⭐⭐⭐ 4.7 (42)
HIGHLIGHTS: [ Pool ] [ Gate ] [ 2-Car Garage ]
TAGLINE: "Where Safari Meets Luxury."
STAT: R8.5M (or "5-Bed / 4-Bath")
CTA: View Profile →
```

### RESTAURANT (Dining)

**Card Content:**
```
IMAGE: Plated dish or dining ambiance
TYPE: FINE DINING
NAME: The Graff
LOCATION: 📍 Nelspruit
RATING: ⭐⭐⭐⭐⭐ 4.9 (112)
HIGHLIGHTS: [ Farm-to-Table ] [ Wine Pairing ] [ Private Events ]
TAGLINE: "Culinary Excellence Redefined."
STAT: Michelin Star 2025 (or "2-Course Menu R450")
CTA: View Profile →
```

### HOTEL (Stays)

**Card Content:**
```
IMAGE: Hotel suite or landscape view
TYPE: 5-STAR HOTEL
NAME: White River Lodge
LOCATION: 📍 White River
RATING: ⭐⭐⭐⭐⭐ 4.8 (156)
HIGHLIGHTS: [ Infinity Pool ] [ Spa ] [ Mountain View ]
TAGLINE: "Luxury Retreat in the Bush."
STAT: 99% Guest Satisfaction (or "From R3,500/night")
CTA: View Profile →
```

### SCHOOL (Education)

**Card Content:**
```
IMAGE: Campus or students in activity
TYPE: PRIVATE SCHOOL
NAME: Curro Nelspruit
LOCATION: 📍 Nelspruit
RATING: ⭐⭐⭐⭐⭐ 4.7 (76)
HIGHLIGHTS: [ Private ] [ Innovation ] [ Sport ]
TAGLINE: "Future-focused Learning."
STAT: 95% University Placement
CTA: View Profile →
```

---

## Implementation Checklist

When creating a new category card component:

- [ ] Hero image is 300+ pixels (h-80 Tailwind)
- [ ] Verify/Featured badge positioned (top-left or top-right)
- [ ] Business type shown (10px uppercase)
- [ ] Name is large, white, serif, bold (18px)
- [ ] Location with icon (12px)
- [ ] Star rating visual + numeric score
- [ ] Exactly 3 chips (never more, never less if available)
- [ ] One-line tagline (italic, line-clamp-1)
- [ ] One premium stat (confidence driver, not description)
- [ ] "View Profile →" CTA button
- [ ] Hover effects on image (scale-110), border, and chip background
- [ ] Favorite heart button (top-right, toggles gold)
- [ ] Mobile responsive (round corners 3xl, padding consistent)
- [ ] Color scheme: black bg, #D4AF37 gold accents, gray-400/600 text

---

## Types.ts Required Fields

Every Business should have (optional fields—fallback gracefully):

```typescript
interface Business {
  // Existing fields...
  
  // NEW premium card fields:
  tagline?: string;           // One-line tagline
  premiumStat?: string;       // Confidence driver stat
  highlights?: string[];      // Top 3 highlights
}
```

---

## Philosophy: Why This Works

1. **Images Stop Scrolling** — 80% of decision is visual; big hero image dominates
2. **Trust Badges** — ✓ Verified or 🏆 Featured immediately builds confidence
3. **Type Clarification** — "PRIVATE SCHOOL" vs "UNIVERSITY" matters; no confusion
4. **Name Recognition** — Large, readable, memorable
5. **Stars = Trust** — Ratings are the #1 trust driver after images
6. **Three Highlights** — Cognitive load sweet spot; not overwhelming, not empty
7. **Tagline = Emotion** — One line plants a story (Forbes style)
8. **Premium Stat = Conversation** — "100% Pass Rate" > "Long description about academics"
9. **CTA = Action** — Clear next step; no ambiguity
10. **Luxury Simplicity** — Less text, more visual, more confidence

---

## Rollout Plan

1. **Phase 1:** Apply to Education (EducationCard.tsx ✅)
2. **Phase 2:** Apply to Property (PropertyCard.tsx)
3. **Phase 3:** Apply to Restaurant/Dining (DiningCard.tsx)
4. **Phase 4:** Apply to Hotel/Stays (HotelCard.tsx)
5. **Phase 5:** Apply to remaining categories (Retail, Medical, etc.)

Each new card component:
- Extends the same philosophy
- Uses same color scheme (#D4AF37, blacks, grays)
- Same hierarchy (image, type, name, location, rating, 3 chips, tagline, stat, CTA)
- Same hover effects and responsive design

---

## Dev Tips

### Extract Top 3 From Tags:
```typescript
const highlights = business.highlights || business.tags?.slice(0, 3) || [];
```

### Render Stars:
```typescript
Array.from({ length: 5 }).map((_, i) => (
  <Star
    key={i}
    className={i < Math.floor(rating) ? 'fill-[#D4AF37]' : 'text-gray-600'}
  />
))
```

### Determine Type (Example for Schools):
```typescript
const getInstitutionType = (business) => {
  const sub = business.subcategory?.toUpperCase() || '';
  if (sub.includes('UNIVERSITY')) return 'UNIVERSITY';
  if (sub.includes('PRIVATE')) return 'PRIVATE SCHOOL';
  return 'SCHOOL';
};
```

### Get Badge Label:
```typescript
const badgeLabel = business.isFeatured ? '🏆 Featured' : 
                   business.isVerified ? '✓ Verified' : null;
```

---

## Questions? Use This Test

Does your card pass the **"Glance Test"**?

- [ ] Can someone identify the business in 1 second? (Image + Name)
- [ ] Do they see the rating immediately? (Trust)
- [ ] Do they see what makes it special? (3 Chips or Stat)
- [ ] Is there a clear next step? (CTA)

If yes to all 4, you've got a premium card. ✓

---

**This is the LowveldHub premium card standard.**  
Every category follows this philosophy.  
Consistency builds trust. Trust builds sales.
