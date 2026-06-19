## 📋 Premium Card Design Specification Sheet

**Version:** 1.0  
**Date:** June 8, 2026  
**For:** All LowveldHub Category Cards

---

## Exact Component Structure

### Container
```
rounded-3xl
border border-[#D4AF37]/20
hover:border-[#D4AF37]/60
bg-black
overflow-hidden
transition-all duration-300
hover:shadow-2xl hover:shadow-[#D4AF37]/15
```

### Image Section
```
Height: h-80 (320px)
Background: bg-gray-900 (fallback)
Object-fit: cover
Hover: group-hover:scale-110 transition-transform duration-700

Favorite Button (overlay):
- Position: absolute top-3 right-3
- Background: bg-black/50 hover:bg-black/70
- Padding: p-2
- Backdrop: backdrop-blur-sm
- Icon: Heart 4x4 or 5x5
- Color: text-white, fill-[#D4AF37] when favorited
- Z-index: z-10
- Border-radius: rounded-xl

Verify Badge (overlay):
- Position: absolute top-3 left-3
- Background: bg-black/70 backdrop-blur-sm
- Padding: px-3 py-1
- Border-radius: rounded-full
- Font: text-[10px] font-semibold
- Color: text-[#D4AF37]
- Z-index: z-10
- Content: "✓ Verified" or "🏆 Featured"
```

### Content Section
```
Padding: p-5
Flex: flex flex-col space-y-3.5
```

#### 1. Institution Type
```
Font: text-[10px] font-semibold uppercase tracking-widest
Color: text-gray-500
Content: "PRIVATE SCHOOL" | "UNIVERSITY" | "FINE DINING" | etc.
Line clamp: None (single line)
```

#### 2. Name
```
Font: text-lg font-serif font-bold
Color: text-white, group-hover:text-[#D4AF37]
Line clamp: line-clamp-2
Transition: transition-colors
```

#### 3. Location
```
Flex: flex items-center gap-2
Icon: MapPin or 📍 (if emoji)
  - Icon size: w-3.5 h-3.5
  - Icon color: text-[#D4AF37]/60
  - Icon flex-shrink: flex-shrink-0
Text:
  - Font: text-xs
  - Color: text-gray-400
```

#### 4. Rating
```
Layout: pt-2 border-t border-[#D4AF37]/10
Flex: flex items-center gap-2

Stars:
  - Flex: flex items-center gap-1
  - Star size: w-3.5 h-3.5
  - Filled (rating < 5): fill-[#D4AF37] text-[#D4AF37]
  - Empty (rating ≥ 5): text-gray-600

Score:
  - Font: text-xs text-gray-400 font-medium
  - Format: "4.8"

Count:
  - Font: text-[10px] text-gray-600
  - Format: "(58)" or "(124 reviews)"
```

#### 5. Highlights (3 Chips)
```
Layout: pt-2, flex flex-wrap gap-2
Max items: 3 (never more)

Each chip:
  - Display: inline-block
  - Padding: px-3 py-1.5
  - Background: bg-[#D4AF37]/10, hover:bg-[#D4AF37]/20
  - Border: border border-[#D4AF37]/30, hover:border-[#D4AF37]/50
  - Border-radius: rounded-full
  - Font: text-[10px] font-medium
  - Color: text-[#D4AF37]
  - Transition: transition-all
  - Example text: "IEB" | "Boarding" | "Grade R–12"
```

#### 6. Tagline
```
Layout: pt-1
Font: text-xs text-gray-400 italic
Line clamp: line-clamp-1
Format: "Believe. Belong. Become."
Conditional: Only render if tagline exists
```

#### 7. Premium Stat
```
Layout: px-3 py-2, bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg
Font: text-xs font-semibold
Color: text-[#D4AF37]
Text-align: text-center
Example: "100% Pass Rate" | "34+ Years Excellence" | "R8.5M"
Conditional: Only render if premiumStat exists
```

#### 8. CTA Button
```
Layout: mt-3, px-4 py-2.5
Background: bg-[#D4AF37]/10
Border: border border-[#D4AF37]/30
Hover: hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/60
Border-radius: rounded-lg
Font: text-xs font-medium
Color: text-[#D4AF37]
Flex: flex items-center justify-center gap-1.5
Transition: transition-all

Content:
  - Text: "View Profile"
  - Icon: ChevronRight w-3 h-3
  - Icon hover: group-hover/btn:translate-x-0.5 transition-transform

On click:
  - Stop propagation: e.stopPropagation()
  - Call: onViewProfile(id)
```

---

## Spacing & Sizing Reference

