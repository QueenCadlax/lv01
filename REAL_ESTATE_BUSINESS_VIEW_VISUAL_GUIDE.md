# Real Estate Business View - Visual Flow Guide

## User Journey Map

### **BEFORE: Property Click → Generic Business View**
```
PropertyPremium                BusinessDetailViewApple
┌──────────────────┐          ┌──────────────────────────┐
│ Property Cards   │    →     │ Generic Business Layout  │
│ (Browse Grid)    │          │ - Basic info sections     │
│                  │          │ - Standard styling        │
│ [Click Card] ----+-------→  │ - Mixed with other biz    │
└──────────────────┘          │ - No real estate features │
                               └──────────────────────────┘
                                      (GENERIC)
```

### **AFTER: Property Click → Specialized Real Estate View**
```
PropertyPremium                RealEstatePropertyDetailView
┌──────────────────┐          ┌──────────────────────────────┐
│ Property Cards   │    →     │ LUXURY PORTAL LAYOUT         │
│ (Browse Grid)    │          │                              │
│                  │          │ [Gallery Section]            │
│ [Click Card] ----+-------→  │ • Main image (500px)         │
│                  │          │ • Navigation arrows          │
│                  │          │ • Thumbnails below           │
│                  │          │                              │
│                  │          │ [Details Section]            │
│                  │          │ • Property info grid         │
│                  │          │ • Amenities checklist        │
│                  │          │ • Similar properties         │
│                  │          │ • Google Maps                │
│                  │          │                              │
│                  │          │ [STICKY SIDEBAR]             │
│                  │          │ • Price (gold)               │
│                  │          │ • Agent info                 │
│                  │          │ • Contact buttons            │
└──────────────────┘          │ • Rating & badges            │
                               └──────────────────────────────┘
                                  (LUXURY PORTAL)
```

---

## Component Architecture

### **Current Routing Decision Tree**

```
App.tsx Routing Handler
        ↓
case 'business-detail' triggered
        ↓
Find business: localBusinesses.find(b => b.id === selectedBusinessId)
        ↓
Business found? YES → Continue
Business found? NO  → NotFoundView
        ↓
Category Check:
    ↓
    biz.category === Category.RealEstateAndProperty?
    ↓
    YES ─────────→ RealEstatePropertyDetailView
    │              ├─ Gallery with navigation
    │              ├─ Property details grid
    │              ├─ Amenities section
    │              ├─ Similar properties
    │              ├─ Google Maps
    │              └─ Sticky contact sidebar
    │
    NO ──────────→ BusinessDetailViewApple
                   ├─ Used for all other businesses
                   ├─ Generic business layout
                   ├─ Applicable to 90+ categories
                   └─ Standard styling
```

---

## Component Interaction Diagram

```
                            ┌─────────────────┐
                            │   App.tsx       │
                            │  (Main Router)  │
                            └────────┬────────┘
                                     │
                    Case: 'business-detail' triggered
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                    ↓                                 ↓
            Get Business by ID               [NOT FOUND]
            (localBusinesses)                    │
                    │                            ↓
                    ├─ Found? YES               NotFoundView
                    │ Found? NO → NotFoundView
                    │
         Category === RealEstateAndProperty?
                    │
        ┌───────────┴───────────┐
        │ YES                  NO│
        ↓                        ↓
┌─────────────────────┐  ┌──────────────────┐
│ RealEstateProperty  │  │ BusinessDetail   │
│    DetailView       │  │ ViewApple        │
├─────────────────────┤  ├──────────────────┤
│ Gallery Section     │  │ Generic Layout   │
│ • Image display     │  │ • Info sections  │
│ • Navigation arrows │  │ • Standard UI    │
│ • Thumbnails       │  │ • Mixed styling  │
├─────────────────────┤  └──────────────────┘
│ Details Section     │
│ • Property grid    │
│ • Amenities       │
│ • Similar props   │
│ • Google Maps     │
├─────────────────────┤
│ Sticky Sidebar      │
│ • Price            │
│ • Agent info       │
│ • Contact buttons  │
│ • Rating & badges  │
└─────────────────────┘
```

---

## User Interface Layout

### **RealEstatePropertyDetailView - Visual Structure**

