import React, { useState, useMemo, useCallback } from 'react';
import { Business, Category, MPUMALANGA_AREAS } from '../types';
import { Search, MapPin, Sparkles, Filter, ChevronDown, X } from 'lucide-react';

interface EstatePremiumProps {
  businesses: Business[];
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  favorites?: Set<string>;
  toggleFavorite?: (id: string) => void;
}

const EstatePremium: React.FC<EstatePremiumProps> = ({ 
  businesses, 
  navigate, 
  favorites,
  toggleFavorite 
}) => {
  // Ensure favorites is always a Set
  const favoritesSet = favorites instanceof Set ? favorites : new Set();
  // Filter only real estate properties
  const realEstateProperties = useMemo(() => 
    businesses.filter(b => b.category === Category.RealEstateAndProperty),
    [businesses]
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = realEstateProperties;

    // Filter by area
    if (selectedArea !== 'All Areas') {
      result = result.filter(p => p.location === selectedArea);
    }

    // Filter by search
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }, [realEstateProperties, searchTerm, selectedArea, sortBy]);

  const handleView = useCallback((id: string) => {
    navigate('estate-detail', undefined, id);
  }, [navigate]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (toggleFavorite) toggleFavorite(id);
  }, [toggleFavorite]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-black">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-black border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
              <span className="text-yellow-400">Mpumalanga Estates</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Discover premium property listings across Mpumalanga's most sought-after locations.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties, locations…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 space-y-8 md:space-y-12 py-12">
        {/* ===== FILTER & SORT BAR ===== */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          {/* Area Selector */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
              style={{
                background: selectedArea !== 'All Areas' ? '#C9A24D' : 'rgba(201,162,77,0.1)',
                border: '1px solid rgba(201,162,77,0.3)',
                color: selectedArea !== 'All Areas' ? '#000' : '#C9A24D'
              }}
            >
              <MapPin className="inline w-4 h-4 mr-1" />
              {selectedArea === 'All Areas' ? 'All Areas' : selectedArea}
              <ChevronDown className="inline w-3 h-3 ml-1" />
            </button>
            {showFilters && (
              <div
                className="absolute mt-2 w-64 bg-black border border-white/10 rounded-lg p-3 shadow-lg z-40"
                style={{ borderColor: 'rgba(201,162,77,0.2)' }}
              >
                <button
                  onClick={() => {
                    setSelectedArea('All Areas');
                    setShowFilters(false);
                  }}
                  className="w-full text-left px-2 py-2 rounded hover:bg-white/5 text-gray-200 text-sm font-semibold"
                >
                  All Areas
                </button>
                {MPUMALANGA_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      setSelectedArea(area);
                      setShowFilters(false);
                    }}
                    className="w-full text-left px-2 py-2 rounded hover:bg-white/5 text-gray-200 text-sm"
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all"
              style={{
                background: 'rgba(201,162,77,0.1)',
                border: '1px solid rgba(201,162,77,0.3)',
                color: '#C9A24D'
              }}
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">
            {filteredProperties.length} Properties
          </span>
        </div>

        {/* ===== PROPERTIES GRID ===== */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => handleView(property.id)}
                className="group cursor-pointer overflow-hidden flex flex-col h-full rounded-xl"
                style={{
                  background: '#000000',
                  border: '1px solid rgba(201,162,77,0.25)',
                  transition: 'all 320ms cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden'
                }}
              >
                {/* IMAGE SECTION - 65% height */}
                <div style={{ height: '65%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={property.image}
                    alt={property.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transformOrigin: 'center',
                      transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    className="group-hover:transform group-hover:scale-105"
                  />
                  {/* Subtle overlay accent */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(201,162,77,0.5), transparent)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => handleFavoriteClick(e, property.id)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                  >
                    <svg
                      className={`w-5 h-5 ${favoritesSet.has(property.id) ? 'fill-current text-yellow-400' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill={favoritesSet.has(property.id) ? 'currentColor' : 'none'}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* CONTENT SECTION - 35% height */}
                <div
                  style={{
                    padding: '16px 14px 14px 14px',
                    color: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '35%',
                    fontSize: 14
                  }}
                >
                  <div style={{ minHeight: 0 }}>
                    {/* Property Title - serif, prominent */}
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 15,
                        fontWeight: 600,
                        color: '#FFFFFF',
                        lineHeight: '1.25',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: 6,
                        fontFamily: "'Georgia', 'Garamond', serif",
                        letterSpacing: '-0.3px'
                      }}
                    >
                      {property.name}
                    </h3>

                    {/* Location - subtle gray */}
                    <div
                      style={{
                        fontSize: 11,
                        color: '#A0A0A0',
                        marginBottom: 6,
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {property.location}
                    </div>

                    {/* Price - bold gold, largest */}
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: '#C9A24D',
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        letterSpacing: '0.2px',
                        marginBottom: 8
                      }}
                    >
                      R {(property.price || 8500000).toLocaleString()}
                    </div>

                    {/* Features row - minimal style */}
                    <div
                      style={{
                        fontSize: 11,
                        color: '#D0D0D0',
                        marginBottom: 8,
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        fontWeight: 500,
                        letterSpacing: '0.3px'
                      }}
                    >
                      {property.reviewCount || 5} Beds • {Math.ceil((property.rating || 4) * 1)} Baths
                    </div>

                    {/* DIVIDER */}
                    <div style={{ height: '1px', background: 'rgba(201,162,77,0.15)', margin: '8px 0' }}></div>

                    {/* Agent Section - professional, minimal */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                      {/* Agent Avatar */}
                      <div style={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, rgba(201,162,77,0.3) 0%, rgba(201,162,77,0.1) 100%)',
                        border: '1px solid rgba(201,162,77,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#C9A24D', fontFamily: "'Georgia', serif" }}>
                          {(property.description || 'JW').charAt(0)}
                        </span>
                      </div>
                      
                      {/* Agent Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Agent Name */}
                        <div style={{ 
                          fontSize: 12, 
                          fontWeight: 600, 
                          color: '#FFFFFF', 
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                          lineHeight: '1.2'
                        }}>
                          {property.description || 'James Whitmore'}
                        </div>
                        
                        {/* Agency Name */}
                        <div style={{ 
                          fontSize: 10, 
                          color: '#A0A0A0', 
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                          lineHeight: '1.1'
                        }}>
                          Estate Agent
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No properties found in {selectedArea}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstatePremium;
