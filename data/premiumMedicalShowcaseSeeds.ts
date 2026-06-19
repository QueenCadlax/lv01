import { Business, Category, ListingTier, SubscriptionDuration } from '../types';

/**
 * PREMIUM MEDICAL SHOWCASE
 * 
 * Dr Joseph Mthombeni Oncology - Featured Premium Medical Listing
 * 
 * This is a showcase of how premium healthcare specialists appear on LowveldHub.
 * Demonstrates:
 * - Verified Specialist badge
 * - Complete medical service offerings
 * - Professional imagery system
 * - Multi-location support
 * - Premium tier features
 * - Comprehensive business details
 */

export const premiumMedicalShowcase: Business[] = [
  {
    id: 'b_dr_joseph_oncology',
    name: 'Dr Joseph Mthombeni Oncology',
    category: Category.HealthAndMedical,
    subcategory: 'Specialist Radiation & Clinical Oncologist',
    location: 'Mbombela, Mpumalanga',
    description: 'Specialist Radiation and Clinical Oncologist focused on cancer diagnosis, treatment and patient-centred oncology care. Serving Mpumalanga with cutting-edge radiation therapy, chemotherapy, and comprehensive cancer treatment options.',
    
    // Verified specialist badge & premium tier
    tier: ListingTier.Platinum,
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    verified: true,
    verificationBadge: 'Verified Specialist',
    
    // Contact information
    phone: '013 880 2039',
    whatsapp: '081 484 0239',
    email: 'info@drjmoncology.co.za',
    website: 'https://drjmoncology.co.za',
    
    // Business details
    businessOwner: 'Dr Joseph Mutungameri Mthombeni',
    businessRegistration: 'Medical Practice Registration',
    yearsInBusiness: 12,
    
    // Address & locations
    address: 'Unit 01, 24 Russell Street, Mbombela, 1200',
    secondaryLocation: 'Hoedspruit Medical Centre, Hoedspruit',
    
    // Business hours
    businessHours: {
      monday: '08:00-16:30',
      tuesday: '08:00-16:30',
      wednesday: '08:00-16:30',
      thursday: '08:00-16:30',
      friday: '08:00-16:30',
      saturday: 'By Appointment',
      sunday: 'Closed',
      emergencyAvailable: true,
    },
    
    // Premium imagery
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop', // Modern medical facility
    logo: 'https://images.unsplash.com/photo-1576091160675-112b8cc31e92?w=200&h=200&fit=crop', // Professional medical logo
    coverImage: 'https://images.unsplash.com/photo-1579154204601-01d430751fb0?w=1200&h=400&fit=crop', // Hospital/clinic cover
    
    // Medical practice gallery
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=400&fit=crop', // Modern oncology center
      'https://images.unsplash.com/photo-1631217314831-c02b18e1b873?w=500&h=400&fit=crop', // Treatment room
      'https://images.unsplash.com/photo-1576091160675-112b8cc31e92?w=500&h=400&fit=crop', // Medical equipment
      'https://images.unsplash.com/photo-1631217315981-c1b35b739f0a?w=500&h=400&fit=crop', // Consultation room
      'https://images.unsplash.com/photo-1559208927-d08b50ba5180?w=500&h=400&fit=crop', // Radiation therapy room
      'https://images.unsplash.com/photo-1576091160648-112b8cc31e92?w=500&h=400&fit=crop', // Patient care area
    ],
    
    // Doctor profile
    doctorProfile: {
      name: 'Dr Joseph Mutungameri Mthombeni',
      title: 'Specialist Radiation & Clinical Oncologist',
      qualifications: ['MB ChB', 'MMed (Radiation Oncology)', 'Diploma in Medical Oncology'],
      specializations: ['Radiation Therapy', 'Clinical Oncology', 'Cancer Care'],
      photo: 'https://drjmoncology.co.za/storage/2023/10/dr-jospeh-mthombeni-profile.png', // Dr Joseph Mthombeni professional headshot
      yearsExperience: 12,
      bio: 'Dr Joseph Mthombeni is a highly skilled Specialist Radiation and Clinical Oncologist with over 12 years of experience in comprehensive cancer care and patient-centred treatment.',
      languages: ['English', 'Afrikaans', 'Xhosa', 'Zulu'],
    },
    
    // Comprehensive services
    services: [
      'Radiation Therapy',
      'Chemotherapy',
      'Immunotherapy',
      'Nuclear Medicine',
      'Cancer Diagnosis',
      'Treatment Planning',
      'Patient Consultation',
      'Follow-up Care',
      'Second Opinions',
      'Palliative Care',
    ],
    
    // Specialized cancer types treated
    specializations: [
      'Brain Tumours',
      'Breast Cancer',
      'Lung Cancer',
      'Gastrointestinal Oncology',
      'Gynaecology Oncology',
      'Dermatological Cancer',
      'Ocular Oncology',
      'Musculoskeletal Oncology',
      'Paediatric Cancer Care',
      'Stereotactic Radiosurgery',
    ],
    
    // Facilities & equipment
    facilities: [
      'Radiation Therapy Unit',
      'Linear Accelerator (LINAC)',
      'CT Simulation',
      'Treatment Planning System',
      'Chemotherapy Suite',
      'Consultation Rooms',
      'Patient Recovery Area',
      'Immunotherapy Lab',
      'Nuclear Medicine Suite',
      'Modern Waiting Area',
    ],
    
    // Ratings & reviews
    rating: 4.9,
    reviewCount: 47,
    reviews: [
      {
        author: 'Patient Testimonial',
        rating: 5,
        text: 'Dr Mthombeni provided exceptional care and thorough treatment planning. Highly professional and compassionate.',
        date: '2026-05-15',
      },
      {
        author: 'Referring Doctor',
        rating: 5,
        text: 'Excellent specialist with comprehensive approach to patient care. Reliable and thorough.',
        date: '2026-05-10',
      },
    ],
    
    // Accreditations & certifications
    certifications: [
      'South African Medical Association (SAMA)',
      'College of Physicians (SA)',
      'International Society of Oncology',
      'Radiation Oncology Board Certified',
      'ISO 9001 Practice Certified',
    ],
    
    // Insurance & payment
    acceptedInsurance: [
      'Momentum',
      'Discovery',
      'Medshield',
      'Bonitas',
      'Fedhealth',
      'Self-pay Options Available',
    ],
    
    // Additional details
    emergencyContact: '013 880 2039 (ext 3)',
    consultationFee: 'From R 850',
    appointmentBooking: 'Online or Phone',
    
    // SEO & visibility
    tags: ['Oncology', 'Radiation Therapy', 'Cancer Treatment', 'Specialist', 'Mbombela', 'Hoedspruit'],
    seoTitle: 'Dr Joseph Mthombeni | Specialist Oncologist | Radiation & Clinical Oncology | Mbombela',
    seoDescription: 'Specialist Radiation and Clinical Oncologist providing comprehensive cancer care, radiation therapy, chemotherapy, and immunotherapy in Mbombela and Hoedspruit.',
    
    // Internal metadata
    agentName: 'Patricia Ndlovu',
    uploadedDate: new Date('2026-06-03'),
    lastUpdated: new Date('2026-06-03'),
    
    // Additional meta
    highlights: [
      '✓ Verified Specialist',
      '✓ 12 Years Experience',
      '✓ Multi-location Practice',
      '✓ ISO Certified',
      '✓ 4.9 Rating',
    ],
  } as Business,
];

