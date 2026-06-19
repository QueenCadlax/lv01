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
  'Agent 1': { name: 'Pam Golding', agency: 'Pam Golding Properties', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces' },
  'Agent 2': { name: 'Margaret Fine', agency: 'Fine & Country Lowveld', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' },
  'Agent 3': { name: 'David Country', agency: 'Fine & Country Lowveld', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces' },
  'Agent 4': { name: 'Patricia Maxwell', agency: 'RE/MAX Lowveld', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces' },
  'Agent 5': { name: 'James Whitmore', agency: 'Century 21 White River', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces' },
  'Agent 6': { name: 'Catherine Deo', agency: 'Deo Volente Properties', photo: 'https://images.unsplash.com/photo-1517841905240-23ded277549e?w=100&h=100&fit=crop&crop=faces' },
  'Agent 7': { name: 'Robert Golding', agency: 'Pam Golding Properties', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' },
  'Agent 8': { name: 'Susan Fine', agency: 'Fine & Country Lowveld', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces' },
};

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
const getAgentInfo = (authorName?: string) => PREMIUM_AGENTS[authorName as keyof typeof PREMIUM_AGENTS] || PREMIUM_AGENTS['Agent 1'];
const formatPrice = (price: number) => `R ${price.toLocaleString('en-ZA')}`;

const HomePremium: React.FC<HomePremiumProps> = ({ businesses, navigate, toggleFavorite, favoritesSet }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All Properties');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [minBedrooms, setMinBedrooms] = useState('All');
  const [minBathrooms, setMinBathrooms] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('Newest');

  const allHomes = useMemo(() => businesses.filter((b: Business) => b.category === Category.Homes), [businesses]);

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

  const resetFilters = () => {
    setSearchQuery('');
    setPropertyType('All Properties');
    setSelectedLocation('All Areas');
    setMinBedrooms('All');
    setMinBathrooms('All');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('Newest');
  };

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-serif text-white mb-3 tracking-tight">Properties</h1>
          <p className="text-lg text-gray-400 font-light mb-12">Discover exceptional homes across Mpumalanga</p>
          <div className="max-w-2xl relative">
            <input type="text" placeholder="Search properties..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-6 py-4 bg-black border-b-2 border-[#D4AF37] text-white placeholder-gray-600 focus:outline-none focus:border-[#E5C158] transition-colors" />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-black px-4 py-12">
        <div className="max-w-7xl mx-auto flex gap-12">
          <div className="hidden lg:block w-56 flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-6">Filters</h3>
              <button onClick={resetFilters} className="text-xs text-[#D4AF37] hover:text-[#E5C158] font-semibold transition-colors">Clear All</button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Type</label>
              <div className="space-y-2">
                {['All Properties', 'Houses', 'Apartments'].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="propertyType" value={type} checked={propertyType === type} onChange={(e) => setPropertyType(e.target.value)} className="w-4 h-4 accent-[#D4AF37]" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Location</label>
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full px-0 py-2 bg-black border-b border-[#D4AF37]/40 text-gray-300 text-sm focus:outline-none focus:border-[#D4AF37]">
                <option>All Areas</option>
                {MPUMALANGA_AREAS.map((area) => (<option key={area} value={area}>{area}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Bedrooms</label>
              <select value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)} className="w-full px-0 py-2 bg-black border-b border-[#D4AF37]/40 text-gray-300 text-sm focus:outline-none focus:border-[#D4AF37]">
                <option value="All">All</option>
                {[1, 2, 3, 4, 5].map((num) => (<option key={num} value={num}>{num}+</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Bathrooms</label>
              <select value={minBathrooms} onChange={(e) => setMinBathrooms(e.target.value)} className="w-full px-0 py-2 bg-black border-b border-[#D4AF37]/40 text-gray-300 text-sm focus:outline-none focus:border-[#D4AF37]">
                <option value="All">All</option>
                {[1, 2, 3, 4].map((num) => (<option key={num} value={num}>{num}+</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Price</label>
              <div className="space-y-2">
                <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full px-0 py-2 bg-black border-b border-[#D4AF37]/40 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]" />
                <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full px-0 py-2 bg-black border-b border-[#D4AF37]/40 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">Sort</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-0 py-2 bg-black border-b border-[#D4AF37]/40 text-gray-300 text-sm focus:outline-none focus:border-[#D4AF37]">
                <option>Newest</option>
                <option>Price Low-High</option>
                <option>Price High-Low</option>
              </select>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-8">{filteredHomes.length} properties</p>
            {filteredHomes.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredHomes.map((property: Business, index: number) => {
                  const agent = getAgentInfo(property.subcategory);
                  const details = getPropertyDetails(index);
                  const isFavorited = favoritesSet?.has(property.id);
                  return (
                    <div key={property.id} className="group cursor-pointer" onClick={() => navigate('property-detail-premium', undefined, property.id)}>
                      <div className="relative mb-6 overflow-hidden">
                        <div className="aspect-video overflow-hidden bg-gray-900">
                          <img src={property.image || 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=1000&h=600&fit=crop'} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); toggleFavorite?.(property.id); }} className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm">
                          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-white'}`} />
                        </button>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">{property.name}</h3>
                          <p className="text-sm text-gray-400">{property.location}</p>
                        </div>
                        <p className="text-2xl font-serif text-[#D4AF37]">{formatPrice(details.price)}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{details.bedrooms} Bed{details.bedrooms !== 1 ? 's' : ''}</span>
                          <span>•</span>
                          <span>{details.bathrooms} Bath{details.bathrooms !== 1 ? 's' : ''}</span>
                          <span>•</span>
                          <span>{details.size} m²</span>
                        </div>
                        <div className="pt-2 flex items-center gap-3">
                          <img src={agent.photo} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-white">{agent.name}</p>
                            <p className="text-xs text-gray-500">{agent.agency}</p>
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
    </div>
  );
};

export default HomePremium;
