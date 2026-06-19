## 🚀 Premium Card Rollout Roadmap

**Date:** June 8, 2026  
**Owner:** LowveldHub Design System  
**Status:** Phase 1 Complete (Education), Phases 2–5 Planned

---

## Summary

The **premium card philosophy** is a unified design system that applies to ALL categories at LowveldHub. 

**Core Idea:** Airbnb + Apple + Forbes. High-confidence visual storytelling instead of text-heavy descriptions.

**Deliverables:**
- `PREMIUM_CARD_PHILOSOPHY.md` — Conceptual guide (why & what)
- `PREMIUM_CARD_SPEC_SHEET.md` — Technical specs (how)
- `components/EducationCard.tsx` — Reference implementation
- `components/EducationDirectory.tsx` — Directory template
- `types.ts` — Updated with `tagline`, `premiumStat`, `highlights`
- `data/seeds.ts` — Education seeds updated with new fields

---

## Phase 1: Education (✅ COMPLETE)

**Status:** Ready to ship  
**Components:**
- `EducationCard.tsx` — Elegant institution cards
- `EducationDirectory.tsx` — Directory view with filters

**Seeds Updated:**
- University of Mpumalanga
- Tshwane University of Technology
- Curro Nelspruit
- Penryn College
- Uplands College

**Features Included:**
- ✓ Verified badge
- 🏆 Featured badge
- Institution type (UNIVERSITY, PRIVATE SCHOOL, etc.)
- Large hero image
- Institution name
- Location with icon
- 5-star rating
- 3 premium chips (highlights)
- One-line tagline
- One premium stat (confidence driver)
- "View Profile →" CTA

**Testing:** ✅ Ready

---

## Phase 2: Real Estate / Property

**Target:** Next 2 weeks  
**Card Changes:**

From:
```
IMAGE
PRICE
LOCATION
BEDS / BATHS / SIZE
AGENT
```

To:
```
IMAGE (larger, hero)
✓ VERIFIED or 🏆 FEATURED
PROPERTY TYPE (e.g., "LUXURY ESTATE")
Penryn Estate
📍 White River
⭐⭐⭐⭐⭐ 4.7 (42)
[ Pool ] [ Gate ] [ 2-Car Garage ]
"Where Safari Meets Luxury."
R8.5M or "5-Bed / 4-Bath"
View Profile →
```

**Implementation Steps:**
1. Create `components/PropertyCard.tsx` (copy EducationCard pattern)
2. Update property seeds with:
   - `tagline` (e.g., "Where Safari Meets Luxury.")
   - `premiumStat` (e.g., "R8.5M" or "5-Bed Estate")
   - `highlights` (e.g., ["Pool", "Gate", "2-Car Garage"])
3. Create `components/PropertyDirectory.tsx` (copy EducationDirectory pattern)
4. Add routing in `App.tsx` for property-directory view
5. Test on mobile/tablet/desktop

**Estimated Effort:** 6–8 hours

---

## Phase 3: Dining / Restaurants

**Target:** Weeks 3–4  
**Card Changes:**

From:
```
IMAGE
NAME
LOCATION
CUISINE
PRICE
RATING
```

To:
```
IMAGE (large plated dish)
✓ VERIFIED
FINE DINING
The Graff
📍 Nelspruit
⭐⭐⭐⭐⭐ 4.9 (112)
[ Farm-to-Table ] [ Wine Pairing ] [ Private Events ]
"Culinary Excellence Redefined."
Michelin Star 2025
View Profile →
```

**Implementation Steps:**
1. Create `components/DiningCard.tsx`
2. Update dining seeds (eatsSeeds.ts) with tagline, premiumStat, highlights
3. Create `components/DiningDirectory.tsx`
4. Add routing in `App.tsx`
5. Verify filters work (cuisine type, price range, rating)

**Estimated Effort:** 6–8 hours

---

## Phase 4: Hotels / Stays

**Target:** Weeks 5–6  
**Card Changes:**

From:
```
IMAGE
NAME
LOCATION
AMENITIES
PRICE
RATING
```

To:
```
IMAGE (suite/landscape)
🏆 FEATURED
5-STAR HOTEL
White River Lodge
📍 White River
⭐⭐⭐⭐⭐ 4.8 (156)
[ Infinity Pool ] [ Spa ] [ Mountain View ]
"Luxury Retreat in the Bush."
99% Guest Satisfaction or From R3,500/night
View Profile →
```

**Implementation Steps:**
1. Create `components/HotelCard.tsx`
2. Update hotel seeds (tourismTravelSeeds.ts) with tagline, premiumStat, highlights
3. Create `components/HotelDirectory.tsx`
4. Add routing in `App.tsx`
5. Verify filters (star rating, price, location)

