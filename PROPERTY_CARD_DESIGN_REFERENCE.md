# Property Card Design Reference

## Unified Card Structure

All property cards across PropertyPremium, RealEstatePropertyDetailView, and RealEstateAgentDetailView follow this exact specification:

---

## Card Anatomy

```
┌─────────────────────────────────┐
│                                 │
│       IMAGE SECTION             │  65% Height
│       (Hover: Scale 1.05x)      │
│                                 │
├─────────────────────────────────┤
│ Shandon Architectural...        │  Title (Georgia, 15px, 600wt)
│                                 │  
│ Mbombela                        │  Location (11px, #A0A0A0)
│                                 │
│ R 8,500,000                     │  Price (17px, 700wt, #C9A24D)
│                                 │
│ 5 Beds • 4 Baths                │  Features (11px, #D0D0D0)
│                                 │
└─────────────────────────────────┘  35% Height

Total: Black background, Gold border
```

---

## Inline Styles - Complete Reference

### Container
```javascript
{
  background: '#000000',
  border: '1px solid rgba(201,162,77,0.25)',
  borderRadius: '12px',
  transition: 'all 320ms cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden'
}
```

### Image Section (65% height)
```javascript
{
  height: '65%',
  position: 'relative',
  overflow: 'hidden'
}
```

### Image Element
```javascript
{
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transformOrigin: 'center',
  transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
}
```

### Content Section (35% height)
```javascript
{
  padding: '16px 14px 14px 14px',
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '35%',
  fontSize: 14
}
```

### Title (Georgia serif)
```javascript
{
  margin: 0,
  fontSize: 15,
  fontWeight: 600,
  color: '#FFFFFF',
  lineHeight: '1.25',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  marginBottom: 6,
  fontFamily: "'Georgia', 'Garamond', serif",
  letterSpacing: '-0.3px'
}
```

### Location (Subtle gray)
```javascript
{
  fontSize: 11,
  color: '#A0A0A0',
  marginBottom: 6,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontWeight: 500
}
```

### Price (Bold gold)
```javascript
{
  fontSize: 17,
  fontWeight: 700,
  color: '#C9A24D',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  letterSpacing: '0.2px',
  marginBottom: 8
}
```

### Features (Beds • Baths)
```javascript
{
  fontSize: 11,
  color: '#D0D0D0',
  marginBottom: 8,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontWeight: 500,
  letterSpacing: '0.3px'
}
```

### Overlay Accent (Top gradient line)
```javascript
{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(201,162,77,0.5), transparent)',
  pointerEvents: 'none'
}
```

---

## Text Content Format

### Price
```javascript
R {(item.price || 8500000).toLocaleString()}
// Output: "R 8,500,000"
```

### Features
```javascript
{item.reviewCount || 5} Beds • {Math.ceil((item.rating || 4) * 1)} Baths
// Output: "5 Beds • 4 Baths"
```

### Location
```javascript
{item.location}
// Output: "Mbombela" (from Business.location)
```

### Title
```javascript
{item.name}
// Output: "Shandon Architectural Masterpiece"
```

---

## CSS Classes Applied

```javascript
className="group-hover:transform group-hover:scale-105"
// Image hover animation via Tailwind group-hover
```

---

## Components Using This Design

1. **PropertyPremium.tsx** (Browse/Filter Page)
   - Property grid cards (lines 320-430)
   - First implementation of this design

2. **RealEstatePropertyDetailView.tsx** (Property Detail)
   - Similar Properties section (lines 200-260)
   - Synchronized to PropertyPremium styling

3. **RealEstateAgentDetailView.tsx** (Agent Profile)
   - Featured Listings section (lines 180-235)
   - Synchronized to PropertyPremium styling

---

## Color Palette

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background | Black | #000000 | Card bg |
| Border | Gold (25% opacity) | rgba(201,162,77,0.25) | Card border |
| Price Text | Gold | #C9A24D | Price display |
| Title Text | White | #FFFFFF | Property title |
| Location Text | Gray | #A0A0A0 | Address/area |
| Features Text | Light Gray | #D0D0D0 | Beds/baths |
| Accent Line | Gold (50% opacity) | rgba(201,162,77,0.5) | Top gradient |

