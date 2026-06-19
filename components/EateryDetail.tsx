import React, { useEffect, useMemo, useRef, useState } from 'react';
import { eateries } from '../data/eatsSeeds';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  Star,
  Calendar,
  Users,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Globe,
  MessageSquare,
  Flame,
  Utensils,
  UtensilsCrossed,
  Music,
  Users2,
  Leaf,
  ParkingCircle
} from 'lucide-react';
import { X } from 'lucide-react';
import { Eatery, Business } from '../types';

// Design tokens (luxury refined)
const BG_BLACK = '#000000';
// Use full black for panel backgrounds so sections render as true black
const PANEL_BLACK = BG_BLACK;
const TEXT_WHITE = '#FFFFFF';
const TEXT_MUTED = '#8B8B8B'; // Refined for WCAG AAA
const GOLD = '#C9A24D'; // Primary CTA only
const BORDER = '#1A1A1A'; // Darker, refined
const OPEN_GREEN = '#2ECC71';
const CLOSED_RED = '#E74C3C';

// Keyframe animations
const styles = `
  @keyframes menuSlideIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes galleryDotPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  .menu-slide-in {
    animation: menuSlideIn 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  .gallery-dot {
    transition: all 200ms ease;
  }
  
  .gallery-dot.active {
    animation: galleryDotPulse 600ms ease;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Category detection helpers
const getCategoryType = (category: string): string => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('shisa')) return 'shisanyama';
  if (cat.includes('caf') || cat.includes('coffee')) return 'cafe';
  if (cat.includes('bar') || cat.includes('cocktail')) return 'bar';
  if (cat.includes('bakery') || cat.includes('dessert')) return 'bakery';
  if (cat.includes('catering')) return 'catering';
  if (cat.includes('fine dining')) return 'fine-dining';
  if (cat.includes('casual')) return 'casual';
  return 'generic';
};

const EateryDetail: React.FC<{ eateryId: string | null; navigate: (view: string) => void; listings?: (Eatery | Business)[] }> = ({ eateryId, navigate, listings = [] }) => {
  // Try to find in eateries first, then in listings
  let eatery: any = eateries.find((e) => e.id === eateryId!);
  
  if (!eatery && listings.length > 0) {
    eatery = listings.find((e) => e.id === eateryId!);
  }
  
  if (!eatery) return <div style={{ paddingTop: 96 }} className="container mx-auto px-4">Eatery not found</div>;

  // Detect category type for conditional rendering
  // Check subcategory first (for Business type), then category (for Eatery type)
  const subCat = (eatery.subcategory || eatery.category || '').toString().toLowerCase();
  const categoryType = getCategoryType(subCat);
  const isShisanyama = categoryType === 'shisanyama';
  const isCafe = categoryType === 'cafe';
  const isBar = categoryType === 'bar';
  const isBakery = categoryType === 'bakery';
  const isCatering = categoryType === 'catering';
  const isFineDining = categoryType === 'fine-dining';
  const isCasual = categoryType === 'casual';
  // Editorial Platinum collection flag (seeded in eatsSeeds as premiumTier: 'Platinum Collection')
  const isPlatinum = typeof eatery.premiumTier === 'string' && eatery.premiumTier.toLowerCase().includes('platinum');

  // Mock business hours (in production, pull from eatery data)
  const businessHours = {
    Mon: { open: '11:00', close: '23:00' },
    Tue: { open: '11:00', close: '23:00' },
    Wed: { open: '11:00', close: '23:00' },
    Thu: { open: '11:00', close: '00:00' },
    Fri: { open: '11:00', close: '01:00' },
    Sat: { open: '09:00', close: '01:00' },
    Sun: { open: '09:00', close: '23:00' },
  };

  const isOpenNow = (() => {
    const now = new Date();
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
    const hours = businessHours[day as keyof typeof businessHours];
    if (!hours) return false;
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return currentTime >= hours.open && currentTime <= hours.close;
  })();

  // Amenities organized by category
  const amenitiesByCategory = {
    dining: [
      { icon: '🪑', label: 'Indoor Seating' },
      { icon: '🌳', label: 'Outdoor Seating' },
      { icon: '🏪', label: 'Bar Seating' },
      { icon: '👥', label: 'Group Tables' },
      { icon: '🎉', label: 'Private Booths' },
      { icon: '🪟', label: 'Scenic Views' },
    ],
    facilities: [
      { icon: '🛟', label: 'WiFi' },
      { icon: '🚗', label: 'Free Parking' },
      { icon: '♿', label: 'Wheelchair Access' },
      { icon: '🚻', label: 'Accessible Restrooms' },
      { icon: '❄️', label: 'Air Conditioning' },
      { icon: '🎵', label: 'Ambient Music' },
    ],
    services: [
      { icon: '📅', label: 'Reservations' },
      { icon: '🛍️', label: 'Takeaway' },
      { icon: '🚚', label: 'Delivery' },
      { icon: '🎊', label: 'Catering' },
      { icon: '🎂', label: 'Private Events' },
      { icon: '🎁', label: 'Gift Cards' },
    ],
  };

  // Dietary specializations
  const dietaryOptions = [
    { icon: '🌱', label: 'Vegan Options', available: true },
    { icon: '🥬', label: 'Vegetarian', available: true },
    { icon: '🌾', label: 'Gluten-Free', available: true },
    { icon: '🔥', label: 'Keto-Friendly', available: true },
    { icon: '🥜', label: 'Nut-Free', available: true },
    { icon: '🌶️', label: 'Spicy Menu', available: true },
  ];

  // Removed: Awards & Certifications (per luxury guidelines - hard to verify, feels inflated)

  // Accessibility info
  const accessibilityInfo = {
    wheelchair: true,
    parking: 'Free on-site parking • 15 spaces • Accessible spots available',
    restroom: 'Accessible restroom facilities',
    entrance: 'Level entrance • Ramp available',
    maxParty: 60,
  };

  // Signature dishes removed for editorial PLATINUM presentation

  // Menu price ranges
  const menuPriceRanges = {
    Starters: { min: 45, max: 120 },
    Mains: { min: 180, max: 450 },
    Sides: { min: 35, max: 85 },
    Desserts: { min: 55, max: 95 },
    Beverages: { min: 25, max: 120 },
  };

  // Rating breakdown (removed visual emphasis for editorial layout)
  const ratingBreakdown = {
    overall: 4.7,
    foodQuality: 4.9,
    service: 4.6,
    ambiance: 4.5,
    valueForMoney: 4.4,
    reviewCount: 342,
  };

  // Payment methods
  const paymentMethods = [
    { icon: '💳', label: 'Card' },
    { icon: '💰', label: 'Cash' },
    { icon: '🏦', label: 'EFT' },
    { icon: '📱', label: 'Zapper/Snapcode' },
  ];

  // Events & Functions (editorial labels for PLATINUM presentation)
  const eventsInfo = {
    available: true,
    maxCapacity: 150,
    privateSpaces: 2,
    minGuestsBudget: 30,
    servingStyles: ['Plated', 'Buffet', 'BBQ'],
  // User requested editorial tags
    eventTypes: ['Corporate', 'Private Dining', 'Celebrations', 'Functions'],
  };

  // ===== CAFÉ-SPECIFIC DATA =====
  // Coffee offerings
  const cafeData = {
    coffeeOrigins: [
      { name: 'Ethiopian Yirgacheffe', roastLevel: 'Light', flavor: 'Floral, Citrus' },
      { name: 'Colombian Geisha', roastLevel: 'Medium', flavor: 'Chocolate, Nut' },
      { name: 'Kenyan AA', roastLevel: 'Medium-Dark', flavor: 'Berry, Jasmine' },
    ],
    brewMethods: ['Espresso', 'Pour-Over', 'AeroPress', 'Cold Brew', 'Nitro Cold Brew'],
    specialtyBeverages: [
      { name: 'Flat White', description: 'Espresso with micro-foam', price: 'R35' },
      { name: 'Cortado', description: 'Equal espresso & steamed milk', price: 'R32' },
      { name: 'Cold Brew', description: '24-hour brew, smooth & crisp', price: 'R38' },
      { name: 'Nitro Cold Brew', description: 'Nitrogen-infused, creamy head', price: 'R42' },
      { name: 'Seasonal Special', description: 'Rotating specialty drink', price: 'R45' },
    ],
    milkAlternatives: ['Oat Milk', 'Almond Milk', 'Soy Milk', 'Coconut Milk', 'Whole Milk'],
    baristaCredentials: 'SCA Certified Baristas with 5+ years experience',
  };

  // Pastry freshness timers
  const pastrySchedule = [
    { name: 'Croissants', available: true, freshUntil: '10:30am', batchTime: '6:00am' },
    { name: 'Chocolate Croissants', available: true, freshUntil: '10:30am', batchTime: '6:15am' },
    { name: 'Sourdough Loaves', available: true, freshUntil: '12:00pm', batchTime: '5:30am' },
    { name: 'Blueberry Muffins', available: true, freshUntil: '11:00am', batchTime: '6:45am' },
    { name: 'Scones (Cream & Jam)', available: true, freshUntil: '3:00pm', batchTime: '10:00am' },
    { name: 'Artisan Bread (3 varieties)', available: true, freshUntil: '2:00pm', batchTime: '5:00am' },
  ];

  // Seating map with outlet/table locations
  const seatingMap = [
    { id: 1, type: 'Counter', seats: 4, outlets: 2, position: 'Front Window', vibe: 'Social' },
    { id: 2, type: 'Individual Table', seats: 2, outlets: 1, position: 'Corner Nook', vibe: 'Quiet' },
    { id: 3, type: 'Individual Table', seats: 2, outlets: 1, position: 'Back Wall', vibe: 'Study-Friendly' },
    { id: 4, type: 'Booth', seats: 4, outlets: 2, position: 'Side Window', vibe: 'Social' },
    { id: 5, type: 'Tall Table', seats: 3, outlets: 1, position: 'Center', vibe: 'Casual' },
    { id: 6, type: 'Individual Table', seats: 2, outlets: 1, position: 'Quiet Corner', vibe: 'Study-Friendly' },
  ];

  const totalOutlets = seatingMap.reduce((sum, seat) => sum + seat.outlets, 0);
  const totalSeats = seatingMap.reduce((sum, seat) => sum + seat.seats, 0);

  // Peak hours tracking
  const peakHours = [
    { timeRange: '7:00am - 9:00am', intensity: 'Very High ⚡⚡⚡', description: 'Morning rush, standing room only' },
    { timeRange: '9:00am - 12:00pm', intensity: 'Medium ⚡⚡', description: 'Remote workers settle in, quieter atmosphere' },
    { timeRange: '12:00pm - 1:30pm', intensity: 'High ⚡⚡⚡', description: 'Lunch break crowd' },
    { timeRange: '1:30pm - 4:00pm', intensity: 'Low ⚡', description: 'Best for study, spacious seating' },
    { timeRange: '4:00pm - 6:00pm', intensity: 'Medium ⚡⚡', description: 'Afternoon pick-me-up time' },
  ];

  // Vibe rating (0-10 scale where 0 = Silent, 10 = Very Lively)
  const vibeRating = {
    quietness: 6, // 0 = Silent/Library, 10 = Very Lively/Party
    bestForStudy: '9:30am - 3:30pm',
    bestForMeetups: '3:30pm - 5:30pm',
    bestForDates: '5:00pm - 7:00pm',
    noiseLevel: 'Moderate - Comfortable conversations, background music',
  musicType: 'Jazz & Indie (thoughtfully selected playlist, volume adjustable)',
  };


  const images = (eatery.images && eatery.images.length) ? eatery.images : [eatery.image || ''];

  // Map URL: prefer coordinates when available, otherwise fallback to address/area + Mbombela
  // Map removed per request — keep location text only

  // ===== BAKERY-SPECIFIC DATA =====
  const bakeryData = {
    bakingSchedule: [
      { id: 1, item: 'Sourdough Loaves', batchTime: '5:30am', readyTime: '6:00am', freshUntil: '12:00pm', status: 'baked' },
      { id: 2, item: 'Croissants (Plain)', batchTime: '6:00am', readyTime: '6:30am', freshUntil: '10:30am', status: 'baked' },
      { id: 3, item: 'Chocolate Croissants', batchTime: '6:00am', readyTime: '6:35am', freshUntil: '10:30am', status: 'baked' },
      { id: 4, item: 'Danish Pastries', batchTime: '6:15am', readyTime: '7:00am', freshUntil: '11:00am', status: 'baked' },
      { id: 5, item: 'Specialty Breads (3 varieties)', batchTime: '5:00am', readyTime: '7:30am', freshUntil: '2:00pm', status: 'baked' },
      { id: 6, item: 'Blueberry Muffins', batchTime: '7:00am', readyTime: '7:45am', freshUntil: '3:00pm', status: 'available' },
      { id: 7, item: 'Scones (Cream & Jam)', batchTime: '10:00am', readyTime: '10:30am', freshUntil: '5:00pm', status: 'available' },
      { id: 8, item: 'Afternoon Batch (Brownies, Cookies)', batchTime: '2:00pm', readyTime: '2:30pm', freshUntil: '6:00pm', status: 'available' },
    ],
    ingredients: [
      { category: 'Flour', item: 'French T55 flour, unbleached, high-protein' },
      { category: 'Butter', item: 'French butter (82% butterfat), cultured, no margarine' },
      { category: 'Chocolate', item: 'Belgian single-origin dark (70% cacao)' },
      { category: 'Other', item: 'Free-range eggs, Madagascar vanilla, sea salt' },
      { category: 'Sweeteners', item: 'Cane sugar, honey, no high-fructose corn syrup' },
      { category: 'NOT Used', item: 'Artificial preservatives, dough conditioners, shortcuts' },
    ],
    specialtyItems: [
      { name: 'Sourdough Loaf (500g)', type: 'Daily', price: 'R35', availability: '✓ Fresh daily', leadTime: 'Ready daily' },
      { name: 'Croissant (Single)', type: 'Daily', price: 'R28', availability: '✓ Until 10:30am', leadTime: 'Ready daily' },
      { name: 'Brioche Loaf', type: 'Daily', price: 'R42', availability: '✓ Fresh daily', leadTime: 'Ready daily' },
      { name: 'Panettone (500g)', type: 'Seasonal', price: 'R85', availability: '🎄 Dec only', leadTime: '1+ week advance' },
      { name: 'Hot Cross Buns (Box of 4)', type: 'Seasonal', price: 'R65', availability: '✝️ Easter only', leadTime: '3+ days advance' },
      { name: 'Wedding Cake (Custom)', type: 'Custom', price: 'From R450', availability: '✓ Custom orders', leadTime: '7+ days advance' },
      { name: 'Birthday Cake (6-inch)', type: 'Custom', price: 'From R180', availability: '✓ Custom orders', leadTime: '3+ days advance' },
      { name: 'Celebration Cupcakes (Box of 12)', type: 'Custom', price: 'From R240', availability: '✓ Custom orders', leadTime: '2+ days advance' },
    ],
    techniques: [
      { item: 'Sourdough', technique: '48-hour natural fermentation, slow-rise for digestibility & flavor development' },
      { item: 'Croissants', technique: 'Laminated with 100+ layers, hand-folded traditional French method' },
      { item: 'Breads', technique: 'Stone-baked in wood-fired ovens at 250°C for crust development' },
      { item: 'Cakes', technique: 'Torte-style with homemade fillings & Swiss meringue buttercream' },
      { item: 'Pastry Dough', technique: 'Chilled overnight for texture, laminated for flakiness' },
    ],
    allergens: [
      { allergen: 'Gluten', items: 'All bread & pastries (except gluten-free section)', warning: 'Cross-contamination possible' },
      { allergen: 'Dairy', items: 'Most items (butter, milk in doughs)', warning: 'Check specific item' },
      { allergen: 'Eggs', items: 'All enriched doughs, cakes, pastries', warning: 'Free-range, no additives' },
      { allergen: 'Nuts', items: 'Some cakes, fillings (clearly labeled)', warning: 'Separate prep area' },
      { allergen: 'Sesame', items: 'Some specialty breads only', warning: 'Clearly labeled' },
    ],
    dietaryOptions: [
      { type: 'Vegan', items: 'Vegan croissants, plant-based cakes', note: '3+ days notice for custom orders' },
      { type: 'Gluten-Free', items: 'GF sourdough, GF pastries', note: 'Dedicated prep area, certified' },
      { type: 'Dairy-Free', items: 'Dairy-free options available', note: 'Some items, check inventory' },
      { type: 'Sugar-Free', items: 'Limited selection with stevia', note: 'Special order only' },
    ],
    rushTimes: [
      { timeRange: '6:00am - 7:30am', intensity: 'Very High ⚡⚡⚡', description: 'Early bird crowd, limited fresh stock' },
      { timeRange: '7:30am - 9:00am', intensity: 'High ⚡⚡⚡', description: 'Morning rush, some items selling out' },
      { timeRange: '9:00am - 11:00am', intensity: 'Medium ⚡⚡', description: 'Steady crowd, good selection' },
      { timeRange: '11:00am - 1:00pm', intensity: 'Medium ⚡⚡', description: 'Lunch break visitors' },
      { timeRange: '1:00pm - 4:00pm', intensity: 'Low ⚡', description: 'Quiet time, stock may be limited' },
      { timeRange: '4:00pm - 6:00pm', intensity: 'Very Low ⚡', description: 'Stock runs out, early close possible' },
    ],
  };

  // ===== BAR-SPECIFIC DATA =====
  const barData = {
    signaturecocktails: [
      { name: 'Espresso Martini', base: 'Vodka', ingredients: 'Vodka, espresso, Kahlúa, sugar', price: 'R65', style: 'Up (chilled)', badge: '🏆 House Signature' },
      { name: 'Old Fashioned', base: 'Whiskey', ingredients: 'Whiskey, sugar, bitters, orange twist', price: 'R58', style: 'On rocks', badge: 'Classic' },
      { name: 'Mojito', base: 'Rum', ingredients: 'Rum, mint, lime, sugar, soda', price: 'R52', style: 'Long, refreshing', badge: 'Summer Pick' },
      { name: 'Negroni', base: 'Gin', ingredients: 'Gin, Campari, vermouth, orange peel', price: 'R62', style: 'On rocks', badge: 'Bartender Fave' },
      { name: 'Piña Colada', base: 'Rum', ingredients: 'Rum, coconut cream, pineapple, crushed ice', price: 'R55', style: 'Frozen, tropical', badge: 'Seasonal' },
      { name: 'Craft Gin Fizz', base: 'Gin', ingredients: 'Local gin, elderflower, cucumber, tonic', price: 'R48', style: 'Long, garden vibe', badge: 'House Creation' },
    ],
    entertainment: {
      djNights: 'Thu-Sat, 9pm-2am (House, Deep House, Afrobeat)',
      liveMusic: 'Wed, Fri 7pm-10pm (Jazz, Soul trio)',
      triviaNight: 'Tue, 7:30pm (Music trivia, R50/team)',
      vibeIntensity: 7,
      quietestTime: '5pm-7pm (Happy hour, soft background music)',
      fullestTime: 'Fri-Sat 10pm-12am (Dancing, standing room only)',
      musicGenres: ['House', 'Deep House', 'Afrobeat', 'Reggae', 'Pop'],
      soundQuality: 'Professional sound system, customizable volume',
    },
    foodMenu: [
      { name: 'Bar Nuts (Mixed)', price: 'R35', pairing: 'Pairs with whiskey cocktails', type: 'Snack' },
      { name: 'Charcuterie Board (Shared)', price: 'R120', pairing: 'Perfect for wine/aperitif drinks', type: 'Shared' },
      { name: 'Sliders (3 pack)', price: 'R85', pairing: 'Goes with beer or casual cocktails', type: 'Main' },
      { name: 'Spiced Wings (6 piece)', price: 'R75', pairing: 'Spicy, pairs with cold beer', type: 'Main' },
      { name: 'Loaded Nachos', price: 'R95', pairing: 'Festive, goes with margaritas', type: 'Shared' },
    ],
    happyHours: [
      { day: 'Mon-Fri', time: '4pm-7pm', specials: 'All cocktails 30% off', drinks: 'Cocktails, beer, wine' },
      { day: 'Tue (Industry Night)', time: '5pm-9pm', specials: 'Industry 40% off, buy 2 get 1 free shots', drinks: 'All spirits' },
      { day: 'Wed (Ladies Night)', time: '6pm-8pm', specials: 'Ladies cocktails R35 (normally R50+)', drinks: 'Cocktails' },
      { day: 'Thu (Throwback Night)', time: '7pm-10pm', specials: 'R25 shots, buy 2 get 1 beer free', drinks: 'Spirits, beer' },
    ],
    capacity: {
      danceFloor: '80-100 standing',
      seatedArea: '40 (4-top tables, bar stools)',
      total: '150+ capacity',
      boothSeating: '2 VIP booths, 6-8 capacity each',
      dressCode: 'Smart Casual (No athletic wear, no ripped jeans)',
      ageRestriction: '18+ (ID required)',
    },
    vipPackages: [
      { name: 'Bottle Service (Standard)', bottles: 'Premium spirits, mixers, ice', capacity: '4-6 guests', price: 'From R800', includes: 'VIP table, priority entry, dedicated server' },
      { name: 'Bottle Service (Premium)', bottles: 'Top-tier spirits, premium liqueurs', capacity: '6-8 guests', price: 'From R1200', includes: 'Premium booth, entry bypass, bottle presenter' },
      { name: 'Group Reservation', capacity: '10+ guests', price: 'From R500/person', includes: 'Reserved seating, drinks menu, group pricing' },
      { name: 'Private Function', capacity: 'Custom', price: 'Bespoke', includes: 'Full venue rental, custom menu, dedicated event coordinator' },
    ],
    facilities: [
      { name: 'Parking', detail: 'On-site parking for 20 cars + street parking available' },
      { name: 'Restrooms', detail: 'Modern, clean, gender-neutral options available' },
      { name: 'Smoking Area', detail: 'Outdoor rooftop smoking lounge with views' },
      { name: 'Payment', detail: 'All cards accepted, digital wallets, no cash discount' },
      { name: 'Accessibility', detail: 'Wheelchair accessible entrance, accessible restrooms' },
    ],
    rushTimes: [
      { timeRange: '5pm-7pm', intensity: 'Low ⚡', description: 'Happy hour, relaxed atmosphere, best for conversations' },
      { timeRange: '7pm-9pm', intensity: 'Medium ⚡⚡', description: 'Pre-game crowd, getting busier' },
      { timeRange: '9pm-11pm', intensity: 'High ⚡⚡⚡', description: 'Peak time, DJ spinning, dance floor active' },
      { timeRange: '11pm-1am', intensity: 'Very High ⚡⚡⚡⚡', description: 'Full capacity, standing room only, electric vibe' },
      { timeRange: '1am-2am', intensity: 'Medium ⚡⚡', description: 'Late crowd, some leaving, good for conversations' },
    ],
  };

  // ===== CASUAL RESTAURANTS-SPECIFIC DATA =====
  const casualData = {
    menuCategories: [
      { name: 'Burgers & Sandwiches', items: 8, avgPrice: 'R60-95' },
      { name: 'Chicken Specialties', items: 6, avgPrice: 'R50-120' },
      { name: 'Sides & Extras', items: 10, avgPrice: 'R20-55' },
      { name: 'Beverages', items: 12, avgPrice: 'R15-45' },
      { name: 'Desserts & Shakes', items: 8, avgPrice: 'R25-65' },
    ],
    popularItems: [
      { name: 'Signature Burger', description: 'Double patty with special sauce, crispy fries', price: 'R85', rating: '⭐ 4.8' },
      { name: 'Crispy Fried Chicken Bucket', description: '6-piece golden fried chicken, 2 sides', price: 'R95', rating: '⭐ 4.7' },
      { name: 'Peri-Peri Chicken Combo', description: 'Flame-grilled chicken, rice, salad', price: 'R78', rating: '⭐ 4.9' },
      { name: 'Loaded Fries', description: 'Premium fries topped with cheese, bacon, mayo', price: 'R55', rating: '⭐ 4.6' },
    ],
    serviceOptions: [
      { option: 'Dine-In', available: true, description: 'Casual indoor seating, quick service' },
      { option: 'Takeaway', available: true, description: 'Order at counter, ready in 10-15 minutes' },
      { option: 'Drive-Thru', available: true, description: 'Quick pickup without leaving your car' },
      { option: 'Delivery', available: true, description: 'Order via app or phone, delivered hot' },
    ],
    orderingDetails: {
      dineInTime: '15-20 minutes average',
      takeawayTime: '10-15 minutes average',
      driveThruTime: '5-10 minutes average',
      deliveryTime: '25-40 minutes average',
      minDeliveryOrder: 'R50',
      paymentMethods: ['Cash', 'Card', 'Zapper', 'EFT'],
      orderChannels: ['In-person', 'Phone', 'App (Uber Eats, Mr. Delivery)', 'Website'],
    },
    atmosphere: {
      seatingStyle: 'Casual, family-friendly, booth & counter seating',
      familyFriendly: true,
      kidsFacilities: 'Kids menu, high chairs available, play area at some locations',
      noiseLevel: 'Moderate to high (busy fast-casual atmosphere)',
      busyTimes: 'Noon-1pm, 6pm-8pm (weekdays), All day weekends',
      quietestTimes: '2pm-5pm (afternoon lull), 9am-11am (breakfast to lunch transition)',
    },
    healthOptions: [
      { item: 'Grilled Options', description: 'Grilled chicken & veggie alternatives (lower fat)' },
      { item: 'Salad Options', description: 'Fresh garden salads with protein choices' },
      { item: 'Calorie Information', description: 'Available on menu board & website' },
      { item: 'Allergen Info', description: 'Clear labeling of common allergens' },
    ],
    loyaltyOptions: [
      { name: 'Free Wi-Fi', benefit: 'Stay connected, order via app' },
      { name: 'Rewards Program', benefit: 'Loyalty points, free meals after 10 visits' },
      { name: 'Email List', benefit: 'Exclusive deals, new item previews, birthday offers' },
      { name: 'Mobile App', benefit: 'Push notifications for limited-time offers' },
    ],
  };

  // ===== SHISANYAMA-SPECIFIC DATA =====
  const shisanyamaData = {
    meatQuality: [
      { cut: 'Rump Steak', sourcing: 'Local grass-fed beef', marination: '2-4 hours in traditional spices', price: 'R140/kg', quality: 'Prime grade' },
      { cut: 'Fillet', sourcing: 'Premium local beef', marination: 'Light marinade, 1-2 hours', price: 'R180/kg', quality: 'Prime grade' },
      { cut: 'Boerewors (500g)', sourcing: 'Local butcher, family recipe', marination: 'Spiced sausage, ready to grill', price: 'R65', quality: 'Traditional certified' },
      { cut: 'Lamb Chops (6)', sourcing: 'Local lamb farms', marination: '3-4 hours in garlic & rosemary', price: 'R160/kg', quality: 'Premium grade' },
      { cut: 'Chicken Thighs (1kg)', sourcing: 'Free-range local', marination: 'Lemon & herbs, 2-3 hours', price: 'R85/kg', quality: 'Fresh daily' },
    ],
    braaiBrains: [
      { item: 'Charcoal Type', detail: 'Hardwood lumpwood charcoal (NOT briquettes) for authentic flavor & temperature control' },
      { item: 'Temperature', detail: 'High heat 200-250°C for searing, reduced to 150-180°C for finishing' },
      { item: 'Cooking Times', detail: 'Rump: 8-10 min per side | Fillet: 6-8 min per side | Lamb: 10-12 min per side' },
      { item: 'Doneness Levels', detail: 'Blue (45°C), Rare (50-55°C), Medium (60-65°C), Well-Done (70°C+)' },
      { item: 'Smoke Woods', detail: 'Optional fruit wood (apple, cherry) for subtle smoke flavor during last 2-3 minutes' },
    ],
    outdoorCapacity: {
      longTables: '2 tables (20-25 people each), communal braai experience',
      intimateSeating: '4 tables (4-6 people each), family groups',
      totalCapacity: '80+ guests',
      coveredArea: '60% covered (weather protection)',
      openArea: '40% open-air (traditional braai feel)',
      groupEvents: 'Ideal for corporate braais (minimum 15 guests), family reunions, birthday celebrations',
      eventBooking: 'Reserve 1+ weeks ahead for groups 30+',
    },
    beveragePairings: [
      { name: 'Local Beer (Castle, Savanna)', pairing: 'Perfect with rump steak & boerewors', note: 'Crisp finish cuts through grilled meat richness', price: 'R28-35' },
      { name: 'Red Wine (Pinotage)', pairing: 'Pairs beautifully with fillet & lamb', note: 'Full-bodied, complements charred crust', price: 'R80-150/bottle' },
      { name: 'White Wine (Chenin Blanc)', pairing: 'Goes with lighter meats (chicken, fish if available)', note: 'Fresh acidity, refreshing in hot weather', price: 'R60-120/bottle' },
      { name: 'Traditional Umqombothi', pairing: 'Authentic South African sorghum beer', note: 'Cultural complement to braai experience', price: 'R15-20' },
      { name: 'Soft Drinks & Water', pairing: 'Sparkling or still (essential for hot braai days)', note: 'Complimentary or minimal charge', price: 'Incl.' },
    ],
    rushTimes: [
      { timeRange: '11am-1pm', intensity: 'Medium ⚡⚡', description: 'Early weekend braai crowd, casual vibes' },
      { timeRange: '1pm-4pm', intensity: 'High ⚡⚡⚡', description: 'Peak time, families & groups, meat cooking constantly' },
      { timeRange: '4pm-6pm', intensity: 'Medium ⚡⚡', description: 'Late afternoon, good selection still available' },
      { timeRange: '6pm-8pm', intensity: 'Low ⚡', description: 'Quieter, relaxed atmosphere (weekdays)' },
    ],
  };

  const [heroSlide, setHeroSlide] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [showReservation, setShowReservation] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showHours, setShowHours] = useState(true);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [eateryId]);

  // Autoplay hero slideshow if enabled in seed (falls back to 5s)
  useEffect(() => {
    const enabled = eatery?.hero?.slideshow ?? true;
    if (!enabled) return;
    const ms = (eatery?.hero?.autoplayMs && Number(eatery.hero.autoplayMs)) || 5000;
    const id = setInterval(() => {
      setHeroSlide((s) => (s + 1) % images.length);
    }, ms);
    return () => clearInterval(id);
  }, [eatery?.hero?.autoplayMs, eatery?.hero?.slideshow, images.length]);

  const menuSections = useMemo(() => {
    const map: Record<string, any[]> = {};
    (eatery.menu || []).forEach((m) => {
      const k = m.category || 'General';
      if (!map[k]) map[k] = [];
      map[k].push(m);
    });
    return map;
  }, [eatery.menu]);

  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);

  return (
    <div style={{ background: BG_BLACK, color: TEXT_WHITE, minHeight: '100vh' }}>
      {/* BACK BUTTON */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate('eats')}
          className="p-2 rounded-full hover:bg-white/5 transition"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${BORDER}`, color: TEXT_WHITE }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* ============ 1. SPLIT HERO (EDITORIAL) ============ */}
      <section className="relative" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="container mx-auto" style={{ maxWidth: 1400 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Gallery slideshow (kept behavior) */}
            <div style={{ borderRadius: 24, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ height: 620, background: 'black' }}>
                  <img src={images[heroSlide]} alt={`${eatery.name} hero`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>

                {/* Nav arrows */}
                <button
                  onClick={() => setHeroSlide((s) => (s - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
                  style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${BORDER}` }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setHeroSlide((s) => (s + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
                  style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${BORDER}` }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right: Info card */}
            <div>
              {isPlatinum ? (
                // PLATINUM editorial content (MixoloG)
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 360, textAlign: 'center', gap: 8 }}>
                    <div style={{ display: 'inline-block', padding: '6px 12px', background: 'transparent', border: `1px solid rgba(212,175,55,0.08)`, borderRadius: 6, color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                      PLATINUM COLLECTION
                    </div>

                    <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.02, margin: '6px 0 8px', fontFamily: 'serif', fontWeight: 700 }}>{eatery.name}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: TEXT_MUTED, fontSize: 13, marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: TEXT_WHITE }}>Mbombela</div>
                    </div>

                    <div style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 12 }}>Cocktails • Fine Dining • Nightlife</div>

                    <p style={{ color: TEXT_WHITE, fontSize: 16, lineHeight: 1.6, marginBottom: 18, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
                      MIXOLO'G combines contemporary cuisine, handcrafted cocktails and sophisticated interiors into one of Mbombela's most distinctive dining destinations. Whether you're meeting friends for drinks, celebrating a special occasion or enjoying dinner, every detail is designed to create an elevated experience.
                    </p>
                  </div>

                  {/* Hero CTAs and compact Visit block removed for editorial PLATINUM (MIXOLO'G) */}
                </>
              ) : (
                // Default existing dynamic info for non-Platinum
                <>
                  {(eatery as any).premiumTier && ((eatery as any).premiumTier.toString().toLowerCase().includes('platinum')) && (
                    <div style={{ display: 'inline-block', padding: '6px 12px', background: 'transparent', border: `1px solid rgba(212,175,55,0.08)`, borderRadius: 6, color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                      PLATINUM COLLECTION
                    </div>
                  )}

                  <h2 style={{ fontSize: 28, marginBottom: 6 }}>{eatery.name}</h2>
                  <div style={{ color: GOLD, fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{eatery.category || eatery.subcategory || 'Contemporary Dining'}</div>

                  <div style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 12 }}>{typeof eatery.location === 'string' ? eatery.location : eatery.location.area}</div>

                  <p style={{ color: TEXT_WHITE, fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{eatery.description || 'An elevated dining and cocktail destination — crafted for memorable evenings.'}</p>

                  {/* Hero CTAs intentionally hidden for Platinum/editorial listings */}
                  {!isPlatinum && (
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
                      <button onClick={() => setShowReservation(true)} className="px-5 py-3 rounded-md font-semibold" style={{ background: GOLD, color: '#0b0b0b' }}>Reserve a Table →</button>
                      <a href={(eatery.contactOptions?.website || eatery.website || '#') + '/menu/'} target="_blank" rel="noreferrer" className="px-4 py-3 rounded-md font-semibold" style={{ border: `1px solid rgba(212,175,55,0.06)`, color: GOLD }}>View Menu →</a>
                      {/* Directions removed — location only */}
                    </div>
                  )}

                  {/* Compact info - luxury icon buttons */}
                  <div style={{ borderTop: `1px solid rgba(255,255,255,0.02)`, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)' }}>{isOpenNow ? 'Open Today' : 'Closed'}</div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                      <a href={(eatery.contactOptions?.website || eatery.website || '#')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2" style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(201,162,77,0.08)', color: GOLD, border: `1px solid rgba(212,175,55,0.06)`, fontWeight: 700 }}>
                        <Globe size={16} color={GOLD} /> <span>Website</span>
                      </a>

                      <a href={'tel:' + ((eatery.contactOptions && eatery.contactOptions.call) || '')} className="inline-flex items-center gap-2" style={{ padding: '8px 12px', borderRadius: 999, background: 'transparent', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <Phone size={16} color={'rgba(255,255,255,0.92)'} /> <span>Call</span>
                      </a>

                      <a href={'https://wa.me/' + ((eatery.contactOptions && eatery.contactOptions.call) ? eatery.contactOptions.call.replace(/\D/g, '') : '')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2" style={{ padding: '8px 12px', borderRadius: 999, background: 'transparent', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <MessageCircle size={16} color={'rgba(255,255,255,0.92)'} /> <span>WhatsApp</span>
                      </a>

                      <a href={'https://www.instagram.com/'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2" style={{ padding: '8px 12px', borderRadius: 999, background: 'transparent', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <Instagram size={16} color={'rgba(255,255,255,0.92)'} /> <span>Instagram</span>
                      </a>

                      <a href={'https://www.facebook.com/'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2" style={{ padding: '8px 12px', borderRadius: 999, background: 'transparent', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <Facebook size={16} color={'rgba(255,255,255,0.92)'} /> <span>Facebook</span>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & status strip removed per design request */}

      {/* ============ BUSINESS HOURS WIDGET + ABOUT ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: BG_BLACK }}>
        <div className="container mx-auto max-w-5xl px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hours */}
            <div>
              {/* Collapsed Hours */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opening Hours</div>
                  <div style={{ color: isOpenNow ? OPEN_GREEN : CLOSED_RED, fontSize: '14px', fontWeight: 700 }}>{isOpenNow ? 'Open now' : 'Closed'}</div>
                </div>
              </div>
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 12 }}>
                {Object.entries(businessHours).map(([day, hours]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${BORDER}`, fontSize: '13px' }}>
                    <span style={{ color: TEXT_MUTED, fontWeight: 500 }}>{day}</span>
                    <span style={{ color: TEXT_WHITE, fontWeight: 600 }}>{hours.open} – {hours.close}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details (visible, premium) */}
            <div>
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 20, width: '100%' }}>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>Contact Details</div>
                <div className="space-y-3">
                  {eatery.contactOptions?.call && (
                    <a href={`tel:${eatery.contactOptions.call}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition" style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT_WHITE, textDecoration: 'none' }}>
                      <Phone size={16} style={{ color: GOLD }} />
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>{eatery.contactOptions.call}</span>
                    </a>
                  )}

                  {eatery.contactOptions?.email && (
                    <a href={`mailto:${eatery.contactOptions.email}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition" style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT_WHITE, textDecoration: 'none' }}>
                      <Globe size={16} style={{ color: GOLD }} />
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>{eatery.contactOptions.email}</span>
                    </a>
                  )}

                  {eatery.contactOptions?.whatsapp && (
                    <a href={eatery.contactOptions.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:opacity-95 transition" style={{ background: GOLD, color: BG_BLACK, textDecoration: 'none', fontWeight: 700 }}>
                      <MessageCircle size={16} />
                      <span style={{ fontSize: '14px' }}>WhatsApp</span>
                    </a>
                  )}

                  {(eatery.contactOptions?.website || eatery.website) && (
                    <a href={(eatery.contactOptions?.website || eatery.website)} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition" style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT_WHITE, textDecoration: 'none' }}>
                      <Globe size={16} style={{ color: GOLD }} />
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>{new URL((eatery.contactOptions?.website || eatery.website) ?? 'https://example.com').host.replace('www.', '')}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-5xl px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column (main content) */}
          <div className="lg:col-span-2 space-y-14">
            {/* full-width gallery removed (kept inside hero to reduce scrolling) */}

            {/* ============ AMENITIES + EDITORIAL (CONSOLIDATED FOR PLATINUM) ============ */}
            <section>
              <div style={{ marginBottom: 16, color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Amenities</div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {['Indoor Dining', 'Cocktail Bar', 'Private Dining', 'Outdoor Terrace', 'Free WiFi', 'Parking', 'Wheelchair', 'Live Music', 'Groups'].map((tag) => (
                  <div key={tag} style={{ height: 34, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.18)', color: TEXT_WHITE, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-flex', alignItems: 'center' }}>{tag}</div>
                ))}
              </div>

              {/* Explore Menu - single luxury card */}
              <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.04)', marginBottom: 24 }}>
                <div style={{ width: '100%', height: 360, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${(eatery.images && eatery.images[1]) || (eatery.images && eatery.images[0]) || ''})` }} />
                <div style={{ padding: 28 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_WHITE, marginBottom: 8 }}>{isPlatinum ? 'Menu' : 'Explore the Menu'}</div>
                  <p style={{ fontSize: 16, color: TEXT_MUTED, marginBottom: 12 }}>{isPlatinum ? "A concise selection crafted for sharing — flavours that invite conversation and linger in memory." : 'Contemporary cuisine and handcrafted cocktails designed for memorable dining experiences.'}</p>
                  {/* Use explicit menu PDF when present; otherwise fallback to website/menu path */}
                  {(() => {
                    const menuPdf = eatery.menuLinks?.menuPdf;
                    const winePdf = eatery.menuLinks?.wineListPdf;
                    const websiteMenu = (eatery.contactOptions?.website || eatery.website) ? (eatery.contactOptions?.website || eatery.website) + '/menu/' : '#';
                    const menuHref = menuPdf || websiteMenu;
                    return (
                      <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                        <a href={menuHref} target="_blank" rel="noreferrer" style={{ color: GOLD, fontWeight: 700 }}>{isPlatinum ? 'Menu →' : 'View Menu →'}</a>
                        {winePdf && (
                          <a href={winePdf} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>Wine List →</a>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Perfect For tags */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ marginBottom: 8, color: GOLD, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Perfect For</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Date Night', 'Cocktails', 'Business Lunch', 'Private Dining', 'Celebrations', 'Weekend Evenings'].map((p) => (
                    <div key={p} style={{ height: 34, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.18)', color: TEXT_WHITE, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-flex', alignItems: 'center' }}>{p}</div>
                  ))}
                </div>
              </div>

              {/* Visit & Contact consolidated card */}
                  {isPlatinum ? (
                    // For MIXOLO'G and Orange Restaurant we intentionally remove the Visit & Contact CTAs and concierge section
                    ['e_mixolog_001', 'e_orange_001'].includes(eatery.id) ? null : (
                <div style={{ borderRadius: 24, overflow: 'hidden', border: `1px solid rgba(212,175,55,0.06)`, padding: 28, background: `linear-gradient(180deg, rgba(11,11,11,0.6), ${PANEL_BLACK})` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: TEXT_WHITE, marginBottom: 4 }}>{eatery.name}</div>
                      <div style={{ color: TEXT_MUTED, marginBottom: 6 }}>{typeof eatery.location === 'string' ? eatery.location : `${eatery.location?.area || ''} · ${eatery.location?.city || ''}`}</div>
                      <div style={{ color: isOpenNow ? OPEN_GREEN : CLOSED_RED, fontSize: 13, fontWeight: 700 }}>{isOpenNow ? 'Open Daily' : 'Closed'}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                      <button onClick={() => setShowReservation(true)} style={{ background: GOLD, color: BG_BLACK, padding: '12px 20px', borderRadius: 12, fontWeight: 800, fontSize: 16 }}>Reserve a Table</button>
                      <a href={(eatery.contactOptions?.website || eatery.website || '#')} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>Website →</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
                    <a href={'tel:' + ((eatery.contactOptions && eatery.contactOptions.call) || '')} className="inline-flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', color: TEXT_WHITE, border: '1px solid rgba(255,255,255,0.03)', minWidth: 140 }}>
                      <Phone size={16} color={TEXT_WHITE} /> <div style={{ fontWeight: 700 }}>Call</div>
                    </a>

                    <a href={'https://wa.me/' + ((eatery.contactOptions && eatery.contactOptions.call) ? eatery.contactOptions.call.replace(/\D/g, '') : '')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 12, background: 'transparent', color: TEXT_WHITE, border: '1px solid rgba(255,255,255,0.03)', minWidth: 140 }}>
                      <MessageCircle size={16} color={TEXT_WHITE} /> <div style={{ fontWeight: 700 }}>WhatsApp</div>
                    </a>

                    <a href={'https://www.instagram.com/'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 12, background: 'transparent', color: TEXT_WHITE, border: '1px solid rgba(255,255,255,0.03)', minWidth: 140 }}>
                      <Instagram size={16} color={TEXT_WHITE} /> <div style={{ fontWeight: 700 }}>Instagram</div>
                    </a>

                    <a href={'https://www.facebook.com/'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3" style={{ padding: '10px 14px', borderRadius: 12, background: 'transparent', color: TEXT_WHITE, border: '1px solid rgba(255,255,255,0.03)', minWidth: 140 }}>
                      <Facebook size={16} color={TEXT_WHITE} /> <div style={{ fontWeight: 700 }}>Facebook</div>
                    </a>
                  </div>

                  <div style={{ marginTop: 6, paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.02)` }}>
                    <div style={{ color: TEXT_MUTED, fontSize: 13, marginBottom: 6 }}>Need assistance? Contact our concierge for bespoke requests, private dining and events.</div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button style={{ padding: '8px 12px', borderRadius: 10, background: 'transparent', color: GOLD, border: `1px solid rgba(212,175,55,0.06)`, fontWeight: 700 }}>Concierge →</button>
                      {/* Directions removed — location only */}
                    </div>
                  </div>
                </div>
                    )
              ) : (
                <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.04)', padding: 24, background: PANEL_BLACK }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_WHITE, marginBottom: 6 }}>Visit {eatery.name}</div>
                  <div style={{ color: TEXT_MUTED, marginBottom: 12 }}>{typeof eatery.location === 'string' ? eatery.location : `${eatery.location?.area || ''} · ${eatery.location?.city || ''}`}</div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: GOLD, marginBottom: 8 }}>{isOpenNow ? 'Open Now' : 'Closed'}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <a href={(eatery.contactOptions?.website || eatery.website || '#')} target="_blank" rel="noreferrer" style={{ color: GOLD, fontWeight: 700 }}>Reserve Table →</a>
                      <a href={(eatery.contactOptions?.website || eatery.website || '#')} target="_blank" rel="noreferrer" style={{ color: GOLD, fontWeight: 700 }}>Website →</a>
                      {/* Directions removed — location only */}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
                    <a href={'tel:' + ((eatery.contactOptions && eatery.contactOptions.call) || '')} style={{ color: 'rgba(255,255,255,0.85)' }}>Call</a>
                    <a href={'https://wa.me/' + ((eatery.contactOptions && eatery.contactOptions.call) ? eatery.contactOptions.call.replace(/\D/g, '') : '')} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.85)' }}>WhatsApp</a>
                    <a href={'https://www.instagram.com/'} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.85)' }}>Instagram</a>
                    <a href={'https://www.facebook.com/'} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.85)' }}>Facebook</a>
                  </div>
                </div>
              )}
            </section>

            {/* ============ CATEGORY-SPECIFIC HIGHLIGHTS ============ */}
            {isShisanyama && !isPlatinum && (
              <section className="space-y-20">
                <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  🔥 Braai Mastery
                </div>

                {/* 1. MEAT QUALITY & SOURCING */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🍖 Meat Quality & Sourcing</div>
                  <div className="space-y-2">
                    {shisanyamaData.meatQuality.map((meat, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 2 }}>{meat.cut}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px', marginBottom: 3 }}>{meat.sourcing}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>Marinade: {meat.marination}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ background: 'rgba(201,162,77,0.2)', color: GOLD, fontSize: '9px', fontWeight: 700, padding: '3px 6px', borderRadius: '3px', marginBottom: 4 }}>
                              {meat.quality}
                            </div>
                            <div style={{ color: GOLD, fontSize: '13px', fontWeight: 700 }}>{meat.price}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. BRAAI TECHNIQUE & TEMPERATURE */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🔥 Braai Technique & Temperatures</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {shisanyamaData.braaiBrains.map((technique, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>{technique.item}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>{technique.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. OUTDOOR SEATING & CAPACITY */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🪑 Outdoor Seating & Capacity</div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 16, marginBottom: 12 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6 }}>Seating Layout</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.8 }}>
                          <div>📍 {shisanyamaData.outdoorCapacity.longTables}</div>
                          <div>👥 {shisanyamaData.outdoorCapacity.intimateSeating}</div>
                          <div style={{ marginTop: 6, fontWeight: 600, color: GOLD }}>Total: {shisanyamaData.outdoorCapacity.totalCapacity}</div>
                        </div>
                      </div>
                      <div>
                        <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6 }}>Coverage</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.8 }}>
                          <div>☂️ {shisanyamaData.outdoorCapacity.coveredArea} covered</div>
                          <div>🌳 {shisanyamaData.outdoorCapacity.openArea} open-air braai</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px', marginBottom: 4 }}>🎉 {shisanyamaData.outdoorCapacity.groupEvents}</div>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 600 }}>📅 {shisanyamaData.outdoorCapacity.eventBooking}</div>
                    </div>
                  </div>
                </div>

                {/* 4. BEVERAGE PAIRINGS */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🍺 Beverages & Meat Pairings</div>
                  <div className="space-y-2">
                    {shisanyamaData.beveragePairings.map((beverage, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 2 }}>{beverage.name}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px', marginBottom: 3 }}>🍖 {beverage.pairing}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px', fontStyle: 'italic' }}>💡 {beverage.note}</div>
                          </div>
                          <div style={{ textAlign: 'right', color: GOLD, fontSize: '12px', fontWeight: 700 }}>{beverage.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RUSH TIMES & BEST TIMES */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>⏰ Best Times to Visit</div>
                  <div className="space-y-2">
                    {shisanyamaData.rushTimes.map((period, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <div style={{ color: TEXT_WHITE, fontSize: '11px', fontWeight: 700 }}>{period.timeRange}</div>
                          <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700 }}>{period.intensity}</div>
                        </div>
                        <div style={{ color: TEXT_MUTED, fontSize: '10px' }}>💡 {period.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {isCafe && !isPlatinum && (
              <section>
                <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  ☕ Café Experience
                </div>

                {/* 1. COFFEE OFFERINGS */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Coffee Selection</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {cafeData.coffeeOrigins.map((coffee, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ color: GOLD, fontSize: '12px', fontWeight: 600, marginBottom: 4 }}>{coffee.name}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '11px', marginBottom: 2 }}>Roast: {coffee.roastLevel}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>Flavor: {coffee.flavor}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. VIBE RATING & BEST TIMES */}
                <div style={{ marginBottom: 20, background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>🎵 Vibe & Atmosphere</div>
                    
                    {/* Vibe Scale */}
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '11px' }}>
                        <span style={{ color: TEXT_MUTED }}>Quiet (Study-Friendly)</span>
                        <span style={{ color: GOLD, fontWeight: 700 }}>Vibe Level: {vibeRating.quietness}/10</span>
                        <span style={{ color: TEXT_MUTED }}>Lively (Social)</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(vibeRating.quietness / 10) * 100}%`, background: `linear-gradient(90deg, ${GOLD} 0%, #d4af37 100%)`, transition: 'width 300ms ease' }} />
                      </div>
                    </div>

                    {/* Best Times */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      <div style={{ padding: 8, background: 'rgba(201, 162, 77, 0.08)', borderRadius: '6px', border: `1px solid ${GOLD}` }}>
                        <div style={{ color: GOLD, fontSize: '10px', fontWeight: 700, marginBottom: 2 }}>📚 BEST FOR STUDY</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>{vibeRating.bestForStudy}</div>
                      </div>
                      <div style={{ padding: 8, background: 'rgba(201, 162, 77, 0.08)', borderRadius: '6px', border: `1px solid ${GOLD}` }}>
                        <div style={{ color: GOLD, fontSize: '10px', fontWeight: 700, marginBottom: 2 }}>👥 BEST FOR MEETUPS</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>{vibeRating.bestForMeetups}</div>
                      </div>
                      <div style={{ padding: 8, background: 'rgba(201, 162, 77, 0.08)', borderRadius: '6px', border: `1px solid ${GOLD}` }}>
                        <div style={{ color: GOLD, fontSize: '10px', fontWeight: 700, marginBottom: 2 }}>💕 BEST FOR DATES</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>{vibeRating.bestForDates}</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px', marginBottom: 4 }}><strong>Noise Level:</strong> {vibeRating.noiseLevel}</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px' }}><strong>Music:</strong> {vibeRating.musicType}</div>
                    </div>
                  </div>
                </div>

                {/* 3. PASTRY FRESHNESS TIMERS */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🥐 Pastry Freshness Schedule</div>
                  <div className="space-y-2">
                    {pastrySchedule.map((pastry, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ color: pastry.available ? GOLD : TEXT_MUTED, fontSize: '12px', fontWeight: 600, marginBottom: 2 }}>
                            {pastry.available ? '✓' : '✗'} {pastry.name}
                          </div>
                          <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>Baked: {pastry.batchTime}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 2 }}>Fresh until</div>
                          <div style={{ color: TEXT_MUTED, fontSize: '12px', fontWeight: 600 }}>{pastry.freshUntil}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. SEATING MAP WITH OUTLETS & VIBE */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🪑 Seating & Workspace Map</div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16, marginBottom: 12 }}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {seatingMap.map((seat) => (
                        <div key={seat.id} style={{ background: 'rgba(201,162,77,0.05)', border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 10 }}>
                          <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 6 }}>
                            {seat.type} #{seat.id}
                          </div>
                          <div style={{ fontSize: '11px', color: TEXT_MUTED, lineHeight: 1.6 }}>
                            <div>👥 {seat.seats} {seat.seats === 1 ? 'person' : 'people'}</div>
                            <div>🔌 {seat.outlets} outlet{seat.outlets !== 1 ? 's' : ''}</div>
                            <div>📍 {seat.position}</div>
                            <div style={{ marginTop: 4, color: GOLD, fontSize: '10px' }}>🎵 {seat.vibe}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary Stats */}
                    <div style={{ paddingTop: 12, borderTop: `1px solid ${BORDER}`, display: 'flex', gap: 12 }}>
                      <div>
                        <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700 }}>TOTAL SEATING</div>
                        <div style={{ color: TEXT_WHITE, fontSize: '14px', fontWeight: 700 }}>{totalSeats} guests</div>
                      </div>
                      <div>
                        <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700 }}>POWER OUTLETS</div>
                        <div style={{ color: TEXT_WHITE, fontSize: '14px', fontWeight: 700 }}>{totalOutlets} available</div>
                      </div>
                      <div>
                        <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700 }}>WiFi SPEED</div>
                        <div style={{ color: TEXT_WHITE, fontSize: '14px', fontWeight: 700 }}>100 Mbps</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. PEAK HOURS TRACKER */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>⏰ Peak Hours & Availability</div>
                  <div className="space-y-2">
                    {peakHours.map((period, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <div style={{ color: TEXT_WHITE, fontSize: '12px', fontWeight: 700 }}>{period.timeRange}</div>
                          <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700 }}>{period.intensity}</div>
                        </div>
                        <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>💡 {period.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialty Beverages Card */}
                <div style={{ marginTop: 20, background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Specialty Beverages</div>
                  <div className="space-y-3">
                    {cafeData.specialtyBeverages.map((drink, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', paddingBottom: 10, borderBottom: idx < cafeData.specialtyBeverages.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                        <div>
                          <div style={{ color: TEXT_WHITE, fontSize: '12px', fontWeight: 600, marginBottom: 2 }}>{drink.name}</div>
                          <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>{drink.description}</div>
                        </div>
                        <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginLeft: 12 }}>{drink.price}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}`, color: TEXT_MUTED, fontSize: '11px' }}>
                    <strong>Milk Alternatives:</strong> {cafeData.milkAlternatives.join(', ')}
                  </div>
                  <div style={{ marginTop: 8, color: TEXT_MUTED, fontSize: '11px' }}>
                    <strong>Baristas:</strong> {cafeData.baristaCredentials}
                  </div>
                </div>
              </section>
            )}

            {isBar && !isPlatinum && (
              <section>
                <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  🍹 Bar Highlights
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Signature Cocktails</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Craft cocktails crafted by award-winning mixologists. House-made syrups and infusions. Seasonal specials updated monthly.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Food Menu</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Upscale bar bites: charcuterie, sliders, wings, and shareable platters. Pairs perfectly with drinks.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Entertainment</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Live DJ Fri-Sat. Weekly themed nights. Private events available. Capacity 120+ guests.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Happy Hours</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Mon-Fri 4pm-6pm: 20% off cocktails. Thu-Sat 9pm-10pm: Buy one, get one 50% off select drinks.</p>
                  </div>
                </div>
              </section>
            )}

            {isBakery && !isPlatinum && (
              <section className="space-y-20">
                <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  🍰 Bakery Excellence
                </div>

                {/* 1. BAKING SCHEDULE WITH LIVE TIMERS */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>⏰ Daily Baking Schedule & Freshness</div>
                  <div className="space-y-2">
                    {bakeryData.bakingSchedule.map((item) => (
                      <div key={item.id} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 4 }}>{item.item}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>Baked: {item.batchTime} → Ready: {item.readyTime}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ color: item.status === 'baked' ? '#4ADE80' : GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 2 }}>
                              {item.status === 'baked' ? '✓ Fresh Baked' : '✓ Available'}
                            </div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>Fresh until {item.freshUntil}</div>
                          </div>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: `linear-gradient(90deg, ${GOLD} 0%, #d4af37 100%)`, width: '75%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. ARTISAN INGREDIENTS SHOWCASE */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🌾 Premium Ingredients (Transparency)</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {bakeryData.ingredients.map((ing, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ color: ing.category === 'NOT Used' ? '#EF4444' : GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>
                          {ing.category}
                        </div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>{ing.item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. SPECIALTY ITEMS & CUSTOM ORDERS */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🎂 Specialty Items & Custom Orders</div>
                  <div className="space-y-2">
                    {bakeryData.specialtyItems.map((item, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: TEXT_WHITE, fontSize: '12px', fontWeight: 600, marginBottom: 2 }}>{item.name}</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <span style={{ background: 'rgba(201,162,77,0.2)', color: GOLD, fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px' }}>{item.type}</span>
                              <span style={{ color: TEXT_MUTED, fontSize: '10px' }}>{item.leadTime}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ color: GOLD, fontSize: '13px', fontWeight: 700, marginBottom: 2 }}>{item.price}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '10px' }}>{item.availability}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. ARTISAN TECHNIQUES & STORY */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>👨‍🍳 Artisan Baking Techniques</div>
                  <div className="space-y-3">
                    {bakeryData.techniques.map((tech, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 6 }}>{tech.item}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.6 }}>{tech.technique}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. ALLERGIES & DIETARY INFO */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>⚠️ Allergen Information & Dietary Options</div>
                  
                  {/* Allergens */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: TEXT_MUTED, fontSize: '11px', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>Allergens Present</div>
                    <div className="space-y-2">
                      {bakeryData.allergens.map((allergy, idx) => (
                        <div key={idx} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: 10 }}>
                          <div style={{ color: '#FCA5A5', fontSize: '12px', fontWeight: 700, marginBottom: 2 }}>{allergy.allergen}</div>
                          <div style={{ color: TEXT_MUTED, fontSize: '11px', marginBottom: 2 }}>Items: {allergy.items}</div>
                          <div style={{ color: '#EF4444', fontSize: '10px', fontStyle: 'italic' }}>⚠️ {allergy.warning}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Options */}
                  <div>
                    <div style={{ color: TEXT_MUTED, fontSize: '11px', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>Dietary Accommodations</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {bakeryData.dietaryOptions.map((diet, idx) => (
                        <div key={idx} style={{ background: 'rgba(74,222,128,0.1)', border: `1px solid ${GOLD}`, borderRadius: '8px', padding: 10 }}>
                          <div style={{ color: '#86EFAC', fontSize: '12px', fontWeight: 700, marginBottom: 4 }}>✓ {diet.type}</div>
                          <div style={{ color: TEXT_MUTED, fontSize: '11px', marginBottom: 2 }}>{diet.items}</div>
                          <div style={{ color: GOLD, fontSize: '10px', fontStyle: 'italic' }}>💡 {diet.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 6. RUSH TIMES & AVAILABILITY */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>⏰ Opening Hours & Rush Times</div>
                  <div style={{ marginBottom: 12, background: 'rgba(201,162,77,0.1)', border: `1px solid ${GOLD}`, borderRadius: '8px', padding: 12 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>📍 Store Hours</div>
                    <div className="space-y-2">
                      <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>Mon-Fri: <strong>6am - 7pm</strong> (Best 9am-11am)</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>Sat: <strong>7am - 6pm</strong> (Best after 10am)</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>Sun: <strong>8am - 4pm</strong> (Lighter crowd)</div>
                    </div>
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${BORDER}`, color: '#FCA5A5', fontSize: '11px', fontWeight: 600 }}>
                      🚨 Stock runs out 4-5pm. Early birds (6-9am) recommended for full selection.
                    </div>
                  </div>

                  <div className="space-y-2">
                    {bakeryData.rushTimes.map((period, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <div style={{ color: TEXT_WHITE, fontSize: '11px', fontWeight: 700 }}>{period.timeRange}</div>
                          <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700 }}>{period.intensity}</div>
                        </div>
                        <div style={{ color: TEXT_MUTED, fontSize: '10px' }}>💡 {period.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {isBar && !isPlatinum && (
              <section className="space-y-20">
                <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  🍹 Bar Excellence
                </div>

                {/* 1. SIGNATURE COCKTAILS MENU */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🍸 Signature Cocktails</div>
                  <div className="space-y-2">
                    {barData.signaturecocktails.map((cocktail, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 2 }}>{cocktail.name}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px', marginBottom: 4 }}>Base: {cocktail.base}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>{cocktail.ingredients}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ color: GOLD, fontSize: '13px', fontWeight: 700, marginBottom: 4 }}>{cocktail.price}</div>
                            <div style={{ background: 'rgba(201,162,77,0.2)', color: GOLD, fontSize: '9px', fontWeight: 700, padding: '3px 6px', borderRadius: '3px', marginBottom: 4 }}>
                              {cocktail.badge}
                            </div>
                            <div style={{ color: TEXT_MUTED, fontSize: '10px' }}>{cocktail.style}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. LIVE ENTERTAINMENT & VIBE */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🎵 Live Entertainment & Vibe</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>DJ Nights</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>{barData.entertainment.djNights}</div>
                    </div>
                    <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>Live Music</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>{barData.entertainment.liveMusic}</div>
                    </div>
                    <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>Trivia Night</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>{barData.entertainment.triviaNight}</div>
                    </div>
                    <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>Vibe Intensity</div>
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ color: TEXT_MUTED, fontSize: '11px' }}>Quiet</span>
                          <span style={{ color: GOLD, fontSize: '12px', fontWeight: 700 }}>{barData.entertainment.vibeIntensity}/10</span>
                          <span style={{ color: TEXT_MUTED, fontSize: '11px' }}>Party</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: `linear-gradient(90deg, ${GOLD} 0%, #d4af37 100%)`, width: `${(barData.entertainment.vibeIntensity / 10) * 100}%` }} />
                        </div>
                      </div>
                      <div style={{ color: TEXT_MUTED, fontSize: '10px', fontStyle: 'italic' }}>Best for parties & dancing</div>
                    </div>
                  </div>
                </div>

                {/* 3. FOOD MENU HIGHLIGHTS */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🍽️ Food Menu Highlights</div>
                  <div className="space-y-2">
                    {barData.foodMenu.map((item, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: TEXT_WHITE, fontSize: '12px', fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                            <div style={{ color: GOLD, fontSize: '10px', fontWeight: 700, marginBottom: 2 }}>🍴 {item.type}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>{item.pairing}</div>
                          </div>
                          <div style={{ textAlign: 'right', color: GOLD, fontSize: '13px', fontWeight: 700 }}>{item.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. HAPPY HOURS & SPECIALS */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🎉 Happy Hours & Specials</div>
                  <div className="space-y-2">
                    {barData.happyHours.map((happy, idx) => (
                      <div key={idx} style={{ background: 'rgba(74,222,128,0.1)', border: `1px solid ${GOLD}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: '#86EFAC', fontSize: '12px', fontWeight: 700, marginBottom: 2 }}>{happy.day}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px', marginBottom: 4 }}>{happy.time}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ color: GOLD, fontSize: '10px', fontWeight: 700, marginBottom: 2 }}>💰 {happy.specials}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '10px' }}>{happy.drinks}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. CAPACITY & DRESS CODE */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>💃 Capacity & Dress Code</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6 }}>Capacity</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.6 }}>
                        <div>🎺 Dance Floor: {barData.capacity.danceFloor}</div>
                        <div>🪑 Seated: {barData.capacity.seatedArea}</div>
                        <div>👥 Total: {barData.capacity.total}</div>
                        <div>🎩 Booths: {barData.capacity.boothSeating}</div>
                      </div>
                    </div>
                    <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6 }}>Rules</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.6 }}>
                        <div>👔 Dress: {barData.capacity.dressCode}</div>
                        <div>🔔 Age: {barData.capacity.ageRestriction}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. VIP & GROUP PACKAGES */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🎩 VIP & Group Packages</div>
                  <div className="space-y-2">
                    {barData.vipPackages.map((pkg, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 4 }}>{pkg.name}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px', marginBottom: 2 }}>👥 {pkg.capacity}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>{pkg.includes}</div>
                          </div>
                          <div style={{ textAlign: 'right', color: GOLD, fontSize: '13px', fontWeight: 700 }}>{pkg.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. FACILITIES & AMENITIES */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🏢 Facilities & Amenities</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {barData.facilities.map((facility, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 4 }}>{facility.name}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>{facility.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RUSH TIMES */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>⏰ Best Times to Visit</div>
                  <div className="space-y-2">
                    {barData.rushTimes.map((period, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <div style={{ color: TEXT_WHITE, fontSize: '11px', fontWeight: 700 }}>{period.timeRange}</div>
                          <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700 }}>{period.intensity}</div>
                        </div>
                        <div style={{ color: TEXT_MUTED, fontSize: '10px' }}>💡 {period.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {isCatering && !isPlatinum && (
              <section>
                <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  🎉 Catering Services
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Event Types</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Corporate events, weddings, birthday parties, product launches, seminars, and intimate dinners. Capacity 20-500+ guests.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Menu Options</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Customizable menus. Plated service, buffet, or BBQ. Dietary accommodations. Wine pairing recommendations available.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Minimum Spend</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Flexible packages from R2,500 (20 guests) to R50,000+ (large corporate). Includes full service and setup.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Professional Team</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Dedicated event coordinator, experienced staff, professional service. Full event planning support available.</p>
                  </div>
                </div>
              </section>
            )}

            {isCasual && !isPlatinum && (
              <section className="space-y-12">
                <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  🍔 Quick & Casual Ordering
                </div>

                {/* 1. SERVICE OPTIONS & ORDERING */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>⏱️ How to Order - Fast & Easy</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {casualData.serviceOptions.map((svc, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ color: svc.available ? GOLD : '#888', fontSize: '12px', fontWeight: 700, marginBottom: 4 }}>
                          {svc.option} {svc.available ? '✓' : '✗'}
                        </div>
                        <div style={{ color: TEXT_MUTED, fontSize: '11px', lineHeight: 1.5 }}>{svc.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. POPULAR ITEMS WITH PRICING */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>🔥 Most Popular Items</div>
                  <div className="space-y-2">
                    {casualData.popularItems.map((item, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                          <div>
                            <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 2 }}>{item.name}</div>
                            <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>{item.description}</div>
                          </div>
                          <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div style={{ color: GOLD, fontSize: '13px', fontWeight: 700, marginBottom: 2 }}>{item.price}</div>
                            <div style={{ color: '#4ADE80', fontSize: '11px' }}>{item.rating}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. ORDERING TIMES & METHODS */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>📱 Ordering Details</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6 }}>Typical Wait Times</div>
                      <div className="space-y-2">
                        {[
                          { method: 'Drive-Thru:', time: casualData.orderingDetails.driveThruTime },
                          { method: 'Takeaway:', time: casualData.orderingDetails.takeawayTime },
                          { method: 'Dine-In:', time: casualData.orderingDetails.dineInTime },
                          { method: 'Delivery:', time: casualData.orderingDetails.deliveryTime },
                        ].map((item, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: TEXT_MUTED }}>
                            <span>{item.method}</span>
                            <span style={{ color: GOLD, fontWeight: 700 }}>{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 6 }}>Order Methods</div>
                      <div className="space-y-1">
                        {casualData.orderingDetails.orderChannels.map((channel, i) => (
                          <div key={i} style={{ fontSize: '11px', color: TEXT_MUTED, paddingLeft: 8 }}>• {channel}</div>
                        ))}
                      </div>
                      <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${BORDER}`, fontSize: '11px', color: TEXT_MUTED }}>
                        💳 Accepts: {casualData.orderingDetails.paymentMethods.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. MENU BREAKDOWN */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>📋 What to Expect</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {casualData.menuCategories.map((cat, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12, textAlign: 'center' }}>
                        <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 4 }}>{cat.name}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', marginBottom: 4 }}>{cat.items} items</div>
                        <div style={{ color: '#4ADE80', fontSize: '11px', fontWeight: 700 }}>{cat.avgPrice}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. ATMOSPHERE & BUSY TIMES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Vibe & Atmosphere</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>
                      {casualData.atmosphere.seatingStyle}. {casualData.atmosphere.familyFriendly && '✓ Family-friendly with kids menu & facilities.'} 
                      Perfect for quick lunch breaks, family outings, or casual group hangouts.
                    </p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>🕐 Busy vs. Quiet Times</div>
                    <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
                      <div style={{ color: '#ff6b6b', marginBottom: 4 }}>
                        <strong>Busy:</strong> <span style={{ color: TEXT_MUTED }}>{casualData.atmosphere.busyTimes}</span>
                      </div>
                      <div style={{ color: '#4ADE80' }}>
                        <strong>Quiet:</strong> <span style={{ color: TEXT_MUTED }}>{casualData.atmosphere.quietestTimes}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. LOYALTY & REWARDS */}
                <div>
                  <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>⭐ Loyalty & Extras</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {casualData.loyaltyOptions.map((loyalty, idx) => (
                      <div key={idx} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 12 }}>
                        <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 4 }}>✓ {loyalty.name}</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '11px' }}>{loyalty.benefit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {isFineDining && !isPlatinum && (
              <section>
                <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  👨‍🍳 Fine Dining Excellence
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Chef's Tasting Menu</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>6-8 course seasonal tasting menu. Chef's selection showcasing local ingredients and contemporary techniques.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Wine Pairing</div>
                <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Sommelier-selected wine pairings. International and local selections. Pairing expertise for dietary needs.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Elegant Ambiance</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Refined interiors. Attention to detail. Soft lighting, ambient music, and thoughtful table settings.</p>
                  </div>
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8 }}>Private Dining</div>
                    <p style={{ color: TEXT_MUTED, fontSize: '14px', lineHeight: 1.6 }}>Private rooms for intimate dinners and celebrations. Custom menus available. Advance reservations required.</p>
                  </div>
                </div>
              </section>
            )}

            {/* ============ DIETARY SPECIALIZATIONS ============ */}
            <section>
              <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Dietary Options
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {dietaryOptions.map((diet, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 999,
                      border: `1px solid ${GOLD}`,
                      color: GOLD,
                      background: 'transparent',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'default'
                    }}
                  >
                    {diet.label.replace(' Options','')}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: 12, background: 'rgba(201,162,77,0.05)', border: `1px solid ${BORDER}`, borderRadius: '8px', fontSize: '12px', color: TEXT_MUTED }}>
                ✓ All dietary requirements accommodated. Please notify staff of allergies at time of ordering.
              </div>
            </section>

            {/* ============ 6. MENU (COMPACT - EXPANDABLE WITH ANIMATION) ============ */}
            {!isPlatinum && menuExpanded && (
              <div className="menu-slide-in" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Full Menu
                  </div>
                  <button
                    onClick={() => setMenuExpanded(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: TEXT_MUTED,
                      fontSize: '20px',
                      cursor: 'pointer',
                      transition: 'color 200ms',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = TEXT_MUTED; }}
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-6">
                  {Object.entries(menuSections).map(([category, items]: [string, any[]]) => (
                    <div key={category}>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {category}
                      </div>
                      <div className="space-y-2">
                        {items.slice(0, 8).map((item: any) => (
                          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', paddingBottom: 8, borderBottom: `1px solid ${BORDER}` }}>
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: TEXT_WHITE }}>
                                {item.name}
                              </div>
                              <div style={{ fontSize: '11px', color: TEXT_MUTED, marginTop: 2 }}>
                                {item.description || 'House specialty'}
                              </div>
                            </div>
                            <div style={{ color: GOLD, fontWeight: 700, fontSize: '12px', marginLeft: 12, whiteSpace: 'nowrap' }}>
                              R{item.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isPlatinum && !menuExpanded && (
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16, textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                  {/* Menu PDF actions */}
                  {eatery.menuLinks?.menuPdf && (
                    <a href={eatery.menuLinks.menuPdf} target="_blank" rel="noreferrer" style={{ padding: '10px 16px', borderRadius: 8, border: `1px solid ${GOLD}`, color: GOLD, textDecoration: 'none', fontWeight: 700 }}>
                      View Menu
                    </a>
                  )}
                  {eatery.menuLinks?.seasonalMenu && (
                    <a href={eatery.menuLinks.seasonalMenu} target="_blank" rel="noreferrer" style={{ padding: '10px 16px', borderRadius: 8, border: `1px solid ${GOLD}`, color: GOLD, textDecoration: 'none', fontWeight: 700 }}>
                      Seasonal Menu
                    </a>
                  )}
                  {eatery.menuLinks?.wineListPdf && (
                    <a href={eatery.menuLinks.wineListPdf} target="_blank" rel="noreferrer" style={{ padding: '10px 16px', borderRadius: 8, border: `1px solid ${GOLD}`, color: GOLD, textDecoration: 'none', fontWeight: 700 }}>
                      Wine List
                    </a>
                  )}
                  {/* Fallback to full menu expand if no PDFs provided */}
                  {!eatery.menuLinks && (
                    <button onClick={() => setMenuExpanded(true)} style={{ padding: '10px 16px', borderRadius: 8, border: `1px solid ${GOLD}`, color: GOLD, background: 'transparent', fontWeight: 700 }}>
                      View Full Menu
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Signature Dishes removed for editorial PLATINUM presentation */}

            {/* Reviews / social proof intentionally removed for editorial PLATINUM presentation. */}

            {/* ============ 8. LOCATION & MAP ============ */}
            <section>
              <div style={{ marginBottom: 16, color: GOLD, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Location
              </div>
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', overflow: 'hidden' }}>
                {/* Leaflet Map with OpenStreetMap (no API key required) */}
                <iframe
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 'none', background: '#050505' }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${-24.8 - 0.01},${-30.9 - 0.01},${-24.8 + 0.01},${-30.9 + 0.01}&layer=mapnik&marker=${-30.9},-24.8`}
                ></iframe>
              </div>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                  <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>Address</div>
                  <div style={{ color: TEXT_MUTED, fontSize: '13px', lineHeight: 1.6 }}>
                    {typeof eatery.location === 'string' ? eatery.location : `${eatery.location.area}, Sabie, 1260, South Africa`}
                  </div>
                </div>
                <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                  <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>Parking</div>
                  <div style={{ color: TEXT_MUTED, fontSize: '13px', lineHeight: 1.6 }}>
                    <div>🅿 Secure valet available</div>
                    <div>🅿 Free on-site parking</div>
                    <div>♿ Accessible spaces</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ============ RIGHT SIDEBAR (STICKY) ============ */}
          <aside className="space-y-6" style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            {/* ============ 7. RESERVATION SYSTEM ============ */}
            {!isPlatinum && (
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 20 }}>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Reservation Requests
                </div>
                <div style={{ marginBottom: 16, color: TEXT_MUTED, fontSize: '13px', lineHeight: 1.6 }}>
                  Send your reservation request directly to the venue. They will confirm availability and details.
                </div>
                <button
                  onClick={openContact}
                  className="w-full py-3 rounded-lg font-semibold transition hover:shadow-lg"
                  style={{ background: GOLD, color: BG_BLACK, boxShadow: `0 6px 20px rgba(201,162,77,0.15)` }}
                >
                  Request Reservation
                </button>
              </div>
            )}

            {/* ============ 11. CONTACT INFORMATION ============ */}
            {!isPlatinum && (
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 20 }}>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>
                  Contact
                </div>
                <div className="space-y-3">
                  {eatery.contactOptions?.call && (
                    <a
                      href={`tel:${eatery.contactOptions.call}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition"
                      style={{ background: BG_BLACK, border: `1px solid ${BORDER}`, color: TEXT_WHITE, textDecoration: 'none' }}
                    >
                      <Phone size={16} style={{ color: GOLD }} />
                      <span style={{ fontSize: '13px' }}>Call</span>
                    </a>
                  )}
                  {eatery.contactOptions?.whatsapp && (
                    <a
                      href={eatery.contactOptions.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:opacity-90 transition"
                      style={{ background: GOLD, color: BG_BLACK, textDecoration: 'none', fontWeight: 600 }}
                    >
                      <MessageCircle size={16} />
                      <span style={{ fontSize: '13px' }}>WhatsApp</span>
                    </a>
                  )}
                  {eatery.contactOptions?.email && (
                    <a
                      href={`mailto:${eatery.contactOptions.email}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition"
                      style={{ background: BG_BLACK, border: `1px solid ${BORDER}`, color: TEXT_WHITE, textDecoration: 'none' }}
                    >
                      <Globe size={16} style={{ color: GOLD }} />
                      <span style={{ fontSize: '13px' }}>Email</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* CONTACT SIDE-MODAL TRIGGER removed per request */}

            {/* ============ 10. SOCIAL & DIGITAL PRESENCE ============ */}
            <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 20 }}>
              <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>
                Follow Us
              </div>
              <div className="flex gap-3">
                <a href="#" className="p-3 rounded-lg hover:bg-white/5 transition" style={{ background: BG_BLACK, border: `1px solid ${BORDER}`, color: GOLD }}>
                  <Instagram size={18} />
                </a>
                <a href="#" className="p-3 rounded-lg hover:bg-white/5 transition" style={{ background: BG_BLACK, border: `1px solid ${BORDER}`, color: GOLD }}>
                  <Facebook size={18} />
                </a>
                <a href="#" className="p-3 rounded-lg hover:bg-white/5 transition" style={{ background: BG_BLACK, border: `1px solid ${BORDER}`, color: GOLD }}>
                  <Globe size={18} />
                </a>
              </div>
            </div>

            {/* ============ PHASE 2: PAYMENT METHODS ============ */}
            {!isPlatinum && (
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 16 }}>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Payment
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {paymentMethods.map((method) => (
                    <div key={method.label} title={method.label} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: `1px solid ${BORDER}`, background: BG_BLACK, color: GOLD }}>
                      <span style={{ fontSize: 16 }}>{method.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============ PHASE 2: EVENTS & FUNCTIONS ============ */}
            {!isPlatinum && (
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 20 }}>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Events & Functions
                </div>
                <div className="space-y-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: TEXT_MUTED }}>Available for events</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: GOLD }}>✓ Yes</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: TEXT_MUTED }}>Max capacity</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: GOLD }}>{eventsInfo.maxCapacity} guests</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: TEXT_MUTED }}>Private spaces</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: GOLD }}>{eventsInfo.privateSpaces}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: TEXT_MUTED }}>Min guests (budget)</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: GOLD }}>{eventsInfo.minGuestsBudget}</span>
                  </div>

                  {/* Event Types */}
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: 8, textTransform: 'uppercase', fontWeight: 700 }}>
                      Event Types
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {eventsInfo.eventTypes.map((type) => (
                        <span
                          key={type}
                          style={{
                            padding: '4px 10px',
                            background: BG_BLACK,
                            border: `1px solid ${BORDER}`,
                            borderRadius: '20px',
                            fontSize: '11px',
                            color: GOLD,
                            fontWeight: 600,
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Serving Styles */}
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: 8, textTransform: 'uppercase', fontWeight: 700 }}>
                      Serving Styles
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {eventsInfo.servingStyles.map((style) => (
                        <span
                          key={style}
                          style={{
                            padding: '4px 10px',
                            background: BG_BLACK,
                            border: `1px solid ${BORDER}`,
                            borderRadius: '20px',
                            fontSize: '11px',
                            color: GOLD,
                            fontWeight: 600,
                          }}
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openContact()}
                    className="w-full mt-4 py-2 rounded-lg font-semibold transition"
                    style={{
                      background: BG_BLACK,
                      border: `2px solid ${GOLD}`,
                      color: GOLD,
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = BG_BLACK; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = BG_BLACK; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
                  >
                    Inquire for Events
                  </button>
                </div>
              </div>
            )}

            {/* ============ ACCESSIBILITY INFORMATION (COLLAPSIBLE) ============ */}
            {!isPlatinum && (
              <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: 12 }}>
                <button onClick={() => setShowAccessibility(s => !s)} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div>
                    <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accessibility</div>
                    <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>Tap to view details</div>
                  </div>
                  <div style={{ color: GOLD, fontSize: '14px' }}>{showAccessibility ? '▲' : '▼'}</div>
                </button>
                {showAccessibility && (
                  <div style={{ marginTop: 8, padding: 12, background: 'rgba(0,0,0,0.35)', borderRadius: 8 }}>
                    <div className="space-y-3">
                      <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                        <div style={{ fontSize: '18px', width: 24, textAlign: 'center' }}>♿</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>{accessibilityInfo.entrance}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                        <div style={{ fontSize: '18px', width: 24, textAlign: 'center' }}>🚗</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>{accessibilityInfo.parking}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                        <div style={{ fontSize: '18px', width: 24, textAlign: 'center' }}>🚻</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>{accessibilityInfo.restroom}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                        <div style={{ fontSize: '18px', width: 24, textAlign: 'center' }}>👥</div>
                        <div style={{ color: TEXT_MUTED, fontSize: '12px', lineHeight: 1.5 }}>Max group size: {accessibilityInfo.maxParty} guests</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Decorative divider (previously Platinum Collection strip removed) */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(201,162,77,0.06), transparent)', margin: '8px 0 16px' }} />

            {/* Save/Bookmark */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-full py-3 rounded-lg font-semibold transition hover:bg-white/10"
              style={{ border: `1px solid ${GOLD}`, color: GOLD, background: isSaved ? 'rgba(201,162,77,0.1)' : 'transparent' }}
            >
              <Bookmark size={16} className="inline mr-2" /> {isSaved ? 'Saved' : 'Save'}
            </button>
          </aside>
        </div>

        {/* ============ 14. RELATED EATERIES ============ */}
        {eateries && eateries.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}` }}>
              <div style={{ marginBottom: 24 }}>
              <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                More Dining — Handpicked by LowveldHub
              </div>
              <div style={{ fontSize: '22px', fontWeight: 600, color: TEXT_WHITE }}>
                Editor's Picks
              </div>
              <div className="mt-3 text-xs text-gray-400">LowveldHub editorial — Designed to inspire bookings. Photography remains the hero; content is concise and timeless.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
              {eateries
                .filter(e => e.id !== eatery.id && e.category === eatery.category && e.location === eatery.location)
                .slice(0, 4)
                .map(e => (
                  <div
                    key={e.id}
                    onClick={() => navigate('eatery-detail', undefined, e.id)}
                    style={{
                      borderRadius: 24,
                      background: PANEL_BLACK,
                      border: `1px solid ${BORDER}`,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 300ms ease, box-shadow 300ms ease',
                      padding: 20,
                      transform: 'translateY(0)'
                    }}
                    onMouseEnter={(ev) => {
                      const el = ev.currentTarget as HTMLDivElement;
                      el.style.borderColor = GOLD;
                      el.style.background = 'rgba(201,162,77,0.05)';
                      el.style.transform = 'translateY(-4px)';
                      el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.45)';
                    }}
                    onMouseLeave={(ev) => {
                      const el = ev.currentTarget as HTMLDivElement;
                      el.style.borderColor = BORDER;
                      el.style.background = PANEL_BLACK;
                      el.style.transform = 'translateY(0)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <img
                      src={(e as any).images && (e as any).images.length ? (e as any).images[0] : 'https://via.placeholder.com/400x260'}
                      alt={e.name}
                      style={{
                        width: '100%',
                        height: 220,
                        objectFit: 'cover',
                        borderRadius: 12,
                        marginBottom: 14
                      }}
                    />
                    <div style={{ color: TEXT_WHITE, fontWeight: 600, fontSize: '13px', marginBottom: 6 }}>
                      {e.name}
                    </div>
                    <div style={{ color: TEXT_MUTED, fontSize: '12px' }}>
                      📍 {e.location}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

          {/* Contact Modal (side panel) */}
          {isContactOpen && (
            <div className="fixed right-6 top-16 z-60" style={{ width: 420, maxWidth: 'calc(100% - 48px)' }}>
              <div style={{ background: BG_BLACK, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 18, boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: TEXT_WHITE }}>Contact {eatery.name}</div>
                  <button onClick={() => setContactOpen(false)} className="p-2 rounded-md hover:bg-white/5 transition" aria-label="Close">
                    <X color={GOLD} />
                  </button>
                </div>

                <div style={{ color: TEXT_MUTED, marginBottom: 12, fontSize: 13 }}>A discreet way to reach the venue — quick enquiries and private requests.</div>

                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <a href={`tel:${eatery.contactOptions?.call || ''}`} className="flex-1 py-2 rounded-md text-center" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}`, color: TEXT_WHITE }}>Call</a>
                  <a href={eatery.contactOptions?.whatsapp || '#'} target="_blank" rel="noreferrer" className="flex-1 py-2 rounded-md text-center" style={{ background: GOLD, color: BG_BLACK, fontWeight: 800 }}>WhatsApp</a>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setContactOpen(false); }}>
                  <input placeholder="Your name" required className="w-full mb-2 p-3 rounded-md" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, color: TEXT_WHITE }} />
                  <input placeholder="Contact (phone or email)" required className="w-full mb-2 p-3 rounded-md" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, color: TEXT_WHITE }} />
                  <textarea placeholder="Message (optional)" className="w-full mb-3 p-3 rounded-md" rows={3} style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, color: TEXT_WHITE }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <button type="submit" className="flex-1 py-3 rounded-md font-bold" style={{ background: GOLD, color: BG_BLACK }}>Send Request</button>
                    <button type="button" onClick={() => setContactOpen(false)} className="flex-1 py-3 rounded-md" style={{ border: `1px solid ${BORDER}`, color: TEXT_WHITE, background: 'transparent' }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        {/* ============ 15. FOOTER TRANSITION ============ */}
          <div style={{ marginTop: 48, paddingTop: 20, borderTop: `1px solid ${BORDER}`, textAlign: 'center' }}>
          <div style={{ color: TEXT_MUTED, fontSize: '13px', marginBottom: 8, letterSpacing: '0.02em' }}>
            Handpicked by <strong style={{ color: GOLD, fontWeight: 600 }}>LowveldHub</strong>
          </div>
          <div style={{ color: GOLD, fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Excellence is expected.
          </div>
        </div>
      </div>

      {/* Contact modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={closeContact}>
          <div style={{ width: '100%', maxWidth: 480, borderRadius: 16, background: PANEL_BLACK, border: `1px solid ${BORDER}`, padding: 32 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '12px', color: TEXT_MUTED, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: TEXT_WHITE }}>{eatery.name}</h2>
            </div>
            <div className="space-y-3">
              {eatery.contactOptions?.call && (
                <a
                  href={`tel:${eatery.contactOptions.call}`}
                  style={{ display: 'block', padding: '14px 16px', borderRadius: 8, background: BG_BLACK, border: `1px solid ${BORDER}`, color: TEXT_WHITE, textAlign: 'center', fontWeight: 600, textDecoration: 'none' }}
                >
                  📞 Call {eatery.contactOptions.call}
                </a>
              )}
              {eatery.contactOptions?.whatsapp && (
                <a
                  href={eatery.contactOptions.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'block', padding: '14px 16px', borderRadius: 8, background: GOLD, color: BG_BLACK, textAlign: 'center', fontWeight: 700, textDecoration: 'none' }}
                >
                  WhatsApp Message
                </a>
              )}
              {eatery.contactOptions?.email && (
                <a
                  href={`mailto:${eatery.contactOptions.email}`}
                  style={{ display: 'block', padding: '14px 16px', borderRadius: 8, background: BG_BLACK, border: `1px solid ${BORDER}`, color: TEXT_WHITE, textAlign: 'center', fontWeight: 600, textDecoration: 'none' }}
                >
                  ✉️ Email
                </a>
              )}
            </div>
            <button
              onClick={closeContact}
              style={{ marginTop: 16, width: '100%', padding: '12px', background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT_WHITE, borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EateryDetail;