**Estimated Effort:** 6–8 hours

---

## Phase 5: All Other Categories

**Target:** Weeks 7–8  
**Categories to Apply:**
- Retail / Shopping
- Medical / Health
- Professional Services
- Beauty & Wellness
- Automotive
- Legal & Advisory
- Finance & Money Services
- Event Venues
- Sport & Recreation
- etc.

**Per-Category Steps (Template):**
1. Define what makes each category special
   - What's the hero stat? (e.g., retail: "10,000+ Products")
   - What are typical 3 chips? (e.g., retail: ["Designer", "Luxury", "Online"])
   - What's a good tagline format? (e.g., retail: "Curated collections")

2. Create card component (copy EducationCard → customize)
3. Update seeds with tagline, premiumStat, highlights
4. Create directory view (copy EducationDirectory → customize)
5. Add routing in App.tsx
6. Test

**Estimated Effort:** 4 hours per category × ~15 categories = 60 hours total

---

## Implementation Checklist (Per Phase)

For each new card type:

### Card Component
- [ ] Copy `EducationCard.tsx` as template
- [ ] Update props interface (if needed)
- [ ] Update `getInstitutionType()` logic to match category
- [ ] Update `getBadgeLabel()` logic (if different)
- [ ] Verify all 10 card elements render:
  1. Hero image
  2. Verify badge
  3. Type
  4. Name
  5. Location
  6. Rating
  7. 3 chips
  8. Tagline
  9. Premium stat
  10. CTA button
- [ ] Test hover effects
- [ ] Test favorite toggle
- [ ] Test on mobile (h-80 scales properly)

### Seeds Update
- [ ] Add `tagline` to 5–10 top listings
- [ ] Add `premiumStat` (confidence driver)
- [ ] Add `highlights` (top 3 attributes)
- [ ] Verify fields are optional (graceful fallback)

### Directory View
- [ ] Copy `EducationDirectory.tsx` as template
- [ ] Update category filter logic
- [ ] Add appropriate sorting options
- [ ] Test search
- [ ] Test mobile filters
- [ ] Test responsive grid (1/2/4 cols)

### App.tsx Integration
- [ ] Add lazy import: `const CategoryCard = lazy(...)`
- [ ] Add route case in switch statement
- [ ] Test navigation

### Testing
- [ ] ✅ Desktop (1920px, 4 cols)
- [ ] ✅ Tablet (768px, 2 cols)
- [ ] ✅ Mobile (375px, 1 col)
- [ ] ✅ Image loads correctly
- [ ] ✅ Text doesn't overflow
- [ ] ✅ All interactive elements work
- [ ] ✅ Hover states visible
- [ ] ✅ No console errors

---

## Types.ts Updates (One-Time)

✅ Already completed:

```typescript
export interface Business {
  // ... existing fields ...
  
  // NEW premium card fields (optional):
  tagline?: string;           // One-line memorable phrase
  premiumStat?: string;       // Confidence driver stat
  highlights?: string[];      // Top 3 highlights/attributes
}
```

**No further type changes needed.**

---

## File Structure After Full Rollout

```
components/
├── EducationCard.tsx          ✅
├── EducationDirectory.tsx     ✅
├── PropertyCard.tsx           (Phase 2)
├── PropertyDirectory.tsx      (Phase 2)
├── DiningCard.tsx             (Phase 3)
├── DiningDirectory.tsx        (Phase 3)
├── HotelCard.tsx              (Phase 4)
├── HotelDirectory.tsx         (Phase 4)
├── RetailCard.tsx             (Phase 5)
├── RetailDirectory.tsx        (Phase 5)
├── MedicalCard.tsx            (Phase 5)
├── MedicalDirectory.tsx       (Phase 5)
└── [... more cards ...]

documentation/
├── PREMIUM_CARD_PHILOSOPHY.md       ✅
├── PREMIUM_CARD_SPEC_SHEET.md       ✅
└── PREMIUM_CARD_ROLLOUT_ROADMAP.md  ✅ (this file)

data/
├── seeds.ts                   ✅ (education updated)
├── homesSeeds.ts              (to update Phase 2)
├── eatsSeeds.ts               (to update Phase 3)
├── tourismTravelSeeds.ts      (to update Phase 4)
└── [... more seeds ...]

types.ts                        ✅ (updated with 3 new optional fields)
```

---

## Naming Convention

When creating card components:

