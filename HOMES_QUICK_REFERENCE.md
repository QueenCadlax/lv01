# 🏠 HOMES Category - Quick Reference Guide

## 🚀 Quick Start

### How to Access HOMES Category

**From Homepage:**
1. Scroll to quick navigation cards
2. Click **"🏠 Homes"** card (new!)
3. Displays all featured luxury properties

**From Category Grid:**
1. Click any category icon
2. Scroll to find **"🏠 HOMES"** (next to Education)
3. Shows premium residential listings

**URL Routing:**
```
navigate('homes')        // Browse all homes
navigate('home-detail', undefined, 'h_lux_001')  // View specific home
```

---

## 📱 Browse View (HomePremium)

### Screen Sections

**1. Hero Header**
```
┌─────────────────────────────────┐
│  "Discover Your Dream Home"     │
│  [Search bar for properties]    │
│  [Quick filter buttons]         │
└─────────────────────────────────┘
```

**2. Left Sidebar (Filters)**
- Home Type (radio buttons)
- Location (dropdown)
- Premium Only (checkbox)
- Reset button

**3. Main Content**
- Featured Section: Top 4 homes (hero grid)
- All Homes: Grid of filtered results

### Filter Options

**Home Types:**
- All Types
- Luxury Homes & Villas
- Modern Apartments
- Townhouses & Complexes
- Home Decor & Design

**Locations:**
- All Mpumalanga areas (65+ options)

**Tiers:**
- All (Trial/Premium/Elite/Platinum)
- Premium Only (Elite + Platinum)

---

## 🏡 Detail View (HomeDetailView)

### Main Sections

**Left Side (2/3 width)**
```
Image Gallery
├─ Main large image
├─ Previous/Next buttons
├─ Slide indicators (dots)
└─ Thumbnail strip below

Property Information
├─ Name, location, rating
├─ Full description
├─ Key features card
└─ Amenities tags
```

**Right Side (1/3 width - Sticky)**
```
Contact Card
├─ Favorite button (❤)
├─ Call Now button (☎)
├─ WhatsApp button (💬)
├─ Email link
├─ Website link
└─ Share button
```

**Bottom**
```
Similar Homes Carousel
├─ Same location
├─ Up to 4 related properties
└─ Click to navigate
```

---

## 💎 Featured Luxury Homes

### Card Details Format

```
┌─────────────────────┐
│   [Hero Image]      │
│   [Tier Badge]      │
│   [Favorite ♥]      │
├─────────────────────┤
│ Property Name       │
│ 📍 Location         │
│ ⭐ Rating (count)    │
│ Price Range         │
├─────────────────────┤
│ Amenity Tags        │
└─────────────────────┘
```

### The 4 Platinum/Elite Homes

| # | Name | Tier | Rating | Location | Price |
|---|------|------|--------|----------|-------|
| 1 | Sapphire Estate Villas | ⭐ Platinum | 4.9 | Mbombela | R 3.5M+ |
| 2 | The Residence at White River | ⭐ Platinum | 4.8 | White River | R 4.2M+ |
| 3 | Emerald Valley Premium | ◆ Elite | 4.7 | Hazyview | R 2.8M+ |
| 4 | Platinum Heights | ⭐ Platinum | 4.9 | Mbombela | R 5.5M+ |

---

## 🎨 Visual Elements

### Tier Badges
```
Platinum:  [★ PLATINUM] - Purple background, white text
Elite:     [◆ ELITE]    - Gold background, black text
```

### Icons Used
```
🏠 Home Icon (category)
❤ Favorite toggle
☎ Call button
💬 WhatsApp
🌐 Website link
✉ Email contact
📍 Location pin
⭐ Rating stars
💰 Price/Dollar sign
🏘 Home type icon
```

### Colors
```
Gold:    #D4AF37 (accents, text)
Black:   #000000 (backgrounds)
White:   #FFFFFF (text)
Purple:  Platinum badge
Gold:    Elite badge
Green:   WhatsApp button
Red:     Favorited heart
```

---

## 🔍 Search & Filtering

### Search Bar
```
💡 Searches by:
- Property name
- Description text
- Amenities
- Location keywords
```

