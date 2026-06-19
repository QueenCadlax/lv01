import React, { useState, useEffect, useMemo } from 'react';
import { Business } from '../types';
import { ArrowLeft, Heart, Share2, Phone, MessageCircle, Mail, ChevronLeft, ChevronRight, MapPin, Bed, Bath, Car, Ruler, Home } from 'lucide-react';

interface PropertyDetailViewPremiumProps {
  propertyId: string | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  properties: Business[];
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

// LowveldHub Luxury Color System - Sophisticated Black, Gold & Deep Grey
const COLORS = {
  bg: '#000000',              // Black background (page)
  sectionBg: '#0A0A0A',       // Deep black for cards (subtle lift)
  textPrimary: '#FFFFFF',     // White text
  textSecondary: '#E8E8E8',   // Off-white for secondary text
  textMuted: '#D4AF37',       // Gold for muted/labels
  borderLight: '#D4AF37',     // Gold borders
  borderDark: '#D4AF37',      // Gold borders
  accent: '#D4AF37',          // Gold accent
  accentHover: '#E8C547',     // Lighter gold on hover
  white: '#FFFFFF',           // White
  lightBg: '#000000',         // Black background
  cardBg: '#0A0A0A',          // Deep black for cards
  divider: '#D4AF37',         // Gold dividers
};

// Sample property amenities list
const COMMON_AMENITIES = [
  'Swimming Pool',
  'Wine Cellar',
  'Smart Home',
  'Golf Course Access',
  'Guest Cottage',
  'Security Estate',
  'Home Office',
  'Heated Pool',
  'Sauna',
  'Gym',
  'Cinema Room',
  'Entertainment Area',
];

// Sample similar properties (mock data) - WITH VARIETY IN DETAILS
const SAMPLE_SIMILAR_PROPERTIES: Business[] = [
  {
    id: 'p_sim_001',
    name: 'Macadamia Valley Estate',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop',
    category: 'Real Estate' as any,
    subcategory: 'Luxury Homes',
    location: 'Sabie',
    rating: 4.9,
    reviewCount: 8,
    tier: 'Elite' as any,
    description: 'Stunning property with mountain views',
    phone: '+27 82 XXX XXXX',
    email: 'info@agency.co.za',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 1850,
    agentName: 'Margaret Nkosi',
  } as any,
  {
    id: 'p_sim_002',
    name: 'Riverside Family Residence',
    image: 'https://images.unsplash.com/photo-1600566753086-00541c48a537?w=500&h=400&fit=crop',
    category: 'Real Estate' as any,
    subcategory: 'Luxury Homes',
    location: 'White River',
    rating: 4.8,
    reviewCount: 12,
    tier: 'Premium' as any,
    description: 'Elegant riverside property',
    phone: '+27 82 XXX XXXX',
    email: 'info@agency.co.za',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1200,
    agentName: 'Sarah de Klerk',
  } as any,
  {
    id: 'p_sim_003',
    name: 'Mountain View Estate',
    image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=400&fit=crop',
    category: 'Real Estate' as any,
    subcategory: 'Luxury Homes',
    location: 'Hazyview',
    rating: 4.7,
    reviewCount: 6,
    tier: 'Premium' as any,
    description: 'Panoramic mountain views',
    phone: '+27 82 XXX XXXX',
    email: 'info@agency.co.za',
    bedrooms: 6,
    bathrooms: 5,
    squareFeet: 2200,
    agentName: 'Andrew McKenzie',
  } as any,
];

// Agent database - diverse, professional agents
const PREMIUM_AGENTS = {
  'James Whitmore': { name: 'James Whitmore', agency: 'Pam Golding Properties', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces' },
  'Catherine Meyer': { name: 'Catherine Meyer', agency: 'Fine & Country Lowveld', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces' },
  'Robert van der Merwe': { name: 'Robert van der Merwe', agency: 'RE/MAX Lowveld', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces' },
  'Sarah de Klerk': { name: 'Sarah de Klerk', agency: 'Deo Volente Properties', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
  'Michael Thompson': { name: 'Michael Thompson', agency: 'Century 21 White River', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces' },
  'Patricia Ndlovu': { name: 'Patricia Ndlovu', agency: 'Keller Williams Lowveld', photo: 'https://images.unsplash.com/photo-1517841905240-23ded277549e?w=400&h=400&fit=crop&crop=faces' },
  'David Fourie': { name: 'David Fourie', agency: 'Chas Everitt Mpumalanga', photo: 'https://images.unsplash.com/photo-1507539066556-338dae4b3f9e?w=400&h=400&fit=crop&crop=faces' },
  'Susan Botha': { name: 'Susan Botha', agency: 'Lew Geffen Sotheby\'s International Realty', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c006ae30?w=400&h=400&fit=crop&crop=faces' },
  'Andrew McKenzie': { name: 'Andrew McKenzie', agency: 'Seeff Lowveld', photo: 'https://images.unsplash.com/photo-1500565061183-8d1fc6fdf4d9?w=400&h=400&fit=crop&crop=faces' },
  'Margaret Nkosi': { name: 'Margaret Nkosi', agency: 'Rawson Properties Mpumalanga', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' },
};

// Property to Agent mapping
const PROPERTY_AGENT_MAP: { [key: string]: string } = {
  'Kruger Gateway Lodge': 'James Whitmore',
  'White River Country Estate': 'Robert van der Merwe',
  'Riverside Family Home': 'Sarah de Klerk',
  'Signature Residence': 'Michael Thompson',
  'Executive Penthouse': 'Patricia Ndlovu',
  'Secure Family Residence': 'David Fourie',
  'Investment Townhouse Complex': 'Susan Botha',
  'Mountain View Estate': 'Andrew McKenzie',
  'Macadamia Valley Estate': 'Margaret Nkosi',
};

// Default agent
const DEFAULT_AGENT = { name: 'James Whitmore', agency: 'Pam Golding Properties', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces' };

// Mock agent data (would come from property.agentName, etc.)
const getAgentData = (property: Business) => {
  // First try to use the mapping based on property name
  const mappedAgent = PROPERTY_AGENT_MAP[property.name];
  if (mappedAgent && PREMIUM_AGENTS[mappedAgent as keyof typeof PREMIUM_AGENTS]) {
    const agent = PREMIUM_AGENTS[mappedAgent as keyof typeof PREMIUM_AGENTS];
    return {
      name: agent.name,
      title: 'Senior Luxury Property Consultant',
      agency: agent.agency,
      experience: '15 Years Experience',
      phone: '+27 82 XXX XXXX',
      email: `${agent.name.toLowerCase().replace(' ', '.')}@${agent.agency.toLowerCase().replace(/\s+/g, '')}.co.za`,
      photo: agent.photo,
    };
  }
  // Then try agentName property
  const agentName = (property as any).agentName;
  if (agentName && PREMIUM_AGENTS[agentName as keyof typeof PREMIUM_AGENTS]) {
    const agent = PREMIUM_AGENTS[agentName as keyof typeof PREMIUM_AGENTS];
    return {
      name: agent.name,
      title: 'Senior Luxury Property Consultant',
      agency: agent.agency,
      experience: '15 Years Experience',
      phone: '+27 82 XXX XXXX',
      email: `${agent.name.toLowerCase().replace(' ', '.')}@${agent.agency.toLowerCase().replace(/\s+/g, '')}.co.za`,
      photo: agent.photo,
    };
  }
  // Fallback to default
  return {
    name: DEFAULT_AGENT.name,
    title: 'Senior Luxury Property Consultant',
    agency: DEFAULT_AGENT.agency,
    experience: '15 Years Experience',
    phone: '+27 82 XXX XXXX',
    email: property.email || 'james.whitmore@email.com',
    photo: DEFAULT_AGENT.photo,
  };
};

// Extract property stats from business object
const getPropertyStats = (property: Business) => {
  const stats = {
    bedrooms: (property as any).bedrooms || 5,
    bathrooms: (property as any).bathrooms || 4,
    livingArea: (property as any).squareFeet || 2500,
    garages: (property as any).garages || 3,
    landSize: (property as any).landSize || 8500,
  };
  return stats;
};

const PropertyDetailViewPremium: React.FC<PropertyDetailViewPremiumProps> = ({
  propertyId,
  navigate,
  properties,
  favorites = [],
  toggleFavorite,
}) => {
  const property = properties.find(p => p.id === propertyId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [thumbnailScroll, setThumbnailScroll] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [propertyId]);

  useEffect(() => {
    setIsFavorited(favorites.includes(propertyId || ''));
  }, [propertyId, favorites]);

  if (!property) {
    return (
      <div style={{ background: COLORS.bg, minHeight: '100vh', paddingTop: 96 }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate('home-premium')}
            className="flex items-center gap-2 mb-6"
            style={{ color: COLORS.accent, fontSize: 14, fontWeight: 600 }}
          >
            <ArrowLeft size={18} /> Back to Properties
          </button>
          <div className="text-center py-12">
            <p style={{ color: COLORS.textMuted, fontSize: 16 }}>Property not found</p>
          </div>
        </div>
      </div>
    );
  }

  const agent = getAgentData(property);
  const stats = getPropertyStats(property);
  const images = [property.image, property.image, property.image, property.image].filter(Boolean);
  const selectedAmenities = COMMON_AMENITIES.slice(0, 8);

  // Modal states
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const handleFavoritToggle = () => {
    if (toggleFavorite) {
      toggleFavorite(property.id);
      setIsFavorited(!isFavorited);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
    setShareMessage(`Check out this amazing property: ${property.name}\n\n${'R 8,500,000'} - ${property.location}`);
  };

  const handleCallAgent = () => {
    window.location.href = `tel:${agent.phone}`;
  };

  const handleWhatsAppAgent = () => {
    const phone = agent.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=Hi, I'm interested in ${property.name}`);
  };

  const handleEmailAgent = () => {
    window.location.href = `mailto:${agent.email}?subject=Interested in ${property.name}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{ background: COLORS.bg }}>
      {/* HEADER */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: COLORS.sectionBg,
          borderBottom: `1px solid ${COLORS.divider}/20`,
          zIndex: 40,
          paddingTop: 16,
          paddingBottom: 16,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('home-premium')}
            className="flex items-center gap-2"
            style={{
              color: COLORS.accent,
              fontSize: 14,
              fontWeight: 600,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <ArrowLeft size={18} /> Back
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handleFavoritToggle}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
              }}
            >
              <Heart
                size={20}
                fill={isFavorited ? COLORS.accent : 'none'}
                stroke={isFavorited ? COLORS.accent : COLORS.textMuted}
              />
            </button>
            <button
              onClick={handleShare}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
              }}
            >
              <Share2 size={20} stroke={COLORS.textMuted} />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ paddingTop: 80 }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* LUXURY REAL ESTATE LABEL + PROPERTY TITLE + PRICE */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 12, color: COLORS.accent, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 12, textTransform: 'uppercase' }}>
              Luxury Real Estate
            </p>
            <h1 style={{ fontSize: 40, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 8, lineHeight: 1.2 }}>
              {property.name}
            </h1>
            <p style={{ fontSize: 16, color: COLORS.textSecondary, fontWeight: 500, marginBottom: 16 }}>
              {property.location}
            </p>
            <p style={{ fontSize: 32, fontWeight: 700, color: COLORS.accent }}>
              R 8,500,000
            </p>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: GALLERY (65-70%) */}
            <div className="lg:col-span-8">
              {/* MAIN IMAGE */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '66.67%', // 3:2 aspect ratio
                  background: COLORS.lightBg,
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={`${property.name} - Image ${currentImageIndex + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* NAV BUTTONS */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: 8,
                    padding: 12,
                    cursor: 'pointer',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronLeft size={20} stroke={COLORS.textPrimary} />
                </button>

                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: 8,
                    padding: 12,
                    cursor: 'pointer',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronRight size={20} stroke={COLORS.textPrimary} />
                </button>

                {/* COUNTER */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: COLORS.white,
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* THUMBNAIL GALLERY */}
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      flex: '0 0 100px',
                      height: 80,
                      borderRadius: 8,
                      border: currentImageIndex === idx ? `2px solid ${COLORS.accent}` : `1px solid ${COLORS.borderLight}`,
                      padding: 0,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: COLORS.lightBg,
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>

              {/* PROPERTY QUICK FACTS */}
              <div style={{ marginTop: 48, padding: 24, background: COLORS.sectionBg, borderRadius: 12, borderTop: `2px solid ${COLORS.accent}` }}>
                {/* PRICE */}
                <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.accent, marginBottom: 24 }}>
                  R 8,500,000
                </div>

                {/* PROPERTY FACTS - GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${COLORS.accent}/20` }}>
                  <div style={{ fontSize: 13, color: COLORS.textPrimary, fontWeight: 500 }}>
                    🛏️ {stats.bedrooms} Bedrooms
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textPrimary, fontWeight: 500 }}>
                    🛁 {stats.bathrooms} Bathrooms
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textPrimary, fontWeight: 500 }}>
                    📐 {stats.livingArea.toLocaleString()}m²
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textPrimary, fontWeight: 500 }}>
                    🚗 {stats.garages} Garages
                  </div>
                </div>

                {/* LOCATION INFO */}
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                      Location
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>
                      {property.location}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                      Property Type
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>
                      Golf Estate
                    </div>
                  </div>
                </div>
              </div>

              {/* OVERVIEW SECTION */}
              <div style={{ marginTop: 48, padding: 24, background: COLORS.sectionBg, borderRadius: 12, borderTop: `2px solid ${COLORS.accent}` }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 16 }}>
                  Overview
                </h2>
                <p style={{ lineHeight: 1.8, color: COLORS.textSecondary, fontSize: 15 }}>
                  Prestigious penthouse apartment in White River Golf Estate featuring panoramic golf course views, a chef's kitchen, luxury finishes and resort-style amenities. Designed for discerning buyers seeking elegance, privacy and convenience in one of Mpumalanga's most desirable addresses.
                </p>
              </div>

              {/* PROPERTY HIGHLIGHTS SECTION */}
              <div style={{ marginTop: 32, padding: 24, background: COLORS.sectionBg, borderRadius: 12, borderTop: `2px solid ${COLORS.accent}` }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 20 }}>
                  Property Highlights
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 20 }}>🏊</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>Swimming Pool</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 20 }}>🍷</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>Wine Cellar</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 20 }}>🏌️</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>Golf Estate</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 20 }}>🛡️</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>24hr Security</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 20 }}>🏡</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>Staff Acc.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 20 }}>🌳</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>Mountain Views</span>
                  </div>
                </div>
              </div>

              {/* AMENITIES SECTION */}
              <div style={{ marginTop: 48 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 16 }}>
                  Amenities & Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedAmenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 16px',
                        background: COLORS.sectionBg,
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        color: COLORS.textPrimary,
                        textAlign: 'center',
                        border: `1.5px solid ${COLORS.accent}/50`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = COLORS.accent;
                        e.currentTarget.style.backgroundColor = `${COLORS.accent}/10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${COLORS.accent}/50`;
                        e.currentTarget.style.backgroundColor = COLORS.sectionBg;
                      }}
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* AREA HIGHLIGHTS SECTION */}
              <div style={{ marginTop: 32, padding: 24, background: COLORS.sectionBg, borderRadius: 12, borderTop: `2px solid ${COLORS.accent}` }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 20 }}>
                  Area Highlights
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 18 }}>📍</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>5 min to Ilanga Mall</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 18 }}>🏫</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>Top Schools Nearby</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 18 }}>⛳</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>White River Golf</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: `${COLORS.accent}/5`, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
                    <span style={{ fontSize: 18 }}>🛒</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>Shopping Centres</span>
                  </div>
                </div>
              </div>

              {/* LOCATION SECTION */}
              <div style={{ marginTop: 48, marginBottom: 48, padding: 24, background: COLORS.sectionBg, borderRadius: 12, borderTop: `2px solid ${COLORS.accent}` }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Property Location
                </h2>
                <div style={{ marginBottom: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Estate / Area
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textPrimary }}>
                        The Rest Nature Estate
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Town
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textPrimary }}>
                        {property.location || 'Mbombela'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Province
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textPrimary }}>
                        Mpumalanga
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: AGENT CARD ONLY (30-35%) */}
            <div className="lg:col-span-4">
              {/* STICKY CONTAINER */}
              <div style={{ position: 'sticky', top: 100 }}>
                {/* AGENT CARD */}
                <div
                  style={{
                    background: COLORS.sectionBg,
                    border: `2px solid ${COLORS.accent}`,
                    borderTop: `2px solid ${COLORS.accent}`,
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: `0 4px 16px ${COLORS.accent}/15`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${COLORS.accent}/25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.boxShadow = `0 4px 16px ${COLORS.accent}/15`;
                  }}
                >
                  {/* SECTION: AGENT */}
                  <div style={{ padding: 24 }}>
                    {/* AGENT PHOTO */}
                    <div style={{ marginBottom: 16, textAlign: 'center' }}>
                      <img
                        src={agent.photo}
                        alt={agent.name}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          margin: '0 auto',
                          border: `3px solid ${COLORS.accent}/40`,
                        }}
                      />
                    </div>

                    {/* AGENT NAME */}
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        textAlign: 'center',
                        marginBottom: 8,
                      }}
                    >
                      {agent.name}
                    </h3>

                    {/* AGENCY */}
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        textAlign: 'center',
                        marginBottom: 12,
                      }}
                    >
                      {agent.agency}
                    </p>

                    {/* EXPERIENCE */}
                    <p
                      style={{
                        fontSize: 12,
                        color: COLORS.accent,
                        textAlign: 'center',
                        marginBottom: 16,
                        fontWeight: 500,
                      }}
                    >
                      {agent.experience}
                    </p>

                    {/* CONTACT INFO */}
                    <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 16, borderBottom: `1px solid ${COLORS.accent}/20` }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
                        <span style={{ color: COLORS.accent }}>📞</span>
                        <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>{agent.phone}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
                        <span style={{ color: COLORS.accent }}>✉️</span>
                        <a
                          href={`mailto:${agent.email}`}
                          style={{
                            color: COLORS.accent,
                            wordBreak: 'break-all',
                            textDecoration: 'none',
                            fontWeight: 600,
                          }}
                        >
                          {agent.email}
                        </a>
                      </div>
                    </div>

                    {/* AGENT ACTION BUTTONS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <button
                          onClick={handleCallAgent}
                          style={{
                            padding: '12px 16px',
                            background: COLORS.accent,
                            color: COLORS.bg,
                            border: 'none',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <Phone size={14} />
                          Call
                        </button>

                        <button
                          onClick={handleWhatsAppAgent}
                          style={{
                            padding: '12px 16px',
                            background: 'transparent',
                            color: COLORS.accent,
                            border: `1.5px solid ${COLORS.accent}/40`,
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <MessageCircle size={14} />
                          WhatsApp
                        </button>
                      </div>

                      {/* SAVE & SHARE - NOW BELOW CALL & WHATSAPP */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <button
                          onClick={handleFavoritToggle}
                          style={{
                            padding: '12px 16px',
                            background: isFavorited ? COLORS.accent : 'transparent',
                            color: isFavorited ? COLORS.bg : COLORS.accent,
                            border: `1.5px solid ${COLORS.accent}`,
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <Heart size={14} fill={isFavorited ? COLORS.bg : 'none'} />
                          Save
                        </button>

                        <button
                          onClick={handleShare}
                          style={{
                            padding: '12px 16px',
                            background: 'transparent',
                            color: COLORS.accent,
                            border: `1.5px solid ${COLORS.accent}/40`,
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <Share2 size={14} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SPACING BEFORE SIMILAR PROPERTIES */}
                <div style={{ height: 32 }}></div>
              </div>
            </div>
          </div>

          {/* SIMILAR PROPERTIES SECTION - OUTSIDE GRID, APPEARS LAST ON ALL DEVICES */}
          <div style={{ marginTop: 64, marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 20 }}>
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SAMPLE_SIMILAR_PROPERTIES.map((similar) => (
                <div
                  key={similar.id}
                  onClick={() => navigate('property-detail-premium', undefined, similar.id)}
                  style={{
                    border: `1px solid ${COLORS.accent}/30`,
                    borderRadius: 12,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: COLORS.sectionBg,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${COLORS.accent}/20`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${COLORS.accent}/30`;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* IMAGE */}
                  <div style={{ width: '100%', height: 200, overflow: 'hidden', background: COLORS.lightBg }}>
                    <img
                      src={similar.image}
                      alt={similar.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* CONTENT */}
                  <div style={{ padding: 16 }}>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        marginBottom: 8,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {similar.name}
                    </h3>

                    {/* LOCATION */}
                    <div style={{ fontSize: 13, color: COLORS.accent, marginBottom: 12 }}>
                      <span>📍 {similar.location}</span>
                    </div>

                    {/* PRICE - DIFFERENT FOR EACH */}
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: COLORS.accent,
                        marginBottom: 12,
                      }}
                    >
                      R {(similar.id === 'p_sim_001' ? 7200000 : similar.id === 'p_sim_002' ? 4500000 : 6800000).toLocaleString()}
                    </div>

                    {/* STATS - USE SIMILAR PROPERTY DATA */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: 8,
                        fontSize: 12,
                        color: COLORS.textPrimary,
                        marginBottom: 12,
                        paddingBottom: 12,
                        borderBottom: `1px solid ${COLORS.accent}/20`,
                      }}
                    >
                      <div>
                        <Bed size={14} style={{ marginBottom: 2 }} /> {(similar as any).bedrooms} Beds
                      </div>
                      <div>
                        <Bath size={14} style={{ marginBottom: 2 }} /> {(similar as any).bathrooms} Baths
                      </div>
                      <div>
                        <Ruler size={14} style={{ marginBottom: 2 }} /> {(similar as any).squareFeet}m²
                      </div>
                    </div>

                    {/* VIEW BUTTON */}
                    <button
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        color: COLORS.accent,
                        border: `1px solid ${COLORS.accent}/40`,
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = COLORS.accent;
                        e.currentTarget.style.color = COLORS.bg;
                        e.currentTarget.style.borderColor = COLORS.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = COLORS.accent;
                        e.currentTarget.style.borderColor = `${COLORS.accent}/40`;
                      }}
                      onClick={() => navigate('property-detail-premium', undefined, similar.id)}
                    >
                      View Property
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* SHARE MODAL */}
      {showShareModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: COLORS.sectionBg,
            border: `2px solid ${COLORS.accent}`,
            borderRadius: 12,
            padding: 32,
            maxWidth: 500,
            width: '90%',
            boxShadow: `0 20px 60px ${COLORS.accent}/30`,
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 4 }}>
              Share Property
            </h2>
            <p style={{ fontSize: 12, color: COLORS.accent, marginBottom: 20, fontWeight: 500 }}>
              {property.name}
            </p>

            <div style={{ marginBottom: 20, padding: 16, background: COLORS.bg, borderRadius: 8, border: `1px solid ${COLORS.accent}/20` }}>
              <p style={{ fontSize: 13, color: COLORS.textSecondary, fontFamily: 'monospace', lineHeight: 1.6, wordBreak: 'break-word' }}>
                {shareMessage}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '12px 20px',
                  background: COLORS.accent,
                  color: COLORS.bg,
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Copy to Clipboard
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: property.name,
                      text: shareMessage,
                    });
                  }
                }}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  color: COLORS.accent,
                  border: `1.5px solid ${COLORS.accent}`,
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Share via System
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  color: COLORS.accent,
                  border: `1.5px solid ${COLORS.accent}/40`,
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRICE INQUIRY MODAL - WITH GOLD ACCENT */}
      {showPriceModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: COLORS.sectionBg,
            border: `2px solid ${COLORS.accent}`,
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: `0 20px 60px ${COLORS.accent}/30`,
            maxWidth: 500,
            width: '90%',
          }}>
            {/* GOLD HEADER ACCENT */}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.accent}/20, ${COLORS.accent}/10)`,
              borderBottom: `2px solid ${COLORS.accent}`,
              padding: 24,
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>
                R 8,500,000
              </h2>
              <p style={{ fontSize: 13, color: COLORS.textSecondary }}>
                {property.name}
              </p>
            </div>

            {/* PROPERTY DETAILS */}
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${COLORS.accent}/20` }}>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>
                    Bedrooms
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>
                    {stats.bedrooms}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>
                    Bathrooms
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>
                    {stats.bathrooms}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>
                    Living Area
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.textPrimary }}>
                    {stats.livingArea}m²
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>
                    Garages
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>
                    {stats.garages}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={handleCallAgent}
                  style={{
                    padding: '12px 20px',
                    background: COLORS.accent,
                    color: COLORS.bg,
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Phone size={14} style={{ display: 'inline', marginRight: 6 }} />
                  Call {agent.name}
                </button>

                <button
                  onClick={handleWhatsAppAgent}
                  style={{
                    padding: '12px 20px',
                    background: 'transparent',
                    color: COLORS.accent,
                    border: `1.5px solid ${COLORS.accent}`,
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <MessageCircle size={14} style={{ display: 'inline', marginRight: 6 }} />
                  WhatsApp Inquiry
                </button>

                <button
                  onClick={() => setShowPriceModal(false)}
                  style={{
                    padding: '12px 20px',
                    background: 'transparent',
                    color: COLORS.accent,
                    border: `1.5px solid ${COLORS.accent}/40`,
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailViewPremium;