```
╔════════════════════════════════════════════════════════════════╗
║                    [Back] Back to Properties                   ║
╚════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════╗
║                                                                  ║
║  ┌────────────────────────┐  ┌───────────────────────────────┐ ║
║  │                        │  │  STICKY SIDEBAR               │ ║
║  │   GALLERY SECTION      │  ├───────────────────────────────┤ ║
║  │   (2/3 width)          │  │                               │ ║
║  │                        │  │  R 8,500,000                  │ ║
║  │  ┌─────────────────┐   │  │  $450,000 USD                 │ ║
║  │  │                 │   │  │                               │ ║
║  │  │  [MAIN IMAGE]   │   │  ├───────────────────────────────┤ ║
║  │  │   500px height  │◄━─┼─ │ Shandon Arch...              │ ║
║  │  │                 │   │  │ 📍 Mbombela                  │ ║
║  │  │                 │   │  │                               │ ║
║  │  │ ◀ [1 / 3] ▶     │   │  ├───────────────────────────────┤ ║
║  │  │      ❤          │   │  │ ⭐⭐⭐⭐⭐ (48 reviews)       │ ║
║  │  └─────────────────┘   │  │                               │ ║
║  │                        │  │ James Whitmore               │ ║
║  │  [Thumb] [Thumb] [...]│  │ Deo Volente Properties       │ ║
║  │                        │  │ ✓ Verified                   │ ║
║  ├────────────────────────┤  ├───────────────────────────────┤ ║
║  │                        │  │ [Schedule Consultation]  ▶    │ ║
║  │  ABOUT THIS PROPERTY   │  │ [📞 Call Agent]              │ ║
║  │  ┌──────┬──────┐       │  │ [💬 WhatsApp]                │ ║
║  │  │ Beds │ Baths│       │  │ [📤 Share Profile]           │ ║
║  │  │  5   │  4   │       │  │                               │ ║
║  │  └──────┴──────┘       │  │ LOWVELDHUB CURATED ✓         │ ║
║  │  ┌──────┬──────┐       │  └───────────────────────────────┘ ║
║  │  │ Type │Status│       │                                    ║
║  │  │Res.  │Sale  │       │                                    ║
║  │  └──────┴──────┘       │                                    ║
║  │                        │                                    ║
║  ├────────────────────────┤                                    ║
║  │ WHAT'S OFFERED         │                                    ║
║  │ ✓ Modern Kitchen       │                                    ║
║  │ ✓ Swimming Pool        │                                    ║
║  │ ✓ Garage               │                                    ║
║  │ ✓ Garden               │                                    ║
║  │ ✓ Security System      │                                    ║
║  │ ✓ Air Conditioning     │                                    ║
║  │ ✓ Entertainment Area   │                                    ║
║  │ ✓ Guest Suite          │                                    ║
║  │ ✓ Premium Fixtures     │                                    ║
║  │                        │                                    ║
║  ├────────────────────────┤                                    ║
║  │ SIMILAR PROPERTIES     │                                    ║
║  │                        │                                    ║
║  │  [Property 1]  [Property 2]                                 ║
║  │  [Property 3]  [Property 4]                                 ║
║  │                        │                                    ║
║  └────────────────────────┘                                    ║
║                                                                  ║
║  ┌────────────────────────────────────────────────────────────┐ ║
║  │ GOOGLE MAPS - LOCATION                                     │ ║
║  │ (Full width, 400px height)                                 │ ║
║  └────────────────────────────────────────────────────────────┘ ║
║                                                                  ║
╚════════════════════════════════════════════════════════════════╝
```

---

## State Flow Diagram

### **Component State Management**

```
PropertyDetailViewProps (from App.tsx)
├─ propertyId: string
├─ navigate: function
├─ businesses: Business[]
├─ favorites: Set<string>
└─ toggleFavorite: function
            ↓
    ┌───────┴──────────┐
    │                  │
    ↓                  ↓
[slideIdx]         [isFavorited]
(0)                (false/true)
    │                  │
    └────────┬─────────┘
             ↓
    Computed Values
    ├─ gallery: [image, image, image]
    ├─ similarProperties: Business[]
    └─ handleFavoriteToggle: () => void
             ↓
    Event Handlers
    ├─ onClick (navigation)
    ├─ onFavoriteClick
    ├─ onImageNavigation
    └─ onWhatsAppClick
             ↓
        Renders UI
    ├─ Gallery section
    ├─ Details section
    ├─ Sticky sidebar
    └─ Map section
```

---

## Data Flow: Property Click to Detail View

### **Complete Navigation Sequence**

```
STEP 1: User Interface
┌─────────────────────┐
│ PropertyPremium.tsx │
│                     │
│ [Property Card]     │
│ • Title             │
│ • Location          │
│ • Price             │
│ • Beds/Baths        │
│ [Click]             │ ← User Action
└─────────────────────┘
        │
        └─ onClick={() => navigate('business-detail', undefined, item.id)}
           │
           ↓
STEP 2: Navigation Handler
┌─────────────────────┐
│ App.tsx             │
│ handleNavigate()    │
│                     │
│ • setCurrentView    │
│  ('business-detail')│
│ • setSelectedBizId  │
│  (item.id)          │
│ • Scroll to top     │
└─────────────────────┘
        │
        └─ Triggers: case 'business-detail'
           │
           ↓
STEP 3: Business Detection
┌──────────────────────┐
│ Router Logic         │
│                      │
│ Find biz by ID       │
│ Check category:      │
│ RealEstate? YES      │
│                      │
│ Route Decision:      │
│ → Use Specialized    │
│   View              │
└──────────────────────┘
        │
        └─ Render <RealEstatePropertyDetailView {...} />
           │
           ↓
STEP 4: Component Initialization
┌──────────────────────────┐
│ RealEstatePropertyDetail │
│ View.tsx                 │
│                          │
│ • useEffect (scroll)     │
│ • useEffect (favorite)   │
│ • Find property data     │
│ • Compute similar        │
│ • Set gallery images     │
└──────────────────────────┘
        │
        └─ State updates: slideIdx, isFavorited
           │
           ↓
STEP 5: Render UI
┌─────────────────────────┐
│ User sees:              │
│                         │
│ • Back button           │
│ • Gallery section       │
│ • Details section       │
│ • Amenities             │
│ • Similar properties    │
│ • Google Maps           │
│ • Sticky sidebar        │
│                         │
│ ✅ Ready for interaction│
└─────────────────────────┘
```

