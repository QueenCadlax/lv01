import React, { useState, useMemo } from 'react';
import { Search, Heart } from 'lucide-react';
import { Business, Category, MPUMALANGA_AREAS } from '../types';

interface HomePremiumProps {
  businesses: Business[];
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  toggleFavorite?: (id: string) => void;
  favoritesSet: Set<string>;
}

const PREMIUM_AGENTS = {
  'James Whitmore': { name: 'James Whitmore', agency: 'Pam Golding Properties', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' },
  'Catherine Meyer': { name: 'Catherine Meyer', agency: 'Fine & Country Lowveld', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces' },
  'Robert van der Merwe': { name: 'Robert van der Merwe', agency: 'RE/MAX Lowveld', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces' },
  'Sarah de Klerk': { name: 'Sarah de Klerk', agency: 'Deo Volente Properties', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces' },
  'Michael Thompson': { name: 'Michael Thompson', agency: 'Century 21 White River', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces' },
  'Patricia Ndlovu': { name: 'Patricia Ndlovu', agency: 'Keller Williams Lowveld', photo: 'https://images.unsplash.com/photo-1517841905240-23ded277549e?w=100&h=100&fit=crop&crop=faces' },
  'David Fourie': { name: 'David Fourie', agency: 'Chas Everitt Mpumalanga', photo: 'https://images.unsplash.com/photo-1507539066556-338dae4b3f9e?w=100&h=100&fit=crop&crop=faces' },
  'Susan Botha': { name: 'Susan Botha', agency: 'Lew Geffen Sotheby\'s International Realty', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c006ae30?w=100&h=100&fit=crop&crop=faces' },
  'Andrew McKenzie': { name: 'Andrew McKenzie', agency: 'Seeff Lowveld', photo: 'https://images.unsplash.com/photo-1500565061183-8d1fc6fdf4d9?w=100&h=100&fit=crop&crop=faces' },
  'Margaret Nkosi': { name: 'Margaret Nkosi', agency: 'Rawson Properties Mpumalanga', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces' },
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

// Default agent if none found
const DEFAULT_AGENT = { name: 'James Whitmore', agency: 'Pam Golding Properties', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' };

const PROPERTY_DETAILS = [
  { bedrooms: 5, bathrooms: 4, size: 1250, price: 8500000 },
  { bedrooms: 4, bathrooms: 3, size: 950, price: 6200000 },
  { bedrooms: 3, bathrooms: 2, size: 750, price: 4800000 },
  { bedrooms: 6, bathrooms: 5, size: 1800, price: 12500000 },
  { bedrooms: 4, bathrooms: 3, size: 880, price: 5900000 },
  { bedrooms: 3, bathrooms: 2, size: 620, price: 3800000 },
  { bedrooms: 5, bathrooms: 4, size: 1100, price: 7200000 },
  { bedrooms: 2, bathrooms: 2, size: 450, price: 2500000 },
];

const getPropertyDetails = (index: number) => PROPERTY_DETAILS[index % PROPERTY_DETAILS.length];

// Extract agent info from property data using property-to-agent mapping
const getAgentInfo = (property: Business) => {
  // First try to use the mapping based on property name
  const mappedAgent = PROPERTY_AGENT_MAP[property.name];
  if (mappedAgent && PREMIUM_AGENTS[mappedAgent as keyof typeof PREMIUM_AGENTS]) {
    return PREMIUM_AGENTS[mappedAgent as keyof typeof PREMIUM_AGENTS];
  }
  // Then try agentName property
  const agentName = (property as any).agentName;
  if (agentName && PREMIUM_AGENTS[agentName as keyof typeof PREMIUM_AGENTS]) {
    return PREMIUM_AGENTS[agentName as keyof typeof PREMIUM_AGENTS];
  }
  // Fallback to default
  return DEFAULT_AGENT;
};

const formatPrice = (price: number) => `R ${ price.toLocaleString('en-ZA')}`;

const HomePremium: React.FC<HomePremiumProps> = ({ businesses, navigate, toggleFavorite, favoritesSet }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All Properties');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [minBedrooms, setMinBedrooms] = useState('All');
  const [minBathrooms, setMinBathrooms] = useState('All');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [sortBy, setSortBy] = useState('Newest Listings');
  const [listingType, setListingType] = useState('For Sale');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Dynamic price options based on listing type
  const priceOptions = listingType === 'To Rent' 
    ? ['Any Rent', 'Under R5 000', 'R5 000 – R10 000', 'R10 000 – R15 000', 'R15 000 – R25 000', 'R25 000 – R50 000', 'R50 000+']
    : ['Any Price', 'Under R500 000', 'R500 000 – R1 Million', 'R1M – R3M', 'R3M – R5M', 'R5M – R10M', 'R10M+'];

  // Reset price when switching between rental and sales
  React.useEffect(() => {
    setPriceRange(listingType === 'To Rent' ? 'Any Rent' : 'Any Price');
  }, [listingType]);

  const allHomes = useMemo(() => businesses.filter((b: Business) => b.category === Category.Homes), [businesses]);

  // If HOMES category has been hidden/removed from the UI, don't render this component
  if (!allHomes || allHomes.length === 0) return null;

  const filteredHomes = useMemo(() => {
    let homes = [...allHomes];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      homes = homes.filter((h: Business) => (h.name?.toLowerCase().includes(query)) || (h.location?.toLowerCase().includes(query)));
    }
    if (propertyType !== 'All Properties') {
      homes = homes.filter((h: Business) => h.subcategory === propertyType);
    }
    if (selectedLocation !== 'All Areas') {
      homes = homes.filter((h: Business) => h.location === selectedLocation);
    }
    return homes;
  }, [allHomes, searchQuery, propertyType, selectedLocation]);

  // Only display the first N homes in the UI (curated view)
  const displayedHomes = filteredHomes.slice(0, 1);

  const resetFilters = () => {
    setSearchQuery('');
    setPropertyType('All Properties');
    setSelectedLocation('All Areas');
    setMinBedrooms('All');
    setMinBathrooms('All');
    setPriceRange(listingType === 'To Rent' ? 'Any Rent' : 'Any Price');
    setSortBy('Newest Listings');
  };

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* HERO SECTION - Clean Luxury Marketplace */}
      <div className="bg-black px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-serif text-white mb-3 tracking-tight font-bold text-center">LUXURY REAL ESTATE</h1>
          
          {/* Subtitle - Cleaner & Shorter */}
          <p className="text-center text-gray-400 text-sm md:text-base font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Properties Across Mpumalanga
          </p>

          {/* Search Input - Primary Focus */}
          <div className="relative max-w-2xl mx-auto mb-10">
            <input 
              type="text" 
              placeholder="Search by suburb, estate, property name or agent..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full px-6 py-4 bg-black text-white placeholder-gray-600 focus:outline-none text-sm font-light border-b border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-colors"
            />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#D4AF37]/60 hover:text-[#D4AF37] w-4 h-4 transition-colors" />
          </div>

          {/* Quick Filter Chips */}
          <div className="flex justify-center gap-3">
            {['For Sale', 'To Rent', 'Luxury', 'New Developments'].map((chip) => (
              <button
                key={chip}
                onClick={() => setListingType(chip)}
                className={`px-6 py-2.5 text-xs font-light transition-all duration-300 tracking-wide ${
                  listingType === chip
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:text-white'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR - Clean Horizontal Row, Secondary */}
      <div className="bg-black px-4 py-4 sticky top-0 z-40 border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Filter Row */}
          <div className="hidden sm:flex items-center gap-3 justify-between">
            {/* Filters - Horizontal Inline */}
            <div className="flex items-center gap-3 flex-1 overflow-x-auto bg-black">
              {/* Property Type */}
              <select 
                value={propertyType} 
                onChange={(e) => setPropertyType(e.target.value)} 
                className="px-3 py-2 bg-black text-white text-xs font-light focus:outline-none cursor-pointer appearance-none border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all rounded-sm whitespace-nowrap"
              >
                <option>Service Type</option>
                <option>Houses</option>
                <option>Apartments</option>
                <option>Flats</option>
                <option>Townhouses</option>
                <option>Vacant Land</option>
                <option>Farms</option>
                <option>Commercial</option>
              </select>

              {/* Location */}
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)} 
                className="px-3 py-2 bg-black text-white text-xs font-light focus:outline-none cursor-pointer appearance-none border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all rounded-sm whitespace-nowrap"
              >
                <option className="bg-black text-white">Location</option>
                {MPUMALANGA_AREAS.map((area) => (<option key={area} value={area} className="bg-black text-white">{area}</option>))}
              </select>

              {/* Bedrooms */}
              <select 
                value={minBedrooms} 
                onChange={(e) => setMinBedrooms(e.target.value)} 
                className="px-3 py-2 bg-black text-white text-xs font-light focus:outline-none cursor-pointer appearance-none border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all rounded-sm whitespace-nowrap"
              >
                <option value="All">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>

              {/* Bathrooms */}
              <select 
                value={minBathrooms} 
                onChange={(e) => setMinBathrooms(e.target.value)} 
                className="px-3 py-2 bg-black text-white text-xs font-light focus:outline-none cursor-pointer appearance-none border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all rounded-sm whitespace-nowrap"
              >
                <option value="All">Bathrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>

              {/* Price Range */}
              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)} 
                className="px-3 py-2 bg-black text-white text-xs font-light focus:outline-none cursor-pointer appearance-none border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all rounded-sm whitespace-nowrap"
              >
                {priceOptions.map((option) => (
                  <option key={option} value={option} className="bg-black text-white">{option}</option>
                ))}
              </select>

              {/* Sort By */}
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="px-3 py-2 bg-black text-white text-xs font-light focus:outline-none cursor-pointer appearance-none border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all rounded-sm whitespace-nowrap"
              >
                <option>Sort By</option>
                <option>Newest Listings</option>
                <option>Price High to Low</option>
                <option>Price Low to High</option>
                <option>Most Viewed</option>
              </select>
            </div>

            {/* Reset Filters - Right Side */}
            <button 
              onClick={resetFilters}
              className="text-[#D4AF37]/60 hover:text-[#D4AF37] font-light text-xs transition-all whitespace-nowrap ml-4"
            >
              Reset
            </button>
          </div>

          {/* Mobile Filters Button */}
          <div className="sm:hidden flex items-center justify-between">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="px-4 py-2 border border-[#D4AF37]/40 text-white text-xs font-light hover:border-[#D4AF37] transition-colors rounded-sm"
            >
              Filters
            </button>
            <button 
              onClick={resetFilters}
              className="text-[#D4AF37]/60 hover:text-[#D4AF37] font-light text-xs"
            >
              Reset
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="sm:hidden mt-4 space-y-3 pb-4">
              <div className="flex flex-col gap-1">
                <label className="text-[#D4AF37] text-xs font-light">Service Type</label>
                <select 
                  value={propertyType} 
                  onChange={(e) => setPropertyType(e.target.value)} 
                  className="w-full px-3 py-1.5 bg-black text-white text-xs font-light focus:outline-none cursor-pointer border border-[#D4AF37]/30 rounded-sm"
                >
                  <option>Service Type</option>
                  <option>Houses</option>
                  <option>Apartments</option>
                  <option>Townhouses</option>
                  <option>Vacant Land</option>
                  <option>Farms</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#D4AF37] text-xs font-light">Location</label>
                <select 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)} 
                  className="w-full px-3 py-1.5 bg-black text-white text-xs font-light focus:outline-none cursor-pointer border border-[#D4AF37]/30 rounded-sm"
                >
                  <option>Location</option>
                  {MPUMALANGA_AREAS.map((area) => (<option key={area} value={area}>{area}</option>))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#D4AF37] text-xs font-light">Bedrooms</label>
                <select 
                  value={minBedrooms} 
                  onChange={(e) => setMinBedrooms(e.target.value)} 
                  className="w-full px-3 py-1.5 bg-black text-white text-xs font-light focus:outline-none cursor-pointer border border-[#D4AF37]/30 rounded-sm"
                >
                  <option value="All">All</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#D4AF37] text-xs font-light">Bathrooms</label>
                <select 
                  value={minBathrooms} 
                  onChange={(e) => setMinBathrooms(e.target.value)} 
                  className="w-full px-3 py-1.5 bg-black text-white text-xs font-light focus:outline-none cursor-pointer border border-[#D4AF37]/30 rounded-sm"
                >
                  <option value="All">All</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#D4AF37] text-xs font-light">{listingType === 'To Rent' ? 'Monthly Rent' : 'Price Range'}</label>
                <select 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)} 
                  className="w-full px-3 py-1.5 bg-black text-white text-xs font-light focus:outline-none cursor-pointer border border-[#D4AF37]/30 rounded-sm"
                >
                  {priceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#D4AF37] text-xs font-light">Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  className="w-full px-3 py-1.5 bg-black text-white text-xs font-light focus:outline-none cursor-pointer border border-[#D4AF37]/30 rounded-sm"
                >
                  <option>Sort By</option>
                  <option>Newest Listings</option>
                  <option>Price High to Low</option>
                  <option>Price Low to High</option>
                  <option>Most Viewed</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PROPERTY GRID - Full Width */}
      <div className="bg-black px-4 py-12">
        <div className="max-w-7xl mx-auto">
              <p className="text-sm text-[#D4AF37]/70 mb-8 font-light">{displayedHomes.length} properties</p>
              {displayedHomes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {displayedHomes.map((property: Business, index: number) => {
                    const agent = getAgentInfo(property);
                    const details = getPropertyDetails(index);
                    const isFavorited = favoritesSet?.has(property.id);
                    return (
                      <div 
                        key={property.id} 
                        className="group cursor-pointer flex flex-col bg-black rounded-3xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/15"
                        onClick={() => navigate('property-detail-premium', undefined, property.id)}
                      >
                        {/* IMAGE SECTION - ENLARGED */}
                        <div className="relative overflow-hidden h-80 bg-gray-900">
                          <img 
                            src={property.image || 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=1000&h=600&fit=crop'} 
                            alt={property.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                      
                          {/* Favorite Button */}
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite?.(property.id); }} 
                            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-300 z-10 rounded-xl"
                          >
                            <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-white'}`} />
                          </button>
                        </div>

                        {/* CONTENT SECTION - Clean Hierarchy */}
                        <div className="p-5 flex flex-col space-y-2.5">
                          {/* TITLE - LARGEST */}
                          <h3 className="text-lg font-serif text-white group-hover:text-[#D4AF37] transition-colors font-bold line-clamp-1">
                            {property.name}
                          </h3>

                          {/* PRICE - GOLD, SECOND LARGEST */}
                          <p className="text-2xl font-serif font-bold text-[#D4AF37] leading-tight">
                            {formatPrice(details.price)}
                          </p>

                          {/* LOCATION - SMALL */}
                          <p className="text-xs text-gray-500">
                            {property.location}
                          </p>

                          {/* STATS ROW - TINY, EMOJI FORMAT */}
                          <div className="text-xs text-gray-600 flex items-center gap-2">
                            <span>🛏️ {details.bedrooms}</span>
                            <span className="text-[#D4AF37]/30">|</span>
                            <span>🛁 {details.bathrooms}</span>
                            <span className="text-[#D4AF37]/30">|</span>
                            <span>📐 {details.size}m²</span>
                          </div>

                          {/* AGENT - SUBTLE */}
                          <div className="flex items-center gap-2 pt-2 border-t border-[#D4AF37]/15">
                            <img 
                              src={agent.photo} 
                              alt={agent.name} 
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-300 truncate">
                                {agent.name}
                              </p>
                              <p className="text-[10px] text-gray-600 truncate">
                                {agent.agency}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-32">
                  <p className="text-gray-500 text-lg mb-8">No properties found</p>
                  <button onClick={resetFilters} className="px-8 py-3 bg-[#D4AF37] text-black font-semibold hover:bg-[#E5C158] transition-colors">Clear Filters</button>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default HomePremium;