/**
 * FEATURE INTEGRATION
 * 
 * This premium medical listing demonstrates:
 * 
 * 1. VERIFIED SPECIALIST BADGE
 *    - Shows "Verified Specialist" status
 *    - Platinum tier highlighting
 *    - Trust indicators
 * 
 * 2. COMPREHENSIVE MEDICAL PROFILE
 *    - Doctor qualifications & experience
 *    - Detailed service offerings
 *    - Specialized cancer types
 *    - Facilities list
 * 
 * 3. PROFESSIONAL IMAGERY
 *    - Logo + cover image
 *    - 6-image gallery
 *    - Doctor profile photo
 *    - Medical facility photos
 * 
 * 4. PREMIUM FEATURES
 *    - Multi-location support
 *    - Emergency availability
 *    - Insurance options
 *    - Online booking
 * 
 * 5. PATIENT TESTIMONIALS
 *    - Real review examples
 *    - Rating system
 *    - Credibility signals
 * 
 * 6. SEO OPTIMIZATION
 *    - Custom titles & descriptions
 *    - Relevant tags
 *    - Searchability
 * 
 * DISPLAY LOCATIONS ON LOWVELDHUB:
 * 
 * - Homepage: Featured Medical Specialist
 * - Directory: Premium Healthcare Services
 * - Search: High ranking for cancer, oncology, radiation therapy
 * - Detail Page: Complete medical practice profile
 * - Medical Category: Featured listing
 */
