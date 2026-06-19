import React, { useState } from 'react';
import { Search, Sparkles, Filter, MapPin, Star, CheckCircle } from 'lucide-react';
import { Business, Category, ListingTier, MPUMALANGA_AREAS } from '../types';

interface PropertyPremiumProps {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  businesses: Business[];
  favorites?: Set<string>;
  toggleFavorite?: (id: string) => void;
}

const PropertyPremium: React.FC<PropertyPremiumProps> = ({ 
  navigate, 
  businesses,
  favorites = new Set(),
  toggleFavorite = (id: string) => {}
}) => {
  const [activeTab, setActiveTab] = useState('properties');
  const [filters, setFilters] = useState({
    type: 'All',
    bedrooms: 'All',
    bathrooms: 'All',
    priceMin: '',
    priceMax: '',
    area: 'All Areas',
    tier: 'All',
    amenities: [] as string[],
    sortBy: 'Featured'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [conciergeQuery, setConciergeQuery] = useState('');
  const [conciergeResponse, setConciergeResponse] = useState('');
  const [loadingConcierge, setLoadingConcierge] = useState(false);

  const properties = businesses.filter(b => b.category === Category.RealEstateAndProperty);
  const estateAgents = businesses.filter(b => b.category === Category.RealEstateAndProperty && (b.tier === ListingTier.Elite || b.tier === ListingTier.Platinum)).slice(0, 6);

  const filterProperties = () => {
    let filtered = [...properties];
    if (filters.type !== 'All') {
      filtered = filtered.filter(p => p.description?.toLowerCase().includes(filters.type.toLowerCase()));
    }
    if (filters.bedrooms !== 'All') {
      const beds = parseInt(filters.bedrooms);
      filtered = filtered.filter(p => p.reviewCount === beds);
    }
    if (filters.bathrooms !== 'All') {
      const baths = parseInt(filters.bathrooms);
      filtered = filtered.filter(p => (p.rating || 0) >= baths);
    }
    if (filters.area !== 'All Areas') {
      filtered = filtered.filter(p => p.location === filters.area);
    }
    if (filters.tier !== 'All') {
      filtered = filtered.filter(p => p.tier === filters.tier);
    }
    if (filters.sortBy === 'Featured') {
      filtered.sort((a, b) => (b.tier === ListingTier.Platinum ? 1 : 0) - (a.tier === ListingTier.Platinum ? 1 : 0));
    } else if (filters.sortBy === 'Newest') {
      filtered.sort((a, b) => (b.id?.localeCompare(a.id || '') || 0));
    } else if (filters.sortBy === 'Price: Low to High') {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.name.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.name.replace(/[^0-9]/g, '')) || 0;
        return priceA - priceB;
      });
    } else if (filters.sortBy === 'Price: High to Low') {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.name.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.name.replace(/[^0-9]/g, '')) || 0;
        return priceB - priceA;
      });
    }
    return filtered;
  };

  const handleConciergeSearch = async () => {
    if (!conciergeQuery.trim()) return;
    setLoadingConcierge(true);
    try {
      setConciergeResponse('Finding premium properties matching your criteria...');
      const suggestions = conciergeQuery.toLowerCase();
      if (suggestions.includes('luxury')) {
        setFilters(prev => ({...prev, tier: ListingTier.Platinum}));
      }
      if (suggestions.includes('mbombela') || suggestions.includes('nelspruit')) {
        setFilters(prev => ({...prev, area: 'Mbombela'}));
      }
    } catch (error) {
      setConciergeResponse('I apologize, I could not process your request. Please try again.');
    }
    setLoadingConcierge(false);
  };

  const handleReset = () => {
    setFilters({
      type: 'All',
      bedrooms: 'All',
      bathrooms: 'All',
      priceMin: '',
      priceMax: '',
      area: 'All Areas',
      tier: 'All',
      amenities: [],
      sortBy: 'Featured'
    });
    setConciergeQuery('');
    setConciergeResponse('');
  };

  const filteredProperties = filterProperties();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[350px] overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxury homes" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-gold-400 mb-2 tracking-tight">
            Luxury Properties
          </h1>
          <p className="text-base text-gray-300 mb-6 max-w-2xl">
            Luxury homes, estates & investment properties across Mpumalanga.
          </p>
          
          <div className="flex flex-col md:flex-row gap-3 max-w-2xl w-full">
            <div className="flex-1 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-gold-500/30 rounded-lg px-4 py-3 hover:border-gold-500/60 transition-colors">
              <Search size={18} className="text-gold-500" />
              <input 
                type="text"
                placeholder="Describe your ideal property..."
                value={conciergeQuery}
                onChange={(e) => setConciergeQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleConciergeSearch()}
              />
            </div>
            <button
              onClick={handleConciergeSearch}
              disabled={loadingConcierge}
              className="bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold px-6 py-3 rounded-lg hover:from-gold-400 hover:to-gold-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles size={16} />
              {loadingConcierge ? 'Searching...' : 'Ask AI'}
            </button>
          </div>

          {conciergeResponse && (
            <div className="mt-4 bg-black/80 backdrop-blur-md border border-gold-500/30 rounded-lg p-4 max-w-2xl text-left">
              <p className="text-gold-300 text-sm">{conciergeResponse}</p>
            </div>
          )}
        </div>
      </div>

      <div className="sticky top-24 z-40 bg-black/95 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-4 py-3">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
            <button 
              onClick={() => setActiveTab('properties')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'properties' ? 'bg-gold-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Properties
            </button>
            <button 
              onClick={() => setActiveTab('agents')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'agents' ? 'bg-gold-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Elite Agents
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'properties' ? (
      <>
      <div className="sticky top-32 z-40 bg-black/95 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap text-sm"
            >
              <Filter size={16} /> Filters
            </button>

            <select 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg text-xs outline-none hover:bg-white/10 transition-colors"
            >
              <option>Property Type</option>
              <option>All Types</option>
              <option>Sale</option>
              <option>Rent</option>
            </select>

            <select 
              value={filters.area}
              onChange={(e) => setFilters({...filters, area: e.target.value})}
              className="bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg text-xs outline-none hover:bg-white/10 transition-colors"
            >
              <option>Location</option>
              <option>All Areas</option>
              {MPUMALANGA_AREAS.map(a => <option key={a}>{a}</option>)}
            </select>

            <select 
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg text-xs outline-none hover:bg-white/10 transition-colors"
            >
              <option>Sort By</option>
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            <span className="text-xs text-gray-400 whitespace-nowrap ml-auto">{filteredProperties.length} Properties</span>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4 border-t border-white/5">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Bedrooms</label>
                <select 
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none"
                >
                  <option>All</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6+</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Bathrooms</label>
                <select 
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({...filters, bathrooms: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none"
                >
                  <option>All</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Tier</label>
                <select 
                  value={filters.tier}
                  onChange={(e) => setFilters({...filters, tier: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none"
                >
                  <option>All</option>
                  <option value={ListingTier.Premium}>{ListingTier.Premium}</option>
                  <option value={ListingTier.Elite}>{ListingTier.Elite}</option>
                  <option value={ListingTier.Platinum}>{ListingTier.Platinum}</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Price Range (R)</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                    className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none placeholder-gray-600"
                  />
                  <input 
                    type="text"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                    className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none placeholder-gray-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 pb-24">
        {true ? (
          <div className="py-24 text-center">
            <p className="text-gray-400 text-lg mb-4">No properties match your filters</p>
            <button
              onClick={handleReset}
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-serif text-white mb-1">All Properties</h2>
              <p className="text-sm text-gray-400 mb-8">{filteredProperties.length} available</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProperties.slice(0, 0).map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => navigate('business-detail', undefined, item.id)} 
                    className="group cursor-pointer overflow-hidden flex flex-col h-full" 
                    style={{ 
                      background: '#000000', 
                      border: '1px solid rgba(201,162,77,0.25)', 
                      borderRadius: '12px', 
                      transition: 'all 320ms cubic-bezier(0.4, 0, 0.2, 1)',
                      overflow: 'hidden'
                    }}
                  >
                    {/* IMAGE SECTION - 65% height */}
                    <div style={{ height: '65%', position: 'relative', overflow: 'hidden' }}>
                      <img 
                        src={item.image} 
                        alt={item.name}
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
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,77,0.5), transparent)', pointerEvents: 'none' }} />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        style={{ 
                          position: 'absolute', 
                          right: 12, 
                          top: 12, 
                          width: 36, 
                          height: 36, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          background: 'rgba(0,0,0,0.7)', 
                          border: '1px solid rgba(201,162,77,0.5)', 
                          borderRadius: '50%', 
                          padding: 0, 
                          cursor: 'pointer', 
                          backdropFilter: 'blur(8px)', 
                          transition: 'all 280ms ease' 
                        }}
                        className="hover:bg-black/90 hover:border-gold-400"
                      >
                        {!favorites.has(item.id) ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21s-6.716-4.35-9.2-7.02C-0.6 9.36 3.4 4.5 7.6 6.28 9.6 7.18 11 9 12 10.44c1-1.44 2.4-3.26 4.4-4.16 4.2-1.78 8.2 3.08 4.8 7.7C18.716 16.65 12 21 12 21z" stroke="#C9A24D" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21s-6.716-4.35-9.2-7.02C-0.6 9.36 3.4 4.5 7.6 6.28 9.6 7.18 11 9 12 10.44c1-1.44 2.4-3.26 4.4-4.16 4.2-1.78 8.2 3.08 4.8 7.7C18.716 16.65 12 21 12 21z" fill="#C9A24D" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* CONTENT SECTION - 35% height */}
                    <div style={{ padding: '16px 14px 14px 14px', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '35%', fontSize: 14 }}>
                      {/* Main content */}
                      <div style={{ minHeight: 0 }}>
                        {/* Property Title - serif, prominent */}
                        <h3 style={{ 
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
                        }}>
                          {item.name}
                        </h3>
                        
                        {/* Location - subtle gray */}
                        <div style={{ fontSize: 11, color: '#A0A0A0', marginBottom: 6, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500 }}>
                          {item.location}
                        </div>
                        
                        {/* Price - bold gold, largest */}
                        <div style={{ fontSize: 17, fontWeight: 700, color: '#C9A24D', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.2px', marginBottom: 8 }}>
                          R {(item.price || 8500000).toLocaleString()}
                        </div>

                        {/* Features row - minimal style */}
                        <div style={{ fontSize: 11, color: '#D0D0D0', marginBottom: 8, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontWeight: 500, letterSpacing: '0.3px' }}>
                          {item.reviewCount || 5} Beds • {Math.ceil((item.rating || 4) * 1)} Baths
                        </div>
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
                            {(item.description || 'JW').charAt(0)}
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
                            {item.description || 'James Whitmore'}
                          </div>
                          
                          {/* Agency Name */}
                          <div style={{ 
                            fontSize: 10, 
                            color: '#808080', 
                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                            fontWeight: 400,
                            lineHeight: '1.2',
                            marginTop: 2
                          }}>
                            Deo Volente Properties
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      </>
      ) : (
      <div className="container mx-auto px-4 py-12 pb-24">
        {estateAgents.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-400 text-lg">No agents available</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-serif text-gold-400 mb-2 text-center">Elite Agents</h2>
            <p className="text-center text-gray-400 mb-12">Our top-tier real estate professionals</p>
            
            <div className="flex flex-wrap gap-8 justify-center">
              {estateAgents.map((agent) => (
                <div key={agent.id} className="w-full md:w-80 group">
                  <div className="relative bg-black/80 border border-gold-400/50 rounded-2xl overflow-hidden h-full flex flex-col hover:border-gold-500 transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden bg-gradient-to-b from-gold-500/10 to-transparent">
                      <img 
                        src={agent.image} 
                        alt={agent.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                      {agent.tier === ListingTier.Platinum && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-purple-500 px-3 py-1 rounded-full">
                          <span className="text-xs font-bold uppercase tracking-widest text-white">Platinum</span>
                        </div>
                      )}
                      {agent.tier === ListingTier.Elite && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-500 to-gold-400 px-3 py-1 rounded-full">
                          <span className="text-xs font-bold uppercase tracking-widest text-black">Elite</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-6 flex flex-col">
                      <h3 className="text-xl font-serif text-gold-400 mb-2">{agent.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <MapPin size={14} className="text-gold-400" />
                        <span>{agent.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-gold-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(agent.rating || 0) ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({agent.reviewCount || 0})</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-4 flex-1">
                        {agent.description || `Specialized in premium residential properties across Mpumalanga`}
                      </p>
                      <button className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-2 rounded-lg hover:shadow-lg hover:shadow-gold-500/50 transition-all">
                        Contact Agent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      )}
    </div>
  );
};

export default PropertyPremium;
