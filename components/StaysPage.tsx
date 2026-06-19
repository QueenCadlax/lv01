import React, { useMemo, useState, useCallback } from 'react';
import { stays as staysData } from '../data/seeds';
import { MPUMALANGA_AREAS } from '../types';
import { ChevronDown, Heart, MapPin, Filter, Search, ArrowRight } from 'lucide-react';

interface Stay {
  id: string;
  name: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  location: string;
  pricePerNight?: number;
  type?: string;
  tier?: string;
  amenities?: string[];
  maxGuests?: number;
  bathrooms?: number;
  featured?: boolean;
  isElite?: boolean;
  description?: string;
}

// Only REAL accommodation types
const ACCOMMODATION_TYPES = ['Lodge', 'Hotel', 'Guesthouse', 'Villa', 'Cottage', 'Resort', 'Boutique Hotel'];
const AMENITIES_LIST = ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Pet Friendly', 'Game Drives'];
const SPECIAL_FEATURES = ['Romantic', 'Family', 'Pet Friendly', 'Adventure'];

const MinimalLuxuryCard: React.FC<{ stay: Stay; onViewDetail: (id: string) => void }> = React.memo(({ stay, onViewDetail }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  }, [isSaved]);

  // Transform generic descriptions into atmospheric luxury phrases
  const getAtmosphericDescription = () => {
    if (!stay.description) return 'Curated for refined living.';
    
    const desc = stay.description.toLowerCase();
    
    // Map keywords to SHORT atmospheric phrases (max 3-4 words)
    const atmosphericPhrases: { [key: string]: string[] } = {
      river: ['Private riverfront living', 'Riverside sanctuary', 'Waterfront refuge'],
      safari: ['Safari-inspired retreat', 'Wildlife immersion', 'Lowveld sanctuary'],
      game: ['Nature-centric living', 'Wildlife sanctuary', 'Lowveld escape'],
      mountain: ['Mountain retreat', 'Elevated sanctuary', 'Peak sanctuary'],
      garden: ['Garden sanctuary', 'Botanical retreat', 'Nature sanctuary'],
      spa: ['Wellness sanctuary', 'Restoration retreat', 'Healing retreat'],
      pool: ['Aquatic escape', 'Water sanctuary', 'Pool sanctuary'],
      cottage: ['Intimate retreat', 'Cozy sanctuary', 'Quiet escape'],
      lodge: ['Lodge sanctuary', 'Hospitality retreat', 'Community sanctuary'],
      villa: ['Private villa living', 'Villa sanctuary', 'Architectural escape'],
    };

    // Find matching keyword and return random phrase
    for (const [keyword, phrases] of Object.entries(atmosphericPhrases)) {
      if (desc.includes(keyword)) {
        return phrases[Math.floor(Math.random() * phrases.length)];
      }
    }

    // Minimal defaults (very short)
    const defaults = [
      'Curated escape',
      'Quiet luxury',
      'Refined living',
      'Elevated stay',
      'Authentic escape',
    ];
    
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  // If this stay is part of the PLATINUM COLLECTION (or explicitly featured), render
  // the compact PLATINUM-style card per design requirements.
  const isPlatinumCard = (stay as any).collection === 'PLATINUM COLLECTION' || (stay as any).isFeaturedForStaysPage;

  if (isPlatinumCard) {
    return (
      <div
        onClick={() => onViewDetail(stay.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ background: '#000000', borderRadius: 18, padding: 20, border: '1px solid rgba(200,169,106,0.25)' }}
        className="group cursor-pointer flex flex-col h-full overflow-hidden transition-all duration-300"
      >
        {/* Top-left collection badge */}
        <div className="mb-3">
          <div style={{ color: '#C8A96A', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            PLATINUM COLLECTION
          </div>
        </div>

        {/* Image - 4:3, 240px height */}
        <div style={{ height: 240, overflow: 'hidden', borderRadius: 12 }} className="mb-4">
          <img
            src={(stay as any).image || ((stay as any).images && (stay as any).images[0])}
            alt={stay.name}
            className="w-full h-full object-cover"
            style={{ aspectRatio: '4 / 3' }}
          />
        </div>

        {/* Bottom content - small typography, no ratings */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white leading-tight" style={{ marginBottom: 6 }}>{stay.name}</h3>
            <p className="text-xs text-gray-400" style={{ marginBottom: 4 }}>Luxury Country Estate</p>
            <p className="text-xs text-gray-400 mb-3">{stay.location}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">FROM</p>
              <p className="text-sm font-semibold text-white">R{(stay.pricePerNight || 3710).toLocaleString()} <span className="text-xs text-gray-400">pp</span></p>
            </div>

            <div className="text-yellow-500 text-xs font-medium opacity-100">DISCOVER →</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onViewDetail(stay.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col h-full rounded-lg overflow-hidden border border-yellow-600/40 hover:border-yellow-500/80 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/20"
    >
      {/* IMAGE CONTAINER - Magazine style */}
  <div className="relative w-full h-48 overflow-hidden rounded-t-lg mb-0">
        {!imageError && stay.image ? (
          <img
            src={stay.image}
            alt={stay.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
            <MapPin className="w-12 h-12 opacity-20" />
          </div>
        )}

        {/* Soft vignette overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Price badge - Bottom right on image */}
        {(stay.pricePerNight || 7400) && (
          <div className="absolute bottom-3 right-3 bg-yellow-500/95 backdrop-blur-sm text-black px-3 py-2 rounded-lg text-sm font-semibold">
            R{((stay.pricePerNight || 7400) / 1000).toFixed(1)}k /night
          </div>
        )}

        {/* Save button - Subtle */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-md hover:bg-white transition-all hover:scale-110"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-gray-700'}`} />
        </button>
      </div>

      {/* TEXT CONTENT - Minimal luxury, lots of whitespace */}
  <div className="flex-1 flex flex-col justify-between px-6 py-4">
        {/* Top section - Location & Title only */}
        <div className="space-y-3">
          {/* Location - Anchor point */}
          <p className="text-xs text-gray-500 font-light tracking-widest uppercase">
            {stay.location}
          </p>

          {/* Property Name ONLY - Breathing room */}
          <h3 className="text-lg font-serif font-semibold text-white leading-tight line-clamp-2">
            {stay.name}
          </h3>
        </div>

        {/* Bottom section - Price & CTA (no description) */}
  <div className="flex items-end justify-between pt-4 border-t border-yellow-600/20 mt-4">
          {/* Price - Elegant with gold accent */}
          {stay.pricePerNight && (
            <div>
              <p className="text-xs text-gray-500 font-light mb-1 uppercase tracking-widest">
                Starting <span className="text-yellow-500">from</span>
              </p>
              <p className="text-base font-semibold text-white">
                R{(stay.pricePerNight / 1000).toFixed(1)}k <span className="text-xs text-gray-400 font-light">/night</span>
              </p>
            </div>
          )}

          {/* CTA - Appears on hover */}
          <div className="flex items-center gap-1 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-light tracking-widest">DISCOVER</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
});

MinimalLuxuryCard.displayName = 'MinimalLuxuryCard';

export default function StaysPage({ navigate, businesses }: { navigate?: (view: string, subview?: string | undefined, id?: string) => void; businesses?: any[] }) {
  // Filter stays to ONLY include actual hospitality properties
  const staysOnly = useMemo(() => {
    const allStays = (businesses && businesses.length > 0 ? businesses : (staysData || [])) as Stay[];
    // Restrict to only the Walkersons PLATINUM COLLECTION or explicit id 's9'
    return allStays.filter(s => {
      const isPlatinum = ((s as any).collection || '').toString().toUpperCase() === 'PLATINUM COLLECTION';
      const isWalkersons = s.id === 's9' || (s.name || '').toLowerCase().includes('walkersons');
      return isPlatinum || isWalkersons;
    });
  }, [businesses]);

  const [filters, setFilters] = useState({
    location: 'All Areas',
    propertyType: [] as string[],
    amenities: [] as string[],
    priceMin: 500,
    priceMax: 25000,
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewDetail = useCallback((id: string) => {
    if (navigate) navigate('stays-detail', undefined, id);
  }, [navigate]);

  // Enhanced filter logic
  const filtered = useMemo(() => {
    let results = [...staysOnly];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      results = results.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.type?.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        (s.amenities || []).some(a => a.toLowerCase().includes(q))
      );
    }

    if (filters.location !== 'All Areas') {
      results = results.filter(s => s.location === filters.location);
    }

    if (filters.propertyType.length > 0) {
      results = results.filter(s =>
        filters.propertyType.some(pt => s.type?.toLowerCase().includes(pt.toLowerCase()))
      );
    }

    if (filters.amenities.length > 0) {
      results = results.filter(s =>
        filters.amenities.some(a => (s.amenities || []).some(am => am.includes(a)))
      );
    }

    results = results.filter(s => {
      const price = s.pricePerNight || 5000;
      return price >= filters.priceMin && price <= filters.priceMax;
    });

    // Sort by tier and rating for premium placement
    let sorted = results.sort((a, b) => {
      if (a.isElite && !b.isElite) return -1;
      if (!a.isElite && b.isElite) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });

    // Return all matching stays (use seed data). Previously this was limited to a single
    // curated flagship item which prevented seeded entries from appearing. Removing the
    // slice ensures the full set of filtered stays from `staysData` is rendered.
    return sorted;
  }, [staysOnly, filters, searchTerm]);

  const clearFilters = useCallback(() => {
    setFilters({
      location: 'All Areas',
      propertyType: [],
      amenities: [],
      priceMin: 500,
      priceMax: 25000,
    });
    setSearchTerm('');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      {/* ===== HERO SECTION - EDITORIAL ===== */}
      <section className="bg-black border-b border-white/5 mb-12">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Thin gold line accent */}
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-8" />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Stays Worth Remembering
            </h1>
            
            <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed mb-8">
              Thoughtfully curated accommodations across Mpumalanga. Every stay tells a story.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search lodges, hotels, villas…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-white/10 bg-black/50 backdrop-blur-md text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gold-400/50 focus:border-gold-400/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>

      {/* ===== MAIN CONTENT GRID ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          
          {/* ===== LEFT: REFINED FILTERS ===== */}
          <div>
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full py-2.5 mb-4 bg-black/40 text-white border border-gold-500/20 rounded-lg flex items-center justify-center gap-2 hover:bg-black/60 font-medium text-sm transition-all"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Filter Container */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-6 pb-6`}>
              
              {/* Location */}
              <div>
                <h3 className="text-white uppercase text-xs font-bold mb-3 tracking-widest">Location</h3>
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="w-full px-3 py-2.5 bg-black/40 text-white rounded-lg flex items-center justify-between hover:bg-black/60 border border-white/10 font-medium text-sm transition-all"
                >
                  <span className="text-xs">{filters.location}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showLocationDropdown && (
                  <div className="mt-2 bg-black/60 rounded-lg border border-white/10 max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, location: 'All Areas' }));
                        setShowLocationDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-white/5 text-white text-xs font-light"
                    >
                      All Areas
                    </button>
                    {MPUMALANGA_AREAS.map(area => (
                      <button
                        key={area}
                        onClick={() => {
                          setFilters(prev => ({ ...prev, location: area }));
                          setShowLocationDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-white/5 text-gray-300 text-xs font-light"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Type */}
              <div>
                <h3 className="text-white uppercase text-xs font-bold mb-3 tracking-widest">Property Type</h3>
                <div className="space-y-2">
                  {ACCOMMODATION_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.propertyType.includes(type)}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            propertyType: prev.propertyType.includes(type)
                              ? prev.propertyType.filter(t => t !== type)
                              : [...prev.propertyType, type],
                          }));
                        }}
                        className="w-4 h-4 rounded accent-gold-400 cursor-pointer"
                      />
                      <span className="text-white text-xs font-light group-hover:text-gold-400 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-white uppercase text-xs font-bold mb-3 tracking-widest">Amenities</h3>
                <div className="space-y-2">
                  {AMENITIES_LIST.map(amenity => (
                    <label key={amenity} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            amenities: prev.amenities.includes(amenity)
                              ? prev.amenities.filter(a => a !== amenity)
                              : [...prev.amenities, amenity],
                          }));
                        }}
                        className="w-4 h-4 rounded accent-gold-400 cursor-pointer"
                      />
                      <span className="text-white text-xs font-light group-hover:text-gold-400 transition-colors">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-white uppercase text-xs font-bold mb-3 tracking-widest">Price per Night</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="500"
                    max="25000"
                    step="1000"
                    value={filters.priceMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceMax: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-400"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-light">
                    <span>R{filters.priceMin.toLocaleString()}</span>
                    <span>R{filters.priceMax.toLocaleString()}+</span>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={clearFilters}
                className="w-full py-2 border border-white/20 text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs uppercase tracking-wider"
              >
                Reset
              </button>
            </div>
          </div>

          {/* ===== RIGHT: LUXURY CARD GRID ===== */}
          <div>
            {filtered.length > 0 ? (
              <>
                {/* Results Heading */}
                <div className="mb-8">
                  <p className="text-sm text-gray-400 font-light">
                    Showing {filtered.length} refined {filtered.length === 1 ? 'stay' : 'stays'}
                  </p>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map(stay => (
                    <MinimalLuxuryCard
                      key={stay.id}
                      stay={stay}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Heart className="w-12 h-12 text-gold-400/40 mb-4" />
                <h3 className="text-2xl font-serif font-bold text-white mb-2">No stays found</h3>
                <p className="text-gray-400 font-light mb-6">Try adjusting your filters to discover luxury accommodations</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-gold-400 text-black font-semibold rounded-lg hover:bg-gold-500 transition-all text-sm uppercase tracking-wider"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== EDITORIAL FOOTER ===== */}
      {filtered.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
          <div className="text-center pt-12 border-t border-white/10">
            <p className="text-xs text-gray-500 font-light tracking-widest uppercase">Curated Hospitality</p>
            <p className="text-sm text-gray-400 font-light mt-2">Each stay has been selected for excellence, authenticity, and exceptional guest experiences.</p>
          </div>
        </div>
      )}
    </div>
  );
}
