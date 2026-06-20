import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// SERVICES
export const buildersContractors: Business[] = [];

// PLUMBING & ELECTRICAL
export const plumbingElectrical: Business[] = [];

// ROOFING & RENOVATIONS
export const roofingRenovations: Business[] = [];

// INTERIOR DESIGNERS & HOME DECOR
export const interiorDesigners: Business[] = [];

// LANDSCAPING & GARDENING
export const landscapingGardening: Business[] = [
  {
    id: 'lg_001',
    name: 'Elite Landscape & Garden Design',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'Landscaping & Gardening',
    tier: ListingTier.Platinum,
    location: 'White River',
    rating: 4.9,
    reviewCount: 389,
    description: 'Premium landscaping company offering garden design, hardscaping, irrigation systems, lawn care, plant selection, and outdoor living transformations.',
    image: 'https://images.unsplash.com/photo-1585685580899-5f8b1bfc0c0d?w=500&h=400&fit=crop',
    phone: '+27 13 750 2400',
    email: 'landscape@elitegarden.co.za',
    website: 'www.elitegarden.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Garden Design', 'Hardscaping', 'Irrigation', 'Lawn Care', 'Outdoor Living'],
  },
  {
    id: 'lg_002',
    name: 'Lowveld Green Spaces Landscaping',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'Landscaping & Gardening',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.8,
    reviewCount: 267,
    description: 'Professional landscaping and gardening services offering garden design, maintenance, plant care, soil preparation, and beautiful outdoor environments.',
    image: 'https://images.unsplash.com/photo-1599599810694-f3e3c9aeefc2?w=500&h=400&fit=crop',
    phone: '+27 13 744 3300',
    email: 'gardens@lowveldgreen.co.za',
    website: 'www.lowveldgreen.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Garden Design', 'Maintenance', 'Plant Care', 'Professional', 'Beautiful Spaces'],
  },
];

// SMART HOME INSTALLATION
export const smartHomeInstallation: Business[] = [
  {
    id: 'sh_001',
    name: 'Mpumalanga Smart Home Technologies',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'Smart Home Installation',
    tier: ListingTier.Platinum,
    location: 'White River',
    rating: 4.9,
    reviewCount: 321,
    description: 'Leading smart home integration company offering automation systems, security installation, energy monitoring, smart controls, and professional installation.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    phone: '+27 13 751 9000',
    email: 'smart@mpumsmarthome.co.za',
    website: 'www.mpumsmarthome.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Automation', 'Security Systems', 'Energy Monitoring', 'Smart Controls', 'Tech Integration'],
  },
  {
    id: 'sh_002',
    name: 'Lowveld Home Automation Solutions',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'Smart Home Installation',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.7,
    reviewCount: 198,
    description: 'Smart home automation specialists offering system design, installation, programming, security integration, and ongoing technical support.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    phone: '+27 13 737 7700',
    email: 'automation@lowveldsmart.co.za',
    website: 'www.lowveldsmart.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Automation', 'System Design', 'Security', 'Programming', 'Tech Support'],
  },
];

// CUSTOM FURNITURE MAKERS
export const customFurnitureMakers: Business[] = [
  {
    id: 'cf_001',
    name: 'Artisan Furniture Creations Mpumalanga',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'Custom Furniture Makers',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 298,
    description: 'Bespoke furniture maker crafting custom pieces, luxury furnishings, handcrafted designs, premium materials, and personalized interior solutions.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
    phone: '+27 13 742 4400',
    email: 'crafted@artisanfurniture.co.za',
    website: 'www.artisanfurniture.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Bespoke Design', 'Luxury', 'Handcrafted', 'Premium Materials', 'Personalized'],
  },
  {
    id: 'cf_002',
    name: 'Lowveld Custom Furniture Workshop',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'Custom Furniture Makers',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 234,
    description: 'Expert furniture makers offering custom designs, built-to-order pieces, quality craftsmanship, sustainable materials, and unique furnishing solutions.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop',
    phone: '+27 13 750 5500',
    email: 'custom@lowveldcustomfurniture.co.za',
    website: 'www.lowveldcustomfurniture.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Custom Design', 'Built-to-Order', 'Quality', 'Sustainable', 'Unique Pieces'],
  },
];

// POOL & GARDEN DESIGNERS
export const poolGardenDesigners: Business[] = [
  {
    id: 'pg_001',
    name: 'Luxury Pool & Garden Design Studio',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'Pool & Garden Designers',
    tier: ListingTier.Platinum,
    location: 'White River',
    rating: 4.9,
    reviewCount: 367,
    description: 'Premium pool and garden design specialists creating resort-style outdoor spaces, swimming pools, water features, landscaping, and complete outdoor living designs.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    phone: '+27 13 750 8800',
    email: 'design@luxurypoolgardens.co.za',
    website: 'www.luxurypoolgardens.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Resort-Style', 'Pool Design', 'Water Features', 'Landscaping', 'Outdoor Living'],
  },
  {
    id: 'pg_002',
    name: 'Lowveld Aquatic & Garden Solutions',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'Pool & Garden Designers',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.7,
    reviewCount: 212,
    description: 'Professional pool and garden design and construction offering pool installations, landscaping, maintenance, water management, and outdoor transformation.',
    image: 'https://images.unsplash.com/photo-1559839734335-3ec0a6b02328?w=500&h=400&fit=crop',
    phone: '+27 13 737 8800',
    email: 'aquatic@lowveldpoolgardens.co.za',
    website: 'www.lowveldpoolgardens.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Pool Installation', 'Garden Design', 'Maintenance', 'Water Management', 'Outdoor'],
  },
];