```typescript
// For category "EDUCATION & SCHOOLS"
components/EducationCard.tsx        ← singular, descriptive
components/EducationDirectory.tsx   ← singular + Directory

// For category "REAL ESTATE"
components/PropertyCard.tsx         ← use "Property" not "RealEstate"
components/PropertyDirectory.tsx

// For category "FOOD & HOSPITALITY"
components/DiningCard.tsx           ← use "Dining" not "FoodAndHospitality"
components/DiningDirectory.tsx

// For category "HEALTHCARE"
components/MedicalCard.tsx          ← use "Medical" not "Healthcare"
components/MedicalDirectory.tsx
```

---

## Testing Approach

### Unit Testing (Per Card Component)
```typescript
// Example test: EducationCard
describe('EducationCard', () => {
  it('renders institution type', () => {
    const institution = { 
      subcategory: 'PRIMARY & SECONDARY SCHOOLS',
      tags: ['private']
    };
    expect(getInstitutionType(institution)).toBe('PRIVATE SCHOOL');
  });
  
  it('shows verified badge when isVerified=true', () => {
    // Render component, check badge visible
  });
  
  it('renders exactly 3 highlights max', () => {
    // Provide 5 highlights, verify only 3 shown
  });
});
```

### Integration Testing (Per Directory View)
```typescript
// Example test: EducationDirectory
describe('EducationDirectory', () => {
  it('filters by institution type', () => {
    // Select "UNIVERSITY", verify only universities shown
  });
  
  it('searches by name', () => {
    // Search "Penryn", verify Penryn College shows
  });
  
  it('sorts by rating', () => {
    // Change sort to "Top Rated", verify 4.8 > 4.7
  });
});
```

### Visual Testing (Manual)
```
Devices:
✅ iPhone 12 (375px)
✅ iPad (768px)
✅ Desktop (1920px)

Scenarios:
✅ Image loads (fallback if missing)
✅ Long name wraps to 2 lines
✅ Hover effects visible
✅ Favorite toggle works
✅ CTA navigates correctly
✅ No layout shift
✅ Colors match spec
```

---

## Success Metrics

After each phase:

1. **Visual Consistency:** Card follows spec 100% (image h-80, hierarchy, spacing)
2. **Code Quality:** All components compile without errors
3. **Responsive:** Works 375px–1920px without horizontal scroll
4. **User Confidence:** Card includes all 10 elements (image, type, name, location, rating, 3 chips, tagline, stat, CTA)
5. **Performance:** Cards load <1 second on 4G
6. **Testing:** No console errors, all interactive elements functional

---

## Communication Plan

When rolling out each phase:

1. **Announcement:** "We've redesigned [Category] cards to build more confidence"
2. **Visual:** Before/after comparison
3. **Benefits:** "Parents now see 100% Pass Rate at a glance"
4. **Call-to-action:** "Explore [Category] now →"

---

## Known Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Seeds missing tagline/stat | Provide fallback: no render vs. "Coming soon" |
| Image load failure | Use Unsplash fallback (category-specific) |
| Responsive layout breaks | Test 375px, 768px, 1920px rigorously |
| Type confusion across categories | Document naming (Property, Dining, Hotel, etc.) |
| Team adds 4+ chips instead of 3 | Add code comment: "// MAX 3 CHIPS ONLY" |
| Long names overflow | Use line-clamp-2, test edge cases |

---

## Timeline (Aggressive)

```
Week 1 (June 8–14):   Phase 1 (Education) - COMPLETE ✅
Week 2 (June 15–21):  Phase 2 (Property)
Week 3–4:             Phase 3 (Dining)
Week 5–6:             Phase 4 (Hotels)
Week 7–8:             Phase 5 (Other categories)
```

**Total Effort:** ~100 hours (design + implementation + testing)

---

## Approval & Sign-Off

- [ ] Design system approved (PREMIUM_CARD_PHILOSOPHY.md)
- [ ] Spec sheet approved (PREMIUM_CARD_SPEC_SHEET.md)
- [ ] Education cards approved (Phase 1 ready)
- [ ] Property cards approved (Phase 2 ready)
- [ ] All cards approved (Phase 5 complete)

---

## Next Step

🚀 **Ship Phase 1 (Education) this week.**

Education is the highest-value category (R50k–R250k/year decisions). Getting this right builds credibility for the entire system.

After launch, gather feedback:
- Do parents feel more confident?
- Do conversion rates improve?
- What's missing?

Then proceed to Phase 2 (Property) with that insight.

---

**This is the premium card system for LowveldHub.**  
**One philosophy. All categories. Maximum confidence.**  
**Let's build something beautiful.**
