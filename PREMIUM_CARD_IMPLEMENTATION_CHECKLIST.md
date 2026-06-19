## ✅ Premium Card Implementation Checklist

**Date:** June 8, 2026  
**For:** Developers implementing new card categories  
**Duration:** ~6–8 hours per category

---

## Pre-Implementation (Before You Start)

- [ ] Read `PREMIUM_CARD_PHILOSOPHY.md` (understand the "why")
- [ ] Read `PREMIUM_CARD_SPEC_SHEET.md` (technical details)
- [ ] Review `EducationCard.tsx` (reference implementation)
- [ ] Review `EducationDirectory.tsx` (directory template)
- [ ] Check `PREMIUM_CARD_EXAMPLES.md` for your category
- [ ] Have Figma open (or sketch rough layout)
- [ ] Have color picker ready (#D4AF37, black, grays)

---

## Step 1: Identify Category Specifics (30 min)

For your category (e.g., Property, Dining, Hotel):

**Type Enum:**
- [ ] What's the "institution type"? (e.g., "LUXURY ESTATE", "FINE DINING", "5-STAR HOTEL")
- [ ] How is this determined? (from subcategory? property type? tier?)
- [ ] Create logic function: `getTypeForCategory(business) => string`

**Common Premium Stats:**
- [ ] What stat builds confidence? (e.g., "100% Pass Rate", "Michelin Star", "R8.5M")
- [ ] List 5 examples for your category
- [ ] Where does this come from? (New field? Calculated? Existing field?)

**Typical Highlights (3 Chips):**
- [ ] What are the 3 most important attributes?
- [ ] Examples: ["IEB", "Boarding", "Grade R–12"]
- [ ] How to select top 3? (From tags? New field? Hardcoded priority?)

**Tagline Examples:**
- [ ] What's a good 1-line summary? (40–60 chars)
- [ ] Example: "Believe. Belong. Become."
- [ ] Is this stored in seeds? Or derived?

**Verify/Featured Logic:**
- [ ] How do you determine if verified? (isVerified field? Tier?)
- [ ] How do you determine if featured? (isFeatured field? Admin flag?)

---

## Step 2: Create Card Component (1.5 hours)

### File: `components/YourCategoryCard.tsx`

**Scaffold (Copy from EducationCard):**
```bash
cp components/EducationCard.tsx components/YourCategoryCard.tsx
```

**Update in order:**

- [ ] **Interface Name:** Change `EducationCardProps` → `YourCategoryCardProps`
- [ ] **Props Interface:** Match your needs (institution → business, etc.)

- [ ] **Type Logic Function:** Replace `getInstitutionType()`
  ```typescript
  const getTypeForCategory = (business: Business): string => {
    // Your logic here
    // Examples: "LUXURY ESTATE", "FINE DINING", "5-STAR HOTEL"
  };
  ```

- [ ] **Badge Logic Function:** Keep `getBadgeLabel()` (same for all)
  ```typescript
  const getBadgeLabel = (business: Business): string | null => {
    if (business.isFeatured) return '🏆 Featured';
    if (business.isVerified) return '✓ Verified';
    return null;
  };
  ```

- [ ] **Highlights Extraction:** Update how you get top 3
  ```typescript
  const highlights = business.highlights || business.tags?.slice(0, 3) || [];
  ```

- [ ] **Component JSX:** Keep structure identical
  - Hero image (h-80)
  - Favorite button (top-right)
  - Badge (top-left)
  - Type (10px uppercase)
  - Name (18px serif bold)
  - Location (with icon)
  - Rating (stars + score + count)
  - Highlights (3 chips max)
  - Tagline (italic, line-clamp-1)
  - Premium stat (gold box)
  - CTA button ("View Profile →")

- [ ] **Hover Effects:** Keep identical
  - Image: `group-hover:scale-110`
  - Border: `group-hover:border-[#D4AF37]/60`
  - Shadow: `group-hover:shadow-2xl`
  - Name color: `group-hover:text-[#D4AF37]`
  - Chips: `group-hover:bg-[#D4AF37]/20`

- [ ] **Test:** No TypeScript errors
  ```bash
  npx tsc --noEmit
  ```

---

## Step 3: Create Directory Component (1.5 hours)

### File: `components/YourCategoryDirectory.tsx`

**Scaffold (Copy from EducationDirectory):**
```bash
cp components/EducationDirectory.tsx components/YourCategoryDirectory.tsx
```

**Update in order:**

- [ ] **Interface Name:** Change `EducationDirectoryProps` → `YourCategoryDirectoryProps`

- [ ] **Hero Section:**
  - [ ] Heading: "YOUR CATEGORY NAME" (match brand)
  - [ ] Subtitle: "Discover top-rated [items] across Mpumalanga"
  - [ ] Search placeholder: "Search by [item type], location..."
  - [ ] Quick filter chips: Relevant for your category
    - Examples (Education): ["Universities", "Schools", "Top Rated"]
    - Examples (Property): ["For Sale", "To Rent", "Luxury"]
    - Examples (Dining): ["Fine Dining", "Casual", "Seafood"]

- [ ] **Filter Options:**
  - [ ] Type filter: Specific to your category
    - Examples: Property Types (Houses, Apartments, etc.)
    - Examples: Cuisine types (Italian, Local, etc.)
    - Examples: Star ratings (5-Star, 3-Star, etc.)
  - [ ] Location filter: Keep `MPUMALANGA_AREAS` (universal)
  - [ ] Sort options: Relevant for your category
    - Common: "Top Rated", "Most Reviewed", "Newest"
    - Property-specific: "Price Low to High", "Price High to Low"
    - Restaurant-specific: "Highest Rated", "Most Popular"

- [ ] **Mobile Filters:** Use same select structure

- [ ] **Grid Display:**
  - [ ] Use your new card component: `<YourCategoryCard />`
  - [ ] Pass props: `business`, `isFavorited`, `onToggleFavorite`, `onViewProfile`
  - [ ] Grid classes: Keep identical
    - `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`

- [ ] **Helper Function:** Move type logic into directory
  ```typescript
  const getTypeForCategory = (business: Business): string => {
    // Same logic as in card component
  };
  ```

- [ ] **Test:** No TypeScript errors
  ```bash
  npx tsc --noEmit
  ```

---

## Step 4: Update Seeds (1 hour)

### File: `data/[yourCategory]Seeds.ts` (or `data/seeds.ts`)

For each institution/business in your category, add:

- [ ] **`tagline?: string`** (40–60 chars, memorable)
  ```typescript
  tagline: "Believe. Belong. Become."
  // or
  tagline: "Culinary Excellence Redefined."
  // or
  tagline: "Where Safari Meets Luxury."
  ```

- [ ] **`premiumStat?: string`** (confidence driver, max 30 chars)
  ```typescript
  premiumStat: "100% Pass Rate"
  // or
  premiumStat: "Michelin Star 2025"
  // or
  premiumStat: "R8.5M"
  ```

- [ ] **`highlights?: string[]`** (exactly 3, top attributes)
  ```typescript
  highlights: ["IEB", "Boarding", "Grade R–12"]
  // or
  highlights: ["Farm-to-Table", "Wine Pairing", "Private Events"]
  // or
  highlights: ["Pool", "Gate", "2-Car Garage"]
  ```

**Example (Education):**
```typescript
{
  id: 'edu_penryn',
  name: 'Penryn College',
  category: Category.EducationAndSkills,
  subcategory: 'PRIMARY & SECONDARY SCHOOLS',
  description: 'Prestigious independent school...',
  location: 'Mbombela',
  image: 'https://...',
  rating: 4.8,
  reviewCount: 58,
  tier: ListingTier.Elite,
  subscriptionDuration: SubscriptionDuration.SixMonths,
  isElite: true,
  isFeatured: true,
  priceLevel: 'Fee on Application',
  tags: ['private', 'accredited', 'boarding available', 'ieb', 'scholarships'],
  
  // NEW FIELDS
  tagline: 'Believe. Belong. Become.',
  premiumStat: '100% Pass Rate',
  highlights: ['IEB', 'Boarding', 'Grade R–12']
}
```

- [ ] Update 5–10 top listings with these fields
- [ ] Leave other listings without (they'll work fine, just less compelling)

---

## Step 5: Add Routing in App.tsx (30 min)

### In App.tsx main switch statement:

- [ ] **Lazy import:**
  ```typescript
  const YourCategoryDirectory = lazy(
    () => import('./components/YourCategoryDirectory')
  );
  const YourCategoryCard = lazy(
    () => import('./components/YourCategoryCard')
  );
  ```

- [ ] **Route cases (in switch):**
  ```typescript
  case 'your-category-directory':
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <YourCategoryDirectory
          businesses={localBusinesses}
          navigate={handleNavigate}
          toggleFavorite={toggleFavorite}
          favoritesSet={favorites}
        />
      </Suspense>
    );

  case 'your-category-detail':
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <YourCategoryDetail
          id={selectedBusinessId}
          navigate={handleNavigate}
        />
      </Suspense>
    );
  ```

- [ ] **Navigation calls:**
  ```typescript
  // From homepage or menu:
  handleNavigate('your-category-directory');

  // From card:
  onViewProfile={(id) => navigate('your-category-detail', undefined, id)}
  ```

---

## Step 6: Test Responsive (1 hour)

### Device Testing (use browser DevTools):

**Mobile (375px):**
- [ ] Card renders full width (1 col)
- [ ] Image h-80 visible
- [ ] All text readable
- [ ] No horizontal scroll
- [ ] Favorite button clickable
- [ ] CTA button clickable

**Tablet (768px):**
- [ ] Grid shows 2 cols
- [ ] Cards look balanced
- [ ] No text overflow
- [ ] Filters work on mobile drawer

**Desktop (1920px):**
- [ ] Grid shows 4 cols
- [ ] Cards evenly spaced (gap-8)
- [ ] Hover effects visible
- [ ] Desktop filters visible

### Visual Checklist:

- [ ] Images load correctly (no broken images)
- [ ] Text hierarchy clear (type < name > rating > stat)
- [ ] Colors match spec (#D4AF37 gold, black bg, gray text)
- [ ] Hover effects smooth (scale, border, shadow)
- [ ] Favorite toggle works (heart fills/empties)
- [ ] No console errors (`F12` → Console tab)
- [ ] Loading spinner appears during lazy load

---

## Step 7: Browser Testing (30 min)

### Open browser DevTools (F12):

**Console Tab:**
- [ ] No errors (red X)
- [ ] No warnings (yellow !)
- [ ] TypeScript builds cleanly: `npm run build`

**Network Tab:**
- [ ] Images load <1 sec on 4G throttle
- [ ] No 404s
- [ ] API calls (if any) return 200

**Performance Tab:**
- [ ] Page loads in <3 seconds
- [ ] No layout shift

**Accessibility Tab:**
- [ ] Images have alt text
- [ ] Buttons are focusable (tab key)
- [ ] Color contrast sufficient (no gray-600 on black fails)

---

## Step 8: Code Review Checklist (30 min)

Before submitting PR:

- [ ] No console.log() statements left
- [ ] No commented-out code blocks
- [ ] No unused imports
- [ ] Naming consistent (YourCategoryCard, YourCategoryDirectory)
- [ ] JSX formatted (Prettier)
- [ ] TypeScript strict: no `any` types
- [ ] Props properly destructured
- [ ] No hardcoded colors (use Tailwind classes only)
- [ ] Comments above complex logic
- [ ] README updated (if routing changed)

---

## Step 9: PR Submission (Checklist)

**PR Title:**
```
[FEATURE] Add YourCategory premium cards (Phase X)

Example:
[FEATURE] Add Property premium cards (Phase 2)
```

**PR Description:**
```markdown
## What Changed
- Added `YourCategoryCard.tsx` (premium card component)
- Added `YourCategoryDirectory.tsx` (directory view)
- Updated `data/seeds.ts` with tagline/premiumStat/highlights
- Updated `App.tsx` routing for new views

## Screenshots
[Include 1 desktop, 1 mobile]

## Testing
- ✅ Tested 375px, 768px, 1920px
- ✅ All 10 card elements rendering
- ✅ Hover effects work
- ✅ No console errors
- ✅ TypeScript strict mode clean

## Checklist
- [x] Component follows spec 100%
- [x] Seeds updated (5+ listings)
- [x] Routing in App.tsx
- [x] Responsive tested
- [x] No console errors
```

---

## Step 10: Post-Launch (1 hour)

After your category is merged:

- [ ] Monitor console for errors
- [ ] Check mobile traffic (images loading?)
- [ ] Gather user feedback: "Does card feel premium?"
- [ ] Are conversion rates improving?
- [ ] Any accessibility issues?
- [ ] Update next category based on learnings

---

## Time Breakdown

| Task | Time | Notes |
|------|------|-------|
| Pre-work | 30 min | Read docs, understand category |
| Card component | 1.5 hrs | Copy template, update logic |
| Directory component | 1.5 hrs | Copy template, add filters |
| Seeds update | 1 hr | Add tagline/stat/highlights to 5–10 items |
| Routing (App.tsx) | 30 min | Add lazy imports + cases |
| Responsive test | 1 hr | Test 3 devices |
| Browser test | 30 min | DevTools: console, network, perf |
| Code review | 30 min | Polish, formatting, comments |
| PR submission | 30 min | Write description, screenshots |
| **Total** | **~8 hrs** | Realistic for one category |

---

## Command Reference

### Build & Check
```bash
npm run build              # Full build
npx tsc --noEmit         # Type check only
npm run dev              # Dev server (test locally)
```

### Git Workflow
```bash
git checkout -b feature/your-category-cards
# Make changes
git add .
git commit -m "[FEATURE] Add YourCategory premium cards"
git push origin feature/your-category-cards
# Create PR on GitHub
```

### Testing Shortcuts
```bash
# Dev server with auto-reload
npm run dev

# Open DevTools
F12

# Mobile view
Ctrl+Shift+M (Windows) or Cmd+Shift+M (Mac)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| TypeScript errors | Check `npx tsc --noEmit`, ensure imports correct |
| Image doesn't load | Check URL validity, use fallback Unsplash |
| Grid doesn't wrap to 2 cols on tablet | Verify Tailwind classes: `sm:grid-cols-2` |
| Favorite button doesn't toggle | Check `onToggleFavorite` prop passed & called |
| Stars don't fill correctly | Verify `Math.floor(rating)` logic |
| Long name overflows | Check `line-clamp-2` applied to title |
| Tagline doesn't show | Check `institution.tagline` exists in seeds |
| Premium stat shows empty | Check `institution.premiumStat` not null |
| CTA button doesn't navigate | Check `onClick` calls `onViewProfile`, routing case exists |

---

## Questions?

Refer to these docs:
- **Component structure:** `PREMIUM_CARD_SPEC_SHEET.md`
- **Examples for your category:** `PREMIUM_CARD_EXAMPLES.md`
- **Philosophy/why:** `PREMIUM_CARD_PHILOSOPHY.md`
- **Existing code:** Review `components/EducationCard.tsx`

---

## Definition of Done

Your PR is ready to merge when:

- [x] Component compiles (TypeScript strict)
- [x] No console errors
- [x] Responsive 375px–1920px
- [x] All 10 card elements present
- [x] Hover effects smooth
- [x] Favorite toggle works
- [x] Seeds updated (5+ listings)
- [x] Routing in App.tsx
- [x] PR description complete
- [x] Code reviewed (peer approval)

---

**Estimated Total Time:** 6–8 hours per category  
**Effort Level:** Medium (copy templates, customize logic)  
**Difficulty:** Low (structured, well-documented)  

**You've got this. 🚀**