### Outer Container
```
Border radius: rounded-3xl
Card gap (grid): gap-8
Padding on page: px-4 py-12
Max width: max-w-7xl
```

### Typography Hierarchy
```
Institution Type:    text-[10px]   (smallest, uppercase)
Location:            text-xs        (12px, icon + text)
Rating:              text-xs        (12px)
Tagline:             text-xs        (12px, italic)
Stat:                text-xs        (12px, gold)
Name:                text-lg        (18px, largest)
```

### Colors
```
Gold accent:         #D4AF37
Black background:    black
White text:          white
Gray hierarchy:      gray-900, gray-600, gray-500, gray-400
Borders:             [#D4AF37]/20, [#D4AF37]/30, [#D4AF37]/60
Hover borders:       [#D4AF37]/60
Shadows:             shadow-2xl shadow-[#D4AF37]/15
```

### Responsive Grid
```
Mobile (default):    grid-cols-1
Tablet (sm:):        grid-cols-2
Desktop (lg:):       grid-cols-4
Gap:                 gap-8
```

---

## Component Behavior

### On Hover
```
Image:           scale-110 (duration-700)
Card border:     [#D4AF37]/20 → [#D4AF37]/60
Card shadow:     shadow-2xl shadow-[#D4AF37]/15
Name color:      white → [#D4AF37]
Chips:           bg/border darken
Button:          bg/border darken
```

### On Favorite Click
```
Stop:            e.stopPropagation()
Icon fill:       toggle empty ↔ filled
Icon color:      white ↔ [#D4AF37]
Call:            onToggleFavorite(id)
```

### On View Profile Click
```
Stop:            e.stopPropagation()
Call:            onViewProfile(id)
Navigate:        navigate('institution-profile', undefined, id)
```

---

## Accessibility & Copy

### Content Rules
```
Name:            max 2 lines (line-clamp-2)
Type:            exact match from enum (no abbreviations)
Location:        one simple location name
Tagline:         max 60 characters, memorable phrase
Stat:            max 30 characters, bold number + label
Highlights:      exactly 3, max 15 characters each
```

### Badge Rules
```
isVerified:      show "✓ Verified"
isFeatured:      show "🏆 Featured"
Both:            prioritize Featured
Neither:         no badge shown
```

### Fallbacks
```
Image missing:   'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?...'
Rating:          show "No ratings yet" if 0
Tagline:         render nothing if not provided
Stat:            render nothing if not provided
Highlights:      render nothing if empty array
```

---

## Before vs. After Comparison

### BEFORE (Too Empty)
```
❌ Image only
❌ Name only
❌ Location only
❌ Rating only
❌ Generic "View Details" button
❌ No trust drivers
❌ No confidence elements
❌ Parents scroll past
```

### AFTER (Confident Decision)
```
✅ Large campus image (hero)
✅ ✓ Verified badge (trust)
✅ "PRIVATE SCHOOL" type (clarity)
✅ Penryn College (memorable)
✅ 📍 Mbombela (location)
✅ ⭐⭐⭐⭐⭐ 4.8 (trust metric)
✅ [ IEB ] [ Boarding ] [ Grade R–12 ] (highlights)
✅ "Believe. Belong. Become." (emotion)
✅ 100% Pass Rate (conversation starter)
✅ View Profile → (clear CTA)
```

---

## Edge Cases & Handling

### Card with no rating
```
Show: "No ratings yet"
Rating count: Show 0 or "(first review)"
```

### Card with <3 highlights
```
Show: Whatever exists
Don't pad or show empty chips
```

### Very long name
```
Use: line-clamp-2
Truncate: ... (automatic via Tailwind)
```

### Missing image
```
Use: Fallback image (Unsplash generic)
Maintain: h-80 height
Show: gray-900 background if image fails
```

### Very long tagline (>60 chars)
```
Use: line-clamp-1 (cut at ellipsis)
Don't overflow: truncate automatically
```

---

## Code Example: EducationCard Implementation

