# 🍽️ DINING CARDS - QUICK REFERENCE GUIDE

**Date:** May 25, 2026  
**Purpose:** Quick copy/paste patterns for dining cards  
**Status:** ✅ READY TO USE  

---

## ⚡ QUICK COPY-PASTE TEMPLATES

### 1️⃣ GRID CONTAINER
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {/* Cards go here */}
</div>
```

### 2️⃣ CARD WRAPPER
```jsx
<div className="group rounded-2xl shadow-lg overflow-hidden h-full flex flex-col 
               bg-[#0a0a0a] border border-white/10 
               hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 
               transition-all duration-300 cursor-pointer"
     onClick={() => navigate('business-detail', undefined, 'b_card_id')}>
```

### 3️⃣ IMAGE CONTAINER
```jsx
<div className="relative w-full h-56 overflow-hidden bg-gray-900 flex-shrink-0">
  <img src="image-url" alt="name" 
       className="w-full h-56 object-cover rounded-t-2xl 
                  group-hover:scale-110 transition-transform duration-300" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-2xl"></div>
  
  {/* Tier Badge */}
  <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full">
    Elite
  </div>
</div>
```

### 4️⃣ CONTENT AREA
```jsx
<div className="p-5 space-y-3 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col flex-grow">
  
  {/* Header Section */}
  <div>
    <h3 className="text-white font-bold text-xl md:text-2xl mb-2 
                   group-hover:text-yellow-400 transition-colors line-clamp-2">
      Restaurant Name
    </h3>
    
    <div className="flex items-center gap-3 mb-2">
      <span className="text-base md:text-lg text-gray-300">📍 Location</span>
      <span className="text-base md:text-lg text-yellow-400 font-semibold">⭐ 4.8</span>
    </div>
  </div>
  
  {/* Description */}
  <p className="text-gray-400 text-base md:text-lg line-clamp-2 flex-grow">
    Brief description of the restaurant
  </p>
  
  {/* Button */}
  <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black 
                     text-base font-medium py-3 rounded-lg 
                     transition-all duration-300 font-bold">
    Explore
  </button>
</div>
```

---

## 📋 COMPLETE CARD EXAMPLE

```jsx
{/* Card Template */}
<div className="group rounded-2xl shadow-lg overflow-hidden h-full flex flex-col 
               bg-[#0a0a0a] border border-white/10 
               hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 
               transition-all duration-300 cursor-pointer"
     onClick={() => navigate('business-detail', undefined, 'b_restaurant_id')}>
  
  {/* IMAGE SECTION */}
  <div className="relative w-full h-56 overflow-hidden bg-gray-900 flex-shrink-0">
    <img src="https://images.unsplash.com/..." alt="Restaurant Name" 
         className="w-full h-56 object-cover rounded-t-2xl 
                    group-hover:scale-110 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-2xl"></div>
    
    {/* Tier Badge - ELITE */}
    <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full">
      Elite
    </div>
  </div>
  
  {/* CONTENT SECTION */}
  <div className="p-5 space-y-3 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col flex-grow">
    
    {/* Header */}
    <div>
      <h3 className="text-white font-bold text-xl md:text-2xl mb-2 
                     group-hover:text-yellow-400 transition-colors line-clamp-2">
        Restaurant Name
      </h3>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-base md:text-lg text-gray-300">📍 Hazyview</span>
        <span className="text-base md:text-lg text-yellow-400 font-semibold">⭐ 4.8</span>
      </div>
    </div>
    
    {/* Description */}
    <p className="text-gray-400 text-base md:text-lg line-clamp-2 flex-grow">
      Brief description of cuisine and dining experience
    </p>
    
    {/* Button */}
    <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black 
                       text-base font-medium py-3 rounded-lg 
                       transition-all duration-300 font-bold">
      Explore
    </button>
  </div>
</div>
```

---

## 🎨 PLATINUM CARD VARIANT

For Platinum tier cards, use this variant:

```jsx
{/* Tier Badge - PLATINUM */}
<div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
  ⭐ Platinum
</div>

{/* Card Wrapper - PLATINUM */}
<div className="group rounded-2xl shadow-lg overflow-hidden h-full flex flex-col 
               bg-[#0a0a0a] border border-purple-500/40 
               hover:border-purple-400/70 hover:shadow-2xl hover:shadow-purple-500/30 
               transition-all duration-300 cursor-pointer">

{/* Content Background - PLATINUM */}
<div className="p-5 space-y-3 bg-gradient-to-b from-[#1a0f2e] to-[#0a0a0a] flex flex-col flex-grow">

{/* Image Overlay - PLATINUM */}
<div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent rounded-t-2xl"></div>

{/* Text Colors - PLATINUM */}
<h3 className="text-white font-bold text-xl md:text-2xl mb-2 
               group-hover:text-purple-300 transition-colors line-clamp-2">
<span className="text-base md:text-lg text-purple-300 font-semibold">⭐ 5.0</span>

{/* Button - PLATINUM */}
<button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 
                   hover:from-purple-500 hover:to-purple-600 text-white 
                   text-base font-medium py-3 rounded-lg 
                   transition-all duration-300 font-bold">
  Explore
</button>
```

---

## 🔤 FONT SIZE REFERENCE

### Heading (Restaurant Name)
```jsx
text-xl md:text-2xl font-bold
// Mobile: 20px (20pt)
// Desktop: 24px (24pt)
```

### Info Line (Location / Rating)
```jsx
text-base md:text-lg font-semibold
// Mobile: 16px (16pt)
// Desktop: 18px (18pt)
```

### Description
```jsx
text-base md:text-lg
// Mobile: 16px (16pt)
// Desktop: 18px (18pt)
```

### Button Text
```jsx
text-base font-medium
// All sizes: 16px (16pt)
```

---

## 📏 SPACING REFERENCE

### Card Padding
```jsx
p-5
// All sides: 20px (1.25rem)
```

### Internal Spacing Between Elements
```jsx
space-y-3
// Between elements: 12px (0.75rem)
```

### Gap Between Cards
```jsx
gap-8
// Between cards: 32px (2rem)
```

### Button Padding
```jsx
py-3
// Top/Bottom: 12px (0.75rem)
// Full width button (w-full)
```

---

## 🖼️ IMAGE SIZING REFERENCE

### Container Size
```jsx
w-full h-56
// Width: 100% (full card width)
// Height: 224px (14rem) FIXED
```

### Object Fit
```jsx
object-cover
// Crops image to fill container
// Maintains aspect ratio
```

### Border Radius
```jsx
rounded-t-2xl
// Top left: 16px
// Top right: 16px
// Bottom: 0px (no radius)
```

---

## 🎯 RESPONSIVE GRID REFERENCE

### Grid Container
```jsx
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8
```

| Breakpoint | Columns | Gap | Use Case |
|-----------|---------|-----|----------|
| Mobile (320px) | 1 col | 32px | Single card per row |
| Tablet (768px) | 2 cols | 32px | 2 cards per row |
| Laptop (1024px) | 3 cols | 32px | 3 cards per row |
| Desktop (1920px) | 4 cols | 32px | 4 cards per row |

---

## 🎨 COLOR REFERENCE

### Elite Cards (Yellow)
```jsx
Border: border-white/10
Border Hover: border-yellow-400/50
Shadow Hover: shadow-yellow-400/20
Badge: bg-yellow-400 text-black
Text Hover: group-hover:text-yellow-400
Button: bg-yellow-400 hover:bg-yellow-300
```

### Platinum Cards (Purple)
```jsx
Border: border-purple-500/40
Border Hover: border-purple-400/70
Shadow Hover: shadow-purple-500/30
Badge: bg-gradient-to-r from-purple-500 to-purple-600
Text Hover: group-hover:text-purple-300
Button: bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500
```

---

## ✅ CHECKLIST FOR NEW CARDS

When adding a new dining card, ensure:

- [ ] Card wrapper has: `rounded-2xl shadow-lg overflow-hidden h-full flex flex-col`
- [ ] Card border: `border border-white/10` (or `border-purple-500/40` for Platinum)
- [ ] Image height: `h-56` (always fixed to 224px)
- [ ] Image object-fit: `object-cover`
- [ ] Image corners: `rounded-t-2xl` (top only)
- [ ] Restaurant name: `text-xl md:text-2xl font-bold`
- [ ] Location/Rating: `text-base md:text-lg`
- [ ] Description: `text-base md:text-lg`
- [ ] Button text: `text-base font-medium`
- [ ] Button padding: `py-3`
- [ ] Button width: `w-full`
- [ ] Content area: `p-5 space-y-3`
- [ ] Flex structure: `flex flex-col flex-grow` (for content area)
- [ ] Click handler: `onClick={() => navigate('business-detail', undefined, 'b_id')}`
- [ ] Tier badge: `px-3 py-1.5` (was `px-2.5 py-1`)

---

## 🚀 COMMON MODIFICATIONS

### Change Restaurant Name
```jsx
// Before
<h3 className="text-white font-bold text-xl md:text-2xl mb-2">Old Name</h3>

// After
<h3 className="text-white font-bold text-xl md:text-2xl mb-2">New Name</h3>
```

### Change Image
```jsx
// Before
<img src="old-url.jpg" alt="Old Name" className="..." />

// After
<img src="new-url.jpg" alt="New Name" className="..." />
```

### Change Location
```jsx
// Before
<span className="text-base md:text-lg text-gray-300">📍 Hazyview</span>

// After
<span className="text-base md:text-lg text-gray-300">📍 Mbombela</span>
```

### Change Rating
```jsx
// Before
<span className="text-base md:text-lg text-yellow-400 font-semibold">⭐ 4.8</span>

// After
<span className="text-base md:text-lg text-yellow-400 font-semibold">⭐ 4.9</span>
```

### Change Description
```jsx
// Before
<p className="text-gray-400 text-base md:text-lg line-clamp-2 flex-grow">
  Old description
</p>

// After
<p className="text-gray-400 text-base md:text-lg line-clamp-2 flex-grow">
  New description
</p>
```

### Change Card ID
```jsx
// Before
onClick={() => navigate('business-detail', undefined, 'b_old_id')}

// After
onClick={() => navigate('business-detail', undefined, 'b_new_id')}
```

---

## 🎓 DESIGN PRINCIPLES

1. **Consistency First**
   - All cards must have identical structure
   - All cards must have same height (h-full flex flex-col)
   - All cards must have same image height (h-56)

2. **Readability Second**
   - Use text-xl md:text-2xl for names (50-100% larger than before)
   - Use text-base md:text-lg for descriptions (100% larger)
   - Ensure sufficient padding (p-5, space-y-3)

3. **Luxury Third**
   - Use rounded-2xl for premium feel
   - Use shadow-2xl on hover for elevation
   - Use gradient overlays on images
   - Use proper spacing (gap-8 between cards)

4. **Responsiveness Always**
   - Mobile: 1 column, readable text
   - Tablet: 2 columns, balanced layout
   - Laptop: 3 columns, professional look
   - Desktop: 4 columns, full luxury feel

---

## 📞 SUPPORT REFERENCE

**File Location:** `c:\Users\CC CHITONGA\Desktop\LH-main\App.tsx`  
**Lines:** 2485-2584  
**Section:** Featured Highlights - Dining Cards  

**Documentation:**
- DINING_CARDS_REDESIGN_COMPLETE.md - Full details
- DINING_CARDS_VISUAL_COMPARISON.md - Before/after comparison
- DINING_CARDS_QUICK_REFERENCE.md - This guide

---

**Last Updated:** May 25, 2026  
**Status:** ✅ READY TO USE  
**Quality:** ⭐⭐⭐⭐⭐ EXCELLENT
