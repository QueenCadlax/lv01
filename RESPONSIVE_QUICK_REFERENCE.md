# 📱 Responsive Design - Quick Reference Card

## ⚡ Copy/Paste Responsive Patterns

### Pattern 1: Hero Section (Full Width)
```tsx
<section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
  <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 text-center py-12 sm:py-16 md:py-20">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white">Your Heading</h1>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg">Your subtext</p>
    </div>
  </div>
</section>
```

### Pattern 2: Content Section
```tsx
<section className="py-12 sm:py-16 md:py-20 bg-[#050505]">
  <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      {/* Content here */}
    </div>
  </div>
</section>
```

### Pattern 3: Responsive Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
  {items.map(item => (
    <div key={item.id} className="p-5 sm:p-6 rounded-lg sm:rounded-xl">
      {item.content}
    </div>
  ))}
</div>
```

### Pattern 4: Heading Hierarchy
```tsx
{/* Main heading */}
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Title</h1>

{/* Section heading */}
<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">Section</h2>

{/* Subsection */}
<h3 className="text-lg sm:text-xl md:text-2xl">Subsection</h3>

{/* Body text */}
<p className="text-xs sm:text-sm md:text-base lg:text-lg">Paragraph</p>
```

### Pattern 5: Button Sizing
```tsx
<button className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base">
  Click Me
</button>
```

---

## 📊 Breakpoint Reference

```
xs:  0px     (default - mobile)
sm:  640px   (small phone)
md:  768px   (tablet)
lg:  1024px  (large tablet)
xl:  1280px  (laptop)
2xl: 1536px  (desktop)
```

**Most common in LowveldHub:**
- `px-3` (mobile)
- `sm:px-4` (tablets 640px+)
- `md:px-6` (tablets 768px+)
- `lg:px-8` (desktop 1024px+)

---

## ✅ Quick Checks

### Before Committing Code
- [ ] Hero section text scales from text-2xl to text-6xl (not text-8xl)
- [ ] All containers use `w-full` (not fixed widths)
- [ ] Padding uses pattern: `px-3 sm:px-4 md:px-6 lg:px-8`
- [ ] Grids are mobile-first: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- [ ] No horizontal scrolling in responsive mode
- [ ] Text doesn't cut off at 1366px or 1440px

### Testing in DevTools
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test at: 375px, 768px, 1024px, 1366px, 1920px
4. Check:
   - [ ] Text readable
   - [ ] Images visible
   - [ ] Buttons clickable
   - [ ] No overflow-x

---

## 🎯 Common Mistakes to Avoid

❌ **DON'T do this:**
```tsx
// Fixed widths
<div className="w-[500px]">...</div>

// Excessive text sizes
<h1 className="text-8xl">...</h1>

// Fixed heights
<section className="h-[500px]">...</section>

// Mobile-only padding
<div className="px-4">...</div>

// Grid without responsive cols
<div className="grid grid-cols-4">...</div>
```

✅ **DO this instead:**
```tsx
// Responsive widths
<div className="w-full max-w-4xl">...</div>

// Scaled text
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl">...</h1>

// Responsive heights
<section className="min-h-[50vh] sm:min-h-[60vh]">...</section>

// Responsive padding
<div className="px-3 sm:px-4 md:px-6 lg:px-8">...</div>

// Mobile-first grids
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">...</div>
```

---

## 📐 Spacing Scale

**Horizontal Padding:**
```
Mobile (< 640px):   px-3   (12px)
Tablet (640-1024):  px-4   (16px)
                    md:px-6 (24px)
Desktop (1024px+):  lg:px-8 (32px)
```

**Vertical Padding:**
```
Small sections:     py-8 sm:py-10 md:py-12
Medium sections:    py-12 sm:py-16 md:py-20
Large sections:     py-16 sm:py-20 md:py-24
```

**Gap Between Items:**
```
Compact:    gap-3 sm:gap-4 md:gap-5
Normal:     gap-4 sm:gap-5 md:gap-6
Spacious:   gap-6 sm:gap-8 md:gap-10
```

---

## 🎨 Text Sizing Scale

```
Tiny:       text-xs sm:text-sm
Small:      text-sm md:text-base
Normal:     text-base md:text-lg
Large:      text-lg md:text-xl
XL:         text-xl md:text-2xl
Section:    text-2xl md:text-3xl lg:text-4xl
Main Hero:  text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
```

---

## 📦 Component Template

```tsx
export const ResponsiveComponent = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-8">
            Component Title
          </h2>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {items.map(item => (
              <div key={item.id} className="p-5 sm:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};
```

---

## 🚀 One-Liner Fixes

**Fix hero overflow:**
```tsx
// Change from:
<h1 className="text-8xl">...</h1>
// To:
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">...</h1>
```

**Fix container overflow:**
```tsx
// Change from:
<div className="min-h-screen">
// To:
<div className="w-full min-h-screen overflow-x-hidden">
```

**Fix padding consistency:**
```tsx
// Change from:
<div className="px-4">
// To:
<div className="px-3 sm:px-4 md:px-6 lg:px-8">
```

**Fix mobile grids:**
```tsx
// Change from:
<div className="grid grid-cols-4">
// To:
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

---

## 📋 Commit Message Template

```
feat(responsive): improve hero section for all breakpoints

- Reduce text sizes: xl:text-8xl → xl:text-6xl
- Add responsive padding: px-3 sm:px-4 md:px-6 lg:px-8
- Fix layout issues on 1366px and 1440px screens
- Ensure no horizontal scrolling on any device

Tested on: 375px (mobile), 768px (tablet), 1366px (laptop), 1920px (desktop)
```

---

## 🔗 Resources

- **Tailwind Responsive:** https://tailwindcss.com/docs/responsive-design
- **MDN Mobile First:** https://developer.mozilla.org/en-US/docs/Mobile/Responsive_design
- **Chrome DevTools:** https://developer.chrome.com/docs/devtools/

---

## 📞 Quick Links

- **Audit Report:** `RESPONSIVE_AUDIT_COMPLETE.md`
- **Testing Guide:** `RESPONSIVE_TESTING_GUIDE.md`
- **Code Location:** `App.tsx` lines 4068-4095, 5068-5091

---

**Last Updated:** May 25, 2026  
**Status:** ✅ Production Ready