### Filter Combinations
```
Example 1: Show Platinum villas in Mbombela
├─ Home Type: Luxury Homes & Villas
├─ Location: Mbombela
└─ Premium Only: Checked

Example 2: Find apartments under R 2M
├─ Home Type: Modern Apartments
├─ Location: Any
└─ Premium Only: Unchecked

Example 3: Interior design services
├─ Home Type: Home Decor & Design
├─ Location: Any
└─ Premium Only: Any
```

---

## 📱 Mobile Experience

### Responsive Behavior
```
Phone (< 480px):
├─ 1 column grid
├─ Full-width cards
├─ Collapsible sidebar (button at top)
└─ Touch-optimized buttons

Tablet (480-768px):
├─ 1-2 column grid
├─ Visible sidebar
└─ Optimized spacing

Desktop (> 768px):
├─ 2-4 column grid
├─ Sticky sidebar
└─ Full featured layout
```

### Touch-Friendly Features
- Large tap targets (48px minimum)
- Swipe-able image carousel
- Collapsible menus
- Easy back navigation

---

## ⚡ Key Features

### ✅ Implemented
- [x] Search & filtering
- [x] Favorites system
- [x] Image gallery (carousel)
- [x] Contact methods (4 ways)
- [x] Similar properties
- [x] Tier badges
- [x] Responsive design
- [x] Mobile optimization

### 🔄 Data Displayed
- Property name & description
- Location (Mpumalanga area)
- Rating & review count
- Price range
- Amenities/features
- Contact information
- Images
- Subscription tier

---

## 🎯 Common Tasks

### Add to Favorites
```
1. Click ❤ heart icon (on card or detail view)
2. Heart fills with red
3. Property saved locally
```

### Call Property Owner
```
1. Click "☎ Call Now" button
2. Opens phone dialer
3. Pre-populated number
```

### Message via WhatsApp
```
1. Click "💬 WhatsApp" button
2. Pre-filled message about property
3. Opens WhatsApp app
```

### View Property Website
```
1. Click website link
2. Opens in new browser tab
3. View full property portal
```

### Share Property
```
1. Click "Share" button
2. Browser share menu
3. Copy link / share social
```

---

## 🛠 Navigation Shortcuts

### Quick Navigation
```
Go to Homes:        navigate('homes')
View Property:      navigate('home-detail', undefined, propertyId)
Back to Browse:     navigate('homes')
Home Page:          navigate('home')
```

### Filter Navigation
```
Stay in browse view, use:
- Type filter buttons
- Location dropdown
- Verified checkbox
- Search bar
```

---

## 📊 Property Statistics

**Total Properties**: 8
- Luxury Villas: 4
- Apartments: 1
- Townhouses: 1
- Design Studio: 1
- Decor Services: 1

**Rating Average**: 4.8 ⭐
**Price Range**: R 950k - R 5.5M+
**All Locations**: Mbombela, White River, Hazyview

---

## 💡 Tips & Tricks

### Speed Tips
1. Use quick filters before search
2. Set location first to narrow results
3. Use "Premium Only" for top properties

### Discovery Tips
1. Check featured section first (top 4)
2. Browse similar homes for alternatives
3. Use amenity tags to find specific features

### Comparison Tips
1. Add multiple to favorites
2. Open detail views side-by-side
3. Compare pricing and amenities

---

## ❓ FAQ

**Q: How do I save favorites?**
A: Click the ❤ heart icon. Saved locally in browser.

**Q: Can I contact the owner?**
A: Yes! 4 ways: Phone, WhatsApp, Email, Website

**Q: Are prices accurate?**
A: Prices shown are ranges. Contact owner for exact pricing.

**Q: How often is data updated?**
A: Data refreshes on page reload (seed data).

**Q: Can I schedule a viewing?**
A: Contact owner via WhatsApp or phone to arrange.

**Q: Is there a mobile app?**
A: Currently web-based (PWA compatible).

**Q: How do filters work together?**
A: AND logic - must match ALL selected filters.

---

## 🚀 Getting Started

1. **Click Homes card** on homepage
2. **Browse featured** luxury properties
3. **Use filters** to refine search
4. **Click a property** to view details
5. **Add to favorites** or **contact owner**

---

**Happy home hunting! 🏡✨**
