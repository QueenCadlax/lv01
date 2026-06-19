import { ListingTier, SubscriptionDuration, Category } from '../types';

// ESTATE AGENTS
export const estateAgents = [
  {
    id: 'ea_001',
    name: 'Mpumalanga Premium Property Group',
    category: Category.RealEstateAndProperty,
    subcategory: 'Estate Agents',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 678,
    description: 'Luxury real estate agency specializing in premium properties, estate sales, and personalized buyer-seller matching with exclusive market access.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    phone: '+27 13 754 5678',
    email: 'agents@mmpg.co.za',
    website: 'www.mmpg.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Luxury Properties', 'Estate Sales', 'Buyer Matching'],
    logo: '🏢'
  },
  {
    id: 'ea_002',
    name: 'Prestige Real Estate Solutions',
    category: Category.RealEstateAndProperty,
    subcategory: 'Estate Agents',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 534,
    description: 'Full-service estate agency offering property consultation, market analysis, negotiation, and seamless transaction management for premium properties.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    phone: '+27 13 752 3456',
    email: 'info@prestigere.co.za',
    website: 'www.prestigere.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Property Consultation', 'Market Analysis', 'Transaction Management'],
    logo: '🏠'
  }
];

// PROPERTY RENTALS
export const propertyRentals: any[] = [];

// COMMERCIAL PROPERTY
export const commercialProperty: any[] = [];

// PROPERTY MANAGEMENT & TENANTS
export const propertyManagementAndTenants: any[] = [];

// LAND & PLOTS
export const landAndPlots: any[] = [];

// LUXURY HOMES & VILLAS
export const luxuryHomesAndVillas: any[] = [];

// APARTMENTS & LOFTS
export const apartmentsAndLofts: any[] = [];
