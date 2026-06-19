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

// ONLY real accommodation types - NO transfers, staffing, logistics, etc.
const ACCOMMODATION_TYPES = ['Lodge', 'Hotel', 'Guesthouse', 'Villa', 'Cottage', 'Resort', 'Boutique Hotel'];
const AMENITIES_LIST = ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Pet Friendly', 'Game Drives'];
const SPECIAL_FEATURES = ['Romantic', 'Family', 'Pet Friendly', 'Adventure'];

const MinimalLuxuryCard: React.FC<{ stay: Stay; onViewDetail: (id: string) => void }> = React.memo(({ stay, onViewDetail }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  }, [isSaved]);

  // Extract first sentence, max ~12 words for elegance
  const getShortDescription = () => {
    if (!stay.description) return '';
    const text = stay.description.split('.')[0];
    const words = text.split(' ').slice(0, 12).join(' ');
    return words.length < text.length ? words + '.' : text;
  };

  return (
    <div
      onClick={() => onViewDetail(stay.id)}
      className="group cursor-pointer overflow-hidden rounded-lg bg-black border border-white/5 transition-all duration-500 hover:border-gold-500/30"
    >
      {/* LARGE IMAGE - Dominates card */}
      <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {!imageError && stay.image ? (
          <img
            src={stay.image}
            alt={stay.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
            <MapPin className="w-16 h-16 opacity-10" />
          </div>
        )}

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />

        {/* Favorite Heart */}
        <button
          onClick={handleSave}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all border border-white/10"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-gold-400 text-gold-400' : 'text-white/60'}`} />
        </button>
      </div>

      {/* MINIMAL CONTENT */}
      <div className="p-6 space-y-3 bg-black">
        {/* Location - Small & Quiet */}
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-0.5 rounded-full bg-gold-400/50" />
          <span className="text-xs text-gray-500 font-light tracking-widest uppercase">{stay.location}</span>
        </div>

        {/* Property Name - Strong serif */}
        <h3 className="text-xl font-serif font-bold text-white leading-snug line-clamp-2">
          {stay.name}
        </h3>

        {/* One-line Description Only */}
        {stay.description && (
          <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-2">
            {getShortDescription()}
          </p>
        )}

        {/* Price - Clear */}
        {stay.pricePerNight && (
          <div className="text-sm text-gold-400 font-semibold">
            From R{stay.pricePerNight.toLocaleString()}/night
          </div>
        )}

        {/* CTA - Minimal */}
        <div className="flex items-center gap-2 text-gold-400 group-hover:gap-3 transition-all text-xs font-bold uppercase tracking-widest pt-2">
          <span>View Stay</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
});

MinimalLuxuryCard.displayName = 'MinimalLuxuryCard';

export default function StaysPage({ navigate, businesses }: { navigate?: (view: string, subview?: string | undefined, id?: string) => void; businesses?: any[] }) {
  // CRITICAL: Filter to ONLY real accommodation (removes transfers, staffing, wellness clinics, etc.)
  const staysOnly = useMemo(() => {
    const allStays = (businesses && businesses.length > 0 ? businesses : (staysData || [])) as Stay[];
    return allStays.filter(s => {
      const type = (s.type || '').toLowerCase();
      const name = (s.name || '').toLowerCase();
      // Include ONLY accommodation types
      return /lodge|hotel|villa|cottage|resort|guest|stay|retreat|manor|boutique/.test(type) ||
             /lodge|hotel|villa|cottage|resort|guest|stay|retreat|manor|boutique/.test(name);
    });
  }, [businesses]);

  const [filters, setFilters] = useState({
    location: 'All Areas',
    accommodationType: [] as string[],
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
        s.location.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
      );
    }

    if (filters.location !== 'All Areas') {
      results = results.filter(s => s.location === filters.location);
    }

    if (filters.accommodationType.length > 0) {
      results = results.filter(s =>
        filters.accommodationType.some(pt => s.type?.toLowerCase().includes(pt.toLowerCase()))
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
    return results.sort((a, b) => {
      if (a.isElite && !b.isElite) return -1;
      if (!a.isElite && b.isElite) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [staysOnly, filters, searchTerm]);

  const clearFilters = useCallback(() => {
    setFilters({
      location: 'All Areas',
      accommodationType: [],
      amenities: [],
      priceMin: 500,
      priceMax: 25000,
    });
    setSearchTerm('');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      {/* ===== EDITORIAL HERO ===== */}
      <section className="bg-black border-b border-white/5 mb-12">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Thin gold accent */}
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-8" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Curated Luxury Stays
            </h1>

            <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed mb-8">
              Exceptional accommodations across Mpumalanga.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search lodges, hotels, villas…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-white/10 bg-black/50 backdrop-blur-md text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
          {/* ===== FILTERS - CLEAN & QUIET ===== */}
          <div>
            {/* Mobile Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full py-2.5 mb-4 bg-black/40 text-white border border-gold-500/20 rounded-lg flex items-center justify-center gap-2 hover:bg-black/60 font-medium text-sm transition-all"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Filters Container */}
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

              {/* Accommodation Type */}
              <div>
                <h3 className="text-white uppercase text-xs font-bold mb-3 tracking-widest">Accommodation</h3>
                <div className="space-y-2">
                  {ACCOMMODATION_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.accommodationType.includes(type)}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            accommodationType: prev.accommodationType.includes(type)
                              ? prev.accommodationType.filter(t => t !== type)
                              : [...prev.accommodationType, type],
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

              {/* Reset */}
              <button
                onClick={clearFilters}
                className="w-full py-2 border border-white/20 text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs uppercase tracking-wider"
              >
                Reset
              </button>
            </div>
          </div>

          {/* ===== CARD GRID ===== */}
          <div>
            {filtered.length > 0 ? (
              <>
                {/* Heading */}
                <div className="mb-8">
                  <p className="text-sm text-gray-400 font-light">
                    {filtered.length} {filtered.length === 1 ? 'stay' : 'stays'} available
                  </p>
                </div>

                {/* Grid - Spacious */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
                <p className="text-gray-400 font-light mb-6">Try adjusting filters</p>
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

      {/* ===== FOOTER NOTE ===== */}
      {filtered.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
          <div className="text-center pt-12 border-t border-white/10">
            <p className="text-xs text-gray-500 font-light tracking-widest uppercase">Carefully Curated</p>
            <p className="text-sm text-gray-400 font-light mt-2">Each property selected for excellence and authentic hospitality experiences.</p>
          </div>
        </div>
      )}
    </div>
  );
}