---

## Typography Specification

| Element | Font | Size | Weight | Color | Letter-Spacing |
|---------|------|------|--------|-------|-----------------|
| Title | Georgia Serif | 15px | 600 | #FFFFFF | -0.3px |
| Location | System Font | 11px | 500 | #A0A0A0 | 0px |
| Price | System Font | 17px | 700 | #C9A24D | 0.2px |
| Features | System Font | 11px | 500 | #D0D0D0 | 0.3px |

---

## Responsive Behavior

| Breakpoint | Grid | Card Height |
|-----------|------|------------|
| Mobile (<640px) | 1 column | 100% flexible |
| Tablet (640-1024px) | 2 columns | 100% flexible |
| Desktop (>1024px) | 3-4 columns | 100% flexible |

Height auto-calculates based on image aspect ratio:
- Image: 65% of container
- Content: 35% of container
- Aspect ratio: ~4:3 (landscape)

---

## Animation Specifications

### Hover Scale Effect
- **Property**: Image transform
- **From**: scale(1)
- **To**: scale(1.05)
- **Duration**: 500ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) (Material Design standard)

### Border/Shadow Transition
- **Duration**: 320ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Applied to**: Border, shadow, all properties

---

## Implementation Template

```jsx
<div 
  key={item.id}
  onClick={() => navigate('destination-view', undefined, item.id)}
  className="group cursor-pointer overflow-hidden flex flex-col h-full"
  style={{ 
    background: '#000000', 
    border: '1px solid rgba(201,162,77,0.25)', 
    borderRadius: '12px', 
    transition: 'all 320ms cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden'
  }}
>
  {/* IMAGE SECTION - 65% height */}
  <div style={{ height: '65%', position: 'relative', overflow: 'hidden' }}>
    <img 
      src={item.image} 
      alt={item.name}
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover', 
        transformOrigin: 'center', 
        transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' 
      }}
      className="group-hover:transform group-hover:scale-105"
    />
    {/* Subtle overlay accent */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,77,0.5), transparent)', pointerEvents: 'none' }} />
  </div>

  {/* CONTENT SECTION - 35% height */}
  <div style={{ padding: '16px 14px 14px 14px', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '35%', fontSize: 14 }}>
    <div style={{ minHeight: 0 }}>
      <h3 style={{ 
        margin: 0, 
        fontSize: 15, 
        fontWeight: 600, 
        color: '#FFFFFF', 
        lineHeight: '1.25', 
        display: '-webkit-box', 
        WebkitLineClamp: 2, 
        WebkitBoxOrient: 'vertical', 
        overflow: 'hidden', 
        marginBottom: 6, 
        fontFamily: "'Georgia', 'Garamond', serif", 
        letterSpacing: '-0.3px' 
      }}>
        {item.name}
      </h3>
      
      <div style={{ fontSize: 11, color: '#A0A0A0', marginBottom: 6, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500 }}>
        {item.location}
      </div>
      
      <div style={{ fontSize: 17, fontWeight: 700, color: '#C9A24D', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.2px', marginBottom: 8 }}>
        R {(item.price || 8500000).toLocaleString()}
      </div>

      <div style={{ fontSize: 11, color: '#D0D0D0', marginBottom: 8, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500, letterSpacing: '0.3px' }}>
        {item.reviewCount || 5} Beds • {Math.ceil((item.rating || 4) * 1)} Baths
      </div>
    </div>
  </div>
</div>
```

---

## Key Points for Future Implementation

✅ Always use 65/35 split (image/content)
✅ Title: Georgia serif only, 2-line clamp
✅ Price: Largest visual element (#C9A24D)
✅ Features: Always "X Beds • Y Baths" format
✅ Location: Subtle gray (#A0A0A0)
✅ Hover: 1.05x scale animation
✅ Border: Subtle gold with low opacity
✅ Spacing: 16px padding, consistent margins

---

**Last Updated**: June 1, 2026
**Status**: Active - Used in 3 components
**Version**: 1.0 - Unified Design Spec
