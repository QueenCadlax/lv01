import { Eatery } from '../types';

export const eateries: Eatery[] = [
  {
    id: 'e_orange_001',
    name: 'Orange Restaurant',
    category: 'Contemporary Dining',
    cuisine: ['Modern South African', 'European', 'Grill'],
    location: { area: 'Mbombela', city: 'Mbombela', province: 'Mpumalanga' },
    images: [
      'https://www.eatatorange.co.za/wp-content/uploads/2023/02/Francolin-lodge-401.jpg',
      'https://www.eatatorange.co.za/wp-content/uploads/2023/02/Francolin-lodge-341.jpg',
      'https://www.eatatorange.co.za/wp-content/uploads/2023/02/Francolin-lodge-281.jpg'
    ],
    hero: {
      layout: 'split',
      slideshow: true,
      autoplayMs: 5000,
      transition: 'fade',
      rounded: true,
      arrows: false,
      dots: true
    },
    description: 'Beautiful food that celebrates luxury, simplicity and exceptional flavour in an elegant setting overlooking the Lowveld.',
    features: [
      'Signature Dining',
      'Seasonal Menus',
      'Curated Wine Collection',
      'Private Celebrations',
      'Cocktail Lounge'
    ],
    menuLinks: {
      menuPdf: 'https://www.eatatorange.co.za/wp-content/uploads/2025/10/ORANGE-RESTAURANT-MENU-2025.pdf',
      wineListPdf: 'https://www.eatatorange.co.za/wp-content/uploads/2025/10/ORANGE-RESTAURANT-WINE-LIST-2025.pdf'
    },
    amenities: [
      'Indoor Dining',
      'Outdoor Terrace',
      'Cocktail Bar',
      'Private Events',
      'Free WiFi',
      'Free Parking',
      'Wheelchair Accessible',
      'Reservations Accepted',
      'Air Conditioning'
    ],
    perfectFor: ['Business Lunches', 'Romantic Dinners', 'Family Celebrations', 'Corporate Functions', 'Special Occasions'],
    priceRange: '$$$',
    // Intentionally omit rating/reviewCount/guest reviews to keep the page editorial as requested
    contactOptions: {
      reserve: '',
      call: '+27 13 740 0000',
      whatsapp: '+27 82 740 0000',
      email: 'info@eatatorange.co.za',
      directions: '',
      website: 'https://www.eatatorange.co.za'
    },
    dineIn: true,
    takeaway: false,
    delivery: false,
    verified: true,
    premiumTier: 'Platinum Collection',
    visualStyle: {
      background: 'black',
      accent: 'champagne-gold',
      typography: 'small',
      imageFirst: true
    }
  },
  
  {
    id: 'e_mixolog_001',
    name: "MIXOLO'G",
  category: 'Fine Dining',
    cuisine: ['Contemporary', 'Cocktails', 'Fine Dining'],
    location: { area: 'Mbombela', city: 'Mbombela', province: 'Mpumalanga' },
    images: [
      'https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-1-scaled.webp',
      'https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-5-scaled.webp',
      'https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-4-scaled.webp',
      'https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-13-scaled.webp',
      'https://www.mixologmbombela.co.za/wp-content/uploads/2026/03/MixoloG-Food-11-768x546-1.webp',
      'https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Food-18-scaled.webp',
      'https://www.mixologmbombela.co.za/wp-content/uploads/2025/11/MixoloG-Interior-34-scaled.webp'
    ],
    hero: {
      layout: 'split',
      slideshow: true,
      autoplayMs: 5000,
      transition: 'fade',
      rounded: true,
      arrows: false,
      dots: true
    },
    description: "An immersive dining and cocktail destination where contemporary cuisine, handcrafted drinks and sophisticated interiors come together in one unforgettable experience.",
    features: ['Signature Cocktails', "Chef's Selection", 'Private Dining', 'Live Sessions'],
    // Minimal contact options and editorial-first fields
    contactOptions: {
      reserve: '',
      call: '+27 13 700 1234',
      whatsapp: '+27 82 700 1234',
      email: 'info@mixologmbombela.co.za',
      directions: '',
      website: 'https://www.mixologmbombela.co.za'
    },
    priceRange: '$$$',
    dineIn: true,
    takeaway: false,
    delivery: false,
    verified: false,
    // Editorial tier label for PLATINUM
    premiumTier: 'Platinum Collection',
    visualStyle: {
      background: 'black',
      accent: 'champagne-gold',
      typography: 'minimal',
      imageFirst: true
    }
  }
];

