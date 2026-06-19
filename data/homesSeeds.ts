import { ListingTier, SubscriptionDuration, Category } from '../types';

// REALISTIC PROPERTY TITLES - Property24 Style
export const luxuryHomesAndVillas = [
  {
    id: 'h_lux_001',
    name: 'Kruger Gateway Lodge',
    category: Category.Homes,
    subcategory: 'Houses',
    tier: ListingTier.Platinum,
    location: 'The Rest Nature Estate, Mbombela',
    rating: 4.9,
    reviewCount: 2,
    description: 'Stunning contemporary estate home featuring floor-to-ceiling windows, open-plan living, wine cellar, and state-of-the-art smart home technology. Situated in one of Mpumalanga\'s most prestigious estates with panoramic Lowveld views.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    phone: '+27 13 754 2890',
    email: 'james.whitmore@pamgolding.co.za',
    website: 'www.pamgolding.co.za',
    author: 'James Whitmore',
    price: 8500000,
    bedrooms: 5,
    bathrooms: 4,
    garages: 3,
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Modern', 'Smart Home', 'Estate', 'Luxury'],
    logo: '�',
    priceLevel: 'R 8,500,000'
  },
  // Note: Additional luxury listings removed per request (White River Country Estate, Riverside Family Home)
];

// FAMILY HOMES
export const modernApartments = [
  // Note: Family/apartment listings removed per request (Signature Residence, Executive Penthouse, Secure Family Residence, Investment Townhouse Complex)
];

// TOWNHOUSES & COMPLEXES
export const townhousesAndComplexes = [
  // Additional townhouse listings removed per request
];

// HOME DECOR & DESIGN STUDIOS
export const homeDecorDesignStudios = [
  // Removed 'Luxe Interiors by Design' per request.
];
