import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// LEGAL SERVICES - Category.LegalAndAdvisory
export const legalServices: Business[] = [];

// ACCOUNTING & TAX - Category.BusinessGrowthAndConsulting
export const accountingAndTax: Business[] = [];

// CONSULTANTS
export const consultants: Business[] = [];

// MARKETING & ADVERTISING
export const marketingAndAdvertising: Business[] = [];

// TECH & IT SERVICES
export const techAndITServices: Business[] = [];

// ARCHITECTS & INTERIOR DESIGNERS
export const architectsAndDesigners: Business[] = [];

// BUSINESS BROKERS & INVESTMENT ADVISORS
export const businessBrokersAndAdvisors: Business[] = [];

// LIFE COACHES & MENTORS
export const lifeCoachesAndMentors: Business[] = [];

// TRANSLATION & LANGUAGE SERVICES
export const translationAndLanguageServices: Business[] = [];

// PR & MEDIA CONSULTANTS
export const prAndMediaConsultants: Business[] = [
  {
    id: 'bps_pr_001',
    name: 'Mpumalanga Strategic PR & Media',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'PR & Media Consultants',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 401,
    description: 'Top-tier PR and media consulting firm. Crisis management, brand positioning, and media relations expertise for corporate and celebrity clients.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 753 3000',
    email: 'pr@mpumalangastratégic.co.za',
    website: 'www.mpumalangastratégic.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['PR', 'Media Relations', 'Crisis Management', 'Brand Positioning', 'Executive']
  },
  {
    id: 'bps_pr_002',
    name: 'Lowveld Communications Experts',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'PR & Media Consultants',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 289,
    description: 'Professional PR, media relations, and communications strategy. Press releases, media placement, and public relations management for businesses.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 741 4000',
    email: 'comms@lowveldexpertise.co.za',
    website: 'www.lowveldexpertise.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['PR', 'Communications', 'Media Relations', 'Public Relations', 'Professional']
  }
];

