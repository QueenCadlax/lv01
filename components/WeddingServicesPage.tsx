import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Business, Category, ListingTier, MPUMALANGA_AREAS } from '../types';

interface WeddingServicesPageProps {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  businesses: Business[];
}

const WeddingServicesPage: React.FC<WeddingServicesPageProps> = ({ navigate, businesses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('All Wedding');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Wedding-focused service types for filtering
  const serviceTypes = [
    'All Wedding',
    'Wedding Venues',
    'Bridal Shops',
    'Wedding Planners',
    'Photographers',
    'Videographers',
    'Florists',
    'Decor & Hiring',
    'Catering',
    'Makeup Artists',
    'Wedding Cakes',
    'DJs & Entertainment'
  ];

  // Get all wedding & bridal businesses
  const allServices = useMemo(() =>
    businesses.filter(b => b.category === Category.WeddingAndBridal),
    [businesses]
  );

  // Filter services based on criteria
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesServiceType =
        selectedServiceType === 'All Wedding' ||
        (service.subcategory && service.subcategory.includes(selectedServiceType)) ||
        service.description?.includes(selectedServiceType) ||
        service.tags?.some(t => t.toLowerCase().includes(selectedServiceType.toLowerCase()));

      const matchesLocation =
        selectedLocation === 'All Areas' || service.location.includes(selectedLocation);

      return matchesSearch && matchesServiceType && matchesLocation;
    });
  }, [allServices, searchQuery, selectedServiceType, selectedLocation]);

  // Top rated from filtered results
  const topRated = useMemo(() =>
    [...filteredServices].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6),
    [filteredServices]
  );

  // Scroll to top on mount
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="bg-black border-b border-gray-800 relative">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              WEDDING & BRIDAL
            </h1>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-4">
              Discover Mpumalanga's trusted wedding venues, bridal shops and planners.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search venues, bridal shops, planners…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-800 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] transition-all font-light"
              />
            </div>

            {/* CATEGORY PILLS */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {serviceTypes.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedServiceType(category)}
                  className={`px-4 py-2 rounded-full text-xs font-light tracking-wider transition-all duration-300 border ${
                    selectedServiceType === category
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-transparent text-[#D4AF37] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTER SIDEBAR */}
          <div className="lg:col-span-1">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden w-full mb-4 py-3 px-4 bg-black rounded-lg text-white font-semibold border border-gray-800"
            >
              {showMobileFilter ? '✕ Close Filters' : '⊕ Show Filters'}
            </button>

            <div className={`${showMobileFilter ? 'block' : 'hidden'} lg:block bg-black rounded-2xl p-6 shadow-sm sticky top-24 h-fit border border-gray-800` }>
              <h3 className="text-gray-100 font-bold text-lg mb-6">Filters</h3>

              {/* Service Type Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">Service Type</label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="w-full bg-black border border-gray-800 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  {serviceTypes.map((type) => (
                    <option key={type} value={type} className="bg-black text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-black border border-gray-800 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="All Areas" className="bg-black text-white">All Areas</option>
                  {MPUMALANGA_AREAS.map((area) => (
                    <option key={area} value={area} className="bg-black text-white">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedServiceType('All Wedding');
                  setSelectedLocation('All Areas');
                }}
                className="w-full py-2 bg-[#D4AF37] hover:bg-[#C9A86A] text-black text-sm font-semibold rounded-lg transition-colors"
              >
                Reset Filters
              </button>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-xs text-gray-400">Found <span className="font-bold text-white">{filteredServices.length}</span> providers</p>
              </div>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            <div>
              <div className="mb-8 pb-8 border-b border-gray-800 relative">
                <p className="text-xs text-[#D4AF37] font-light tracking-widest uppercase mb-2">WEDDING &amp; BRIDAL</p>
                <p className="text-sm text-gray-400 font-light">Showing {filteredServices.length} providers</p>
              </div>

              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredServices.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-black rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-all border border-gray-800"
                      onClick={() => navigate('service-detail', Category.WeddingAndBridal, provider.id)}
                    >
                      <div className="w-full aspect-square bg-black overflow-hidden">
                        {provider.image && (
                          <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="text-base text-white font-medium">{provider.name}</h3>
                        <p className="text-xs text-[#D4AF37] font-light uppercase">{provider.subcategory || provider.tags?.[0] || 'Wedding'}</p>
                        <p className="text-xs text-gray-300 line-clamp-2">{provider.description || ''}</p>
                        <p className="text-xs text-gray-400 pt-2">{provider.location}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate('service-detail', Category.WeddingAndBridal, provider.id); }}
                          className="text-[#D4AF37] font-light text-xs tracking-widest uppercase inline-block pt-1"
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-400 font-light mb-6">No providers found matching your filters.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedServiceType('All Wedding'); setSelectedLocation('All Areas'); }}
                    className="px-4 py-2 bg-[#D4AF37] text-black rounded font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* CTA SECTION */}
            <div className="mt-20 pt-20 border-t border-gray-100">
              <div className="max-w-2xl">
                <p className="text-xs text-[#D4AF37] font-light tracking-widest uppercase mb-4">GROW WITH LOWVELDHUB</p>
                <h2 className="text-3xl font-medium text-white mb-4">List Your Wedding Business</h2>
                <p className="text-sm text-gray-300 font-light leading-relaxed mb-8 max-w-xl">Join Mpumalanga's premium wedding ecosystem and connect with customers searching for venues, planners and bridal services.</p>
                <button onClick={() => navigate('premium-add-business')} className="px-6 py-3 bg-[#D4AF37] text-black rounded font-medium text-xs tracking-widest uppercase shadow-sm">Apply For Listing</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingServicesPage;