---

## Responsive Design Breakpoints

### **Mobile (< 640px)**
```
┌─────────────────────────┐
│ [Back] ...              │
├─────────────────────────┤
│                         │
│   [Gallery - Full]      │
│   [Image Nav]           │
│   [Thumbnails]          │
│                         │
├─────────────────────────┤
│ Property Details        │
│                         │
│ Details Grid (1-col)    │
│ ─────────────────       │
│ Amenities (1-col)       │
│                         │
├─────────────────────────┤
│ SIDEBAR (Below)         │
│ [Price]                 │
│ [Agent Info]            │
│ [Buttons]               │
│                         │
├─────────────────────────┤
│ Similar (1 col)         │
│ [Prop 1]                │
│ [Prop 2]                │
│                         │
├─────────────────────────┤
│ Google Maps             │
│ (Full width)            │
└─────────────────────────┘
```

### **Tablet (640-1024px)**
```
┌─────────────────────────────────┐
│ [Back] ...                      │
├─────────────────────────────────┤
│                                 │
│ [Gallery]       [SIDEBAR]       │
│ [Image Nav]     [Price]         │
│ [Thumbnails]    [Agent]         │
│                 [Buttons]       │
│                                 │
├─────────────────────────────────┤
│ Details Grid (2-col)            │
│ Amenities (3-col)               │
│                                 │
├─────────────────────────────────┤
│ Similar Properties (2-col)      │
│ [Prop 1] [Prop 2]               │
│ [Prop 3] [Prop 4]               │
│                                 │
├─────────────────────────────────┤
│ Google Maps (Full width)        │
└─────────────────────────────────┘
```

### **Desktop (> 1024px)**
```
┌─────────────────────────────────────────────────────────────┐
│ [Back] ...                                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Gallery - 2/3]          [STICKY SIDEBAR - 1/3]            │
│ [Image Nav]              [Price - Large]                   │
│ [Thumbnails]             [Agent Avatar + Info]             │
│                          [Rating]                          │
│                          [Contact Buttons]                 │
│                          [Badges]                          │
│                          (Stays at top on scroll)          │
│                                                             │
│ Details Grid (4-col)                                        │
│ Amenities (3-col)                                           │
│                                                             │
│ Similar Properties (2-col)                                  │
│ [Prop 1] [Prop 2]                                           │
│ [Prop 3] [Prop 4]                                           │
│                                                             │
│ Google Maps (Full width)                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Color & Typography Reference

### **Visual Hierarchy**

```
Property Title (Primary)
├─ Georgia Serif Font
├─ 15px size
├─ 600 weight
├─ 2-line clamp
└─ White (#FFFFFF)
    │
    ↓
Location (Secondary)
├─ 11px size
├─ 500 weight
└─ Gray (#A0A0A0)
    │
    ↓
Price (Emphasis)
├─ 17px size
├─ 700 weight
├─ Gold (#C9A24D) ★ LARGEST
└─ Primary visual focus
    │
    ↓
Features (Tertiary)
├─ 11px size
├─ 500 weight
└─ Light Gray (#D0D0D0)
```

---

## Navigation Paths Summary

### **All Ways to Reach This View**

```
START POINT → ACTION → ROUTE → VIEW
┌─────────────────────────────────────┐
│ 1. PropertyPremium Browse           │
│    └─ Click Property Card           │
│       └─ navigate('business-detail')│
│          └─ RealEstate Detected     │
│             └─ This View ✓          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 2. Similar Properties Section       │
│    └─ Click Similar Property        │
│       └─ navigate('property-detail')│
│          └─ Same View (new prop)    │
│             └─ This View ✓          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 3. Back Button                      │
│    └─ From Detail → Browse          │
│       └─ navigate('property')       │
│          └─ PropertyPremium         │
│             └─ Browse Again         │
└─────────────────────────────────────┘
```

---

**Visual Guide Complete** ✅
Last Updated: June 1, 2026