```typescript
import { Heart, Star, MapPin, ChevronRight } from 'lucide-react';

interface EducationCardProps {
  institution: Business;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onViewProfile: (id: string) => void;
}

export const EducationCard: React.FC<EducationCardProps> = ({
  institution,
  isFavorited,
  onToggleFavorite,
  onViewProfile,
}) => {
  const highlights = institution.highlights || 
                     institution.tags?.slice(0, 3) || [];

  return (
    <div className="group rounded-3xl border border-[#D4AF37]/20 
                    hover:border-[#D4AF37]/60 bg-black overflow-hidden
                    transition-all duration-300 hover:shadow-2xl 
                    hover:shadow-[#D4AF37]/15">
      
      {/* Image */}
      <div className="relative h-80 bg-gray-900 overflow-hidden">
        <img 
          src={institution.image} 
          alt={institution.name}
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Favorite Button */}
        <button onClick={() => onToggleFavorite(institution.id)}
                className="absolute top-3 right-3 p-2 bg-black/50 
                           hover:bg-black/70 backdrop-blur-sm z-10 rounded-xl">
          <Heart className={isFavorited ? 'fill-[#D4AF37]' : ''} />
        </button>
        
        {/* Badge */}
        {institution.isVerified && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 
                          backdrop-blur-sm rounded-full text-[10px] 
                          font-semibold text-[#D4AF37]">
            ✓ Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col space-y-3.5">
        {/* Type */}
        <p className="text-[10px] font-semibold uppercase 
                      tracking-widest text-gray-500">
          {getInstitutionType(institution)}
        </p>

        {/* Name */}
        <h3 className="text-lg font-serif font-bold text-white 
                       group-hover:text-[#D4AF37] transition-colors line-clamp-2">
          {institution.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]/60" />
          {institution.location}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 pt-2 
                        border-t border-[#D4AF37]/10">
          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} 
                    className={i < Math.floor(institution.rating)
                      ? 'fill-[#D4AF37] text-[#D4AF37]'
                      : 'text-gray-600'}
                    size={14}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            {institution.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-gray-600">
            ({institution.reviewCount})
          </span>
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-2">
            {highlights.slice(0, 3).map((h, i) => (
              <span key={i}
                    className="px-3 py-1.5 bg-[#D4AF37]/10 
                               border border-[#D4AF37]/30 rounded-full
                               text-[10px] font-medium text-[#D4AF37]
                               group-hover:bg-[#D4AF37]/20">
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Tagline */}
        {institution.tagline && (
          <p className="text-xs text-gray-400 italic line-clamp-1">
            "{institution.tagline}"
          </p>
        )}

        {/* Stat */}
        {institution.premiumStat && (
          <div className="px-3 py-2 bg-[#D4AF37]/5 border 
                          border-[#D4AF37]/20 rounded-lg">
            <p className="text-xs font-semibold text-[#D4AF37] text-center">
              {institution.premiumStat}
            </p>
          </div>
        )}

        {/* CTA */}
        <button onClick={() => onViewProfile(institution.id)}
                className="mt-3 px-4 py-2.5 bg-[#D4AF37]/10 
                           border border-[#D4AF37]/30
                           hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/60
                           rounded-lg text-xs font-medium text-[#D4AF37]
                           flex items-center justify-center gap-1.5
                           transition-all group/btn">
          View Profile
          <ChevronRight size={12} 
                        className="group-hover/btn:translate-x-0.5 
                                   transition-transform"
          />
        </button>
      </div>
    </div>
  );
};
```

---

## Testing Checklist

Before shipping a new card component:

- [ ] Hero image is 320px tall (h-80)
- [ ] Favorite button toggles and calls onToggleFavorite
- [ ] Badge shows only when verified or featured
- [ ] Name renders on max 2 lines (line-clamp-2)
- [ ] Stars visual renders correctly (1–5 filled)
- [ ] Exactly 3 chips max (honors highlights array)
- [ ] Tagline renders italic and single-line
- [ ] Stat displays in gold box
- [ ] CTA button has hover effect and icon animation
- [ ] Image scales 110% on hover (duration-700)
- [ ] Border transitions from /20 to /60 opacity on hover
- [ ] Shadow effect applies on hover
- [ ] Mobile responsive (1 col, rounds properly)
- [ ] Tablet responsive (2 cols)
- [ ] Desktop responsive (4 cols)
- [ ] All text is readable (sufficient contrast)
- [ ] No text overflows (line-clamps in place)
- [ ] Fallback image displays if missing
- [ ] All interactive elements have hover states

---

## File Structure

```
components/
├── EducationCard.tsx          ← Premium card component
├── EducationDirectory.tsx     ← Directory/grid view
├── PropertyCard.tsx           ← (Next phase)
├── DiningCard.tsx             ← (Next phase)
├── HotelCard.tsx              ← (Next phase)
└── ...

data/
├── seeds.ts                   ← Has tagline, premiumStat, highlights
└── ...

types.ts
└── Business interface         ← Has tagline?, premiumStat?, highlights?
```

---

**This is the definitive spec for all premium cards at LowveldHub.**  
Apply to every category.  
Keep it consistent.  
Trust the process. ✓
